import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import logo from "../assets/logo.png";
import { useAuth } from "../AuthContext"; // Importar useAuth

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { login } = useAuth(); // Usar función login del contexto

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/login", credentials);
            
            // Usar la función login del contexto
            login(response.data.user, response.data.access_token);
            
            navigate("/dashboard");
        } catch (error) {
            alert("Credenciales inválidas. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <h1 className="login-title">CronosDental</h1>
                <div className="login-logo">
                    <img src={logo} alt="Logo CronosDental" />
                </div>
            </div>
            <div className="login-right">
                <h1 className="login-heading">Inicio de Sesión</h1>
                <p className="login-subheading">Accede a tu cuenta</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        required
                        onChange={handleChange}
                    />
                    <button type="submit" className="login-btn">
                        Iniciar sesión
                    </button>
                </form>
                <div className="login-links">
                    <div className="register-link">
                        <span>¿Aún no tienes cuenta?</span>
                        <br />
                        <a href="/register">Regístrate aquí</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
