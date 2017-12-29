import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import CategoryList from '../../components/CategortList/CategoryList'
export default  class CategoryPage  extends React.Component {
    // 构造
    constructor(props,context) {
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }
    render() {
        return (
            <CategoryList/>
        )
    }
}
