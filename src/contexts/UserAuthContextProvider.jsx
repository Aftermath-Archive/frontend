import { createContext, useContext, useState, useEffect } from 'react';

export const UserAuthContext = createContext('');

export function useUserAuthContext() {
    return useContext(UserAuthContext);
}

export function UserAuthContextProvider({ children }) {
    // Initialize JWT state from localStorage
    const [userJwt, setUserJwtState] = useState(() => {
        return localStorage.getItem('userJwt') || '';
    });

    // Wrap setUserJwt to sync with localStorage
    const setUserJwt = (jwt) => {
        setUserJwtState(jwt);
        if (jwt) {
            localStorage.setItem('userJwt', jwt);
        } else {
            localStorage.removeItem('userJwt');
        }
    };

    return (
        <UserAuthContext.Provider value={[userJwt, setUserJwt]}>
            {children}
        </UserAuthContext.Provider>
    );
}
