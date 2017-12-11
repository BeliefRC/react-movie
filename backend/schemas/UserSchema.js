const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password: String,
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

module.exports = UserSchema;