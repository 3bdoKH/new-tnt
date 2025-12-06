import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('adminToken');
        const user = localStorage.getItem('adminUser');
        return token && user;
    };

    if (!isAuthenticated()) {
        return <Navigate to="/admin-login" replace />;
    }

    return children;
};

export default ProtectedRoute; 