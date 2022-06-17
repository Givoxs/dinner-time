import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import "../App.css";
import {AuthContext} from "../context/AuthContext";

function Navbar({authenticated}) {
    const {logout, user} = useContext(AuthContext);

    return (
        <>
            <div className="header">
                <h1 className="header-home"> {authenticated === true ? <>{user.username.toUpperCase()}</> : "Cookme"} let
                    me help you decide what to cook</h1>
            </div>

            <div className="top-menu">
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                className={({isActive}) =>
                                    "" + (isActive ? " active-link" : "")
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        {authenticated === false ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/register"
                                        className={({isActive}) =>
                                            "" + (isActive ? " active-link" : "")
                                        }
                                    >
                                        Register
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/login"
                                        className={({isActive}) =>
                                            "" + (isActive ? " active-link" : "")
                                        }
                                    >
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <li>
                                <NavLink onClick={logout} to="/">
                                    Uitloggen
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Navbar;