const mongoose = require('mongoose');
const MovieSchema = require('../schemas/MovieSchema');
const Promise = require("bluebird");

// 生成Movie模型
const Movie = mongoose.model('Movie', MovieSchema);
Promise.promisifyAll(Movie);
Promise.promisifyAll(Movie.prototype);
module.exports = Movie;