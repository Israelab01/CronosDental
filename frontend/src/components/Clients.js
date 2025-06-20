import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImg from "../assets/bg.png";
import logo from "../assets/logo.png";
import "./Clients.css";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Clients = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [searchClient, setSearchClient] = useState("");
    const [foundClient, setFoundClient] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editFields, setEditFields] = useState({
        id: null,
        name: "",
        email: "",
        address: "",
        phone: "",
        clinic: "",
    });

    const [newClient, setNewClient] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        clinic: "",
    });

    // Función para manejar logout
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        const loadClients = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/clients", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setClients(response.data.data);
            } catch (error) {
                alert("Error cargando clientes: " + error.message);
            }
        };
        loadClients();
    }, []);

    const handleAddClient = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/api/clients",
                newClient,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setClients(prevClients => [...prevClients, response.data]);
            setNewClient({
                name: "",
                email: "",
                address: "",
                phone: "",
                clinic: "",
            });
            alert("Cliente añadido correctamente");
        } catch (error) {
            alert(
                "Error al añadir cliente: " +
                    (error.response?.data?.errors || error.message)
            );
        }
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                "http://localhost:8000/api/clients",
                {
                    params: { search: searchClient },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setFoundClient(response.data[0] || null);
            setIsEditing(false);
            if (response.data[0]) setEditFields(response.data[0]);
        } catch (error) {
            alert("Error en la búsqueda: " + error.message);
        }
    };

    const handleDelete = async () => {
        if (!foundClient) return;
        if (window.confirm("¿Seguro que quieres eliminar este cliente?")) {
            try {
                await axios.delete(
                    `http://localhost:8000/api/clients/${foundClient.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                setClients(clients.filter((c) => c.id !== foundClient.id));
                setFoundClient(null);
                setSearchClient("");
                alert("Cliente eliminado correctamente");
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
        setEditFields(foundClient);
    };

    const handleEditFieldChange = (e) => {
        setEditFields({ ...editFields, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (!editFields.id) {
                alert("Error: No hay ID de cliente.");
                return;
            }
            const response = await axios.put(
                `http://localhost:8000/api/clients/${editFields.id}`,
                {
                    name: editFields.name,
                    email: editFields.email,
                    address: editFields.address,
                    phone: editFields.phone,
                    clinic: editFields.clinic,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            const updatedClients = await axios.get(
                "http://localhost:8000/api/clients",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setClients(updatedClients.data.data);
            setFoundClient(response.data);
            setIsEditing(false);
            alert("¡Cliente actualizado!");
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
                    <li className="active">Clientes</li>
                    <li onClick={() => navigate("/orders")}>Pedidos</li>
                    <li onClick={handleLogout} style={{ cursor: "pointer" }}>Cerrar sesión</li>
                </ul>
            </div>

            <div className="topbar">
                <span onClick={() => navigate("/dashboard")}>Dashboard</span>
                <span className="active">Clientes</span>
                <span onClick={() => navigate("/orders")}>Pedidos</span>
                <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                    Cerrar sesión ({user?.name})
                </span>
            </div>

            <div className="clients-panels">
                {/* Panel de búsqueda */}
                <form
                    className="panel search-panel form-md"
                    onSubmit={handleSearchSubmit}
                >
                    <div className="panel-header blue">
                        Buscar cliente por ID
                    </div>
                    <div className="panel-subheader">
                        <span className="edit-icon">📝</span>
                        <span className="edit-label">
                            Editar o eliminar cliente
                            <span className="delete-icon">🗑️</span>
                        </span>
                    </div>
                    <div className="panel-body">
                        <label>
                            <b>Introduce el ID del cliente</b>
                        </label>
                        <input
                            type="number"
                            placeholder="ID de cliente"
                            value={searchClient}
                            onChange={(e) => setSearchClient(e.target.value)}
                            className="input input-md"
                            required
                        />
                        <button className="add-btn btn-md" type="submit">
                            Buscar
                        </button>

                        {foundClient && !isEditing && (
                            <div className="search-result">
                                <input
                                    type="text"
                                    value={foundClient.name}
                                    className="input input-md"
                                    disabled
                                />
                                <input
                                    type="text"
                                    value={foundClient.email}
                                    className="input input-md"
                                    disabled
                                />
                                <input
                                    type="text"
                                    value={foundClient.address}
                                    className="input input-md"
                                    disabled
                                />
                                <input
                                    type="text"
                                    value={foundClient.phone}
                                    className="input input-md"
                                    disabled
                                />
                                <input
                                    type="text"
                                    value={foundClient.clinic}
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

                        {foundClient && isEditing && (
                            <div className="search-result">
                                <input
                                    type="text"
                                    name="name"
                                    value={editFields.name}
                                    onChange={handleEditFieldChange}
                                    className="input input-md"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={editFields.email}
                                    onChange={handleEditFieldChange}
                                    className="input input-md"
                                    required
                                />
                                <input
                                    type="text"
                                    name="address"
                                    value={editFields.address}
                                    onChange={handleEditFieldChange}
                                    className="input input-md"
                                    required
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editFields.phone}
                                    onChange={handleEditFieldChange}
                                    className="input input-md"
                                    required
                                />
                                <input
                                    type="text"
                                    name="clinic"
                                    value={editFields.clinic}
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

                        {foundClient === null && searchClient && (
                            <div style={{ color: "red", marginTop: "10px" }}>
                                No se encontró el cliente.
                            </div>
                        )}
                    </div>
                </form>

                {/* Panel de añadir cliente */}
                <form className="panel add-panel form-md" onSubmit={handleAddClient}>
                    <div className="panel-header blue">
                        Añadir nuevo cliente
                    </div>
                    <div className="panel-body">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={newClient.name}
                            onChange={e =>
                                setNewClient({ ...newClient, name: e.target.value })
                            }
                            className="input input-md"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={newClient.email}
                            onChange={e =>
                                setNewClient({ ...newClient, email: e.target.value })
                            }
                            className="input input-md"
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Dirección"
                            value={newClient.address}
                            onChange={e =>
                                setNewClient({ ...newClient, address: e.target.value })
                            }
                            className="input input-md"
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Teléfono"
                            value={newClient.phone}
                            onChange={e =>
                                setNewClient({ ...newClient, phone: e.target.value })
                            }
                            className="input input-md"
                            required
                        />
                        <input
                            type="text"
                            name="clinic"
                            placeholder="Clínica"
                            value={newClient.clinic}
                            onChange={e =>
                                setNewClient({ ...newClient, clinic: e.target.value })
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

export default Clients;
