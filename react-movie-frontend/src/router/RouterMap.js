import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import App from '../containers/App'
import Home from '../containers/Home/Home'
import AdminMovieListPage from '../containers/AdminMovieListPage/AdminMovieListPage'
import AdminMovieDetail from '../containers/AdminMovieDetail/AdminMovieDetail'
import CategoryPage from '../containers/CategoryPage/CategoryPage'
import MovieDetailPage from '../containers/MovieDetailPage/MovieDetailPage'
import NotFound from '../containers/404'

export default class RouterMap extends React.Component {
    render() {
        return (<Router history={this.props.history}>
            <Route path='/' component={App}>
                <IndexRoute component={Home}/>
                <Route path='admin/movie'>
                    <IndexRoute component={AdminMovieListPage}/>
                    <Route path='detail(/:movieId)' component={AdminMovieDetail}/>
                </Route>
                <Route path='category'>
                    <IndexRoute component={CategoryPage}/>
                </Route>
                <Route path='movie(/:movieId)'>
                    <IndexRoute component={MovieDetailPage}/>
                </Route>
                <Route path='*' component={NotFound}/>
            </Route>
        </Router>)
    }
}