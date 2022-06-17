import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

function Profile() {

    const {user} = useContext(AuthContext);

    return (
        <>
            <h1>Welcome to your profile: {user.username}</h1>
        </>
    );
}

export default Profile;