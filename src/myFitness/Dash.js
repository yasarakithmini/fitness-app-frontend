import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
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
    const userId = localStorage.getItem('id');  // Get user ID from localStorage
    const [fitnessData, setFitnessData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/fitness/last-two-records?user_id=${userId}`);

                // First, check if the response is not OK (e.g., 404 or 500)
                if (!response.ok) {
                    throw new Error(`API error: ${response.statusText}`);
                }

                // Try to parse JSON
                const text = await response.text(); // Read as text first
                try {
                    const data = JSON.parse(text); // Attempt to parse JSON
                    setFitnessData(data);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    setError('Received invalid JSON from API');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data from the server');
            }
        };

        fetchData();
    }, [userId]);


    // Prepare data for the chart
    const chartData = fitnessData ? {
        labels: ['Previous Record', 'Most Recent Record'],
        datasets: [
            {
                label: 'BMI Comparison',
                data: [fitnessData.record_2.bmi, fitnessData.record_1.bmi],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
            {
                label: 'Waist-to-Hip Ratio Comparison',
                data: [fitnessData.record_2.whr, fitnessData.record_1.whr],
                borderColor: 'rgba(153,102,255,1)',
                backgroundColor: 'rgba(153,102,255,0.2)',
                fill: true,
            },
        ],
    } : null;

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Routes>
                    {/* Define your routes here */}
                    {/* <Route path="/about" element={<About />} /> */}
                </Routes>

                <div className="fitness-chart">
                    {fitnessData ? (
                        <div>
                            <h3>Comparison of Recent Fitness Records</h3>
                            <Line data={chartData} />
                        </div>
                    ) : (
                        <p>Loading fitness data...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dash;
