import React, { createContext, useState, useContext } from 'react';

// Create Context
const AuthContext = createContext();

// Create Provider Component
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('id'));

    const login = (userId) => {
        localStorage.setItem('id', userId);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('id');
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
