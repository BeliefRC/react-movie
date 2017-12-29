import React from 'react'
import moment from 'moment'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Timeline} from 'antd'

export default class MovieInfo extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }

    render() {
        let {movie} = this.props;
        return (
            <Timeline>
                <Timeline.Item>{`电影名称：${movie.title}`}</Timeline.Item>
                <Timeline.Item>{`导演：${movie.director}`}</Timeline.Item>
                <Timeline.Item>{`国家：${movie.country}`}</Timeline.Item>
                <Timeline.Item>{`语言：${movie.language}`}</Timeline.Item>
                <Timeline.Item>{`上映年份：${moment(movie.year).format('YYYY-MM-DD')}`}</Timeline.Item>
                <Timeline.Item>{`简介：${movie.summary}`}</Timeline.Item>
            </Timeline>
        )
    }
}
