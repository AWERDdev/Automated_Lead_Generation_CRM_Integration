
// router.post('/Signup_mongodb', async (req, res) => {
//     try {
//         const { name, password, email, phone, address } = req.body;
//         console.log('rust', rust)
//         console.log('rust.validate_password_wasm:', typeof rust.validate_password_wasm);
//         console.log('rust.default.validate_password_wasm:', typeof rust.default?.validate_password_wasm);
//         console.log('Received signup request for:', email)
//         const key = email || req.ip;

//     // 1. Rate limiting - commented out due to WASM errors

//     let allowed;
//     if (typeof rust.rate_limiter_wasm === "function") {
//         allowed = await rust.rate_limiter_wasm(key);
//         console.log("Rate limiter (top-level)");
//     } else if (typeof rust.default?.rate_limiter_wasm === "function") {
//         allowed = await rust.default.rate_limiter_wasm(key);
//         console.log("Rate limiter (default)");
//     } else {
//         throw new Error("rate_limiter_wasm not found in WASM module");
//     }
//     if (!allowed) {
//         return res.status(429).send('Too many attempts. Try again later.');
//     }
//         // Validate password using Rust
//         console.log("validating password")
//         try {
//             if (typeof rust.validate_password_wasm === "function") {
//                 await rust.validate_password_wasm(password);
//                 console.log("Password validated (top-level)");
//             } else if (typeof rust.default?.validate_password_wasm === "function") {
//                 await rust.default.validate_password_wasm(password);
//                 console.log("Password validated (default)");
//             } else {
//                 throw new Error("validate_password_wasm not found in WASM module");
//             }
//         } catch (error) {
//             console.error("Password validation error:", error);
//             return res.status(400).json({
//                 success: false,
//                 message: "Password validation failed: " + error
//             });
//         }
//         console.log(" password validated ")
        
//         // Check for existing user with same email
//         console.log("checking if user email exists")
//         const existingUserEmail = await Userschema.findOne({ email });
//         if (existingUserEmail) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email is already in use",
//                 field: "email",
//                 errorType: "duplicate"
//             });
//         }
        
//         console.log("user doesn't exist")
//         // Hash password using Rust
//         console.log('hashing password')
//         let hashedPassword;
//         try {
//             if (typeof rust.hash_password_wasm === "function") {
//                 hashedPassword = await rust.hash_password_wasm(password);
//                 console.log("Password hashed (top-level)");
//             } else if (typeof rust.default?.hash_password_wasm === "function") {
//                 hashedPassword = await rust.default.hash_password_wasm(password);
//                 console.log("Password hashed (default)");
//             } else {
//                 throw new Error("hash_password_wasm not found in WASM module");
//             }
//         } catch (error) {
//             console.error("Password hashing error:", error);
//             return res.status(500).json({
//                 success: false,
//                 message: "Password hashing failed: " + error
//             });
//         }
        
//         // Create new user (let MongoDB handle UserID generation)
//         console.log('saving user data')
//         let newUser;
//         try {
//             newUser = await Userschema.create({
//                 name,
//                 email,
//                 password: hashedPassword,
//                 phone,
//                 address,
//             });
//         } catch (error) {
//             console.error('User creation error:', error);
            
//             // Handle MongoDB duplicate key errors
//             if (error.code === 11000) {
//                 const field = Object.keys(error.keyPattern)[0];
//                 let message = "Duplicate key error";
//                 let fieldName = field;
                
//                 switch (field) {
//                     case 'email':
//                         message = "Email is already in use";
//                         fieldName = "email";
//                         break;
//                     case 'UserID':
//                         message = "User ID already exists";
//                         fieldName = "userId";
//                         break;
//                     default:
//                         message = `${field} is already taken`;
//                         fieldName = field;
//                 }
                
//                 return res.status(400).json({
//                     success: false,
//                     message: message,
//                     field: fieldName,
//                     errorType: "duplicate"
//                 });
//             }
            
