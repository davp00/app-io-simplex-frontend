import React, {Component} from 'react';
import {InputNumber} from "antd";

export default class VarInput extends Component{

    handleOnBlur = ({target: { value }}) =>
    {
        if(value === '')
            this.props.onChange(0);
    };

    handleOnChange = (value) =>
    {
        console.log(value);
        this.props.onChange(value);
    };

    render() {
        return (
            <InputNumber
                {...this.props}
                onChange={this.handleOnChange}
                onBlur={this.handleOnBlur}
            />
        );
    }
}
