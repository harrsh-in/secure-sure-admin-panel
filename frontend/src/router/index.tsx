import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import FallbackLoader from '../components/Loader/FallbackLoader';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import { privateRoutes, publicRoutes } from './routes';

const router = createBrowserRouter([
    ...publicRoutes.map((route) => ({
        ...route,
        element: (
            <Suspense fallback={<FallbackLoader />}>
                <PublicRouter>
                    <route.element />
                </PublicRouter>
            </Suspense>
        ),
    })),
    ...privateRoutes.map((route) => ({
        ...route,
        element: (
            <Suspense fallback={<FallbackLoader />}>
                <PrivateRouter>
                    <route.element />
                </PrivateRouter>
            </Suspense>
        ),
    })),
]);

export default router;
