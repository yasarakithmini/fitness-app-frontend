import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ScheduleMeetings.css'; // Optional: Create this CSS file for styling
import Sidebar from './Sidebar';


function ScheduleMeetings() {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the list of trainers from the backend when the component mounts
        const fetchTrainers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/trainers');
                setTrainers(response.data);
            } catch (error) {
                setError("Error fetching trainers. Please try again.");
                console.error("There was an error fetching the trainers!", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainers();
    }, []);

    if (loading) return <div>Loading trainers...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="schedule-meetings">
            <Sidebar />
            <h2>Schedule Meetings with Trainers</h2>

            <div className="trainers-list">
                {trainers.map(trainer => (
                    <div key={trainer.id} className="trainer-item">
                        <span>{trainer.name}</span>
                        <button onClick={() => handleScheduleMeeting(trainer.id)}>Schedule a Meeting</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Function to handle the scheduling of a meeting (implement as needed)
const handleScheduleMeeting = (trainerId) => {
    console.log(`Schedule a meeting with trainer ID: ${trainerId}`);
    // Implement the logic for scheduling a meeting (e.g., open a modal, redirect to another page, etc.)
};

export default ScheduleMeetings;