//             return res.status(500).json({
//                 success: false,
//                 message: error.message || "An error occurred during signup"
//             });
//         }
//         console.log('Data saved')
//         // Create JWT token using Rust
//         console.log('creating token')
//         let token;
//         try {
//             if (typeof rust.create_token_wasm === "function") {
//                 token = await rust.create_token_wasm(newUser._id.toString());
//                 console.log("Token created (top-level)");
//             } else if (typeof rust.default?.create_token_wasm === "function") {
//                 token = await rust.default.create_token_wasm(newUser._id.toString());
//                 console.log("Token created (default)");
//             } else {
//                 throw new Error("create_token_wasm not found in WASM module");
//             }
//         } catch (error) {
//             console.error('Token creation error:', error);
//             return res.status(500).json({
//                 success: false,
//                 message: "Error creating authentication token: " + error
//             });
//         }
//         console.log(' token created')
//         console.log('sending results')
//         res.status(201).json({
//             success: true,
//             token,
//             USER: {
//                 id: newUser.UserID,
//                 name: newUser.name,
//                 email: newUser.email
//             }
//         });
//     } catch (error) {
//         console.error('Signup error:', error);
//             if (!failedAttempts[key]) {
//                         failedAttempts[key] = 0;
//                     }
//                     failedAttempts[key]++;
        
//                     // Call Rust delay calculator (returns seconds)
//                     const delaySecs = await rust.delay_on_failure_wasm(failedAttempts[key], 5); // base 5s in prod
                    
//                     console.log(`Delaying for ${delaySecs} seconds...`);
        
//                     // Wait in Node.js
//                     await new Promise(res => setTimeout(res, delaySecs * 1000));    
//            // Handle MongoDB duplicate key errors
//         if (error.code === 11000) {
//             const field = Object.keys(error.keyPattern)[0];
//             let message = "Duplicate key error";
//             let fieldName = field;
            
//             switch (field) {
//                 case 'email':
//                     message = "Email is already in use";
//                     fieldName = "email";
//                     break;
//                 case 'UserID':
//                     message = "User ID already exists";
//                     fieldName = "userId";
//                     break;
//                 default:
//                     message = `${field} is already taken`;
//                     fieldName = field;
//             }
            
//             return res.status(400).json({
//                 success: false,
//                 message: message,
//                 field: fieldName,
//                 errorType: "duplicate"
//             });
//         }
//         res.status(500).json({
//             success: false,
//             message: error.message || "An error occurred during signup"
//         });
//     }
// });




// router.post('/login_mongodb', async (req, res) => {
//     const { email, password } = req.body
//     console.log('Login attempt for:', email)
//     const key = email || req.ip;

//     // 2. Rust WASM RateLimiter (extra layer)
//     let allowed;
//     if (typeof rust.rate_limiter_wasm === "function") {
//         allowed = await rust.rate_limiter_wasm(key);
//         console.log("Rate limiter (top-level)");
//     } else if (typeof rust.default?.rate_limiter_wasm === "function") {
//         allowed = await rust.default.rate_limiter_wasm(key);
//         console.log("Rate limiter (default)");
//     } else {
//         throw new Error("rate_limiter_wasm not found in WASM module");
//     }

//     if (!allowed) {
//         return res.status(429).send('Too many attempts. Try again later.');
//     }
//     try {
//         // Find user by email
//         const user = await Userschema.findOne({ email })
//             if (!user) {
//         return res.status(401).json({
//             success: false,
//             message: "Invalid email or password"
//         })
//     }

//         // Verify password using Rust
//         try {
//             let isValidPassword;
//             if (typeof rust.verify_password_wasm === "function") {
//                 isValidPassword = await rust.verify_password_wasm(password, user.password);
//                 console.log("Password verified (top-level)");
//             } else if (typeof rust.default?.verify_password_wasm === "function") {
//                 isValidPassword = await rust.default.verify_password_wasm(password, user.password);
//                 console.log("Password verified (default)");
//             } else {
//                 throw new Error("verify_password_wasm not found in WASM module");
//             }
//             if (!isValidPassword) {
//                 return res.status(401).json({
//                     success: false,
//                     message: "Invalid email or password"
//                 })
//             }
//         } catch (error) {
//             console.error('Password verification error:', error)
//             return res.status(500).json({
//                 success: false,
//                 message: "Error verifying password: " + error
//             })
//         }

//         // On successful login, reset failed attempts - commented out
//         // failedAttemptsMap[key] = 0;

//         // Create JWT token using Rust
//         try {
//             let token;
//             if (typeof rust.create_token_wasm === "function") {
//                 token = await rust.create_token_wasm(user._id.toString());
//                 console.log("Token created (top-level)");
//             } else if (typeof rust.default?.create_token_wasm === "function") {
//                 token = await rust.default.create_token_wasm(user._id.toString());
//                 console.log("Token created (default)");
//             } else {
//                 throw new Error("create_token_wasm not found in WASM module");
//             }
//             res.status(200).json({
//                 success: true,
//                 token,
//                 user: {
//                     id: user._id,
//                     name: user.name,
//                     email: user.email
//                 }
//             })
//         } catch (error) {
//             console.error('Token creation error:', error)
//             return res.status(500).json({
//                 success: false,
//                 message: "Error creating authentication token: " + error
//             })
//         }

