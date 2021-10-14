import React, { useState, useEffect }  from "react";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import "bootstrap/dist/css/bootstrap.css";
import "../../assets/styles/tailwind.css";

function Home(){
    let [logged, setLogged] = useState(false)
    let user = localStorage.getItem("emailSession")

    useEffect(()=>{
        user ? setLogged(true) : setLogged(false)
    },[user])

    return (
        <React.Fragment>
            <Sidebar />
        </React.Fragment>
    );
}

export default Home;