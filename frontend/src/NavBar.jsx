import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import { useContext } from "react";
import axios from "./../axios.config"

export default function Navbar() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    function signOut() {
        axios.get("/sign-out")
            .then(d => {
                setUser(null);
                navigate("/");
            })
    }
    // console.log(user)

    return <nav className="nav">
        <Link to="/" className="site-title">Servico</Link>
        <i className="fa-solid fa-xmark"></i>
        <ul>
            {user ? <li>
                {user.userType == "client" ?
                    <Link to="/showBookings">My Bookings</Link> :
                    <Link to="/showRequests">My Bookings</Link>}
            </li> : <></>}
            <li>
                <Link to="/about">About</Link>
            </li>

            <li>
                <span>Services</span>
                <div className="dropdown">
                    <ul>
                        <li>
                            <Link to="/service1">Plumbing Repairs</Link>
                        </li>
                        <li>
                            <Link to="/service2">Electrical Help</Link>
                        </li>
                        <li>
                            <Link to="/service3">Painting</Link>
                        </li>
                        <li>
                            <Link to="/service4">Home Cleaning</Link>
                        </li>
                        <li>
                            <Link to="/service5">Furniture Assembly</Link>
                        </li>
                        <li>
                            <Link to="/service6">Heavy Lifting</Link>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <Link to="/contact-us">Contact Us</Link>
            </li>
            {!user ?
                <li>
                    <Link to="/login">Sign up/Log in</Link>
                    {/* <a href="/login">Sign up/Log in</a> */}
                    <div className="dropdown">
                        <ul>
                            <li>
                                <Link to="/login" state={{ userType: "client" }}>User</Link>
                            </li>
                            <li>
                                <Link to="/login" state={{ userType: "serviceperson" }}>Service Provider</Link>
                            </li>
                        </ul>
                    </div>
                </li>
                :
                <li onClick={signOut}>Sign Out</li>}


        </ul>
    </nav>
}