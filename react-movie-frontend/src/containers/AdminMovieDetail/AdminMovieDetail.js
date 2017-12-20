import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import EditMovieInfo from '../../components/EditMovieInfo/EditMovieInfo'
import {Col, Row,Icon} from 'antd'
// import ToolBarBack from '../../components/ToolBarBack/ToolBarBack'
import './style.css'
export default class AdminMovieDetail extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }

    componentDidMount() {
    }
    render() {
        let movieId = this.props.params.movieId;
        return (
            <Row>
                <Col span={2}>
                </Col>
                <Col span={20}>
                    <EditMovieInfo movieId={movieId}/>
                </Col>
                <Col span={2}/>
            </Row>

        )
    }
}
