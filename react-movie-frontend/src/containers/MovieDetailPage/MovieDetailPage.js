import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Spin, Row, Col} from 'antd'
import MovieFlash from '../../components/MovieFlash/MovieFlash'
import MovieInfo from '../../components/MovieInfo/MovieInfo'
import {get} from "../../fetch/get";
import {message} from "antd/lib/index";
import './style.less'

export default class MovieDetailPage extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {
            movie: {},
            loading: false

        };
    }

    componentDidMount() {
        this.getMovieDetail();
    }

    getMovieDetail() {
        this.loading();
        let movieId = this.props.params.movieId;
        get('/movie/detail', {movieId}, (data) => {
            this.loaded();
            if (data.success) {
                this.setState({
                    movie: data.backData
                })
            } else {
                message.error(data.msg)
            }
        }, () => {
            this.loaded();
        })
    }

    loading() {
        this.setState({
            loading: true
        })
    }

    loaded() {
        this.setState({
            loading: false
        })
    }

    render() {
        let {movie, loading} = this.state;
        return (
            <Spin spinning={loading}>
                <Row className='movie-detail'>
                    <Col span={2}/>
                    <Col span={13}>
                        <MovieFlash movie={movie}/>
                    </Col>
                    <Col span={2}/>

                    <Col span={5}>
                        <MovieInfo movie={movie}/>
                    </Col>
                    <Col span={2}/>
                </Row>
            </Spin>
        )
    }
}
