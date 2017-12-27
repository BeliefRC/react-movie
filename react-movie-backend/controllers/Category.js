const Category = require('../models/Category');
exports.saveCategory = (req, res) => {
    let _category = req.body.category;
    const category = new Category(_category);

    category.save((err, category) => {
        if (err) {
            console.log(err);
            let data = {
                success: false,
                msg: err.toString(),
                backData: null
            };
            res.end(JSON.stringify(data))
        }
    });
};

exports.categoryList = (req, res) => {
    Category.fetch((err, categories) => {
        if (err) {
            console.log(err);
            let data = {
                success: false,
                msg: err.toString(),
                backData: null
            };
            res.end(JSON.stringify(data))
        } else {
            let data = {
                success: true,
                msg: err.toString(),
                backData: categories
            };
            res.end(JSON.stringify(data))
        }
    })
};