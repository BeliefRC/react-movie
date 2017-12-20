import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Moment from 'moment'
import {Form, Input, Icon, message} from 'antd';
import {getDouBan} from "../../fetch/getDouBan";

const FormItem = Form.Item;

class DouBan extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {};
    }

    //同步电影
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.loading();
                getDouBan(values.douban, (data) => {
                    this.props.loaded();
                    if (data) {
                        let setFieldsValue = this.props.setFieldsValue;
                        let value = this.formatValue(data);
                        setFieldsValue(value)
                    } else {
                        message.warn('请输入正确的id')
                    }
                })
            }
        });
    };

    //将返回的数据整理为表单所需要的
    formatValue(value) {
        let newValue = {};
        newValue.title = value.title;
        newValue.director = value.directors[0].name;
        newValue.country = value.countries[0];
        // newValue.lanuage = value.languages[0];
        newValue.poster = value.images.large;
        newValue.year = new Moment(value.year);
        newValue.category = value.genres;
        newValue.summary = value.summary;
        return newValue
    }


    //处理回车按键
    search(e) {
        if (e.keyCode === 13) {
            this.handleSubmit(e)
        }
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
        return (
            <Form>
                <FormItem label="豆瓣同步"
                          {...formItemLayout}>
                    {getFieldDecorator('douban', {
                        rules: [{
                            validator(rule, values, callback) {
                                if (values && values.length > 0) {
                                    let reg = /^[0-9]*$/g;
                                    if (!reg.test(values)) {
                                        callback(`id只能是数字`);
                                    } else {
                                        callback();
                                    }
                                } else {
                                    callback();
                                }
                            }
                        }],
                    })(
                        <Input prefix={<Icon type="link" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="输入豆瓣电影id后按下回车键即可同步电影" onKeyDown={this.search.bind(this)}/>
                    )}
                </FormItem>
            </Form>
        )
    }
}

export default DouBan = Form.create({})(DouBan);

