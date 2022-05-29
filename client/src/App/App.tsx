import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import './App.css';
import Footer from "../components/Footer/Footer";
import {Routes, Route} from "react-router-dom";
import Register from "../pages/RegisterUser/Register";
import Login from "../pages/LoginUser/Login";

function App() {
    return (
        <div className="App">
            <Navbar/>
                <Routes>
                    <Route path="register" element={<Register/>}/>
                    <Route path="login" element={<Login/>}/>

                </Routes>
            <Footer/>
        </div>
    );
}

export default App;
