import React, { Component } from 'react';
import Title from "antd/es/typography/Title";
import {Divider} from "antd";
import { Redirect } from 'react-router-dom';
import {SimplexContext} from "../../context/SimplexContext";
import SimplexIterationData from "./SimplexIterationData";
import StandardEQ from "../StandardEQ";

class ShowAllResult extends Component {
    render() {
        const { result } = this.context;

        if (!result)
            return <Redirect to={'/'}/>;



        return (
            <div>
                <StandardEQ/>
                {
                    result.process.map((element, i) =>
                    {
                        return (
                            <div  key={`i-${i}`}>
                                <div className='p-md-5'>
                                    <Title level={3} className='text-center mb-5'>Iteración {i}</Title>
                                    <SimplexIterationData data={element} />
                                </div>
                                <Divider />
                            </div>
                        )
                    })
                }
                <div className='text-center'>

                    <div className='katex4'>
                        {
                            result.solution ? (
                                <>
                                    <Title level={3} className='mb-5'>Solución</Title>
                                    <div className='mb-2'>Z = {result.solution.z}</div>
                                    {
                                        result.solution.xn.map((element, i) =>
                                        {
                                            return <div className='mb-2' key={`sol-x${i+1}`}>{`X${i+1}`} = {element}</div>
                                        })
                                    }
                                </>
                            ) : (
                                <div>El problema no tiene solución</div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }



}

ShowAllResult.contextType = SimplexContext;

export default ShowAllResult;
