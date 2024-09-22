import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axiosClient from '../utils/axiosClient';

interface PrivateRouterProps {
    children: React.ReactElement;
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({ children }) => {
    const token = Cookies.get('isUserAuthenticated');
    const { setUserDetails } = useAuth();

    const { data, refetch } = useQuery({
        queryKey: ['getUserDetails'],
        queryFn: getUserDetailsApi,
        enabled: !!token,
    });

    useEffect(() => {
        if (token) {
            refetch();
        }
    }, [token]);

    useEffect(() => {
        if (data) {
            setUserDetails({
                userDetails: {
                    email: data.email,
                    id: data.id,
                    name: data.name,
                },
            });
        }
    }, [data]);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRouter;

const getUserDetailsApi = async (): Promise<{
    email: string;
    id: string;
    name: string;
}> => {
    return await axiosClient.get('/admin-staff/details');
};
