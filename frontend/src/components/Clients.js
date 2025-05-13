import React, { useState } from "react";
import axios from "axios";
import bgImg from "../assets/bg.png";
import "./Clients.css";

const Clients = () => {
    // Estado para el listado de clínicas (puedes cargarlo del backend si quieres)
    const [clients, setClients] = useState([]);

    // Estado para añadir clínica
    const [newClient, setNewClient] = useState({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
    });

    // Estado para búsqueda y edición (frontend)
    const [searchClinic, setSearchClinic] = useState("");
    const [foundClient, setFoundClient] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editFields, setEditFields] = useState({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
    });

    // Añadir clínica (POST al backend)
    const handleAddClient = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/clinics", newClient);
            alert("Clínica añadida correctamente");
            setClients([...clients, response.data]);
            setNewClient({ nombre: "", email: "", telefono: "", direccion: "" });
        } catch (error) {
            alert(
                "Error al añadir clínica: " +
                    (error.response
                        ? JSON.stringify(error.response.data.errors)
                        : error.message)
            );
        }
    };

    // Buscar clínica (solo frontend)
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const client = clients.find(
            (c) => c.nombre.toLowerCase() === searchClinic.trim().toLowerCase()
        );
        setFoundClient(client || null);
        setIsEditing(false);
    };

    // Eliminar clínica (solo frontend, pendiente de conectar con backend)
    const handleDelete = () => {
        if (
            foundClient &&
            window.confirm("¿Seguro que quieres eliminar esta clínica?")
        ) {
            setClients(
                clients.filter(
                    (c) =>
                        c.nombre.toLowerCase() !==
                        foundClient.nombre.toLowerCase()
                )
            );
            setFoundClient(null);
            setSearchClinic("");
        }
    };

    // Editar clínica (solo frontend, pendiente de conectar con backend)
    const handleEdit = () => {
        setIsEditing(true);
        setEditFields(foundClient);
    };

    const handleEditFieldChange = (e) => {
        const { name, value } = e.target;
        setEditFields({ ...editFields, [name]: value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        setClients(
            clients.map((c) =>
                c.nombre === foundClient.nombre ? editFields : c
            )
        );
        setFoundClient(editFields);
        setIsEditing(false);
    };

    return (
        <div
            className="clients-bg"
            style={{
                background: `url(${bgImg}) center/cover no-repeat`,
            }}
        >
            <div className="sidebar">
                <div className="sidebar-logo">
                    <img src="/assets/logo.png" alt="Logo" />
                </div>
                <ul className="sidebar-menu">
                    <li>Dashboard</li>
                    <li className="active">Clientes</li>
                    <li>Pedidos</li>
                    <li>Cerrar sesión</li>
                </ul>
            </div>

            <div className="topbar">
                <span>Dashboard</span>
                <span className="active">Clientes</span>
                <span>Pedidos</span>
                <span>Cerrar sesión</span>
            </div>

            <div className="clients-panels">
                {/* Buscar clínica */}
                <form className="panel search-panel" onSubmit={handleSearchSubmit}>
                    <div className="panel-header blue">
                        Buscar cliente por nombre de la clínica
                    </div>
                    <div className="panel-subheader">
                        <span className="edit-icon">📝</span>
                        <span className="edit-label">
                            Editar o eliminar clínica
                            <span className="delete-icon">🗑️</span>
                        </span>
                    </div>
                    <div className="panel-body">
                        <label>
                            <b>Introduce el nombre:</b>
                            <span className="gray"> Clínica</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Clínica"
                            value={searchClinic}
                            onChange={(e) => setSearchClinic(e.target.value)}
                            className="input"
                            required
                            autoFocus
                        />
                        <button className="add-btn" type="submit">
                            Buscar
                        </button>

                        {foundClient && !isEditing && (
                            <div className="search-result">
                                <input type="text" value={foundClient.nombre} className="input" disabled />
                                <input type="email" value={foundClient.email} className="input" disabled />
                                <input type="tel" value={foundClient.telefono} className="input" disabled />
                                <input type="text" value={foundClient.direccion} className="input" disabled />
                                <div className="btn-row">
                                    <button type="button" className="edit-btn" onClick={handleEdit}>
                                        Editar
                                    </button>
                                    <button type="button" className="delete-btn" onClick={handleDelete}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        )}

                        {foundClient && isEditing && (
                            <div className="search-result">
                                <input
                                    type="text"
                                    name="nombre"
                                    value={editFields.nombre}
                                    onChange={handleEditFieldChange}
                                    className="input"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={editFields.email}
                                    onChange={handleEditFieldChange}
                                    className="input"
                                    required
                                />
                                <input
                                    type="tel"
                                    name="telefono"
                                    value={editFields.telefono}
                                    onChange={handleEditFieldChange}
                                    className="input"
                                    required
                                />
                                <input
                                    type="text"
                                    name="direccion"
                                    value={editFields.direccion}
                                    onChange={handleEditFieldChange}
                                    className="input"
                                    required
                                />
                                <div className="btn-row">
                                    <button type="submit" className="add-btn" onClick={handleSave}>
                                        Guardar
                                    </button>
                                    <button type="button" className="delete-btn" onClick={() => setIsEditing(false)}>
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}

                        {foundClient === null && searchClinic && (
                            <div style={{ color: "red", marginTop: "10px" }}>
                                No se encontró la clínica.
                            </div>
                        )}
                    </div>
                </form>

                {/* Añadir clínica */}
                <form className="panel add-panel" onSubmit={handleAddClient}>
                    <div className="panel-header blue">Añadir nueva clínica</div>
                    <div className="panel-body">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre de la clínica"
                            value={newClient.nombre}
                            onChange={(e) =>
                                setNewClient({ ...newClient, nombre: e.target.value })
                            }
                            className="input"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={newClient.email}
                            onChange={(e) =>
                                setNewClient({ ...newClient, email: e.target.value })
                            }
                            className="input"
                            required
                        />
                        <input
                            type="tel"
                            name="telefono"
                            placeholder="Teléfono"
                            value={newClient.telefono}
                            onChange={(e) =>
                                setNewClient({ ...newClient, telefono: e.target.value })
                            }
                            className="input"
                            required
                        />
                        <input
                            type="text"
                            name="direccion"
                            placeholder="Dirección"
                            value={newClient.direccion}
                            onChange={(e) =>
                                setNewClient({ ...newClient, direccion: e.target.value })
                            }
                            className="input"
                            required
                        />
                        <button className="add-btn" type="submit">
                            Añadir
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Clients;
