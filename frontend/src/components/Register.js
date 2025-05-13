import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import logo from "../assets/logo.png";

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password_confirmation: "",
        address: "",
        name: "",
        clinic: "",
        phone: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            "http://localhost:8000/api/register",
            formData
        );
        alert("¡Registro exitoso!");
        // Aquí puedes redirigir al login o limpiar el formulario
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            alert("Error en el registro: " + JSON.stringify(error.response.data));
        } else if (error.request) {
            console.error('Error request:', error.request);
            alert("Error en el registro: No hay respuesta del servidor");
        } else {
            console.error('Error:', error.message);
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
                <p className="register-subheading">
                    Introduce los siguientes datos
                </p>
                <form className="register-form" onSubmit={handleSubmit}>
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
                    <input
                        type="text"
                        name="address"
                        placeholder="Dirección"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="clinic"
                        placeholder="Clínica"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Teléfono"
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
