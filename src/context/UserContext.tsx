import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
    fresas: number;
    addFresas: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fresas, setFresas] = useState<number>(() => {
        const stored = localStorage.getItem('user_fresas');
        return stored ? parseInt(stored, 10) : 0;
    });

    useEffect(() => {
        localStorage.setItem('user_fresas', fresas.toString());
    }, [fresas]);

    const addFresas = (amount: number) => {
        setFresas(prev => prev + amount);
    };

    return (
        <UserContext.Provider value={{ fresas, addFresas }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
