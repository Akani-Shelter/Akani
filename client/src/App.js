import './App.css';
import {Route} from "react-router-dom"
import login from "./Pages/Login/login"
import Register from "./Pages/Register/register"
import UpdatePassword from "./Pages/UpdatePassword/updatePassword"
import UpdateProfile from "./Pages/UpdateProfile/updateProfile"
import Home from "./Pages/Home/Home"
import Profile from "./Pages/Profile/Profile"
import Notification from "./Pages/Notification/Notification"
import {BrowserRouter as Router , Switch} from "react-router-dom";
import { AuthProvider } from "./Auth/Auth"
import LandingPage from "./Pages/LandingPage/LandingPage"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React,{ useEffect } from 'react';

function App() {
    useEffect(async ()=>{
        window.twttr = await (function(d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0],
                t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            t.ready = function(f) {
                t._e.push(f)
            };

            return t;
        }(document, "script", "twitter-wjs"))
    },[])

    return (
        <AuthProvider>
            <Switch>
                <section className="header">
                     <Route exact path="/" component={LandingPage}></Route>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={login}/>
                    <Route exact path="/updatePassword" component={UpdatePassword}/>
                    <Route exact path="/updateProfile" component={UpdateProfile}/>
                    <Route exact path="/Profile" component={Profile}/>
                    <Route exact path="/Notification" component={Notification}/>
                </section>
            </Switch>
        </AuthProvider>
    );
}

export default App;
