import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './Dash.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Dash() {
    const userId = localStorage.getItem('id');
    const [fitnessData, setFitnessData] = useState(null);
    const [meetings, setMeetings] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFitnessData = async () => {
            try {
                console.log(`Fetching fitness data from: /api/fitness/latest/${userId}`);
                const response = await fetch(`http://localhost:5000/fitness/latest/${userId}`);
                if (!response.ok) throw new Error(`API error: ${response.statusText}`);
                const data = await response.json();
                console.log("Fetched fitness data:", data);
                setFitnessData(data);
            } catch (error) {
                console.error('Error fetching fitness data:', error);
            }
        };
        fetchFitnessData();
    }, [userId]);

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                console.log(`Fetching accepted meetings from: /api/user-accepted-meetings/${userId}`);
                const response = await axios.get(`http://localhost:5000/api/user-accepted-meetings/${userId}`);
                console.log("Received meetings data:", response.data);
                setMeetings(response.data.data || []);
            } catch (error) {
                console.error('Error fetching meetings:', error);
            }
        };
        fetchMeetings();
    }, [userId]);

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                {error && <p className="error-message">{error}</p>}

                {/* Fitness Data Section */}
                {fitnessData && fitnessData.length > 0 ? (
                    <div className="fitness-data">
                        <h3>Recent Fitness Records</h3>

                        {/* Fitness Records Row */}
                        <div className="fitness-records-row">
                            <div className="record">
                                <h4>Most Recent Record</h4>
                                <p><strong>BMI:</strong> {fitnessData[0]?.bmi || 'N/A'}</p>
                                <p><strong>Waist-to-Hip Ratio:</strong> {fitnessData[0]?.whr || 'N/A'}</p>
                                <p><strong>Date:</strong> {fitnessData[0]?.record_date || 'N/A'}</p>
                            </div>
                            <div className="record">
                                <h4>Previous Record</h4>
                                <p><strong>BMI:</strong> {fitnessData[1]?.bmi || 'N/A'}</p>
                                <p><strong>Waist-to-Hip Ratio:</strong> {fitnessData[1]?.whr || 'N/A'}</p>
                                <p><strong>Date:</strong> {fitnessData[1]?.record_date || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="fitness-chart">
                            <h3>Comparison of Recent Fitness Records</h3>
                            <Line
                                data={{
                                    labels: ['Previous Record', 'Most Recent Record'],
                                    datasets: [
                                        {
                                            label: 'BMI Comparison',
                                            data: [fitnessData[1]?.bmi || 0, fitnessData[0]?.bmi || 0],
                                            borderColor: 'rgba(75,192,192,1)',
                                            backgroundColor: 'rgba(75,192,192,0.2)',
                                            fill: true,
                                        },
                                        {
                                            label: 'Waist-to-Hip Ratio Comparison',
                                            data: [fitnessData[1]?.whr || 0, fitnessData[0]?.whr || 0],
                                            borderColor: 'rgba(153,102,255,1)',
                                            backgroundColor: 'rgba(153,102,255,0.2)',
                                            fill: true,
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <p>No fitness records available. Please add some records to see your progress here.</p>
                )}

                {/* Accepted Meetings Section */}
                <div className="meetings-container">
                    <h3>My Accepted Meetings</h3>
                    {meetings.length > 0 ? (
                        <ul className="meeting-list">
                            {meetings.map(meeting => (
                                <li key={meeting.id} className="meeting-item">
                                    <p><strong>Date -</strong> {new Date(meeting.date_time).toLocaleString()}</p>
                                    <p><strong>Trainer ID -</strong> {meeting.trainer_id}</p>
                                    <p><strong>Status -</strong> <span className="status accepted">{meeting.status}</span></p>
                                    <div>
                                            <p><strong>Link -</strong> {meeting.meeting_link}</p>
                                            <a href={meeting.meeting_link} target="_blank" rel="noopener noreferrer">
                                                <button>Join Meeting</button>
                                            </a>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No accepted meetings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dash;
