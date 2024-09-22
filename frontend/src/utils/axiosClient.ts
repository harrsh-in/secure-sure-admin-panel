import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import { serverUrl } from '../env';
import { get } from 'lodash';

interface ApiResponse<T = unknown> {
    status: string;
    data: T;
    message: string;
}

const axiosClient = axios.create({
    baseURL: serverUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => response,
    (error: AxiosError) => {
        const errorStatusCode = get(error, 'response.status', 400);
        if (errorStatusCode === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    },
);

export default axiosClient;
