import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import '../App.css';
import {AuthContext} from "../context/AuthContext";

function Navbar() {

    const {logout} = useContext(AuthContext)


    return (
        <>
            <div className="header">
                <h1>Cookme. Let me help you decide what to cook</h1>
            </div>

            <div className="top-menu">
                <button type="button" onClick={logout}>Uitloggen</button>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" activeClassName="active-link">Register</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login" activeClassName="active-link">Login</NavLink>
                        </li>
                    </ul>
                </nav>

            </div>
        </>
    );

}

export default Navbar;