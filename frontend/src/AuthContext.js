import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; // Importa axios

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    
    // Función para iniciar sesión
    const login = (userData, token) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        setUser(userData);
    };

    // Función para cerrar sesión
    const logout = () => {
        axios.post("http://localhost:8000/api/logout", {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).catch(error => console.error("Logout error:", error));
        
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    };

    // Recuperar usuario al cargar
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
