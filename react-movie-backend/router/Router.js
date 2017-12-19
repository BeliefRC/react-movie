const User = require('../controllers/User');
const Movie = require('../controllers/Movie');
module.exports = app => {
    //user
    app.post('/register', User.register);
    app.post('/login', User.login);

    //movie
    app.get('/admin/movie/list', Movie.movieList);
};