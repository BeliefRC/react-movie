const Category = require('../models/Category');
const setJson = require('../until/SetJson');

exports.saveCategory = async (req, res) => {
    let _category = req.body.category;
    const category = new Category(_category);
    try {
        await category.save();
        //分类只在电影新增，修改时会增加，不需要res
    } catch (e) {
        console.log(e);
        res.json(setJson(false, e.stack, null))
    }
};

exports.categoryList = async (req, res) => {
    try {
        let categories = await Category.fetch();
        res.json(setJson(true, '分类列表查询成功', categories))
    } catch (e) {
        console.log(e);
        res.json(setJson(false, e.stack, null))
    }
};
exports.categoryAndMovieList = async (req, res) => {
    try {
        let categories = await Category
            .find({})
            .populate({
                path: 'movies',
            });
        res.json(setJson(true, '按分类查找电影成功', categories))
    } catch (e) {
        console.log(e);
        res.json(setJson(false, e.stack, null))
    }
};