import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Table, message} from 'antd';
import {get} from "../../fetch/get";


export default class MovieList extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {
            data: [],
            pagination: {},
            loading: false,
        };
    }

    handleTableChange = (pagination, filters, sorter) => {

    };

    //获取表格数据
    componentDidMount() {
        //请求表格数据
        this.getDataSource()
    }

     getDataSource() {
        let _this=this;
        get('/admin/movie/list', {}, (data) => {
            if (data.success) {
                _this.setState({
                    data: data.backData
                })
            } else {
                message.error(data.msg)
            }
        }, () => {
            message.error('获取电影列表失败')
        })
    }

    render() {
        const columns = [{
            title: '电影名称',
            dataIndex: 'title',
            sorter: true,
            fixed: 'left',
            width: 150
        }, {
            title: '导演',
            dataIndex: 'director',
            filters: [
                {text: 'Male', value: 'male'},
                {text: 'Female', value: 'female'},
            ],
            width: 100,
        }, {
            title: '国家',
            dataIndex: 'country',
            width: 100,
        }, {
            title: '语言',
            dataIndex: 'language',
            width: 100,

        }, {
            title: '年份',
            dataIndex: 'year',
            width: 100,

        }, {
            title: '分类',
            dataIndex: 'category',
            width: 100,

        }, {
            title: '录入时间',
            dataIndex: 'meta.createAt',
            width: 100,

        }, {
            title: '更新时间',
            dataIndex: 'meta.updateAt',
            width: 100,
        }, {
            title: 'pv',
            dataIndex: 'pv',
            width: 100,
        }, {
            title: '操作',
            dataIndex: 'operate',
            fixed: 'right',
            width: 100,

        }];
        return <Table columns={columns}
                      rowKey={record => record.registered}
                      dataSource={this.state.data}
            // pagination={this.state.pagination}
                      loading={this.state.loading}
                      onChange={this.handleTableChange}
                      scroll={{x: 1050, y: 300}}
        />
    }
}