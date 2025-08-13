// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
    const { isLoggedIn } = useAuth();

    // Return the element if the user is logged in, otherwise redirect to login
    return isLoggedIn ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
