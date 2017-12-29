import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'

export default class MovieFlash extends React.Component {
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
            <embed className='flash-player' src={movie.flash} allowFullScreen="true" quality="high"
                   align="middle" allowscriptacess="always" type="application/x-shockwave-flash"/>
        )
    }
}
