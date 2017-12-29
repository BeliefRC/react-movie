const Promise = require("bluebird");
const Movie = require('../models/Movie');
const Category = require('../models/Category');
const setJson = require('../until/SetJson');

exports.detail = async (req, res) => {
    let id = req.query.movieId;
    try {
        let movie = await Movie.findOne({_id: id})
            .populate({
                path: 'category',
                select: 'name'
            });
        res.json(setJson(true, '查看电影详情成功', movie))
    } catch (e) {
        console.log(e);
        res.json(setJson(false, e.stack, null))
    }
};

exports.movieList = async (req, res) => {
    try {
        let movie = await Movie.find({})
            .sort({'meta.updateAt': -1})
            .populate({
                path: 'category',
                select: 'name'
            });
        res.json(setJson(true, '查询电列表情成功', movie))
    } catch (e) {
        console.log(e);
        res.json(setJson(false, e.stack, null))
    }
};

//保存或新增
exports.saveMovie = async (req, res) => {
    let _movie = req.body;
    let categoryArr = _movie.category.split(',');//前端传来分类名称的数组
    //暂时将分类删除
    delete _movie.category;
    try {
        //判断_id存在则更新，不存在则新增
        if (_movie._id) {
            //更新
            let movie = await Movie.findOne({_id: _movie._id})
                .populate({
                    path: 'category',
                    select: 'name'
                });
            if (movie) {
                let originCategoryArr = [];
                movie.category.map(item => {
                    originCategoryArr.push(item.name)
                });
                await delMovieFromCategory(originCategoryArr, categoryArr, movie);
                await Movie.findOneAndUpdate({_id: _movie._id}, _movie);
                await saveCategory(categoryArr, movie, res, `更新`);

            } else {
                res.json(setJson(false, '电影不存在，请勿随意修改页面url', null))
            }

        } else {
            //新增
            let movie = await Movie.find({title: _movie.title});
            if (movie.length) {
                //存在相同名称的电影
                res.json(setJson(false, `电影《${_movie.title}》已存在`, null))
            } else {
                //进行新增操作
                //首先存储电影
                let newMovie = new Movie(_movie);
                let movie = await newMovie.save();
                await saveCategory(categoryArr, movie, res, `新增`);
            }
        }
    } catch (e) {
        console.log(e);
        res.json(setJson(false, e.stack, null))
    }
};

//删除电影
exports.deleteMovie = async (req, res) => {
    let _id = req.query._id;
    if (_id) {
        try {
            let movie = await Movie.findOne({_id})
                .populate({
                    path: 'category',
                    select: 'name'
                });
            let originCategoryArr = [];
            movie.category.map(item => {
                originCategoryArr.push(item.name)
            });
            await delMovieFromCategory(originCategoryArr, [], movie);
            await Movie.findOneAndRemove({_id});
            res.json(setJson(true, `删除电影成功`, null))
        } catch (e) {
            console.log(e);
            res.json(setJson(false, e.stack, null))
        }
    }
};

async function saveCategory(categoryArr, movie, res, str) {
    movie.category = [];
    /*    let categoryPromiseArr = [];
        for (let i = 0; i < categoryArr.length; i++) {
            categoryPromiseArr.push(Category.findOne({name: categoryArr[i]})
                .then(
                    (findCategory) => {
                        if (findCategory) {
                            movie.category.push(findCategory.id)
                        } else {
                            let newCategory = new Category({
                                name: categoryArr[i],
                                movies: [movie._id]
                            });
                            newCategory
                                .save()
                                .then((category) => {
                                    movie.category.push(category._id)
                                });
                        }
                    }
                ))
        }
        await Promise.all(categoryPromiseArr);*/
    for (let i = 0; i < categoryArr.length; i++) {
        let findCategory = await Category.findOne({name: categoryArr[i]});
        if (findCategory) {
            //存在此分类，直接在movie中保存分类id
            movie.category.push(findCategory._id);
            //在分类中存入电影
            if (findCategory.movies.indexOf(movie._id) === -1) {
                findCategory.movies.push(movie._id);
                await findCategory.save();
            }
        } else {
            //不存在该分类，先新建该分类
            let newCategory = new Category({
                name: categoryArr[i],
                movies: [movie._id]
            });
            let category = await newCategory.save();
            movie.category.push(category._id)
        }
    }
    let finishMovie = await movie.save();
    res.json(setJson(true, `${str}电影成功`, finishMovie))
}

//进行修改或删除操作时，将电影从原有分类中删除
async function delMovieFromCategory(originCategoryArr, categoryArr, movie) {
    let flag = false;
    for (let i = 0; i < originCategoryArr.length; i++) {
        for (let j = 0; j < categoryArr.length; j++) {
            //如果原始分类数组中的分类在跟新后的数组中也存在
            if (originCategoryArr[i] === categoryArr[j]) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            //原始分类有，更新后的分类无
            let category = await Category.findOne({name: originCategoryArr[i]});
            for (let k = 0; k < category.movies.length; k++) {
                console.log(category.movies[k]);
                console.log(movie._id);
                //id为引用类型
                if (category.movies[k].toString() === movie._id.toString()) {
                    //把原分类中的此电影删除掉
                    category.movies.splice(k, 1);
                    category.markModified('movies');
                    k--
                }
            }
            await category.save();
            console.log(category.movies);
        } else {
            flag = false
        }
    }
}
