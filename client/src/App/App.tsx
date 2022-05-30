import React from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css';
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Homepage from "../pages/Homepage";

function App() {
    return (
        <div className="App">

            <Routes>
                <Route path="/" element={<SignUp/>}/>
                <Route path="signIn" element={<SignIn/>}/>
                <Route path="/homepage" element={<Homepage/>}/>
            </Routes>

        </div>
    );
}

export default App;
