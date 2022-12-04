import React from "react";
import {Link} from 'react-router-dom';

const Navbar = () => 
{
        return(
                <header id="navbar">
                        <nav className="navbar navbar-expand-lg navbar-light">
                                <div id="navShape"></div>
                                <div className="container-fluid">
                                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                                <ul className="navbar-nav me-auto ms-lg-5">
                                                        <li className="nav-item">
                                                        <Link to="/" className="nav-link active" aria-current="page">Inicio</Link>
                                                        </li>
                                                        <li className="nav-item">
                                                        <Link className="nav-link active" aria-current="page">Nosotros</Link>
                                                        </li>
                                                </ul>
                                                <div className="d-flex">
                                                <Link to="/login"><button id="login-button" className="navbar-btn">Iniciar Sesión</button></Link>
                                                        <Link to="/register"><button id="register-button" className="navbar-btn">Registrarse</button></Link>
                                                </div>
                                        </div>
                                </div>
                        </nav>
                </header>
        )
}

export default Navbar;