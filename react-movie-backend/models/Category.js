const mongoose = require('mongoose');
const CategorySchema = require('../schemas/CategorySchema');
const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;