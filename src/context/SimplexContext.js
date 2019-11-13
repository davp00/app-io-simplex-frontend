import React from 'react';
import SimplexRestriction from "../classes/SimplexRestriction.class";
import Fraction from 'fraction.js';

export const SimplexContext = React.createContext();

export class SimplexContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            n_vars: '',
            n_restrictions: '',
            FO: '',
            cj: [/*"2", "3", "-5"*/],
            restrictions: [
                /*{ x_n: ['1', '1', '1'], symbol: '=', equal: '7' },
                { x_n: ['2', '-5', '1'], symbol: '>=', equal: '10' },*/
            ],
            loading: false,
            result: undefined
        }
    }

    setContextState = (value, name) =>
    {
        this.setState((state)=>
        {
            state[name] = value;
            return state;
        });
    };

    setResult = (value) =>
    {
        this.setState({result: value});
    }

    setNumVars = (value) =>
    {
        this.setState({n_vars: value, cj: Array(Number(value)).fill('')});
    };

    setRestrictions = (value) =>
    {
        this.setState((state) =>
        {
            state.n_restrictions = value;
            state.restrictions = Array(Number(value)).fill( {} );

            for (let i in state.restrictions)
            {
                state.restrictions[i] = new SimplexRestriction(this.state.n_vars);
            }

            return state;
        });
    };

    setRestriction = (value, y, field, x = undefined) =>
    {
        this.setState((state) =>
        {
            if (x!==undefined)
                state.restrictions[y].x_n[x] = value;
            else
                state.restrictions[y][field] = value;

            return state;
        });
    };


    setCJ = (value, i) =>
    {
        this.setState((state) =>
        {
           state.cj[i] = value;
           return state;
        });
    };

    validate = ( ) =>
    {
        if (this.state.FO.length === 0)
            return { message: 'Falta tipo de Optimización', description: `Elegir el tipo de optimización`};

        for (let i in this.state.cj)
        {
            if (this.state.cj[ i ].length === 0)
                return { message: 'Datos faltantes en Funcion Objetivo', description: `Variable X${Number(i)+1} sin valor.`};
        }


        for (let y in this.state.restrictions)
        {
            let restriction = this.state.restrictions[y];

            for (let x = 0 ; x < restriction.x_n.length ; x++)
            {
                if (restriction.x_n[x].length === 0)
                    return { message: `Datos faltantes en Restricción ${Number(y)+1}`, description: `Variable X${Number(x)+1} sin valor.`};
            }

            if (restriction.equal.length === 0)
                return { message: `Datos faltantes en Restricción ${Number(y)+1}`, description: `Desigualdad sin dato`};
        }


        return true;
    };


    getData = ( ) =>
    {
        let data = {};

        data.cj = this.state.cj.map((element) => this.evaluate(element));

        data.restrictions = this.state.restrictions.map((restriction, i ) =>
        {

            restriction.x_n = restriction.x_n.map((element) => this.evaluate(element));

            restriction.equal = this.evaluate(restriction.equal);

            return restriction;
        });

        data.FO = this.state.FO;

        return data;
    };

    evaluate = (num) =>
    {
        if (typeof num == 'number')
            return num;

        let numbers = num.split('/');


        return numbers.length === 2 ? numbers[0] / numbers[1] : Number(numbers[0]);
    };

    resultToFraction = () =>
    {
        if (!this.state.result)
            return;

        this.setState((state)=>
        {
            if (state.result.solution)
            {
                state.result.solution.z = this.getFractionNumber(state.result.solution.z);

                state.result.solution.xn = state.result.solution.xn.map((element) => this.getFractionNumber(element) );
            }

            state.result.process = state.result.process.map((p) =>
            {

                p.zj = p.zj.map((element) => this.getFractionNumber(element));
                p.cj_zj = p.cj_zj.map((element) => this.getFractionNumber(element));

                p.matrix = p.matrix.map((m) =>
                {
                   m.values = m.values.map((element) => this.getFractionNumber(element));
                   return m;
                });

                p.cb = p.cb.map((element) => this.getFractionNumber(element));

                return p;
            });

            return state;
        });
    };

    static getFractionNumber = (num) =>
    {
        let f = new Fraction(num);
        return f.toFraction();
    };

    resultToDecimal = () =>
    {
        if (!this.state.result)
            return;

        this.setState((state)=>
        {

            if (state.result.solution)
            {
                state.result.solution.z = this.evaluate(state.result.solution.z);

                state.result.solution.xn = state.result.solution.xn.map((element) => this.evaluate(element) );
            }

            state.result.process = state.result.process.map((p) =>
            {

                p.zj = p.zj.map((element) => this.evaluate(element));
                p.cj_zj = p.cj_zj.map((element) => this.evaluate(element));

                p.matrix = p.matrix.map((m) =>
                {
                    m.values = m.values.map((element) => this.evaluate(element));
                    return m;
                });

                p.cb = p.cb.map((element) => this.evaluate(element));

                return p;
            });

            return state;
        });
    };

    getDecimalNumber = (fract) =>
    {
        let f = new Fraction(fract);
        return f.toString();
    };

    render() {
        const { children } = this.props;

        return (
            <SimplexContext.Provider
                value = {{
                    ...this.state,
                    setContextState: this.setContextState,
                    setNumVars: this.setNumVars,
                    setCJ: this.setCJ,
                    setRestrictions: this.setRestrictions,
                    setRestriction: this.setRestriction,
                    validate: this.validate,
                    getData: this.getData,
                    setResult: this.setResult,
                    resultToFraction : this.resultToFraction,
                    resultToDecimal: this.resultToDecimal,
                }}
            >
                {children}
            </SimplexContext.Provider>
        );
    }
}


export const SimplexContextConsumer = SimplexContext.Consumer;
