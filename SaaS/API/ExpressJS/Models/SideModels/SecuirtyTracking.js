const mongoose = require('mongoose');

const SecurityTrackingSchema = new mongoose.Schema({
  identifier: {
    type: String,
    required: true,
    index: true, // For fast lookups
    trim: true
  },
  identifierType: {
    type: String,
    required: true,
    enum: ['email', 'ip', 'username'],
    default: 'email'
  },
  failedAttempts: {
    type: Number,
    default: 0,
    min: 0
  },
  lastFailedAttempt: {
    type: Date,
    default: null
  },
  lastSuccessfulAttempt: {
    type: Date,
    default: null
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  blockUntil: {
    type: Date,
    default: null
  },
  // Track attempts over time for analysis
  attemptHistory: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    success: {
      type: Boolean,
      required: true
    },
    ip: String,
    userAgent: String
  }],
  // Additional security metadata
  suspiciousActivity: {
    rapidFireAttempts: { type: Number, default: 0 },
    differentIPs: { type: [String], default: [] },
    lastSuspiciousActivity: Date
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000 // Auto-delete after 30 days
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for efficient queries
SecurityTrackingSchema.index({ identifier: 1, identifierType: 1 }, { unique: true });
SecurityTrackingSchema.index({ blockUntil: 1 });
SecurityTrackingSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 }); // TTL index

// Update the updatedAt field before saving
SecurityTrackingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  
  // Limit attempt history to last 50 entries to prevent document bloat
  if (this.attemptHistory && this.attemptHistory.length > 50) {
    this.attemptHistory = this.attemptHistory.slice(-50);
  }
  
  next();
});

// Clean up old IPs from suspicious activity tracking
SecurityTrackingSchema.pre('save', function(next) {
  if (this.suspiciousActivity && this.suspiciousActivity.differentIPs.length > 20) {
    this.suspiciousActivity.differentIPs = this.suspiciousActivity.differentIPs.slice(-20);
  }
  next();
});

const SecurityTracking = mongoose.model('SecurityTracking', SecurityTrackingSchema);

module.exports = SecurityTracking;