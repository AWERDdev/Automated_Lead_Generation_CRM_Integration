const mongoose = require('mongoose');

const AdminschemaSideModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  token: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    default: null
  },
  role: {
    type: String,
    default: 'User',
    enum: ['User']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    default: 'admin',
    enum: ['admin', 'super_admin']
  },
  lastLogin: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
AdminschemaSideModel.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

AdminschemaSideModel.index({ isActive: 1 });
AdminschemaSideModel.index({ role: 1 });

const Admin = mongoose.model('Admin', AdminschemaSideModel);

module.exports = Admin;

