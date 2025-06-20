import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import logo from "../assets/logo.png";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/api/register", formData);
            alert("¡Registro exitoso!");
            navigate("/login"); // Redirige a login
        } catch (error) {
            if (error.response) {
                alert("Error en el registro: " + JSON.stringify(error.response.data.errors));
            } else {
                alert("Error en el registro: " + error.message);
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-left">
                <h1 className="register-title">CronosDental</h1>
                <div className="register-logo">
                    <img src={logo} alt="Logo CronosDental" />
                </div>
            </div>
            <div className="register-right">
                <h1 className="register-heading">Registro de usuario</h1>
                <p className="register-subheading">Introduce los siguientes datos</p>
                <form className="register-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre completo"
                        required
                        onChange={handleChange}
                    />
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
                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Repite la contraseña"
                        required
                        onChange={handleChange}
                    />
                    <button type="submit" className="register-btn">
                        Crear cuenta
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
