const express = require('express')
const router = express.Router()
const rust = require('../../main_cargo/pkg/rust_processer_lib.js');
const axios = require('axios')

router.get('/',(req,res)=>{
    console.log('Signup Route called')
    res.json({ message: "this is signup route" })
})

router.post('/Signup', async (req, res) => {
    try {
        const { name, password, email, phone, address, username } = req.body;
        console.log('rust', rust)
        console.log('rust.validate_password_wasm:', typeof rust.validate_password_wasm);
        console.log('rust.default.validate_password_wasm:', typeof rust.default?.validate_password_wasm);
        console.log('Received signup request for:', email)

        // Validate password using Rust
        console.log("validating password")
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
        console.log(" password validated ")
        

        
        console.log("user doesn't exist")
        // Hash password using Rust
        console.log('hashing password')
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
        // send data to FASTAPI server
        const UserData = {
            name:name,
            email:email,
            phone:phone,
            address:address,
            password:hashedPassword,
            is_admin:false,
            username:username
        }
        const response = await axios.post('http://127.0.0.1:8000/data_receiver/User_Data', UserData)
        console.log(response.data)
        const newUser = response.data
        console.log("User data successfully sent to FastAPI. Received UserID:", newUser);
        
        // Create JWT token using Rust
        console.log('creating token')
        let token;
        try {
            if (typeof rust.create_token_wasm === "function") {
                token = await rust.create_token_wasm(newUser.UserID.toString());
                console.log("Token created (top-level)");
            } else if (typeof rust.default?.create_token_wasm === "function") {
                token = await rust.default.create_token_wasm(newUser.UserID.toString());
                console.log("Token created (default)");
            } else {
                throw new Error("create_token_wasm not found in WASM module");
            }
        } catch (error) {
            console.error('Token creation error:', error);
            return res.status(500).json({
                success: false,
                message: "Error creating authentication token: " + error
            });
        }
        console.log(' token created')
        console.log('sending results')
        res.status(201).json({
            success: true,
            token,
            USER: {
                id: newUser.UserID,
            }
        });
    } catch (error) {
        console.error('Signup error:', error);

    // If FastAPI sent back a duplicate violation error
    if (error.response && error.response.status === 400 && error.response.data.detail) {
        const message = error.response.data.detail;

        // You can customize like MongoDB did
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

    // General fallback error
    res.status(500).json({
        success: false,
        message: error.message || "An error occurred during signup"
    });


        
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred during signup"
        });
    }
});

module.exports = router