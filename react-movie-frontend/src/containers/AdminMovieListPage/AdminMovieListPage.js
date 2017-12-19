import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import MovieList from '../../components/MovieList/MovieList'
import {Col, Row} from 'antd'
import ToolBar from '../../components/ToolBar/ToolBar'
import './style.css'
export default class AdminMovieListPage extends React.Component {
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
            <Row className='container'>
                <Col span={2}/>
                <Col span={20}>
                    <ToolBar/>
                    <MovieList/>
                </Col>
                <Col span={2}/>
            </Row>

        )
    }
}
