const express = require('express')
const router = express.Router()
const rust = require('../../main_cargo/pkg/rust_processer_lib.js');
const axios = require('axios')
const SecurityService = require('../../Services/EnhancedSecurityService');
const UserschemaSideModel = require('../../Models/SideModels/UserModel');

router.post('/login_postgres', async (req, res) => {
    const { email, password } = req.body;
    
    console.log('Login attempt for:', email);
    
    try {
        // 1. FIRST: Check if request should be blocked (email, IP, device)
        const blockCheck = await SecurityService.shouldBlockRequest(email, req);
        if (blockCheck.blocked) {
            let message = 'Access temporarily restricted.';
            
            if (blockCheck.reasons.email) message = 'Account temporarily locked due to security concerns.';
            else if (blockCheck.reasons.ip) message = 'Too many attempts from this location.';
            else if (blockCheck.reasons.device) message = 'Device temporarily restricted.';
            
            return res.status(429).json({
                success: false,
                message,
                blocked: true,
                retryAfter: 1800 // 30 minutes
            });
        }

        // 2. Rust WASM Rate Limiter (additional protection)
        const key = email || req.ip;
        let rateLimitAllowed = true;
        
        try {
            if (typeof rust.rate_limiter_wasm === "function") {
                rateLimitAllowed = await rust.rate_limiter_wasm(key);
            } else if (typeof rust.default?.rate_limiter_wasm === "function") {
                rateLimitAllowed = await rust.default.rate_limiter_wasm(key);
            }
        } catch (rustError) {
            console.warn('Rust rate limiter error:', rustError);
            // Continue without rate limiting if Rust fails
        }

        if (!rateLimitAllowed) {
            await SecurityService.recordFailedAttempt(email, 'email', req, false);
            return res.status(429).json({
                success: false,
                message: 'Too many requests. Please slow down.',
                rateLimited: true
            });
        }

        // 3. Check if user exists BEFORE attempting authentication
        console.log('Checking if user exists...');
        const userExists = await SecurityService.checkUserExists(email);
        
        // 4. Detect suspicious patterns early
        const suspiciousPatterns = await SecurityService.detectSuspiciousPatterns(email, req);
        const threatLevel = suspiciousPatterns.length > 0 ? 
            Math.max(...suspiciousPatterns.map(p => 
                p.severity === 'CRITICAL' ? 4 : 
                p.severity === 'HIGH' ? 3 : 
                p.severity === 'MEDIUM' ? 2 : 1
            )) : 1;
        
        const threatLevelStr = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'][threatLevel - 1] || 'LOW';

        // 5. If user doesn't exist, handle as potential attack
        if (!userExists) {
            console.log('User does not exist, recording as potential attack');
            
            await SecurityService.recordFailedAttempt(email, 'email', req, false);
            
            // Calculate delay based on failed attempts and threat level
            const failedAttempts = await SecurityService.getFailedAttempts(email, 'email');
            const delaySecs = SecurityService.calculateSmartDelay(failedAttempts, false, threatLevelStr);
            
            console.log(`Non-existent user attempt. Delaying for ${delaySecs} seconds...`);
            
            if (delaySecs > 0) {
                await new Promise(resolve => setTimeout(resolve, delaySecs * 1000));
            }
            
            // Always return the same message to avoid user enumeration
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // 6. User exists, proceed with authentication
        console.log('User exists, proceeding with authentication...');
        
        let user;
        try {
            const response = await axios.get('http://127.0.0.1:8000/data_receiver/Verfiy_Data_user', { 
                params: { email: email },
                timeout: 5000
            });
            user = response.data;
        } catch (apiError) {
            console.error('Error fetching user from API:', apiError);
            
            // Record as failed attempt due to system error
            await SecurityService.recordFailedAttempt(email, 'email', req, true);
            
            return res.status(500).json({
                success: false,
                message: "Authentication service temporarily unavailable"
            });
        }

        if (!user) {
            // This shouldn't happen if checkUserExists worked correctly
            await SecurityService.recordFailedAttempt(email, 'email', req, false);
            
            const failedAttempts = await SecurityService.getFailedAttempts(email, 'email');
            const delaySecs = SecurityService.calculateSmartDelay(failedAttempts, false, threatLevelStr);
            
            if (delaySecs > 0) {
                await new Promise(resolve => setTimeout(resolve, delaySecs * 1000));
            }
            
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // 7. Verify password using Rust
        let isValidPassword = false;
        try {
            if (typeof rust.verify_password_wasm === "function") {
                isValidPassword = await rust.verify_password_wasm(password, user.password);
            } else if (typeof rust.default?.verify_password_wasm === "function") {
                isValidPassword = await rust.default.verify_password_wasm(password, user.password);
            } else {
                throw new Error("verify_password_wasm not found in WASM module");
            }
        } catch (passwordError) {
            console.error('Password verification error:', passwordError);
            
            await SecurityService.recordFailedAttempt(email, 'email', req, true);
            
            return res.status(500).json({
                success: false,
                message: "Authentication error occurred"
            });
        }
        
        if (!isValidPassword) {
            console.log('Invalid password for existing user');
            
            await SecurityService.recordFailedAttempt(email, 'email', req, true);
            
            // Calculate delay for existing user with wrong password
            const failedAttempts = await SecurityService.getFailedAttempts(email, 'email');
            const delaySecs = SecurityService.calculateSmartDelay(failedAttempts, true, threatLevelStr);
            
            console.log(`Invalid password. Delaying for ${delaySecs} seconds...`);
            
            if (delaySecs > 0) {
                await new Promise(resolve => setTimeout(resolve, delaySecs * 1000));
            }
            
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // 8. SUCCESS! Record successful login and create token
        console.log('Successful authentication, creating token...');
        
        await SecurityService.recordSuccessfulAttempt(email, 'email', req, true);

        // Create JWT token using Rust
        let token;
        try {
            if (typeof rust.create_token_wasm === "function") {
                token = await rust.create_token_wasm(user.UserID.toString());
            } else if (typeof rust.default?.create_token_wasm === "function") {
                token = await rust.default.create_token_wasm(user.UserID.toString());
            } else {
                throw new Error("create_token_wasm not found in WASM module");
            }
        } catch (tokenError) {
            console.error('Token creation error:', tokenError);
            return res.status(500).json({
                success: false,
                message: "Error creating authentication token"
            });
        }

        // Update MongoDB side database with token and last login
        try {
            await UserschemaSideModel.findOneAndUpdate(
                { email: email.toLowerCase() },
                { 
                    token: token,
                    lastLogin: new Date(),
                    username: user.username || user.name // Sync username if needed
                },
                { upsert: true, new: true }
            );
        } catch (mongoError) {
            console.error('Error updating MongoDB side model:', mongoError);
            // Don't fail the login for this
        }

        // Success response
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user.UserID,
                email: user.email,
                username: user.username || user.name
            }
        });

    } catch (error) {
        console.error('Login system error:', error);
        
        // Record as failed attempt even for system errors
        try {
            await SecurityService.recordFailedAttempt(email, 'email', req, false);
        } catch (securityError) {
            console.error('Error recording security event:', securityError);
        }

        // Handle specific error types
        if (error.response && error.response.status === 400) {
            return res.status(400).json({
                success: false,
                message: "Invalid request format"
            });
        }
        
        res.status(500).json({
            success: false,
            message: "An error occurred during login. Please try again."
        });
    }
});

