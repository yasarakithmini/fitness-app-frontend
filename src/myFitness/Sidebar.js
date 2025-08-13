// src/Sidebar.js
import React from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();

    return (
        <div className="sidebar">
            <ul>
                <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className={location.pathname === '/workout_plans' ? 'active' : ''}>
                    <Link to="/workout_plans">Workout Plans</Link>
                </li>
                <li className={location.pathname === '/schedule-meetings' ? 'active' : ''}>
                    <Link to="/schedule-meetings">Schedule Meetings</Link>
                </li>
                <li className={location.pathname === '/activity-log' ? 'active' : ''}>
                    <Link to="/activity-log">Activity Log</Link>
                </li>
                <li className={location.pathname === '/contact-us' ? 'active' : ''}>
                    <Link to="/contact-us">Contact Us</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
