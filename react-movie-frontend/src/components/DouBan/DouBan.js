import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Form} from "antd/lib/index";
import {Form, Input, Button} from 'antd';

class DouBan  extends React.Component {
    // 构造
    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }
    render() {
        return (
            <h1>404 Not Found Page</h1>
        )
    }
}
export default DouBan = Form.create({})(DouBan);

