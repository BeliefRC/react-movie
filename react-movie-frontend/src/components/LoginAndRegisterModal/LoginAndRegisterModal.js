import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
    Modal,
    Tabs,
    Icon,
} from 'antd'
import './style.css'
import Login from './Login'
import Register from './Register'
const TabPane = Tabs.TabPane;


export default class LoginAndRegisterModal extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {
            visible: this.props.visible,
            defaultActiveKey: 'login',
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                visible: nextProps.visible,
                activeKey: nextProps.activeKey
            })
        }
    }

    //弹窗取消
    handleCancel = (e) => {
        this.closeModal()
    };

    //关闭弹窗
    closeModal() {
        this.setState({
            visible: false,
        });
        this.props.closeModalCB();
    }


    render() {
        let {defaultActiveKey} = this.state;
        let {handleLogin,handleRegister} = this.props;

        return (
            <Modal
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer=''
            >
                <Tabs defaultActiveKey={defaultActiveKey}>
                    <TabPane tab={<span><Icon type="login"/>登录</span>} key="login">
                        <Login closeModal={this.closeModal.bind(this)} handleLogin={handleLogin.bind(this)}/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="key"/>注册</span>} key="register">
                        <Register closeModal={this.closeModal.bind(this)} handleRegister={handleRegister.bind(this)}/>
                    </TabPane>
                </Tabs>
            </Modal>
        )
    }
}


