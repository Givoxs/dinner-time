import React, {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

//1maak context aan
export const AuthContext = createContext({});

// 2maak een eigen context-provider component
//zodat we hier allerlei functies, state en andere dingen kunnen bijhouden
function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        //we zijn opnieuw opgestart
        //hebben we een token in de local storage? en is deze nog geldig?

        //zo ja, haal info op en plaats in de state.
        //zo nee, doe niets, laat originele state staan
        const token = localStorage.getItem("token");

        // is de token nog geldig? decodeerd te token en check de exp key en verglijk dit met new Date()
        // const decodedToken = jwtDecode("token")
        //schrijf functie die linux timestamp omzet naar javascript timestamp om te kijken of deze nog geldig is
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        if (token) {
            const decodedToken = jwt_decode(token);
            // Is de token nog geldig? Decodeer de token en check de exp key en vergelijk dit met new Date();
            //dan halen we data op
            async function fetchUserData() {
                try {
                    const response = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user/${decodedToken.sub}`,
                        {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    }
                    );
                    console.log(response)

                    // zet de gegevens van de gebruiker in de state!
                    setAuth({
                        ...auth,
                        isAuth: true,
                        user: {
                            email: response.data.email,
                            username: response.data.username,
                            id: response.data.id,
                        },
                        status: 'done',
                    });
                } catch (e) {
                    console.error(e);
                    if (e.response.status === 500) {
                        console.log('De server deed het niet');
                    } else if (e.response.status === 404) {
                        console.log('De developer heeft iets doms gedaan in het request');
                    } else if (e.response.status === 401) {
                        console.log('geen idee wat er fout gaat');
                    } else {
                        console.log('Het ging mis. Geen idee wat.');

                    }
                    setAuth({
                        ...auth,
                        status: 'done',
                    });
                }
            }

            fetchUserData();
        } else {
            // Geen token? We behouden de initiele state, maar zetten de status op 'done'
            setAuth({
                ...auth,
                status: 'done',
            });
        }
    }, []);


    const history = useHistory();

    function login(jwtToken) {
        //1 zet token in local storage
        localStorage.setItem('token', jwtToken);

// 2. We willen weten wat er allemaal te vinden is in deze token, dus we decoden hem:
        const decodedToken = jwt_decode(jwtToken);
        console.log(decodedToken);
        //sub = id
        // als het nodig is haal de juiste gebruikersinfo op met decodedToken.sub (id)

        //3zet userinfo in de contextstate

        setAuth({
            ...auth,
            isAuth: true,
            user: {
                email: decodedToken.email,
            },
            status: "done",
        });

        history.push("/profile");
    }

    function logout() {
        localStorage.clear(); //kijk of dit werkt
        setAuth({
            ...auth,
            isAuth: false,
        });
        history.push("/");
    }

    const contextData = {
        isAuth: auth.isAuth,
        login: login,
        logout: logout,
    };

// 3 render daarin het ECTHTE usercontext.provider
    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>

    );
}


export default AuthContextProvider;