import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouterProps {
    children: React.ReactElement;
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({ children }) => {
    const token = Cookies.get('isUserAuthenticated');

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRouter;
