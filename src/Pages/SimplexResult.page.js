import React, { Component } from 'react';
import {SimplexContext} from "../context/SimplexContext";
import {Breadcrumb, Card, Layout} from "antd";
import ShowAllResult from "../Components/SimplexResult/ShowAllResult";


const {Content} = Layout;

class SimplexResultPage extends Component{

    componentDidMount() {
        document.title = 'Resultado Metodo Simplex';
    }

    render() {
        return (
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                    <Breadcrumb.Item >Metodo Simplex</Breadcrumb.Item>
                    <Breadcrumb.Item style={{fontWeight: 'bold'}}>Resultado</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <ShowAllResult />
                </Card>
            </Content>
        );
    }
}

SimplexResultPage.context = SimplexContext;


export default SimplexResultPage;
