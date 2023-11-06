const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  userRole: String,
  type: String,
  age: Number,
  occupation: String,
  phoneNumber: String,
  adminKey: {
    type: String,
    default: '', // Default value is an empty string
  },
});

module.exports = mongoose.model('User', userSchema);
