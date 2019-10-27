import React, {Component} from 'react';
import {SimplexContext} from "../context/SimplexContext";
import Title from "antd/es/typography/Title";
import {Col, Form, InputNumber, Row, Select} from "antd";
import TeX from "@matejmazur/react-katex";


class SimplexRestrictions extends Component {
    render() {
        return (
            <div className={'mt-5 p-2'}>
                <Title level={4}>Restricciones</Title>
                <div className={'mt-5'}>
                    {
                        this.renderRestrictions()
                    }
                    <Row>
                        {
                            this.renderNoNegativity()
                        }
                    </Row>
                </div>
            </div>
        );
    }

    renderRestrictions() {
        const {n_vars, n_restrictions} = this.context;
        let restrictions = [];

        for (let y = 0; y < n_restrictions; y++) {
            let fields = [];
            for (let x = 0; x < n_vars; x++) {
                fields.push(
                    <span key={`r-${y}-${x}`}>
                        <Col md={3} sm={12}>
                        <InputNumber
                        />
                        <TeX>{`x_${x}`}</TeX>
                    </Col>
                        {
                            x !== n_vars - 1 && (
                                <Col md={1}> <TeX className={''}>+</TeX></Col>
                            )
                        }
                    </span>
                )
            }
            restrictions.push(
                <Row key={`r-${y}`}>
                    <Form>
                        {fields}
                        <Col md={2}>
                            <Form.Item>
                                <Select key={`s-${y}`} defaultValue={'<='} className={'katex2'}>
                                    <Select.Option key={`s-${y}-<=`} value={'<='}>{'≤'}</Select.Option>
                                    <Select.Option key={`s-${y}->=`} value={'>='}>{'≥'}</Select.Option>
                                    <Select.Option key={`s-${y}-=`} value={'='}>{'='}</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={2} className={'ml-3'}>
                            <Form.Item>
                                <InputNumber/>
                            </Form.Item>
                        </Col>
                    </Form>
                </Row>
            );
        }

        return restrictions;
    }

    renderNoNegativity() {
        const {n_vars, n_restrictions} = this.context;
        const restriction = [];
        for (let x = 0; x < n_vars; x++) {
            restriction.push(
                <span key={`r-${n_restrictions}-${x}`}>
                    <Col md={1} sm={12}>
                        <TeX>{`x_${x}`}</TeX>
                    </Col>
                    {
                        x !== n_vars - 1 && (
                            <Col md={1}> <TeX className={''}>,</TeX></Col>
                        )
                    }
                    </span>
            )
        }

        restriction.push(
            <span key={`r-${n_restrictions}-${n_vars}`}>
                    <Col md={2} sm={12}>
                        <TeX>{`\\ge 0`}</TeX>
                    </Col>
            </span>
        );
        return restriction;
    }
}

SimplexRestrictions.contextType = SimplexContext;

export default SimplexRestrictions;