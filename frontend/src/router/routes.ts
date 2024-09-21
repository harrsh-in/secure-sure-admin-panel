import { lazy, LazyExoticComponent } from 'react';

const Login = lazy(() => import('../pages/public/login'));
const SignUp = lazy(() => import('../pages/public/sign-up'));

const Home = lazy(() => import('../pages/private/Home'));

const publicRoutes: {
    path: string;
    element: LazyExoticComponent<() => JSX.Element>;
}[] = [
    {
        path: '/login',
        element: Login,
    },
    {
        path: '/sign-up',
        element: SignUp,
    },
];

const privateRoutes: {
    path: string;
    element: LazyExoticComponent<() => JSX.Element>;
}[] = [
    {
        path: '/',
        element: Home,
    },
];

export { privateRoutes, publicRoutes };
