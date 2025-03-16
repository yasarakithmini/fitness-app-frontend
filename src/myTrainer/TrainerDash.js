import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import TrainerSidebar from './TrainerSidebar';
import './TrainerDash.css';
import axios from 'axios';

function TrainerDash() {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const trainerId = localStorage.getItem('id');

    useEffect(() => {
        // Fetch meeting requests for the trainer
        axios.get(`http://localhost:5000/api/meeting-requests/${trainerId}`)
            .then(response => {
                setMeetings(response.data.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the meeting requests!", error);
                setLoading(false);
            });
    }, [trainerId]);

    return (
        <div className="dashboard">
            <TrainerSidebar />
            <div className="main-content">
                <h1>Upcoming Meetings</h1>
                <div className="meetings-container">
                    {loading ? (
                        <p>Loading meetings...</p>
                    ) : meetings.length > 0 ? (
                        <ul>
                            {meetings.map(meeting => (
                                <li key={meeting.id}>
                                    <p><strong>Date:</strong> {new Date(meeting.date_time).toLocaleString()}</p>
                                    <p><strong>User ID:</strong> {meeting.user_id}</p>
                                    <p><strong>Status:</strong> {meeting.status}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No upcoming meetings to display.</p>
                    )}
                </div>

                <Routes>
                    {/* Define your trainer-specific routes here */}
                </Routes>
            </div>
        </div>
    );
}

export default TrainerDash;
