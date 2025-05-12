import React from "react";
import "./Register.css";
import logo from "../assets/logo.png"; // Guarda tu logo en src/assets/logo.png

const Register = () => {
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
                <form className="register-form">
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Contraseña" required />
                    <input
                        type="password"
                        placeholder="Repite la contraseña"
                        required
                    />
                    <input type="text" placeholder="Dirección" required />
                    <input type="text" placeholder="Nombre" required />
                    <input type="text" placeholder="Clínica" required />
                    <input type="tel" placeholder="Teléfono" required />
                    <button type="submit" className="register-btn">
                        Crear cuenta
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
