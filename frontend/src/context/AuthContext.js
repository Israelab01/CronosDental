import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verifica el estado de autenticación al cargar la app
    const checkAuthStatus = async () => {
        try {
            await axios.get('http://localhost:8000/api/user', {
                withCredentials: true
            });
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    // Efecto para verificar autenticación al montar el componente
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Función de login
    const login = async (email, password) => {
        try {
            await axios.post(
                'http://localhost:8000/api/login',
                { email, password },
                { withCredentials: true }
            );
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            setIsAuthenticated(false);
            return false;
        }
    };

    // Función de logout
    const logout = async () => {
        try {
            await axios.post(
                'http://localhost:8000/api/logout',
                {},
                { withCredentials: true }
            );
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
