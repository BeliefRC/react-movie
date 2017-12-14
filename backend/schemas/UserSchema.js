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

//新增用户
UserSchema.pre('save', function (next) {
    let user = this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err)
        } else {
            //密码加盐
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                if (err) {
                    return next(err)
                } else {
                    user.password = hash;
                    next()
                }
            })
        }
    })
});

//匹配密码
UserSchema.methods = {
    comparePassword(_password, cb) {
        bcrypt.compare(_password, this.password, (err, isMatch) => {
            if (err) {
                console.log(err);
                return cb(err)
            } else {
                cb(null, isMatch)
            }
        })
    }
};

UserSchema.statics = {
    fetch(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
};

module.exports = UserSchema;