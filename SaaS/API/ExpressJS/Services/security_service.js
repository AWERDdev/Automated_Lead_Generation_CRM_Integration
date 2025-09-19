const SecurityTracking = require('../Models/SecurityTrackingModel');
const crypto = require('crypto');

class EnhancedSecurityService {
  constructor() {
    this.MAX_FAILED_ATTEMPTS = 5;
    this.BLOCK_DURATION_MINUTES = 30;
    this.RAPID_FIRE_THRESHOLD = 3;
    
    // Thresholds for unknown users/attackers
    this.MAX_UNKNOWN_EMAIL_ATTEMPTS = 3; // Lower threshold for non-existent emails
    this.MAX_IP_DIFFERENT_EMAILS = 10;   // Max different emails from same IP
    this.MAX_DEVICE_DIFFERENT_EMAILS = 5; // Max different emails from same device
    this.SUSPICIOUS_PATTERNS_THRESHOLD = 5; // Pattern-based detection
  }

  /**
   * Generate a device fingerprint from request headers
   * This helps identify the same device even with different IPs
   */
  generateDeviceFingerprint(req) {
    const userAgent = req.get('User-Agent') || '';
    const acceptLanguage = req.get('Accept-Language') || '';
    const acceptEncoding = req.get('Accept-Encoding') || '';
    const connection = req.get('Connection') || '';
    
    const fingerprint = `${userAgent}|${acceptLanguage}|${acceptEncoding}|${connection}`;
    return crypto.createHash('sha256').update(fingerprint).digest('hex');
  }

  /**
   * Enhanced failed attempt recording with unknown user detection
   */
  async recordFailedAttempt(identifier, identifierType = 'email', req = null, userExists = false) {
    try {
      const now = new Date();
      const clientIp = req ? (req.ip || req.connection.remoteAddress) : null;
      const userAgent = req ? req.get('User-Agent') : null;
      const deviceFingerprint = req ? this.generateDeviceFingerprint(req) : null;

      // Track by identifier (email/username)
      await this._updateSecurityRecord(identifier.toLowerCase(), identifierType, {
        failed: true,
        timestamp: now,
        ip: clientIp,
        userAgent,
        deviceFingerprint,
        userExists
      });

      // Track by IP address
      if (clientIp) {
        await this._updateSecurityRecord(clientIp, 'ip', {
          failed: true,
          timestamp: now,
          ip: clientIp,
          userAgent,
          deviceFingerprint,
          targetedEmail: identifierType === 'email' ? identifier.toLowerCase() : null
        });
      }

      // Track by device fingerprint
      if (deviceFingerprint) {
        await this._updateSecurityRecord(deviceFingerprint, 'device', {
          failed: true,
          timestamp: now,
          ip: clientIp,
          userAgent,
          deviceFingerprint,
          targetedEmail: identifierType === 'email' ? identifier.toLowerCase() : null
        });
      }

      // Enhanced threat detection
      await this._detectThreats(identifier, identifierType, clientIp, deviceFingerprint, userExists);

    } catch (error) {
      console.error('Error recording failed attempt:', error);
      throw error;
    }
  }

  /**
   * Internal method to update security records
   */
  async _updateSecurityRecord(identifier, identifierType, attemptData) {
    let record = await SecurityTracking.findOne({ 
      identifier: identifier, 
      identifierType 
    });

    if (!record) {
      record = new SecurityTracking({
        identifier,
        identifierType,
        failedAttempts: 0,
        attemptHistory: [],
        suspiciousActivity: {
          rapidFireAttempts: 0,
          differentIPs: [],
          differentEmails: [],
          unknownUserAttempts: 0,
          patternScore: 0
        }
      });
    }

    if (attemptData.failed) {
      record.failedAttempts += 1;
      record.lastFailedAttempt = attemptData.timestamp;

      // Track unknown user attempts
      if (!attemptData.userExists) {
        record.suspiciousActivity.unknownUserAttempts += 1;
      }

      // For IP tracking, track different emails attempted
      if (identifierType === 'ip' && attemptData.targetedEmail) {
        if (!record.suspiciousActivity.differentEmails.includes(attemptData.targetedEmail)) {
          record.suspiciousActivity.differentEmails.push(attemptData.targetedEmail);
        }
      }

      // For email tracking, track different IPs
      if (identifierType === 'email' && attemptData.ip) {
        if (!record.suspiciousActivity.differentIPs.includes(attemptData.ip)) {
          record.suspiciousActivity.differentIPs.push(attemptData.ip);
        }
      }

    } else {
      // Successful attempt
      record.failedAttempts = 0;
      record.lastSuccessfulAttempt = attemptData.timestamp;
      record.isBlocked = false;
      record.blockUntil = null;
    }

    // Add to attempt history
    record.attemptHistory.push({
      timestamp: attemptData.timestamp,
      success: !attemptData.failed,
      ip: attemptData.ip,
      userAgent: attemptData.userAgent,
      userExists: attemptData.userExists
    });

    // Check for rapid fire attempts
    const recentAttempts = record.attemptHistory.filter(
      attempt => attemptData.timestamp - attempt.timestamp <= 60000 // Last minute
    );
    
    if (recentAttempts.length >= this.RAPID_FIRE_THRESHOLD) {
      record.suspiciousActivity.rapidFireAttempts += 1;
      record.suspiciousActivity.lastSuspiciousActivity = attemptData.timestamp;
    }

    await record.save();
    return record;
  }

