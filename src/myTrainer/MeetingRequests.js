import React, { useEffect, useState } from 'react';
import TrainerSidebar from './TrainerSidebar';
import './MeetingRequests.css'; // Updated CSS file
import axios from 'axios';

function MeetingRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const trainerId = localStorage.getItem('id');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/meeting-requests/${trainerId}`)
            .then(response => {
                setRequests(response.data.data || []);
                setLoading(false);
                console.log('Fetched requests:', response.data.data); // Check the fetched data
            })
            .catch(error => {
                console.error("Error fetching meeting requests", error);
                setLoading(false);
            });
    }, [trainerId]);

    const handleAction = (meetingId, action) => {
        axios.post(`http://localhost:5000/api/meeting-requests/${meetingId}/${action}`)
            .then(response => {
                // Refresh requests after action
                setRequests(prev => prev.map(req =>
                    req.id === meetingId ? { ...req, status: action === 'accept' ? 'Accepted' : 'Rejected' } : req
                ));
            })
            .catch(error => {
                console.error(`Error on ${action}`, error);
            });
    };

    return (
        <div className="dashboard">
            <TrainerSidebar />
            <div className="main-content">
                <h2>Meeting Requests</h2>
                <div className="meetings-container">
                    {loading ? (
                        <p>Loading requests...</p>
                    ) : requests.length > 0 ? (
                        <ul className="meeting-list">
                            {requests.map(req => (
                                <li key={req.id} className="meeting-item">
                                    <p><strong>Date:</strong> {new Date(req.date_time).toLocaleString()}</p>
                                    <p><strong>User ID:</strong> {req.user_id}</p>
                                    <p><strong>Status:</strong> {req.status}</p>
                                    {req.status === 'Pending' && (
                                        <div className="actions">
                                            <button className="accept" onClick={() => handleAction(req.id, 'accept')}>Accept</button>
                                            <button className="reject" onClick={() => handleAction(req.id, 'reject')}>Reject</button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No meeting requests at the moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MeetingRequests;
