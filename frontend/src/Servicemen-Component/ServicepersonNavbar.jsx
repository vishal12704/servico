import React from 'react'
import { Link } from "react-router-dom";

const ServicepersonNavbar = () => {
    return <nav className="nav">
        <a href="/" className="site-title">Servico</a>
        <i className="fa-solid fa-xmark" onClick="hideMenu()"></i>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/services">Your Services</Link>
                <div className="dropdown">
                    <ul>
                        <li>
                            <Link to="/service1">Pending Services</Link>
                        </li>
                        <li>
                            <Link to="/service2">Accepted Services</Link>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <Link to="/contact-us">Contact Us</Link>
            </li>
            <li>

            </li>

        </ul>
    </nav>
}

export default ServicepersonNavbar;