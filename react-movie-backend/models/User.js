const mongoose = require('mongoose');
const UserSchema = require('../schemas/UserSchema');
const User = mongoose.model('User', UserSchema);
module.exports = User;