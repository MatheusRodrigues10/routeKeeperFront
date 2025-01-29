import React, { useReducer } from "react";

//facilitar a criação de context e provider.
export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    };

    //acesso a essa informação e fornecer a data por todo o app
    return { Context, Provider };
};
