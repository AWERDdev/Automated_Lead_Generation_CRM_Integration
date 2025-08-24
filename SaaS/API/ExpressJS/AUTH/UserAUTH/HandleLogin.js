const express = require('express')
const router = express.Router()
const rust = require('../../main_cargo/pkg/rust_processer_lib.js');
const axios = require('axios')
// In-memory failed attempts tracker (for production, use Redis or DB) - commented out
// const failedAttemptsMap = {};

router.get('/',(req,res)=>{
    console.log('Login Route called')
    res.json({ message: "this is login route" })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    console.log('Login attempt for:', email)

    try {
        // Find user by email
        // const user = await UserSchema.findOne({ email })
        const response = await axios.get('http://127.0.0.1:8000/data_receiver/Verfiy_Data', { params: { email: email}})
        const user = response.data
            if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

        // Verify password using Rust
        try {
            let isValidPassword;
            if (typeof rust.verify_password_wasm === "function") {
                isValidPassword = await rust.verify_password_wasm(password, user.password);
                console.log("Password verified (top-level)");
            } else if (typeof rust.default?.verify_password_wasm === "function") {
                isValidPassword = await rust.default.verify_password_wasm(password, user.password);
                console.log("Password verified (default)");
            } else {
                throw new Error("verify_password_wasm not found in WASM module");
            }
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                })
            }
        } catch (error) {
            console.error('Password verification error:', error)
            return res.status(500).json({
                success: false,
                message: "Error verifying password: " + error
            })
        }

        // On successful login, reset failed attempts - commented out
        // failedAttemptsMap[key] = 0;

        // Create JWT token using Rust
        try {
            let token;
            if (typeof rust.create_token_wasm === "function") {
                token = await rust.create_token_wasm(user.UserID.toString());
                console.log("Token created (top-level)");
            } else if (typeof rust.default?.create_token_wasm === "function") {
                token = await rust.default.create_token_wasm(user.UserID.toString());
                console.log("Token created (default)");
            } else {
                throw new Error("create_token_wasm not found in WASM module");
            }
            res.status(200).json({
                success: true,
                token,
                user: {
                    id: user.UserID,
                    email: user.email
                }
            })
        } catch (error) {
            console.error('Token creation error:', error)
            return res.status(500).json({
                success: false,
                message: "Error creating authentication token: " + error
            })
        }

    } catch (error) {
 console.error('user Login error:', error);


    // If FastAPI sent back a duplicate violation error
    if (error.response && error.response.status === 400 && error.response.data.detail) {
        const message = error.response.data.detail;

        // You can customize like MongoDB did
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

    // General fallback error
    res.status(500).json({
        success: false,
        message: error.message || "An error occurred during signup"
    });

        
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred during login"
        })
    }
})

module.exports = router