//     } catch (error) {
//         console.error('Login error:', error)
//              // Handle MongoDB duplicate key errors
//                  if (!failedAttempts[key]) {
//                 failedAttempts[key] = 0;
//             }
//             failedAttempts[key]++;

//             // Call Rust delay calculator (returns seconds)
//             const delaySecs = await rust.delay_on_failure_wasm(failedAttempts[key], 5); // base 5s in prod
            
//             console.log(`Delaying for ${delaySecs} seconds...`);

//             // Wait in Node.js
//             await new Promise(res => setTimeout(res, delaySecs * 1000));
            
//         if (error.code === 11000) {
//             const field = Object.keys(error.keyPattern)[0];
//             let message = "Duplicate key error";
//             let fieldName = field;
            
//             switch (field) {
//                 case 'email':
//                     message = "Email is already in use";
//                     fieldName = "email";
//                     break;
//                 case 'UserID':
//                     message = "User ID already exists";
//                     fieldName = "userId";
//                     break;
//                 default:
//                     message = `${field} is already taken`;
//                     fieldName = field;
//             }
            
//             return res.status(400).json({
//                 success: false,
//                 message: message,
//                 field: fieldName,
//                 errorType: "duplicate"
//             });
//         }
        
//         res.status(500).json({
//             success: false,
//             message: error.message || "An error occurred during login"
//         })
//     }
// })






// router.post('/Signup_mongodb_Admin', async (req, res) => {
//     try {
//         const { name, password, email, phone, address,AdminCode } = req.body;
//         console.log('rust', rust)
//         console.log('rust.validate_password_wasm:', typeof rust.validate_password_wasm);
//         console.log('rust.default.validate_password_wasm:', typeof rust.default?.validate_password_wasm);
//         console.log('Received signup request for:', email)
//          const key = email || req.ip;
//     // 1. Rate limiting - commented out due to WASM errors

//     let allowed;
//     if (typeof rust.rate_limiter_wasm === "function") {
//         allowed = await rust.rate_limiter_wasm(key);
//         console.log("Rate limiter (top-level)");
//     } else if (typeof rust.default?.rate_limiter_wasm === "function") {
//         allowed = await rust.default.rate_limiter_wasm(key);
//         console.log("Rate limiter (default)");
//     } else {
//         throw new Error("rate_limiter_wasm not found in WASM module");
//     }
//     if (!allowed) {
//         return res.status(429).send('Too many attempts. Try again later.');
//     }
//         // Validate password using Rust
//         console.log("validating password")
//         try {
//             if (typeof rust.validate_password_wasm === "function") {
//                 await rust.validate_password_wasm(password);
//                 console.log("Password validated (top-level)");
//             } else if (typeof rust.default?.validate_password_wasm === "function") {
//                 await rust.default.validate_password_wasm(password);
//                 console.log("Password validated (default)");
//             } else {
//                 throw new Error("validate_password_wasm not found in WASM module");
//             }
//         } catch (error) {
//             console.error("Password validation error:", error);
//             return res.status(400).json({
//                 success: false,
//                 message: "Password validation failed: " + error
//             });
//         }
//         console.log(" password validated ")
        
//         // Check for existing admin with same email
//         console.log("checking if admin email exists")
//         const existingAdminEmail = await AdminSchema.findOne({ email });
//         if (existingAdminEmail) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email is already in use",
//                 field: "email",
//                 errorType: "duplicate"
//             });
//         }
        
//         console.log("user doesn't exist")
//         // Hash password using Rust
//         console.log('hashing password')
//         let hashedPassword;
//         try {
//             if (typeof rust.hash_password_wasm === "function") {
//                 hashedPassword = await rust.hash_password_wasm(password);
//                 console.log("Password hashed (top-level)");
//             } else if (typeof rust.default?.hash_password_wasm === "function") {
//                 hashedPassword = await rust.default.hash_password_wasm(password);
//                 console.log("Password hashed (default)");
//             } else {
//                 throw new Error("hash_password_wasm not found in WASM module");
//             }
//         } catch (error) {
//             console.error("Password hashing error:", error);
//             return res.status(500).json({
//                 success: false,
//                 message: "Password hashing failed: " + error
//             });
//         }
        
