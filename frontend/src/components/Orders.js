import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImg from "../assets/bg.png";
import logo from "../assets/logo.png";
import "./Orders.css";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [searchOrder, setSearchOrder] = useState("");
    const [foundOrder, setFoundOrder] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editFields, setEditFields] = useState({
        id: null,
        clinic_name: "",
        prosthesis_type: "",
        materials: "",
        status: "",
        delivery_date: "",
    });

    const [newOrder, setNewOrder] = useState({
        clinic_name: "",
        prosthesis_type: "",
        materials: "",
        status: "pending",
        delivery_date: "",
    });

    // Función para manejar logout
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/orders", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setOrders(response.data.data);
            } catch (error) {
                alert("Error cargando pedidos: " + error.message);
            }
        };
        loadOrders();
    }, []);

    const handleAddOrder = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/api/orders",
                newOrder,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setOrders(prevOrders => [...prevOrders, response.data]);
            setNewOrder({
                clinic_name: "",
                prosthesis_type: "",
                materials: "",
                status: "pending",
                delivery_date: "",
            });
            alert("Pedido añadido correctamente");
        } catch (error) {
            alert(
                "Error al añadir pedido: " +
                    (error.response?.data?.errors || error.message)
            );
        }
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                "http://localhost:8000/api/orders",
                {
                    params: { search: searchOrder },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setFoundOrder(response.data[0] || null);
            setIsEditing(false);
            if (response.data[0]) setEditFields(response.data[0]);
        } catch (error) {
            alert("Error en la búsqueda: " + error.message);
        }
    };

    const handleDelete = async () => {
        if (!foundOrder) return;
        if (window.confirm("¿Seguro que quieres eliminar este pedido?")) {
            try {
                await axios.delete(
                    `http://localhost:8000/api/orders/${foundOrder.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                setOrders(orders.filter((o) => o.id !== foundOrder.id));
                setFoundOrder(null);
                setSearchOrder("");
                alert("Pedido eliminado correctamente");
            } catch (error) {
                alert(
                    "Error al eliminar: " +
                        (error.response?.data?.message || error.message)
                );
            }
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditFields(foundOrder);
    };

    const handleEditFieldChange = (e) => {
        setEditFields({ ...editFields, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (!editFields.id) {
                alert("Error: No hay ID de pedido.");
                return;
            }
            const response = await axios.put(
                `http://localhost:8000/api/orders/${editFields.id}`,
                {
                    clinic_name: editFields.clinic_name,
                    prosthesis_type: editFields.prosthesis_type,
                    materials: editFields.materials,
                    status: editFields.status,
                    delivery_date: editFields.delivery_date,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            const updatedOrders = await axios.get(
                "http://localhost:8000/api/orders",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setOrders(updatedOrders.data.data);
            setFoundOrder(response.data);
            setIsEditing(false);
            alert("¡Pedido actualizado!");
        } catch (error) {
            alert("Error: " + (error.response?.data?.errors || error.message));
        }
    };

    return (
        <div
            className="clients-bg"
            style={{ background: `url(${bgImg}) center/cover no-repeat` }}
        >
            <div className="sidebar">
                <div className="sidebar-logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul className="sidebar-menu">
                    <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                    <li onClick={() => navigate("/clients")}>Clientes</li>
                    <li className="active">Pedidos</li>
                    <li onClick={handleLogout} style={{ cursor: "pointer" }}>Cerrar sesión</li>
                </ul>
            </div>

            <div className="topbar">
                <span onClick={() => navigate("/dashboard")}>Dashboard</span>
                <span onClick={() => navigate("/clients")}>Clientes</span>
                <span className="active">Pedidos</span>
                <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                    Cerrar sesión ({user?.name})
                </span>
            </div>

            <div className="clients-panels orders-panels">
                {/* Panel de búsqueda */}
                <form
                    className="panel search-panel form-md"
                    onSubmit={handleSearchSubmit}
                >
                    <div className="panel-header blue">
                        Buscar pedido por ID
                    </div>
                    <div className="panel-subheader">
                        <span className="edit-icon">📝</span>
                        <span className="edit-label">
                            Editar o eliminar pedido
                            <span className="delete-icon">🗑️</span>
                        </span>
                    </div>
                    <div className="panel-body">
                        <label>
                            <b>Introduce el ID del pedido</b>
                        </label>
                        <input
                            type="number"
                            placeholder="ID de pedido"
                            value={searchOrder}
                            onChange={(e) => setSearchOrder(e.target.value)}
                            className="input input-md"
                            required
                        />
                        <button className="add-btn btn-md" type="submit">
                            Buscar
                        </button>

                        {foundOrder && !isEditing && (
                            <div className="search-result">
                                <input
                                    type="text"
                                    value={foundOrder.clinic_name}
                                    className="input input-md"
                                    disabled
                                />
                                <input
                                    type="text"
                                    value={foundOrder.prosthesis_type}
                                    className="input input-md"
                                    disabled
                                />
                                <input
                                    type="text"
                                    value={foundOrder.materials}
                                    className="input input-md"
                                    disabled
                                />
                                <input
                                    type="text"
                                    value={foundOrder.status}
                                    className="input input-md"
                                    disabled
                                />
                                <input
                                    type="date"
                                    value={foundOrder.delivery_date}
                                    className="input input-md"
                                    disabled
                                />
                                <div className="btn-row">
                                    <button
                                        type="button"
                                        className="edit-btn btn-md"
                                        onClick={handleEdit}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        type="button"
                                        className="delete-btn btn-md"
                                        onClick={handleDelete}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        )}

                        {foundOrder && isEditing && (
                            <div className="search-result">
                                <input
                                    type="text"
                                    name="clinic_name"
                                    value={editFields.clinic_name}
                                    onChange={handleEditFieldChange}
                                    className="input input-md"
                                    required
                                />
                                <input
                                    type="text"
                                    name="prosthesis_type"
                                    value={editFields.prosthesis_type}
                                    onChange={handleEditFieldChange}
                                    className="input input-md"
                                    required
                                />
                                <input
                                    type="text"
                                    name="materials"
                                    value={editFields.materials}
                                    onChange={handleEditFieldChange}
                                    className="input input-md"
                                    required
                                />
                                <select
                                    name="status"
                                    value={editFields.status}
                                    onChange={handleEditFieldChange}
                                    className="input input-md"
                                    required
                                >
                                    <option value="pending">Pendiente</option>
                                    <option value="completed">Completado</option>
                                    <option value="production">Producción</option>
                                </select>
                                <input
                                    type="date"
                                    name="delivery_date"
                                    value={editFields.delivery_date}
                                    onChange={handleEditFieldChange}
                                    className="input input-md"
                                    required
                                />
                                <div className="btn-row">
                                    <button
                                        type="button"
                                        className="add-btn btn-md"
                                        onClick={handleSave}
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        type="button"
                                        className="delete-btn btn-md"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}

                        {foundOrder === null && searchOrder && (
                            <div style={{ color: "red", marginTop: "10px" }}>
                                No se encontró el pedido.
                            </div>
                        )}
                    </div>
                </form>

                {/* Panel de añadir pedido */}
                <form className="panel add-panel form-md" onSubmit={handleAddOrder}>
                    <div className="panel-header blue">
                        Añadir nuevo pedido
                    </div>
                    <div className="panel-body">
                        <input
                            type="text"
                            name="clinic_name"
                            placeholder="Nombre clínica"
                            value={newOrder.clinic_name}
                            onChange={e =>
                                setNewOrder({ ...newOrder, clinic_name: e.target.value })
                            }
                            className="input input-md"
                            required
                        />
                        <input
                            type="text"
                            name="prosthesis_type"
                            placeholder="Tipo de prótesis"
                            value={newOrder.prosthesis_type}
                            onChange={e =>
                                setNewOrder({ ...newOrder, prosthesis_type: e.target.value })
                            }
                            className="input input-md"
                            required
                        />
                        <input
                            type="text"
                            name="materials"
                            placeholder="Materiales"
                            value={newOrder.materials}
                            onChange={e =>
                                setNewOrder({ ...newOrder, materials: e.target.value })
                            }
                            className="input input-md"
                            required
                        />
                        <select
                            name="status"
                            value={newOrder.status}
                            onChange={e =>
                                setNewOrder({ ...newOrder, status: e.target.value })
                            }
                            className="input input-md"
                            required
                        >
                            <option value="pending">Pendiente</option>
                            <option value="completed">Completado</option>
                            <option value="production">Producción</option>
                        </select>
                        <input
                            type="date"
                            name="delivery_date"
                            placeholder="Fecha de entrega estimada"
                            value={newOrder.delivery_date}
                            onChange={e =>
                                setNewOrder({ ...newOrder, delivery_date: e.target.value })
                            }
                            className="input input-md"
                            required
                        />
                        <button className="add-btn btn-md" type="submit">
                            Añadir
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Orders;