  /**
   * Advanced threat detection for unknown users and attack patterns
   */
  async _detectThreats(email, identifierType, ip, deviceFingerprint, userExists) {
    const threats = [];

    if (identifierType === 'email' && !userExists) {
      // Threat 1: Too many attempts on non-existent email
      const emailRecord = await SecurityTracking.findOne({ 
        identifier: email.toLowerCase(), 
        identifierType: 'email' 
      });
      
      if (emailRecord && emailRecord.suspiciousActivity.unknownUserAttempts >= this.MAX_UNKNOWN_EMAIL_ATTEMPTS) {
        threats.push({
          type: 'UNKNOWN_USER_BRUTE_FORCE',
          severity: 'HIGH',
          details: `Too many attempts on non-existent email: ${email}`
        });
        
        // Auto-block this email
        emailRecord.isBlocked = true;
        emailRecord.blockUntil = new Date(Date.now() + (this.BLOCK_DURATION_MINUTES * 2 * 60000)); // Double duration
        await emailRecord.save();
      }
    }

    if (ip) {
      // Threat 2: IP trying too many different emails
      const ipRecord = await SecurityTracking.findOne({ 
        identifier: ip, 
        identifierType: 'ip' 
      });
      
      if (ipRecord && ipRecord.suspiciousActivity.differentEmails.length >= this.MAX_IP_DIFFERENT_EMAILS) {
        threats.push({
          type: 'EMAIL_ENUMERATION_ATTACK',
          severity: 'CRITICAL',
          details: `IP ${ip} attempted ${ipRecord.suspiciousActivity.differentEmails.length} different emails`
        });
        
        // Auto-block this IP
        ipRecord.isBlocked = true;
        ipRecord.blockUntil = new Date(Date.now() + (this.BLOCK_DURATION_MINUTES * 4 * 60000)); // Quadruple duration
        await ipRecord.save();
      }
    }

    if (deviceFingerprint) {
      // Threat 3: Device trying too many different emails
      const deviceRecord = await SecurityTracking.findOne({ 
        identifier: deviceFingerprint, 
        identifierType: 'device' 
      });
      
      if (deviceRecord && deviceRecord.suspiciousActivity.differentEmails.length >= this.MAX_DEVICE_DIFFERENT_EMAILS) {
        threats.push({
          type: 'DEVICE_EMAIL_ENUMERATION',
          severity: 'HIGH',
          details: `Device attempted ${deviceRecord.suspiciousActivity.differentEmails.length} different emails`
        });
        
        // Auto-block this device
        deviceRecord.isBlocked = true;
        deviceRecord.blockUntil = new Date(Date.now() + (this.BLOCK_DURATION_MINUTES * 3 * 60000)); // Triple duration
        await deviceRecord.save();
      }
    }

    // Log threats for monitoring
    if (threats.length > 0) {
      console.warn('🚨 SECURITY THREATS DETECTED:', JSON.stringify(threats, null, 2));
      
      // Here you can integrate with your alerting system
      await this._sendSecurityAlert(threats, { email, ip, deviceFingerprint });
    }

    return threats;
  }

  /**
   * Check if request should be blocked based on multiple factors
   */
  async shouldBlockRequest(email, req) {
    const ip = req.ip || req.connection.remoteAddress;
    const deviceFingerprint = this.generateDeviceFingerprint(req);
    
    const checks = await Promise.all([
      this.isBlocked(email.toLowerCase(), 'email'),
      this.isBlocked(ip, 'ip'),
      this.isBlocked(deviceFingerprint, 'device')
    ]);

    return {
      blocked: checks.some(check => check),
      reasons: {
        email: checks[0],
        ip: checks[1],
        device: checks[2]
      }
    };
  }

  /**
   * Enhanced block checking with expiration handling
   */
  async isBlocked(identifier, identifierType = 'email') {
    try {
      const record = await SecurityTracking.findOne({ 
        identifier: identifier, 
        identifierType 
      });

      if (!record) return false;

      // Check if block has expired
      if (record.blockUntil && new Date() > record.blockUntil) {
        record.isBlocked = false;
        record.blockUntil = null;
        await record.save();
        return false;
      }

      return record.isBlocked;
    } catch (error) {
      console.error('Error checking block status:', error);
      return false;
    }
  }

