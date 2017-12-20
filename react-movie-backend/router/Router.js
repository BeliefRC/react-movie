const User = require('../controllers/User');
const Movie = require('../controllers/Movie');
module.exports = app => {
    //user
    app.post('/register', User.register);
    app.post('/login', User.login);

    //movie
    app.get('/movie/detail', Movie.detail);
    app.get('/admin/movie/list', Movie.movieList);
    app.post('/admin/movie/new', Movie.saveMovie);
    app.post('/admin/movie/update', Movie.updateMovie);
    app.get('/admin/movie/delete', Movie.deleteMovie);
};