import React, { Component } from 'react';
import {Breadcrumb, Layout} from "antd";

const {Content} = Layout;

export default class HowToPage extends Component {

    componentDidMount() {
        document.title = 'Ayuda'
    }

    render() {
        return (
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                    <Breadcrumb.Item style={{fontWeight: 'bold'}}>Como usar el software</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{padding: 24, background: '#fff', minHeight: 360}}>Hola desde how to</div>
            </Content>
        );
    }
}
