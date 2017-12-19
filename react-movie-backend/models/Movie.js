const mongoose = require('mongoose');
const MovieSchema = require('../schemas/MovieSchema');

// 生成Movie模型
const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;