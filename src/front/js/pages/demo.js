import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/demo.css";
import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const [userInput, setUserInput] = useState({});

	const handleSubmit = (e) => {
        e.preventDefault();
        actions.registro(userInput);
        console.log(userInput);
        window.location.href = "/";
    };

	return (
        <form onSubmit={handleSubmit} className="p-4 border rounded" style={{ maxWidth: '400px', margin: 'auto', backgroundColor: '#f8f9fa' }}>
            <h2 className="mb-4 text-center">Registro</h2>
            <div className="my-3">
                <label className="form-label d-flex align-items-center text-start">
                    <i className="fas fa-envelope mx-2" style={{ color: "#B197FC", fontSize: 24 }}></i>
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    className="form-control"
                    minLength={3}
                    required
                    value={userInput.email || ""}
                    onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                    placeholder="nombre@ejemplo.com"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label d-flex align-items-center text-start">
                    <i className="fas fa-lock mx-2" style={{ color: "#B197FC", fontSize: 24 }}></i>
                    Contraseña
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={userInput.password || ""}
                    onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
                    placeholder="********"
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">Enviar</button>
        </form>
    );
};
