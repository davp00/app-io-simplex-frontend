import React, {Component} from 'react';
import {SimplexContext} from "../context/SimplexContext";
import Title from "antd/es/typography/Title";
import TeX from '@matejmazur/react-katex';
import {Col, InputNumber, Row} from "antd";

class SimplexObjetiveFunction extends Component {


    render() {
        const {n_vars, FO} = this.context;

        if (n_vars === '')
            return (<span/>);

        return (
            <div className={'mt-5 p-2'}>
                <Title level={4}>Funcion Objetivo</Title>
                <div className={'mt-5'}>
                    <Row>
                        <Col md={3}><TeX>{`${FO} Z = `}</TeX></Col>
                        {this.renderVars()}
                    </Row>
                </div>
            </div>
        )
    }

    renderVars() {
        const {n_vars} = this.context;

        let vars = [];
        for (let i = 0; i < n_vars; i++) {
            vars.push(
                <span key={i}>
                    <Col md={3} sm={12}>
                        <InputNumber
                        />
                        <TeX>{`x_${i}`}</TeX>
                    </Col>
                    {
                        i !== n_vars - 1 && (
                            <Col md={1}> <TeX className={''}>+</TeX></Col>
                        )
                    }
                </span>
            )
        }
        return vars;
    }
}

SimplexObjetiveFunction.contextType = SimplexContext;

export default SimplexObjetiveFunction;