import React, {useState} from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

function Register() {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, toggleError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Something went wrong and we just don't know how the cookie crumbled. Try again please!");
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    async function test() {
        try {
            const result = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/test/all`);
            console.log(result);
        } catch (e) {
            console.error(e.response);
        }
    }

    async function RegisterUser(data) {
        try {
            const dataUser = await axios.post(
                `https://frontend-educational-backend.herokuapp.com/api/auth/signup`,
                {
                    username: `${userName}`,
                    email: `${email}`,
                    password: `${password}`,
                    roles: [`${data.chosenrole}`],
                }
            );
            console.log(dataUser);
            navigate("/login");
            toggleError(false);

        } catch (e) {
            // console.error(e.response);
            toggleError(true);
            setErrorMessage(e.response.data.message);
            // console.log(e.response.status);
        }
    }

    return (
        <>
            <div className="register-and-login-background">
                <div className="create-account-box">
                    <h2 className="create-account">Below you can create your own personal profile</h2>
                </div>

                <div className="form-reg-container">
                    <form onSubmit={handleSubmit(RegisterUser)}>
                        <label form="registeruser">
                            <input
                                type="text"
                                placeholder="Type your username..."
                                id="username"
                                {...register("username")}
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Type your emailaddress"
                                id="email"
                                {...register("email")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {!email.includes("@") ? <p className="error-message">@ is required in your
                                emailadress</p> : "✅ you added the @, well done"}
                            {email.length < 6 ? <p className="error-message">emailaddress needs to be 6 characters
                                long</p> : "✅ your emailaddress is long enough"}

                            <input
                                type="password"
                                placeholder="Type your password"
                                id="password"
                                {...register("password")}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {password.length < 4 &&
                            <p className="error-message">Password needs to be at least 4 characters long</p>}

                            <div className="role-drop-down">
                                <label htmlFor="chosenrole"></label>
                                <select name="chosenrole"{...register("chosenrole")}>
                                    <option value="">Choose your role</option>
                                    <option value="user">User</option>
                                    <option value="admin">Administrator</option>
                                </select>
                            </div>
                        </label>

                        <button type="submit" className="register-user-button"
                                disabled={!email.includes("@") || email.length < 6 || password.length < 4}>
                            {" "}
                            Register User
                        </button>
                    </form>
                </div>

                {error && <p className="error-message">{errorMessage}</p>}

                <button type="button" onClick={test}>
                    TEST server
                </button>
            </div>
        </>
    );
}

export default Register;