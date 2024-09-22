import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { get } from 'lodash';
import { serverUrl } from '../env';

// Define the structure of the API response
export interface ApiResponse<T = unknown> {
    status: string;
    data: T;
    message: string;
}

const axiosClient = axios.create({
    baseURL: serverUrl,
    timeout: 10000,
    withCredentials: true, // Ensure cookies are sent with requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => Promise.reject(error),
);

// Response interceptor
axiosClient.interceptors.response.use(
    (response) => {
        return response.data.data;
    },
    (error: AxiosError) => {
        const errorStatusCode = get(error, 'response.status', 400);
        if (errorStatusCode === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    },
);

export default axiosClient;
