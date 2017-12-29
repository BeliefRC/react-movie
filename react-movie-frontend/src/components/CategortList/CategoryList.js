import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {get} from '../../fetch/get'
import {Collapse, Spin, message, Col, Row, Pagination} from 'antd'
import CategoryListItem from './CategortListItem/CategortListItem'
import './style.less'

const Panel = Collapse.Panel;


export default class CategoryList extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {
            loading: false,
            panelsData: [],
            defaultActiveKey: []
        };
    }

    componentDidMount() {
        this.getCategory()
    }

    getCategory() {
        this.loading();
        get(`/category/categoryAndMovieList`, {}, (data) => {
            this.loaded();
            if (data.success) {
                this.setState({
                    panelsData: data.backData
                });
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
        let {loading, panelsData, defaultActiveKey} = this.state;
        let Panels = [];
        panelsData.map(panel => {
                if (panel.movies.length) {
                    //设置所有折叠面板展开
                    defaultActiveKey.push(panel._id);
                    //折叠面板
                    Panels.push(<Panel header={panel.name} key={panel._id} className='panel-movie-list'>
                        {/*该分类下所有电影*/}
                        {panel.movies.map(movie => <CategoryListItem movie={movie} key={movie._id}/>)}
                        {/*<Pagination simple defaultCurrent={2} total={50}/>*/}
                    </Panel>);
                }
                return true
            }
        );
        return <Row style={{marginTop: '20px'}}>
            <Col span={2}/>
            <Col span={20}>
                <Spin spinning={loading}>
                    <Collapse defaultActiveKey={defaultActiveKey}>
                        {Panels}
                    </Collapse>
                </Spin>
            </Col>
            <Col span={2}/>
        </Row>
    }
}
