const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoStore = require('connect-mongo')(session);
const logger = require('morgan');

const bodyParser = require('body-parser');
const app = express();
const Router = require('./router/Router');
let port = process.env.PORT || 3001;

//数据库连接
let dbUrl = 'mongodb://localhost/reactMovie';
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {useMongoClient: true}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`已连接${dbUrl}`);
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

//当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//session依赖于cookie
app.use(cookieParser());
app.use(session({
    secret: 'rc',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions',
    }),
    resave: false,
    saveUninitialized: true
}));

Router(app);
app.listen(port);

