const User = require('../models/User');
exports.register = (req, res) => {
    console.log(req.body);
    const dataSuccess = {
        success:true,
        msg: '注册成功',
        data: null
    };
    res.end(JSON.stringify(dataSuccess));
};

exports.login = (req, res) => {
    console.log(req.body);
    const dataSuccess = {
        success:true,
        msg: '登录成功',
        data: null
    };
    res.end(JSON.stringify(dataSuccess));
};