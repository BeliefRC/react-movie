import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import 'antd/dist/antd.css'
import Header from '../components/Header/Header'


export default class App extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        )
    }
}
