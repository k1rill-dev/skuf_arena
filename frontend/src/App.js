import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import LoginForm from "./components/Forms/LoginForm";
import RegistrationForm from "./components/Forms/RegistrationForm";
import LogoutForm from "./components/Forms/LogoutForm";
import MainPage from "./components/Pages/MainPage";


function App() {
    const isAuthorized = true;
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={(
                    <div>
                        <Header isAuthorized={isAuthorized}></Header>
                        {/*<div className="mt-4"></div>*/}
                        <MainPage></MainPage>
                    </div>
                )}>
                </Route>
                <Route path="/logout" element={(
                    <div>
                        <LogoutForm></LogoutForm>
                    </div>
                )}>
                </Route>
                <Route path="/register" element={(
                    <div>
                        <RegistrationForm></RegistrationForm>
                    </div>
                )}>
                </Route>
                <Route path="/login" element={(
                    <div>
                        <LoginForm></LoginForm>
                    </div>
                )}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
