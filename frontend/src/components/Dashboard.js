import React from "react";
import logo from "../assets/logo.png";
import bgDashboard from "../assets/bg_dashboard.png";
import "./Dashboard.css";

function Dashboard() {
    return (
        <div
            className="clients-bg"
            style={{
                background: `url(${bgDashboard}) center/cover no-repeat`,
            }}
        >
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul className="sidebar-menu">
                    <li className="active">Dashboard</li>
                    <li>Clientes</li>
                    <li>Pedidos</li>
                    <li>Cerrar sesión</li>
                </ul>
            </div>

            {/* Topbar */}
            <div className="topbar">
                <span className="active">Dashboard</span>
                <span>Clientes</span>
                <span>Pedidos</span>
                <span>Cerrar sesión</span>
            </div>

            {/* Paneles */}
            <div className="dashboard-panels right-shift">
                {/* Panel 1: Pedidos completados */}
                <div className="panel">
                    <div className="panel-header">Pedidos en completados</div>
                    <div className="panel-body full-lines">
                        <ul className="lista-elementos">
                            {[...Array(6)].map((_, idx) => (
                                <li key={idx}></li>
                            ))}
                        </ul>
                        <div className="expand-arrow">
                            <span className="arrow-icon">&#9660;</span>
                        </div>
                    </div>
                </div>

                {/* Panel 2: Pedidos en producción */}
                <div className="panel">
                    <div className="panel-header">Pedidos en producción</div>
                    <div className="panel-body full-lines">
                        <ul className="lista-elementos">
                            {[...Array(6)].map((_, idx) => (
                                <li key={idx}></li>
                            ))}
                        </ul>
                        <div className="expand-arrow">
                            <span className="arrow-icon">&#9660;</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
