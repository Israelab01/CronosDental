import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import bgDashboard from "../assets/bg_dashboard.png";
import axios from "axios";
import "./Dashboard.css";
import { useAuth } from "../AuthContext"; // Importar el contexto de autenticación
import { useNavigate } from "react-router-dom"; // Para redirección

function Dashboard() {
    const { user, logout } = useAuth(); // Obtener usuario y función logout
    const navigate = useNavigate();
    const [completedOrders, setCompletedOrders] = useState([]);
    const [completedPage, setCompletedPage] = useState(1);
    const [completedLastPage, setCompletedLastPage] = useState(1);
    const [productionOrders, setProductionOrders] = useState([]);
    const [productionPage, setProductionPage] = useState(1);
    const [productionLastPage, setProductionLastPage] = useState(1);
    const [loading, setLoading] = useState(true);

    // Función para manejar logout
    const handleLogout = () => {
        logout(); // Llama a la función logout del contexto
        navigate("/login"); // Redirige al login
    };

    // Carga pedidos completados
    const loadCompletedOrders = async (page = 1) => {
        try {
            const res = await axios.get("http://localhost:8000/api/orders", {
                params: { status: "completed", page },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCompletedOrders(prev => [...prev, ...res.data.data]);
            setCompletedLastPage(res.data.last_page);
        } catch (err) {
            console.error("Error loading completed orders", err);
        }
    };

    // Carga pedidos en producción
    const loadProductionOrders = async (page = 1) => {
        try {
            const res = await axios.get("http://localhost:8000/api/orders", {
                params: { status: "production", page },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProductionOrders(prev => [...prev, ...res.data.data]);
            setProductionLastPage(res.data.last_page);
        } catch (err) {
            console.error("Error loading production orders", err);
        }
    };

    useEffect(() => {
        // Carga la primera página de cada lista
        Promise.all([
            loadCompletedOrders(1),
            loadProductionOrders(1)
        ]).then(() => setLoading(false));
        // eslint-disable-next-line
    }, []);

    // Mostrar más completados
    const handleShowMoreCompleted = () => {
        const nextPage = completedPage + 1;
        setCompletedPage(nextPage);
        loadCompletedOrders(nextPage);
    };

    // Mostrar más producción
    const handleShowMoreProduction = () => {
        const nextPage = productionPage + 1;
        setProductionPage(nextPage);
        loadProductionOrders(nextPage);
    };

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
                    <li onClick={() => navigate("/clients")}>Clientes</li>
                    <li onClick={() => navigate("/orders")}>Pedidos</li>
                    <li onClick={handleLogout} style={{ cursor: "pointer" }}>Cerrar sesión</li>
                </ul>
            </div>

            {/* Topbar */}
            <div className="topbar">
                <span className="active">Dashboard</span>
                <span onClick={() => navigate("/clients")}>Clientes</span>
                <span onClick={() => navigate("/orders")}>Pedidos</span>
                <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                    Cerrar sesión ({user?.name})
                </span>
            </div>

            {/* Paneles */}
            <div className="dashboard-panels right-shift">
                {/* Panel 1: Pedidos completados */}
                <div className="panel">
                    <div className="panel-header">Pedidos Completados</div>
                    <div className="panel-body full-lines">
                        {loading ? (
                            <div className="loading-text">Cargando pedidos...</div>
                        ) : (
                            <ul className="lista-elementos">
                                {completedOrders.length === 0 ? (
                                    <li>No hay pedidos completados.</li>
                                ) : (
                                    completedOrders.map(order => (
                                        <li key={order.id}>
                                            #{order.id} - {order.prosthesis_type}
                                        </li>
                                    ))
                                )}
                            </ul>
                        )}
                        {completedPage < completedLastPage && (
                            <div className="expand-arrow" onClick={handleShowMoreCompleted}>
                                <span className="arrow-icon">Mostrar más</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Panel 2: Pedidos en producción */}
                <div className="panel">
                    <div className="panel-header">Pedidos en Producción</div>
                    <div className="panel-body full-lines">
                        {loading ? (
                            <div className="loading-text">Cargando pedidos...</div>
                        ) : (
                            <ul className="lista-elementos">
                                {productionOrders.length === 0 ? (
                                    <li>No hay pedidos en producción.</li>
                                ) : (
                                    productionOrders.map(order => (
                                        <li key={order.id}>
                                            #{order.id} - {order.prosthesis_type} ({order.status})
                                        </li>
                                    ))
                                )}
                            </ul>
                        )}
                        {productionPage < productionLastPage && (
                            <div className="expand-arrow" onClick={handleShowMoreProduction}>
                                <span className="arrow-icon">Mostrar más</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
