const mongoose = require('mongoose');
const Promise = require("bluebird");

const CategorySchema = require('../schemas/CategorySchema');
const Category = mongoose.model('Category', CategorySchema);
Promise.promisifyAll(Category);
Promise.promisifyAll(Category.prototype);
module.exports = Category;