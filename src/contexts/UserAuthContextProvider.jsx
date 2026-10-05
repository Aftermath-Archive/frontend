import { createContext, useContext, useState } from 'react';

export const UserAuthContext = createContext('');

export function useUserAuthContext() {
    return useContext(UserAuthContext);
}

export function UserAuthContextProvider({ children }) {
    // Initialize JWT state from localStorage
    const [userJwtState, setUserJwtState] = useState(() => {
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
        <UserAuthContext.Provider value={[userJwtState, setUserJwt]}>
            {children}
        </UserAuthContext.Provider>
    );
}
