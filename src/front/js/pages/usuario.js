import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/usuario.css";

export const Usuario = () => {
    const { store, actions } = useContext(Context);
    const [userInput, setUserInput] = useState([]);

    const handleLogout = () => {
        actions.logout();
    };

    if (!actions.getToken()) {
        return (
            <div className="container text-center mt-5">
                <h1 className="text-danger">No estás autorizado</h1>
            </div>
        );
    }

    return (
        <div className="container text-center mt-5">
            <h2 className="mb-4">Bienvenido Artista</h2>
            <Link to="/">
                <button onClick={handleLogout} className="btn btn-secondary">Cerrar Sesión</button>
            </Link>
        </div>
    );
};