import React from 'react';
import {Navigate} from "react-router-dom";
import axios from "axios";
import getCookie from "../../tools/getCookie";

async function logoutUser() {
    try {
        // 👇️ const data: GetUsersResponse
        const {data, status} = await axios.get(
            'http://localhost:8000/api/auth/logout',
            {
                headers: {
                    Accept: 'application/json',
                },
                withCredentials: true
            },
        );

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        }
    }
}

const LogoutForm = () => {
    logoutUser();
    localStorage.clear();
    return (
        <div><Navigate to="/"/></div>
    )
};

export default LogoutForm;