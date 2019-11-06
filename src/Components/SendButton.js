import React, { Component } from 'react';
import {SimplexContext} from "../context/SimplexContext";
import {Button, notification} from "antd";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {SERVER_URL} from "../config";

class SendButton extends Component{


    handleOnClick = ( ) =>
    {
        const { validate, getData, setContextState, setResult } = this.context;
        const { history } = this.props;

        let v  = validate();

        if(v === true)
        {
            let data = getData();

            setContextState(true, 'loading');

            axios.post(`${SERVER_URL}/simplex`, data).then(
                (res) =>
                {
                    setContextState(false, 'loading');
                    setResult(res.data);
                    history.push('/result', {data: res.data});
                }
            ).catch(
                (err) =>
                {
                    setContextState(false, 'loading');
                    console.error("ERROR: \n", err);
                }
            )
        }else
        {
            notification.error(v);
        }
    };

    render() {
        const { n_vars, n_restrictions, loading } = this.context;
        return (
            <div className={'mt-5'}>
                <Button type="primary"
                        disabled={n_vars==='' || n_restrictions === ''}
                        block
                        loading={loading}
                        onClick={this.handleOnClick}>
                    {loading ? 'Calculando...' : 'Continuar'}
                </Button>
            </div>
        );
    }
}

SendButton.contextType = SimplexContext;

export default withRouter(SendButton);
