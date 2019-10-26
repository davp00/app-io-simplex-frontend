import React from 'react';

export const SimplexContext = React.createContext();

export class SimplexContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            n_vars: 2,
            n_restrictions: 4,
            FO: ''
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

    render() {
        const { children } = this.props;

        return (
            <SimplexContext.Provider
                value = {{
                    ...this.state,
                    setContextState: this.setContextState,
                }}
            >
                {children}
            </SimplexContext.Provider>
        );
    }
}


export const SimplexContextConsumer = SimplexContext.Consumer;