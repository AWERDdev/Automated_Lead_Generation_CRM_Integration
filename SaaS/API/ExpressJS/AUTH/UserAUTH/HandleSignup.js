const express = require('express');
const router = express.Router();
const rust = require('../../main_cargo/pkg/rust_processer_lib.js');
const axios = require('axios');
const UserschemaSideModel = require('../../Models/UserModel.js');
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379");
// --------------------
// In-memory Variables
// --------------------
const LIMIT = 200;
const WINDOW = 15;
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
    const redisKey = `rate:${key}`;
    const count = await redis.incr(redisKey);

    if (count === 1) {
        // First request, set expiration
        await redis.expire(redisKey, WINDOW);
    }

    return { allowed: count <= LIMIT, remaining: Math.max(0, LIMIT - count), reset: WINDOW };
}
// --------------------
// Routes
// --------------------
router.get('/', (req, res) => {
    console.log('Signup Route called');
    res.json({ message: "this is signup route" });
});

router.post('/Signup_postgres', async (req, res) => {
    const { name, password, email, phone, address, username } = req.body;
    const key = email || req.ip;

    try {
        console.log('Received signup request for:', email);

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

        // 3. Hash Password
        console.log('Hashing password...');
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

        // 4. Send User Data to FastAPI
        console.log('Sending user data to FastAPI...');
        const UserData = {
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            is_admin: false,
            username
        };

        const response = await axios.post(
            'http://127.0.0.1:8000/data_receiver/User_Data',
            UserData,
            { headers: { 'Content-Type': 'application/json' } }
        );

        const newUser = response.data;
        console.log("User data successfully sent to FastAPI. Received UserID:", newUser);

        // 5. Create JWT Token
        console.log('Creating token...');
        let token;
        try {
            token = await runWasmFn("create_token_wasm", newUser.UserID.toString());
            console.log("Token created.");
        } catch (error) {
            console.error('Token creation error:', error);
            return res.status(500).json({
                success: false,
                message: "Error creating authentication token: " + error
            });
        }

        // ✅ Success Response
        res.status(201).json({
            success: true,
            token,
            USER: { id: newUser.UserID }
        });

        console.log('Signup process completed for:', email);

    } catch (error) {
        console.error('Signup error:', error);

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
            message: error.message || "An error occurred during signup"
        });
    }
});

module.exports = router;
