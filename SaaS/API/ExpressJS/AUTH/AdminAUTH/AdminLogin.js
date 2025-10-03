const express = require("express");
const router = express.Router();
const rust = require("../../main_cargo/pkg/rust_processer_lib.js");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379");

// --------------------
// Config
// --------------------
const LIMIT = 5;      // Attempts allowed per window
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
    const redisKey = `rate:admin_login:${key}`;
    const count = await redis.incr(redisKey);

    if (count === 1) {
        await redis.expire(redisKey, WINDOW);
    }

    return { allowed: count <= LIMIT, remaining: Math.max(0, LIMIT - count), reset: WINDOW };
}

// --------------------
// Routes
// --------------------
router.get("/", (req, res) => {
    console.log("Admin Login Route called");
    res.json({ message: "This is the admin login route" });
});

router.post("/login_postgres_Admin", async (req, res) => {
    const { email, password } = req.body;
    const key = email || req.ip;

    try {
        console.log("Admin login attempt for:", email);

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

        // 2. Fetch Admin Data
        console.log("Fetching admin data from FastAPI...");
        const response = await axios.get(
            "http://127.0.0.1:8000/data_receiver/Verfiy_Data_admin",
            { params: { email } }
        );

        const admin = response.data;
        if (!admin) {
            console.warn("Admin not found for email:", email);
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // 3. Verify Password
        console.log("Verifying password...");
        let isValidPassword;
        try {
            isValidPassword = await runWasmFn("verify_password_wasm", password, admin.password);
            if (!isValidPassword) {
                console.warn("Invalid password for:", email);
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }
            console.log("Password verified.");
        } catch (error) {
            console.error("Password verification error:", error);
            return res.status(500).json({
                success: false,
                message: "Error verifying password: " + error
            });
        }

        // 4. Create JWT Token
        console.log("Creating token...");
        let token;
        try {
            token = await runWasmFn("create_token_wasm", admin.AdminID.toString());
            console.log("Token created.");
        } catch (error) {
            console.error("Token creation error:", error);
            return res.status(500).json({
                success: false,
                message: "Error creating authentication token: " + error
            });
        }

        // ✅ Success Response
        res.status(200).json({
            success: true,
            token,
            admin: { id: admin.AdminID, email: admin.email }
        });

        console.log("Admin login process completed for:", email);

    } catch (error) {
        console.error("Admin Login error:", error);

        // Handle FastAPI validation errors
        if (error.response && error.response.status === 400 && error.response.data.detail) {
            const message = error.response.data.detail;

            let fieldName = "unknown";
            if (message.includes("email")) fieldName = "email";
            else if (message.includes("password")) fieldName = "password";

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
            message: error.message || "An error occurred during admin login"
        });
    }
});

module.exports = router;
