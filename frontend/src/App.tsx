import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { isDevMode } from './env';
import router from './router';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <main>
                <RouterProvider router={router} />
            </main>

            {isDevMode ? <ReactQueryDevtools initialIsOpen={false} /> : null}
        </QueryClientProvider>
    );
};

export default App;
