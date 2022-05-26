import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
    const [user] = useState(false);
    const [loading] = useState(true);

    useEffect(() => {
        
    }, [])

    return (
        <AuthContext.Provider value={{user}}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};