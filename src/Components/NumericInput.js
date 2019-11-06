import React, { Component } from 'react';
import { Input } from 'antd';



export default class NumericInput extends Component {
    onChange = (e) => {
        const { min } = this.props;
        const { value, name } = e.target;
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            if((min && Number(value) >= min) || value === '')
            {
                this.props.onChange(value, name);
            }
        }/*else
            message.error('Este campo es numérico');*/

    };

    onBlur = () => {
        const { value, onBlur, onChange } = this.props;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            onChange({ value: value.slice(0, -1) });
        }
        if (onBlur) {
            onBlur();
        }
    };

    render() {
        return (
            <Input
                {...this.props}
                onChange={this.onChange}
                onBlur={this.onBlur}
                minLength={1}
                autoComplete={'off'}
            />
        );
    }
}
