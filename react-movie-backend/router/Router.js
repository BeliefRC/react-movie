const User = require('../controllers/User');
module.exports = app => {
    //user
    app.post('/register', User.register);
    app.post('/login', User.login);
};