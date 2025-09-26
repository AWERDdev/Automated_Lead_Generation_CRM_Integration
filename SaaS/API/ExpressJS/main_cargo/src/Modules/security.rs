use std::collections::HashMap;
use std::time::{Duration, SystemTime}; // <-- std::time for Duration + SystemTime
use tokio::time::sleep; // <-- only sleep comes from tokio

pub struct RateLimiter {
    attempts: HashMap<String, (u32, SystemTime)>,
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
        let now = SystemTime::now();
        let entry = self.attempts.entry(user.to_string()).or_insert((0, now));

        // duration_since returns Result<Duration, SystemTimeError>
        if let Ok(elapsed) = now.duration_since(entry.1) {
            if elapsed > self.window {
                *entry = (1, now);
                return true;
            }
        }

        if entry.0 < self.max_attempts {
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
        let delay = 2u64.pow(failed_attempts.min(3)) + base_delay;
        println!("Delaying for {} seconds...", delay);
        sleep(std::time::Duration::from_secs(delay)).await;
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::time::Instant; // <-- use Instant for measuring elapsed time

    #[test]
    fn test_rate_limiter_allows_within_limit() {
        let mut limiter = RateLimiter::new(3, 10);

        assert!(limiter.is_allowed("user1"));
        assert!(limiter.is_allowed("user1"));
        assert!(limiter.is_allowed("user1"));

        // Fourth attempt should be blocked
        assert!(!limiter.is_allowed("user1"));
    }

    #[test]
    fn test_rate_limiter_resets_after_window() {
        let mut limiter = RateLimiter::new(2, 0); // resets instantly

        assert!(limiter.is_allowed("user2"));
        assert!(limiter.is_allowed("user2"));
        assert!(limiter.is_allowed("user2")); // should reset and allow again
    }

    #[tokio::test]
    async fn test_delay_on_failure() {
        let start = Instant::now();
        delay_on_failure(1).await; // 2^1 + 5 = 7 seconds
        let elapsed = start.elapsed();

        assert!(elapsed >= std::time::Duration::from_secs(7));
    }
}

