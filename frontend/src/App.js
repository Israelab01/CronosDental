import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Clients from "./components/Clients";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import axios from "axios";
import { AuthProvider } from "./AuthContext"; // Importar AuthProvider

// Configurar interceptor global de axios
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

axios.interceptors.response.use(response => response, error => {
    if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

function App() {
    return (
        <AuthProvider> {/* Envolver toda la app con AuthProvider */}
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Login />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
