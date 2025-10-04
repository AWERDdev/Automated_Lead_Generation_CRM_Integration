const express = require('express');
const router = express.Router();
const rust = require('../../main_cargo/pkg/rust_processer_lib.js');
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379");

// --------------------
// Config
// --------------------
const LIMIT = 3;      // Attempts allowed
const WINDOW = 15;    // seconds

// --------------------
// Helpers
// --------------------
function getWasmFn(name) {
    return rust[name] || rust.default?.[name];
}

async function runWasmFn(name, ...args) {
    const fn = getWasmFn(name);
    if (!fn) throw new Error(`${name} not found in WASM module`);
    return fn(...args);
}

async function checkRateLimit(key) {
    const redisKey = `rate:admin_signup:${key}`;
    const count = await redis.incr(redisKey);

    if (count === 1) {
        await redis.expire(redisKey, WINDOW);
    }

    return { allowed: count <= LIMIT, remaining: Math.max(0, LIMIT - count), reset: WINDOW };
}

// --------------------
// Routes
// --------------------
router.get('/', (req, res) => {
    console.log('Admin Signup Route called');
    res.json({ message: "this is admin signup route" });
});

router.post('/Signup_postgres_Admin', async (req, res) => {
    const { name, password, email, phone, address, username, AdminCode } = req.body;
    const key = email || req.ip;

    try {
        console.log('Received admin signup request for:', email);

        // 1. Rate Limiting
        const { allowed, remaining, reset } = await checkRateLimit(key);
        res.set("RateLimit-Limit", LIMIT);
        res.set("RateLimit-Remaining", remaining);
        res.set("RateLimit-Reset", reset);

        if (!allowed) {
            console.warn(`Rate limit exceeded for ${key}`);
            return res.status(429).json({
                success: false,
                message: "Too many attempts. Try again later.",
                remaining,
                reset
            });
        }

        // 2. Validate Password
        console.log("Validating password...");
        try {
            await runWasmFn("validate_password_wasm", password);
            console.log("Password validated.");
        } catch (error) {
            console.error("Password validation error:", error);
            return res.status(400).json({
                success: false,
                message: "Password validation failed: " + error
            });
        }

        // 3. Hash Password
        console.log("Hashing password...");
        let hashedPassword;
        try {
            hashedPassword = await runWasmFn("hash_password_wasm", password);
            console.log("Password hashed.");
        } catch (error) {
            console.error("Password hashing error:", error);
            return res.status(500).json({
                success: false,
                message: "Password hashing failed: " + error
            });
        }

        // 4. Send Admin Data to FastAPI
        const AdminData = {
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            is_admin: true,
            username,
            AdminCode
        };

        console.log("Sending admin data to FastAPI...");
        const response = await axios.post(
            'http://127.0.0.1:8000/data_receiver/Admin_Data',
            AdminData,
            { headers: { 'Content-Type': 'application/json' } }
        );

        const newAdmin = response.data;
        console.log("Admin data successfully sent to FastAPI. Received AdminID:", newAdmin);

        // 5. Create JWT Token
        console.log("Creating token...");
        let token;
        try {
            token = await runWasmFn("create_token_wasm", newAdmin.AdminID.toString());
            console.log("Token created.");
        } catch (error) {
            console.error("Token creation error:", error);
            return res.status(500).json({
                success: false,
                message: "Error creating authentication token: " + error
            });
        }

        // ✅ Success Response
        res.status(201).json({
            success: true,
            token,
            USER: { id: newAdmin.AdminID }
        });

        console.log("Admin signup process completed for:", email);

    } catch (error) {
        console.error("Admin Signup error:", error);

        // Handle FastAPI validation errors (duplicate fields)
        if (error.response && error.response.status === 400 && error.response.data.detail) {
            const message = error.response.data.detail;

            let fieldName = "unknown";
            if (message.includes("email")) fieldName = "email";
            else if (message.includes("username")) fieldName = "username";
            else if (message.includes("phone")) fieldName = "phone";

            return res.status(400).json({
                success: false,
                message,
                field: fieldName,
                errorType: "duplicate"
            });
        }

        // Fallback error
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred during admin signup"
        });
    }
});

module.exports = router;
