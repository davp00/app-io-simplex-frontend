import React, { Component } from 'react';
import {SimplexContext} from "../context/SimplexContext";
import Title from "antd/es/typography/Title";


class SimplexRestrictions extends Component{
    render() {
        return (
            <div className={'mt-5 p-2'}>
                <Title level={4}>Restricciones</Title>
            </div>
        );
    }
}

SimplexRestrictions.contextType = SimplexContext;

export default SimplexRestrictions;