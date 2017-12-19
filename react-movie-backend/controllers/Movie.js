const Movie = require('../models/Movie');

exports.movieList = (req, res) => {
    Movie.fetch((err, movies) => {
        if (err) {
            console.log(err);
            let data = {
                success: false,
                msg: err,
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
                msg: err,
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
                movie = new Movie (_movie);
                movie.save(err => {
                    if (err) {
                        console.log(err);
                        let data = {
                            success: false,
                            msg: err,
                            backData: null
                        };
                        res.end(JSON.stringify(data))
                    } else {
                        let data = {
                            success: true,
                            msg: `新增电影《${_movie.title}》成功`,
                            backData: null
                        };
                        res.end(JSON.stringify(data))
                    }
                })
            }
        }
    })
};