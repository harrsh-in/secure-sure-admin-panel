import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouterProps {
    children: React.ReactElement;
}

const PublicRouter: React.FC<PublicRouterProps> = ({ children }) => {
    const token = Cookies.get('authToken');

    if (token) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default PublicRouter;
