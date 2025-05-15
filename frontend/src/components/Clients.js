import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImg from "../assets/bg.png";
import "./Clients.css";

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [searchClinic, setSearchClinic] = useState("");
    const [foundClient, setFoundClient] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editFields, setEditFields] = useState({
        id: null,
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
    });

    const [newClient, setNewClient] = useState({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
    });

    // Cargar clínicas al iniciar
    useEffect(() => {
        const loadClinics = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/clinics"
                );
                setClients(response.data);
            } catch (error) {
                alert("Error cargando clínicas: " + error.message);
            }
        };
        loadClinics();
    }, []);

    // Añadir clínica
    const handleAddClient = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/api/clinics",
                newClient
            );
            setClients([...clients, response.data]);
            setNewClient({
                nombre: "",
                email: "",
                telefono: "",
                direccion: "",
            });
            alert("Clínica añadida correctamente");
        } catch (error) {
            alert(
                "Error al añadir clínica: " +
                    (error.response?.data?.errors || error.message)
            );
        }
    };

    // Buscar clínica
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                "http://localhost:8000/api/clinics",
                {
                    params: { search: searchClinic },
                }
            );
            setFoundClient(response.data[0] || null);
            setIsEditing(false);
            if (response.data[0]) setEditFields(response.data[0]);
        } catch (error) {
            alert("Error en la búsqueda: " + error.message);
        }
    };

    // Eliminar clínica
    const handleDelete = async () => {
        if (!foundClient) return;

        if (window.confirm("¿Seguro que quieres eliminar esta clínica?")) {
            try {
                await axios.delete(
                    `http://localhost:8000/api/clinics/${foundClient.id}`
                );
                setClients(clients.filter((c) => c.id !== foundClient.id));
                setFoundClient(null);
                setSearchClinic("");
                alert("Clínica eliminada correctamente");
            } catch (error) {
                alert(
                    "Error al eliminar: " +
                        (error.response?.data?.message || error.message)
                );
            }
        }
    };

    // Editar clínica
    const handleEdit = () => {
        setIsEditing(true);
        setEditFields(foundClient);
    };

    const handleEditFieldChange = (e) => {
        setEditFields({ ...editFields, [e.target.name]: e.target.value });
    };

    // GUARDAR CAMBIOS DE EDICIÓN (¡NO ANIDES FORMULARIOS!)
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (!editFields.id) {
                alert("Error: No hay ID de clínica.");
                return;
            }

            console.log("Datos a enviar:", editFields);

            const response = await axios.put(
                `http://localhost:8000/api/clinics/${editFields.id}`,
                {
                    nombre: editFields.nombre,
                    email: editFields.email,
                    telefono: editFields.telefono,
                    direccion: editFields.direccion,
                }
            );

            // Recarga el listado completo de clínicas desde el backend
            const updatedClinics = await axios.get("http://localhost:8000/api/clinics");
            setClients(updatedClinics.data);

            setFoundClient(response.data);
            setIsEditing(false);
            alert("¡Clínica actualizada!");
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
                {/* Panel de búsqueda */}
                <form
                    className="panel search-panel"
                    onSubmit={handleSearchSubmit}
                >
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
                        />
                        <button className="add-btn" type="submit">
                            Buscar
                        </button>

                        {foundClient && !isEditing && (
                            <div className="search-result">
                                <input
                                    type="text"
                                    value={foundClient.nombre}
                                    className="input"
                                    disabled
                                />
                                <input
                                    type="email"
                                    value={foundClient.email}
                                    className="input"
                                    disabled
                                />
                                <input
                                    type="tel"
                                    value={foundClient.telefono}
                                    className="input"
                                    disabled
                                />
                                <input
                                    type="text"
                                    value={foundClient.direccion}
                                    className="input"
                                    disabled
                                />
                                <div className="btn-row">
                                    <button
                                        type="button"
                                        className="edit-btn"
                                        onClick={handleEdit}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        type="button"
                                        className="delete-btn"
                                        onClick={handleDelete}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        )}

                        {foundClient && isEditing && (
                            <div className="search-result">
                                {/* ¡NO FORM! */}
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
                                    <button
                                        type="button"
                                        className="add-btn"
                                        onClick={handleSave}
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        type="button"
                                        className="delete-btn"
                                        onClick={() => setIsEditing(false)}
                                    >
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

                {/* Panel de añadir clínica */}
                <form className="panel add-panel" onSubmit={handleAddClient}>
                    <div className="panel-header blue">
                        Añadir nueva clínica
                    </div>
                    <div className="panel-body">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre de la clínica"
                            value={newClient.nombre}
                            onChange={(e) =>
                                setNewClient({
                                    ...newClient,
                                    nombre: e.target.value,
                                })
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
                                setNewClient({
                                    ...newClient,
                                    email: e.target.value,
                                })
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
                                setNewClient({
                                    ...newClient,
                                    telefono: e.target.value,
                                })
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
                                setNewClient({
                                    ...newClient,
                                    direccion: e.target.value,
                                })
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
