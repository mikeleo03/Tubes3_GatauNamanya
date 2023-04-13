import './App.css';
import { browserRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import ChatBot from "./pages/ChatBot";

function App() {
    return (
        <>
        <div className="container">
                <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ChatBot />} />
                    <Route path="*" element={<ChatBot />} />
                </Routes>
            </BrowserRouter>
        </div>
        </>
    );
}

export default App;