//         // Create new admin (let MongoDB handle AdminID generation)
//         console.log('saving admin data')
//         let newAdmin;
//         try {
//             newAdmin = await AdminSchema.create({
//                 name,
//                 email,
//                 password: hashedPassword,
//                 phone,
//                 address,
//                 AdminCode: AdminCode
//             });
//         } catch (error) {
//             console.error('Admin creation error:', error);
            
//             // Handle MongoDB duplicate key errors
//             if (error.code === 11000) {
//                 const field = Object.keys(error.keyPattern)[0];
//                 let message = "Duplicate key error";
//                 let fieldName = field;
                
//                 switch (field) {
//                     case 'email':
//                         message = "Email is already in use";
//                         fieldName = "email";
//                         break;
//                     case 'UserID':
//                         message = "User ID already exists";
//                         fieldName = "userId";
//                         break;
//                     default:
//                         message = `${field} is already taken`;
//                         fieldName = field;
//                 }
                
//                 return res.status(400).json({
//                     success: false,
//                     message: message,
//                     field: fieldName,
//                     errorType: "duplicate"
//                 });
//             }
            
//             return res.status(500).json({
//                 success: false,
//                 message: error.message || "An error occurred during signup"
//             });
//         }
//         console.log('Data saved')
//         // Create JWT token using Rust
//         console.log('creating token')
//         let token;
//         try {
//             if (typeof rust.create_token_wasm === "function") {
//                 token = await rust.create_token_wasm(newAdmin._id.toString());
//                 console.log("Token created (top-level)");
//             } else if (typeof rust.default?.create_token_wasm === "function") {
//                 token = await rust.default.create_token_wasm(newAdmin._id.toString());
//                 console.log("Token created (default)");
//             } else {
//                 throw new Error("create_token_wasm not found in WASM module");
//             }
//         } catch (error) {
//             console.error('Token creation error:', error);
//             return res.status(500).json({
//                 success: false,
//                 message: "Error creating authentication token: " + error
//             });
//         }
//         console.log(' token created')
//         console.log('sending results')
//         res.status(201).json({
//             success: true,
//             token,
//             USER: {
//                 id: newAdmin._id,
//                 name: newAdmin.name,
//                 email: newAdmin.email
//             }
//         });
//     } catch (error) {
//         console.error('Signup error:', error);
//                     if (!failedAttempts[key]) {
//                                 failedAttempts[key] = 0;
//                             }
//                             failedAttempts[key]++;
                
//                             // Call Rust delay calculator (returns seconds)
//                             const delaySecs = await rust.delay_on_failure_wasm(failedAttempts[key], 5); // base 5s in prod
                            
//                             console.log(`Delaying for ${delaySecs} seconds...`);
                
//                             // Wait in Node.js
//                             await new Promise(res => setTimeout(res, delaySecs * 1000));    
//                    // Handle MongoDB duplicate key errors
//         // Handle MongoDB duplicate key errors
//         if (error.code === 11000) {
//             const field = Object.keys(error.keyPattern)[0];
//             let message = "Duplicate key error";
//             let fieldName = field;
            
//             switch (field) {
//                 case 'email':
//                     message = "Email is already in use";
//                     fieldName = "email";
//                     break;
//                 case 'UserID':
//                     message = "User ID already exists";
//                     fieldName = "userId";
//                     break;
//                 default:
//                     message = `${field} is already taken`;
//                     fieldName = field;
//             }
            
//             return res.status(400).json({
//                 success: false,
//                 message: message,
//                 field: fieldName,
//                 errorType: "duplicate"
//             });
//         }
        
//         res.status(500).json({
//             success: false,
//             message: error.message || "An error occurred during signup"
//         });
//     }
// });





// router.post('/login_mongodb_Admin', async (req, res) => {
//     const { email, password } = req.body
//     console.log('Login attempt for:', email)
//     const key = email || req.ip;

//     // 1. Rate limiting - commented out due to WASM errors

//     let allowed;
//     if (typeof rust.rate_limiter_wasm === "function") {
//         allowed = await rust.rate_limiter_wasm(key);
//         console.log("Rate limiter (top-level)");
//     } else if (typeof rust.default?.rate_limiter_wasm === "function") {
//         allowed = await rust.default.rate_limiter_wasm(key);
//         console.log("Rate limiter (default)");
//     } else {
//         throw new Error("rate_limiter_wasm not found in WASM module");
//     }
//     if (!allowed) {
//         return res.status(429).send('Too many attempts. Try again later.');
//     }


