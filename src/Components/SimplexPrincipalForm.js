import React, {Component} from 'react';
import {Col, Row, Select, Form, Divider} from "antd";
import Title from "antd/es/typography/Title";
import NumericInput from "./NumericInput";
import {SimplexContext} from "../context/SimplexContext";


class SimplexPrincipalForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            n_vars: '',
            n_restrictions: ''
        }
    }

    handleOnChange = (value, name) => {
        this.setState((state) => {
            state[name] = value;
            return state;
        });
    };

    onChangeFO = (value) => {
        const {setContextState} = this.context;
        setContextState(value, 'FO');
    };


    render() {
        const {n_vars, n_restrictions, setContextState, FO} = this.context;

        return (
            <Row type="flex" justify="start">
                <Col md={{span: 5, offset: 9}}>
                    <Form>
                        <Form.Item>
                            <Title level={4} className='text-center'>Variables de decisión</Title>
                            <NumericInput
                                min={1}
                                className={'text-center'}
                                placeholder={'Numero de variables de decisión'}
                                onChange={setContextState}
                                name={'n_vars'}
                                value={n_vars}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Title level={4} className='text-center'>Restricciones</Title>
                            <NumericInput
                                min={1}
                                className={'text-center'}
                                placeholder={'Numero de variables de decisión'}
                                onChange={setContextState}
                                name={'n_restrictions'}
                                value={n_restrictions}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Title level={4} className='text-center'>Tipo de Optimización</Title>
                            <Select
                                placeholder='Seleccionar el tipo de Optimización'
                                onChange={this.onChangeFO}
                                value={FO}
                            >
                                <Select.Option value='' disabled>Seleccionar Optimización</Select.Option>
                                <Select.Option value='max'>Maximizar</Select.Option>
                                <Select.Option value='min'>Minimizar</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        );
    }
}

SimplexPrincipalForm.contextType = SimplexContext;

export default SimplexPrincipalForm;