const express = require("express");
const router = express.Router();
const rust = require("../../main_cargo/pkg/rust_processer_lib.js");
const axios = require("axios");
const failedAttempts = {};
const AdminSchema = require('../../Models/FullModels/AdminModel');
const AdminschemaSideModel = require('../../Models/SideModels/AdminModel'); 
router.get("/", (req, res) => {
  console.log("Admin Login Route called");
  res.json({ message: "This is the admin login route" });
});

router.post("/login_postgres", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt for:", email);
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

  try {


    // ✅ Fetch admin data from FastAPI service
    const response = await axios.get("http://127.0.0.1:8000/data_receiver/Verfiy_Data_admin", {
      params: { email },
    });
    
    const admin = response.data;
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ✅ Verify password using Rust (compare plaintext input with stored hash)
    try {
      let isValidPassword;
      if (typeof rust.verify_password_wasm === "function") {
        isValidPassword = await rust.verify_password_wasm(password, admin.password);
        console.log("Password verified (top-level)");
      } else if (typeof rust.default?.verify_password_wasm === "function") {
        isValidPassword = await rust.default.verify_password_wasm(password, admin.password);
        console.log("Password verified (default)");
      } else {
        throw new Error("verify_password_wasm not found in WASM module");
      }

      if (!isValidPassword) {
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

        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Password verification error:", error);
      return res.status(500).json({
        success: false,
        message: "Error verifying password: " + error,
      });
    }

    // ✅ Create JWT token using Rust
    try {
      let token;
      if (typeof rust.create_token_wasm === "function") {
        token = await rust.create_token_wasm(admin.admin.AdminID.toString());
        console.log("Token created (top-level)");
      } else if (typeof rust.default?.create_token_wasm === "function") {
        token = await rust.default.create_token_wasm(admin.admin.AdminID.toString());
        console.log("Token created (default)");
      } else {
        throw new Error("create_token_wasm not found in WASM module");
      }

      return res.status(200).json({
        success: true,
        token,
        admin: {
          id: admin.admin.AdminID,
        },
      });
    } catch (error) {
      console.error("Token creation error:", error);
      return res.status(500).json({
        success: false,
        message: "Error creating authentication token: " + error,
      });
    }
  } catch (error) {
 console.error('Admin Login error:', error);


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

    res.status(500).json({
      success: false,
      message: error.message || "An error occurred during login",
    });
  }
});


router.post('/login_mongodb', async (req, res) => {
    const { email, password } = req.body
    console.log('Login attempt for:', email)
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


    try {
        // Find admin by email
        const admin = await AdminSchema.findOne({ email })
            if (!admin) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

        // Verify password using Rust
        try {
            let isValidPassword;
            if (typeof rust.verify_password_wasm === "function") {
                isValidPassword = await rust.verify_password_wasm(password, admin.password);
                console.log("Password verified (top-level)");
            } else if (typeof rust.default?.verify_password_wasm === "function") {
                isValidPassword = await rust.default.verify_password_wasm(password, admin.password);
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
                token = await rust.create_token_wasm(admin._id.toString());
                console.log("Token created (top-level)");
            } else if (typeof rust.default?.create_token_wasm === "function") {
                token = await rust.default.create_token_wasm(admin._id.toString());
                console.log("Token created (default)");
            } else {
                throw new Error("create_token_wasm not found in WASM module");
            }
            res.status(200).json({
                success: true,
                token,
                user: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email
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
        console.error('Login error:', error)
                    if (!failedAttempts[key]) {
                                failedAttempts[key] = 0;
                            }
                            failedAttempts[key]++;
                
                            // Call Rust delay calculator (returns seconds)
                            const delaySecs = await rust.delay_on_failure_wasm(failedAttempts[key], 5); // base 5s in prod
                            
                            console.log(`Delaying for ${delaySecs} seconds...`);
                
                            // Wait in Node.js
                            await new Promise(res => setTimeout(res, delaySecs * 1000));    
                   // Handle MongoDB duplicate key errors
        // Handle MongoDB duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            let message = "Duplicate key error";
            let fieldName = field;
            
            switch (field) {
                case 'email':
                    message = "Email is already in use";
                    fieldName = "email";
                    break;
                case 'UserID':
                    message = "User ID already exists";
                    fieldName = "userId";
                    break;
                default:
                    message = `${field} is already taken`;
                    fieldName = field;
            }
            
            return res.status(400).json({
                success: false,
                message: message,
                field: fieldName,
                errorType: "duplicate"
            });
        }
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred during login"
        })
    }
})

module.exports = router;
