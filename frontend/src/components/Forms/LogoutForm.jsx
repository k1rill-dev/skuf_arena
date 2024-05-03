import React from 'react';
import {Navigate} from "react-router-dom";

async function logoutUser(){
    console.log("Logged out");
}

const LogoutForm = () => {
    logoutUser();
    localStorage.clear();
    return (
        <div><Navigate to="/login"/></div>
    )
};

export default LogoutForm;