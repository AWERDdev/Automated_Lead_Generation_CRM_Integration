mod modules;

use modules::auth::{create_token, verify_token};
use modules::password::{hash_password, verify_password, validate_password};
use modules::security::{RateLimiter, delay_on_failure};

#[tokio::main] // because delay_on_failure is async
async fn main() {
    println!("--- Testing Rust Module ---");

    // ✅ Token
    let user_id = "user123";
    match create_token(user_id) {
        Ok(token) => {
            println!("Token created: {}", token);
            match verify_token(&token) {
                Ok(claims) => println!("Verified claims: {:?}", claims),
                Err(err) => println!("❌ Failed to verify token: {}", err),
            }
        }
        Err(err) => println!("❌ Failed to create token: {}", err),
    }

    // ✅ Password hashing
    let password = "MySecurePassword123!";
    match hash_password(password) {
        Ok(hash) => {
            println!("Password hash: {}", hash);

            // Verify password
            match verify_password(password, &hash) {
                Ok(valid) => println!("Password verification: {}", valid),
                Err(err) => println!("❌ Error verifying password: {:?}", err),
            }

            // Validate password
            match validate_password(password) {
                Ok(()) => println!("Password validation passed ✅"),
                Err(err) => println!("❌ Password validation failed: {:?}", err),
            }
        }
        Err(err) => println!("❌ Failed to hash password: {:?}", err),
    }

    // ✅ Rate Limiter
    let mut rl = RateLimiter::new(3, 10); // allow 3 requests per 10 seconds
    for i in 1..5 {
        let allowed = rl.is_allowed("user123");
        println!("Request {} allowed? {}", i, allowed);
    }

    // ✅ Delay on failure (simulate 3 failed attempts)
    println!("Simulating delay...");
    delay_on_failure(3).await;
    println!("Delay completed.");
}

