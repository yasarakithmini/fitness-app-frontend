// src/TrainerSidebar.js
import React from 'react';
import './..';
import { Link } from 'react-router-dom';

function TrainerSidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/trainer-dashboard">Dashboard</Link></li>
                <li><Link to="/meeting-requests">Meeting Requests</Link></li>
            </ul>
        </div>
    );
}

export default TrainerSidebar;
