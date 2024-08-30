// src/Sidebar.js
import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';


function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li>Workout Plans</li>
                <li><Link to="/schedule-meetings">Schedule Meetings</Link></li>
                <li>Activity Log</li>
                <li><Link to="/contact-us">Contact Us</Link></li>

            </ul>
        </div>
    );
}

export default Sidebar;