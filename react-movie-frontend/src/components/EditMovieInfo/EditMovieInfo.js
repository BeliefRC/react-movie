import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Moment from 'moment'
import {Form, Input, Button, Select, DatePicker, message, Spin} from 'antd';
import {hashHistory} from 'react-router'
import DouBan from '../DouBan/DouBan'
import {post} from "../../fetch/post";
import {get} from "../../fetch/get";

const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';
const {TextArea} = Input;
const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class EditMovieInfo extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        let movieId = this.props.movieId;
        if (movieId) {
            this.ajaxGetMovieDetail(movieId)
        }
    }

    //获取电影数据
    ajaxGetMovieDetail(movieId) {
        this.loading();
        get('/movie/detail', {movieId}, (data) => {
            if (data.success) {
                data.backData.year = new Date();
                //后台返回的字段进行过滤匹配
                let value = this.props.form.getFieldsValue();
                for (let key in value) {
                    if (value.hasOwnProperty(key)) {
                        value[key] = data.backData[key]
                    }
                }
                //分割分类,格式化时间
                // value.category = value.category.toString().split(',');

                let category = [];
                value.category.map(item => {
                    category.push(item.name)
                });
                value.category = category;

                value.year = new Moment(value.year);
                console.log(value);
                this.props.form.setFieldsValue(value);
            } else {
                message.error(data.msg)
            }
            this.loaded();
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let movieId = this.props.movieId;
                let pathname = movieId ? `/admin/movie/update` : `/admin/movie/new`;
                if (movieId) {
                    values._id = movieId;
                }
                this.loading();
                post(pathname, values, (data) => {
                    this.loaded();
                    if (data.success) {
                        message.success(data.msg);
                        hashHistory.push('admin/movie')
                    } else {
                        message.error(data.msg)
                    }
                })
            }
        });
    };

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

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 12},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 12},
                sm: {span: 12},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 6,
                },
            },
        };

        return (
            <Spin spinning={this.state.loading}>
                <DouBan setFieldsValue={this.props.form.setFieldsValue} loading={this.loading.bind(this)}
                        loaded={this.loaded.bind(this)}/>
                <Form onSubmit={this.handleSubmit} style={{marginTop: '20px'}}>
                    <FormItem
                        {...formItemLayout}
                        label="电影名称"
                    >
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true, message: '请输入!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="导演"
                    >
                        {getFieldDecorator('director', {
                            rules: [{
                                required: true, message: '请输入!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="国家"
                    >
                        {getFieldDecorator('country', {
                            rules: [{
                                required: true, message: '请输入!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="语言"
                    >
                        {getFieldDecorator('language', {
                            rules: [{
                                required: true, message: '请输入!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="海报"
                    >
                        {getFieldDecorator('poster', {
                            rules: [{
                                required: true, message: '请输入!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="flash地址"
                    >
                        {getFieldDecorator('flash', {
                            rules: [{
                                required: true, message: '请输入!',
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="上映日期"
                    >
                        {getFieldDecorator('year', {
                            rules: [{
                                required: true, message: '请输入!',
                            }],
                        })(
                            <DatePicker format={dateFormat}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="分类"
                    >
                        {getFieldDecorator('category', {
                            rules: [{
                                required: false, message: '请输入!',
                            }, {
                                validator(rule, values, callback) {
                                    if (values && values.length > 0) {
                                        if (values.some(value => value.indexOf(',') > -1)) {
                                            callback(`分类不允许含有,`);
                                        } else if (values.length > 4) {
                                            callback(`最多含四个分类`);
                                        } else {
                                            callback();
                                        }
                                    } else {
                                        callback();
                                    }
                                }
                            }],
                        })(
                            <Select
                                mode="tags"
                                style={{width: '100%'}}
                                placeholder="选择或输入合适的电影类型"
                            >
                                {children}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="简介"
                    >
                        {getFieldDecorator('summary', {
                            rules: [{
                                required: true, message: '请输入!',
                            }],
                        })(
                            <TextArea placeholder="说点什么吧" autosize={{minRows: 2, maxRows: 6}}/>
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">{this.props.movieId ? '更新' : '录入'}</Button>
                    </FormItem>
                </Form>
            </Spin>
        )
    }
}

export default EditMovieInfo = Form.create({})(EditMovieInfo);

