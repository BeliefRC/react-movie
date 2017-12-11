const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Router = require('./router/Router');
let port = process.env.PORT || 3001;

//数据库连接
mongoose.connect('mongodb://localhost/reactMovie', {useMongoClient: true}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('已连接mongodb://localhost/reactMovie');
    }
});

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


Router(app);
app.listen(port);

