const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const SALT_WORK_FACTOR = 10;
const UserSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String
    },
    password: String,
    email: String,
    phone: String,
    prefix: String,
    residence: Array,
    website: String,
    role: {
        type: Number,
        default: 0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});
UserSchema.pre('save', next => {
    this.isNew ?
        this.meta.createAt = this.meta.updateAt = Date.now() :
        this.meta.updateAt = Date.now();
    next();
});
UserSchema.pre('save', next => {

});

module.exports = UserSchema;