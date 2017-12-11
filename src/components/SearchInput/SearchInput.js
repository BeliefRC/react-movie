import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { AutoComplete} from 'antd'
import './style.css'

function onSelect(value) {
    console.log('onSelect', value);
}

export default class SearchInput extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {
            dataSource: [],
        };
    }

    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : [
                value,
                value + value,
                value + value + value,
            ],
        });
    };

    render() {
        const {dataSource} = this.state;
        return (
            <AutoComplete
                dataSource={dataSource}
                style={{ width: 200 }}
                onSelect={onSelect}
                onSearch={this.handleSearch}
                placeholder="input here"
            />
        )
    }
}
