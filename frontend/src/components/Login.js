import React from "react";
import "./Login.css";
import logo from "../assets/logo.png";

const Login = () => (
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
            <form className="login-form">
                <input type="email" placeholder="Campo de Email" required />
                <input
                    type="password"
                    placeholder="Campo de Contraseña"
                    required
                />
                <button type="submit" className="login-btn">
                    Iniciar sesión
                </button>
            </form>
            <div className="login-links">
                <div className="forgot-password">
                    <span>¿Has olvidado la contraseña?</span>
                    <br />
                    <a href="#">Pulsa aquí para resetearla</a>
                </div>
                <div className="register-link">
                    <span>¿Aun no tienes cuenta creada con nosotros?</span>
                    <br />
                    <a href="#">Pulsa aquí para registrarte</a>
                </div>
            </div>
        </div>
    </div>
);

export default Login;
