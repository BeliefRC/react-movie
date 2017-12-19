const mongoose = require('mongoose');
const MovieSchema = new mongoose.Schema({
    title: String,
    director: String,
    country: String,
    language: String,
    poster: String,
    flash: String,
    year: Date,
    category: String,
    summary: String,
    pv: {
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
MovieSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next();
});

MovieSchema.statics = {
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

module.exports = MovieSchema;