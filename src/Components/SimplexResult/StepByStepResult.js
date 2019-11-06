import React, { Component } from 'react';
import {SimplexContext} from "../../context/SimplexContext";
import { Redirect } from 'react-router-dom';
import { Steps, Button, message } from "antd";
import SimplexIterationData from "./SimplexIterationData";

const { Step } = Steps;

class StepByStepResult extends Component{

    state = {
        step : 0
    };

    next = () =>
    {
        this.setState({step : this.state.step + 1});
    };
    prev = () =>
    {
        this.setState({step : this.state.step - 1});
    };

    render() {
        const { result } = this.context;


        if (!result)
            return <Redirect to={'/'}/>;

        const { step } = this.state;


        return (
            <div className='mt-sm-3 mt-md-5 p-md-5'>
                <Steps current={step}>
                    {
                        result.process.map((p, i) =>
                        {
                            return <Step key={`s-${i}`} title={``}/>
                        })
                    }
                </Steps>
                <div className="steps-content">
                    <SimplexIterationData data={result.process[step]} className={'p-md-5'}/>
                    {
                        step === result.process.length -1 && (
                            <div className='katex4'>
                                <div className='mb-2'>Z = {result.solution.z}</div>
                                {
                                    result.solution.xn.map((element, i) =>
                                    {
                                        return <div className='mb-2' key={`sol-x${i+1}`}>{`X${i+1}`} = {element}</div>
                                    })
                                }
                            </div>
                        )
                    }
                </div>
                <div className="steps-action">
                    {step < result.process.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            Siguiente
                        </Button>
                    )}
                    {step === result.process.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Proceso Completado')}>
                            Fin
                        </Button>
                    )}
                    {step > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Anterior
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}

StepByStepResult.contextType = SimplexContext;

export default StepByStepResult;
