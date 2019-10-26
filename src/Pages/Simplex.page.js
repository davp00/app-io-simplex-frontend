import React, { Component } from 'react';
import {Breadcrumb, Card, Layout} from "antd";
import SimplexPrincipalForm from "../Components/SimplexPrincipalForm";
import { SimplexContextProvider } from "../context/SimplexContext";
import SimplexObjetiveFunction from "../Components/SimplexObjetiveFunction";
import MathJax from 'react-mathjax2';
import SimplexRestrictions from "../Components/SimplexRestrictions";

const {Content} = Layout;

export default class SimplexPage extends Component{

    componentWillMount() {
        document.title = 'Metodo Simplex';
    }

    render() {
        return (
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                    <Breadcrumb.Item style={{fontWeight: 'bold'}}>Metodo Simplex</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <SimplexContextProvider>
                        <SimplexPrincipalForm />
                        <SimplexObjetiveFunction />
                        <SimplexRestrictions />
                    </SimplexContextProvider>
                </Card>
            </Content>
        );
    }
}