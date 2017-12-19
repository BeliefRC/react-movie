import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Form, Input, Button, Select,DatePicker , message} from 'antd';
import {post} from "../../fetch/post";

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
        this.state = {};
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let movieId = this.props.movieId;
                let pathname = movieId ? `/admin/movie/update` : `/admin/movie/new`;
                values.movieId = movieId;
                post(pathname, values, (data) => {
                    if (data.success) {
                        message.success(data.msg)
                    } else {
                        message.error(data.msg)
                    }
                })
            }
        });
    };

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
                        <DatePicker  format={dateFormat} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="分类"
                >
                    {getFieldDecorator('category', {
                        rules: [{
                            required: false, message: '请输入!',
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
                    <Button type="primary" htmlType="submit">录入</Button>
                </FormItem>
            </Form>
        )
    }
}

export default EditMovieInfo = Form.create({})(EditMovieInfo);

