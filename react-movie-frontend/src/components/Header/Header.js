import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link, hashHistory} from 'react-router'
import {Row, Col, Menu, Icon, Avatar, Dropdown} from 'antd';
// import SearchInput from '../SearchInput/SearchInput'
import LoginAndRegisterModal from '../LoginAndRegisterModal/LoginAndRegisterModal'
import './style.less'
import {post} from "../../fetch/post";
import {message} from "antd/lib/index";


export default class Header extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

        // 初始状态
        this.state = {
            modalVisible: false,
            browseWidth: 1080,
            user: '请登录',
            color: '#1890ff',
            isLogin: false,
        };
    }

    componentDidMount() {
        this.setCurrentMenuKey();
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

    //设置菜单选中值
    setCurrentMenuKey(){
       let path= hashHistory.getCurrentLocation().pathname;
       if (path==='/'){
           this.setState({current:'home'});
       }else if(path.indexOf('/admin/movie')>-1){
           this.setState({current:'admin'});
       }
    }


    //切换菜单栏
    handleClick = (e) => {
        if (e.key !== 'collection' && e.key !== 'logout') {
            this.setState({
                current: e.key,
            });
        }
        let {isLogin} = this.state;
        switch (e.key) {

            case 'logout':
                if (isLogin) {
                    this.handleLogout();
                } else {
                    message.info('请先登录');
                    this.showModal();
                }
                break;
            case 'collection':
                if (isLogin) {
                } else {
                    message.info('请先登录');
                    this.showModal();
                }
                break;
            case'home': {
                let pathname = '/';
                if (hashHistory.getCurrentLocation().pathname !== pathname) {
                    hashHistory.push(pathname);
                }
            }

                break;
            case'admin': {
                let pathname = '/admin/movie';
                if (hashHistory.getCurrentLocation().pathname !== pathname) {
                    hashHistory.push(pathname);
                }
            }
                break;
            default:
                break;
        }
    };

    showModal() {
        let {isLogin} = this.state;
        if (isLogin) return;
        this.setState({
            modalVisible: true,
        })
    }

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
            user: '请登录'
        });
        message.info('退出登录成功')
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
        let {browseWidth, modalVisible} = this.state;
        const userMenu = <Menu onClick={this.handleClick}>
            <Menu.Item key="collection">我的收藏</Menu.Item>
            <Menu.Item key="logout">退出登录</Menu.Item>
        </Menu>;
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
                        <Menu.Item key="category">
                            <Icon type="tags-o"/>电影分类
                        </Menu.Item>
                        <Menu.Item key="admin">
                            <Icon type="exception"/>电影管理
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={1} style={{height: 48, overflow: 'hidden'}}>
                    <Dropdown overlay={userMenu} onClick={this.showModal.bind(this)}>
                        <Avatar style={{
                            backgroundColor: this.state.color,
                            verticalAlign: 'middle',
                            cursor: 'pointer',
                            marginTop: '4px'
                        }}
                                size="large">
                            {this.state.user}
                        </Avatar>
                    </Dropdown>
                </Col>
                <Col span={2}/>
                <LoginAndRegisterModal visible={modalVisible} closeModalCB={this.closeModalCB.bind(this)}
                                       handleLogin={this.handleLogin.bind(this)}
                                       handleRegister={this.handleRegister.bind(this)}/>
            </Row>
        )
    }
}
