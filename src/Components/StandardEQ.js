import React, { Component } from 'react';
import {SimplexContext} from "../context/SimplexContext";
import TeX from "@matejmazur/react-katex";

class StandardEQ extends Component {

    render() {
        const { result } = this.context;

        const standardEQ = result.standard_equation;

        if (!standardEQ)
            return <span />;

        return (
            <div className='katex3 text-center mb-4 '>
                <small className='mb-4'>
                    <div><TeX>S_n</TeX> = Variable De Holgura</div>
                    <div><TeX>-S_n</TeX> = Variable De Exceso</div>
                    <div><TeX>A_n</TeX> = Variable De Artificial</div>
                </small>
                <div className='mt-4 mb-4'>Ecuación Inicial</div>
                <div className='text-transform-upper'>{this.renderInitialEquation()}</div>
                <div className='mt-4 mb-4'>Ecuación Standar</div>
                <div className='text-transform-upper'>{this.renderStandardEquation(standardEQ)}</div>
                <div className='mt-4 mb-4'>Función Objetivo</div>
                <div className='text-transform-upper'>{ this.renderFO(standardEQ) }</div>
            </div>
        );
    }

    renderInitialEquation = () =>
    {
        const {n_vars, n_restrictions, restrictions} = this.context;
        let r_elements = [];

        for (let y = 0; y < n_restrictions; y++) {
            let fields = [];
            for (let x = 0; x < n_vars; x++) {
                if (x !== 0)
                    fields.push(<span> {restrictions[y].x_n[x] >= 0 ? '+' : '−'} </span>);
                fields.push(
                    <span key={`r-${y}-${x}`}>
                        {Math.abs(restrictions[y].x_n[x])} {`X${Number(x+1)}`}
                    </span>
                )
            }
            r_elements.push(
                <div key={'eq'+y} className='mb-2'>
                    {fields} <span className='ml-2'>{this.getInequation(restrictions[y].symbol)}</span> <span className={'ml-2'}>{restrictions[y].equal}</span>
                </div>
            );
        }
        return r_elements;
    };

    renderStandardEquation = (standardEQ) =>
    {
        const equation = [];

        for (let y = 0 ; y < standardEQ[0].values.length ; y++)
        {
            let r = [];
            for (let x = 1 ; x < standardEQ.length ; x++)
            {
                if (x !== 1)
                    r.push(<span> {standardEQ[x].values[y] >= 0 ? '+' : '−'} </span>)
                r.push(<span key={'r'+x}>{Math.abs(standardEQ[x].values[y])} {standardEQ[x].name}</span>)
            }
            equation.push(
                <div key={'eq'+y} className='mb-2'>
                    {r} <span className='ml-2'>=</span> <span className={'ml-2'}>{standardEQ[0].values[y]}</span>
                </div>
            );
        }
        return equation;
    };

    renderFO = (standardEQ) =>
    {
        const cj = [10,19];
        const FO = 'max';

        let data = [];

        data.push(
            <span className>
                < span className='mr-2'>{ FO } </span> Z =
            </span>
        )
        for (let i = 1 ; i < standardEQ.length ; i++)
        {
            data.push(
                <span className='ml-2'>
                    {i !== 1 ? this.getSymbol(cj[i-1] || 0): ''} {i-1 < cj.length ? Math.abs(cj[i-1]) : '0'} { standardEQ[i].name }
                </span>
            )
        }
        return data;
    };

    getSymbol = (num) =>
    {
        return num >= 0 ? '+' : '−';
    };

    getInequation = (inq) =>
    {
        switch (inq) {
            case '<=':
                return '≤';
            case '>=':
                return '≥';
            case '=':
                return '=';
            default:
                return '';
        }
    };
}


StandardEQ.contextType = SimplexContext;


export default StandardEQ;
