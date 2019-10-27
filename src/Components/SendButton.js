import React, { Component } from 'react';
import {SimplexContext} from "../context/SimplexContext";
import {Button} from "antd";


class SendButton extends Component{

    handleOnClick = ( ) =>
    {
        console.log("Funciona");
    };

    render() {
        return (
            <div className={'mt-5'}>
                <Button type="primary" block onClick={this.handleOnClick}>
                    Continuar
                </Button>
            </div>
        );
    }
}

SendButton.contextType = SimplexContext;

export default SendButton;