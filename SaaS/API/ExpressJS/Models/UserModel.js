const mongoose = require('mongoose');
const { token } = require('morgan');
const Schema = mongoose.Schema;

const UserschemaSideModel = new Schema({
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
    email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
    lastLogin: {
    type: Date,
    default: null
  },
    isActive: {
    type: Boolean,
    default: true
  },

  role: {
    type: String,
    default: 'User',
    enum: ['User']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

// Update the updatedAt field before saving
UserschemaSideModel.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});
UserschemaSideModel.index({ isActive: 1 });
UserschemaSideModel.index({ role: 1 });

module.exports = mongoose.models.User ||  mongoose.model('User', UserschemaSideModel);

