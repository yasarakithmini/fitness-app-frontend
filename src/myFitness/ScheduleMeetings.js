import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ScheduleMeetings.css'; // Optional: Create this CSS file for styling
import TrainerCalendar from './TrainerCalendar';

function ScheduleMeetings() {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const userId = localStorage.getItem('id');

    useEffect(() => {
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

    const handleSelectSlot = async (trainerId, dateTime) => {
        try {
            // Retrieve the user ID from local storage
            const userId = localStorage.getItem('id');
            // Create the data object
            const data = {
                date_time: dateTime.toISOString(),
                trainer_id: trainerId,
                user_id: userId,
            };

            // Log the data to the console
            console.log("Data being sent to the backend:", data);

            // Send the POST request
            const response = await axios.post('http://localhost:5000/api/schedule-meeting', data);
            console.log('Backend Response:', response.data);

            alert('Meeting request sent!');
        } catch (error) {
            console.error('There was an error scheduling the meeting!', error);
            alert('Error sending meeting request.');
        }
    };

    const toggleCalendar = (trainerId) => {
        // Toggle the selected trainer's calendar visibility
        setSelectedTrainer((prevTrainer) => (prevTrainer === trainerId ? null : trainerId));
    };

    if (loading) return <div>Loading trainers...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="schedule-meetings">
            <h2>Schedule Meetings with Trainers</h2>
            <div className="trainers-list">
                {trainers.map(trainer => (
                    <div key={trainer.id} className="trainer-item">
                        <span>{trainer.name}</span>
                        <span style={{ margin: '0 10px', fontSize: '2.8rem' }}>👤</span>
                        <button onClick={() => toggleCalendar(trainer.id)}>
                            {selectedTrainer === trainer.id ? 'Hide Calendar' : 'View Calendar'}
                        </button>
                        {selectedTrainer === trainer.id && (
                            <TrainerCalendar trainerId={trainer.id} onSelectSlot={handleSelectSlot} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ScheduleMeetings;
