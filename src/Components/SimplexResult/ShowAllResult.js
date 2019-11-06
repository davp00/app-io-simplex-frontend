import React, { Component } from 'react';
import Title from "antd/es/typography/Title";
import {Table} from "antd";
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
                <Title level={4}>Resultado</Title>
                {
                    result.process.map((element, i) =>
                    {
                        return (
                            <div className={'mb-3'} key={`i-${i}`}>
                                <SimplexIterationData data={element} />
                            </div>
                        )
                    })
                }
            </div>
        );
    }



}

ShowAllResult.contextType = SimplexContext;

export default ShowAllResult;
