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
    let base_delay = 5; // in seconds
    if failed_attempts > 0 {
        // Exponential backoff: 2^failed_attempts, capped to prevent overflow
        let delay = 2u64.pow(failed_attempts.min(3)) + base_delay;
        println!("Delaying for {} seconds...", delay);
        sleep(Duration::from_secs(delay)).await;
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use tokio::time::Instant;

    #[test]
    fn test_rate_limiter_allows_within_limit() {
        let mut limiter = RateLimiter::new(3, 10); // 3 attempts in 10 seconds

        assert!(limiter.is_allowed("user1"));
        assert!(limiter.is_allowed("user1"));
        assert!(limiter.is_allowed("user1"));

        // Fourth attempt should be blocked
        assert!(!limiter.is_allowed("user1"));
    }

    #[test]
    fn test_rate_limiter_resets_after_window() {
        let mut limiter = RateLimiter::new(2, 0); // 2 attempts, 0s window (instant reset)

        assert!(limiter.is_allowed("user2"));
        assert!(limiter.is_allowed("user2"));
        // Because window is 0, next attempt should reset and allow again
        assert!(limiter.is_allowed("user2"));
    }

    #[tokio::test]
    async fn test_delay_on_failure() {
        use tokio::time::{Duration};

        let start = Instant::now();
        delay_on_failure(1).await; // should delay 2^1 + 5 = 7 seconds
        let elapsed = start.elapsed();

        assert!(elapsed >= Duration::from_secs(7));
    }
}
