import React, {useState} from 'react';
// import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {useForm} from "react-hook-form";
import {Link, useHistory} from "react-router-dom";

function Register(){
    // 5 test of de context werkt door het volledige objedt te loggen met const alles = usecontext(countcontext)

    const {
        register,
        handleSubmit
    } = useForm();
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [registeredMessage, setRegisteredMessage] = useState("")
    const history = useHistory();

    async function test(){
        try{
            const result = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/test/all`)
            console.log(result)
        }
        catch (e) {
            console.error(e.response)

        }

    }


    async function RegisterUser(){

        try{
            const dataUser = await axios.post(`https://frontend-educational-backend.herokuapp.com/api/auth/signup`,
            {
       username: `${userName}`,
       email: `${email}`,
       password: `${password}`,
       roles: [{role}],
    }
                // indien het admin of combi moet zijn: ["user", "admin"]
    )
            console.log(dataUser)
            setRegisteredMessage(dataUser.data.message)
            history.push('/login')
        }

        catch (e) {
            console.error(e.response)
        }

        // RegisterUser()
        console.log(userName,email,password,role)

    }

    //zorg dat je eerst response logt om te kijken waar jwt in verwerkt staat
    // }
    //Let hierbij op de volgende vereisten:
    //
    // Het emailadres moet daadwerkelijk een @ bevatten
    // Het wachtwoord en gebruikersnaam moeten minimaal 6 tekens bevatten
    // Wanneer je een gebruiker probeert te registreren met een username die al bestaat, krijg je een foutcode. De details over deze foutmelding vindt je in e.response.


    return(
        <>

            <div className="register-and-login-background">
                <div className="create-account-box"><h3 className="create-account">Create an Account</h3></div>

                <div className="form-reg-container">
            <form onSubmit={handleSubmit}>
                <label form="registeruser">
                    <div className="register-form-descriptions"> Choose your username?</div>
                   <input
                        type="text"
                        placeholder="Type here..."
                        id="first name"
                        {...register("firstname")}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <div className="register-form-descriptions">What is your emailaddress?</div>
                       <input
                        type="text"
                        placeholder="Type here..."
                        id="email"
                        {...register("email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {!email.includes("@") && <p>Don't forget the "@"</p>}
                    {email.length < 6 ?  <p>Oops, seems like your emailaddress is too short</p> : ""}


                    <div className="register-form-descriptions"> Choose your password</div>
                        <input
                        type="password"
                        placeholder="Type your password"
                        id="password"
                        {...register("password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="register-form-descriptions">Choose your role</div>
                       <input
                        type="text"
                        placeholder="Role..."
                        id="role"
                        {...register("role")}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}

                    />

                </label>
                <button type="button" onClick={RegisterUser}> Register User
                </button>
            </form>
                </div>

                {registeredMessage.length > 2 && <p>{registeredMessage} click <Link to="/login">here</Link> to go to the login page!</p>}


            <button type="button" onClick={test}>TEST server</button>
            </div>

        </>
    )
}

export default Register;




