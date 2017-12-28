const User = require('../models/User');
const setJson = require('../until/SetJson');

const comparePasswordPromise = (user, password) => {
    return new Promise((resolve, reject) => {
        user.comparePassword(password, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};

exports.register = async (req, res) => {
    const _user = req.body;
    try {
        let user = await User.find({username: _user.username});
        if (user.length) {
            console.log('用户名已存在');
            res.json(setJson(false, '用户名已存在', null));
        }
        user = new User(_user);
        await user.save();
        res.json(setJson(true, '注册成功', null));
    }
    catch (e) {
        res.json(setJson(false, e.stack, null));
    }
};

exports.login = async (req, res) => {
    let _user = req.body;
    let username = _user.username;
    let password = _user.password;
    try {
        let user = await User.findOne({username});
        //首先检查用户是否存在
        if (!user) {
            console.log('用户名不存在');
            res.json(setJson(false, '用户名不存在，请注册', null));
        } else {
            let isMatch = await comparePasswordPromise(user, password);
            //密码是否正确
            if (isMatch) {
                console.log(`${username}:登陆成功`);
                req.session.user = user;
                res.json(setJson(true, '登陆成功', null));
            } else {
                res.json(setJson(false, '密码错误', null));
            }
        }
    }
    catch (e) {
        console.log(e);
        res.json(setJson(false, e.stack, null));
    }
};