import React, { Component } from 'react';
import {SimplexContext} from "../context/SimplexContext";
import {Breadcrumb, Card, Col, Divider, Form, Layout, Row, Switch} from "antd";
import ShowAllResult from "../Components/SimplexResult/ShowAllResult";
import Title from "antd/es/typography/Title";
import StepByStepResult from "../Components/SimplexResult/StepByStepResult";


const {Content} = Layout;

class SimplexResultPage extends Component{

    state = {
        stepByStep: true
    };

    componentDidMount() {
        const { resultToFraction } = this.context;
        document.title = 'Resultado Metodo Simplex';
        resultToFraction();
    }

    onChangeSwitchFractions = (checked) =>
    {
        const { resultToFraction , resultToDecimal } = this.context;
        if (checked)
        {
            resultToFraction();
        }else
        {
            resultToDecimal();
        }
    };

    handleOnChangeSwitchMode = (checked) =>
    {
        this.setState({stepByStep: checked});
    };

    render() {
        return (
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                    <Breadcrumb.Item >Metodo Simplex</Breadcrumb.Item>
                    <Breadcrumb.Item style={{fontWeight: 'bold'}}>Resultado</Breadcrumb.Item>
                </Breadcrumb>
                <Card>
                    <Title level={4}>Resultado</Title>
                    <div className='items-right' >
                        <Form>
                            <div>
                                <div className='mb-1'>Mostrar resultado como Fracciones</div>
                                <Switch defaultChecked onChange={this.onChangeSwitchFractions} />
                            </div>
                            <Divider/>
                            <div>
                                <div className='mb-1'>Mostrar paso a paso</div>
                                <Switch defaultChecked={this.state.stepByStep} onChange={this.handleOnChangeSwitchMode}/>
                            </div>
                        </Form>
                    </div>
                    {
                        this.state.stepByStep ? <StepByStepResult /> : <ShowAllResult />
                    }
                </Card>
            </Content>
        );
    }
}

SimplexResultPage.contextType = SimplexContext;


export default SimplexResultPage;
