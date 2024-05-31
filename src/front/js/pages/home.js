import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
        <>
            <div className="cool-image-container text-center mt-5">
                <h1>WELCOME</h1>
            </div>
            <div className="botones d-flex justify-content-around mt-4">
                <Link to="/signup">
                    <button className="btn btn-primary">Registro</button>
                </Link>
                <Link to="/login">
                    <button className="btn btn-secondary">Login</button>
                </Link>
            </div>
        </>
    );
};
