// src/Sidebar.js
import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';


function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/workout_plans">WorkoutPlans</Link></li>
                <li><Link to="/schedule-meetings">Schedule Meetings</Link></li>
                <li><Link to="/activity-log">Activity Log</Link></li>
                <li><Link to="/contact-us">Contact Us</Link></li>

            </ul>
        </div>
    );
}

export default Sidebar;