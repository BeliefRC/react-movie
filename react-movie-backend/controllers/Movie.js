const Movie = require('../models/Movie');
const Category = require('../models/Category');
exports.detail = (req, res) => {
    let id = req.query.movieId;
    Movie.findOne({_id: id}).populate({
        path: 'category',
        select: 'name'
    }).exec(
        (err, movie) => {
            if (err) {
                console.log(err);
                let data = {
                    success: false,
                    msg: err.toString(),
                    backData: null
                };
                res.end(JSON.stringify(data));
            } else {
                let data = {
                    success: true,
                    msg: '查看电影详情成功',
                    backData: movie
                };
                res.end(JSON.stringify(data));
            }
        }
    )
};

exports.movieList = (req, res) => {
    Movie
        .find({})
        .populate({
            path: 'category',
            select: 'name'
        })
        .exec((err, movies) => {
            if (err) {
                console.log(err);
                let data = {
                    success: false,
                    msg: err.toString(),
                    backData: null
                };
                res.end(JSON.stringify(data));
            } else {
                let data = {
                    success: true,
                    msg: '查询电影列表成功',
                    backData: movies
                };
                res.end(JSON.stringify(data));
            }
        })
};


exports.saveMovie = (req, res) => {
    let _movie = req.body;
    Movie.find({title: _movie.title}, (err, movie) => {
        if (err) {
            console.log(err);
            let data = {
                success: false,
                msg: err.toString(),
                backData: null
            };
            res.end(JSON.stringify(data))
        } else {
            //已保存过当前电影
            if (movie.length) {
                let data = {
                    success: false,
                    msg: `电影《${_movie.title}》已存在`,
                    backData: null
                };
                res.end(JSON.stringify(data))
            } else {
                //新增电影
                //首先存储电影（暂时将分类删除）
                let categoryArr = _movie.category.split(',');
                delete _movie.category;
                let newMovie = new Movie(_movie);
                newMovie.save((err, movie) => {
                    if (err) {
                        console.log(err);
                        let data = {
                            success: false,
                            msg: err.toString(),
                            backData: null
                        };
                        res.end(JSON.stringify(data))
                    } else {
                        //电影存储成功后存储分类，并且将存储好的分类id重新赋值给movie，再次存储movie
                        saveCategory(categoryArr, movie, res);
                    }
                })
            }
        }
    })
};

//更新电影
exports.updateMovie = (req, res) => {
    let _movie = req.body;
    if (_movie._id) {
        Movie.findById(_movie._id, (err, movie) => {
            if (err) {
                console.log(err);
                let data = {
                    success: false,
                    msg: err.toString(),
                    backData: null
                };
                res.end(JSON.stringify(data))
            } else {
                console.log(movie);
                Object.assign(movie, _movie);
                console.log(movie);
                let categoryArr=_movie.category.split(',');
                 movie.category=undefined;
                movie.save((err, movie) => {
                    if (err) {
                        console.log(err);
                        let data = {
                            success: false,
                            msg: err.toString(),
                            backData: null
                        };
                        res.end(JSON.stringify(data))
                    } else {
                      /*  let data = {
                            success: true,
                            msg: `更新电影《${_movie.title}》成功`,
                            backData: null
                        };
                        res.end(JSON.stringify(data))*/
                        saveCategory(categoryArr, movie, res);
                    }
                })
            }
        })
    } else {
        let data = {
            success: false,
            msg: 'id不存在，请勿随意修改页面url',
            backData: null
        };
        res.end(JSON.stringify(data))

    }
};

//删除电影
exports.deleteMovie = (req, res) => {
    let _id = req.query._id;
    if (_id) {
        Movie.remove({_id}, (err, movie) => {
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
                    msg: `删除电影《${movie.title}》成功`,
                    backData: null
                };
                res.end(JSON.stringify(data))
            }
        })
    }
};

async function saveCategory(categoryArr, movie, res) {
    let newArr = [];
    for (let i = 0; i < categoryArr.length; i++) {//await 不能嵌套在函数内所以只能用for循环
        await Category.find({name: categoryArr[i].name}, (err, findCategory) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: err.toString(),
                    backData: null
                })
            } else {
                //存在当前分类
                if (findCategory.length) {
                    newArr.push(findCategory.id)
                } else {
                    //当前分类不存在，先新增分类
                    let newCategory = new Category({
                        name: categoryArr[i],
                        movies: [movie._id]
                    });
                    newCategory.save((err, category) => {
                        if (err) {
                            console.log(err);
                            res.json({
                                success: false,
                                msg: err.toString(),
                                backData: null
                            })
                        } else {
                            newArr.push(category.id)
                        }
                    })
                }
            }
        });
    }
    movie.category = newArr;
    movie.save((err, movie) => {
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
                msg: `新增电影《${movie.title}》成功`,
                backData: null
            };
            res.end(JSON.stringify(data))
        }
    });
    console.log(newArr);
}

