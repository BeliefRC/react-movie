const User = require('../models/User');
exports.register = (req, res) => {
    const _user = req.body;
    User.find({username: _user.username}, (err, user) => {
        if (err) {
            console.log(err);
            let data = {
                success: false,
                msg: err.toString(),
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
                            msg: err.toString(),
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

exports.login = (req, res) => {
    let _user = req.body;
    let username = _user.username;
    let password = _user.password;
    User.findOne({username:username}, (err, user) => {
        if (err) {
            console.log(err);
            let data = {
                success: false,
                msg: err.toString(),
                backData: null
            };
            res.end(JSON.stringify(data));
        } else {
            //用户名不存在
            if (!user) {
                console.log('用户名不存在，请注册');
                let data = {
                    success: false,
                    msg: '用户名不存在，请注册',
                    backData: null
                };
                res.end(JSON.stringify(data));
            } else {
                user.comparePassword(password, (err, isMatch) => {
                    //匹配密码时出错
                    if (err) {
                        console.log(err);
                        let data = {
                            success: false,
                            msg: err.toString(),
                            backData: null
                        };
                        res.end(JSON.stringify(data));
                    } else {
                        if (isMatch) {
                            console.log(`${username}:登陆成功`);
                            req.session.user = user;
                            let data = {
                                success: true,
                                msg: '登陆成功',
                                backData: null
                            };
                            res.end(JSON.stringify(data));
                        } else {
                            //密码错误
                            console.log(`Password is not matched`);
                            let data = {
                                success: false,
                                msg: '密码错误',
                                backData: null
                            };
                            res.end(JSON.stringify(data));
                        }
                    }
                });
            }
        }
    });
};