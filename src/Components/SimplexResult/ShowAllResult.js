import React, { Component } from 'react';
import Title from "antd/es/typography/Title";
import {Divider, Table} from "antd";
import { Redirect } from 'react-router-dom';
import {SimplexContext} from "../../context/SimplexContext";
import Column from "antd/lib/table/Column";
import SimplexIterationData from "./SimplexIterationData";

class ShowAllResult extends Component {
    render() {
        const { result } = this.context;

        if (!result)
            return <Redirect to={'/'}/>



        return (
            <div>
                {
                    result.process.map((element, i) =>
                    {
                        return (
                            <div  key={`i-${i}`}>
                                <div className='p-5'>
                                    <Title level={3} className='text-center mb-5'>Iteración {i}</Title>
                                    <SimplexIterationData data={element} />
                                </div>
                                <Divider />
                            </div>
                        )
                    })
                }
                <div className='text-center'>
                    <Title level={3} className='mb-5'>Solución</Title>
                    <div className='katex4'>
                        <div className='mb-2'>Z = {result.solution.z}</div>
                        {
                            result.solution.xn.map((element, i) =>
                            {
                                return <div className='mb-2' key={`sol-x${i+1}`}>{`X${i+1}`} = {element}</div>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }



}

ShowAllResult.contextType = SimplexContext;

export default ShowAllResult;
