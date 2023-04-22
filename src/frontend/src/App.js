import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import ChatBot from "./pages/ChatBot";
import PrivateRoute from './components/PrivateRoute';

function App() {
 
    return (
        <>
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PrivateRoute/>}>
                        <Route path="/" element={<ChatBot />} />
                        <Route path="*" element={<ChatBot />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
        </>
    );
}

export default App;