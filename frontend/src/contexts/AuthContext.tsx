// frontend/src/contexts/AuthContext.tsx
import { createContext, ReactNode, useState } from 'react';
import { Role } from '../types/enum';

interface AuthContextType {
    user: UserDetailsInterface | null;
    setUserDetails: ({
        userDetails,
    }: {
        userDetails: Partial<UserDetailsInterface>;
    }) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDetailsInterface | null>(null);

    const setUserDetails = ({
        userDetails,
    }: {
        userDetails: Partial<UserDetailsInterface>;
    }) =>
        setUser((prev) => {
            if (!prev) {
                prev = {
                    id: '',
                    roles: [],
                    email: '',
                    contact_no: '',
                    name: '',
                    address: '',
                };
            }

            return {
                ...prev,
                ...userDetails,
            };
        });
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, setUserDetails, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

interface UserDetailsInterface {
    id: string;
    roles: Role[];
    email: string;
    contact_no: string;
    name?: string;
    address?: string;
}
