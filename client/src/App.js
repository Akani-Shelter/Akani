import './App.css';
import {Route} from "react-router-dom"
import login from "./Pages/Login/login"
import Register from "./Pages/Register/register"
import UpdatePassword from "./Pages/UpdatePassword/updatePassword"
import UpdateProfile from "./Pages/UpdateProfile/updateProfile"
import Home from "./Pages/Home/Home"
import Profile from "./Pages/Profile/Profile"
import Notification from "./Pages/Notification/Notification";
import jobListings from "./Pages/JobListings/job-listings";
import jobApplicants from "./Pages/JobApplicants/job-applicants";
import {BrowserRouter as Router , Switch} from "react-router-dom";
import { AuthProvider } from "./Auth/Auth"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React,{ useEffect } from 'react';

function App() {
    return (
        <AuthProvider>
            <Switch>
                <section className="header">
                     <Route exact path="/" component={login}></Route>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={login}/>
                    <Route exact path="/updatePassword" component={UpdatePassword}/>
                    <Route exact path="/updateProfile" component={UpdateProfile}/>
                    <Route exact path="/Profile" component={Profile}/>
                    <Route exact path="/Notification" component={Notification}/>
                    <Route exact path="/job-listings" component={jobListings}/>
                    <Route exact path="/job-applicants" component={jobApplicants}/>
                </section>
            </Switch>
        </AuthProvider>
    );
}

export default App;
