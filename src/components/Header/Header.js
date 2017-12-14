import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router'
import {Row, Col, Menu, Icon, Avatar} from 'antd';
// import SearchInput from '../SearchInput/SearchInput'
import LoginAndRegisterModal from '../LoginAndRegisterModal/LoginAndRegisterModal'
import './style.css'
import {post} from "../../fetch/post";
import {message} from "antd/lib/index";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Header extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {
            modalVisible: false,
            browseWidth: 1080,
            current: 'home',
            user: '请登录',
            color: '#1890ff',
            isLogin: false,
        };
    }

    componentDidMount() {
        let timeoutId, _this = this;

        function callback() {
            let browseWidth = document.documentElement.clientWidth;
            _this.setState({
                browseWidth
            })
        }

        //控制菜单栏标题
        window.addEventListener('resize', () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 100)
        }, false);
        this.doChecking();
    }


    //切换菜单栏
    handleClick = (e) => {
        if (e.key !== 'loginOrRegister' && e.key !== 'collection' && e.key !== 'logout') {
            this.setState({
                current: e.key,
            });
        }
        //打开弹窗
        if (e.key === 'loginOrRegister') {
            this.setState({
                modalVisible: true,
            })
        }
        if (e.key === 'logout') {
            this.handleLogout();
        }
    };

    //关闭登陆弹窗回调
    closeModalCB() {
        this.setState({
            modalVisible: false
        })
    }

    handleLogin(values) {
        post('/login', values, (data) => {
            if (data.success) {
                message.success(data.msg);
                this.setState({
                    modalVisible: false,
                    isLogin: true,
                    user: values.username
                });
                sessionStorage.username = values.username
            } else {
                message.error(data.msg);
            }
        })
    }

    handleRegister(values) {
        post('/register', values, (data) => {
            if (data.success) {
                message.success(data.msg);
                this.handleLogin(values);
            } else {
                message.error(data.msg);
            }
        })
    }

    handleLogout() {
        sessionStorage.username = '';
        this.setState({
            isLogin: false,
            use: '请登录'
        })
    }

    doChecking() {
        if (sessionStorage.username) {
            this.setState({
                isLogin: true,
                user: sessionStorage.username
            });
        }
    }

    render() {
        let {browseWidth, modalVisible, isLogin} = this.state;
        return (
            <Row>
                <Col span={2}/>
                <Col span={4}>
                    <Link to="/" className="logo">
                        <img src={require('../../static/logo.png')} alt="logo"/>
                        {browseWidth < 1080 ? '' : <span>RC_Movie</span>}
                    </Link>
                </Col>
                <Col span={15}>
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                    >
                        <Menu.Item key="home">
                            <Icon type="home"/>首页推荐
                        </Menu.Item>
                        <Menu.Item key="app">
                            <Icon type="tags-o"/>电影分类
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={1}>
                    <Menu mode="horizontal" onClick={this.handleClick}>
                        {isLogin ?
                            <SubMenu title={<Avatar style={{backgroundColor: this.state.color, verticalAlign: 'middle'}}
                                                    size="large">
                                {this.state.user}
                            </Avatar>}>
                                <MenuItemGroup>
                                    <Menu.Item key="collection">我的收藏</Menu.Item>
                                    <Menu.Item key="logout">退出登录</Menu.Item>
                                </MenuItemGroup>
                            </SubMenu> : <Menu.Item key="loginOrRegister">
                                <Avatar style={{backgroundColor: this.state.color, verticalAlign: 'middle'}}
                                        size="large">
                                    {this.state.user}
                                </Avatar>
                            </Menu.Item>}

                    </Menu>
                </Col>
                <Col span={2}/>
                <LoginAndRegisterModal visible={modalVisible} closeModalCB={this.closeModalCB.bind(this)}
                                       handleLogin={this.handleLogin.bind(this)}
                                       handleRegister={this.handleRegister.bind(this)}/>
            </Row>
        )
    }
}
