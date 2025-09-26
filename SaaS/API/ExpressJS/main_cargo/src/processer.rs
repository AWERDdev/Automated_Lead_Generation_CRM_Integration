pub mod modules;

// Re-export commonly used functions
pub use modules::auth::{create_token, verify_token};
pub use modules::password::{hash_password, verify_password, validate_password, PasswordError};
pub use modules::security::{RateLimiter, delay_on_failure};

// WASM bindings
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn create_token_wasm(user_id: &str) -> Result<String, JsValue> {
    create_token(user_id).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn validate_password_wasm(password: &str) -> Result<(), JsValue> {
    validate_password(password).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn verify_token_wasm(token: &str) -> Result<JsValue, JsValue> {
    verify_token(token)
        .map(|claims| serde_json::to_string(&claims).unwrap())
        .map(|json| JsValue::from_str(&json))
        .map_err(|e| JsValue::from_str(&e.to_string()))
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn hash_password_wasm(password: &str) -> Result<String, JsValue> {
    hash_password(password)
        .map_err(|e| JsValue::from_str(&format!("{:?}", e)))
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn verify_password_wasm(password: &str, hash: &str) -> Result<bool, JsValue> {
    verify_password(password, hash)
        .map_err(|e| JsValue::from_str(&format!("{:?}", e)))
}

// --- FIXED RATE LIMITER ---
use lazy_static::lazy_static;
use parking_lot::Mutex;

lazy_static! {
    static ref GLOBAL_RATE_LIMITER: Mutex<RateLimiter> = Mutex::new(RateLimiter::new(10, 60));
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn rate_limiter_wasm(user: &str) -> Result<bool, JsValue> {
    let mut limiter = GLOBAL_RATE_LIMITER.lock();
    Ok(limiter.is_allowed(user))
}
