import Box from '@mui/material/Box';
import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box>
            <Navbar handleDrawerToggle={handleDrawerToggle} />

            <Box
                sx={{
                    display: 'flex',
                }}
            >
                <Sidebar
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                />

                {children}
            </Box>
        </Box>
    );
};

export default PrivateLayout;

interface PrivateLayoutProps {
    children: React.ReactElement;
}
