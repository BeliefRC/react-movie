const mongoose = require('mongoose');
const Promise = require("bluebird");
const UserSchema = require('../schemas/UserSchema');
const User = mongoose.model('User', UserSchema);
Promise.promisifyAll(User);
Promise.promisifyAll(User.prototype);
module.exports = User;