import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import ChatBot from "./pages/ChatBot";
import Login from './pages/Login';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
    const {isAuthenticated} = useAuth0(); 

    return (
        <>
        <div className="container">
            <BrowserRouter>
                <Routes>
                    {!isAuthenticated && <Route exact path="/" element={<Login/>}/>}
                    <Route path="/" element={<ChatBot />} />
                    <Route path="*" element={<ChatBot />} />
                </Routes>
            </BrowserRouter>
        </div>
        </>
    );
}

export default App;