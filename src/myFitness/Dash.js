// src/Dash.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Dash.css';

function Dash() {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                {/* Main content goes here */}
                <Routes>
                    {/* Define your routes here */}
                    {/* <Route path="/about" element={<About />} /> */}
                </Routes>
            </div>
        </div>
    );
}

export default Dash;