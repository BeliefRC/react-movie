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


exports.movieSave = (req, res) => {
    let _movie = req.body;

    User.find({username: _user.username}, (err, user) => {
        if (err) {
            console.log(err);
            let data = {
                success: false,
                msg: err,
                backData: null
            };
            res.end(JSON.stringify(data));
        } else {
            //查找当前用户是否存在
            if (user.length) {
                console.log('用户名已存在');
                let data = {
                    success: false,
                    msg: '用户名已存在',
                    backData: null
                };
                res.end(JSON.stringify(data));
            } else {
                //保存当前用户
                user = new User(_user);
                user.save(err => {
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
                            msg: '注册成功',
                            backData: null
                        };
                        res.end(JSON.stringify(data));
                    }
                })
            }
        }
    });
};