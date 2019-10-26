import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import { Route, withRouter } from 'react-router-dom';
import SimplexPage from './Simplex.page';
import HowToPage from "./HowTo.page";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;


class Dashboard extends Component {

    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const { path } = this.props.match;
        const { history } = this.props;
        let selected;
        switch (window.location.pathname) {
            case '/help':
                selected = '2';
                break;
            case '/team':
                selected = '3';
                break;
            default:
                selected = '1';
                break;
        }
        return (
            <Layout style={{minHeight: '100vh'}} id={'layout'}>
                <Sider collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={[selected]} mode="inline">
                        <Menu.Item key="1" onClick={()=>history.push('/')}>
                            <Icon type="calculator"/>
                            <span>Metodo Simplex</span>
                        </Menu.Item>
                        <Menu.Item key="2" onClick={()=>history.push('/help')}>
                            <Icon type="question"/>
                            <span>Como Usar</span>
                        </Menu.Item>
                        <Menu.Item key="3" onClick={()=>history.push('/team')}>
                            <Icon type="team"/>
                            <span>Equipo de Trabajo</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 , paddingLeft: 10}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.onCollapse}
                        />
                    </Header>
                    <Route path={`${path}`} exact>
                        <SimplexPage />
                    </Route>
                    <Route path={`${path}help`} exact >
                        <HowToPage />
                    </Route>
                    <Footer style={{textAlign: 'center'}}>Daniel Viloria ©2019 Created by Daniel Viloria</Footer>
                </Layout>
            </Layout>
        );
    }
}


export default withRouter(Dashboard);