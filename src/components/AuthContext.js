import React, { createContext, useState, useContext } from 'react';

// Create Context
const AuthContext = createContext();

// Create Provider Component
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('id'));

    const login = (userId, userType, firstName,lastName) => {
        localStorage.setItem('id', userId);
        localStorage.setItem('user_type', userType);
        localStorage.setItem('first_name', firstName);
        localStorage.setItem('last_name', lastName);

        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('user_type');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');

        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook for using the Auth Context
export function useAuth() {
    return useContext(AuthContext);
}