// Security monitoring endpoints
router.get('/security-status/:email', async (req, res) => {
    try {
        const { email } = req.params;
        
        // Only show limited info to prevent information disclosure
        const failedAttempts = await SecurityService.getFailedAttempts(email, 'email');
        const isBlocked = await SecurityService.isBlocked(email, 'email');
        
        res.json({
            failedAttempts: failedAttempts > 0 ? 'Some failed attempts detected' : 'No issues',
            status: isBlocked ? 'temporarily_restricted' : 'normal',
            canRetry: !isBlocked
        });
    } catch (error) {
        res.status(500).json({ error: 'Unable to check status' });
    }
});

router.get('/admin/security-dashboard', async (req, res) => {
    try {
        // Add proper admin authentication here
        
        const analytics = await SecurityService.getAnalytics();
        
        // Get top attacked emails (non-existent users)
        const topAttackedEmails = await SecurityTracking.aggregate([
            { $match: { 
                identifierType: 'email',
                'suspiciousActivity.unknownUserAttempts': { $gte: 1 }
            }},
            { $project: {
                email: '$identifier',
                attempts: '$suspiciousActivity.unknownUserAttempts',
                totalFailed: '$failedAttempts',
                lastAttempt: '$lastFailedAttempt',
                isBlocked: 1
            }},
            { $sort: { attempts: -1 } },
            { $limit: 20 }
        ]);
        
        res.json({
            ...analytics,
            unknownUserAttacks: topAttackedEmails
        });
    } catch (error) {
        console.error('Error fetching security dashboard:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
});

module.exports = router;