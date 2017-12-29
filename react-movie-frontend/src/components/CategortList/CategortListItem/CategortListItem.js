import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router'
import {Card} from 'antd'
import './style.less'

const {Meta} = Card;
export default class CategortListItem extends React.Component {
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
            <Link to='/'>
                <Card className='movie-card'
                      loading={!movie}
                      hoverable
                      cover={<img alt={`${movie.title}海报`} src={movie.poster}/>}>
                    <Meta
                        title={movie.title}
                        description={`导演：${movie.director}`}
                    />
                </Card>
            </Link>
        )
    }
}
