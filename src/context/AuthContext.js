import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decode = jwt_decode(token);

            getUserData(token);
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: "done",
            });
        } // eslint-disable-next-line
    }, []);

    function login(JWT) {
        localStorage.setItem("token", JWT);
        const decode = jwt_decode(JWT);

        getUserData(JWT);
    }

    async function getUserData(token) {
        try {
            const result = await axios.get(
                `https://frontend-educational-backend.herokuapp.com/api/user`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(result.data);
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                },
                status: "done",
            });
            navigate("/profile");
        } catch (e) {
            console.error(e);
        }
    }

    function logout() {
        localStorage.clear();
        toggleIsAuth({
            ...isAuth,
            isAuth: false,
            user: null,
            status: "done",
        });
        navigate("/");
    }

    const data = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    return (
        <div>
            <AuthContext.Provider value={data}>
                {isAuth.status === "done" ? children : <p>Loading...</p>}
            </AuthContext.Provider>
        </div>
    );
}

export default AuthContextProvider;