import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import EditMovieInfo from '../../components/EditMovieInfo/EditMovieInfo'
import MovieList from '../../components/MovieList/MovieList'
import {Col, Row} from 'antd'

export default class MovieManagement extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }

    render() {
        let movieId = this.props.params.movieId;
        return (
            <Row>
                <Col span={2}/>
                <Col span={20}>
                    <EditMovieInfo movieId={movieId}/>
                    <MovieList/>
                </Col>
                <Col span={2}/>
            </Row>

        )
    }
}
