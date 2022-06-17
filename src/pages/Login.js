import React, {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {useForm} from "react-hook-form";

function Login() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, toggleError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const {login} = useContext(AuthContext);
    const {register} = useForm();

    async function logUserIn(e) {
        e.preventDefault();
        try {
            const response = await axios.post(
                `https://frontend-educational-backend.herokuapp.com/api/auth/signin`,
                {
                    username: userName,
                    password: password,
                }
            );
            toggleError(false);
            login(response.data.accessToken);

        } catch (e) {
            toggleError(true);

            if (e.response.status === 401) {
                setErrorMessage("Oops, combination between username/password seems to be wrong, try again sugar");
            } else if (e.response.status === 400) {
                setErrorMessage("Sorry, maybe you misspelled something honey? try again! ");
            } else if (e.response.status === 403) {
                setErrorMessage("It seems your trying to acces the forbidden fruit! Try again");
            } else {
                setErrorMessage("Hmm we just don't know how the cookie crumbled. Try again please!");
            }
        }
    }

    return (
        <>
            <div className="register-and-login-background">

                <div className="login-account-box">
                    <h2 className="login-account">Login to your account</h2>
                </div>

                <div className="log-user-box">
                    <form onSubmit={logUserIn}>
                        <label form="loginuser">
                            <input
                                type="text"
                                placeholder="What is your username?"
                                id="username"
                                {...register("username")}
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="What is your password?"
                                id="password"
                                {...register("password")}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>

                        <button className="button-login" disabled={userName.length < 1 || password.length < 4}>
                            Log in
                        </button>
                    </form>
                </div>

                {error && <p className="error-message">{errorMessage}</p>}

            </div>
        </>
    );
}

export default Login;