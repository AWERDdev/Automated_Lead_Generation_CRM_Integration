const express = require('express')
const router = express.Router()
const rust = require('../../main_cargo/pkg/rust_processer_lib.js');
const axios = require('axios');
const failedAttempts = {};
const AdminschemaSideModel = require('../../Models/AdminModel.js'); 

router.get('/', (req, res) => {
    console.log('Signup Route called')
    res.json({ message: "this is admin signup route" })
});

router.post('/Signup_posgres_Admin', async (req, res) => {
    try {
        const { name, password, email, phone, address, username, AdminCode } = req.body;
        console.log('Received admin signup request for:', email);
         const key = email || req.ip;
    // 1. Rate limiting - commented out due to WASM errors

    let allowed;
    if (typeof rust.rate_limiter_wasm === "function") {
        allowed = await rust.rate_limiter_wasm(key);
        console.log("Rate limiter (top-level)");
    } else if (typeof rust.default?.rate_limiter_wasm === "function") {
        allowed = await rust.default.rate_limiter_wasm(key);
        console.log("Rate limiter (default)");
    } else {
        throw new Error("rate_limiter_wasm not found in WASM module");
    }
    if (!allowed) {
        return res.status(429).send('Too many attempts. Try again later.');
    }

        // Validate password using Rust
        try {
            if (typeof rust.validate_password_wasm === "function") {
                await rust.validate_password_wasm(password);
                console.log("Password validated (top-level)");
            } else if (typeof rust.default?.validate_password_wasm === "function") {
                await rust.default.validate_password_wasm(password);
                console.log("Password validated (default)");
            } else {
                throw new Error("validate_password_wasm not found in WASM module");
            }
        } catch (error) {
            console.error("Password validation error:", error);
            return res.status(400).json({
                success: false,
                message: "Password validation failed: " + error
            });
        }


        // Hash password using Rust
        let hashedPassword;
        try {
            if (typeof rust.hash_password_wasm === "function") {
                hashedPassword = await rust.hash_password_wasm(password);
                console.log("Password hashed (top-level)");
            } else if (typeof rust.default?.hash_password_wasm === "function") {
                hashedPassword = await rust.default.hash_password_wasm(password);
                console.log("Password hashed (default)");
            } else {
                throw new Error("hash_password_wasm not found in WASM module");
            }
        } catch (error) {
            console.error("Password hashing error:", error);
            return res.status(500).json({
                success: false,
                message: "Password hashing failed: " + error
            });
        }

        // Prepare admin data to send to FastAPI
        const AdminData = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            password: hashedPassword,
            is_admin: true,   // match user spelling but enforce admin
            username: username,
            AdminCode: AdminCode
        };

        const response = await axios.post('http://127.0.0.1:8000/data_receiver/Admin_Data', AdminData);
        const newAdmin = response.data;
        console.log("Admin data successfully sent to FastAPI. Received AdminID:", newAdmin);
        // Create JWT token
        let token;
        try {
            if (typeof rust.create_token_wasm === "function") {
                token = await rust.create_token_wasm(newAdmin.AdminID.toString());
            } else if (typeof rust.default?.create_token_wasm === "function") {
                token = await rust.default.create_token_wasm(newAdmin.AdminID.toString());
            } else {
                throw new Error("create_token_wasm not found in WASM module");
            }
        } catch (error) {
            console.error("Token creation error:", error);
            return res.status(500).json({
                success: false,
                message: "Error creating authentication token: " + error
            });
        }

        // Respond
        res.status(201).json({
            success: true,
            token,
            USER: {
                id: newAdmin.AdminID,
            }
        });
    } catch (error) {
        console.error('Admin Signup error:', error);


    // If FastAPI sent back a duplicate violation error
    if (error.response && error.response.status === 400 && error.response.data.detail) {
        const message = error.response.data.detail;

        // You can customize like MongoDB did
        let fieldName = "unknown";
        if (message.includes("email")) fieldName = "email";
        else if (message.includes("username")) fieldName = "username";
        else if (message.includes("phone")) fieldName = "phone";
              // Increment failed attempts
                    if (!failedAttempts[key]) {
                        failedAttempts[key] = 0;
                    }
                    failedAttempts[key]++;
        
                    // Call Rust delay calculator (returns seconds)
                    const delaySecs = await rust.delay_on_failure_wasm(failedAttempts[key], 5); // base 5s in prod
        
                    console.log(`Delaying for ${delaySecs} seconds...`);
        
                    // Wait in Node.js
                    await new Promise(res => setTimeout(res, delaySecs * 1000));

        return res.status(400).json({
            success: false,
            message,
            field: fieldName,
            errorType: "duplicate"
        });
    }



        res.status(500).json({
            success: false,
            message: error.message || "An error occurred during signup"
        });
    }
});



module.exports = router;
