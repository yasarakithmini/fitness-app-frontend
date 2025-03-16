import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to track the current route
import './TrainerSidebar.css'; // Make sure to update the CSS file

function TrainerSidebar() {
    const location = useLocation(); // This will give you the current route
    const [activeTab, setActiveTab] = useState('');

    // Set the active tab based on the current location (page route)
    useEffect(() => {
        setActiveTab(location.pathname);
    }, [location]);

    return (
        <div className="sidebar">
            <ul>
                <li className={activeTab === '/trainer-dashboard' ? 'active' : ''}>
                    <Link to="/trainer-dashboard">Dashboard</Link>
                </li>
                <li className={activeTab === '/meeting-requests' ? 'active' : ''}>
                    <Link to="/meeting-requests">Meeting Requests</Link>
                </li>
            </ul>
        </div>
    );
}

export default TrainerSidebar;
