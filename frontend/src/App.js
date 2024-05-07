import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import LoginForm from "./components/Forms/LoginForm";
import RegistrationForm from "./components/Forms/RegistrationForm";
import LogoutForm from "./components/Forms/LogoutForm";
import MainPage from "./components/Pages/MainPage";
import Footer from "./components/Footer/Footer";
import Concerts from "./components/Pages/Concerts";
import Concert from "./components/Pages/Concert";
import Profile from "./components/Pages/Profile";
import EditProfileForm from "./components/Forms/EditProfileForm";
import Ticket from "./components/Pages/Ticket";


function App() {
    let email = ''
    const authCheck = () => {
        try {
            if (JSON.parse(localStorage.userInfo).Success === "Login successfully")
                return [true, JSON.parse(localStorage.userInfo)];
        } catch (e) {
            return [false, null];
        }
        return [false, null];
    }
    const [isAuthorized, user] = authCheck();
    if (user !== null){
        email = user.email
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={(
                    <div>
                        <Header isAuthorized={isAuthorized} email={email}></Header>
                        {/*<div className="mt-4"></div>*/}
                        <MainPage></MainPage>
                        <Footer></Footer>
                    </div>
                )}>
                </Route>
                <Route path="/concerts" element={(
                    <div>
                        <Header isAuthorized={isAuthorized} email={email}></Header>
                        <div className="mt-4"></div>
                        <Concerts/>
                        <Footer></Footer>
                    </div>
                )}></Route>
                <Route path="/concert">
                    <Route path=":id" element={(
                        <div>
                            <Header isAuthorized={isAuthorized} email={email}></Header>
                            <div className="mt-4"></div>
                            <Concert></Concert>
                            <Footer></Footer>
                        </div>
                    )}>
                    </Route>
                </Route>
                <Route path="/ticket">
                    <Route path=":id" element={(
                        <div>
                            <Header isAuthorized={isAuthorized} email={email}></Header>
                            <div className="mt-4"></div>
                            <Ticket user={user}></Ticket>
                            <div className="mb-4"></div>
                            <Footer></Footer>
                        </div>
                    )}>
                    </Route>
                </Route>
                <Route path="/profile" element={(
                    <div>
                        <Header isAuthorized={isAuthorized} email={email}></Header>
                        <div className="mt-4"></div>
                        <Profile userInfo={user}/>
                        <Footer></Footer>
                    </div>
                )}></Route>
                <Route path="/edit-profile" element={(
                    <div>
                        <Header isAuthorized={isAuthorized} email={email}></Header>
                        <div className="mt-4"></div>
                        <EditProfileForm user={user}/>
                        <div className="mt-28"></div>
                        <Footer></Footer>
                    </div>
                )}></Route>
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
