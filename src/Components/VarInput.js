import React, {Component} from 'react';

export default class VarInput extends Component{
    reg = /^[-]?(0|[1-9][0-9]*)[/]?([0-9]*)(\.[0-9]*)?$/;
    state = {
        focused: false
    };


    handleOnBlur = ({target: { value }}) =>
    {
        if(value.length === 0)
        {
            this.props.onChange('0');
        }
        else {
            value = value.replace(/[a-zA-Z]/,'');
            this.props.onChange(value);
        }
        this.setState({focused: false});
    };

    onFocus = () =>
    {
        const { value, onChange } = this.props;

        this.setState({focused: true});
        if (value === '0')
            onChange('');
    };

    handleOnChange = ({target: {value}}) =>
    {
        if(value === '-' || value === '' || this.reg.test(value))
            this.props.onChange(value);
    };

    getValue = () =>
    {
        const { value } = this.props;

        // eslint-disable-next-line no-eval
        return this.state.focused ? value : value !== '0' ? eval(value): value;
    };

    render() {

        return (
            <>
                <div className='ant-input-number'>
                    <div className='ant-input-number-input-wrap'>
                        <input
                            className='ant-input-number-input'
                            onFocus={this.onFocus}
                            onChange={this.handleOnChange}
                            onBlur={this.handleOnBlur}
                            value={this.getValue() || '' }
                        />
                    </div>
                </div>
            </>
        );
    }
}
