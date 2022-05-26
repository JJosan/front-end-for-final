import React, { useState } from 'react';

const initialState = {
    id: undefined
}

export const Context = React.createContext();

const LoginState = ({ children }) => {
    const[loginState, setLoginState] = useState(initialState);

    return (
        <Context.Provider value={[loginState, setLoginState]}>
            {children}
        </Context.Provider>
    )
}

export default LoginState;