import CssBaseline from '@mui/material/CssBaseline';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CssBaseline />

        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>,
);
