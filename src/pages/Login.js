import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";


function SignIn(){
    // 5 test of de context werkt door het volledige objedt te loggen met const alles = usecontext(countcontext)
    const {username, email, isAuthenticated, role} = useContext(AuthContext);



    return(
        <>
<p>{username}</p>
            <p>{email}</p>
            <p>{isAuthenticated}</p>
            <p>{role}</p>
        </>
    )
}

export default SignIn