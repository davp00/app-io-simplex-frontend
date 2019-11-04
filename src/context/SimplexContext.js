import React from 'react';
import SimplexRestriction from "../classes/SimplexRestriction.class";

export const SimplexContext = React.createContext();

export class SimplexContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            n_vars: '3',
            n_restrictions: '2',
            FO: '',
            cj: [],
            restrictions: [new SimplexRestriction(3), new SimplexRestriction(3)]
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
                    setRestriction: this.setRestriction
                }}
            >
                {children}
            </SimplexContext.Provider>
        );
    }
}


export const SimplexContextConsumer = SimplexContext.Consumer;