  /**
   * Pattern-based attack detection
   */
  async detectSuspiciousPatterns(email, req) {
    const patterns = [];
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || '';

    // Pattern 1: Common attack user agents
    const suspiciousUserAgents = [
      'curl', 'wget', 'python-requests', 'postman', 'burp', 'sqlmap',
      'nikto', 'nmap', 'masscan', 'zap', 'gobuster'
    ];
    
    if (suspiciousUserAgents.some(agent => userAgent.toLowerCase().includes(agent))) {
      patterns.push({
        type: 'SUSPICIOUS_USER_AGENT',
        severity: 'MEDIUM',
        details: `Suspicious user agent: ${userAgent}`
      });
    }

    // Pattern 2: Sequential email attempts (admin@, test@, user@, etc.)
    const commonUsernames = ['admin', 'administrator', 'test', 'user', 'root', 'demo'];
    const emailUsername = email.split('@')[0].toLowerCase();
    
    if (commonUsernames.includes(emailUsername)) {
      const ipRecord = await SecurityTracking.findOne({ identifier: ip, identifierType: 'ip' });
      if (ipRecord) {
        const commonAttempts = ipRecord.suspiciousActivity.differentEmails.filter(
          attemptedEmail => commonUsernames.includes(attemptedEmail.split('@')[0].toLowerCase())
        ).length;
        
        if (commonAttempts >= 3) {
          patterns.push({
            type: 'COMMON_USERNAME_ENUMERATION',
            severity: 'HIGH',
            details: `IP attempting common usernames: ${commonAttempts} attempts`
          });
        }
      }
    }

    // Pattern 3: Rapid attempts from different IPs (distributed attack)
    const emailRecord = await SecurityTracking.findOne({ 
      identifier: email.toLowerCase(), 
      identifierType: 'email' 
    });
    
    if (emailRecord && emailRecord.suspiciousActivity.differentIPs.length >= 5) {
      const recentIPs = emailRecord.attemptHistory.filter(
        attempt => Date.now() - attempt.timestamp <= 300000 // Last 5 minutes
      ).map(attempt => attempt.ip);
      
      const uniqueRecentIPs = [...new Set(recentIPs)];
      if (uniqueRecentIPs.length >= 3) {
        patterns.push({
          type: 'DISTRIBUTED_BRUTE_FORCE',
          severity: 'CRITICAL',
          details: `Email targeted from ${uniqueRecentIPs.length} different IPs in 5 minutes`
        });
      }
    }

    return patterns;
  }

  /**
   * Smart delay calculation based on threat level
   */
  calculateSmartDelay(failedAttempts, userExists, threatLevel = 'LOW') {
    let baseDelay = 2;
    
    // Increase base delay for unknown users
    if (!userExists) {
      baseDelay = 5;
    }
    
    // Adjust for threat level
    const threatMultiplier = {
      'LOW': 1,
      'MEDIUM': 2,
      'HIGH': 4,
      'CRITICAL': 8
    };
    
    baseDelay *= (threatMultiplier[threatLevel] || 1);
    
    // Exponential backoff with threat-adjusted base
    const delay = Math.min(Math.pow(2, failedAttempts - 1) * baseDelay, 600); // Max 10 minutes
    return Math.floor(delay);
  }

  /**
   * Send security alerts
   */
  async _sendSecurityAlert(threats, context) {
    // Implement your alerting logic here
    // Could send to Slack, email, PagerDuty, etc.
    
    const alertData = {
      timestamp: new Date(),
      threats,
      context,
      severity: Math.max(...threats.map(t => 
        t.severity === 'CRITICAL' ? 4 : 
        t.severity === 'HIGH' ? 3 : 
        t.severity === 'MEDIUM' ? 2 : 1
      ))
    };
    
    // Example: Log to console (replace with your alerting system)
    console.error('🚨 SECURITY ALERT 🚨', JSON.stringify(alertData, null, 2));
    
    // TODO: Integrate with your monitoring/alerting system
    // await slack.sendAlert(alertData);
    // await email.sendSecurityAlert(alertData);
  }

  /**
   * Check if user exists in your system (integrate with your user lookup)
   */
  async checkUserExists(email) {
    try {
      // Check MongoDB side database first (faster)
      const sideUser = await require('../Models/UserModel').findOne({ 
        email: email.toLowerCase() 
      });
      
      if (sideUser) return true;
      
      // If not found in MongoDB, check PostgreSQL via FastAPI
      const axios = require('axios');
      try {
        const response = await axios.get('http://127.0.0.1:8000/data_receiver/Verfiy_Data_user', { 
          params: { email: email },
          timeout: 3000 // 3 second timeout
        });
        return !!response.data;
      } catch (apiError) {
        // If API is down, assume user might exist to avoid false positives
        console.warn('User existence check failed, assuming user exists:', apiError.message);
        return true;
      }
      
    } catch (error) {
      console.error('Error checking user existence:', error);
      return true; // Fail safe
    }
  }
}

module.exports = new EnhancedSecurityService();