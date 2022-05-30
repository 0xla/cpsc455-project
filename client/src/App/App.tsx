import React from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css';

import SignIn from "../pages/SignIn";
import Homepage from "../pages/Homepage";
import Signup from "../pages/Signup";

function App() {
    return (
        <div className="App">

            <Routes>
                <Route path="/" element={<Signup/>}/>
                <Route path="signIn" element={<SignIn/>}/>
                <Route path="/homepage" element={<Homepage/>}/>
            </Routes>

        </div>
    );
}

export default App;
