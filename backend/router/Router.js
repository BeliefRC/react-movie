const User = require('../controllers/User');
module.exports = app => {

    //user
    app.get('/register', User.register);
};