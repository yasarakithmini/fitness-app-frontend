import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ActivityLog.css';

const ActivityLog = () => {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBMI] = useState('');
    const [comparison, setComparison] = useState(null);
    const userId = localStorage.getItem('id');
    const [message, setMessage] = useState('');

    // Log when the component renders
    console.log("ActivityLog component rendering...");

    // Log current state values
    useEffect(() => {
        console.log("Current State Values:");
        console.log("Age:", age);
        console.log("Gender:", gender);
        console.log("Height:", height);
        console.log("Weight:", weight);
        console.log("BMI:", bmi);
    }, [age, gender, height, weight, bmi]);

    // Calculate BMI whenever height or weight changes
    useEffect(() => {
        if (height && weight) {
            const heightInMeters = height / 100;
            const calculatedBMI = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBMI(calculatedBMI);
        } else {
            setBMI('');
        }
    }, [height, weight]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            user_id: userId,
            age,
            gender,
            height,
            weight,
            bmi, // Include BMI in the payload
        };
        console.log("Data to be sent for saving:", payload);

        try {
            const response = await axios.post('http://localhost:5000/api/bmi/save', payload);
            console.log("Response from save API:", response.data);
            setMessage(response.data.message);
        } catch (error) {
            console.error("Error saving record:", error);
            setMessage('Error saving record: ' + error.message);
        }
    };

    // Handle BMI comparison
    const handleCompare = async () => {
        console.log("Fetching comparison data for user ID:", userId);

        try {
            const response = await axios.get(`http://localhost:5000/api/bmi/compare`, {
                params: {
                    user_id: userId
                }
            });
            console.log("Response from compare API:", response.data);
            setComparison({
                lastMonthBMI: response.data.last_month_bmi,
                thisMonthBMI: response.data.this_month_bmi,
            });
        } catch (error) {
            console.error("Error fetching comparison data:", error);
            setComparison(null);
            setMessage('Error fetching comparison data: ' + error.message);
        }
    };

    return (
        <div className="bmi-container">
            <h2>BMI Tracker</h2>
            <form onSubmit={handleSubmit} className="bmi-form">
                <div className="form-group">
                    <label>Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Height (in cm)</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Weight (in kg)</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>BMI</label>
                    <input
                        type="text"
                        value={bmi}
                        readOnly
                        placeholder="BMI will be calculated automatically"
                    />
                </div>

                <button type="submit" className="submit-btn">Save Record</button>
            </form>

            {message && <p className="message">{message}</p>}

            <div className="comparison-section">
                <button className="compare-btn" onClick={handleCompare}>
                    Compare with Last Month
                </button>
                {comparison && (
                    <div className="comparison-result">
                        <p>Last Month's BMI: {comparison.lastMonthBMI}</p>
                        <p>This Month's BMI: {comparison.thisMonthBMI}</p>
                        <p>BMI Change: {(comparison.thisMonthBMI - comparison.lastMonthBMI).toFixed(2)}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityLog;
