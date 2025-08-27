use std::collections::HashMap;
use tokio::time::{Duration, Instant ,sleep};

pub struct RateLimiter {
    attempts: HashMap<String, (u32, Instant)>,
    max_attempts: u32,
    window: Duration,
}

impl RateLimiter {
    pub fn new(max_attempts: u32, window_secs: u64) -> Self {
        Self {
            attempts: HashMap::new(),
            max_attempts,
            window: Duration::from_secs(window_secs),
        }
    }

    pub fn is_allowed(&mut self, user: &str) -> bool {
        let now = Instant::now();
        let entry = self.attempts.entry(user.to_string()).or_insert((0, now));
        if now.duration_since(entry.1) > self.window {
            *entry = (1, now);
            true
        } else if entry.0 < self.max_attempts {
            entry.0 += 1;
            true
        } else {
            false
        }
    }
}



pub async fn delay_on_failure(failed_attempts: u32) {
    let base_delay = 1; // in seconds
    if failed_attempts > 0 {
        // Exponential backoff: 2^failed_attempts, capped to prevent overflow
        let delay = 2u64.pow(failed_attempts.min(1)) + base_delay;
        println!("Delaying for {} seconds...", delay);
        sleep(Duration::from_secs(delay)).await;
    }
}