//     try {
//         // Find admin by email
//         const admin = await AdminSchema.findOne({ email })
//             if (!admin) {
//         return res.status(401).json({
//             success: false,
//             message: "Invalid email or password"
//         })
//     }

//         // Verify password using Rust
//         try {
//             let isValidPassword;
//             if (typeof rust.verify_password_wasm === "function") {
//                 isValidPassword = await rust.verify_password_wasm(password, admin.password);
//                 console.log("Password verified (top-level)");
//             } else if (typeof rust.default?.verify_password_wasm === "function") {
//                 isValidPassword = await rust.default.verify_password_wasm(password, admin.password);
//                 console.log("Password verified (default)");
//             } else {
//                 throw new Error("verify_password_wasm not found in WASM module");
//             }
//             if (!isValidPassword) {
//                 return res.status(401).json({
//                     success: false,
//                     message: "Invalid email or password"
//                 })
//             }
//         } catch (error) {
//             console.error('Password verification error:', error)
//             return res.status(500).json({
//                 success: false,
//                 message: "Error verifying password: " + error
//             })
//         }

//         // On successful login, reset failed attempts - commented out
//         // failedAttemptsMap[key] = 0;

//         // Create JWT token using Rust
//         try {
//             let token;
//             if (typeof rust.create_token_wasm === "function") {
//                 token = await rust.create_token_wasm(admin._id.toString());
//                 console.log("Token created (top-level)");
//             } else if (typeof rust.default?.create_token_wasm === "function") {
//                 token = await rust.default.create_token_wasm(admin._id.toString());
//                 console.log("Token created (default)");
//             } else {
//                 throw new Error("create_token_wasm not found in WASM module");
//             }
//             res.status(200).json({
//                 success: true,
//                 token,
//                 user: {
//                     id: admin._id,
//                     name: admin.name,
//                     email: admin.email
//                 }
//             })
//         } catch (error) {
//             console.error('Token creation error:', error)
//             return res.status(500).json({
//                 success: false,
//                 message: "Error creating authentication token: " + error
//             })
//         }

//     } catch (error) {
//         console.error('Login error:', error)
//                     if (!failedAttempts[key]) {
//                                 failedAttempts[key] = 0;
//                             }
//                             failedAttempts[key]++;
                
//                             // Call Rust delay calculator (returns seconds)
//                             const delaySecs = await rust.delay_on_failure_wasm(failedAttempts[key], 5); // base 5s in prod
                            
//                             console.log(`Delaying for ${delaySecs} seconds...`);
                
//                             // Wait in Node.js
//                             await new Promise(res => setTimeout(res, delaySecs * 1000));    
//                    // Handle MongoDB duplicate key errors
//         // Handle MongoDB duplicate key errors
//         if (error.code === 11000) {
//             const field = Object.keys(error.keyPattern)[0];
//             let message = "Duplicate key error";
//             let fieldName = field;
            
//             switch (field) {
//                 case 'email':
//                     message = "Email is already in use";
//                     fieldName = "email";
//                     break;
//                 case 'UserID':
//                     message = "User ID already exists";
//                     fieldName = "userId";
//                     break;
//                 default:
//                     message = `${field} is already taken`;
//                     fieldName = field;
//             }
            
//             return res.status(400).json({
//                 success: false,
//                 message: message,
//                 field: fieldName,
//                 errorType: "duplicate"
//             });
//         }
//         res.status(500).json({
//             success: false,
//             message: error.message || "An error occurred during login"
//         })
//     }
// })







        // // 1. Rate Limiting
        // console.log('Applying rate limiter...');
        // const allowed = await runWasmFn("rate_limiter_wasm", key);
        // if (!allowed) {
        //     return res.status(429).send('Too many attempts. Try again later.');
        // }
        // console.log('Rate limiter passed.');

        // // 2. Validate Password
        // console.log('Validating password...');
        // try {
        //     await runWasmFn("validate_password_wasm", password);
        //     console.log("Password validated.");
        // } catch (error) {
        //     console.error("Password validation error:", error);
        //     return res.status(400).json({
        //         success: false,
        //         message: "Password validation failed: " + error
        //     });
        // }