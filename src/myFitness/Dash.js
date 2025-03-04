import React, { useState, useEffect } from 'react';
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
    const userId = localStorage.getItem('id');
    const [fitnessData, setFitnessData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            console.log(`Fetching data from: /api/fitness/latest/${userId}`); // Log the API URL to check userId
            try {
                const response = await fetch(`http://localhost:5000/fitness/latest/${userId}`);
                if (!response.ok) {
                    throw new Error(`API error: ${response.statusText}`);
                }
                const data = await response.json();
                console.log("Fetched data:", data); // Log the data to check its structure
                setFitnessData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data from the server');
            }
        };
        fetchData();
    }, [userId]);

    const chartData = fitnessData ? {
        labels: ['Previous Record', 'Most Recent Record'],
        datasets: [
            {
                label: 'BMI Comparison',
                data: [fitnessData.record_2?.bmi || 'N/A', fitnessData.record_1?.bmi || 'N/A'],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
            {
                label: 'Waist-to-Hip Ratio Comparison',
                data: [fitnessData.record_2?.whr || 'N/A', fitnessData.record_1?.whr || 'N/A'],
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
                {error && <p className="error-message">{error}</p>}
                {fitnessData ? (
                    <div className="fitness-data">
                        <h3>Recent Fitness Records</h3>
                        <div className="record">
                            <h4>Most Recent Record</h4>
                            <p><strong>BMI:</strong> {fitnessData.record_1?.bmi || 'N/A'}</p>
                            <p><strong>Waist-to-Hip Ratio:</strong> {fitnessData.record_1?.whr || 'N/A'}</p>
                            <p><strong>Date:</strong> {fitnessData.record_1?.record_date || 'N/A'}</p>
                        </div>
                        <div className="record">
                            <h4>Previous Record</h4>
                            <p><strong>BMI:</strong> {fitnessData.record_2?.bmi || 'N/A'}</p>
                            <p><strong>Waist-to-Hip Ratio:</strong> {fitnessData.record_2?.whr || 'N/A'}</p>
                            <p><strong>Date:</strong> {fitnessData.record_2?.record_date || 'N/A'}</p>
                        </div>
                        <div className="fitness-chart">
                            <h3>Comparison of Recent Fitness Records</h3>
                            <Line data={chartData} />
                        </div>
                    </div>
                ) : (
                    <p>Loading fitness data...</p>
                )}
            </div>
        </div>
    );
}

export default Dash;
