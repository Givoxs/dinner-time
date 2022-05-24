import React, {useContext, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {useForm} from "react-hook-form";
// import {useHistory} from "react-router-dom";


function Login() {
    // 5 test of de context werkt door het volledige objedt te loggen met const alles = usecontext(countcontext)
    const {login} = useContext(AuthContext);
    const {
        register,
        handleSubmit
    } = useForm();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, toggleError] = useState(false)
    // const history = useHistory();

    //als gebruiker op button klikt willen we eerst axios request maken om gebruiker in te loggen. wat we terug krijgen geven we door via context


    async function logUserIn() {
// 1 eerst willen we een axios request maken om de gebruiker i te loggen op basis van de ingevulde waardes vanuit het form
        try {
            const response = await axios.post(`https://frontend-educational-backend.herokuapp.com/api/auth/signin`, {
                username: `${userName}`,
                password: `${password}`
            });
            console.log(response);
            console.log(response.data.accessToken);

            login(response.data.accessToken); //hier moet nog het token worden meegegeven, uit voorbeeld is dat "response.data.accestoken"
            // login() //hier moet nog het token worden meegegeven, uit voorbeeld is dat "response.data.accestoken"
            //zorg dat je eerst response logt om te kijken waar jwt in verwerkt staat. zet accestoken als parameter "response.data.accestoken"
            // history.push("/profile")

        } catch (e) {
            console.error(e);
            console.log(e.response);
            toggleError(true);
            // toon eventuele errors aan de gebruiker
        }
    }

    return (
        <>
            <div className="register-and-login-background">
            <form onSubmit={handleSubmit}>
                <label form="loginuser">

                    Fill in username:
                    <input
                        type="text"
                        placeholder="Username..."
                        id="username"
                        {...register("username")}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    Fill in password:
                    <input
                        type="password"
                        placeholder="Password..."
                        id="password"
                        {...register("password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

               {/*op type=submit wordt alles geleegd*/}
                <button type="button" onClick={logUserIn}>
                    Log me in
                </button>
            </form>
            {error && <p>Oeps er ging iets mis</p>}
            </div>

        </>
    );
}

export default Login;