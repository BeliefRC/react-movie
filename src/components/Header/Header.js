import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router'
import {Row, Col, Menu, Icon, Avatar} from 'antd';
// import SearchInput from '../SearchInput/SearchInput'
import LoginAndRegisterModal from '../LoginAndRegisterModal/LoginAndRegisterModal'
import './style.css'

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
        }, false)
    }


    //切换菜单栏
    handleClick = (e) => {
        if (e.key !== 'loginOrRegister' && e.key !== 'collection') {
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
    };

    //关闭登陆弹窗回调
    closeModalCB() {
        this.setState({
            modalVisible: false
        })
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
                <LoginAndRegisterModal visible={modalVisible} closeModalCB={this.closeModalCB.bind(this)}/>
            </Row>
        )
    }
}