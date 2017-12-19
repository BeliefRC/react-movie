import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Row,Col,Button,Icon} from 'antd'
import {hashHistory} from 'react-router'
import './style.css'

export default  class ToolBarButton  extends React.Component {
    // 构造
    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }
    
    handleClick(){
        console.log(1);
        hashHistory.push('admin/movie/detail')
    }

    render() {
        return <Row>
            <Col span={24} className='tool-bar-button'>
                <Button type='primary'  onClick={this.handleClick.bind(this)}><Icon type="plus" />新增</Button>
            </Col>
        </Row>
    }
}
