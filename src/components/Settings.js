import React, { useState } from 'react';
import axios from 'axios';
import './Settings.css'; // Optional: Create this CSS file for styling

function SettingsPage() {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        // Validate passwords
        if (userInfo.newPassword !== userInfo.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Replace with the actual API endpoint for updating user settings
            const response = await axios.post('http://localhost:5000/api/update_settings', userInfo);
            setMessage(response.data.message);
        } catch (error) {
            setError('Error updating settings. Please try again.');
            console.error('Error updating settings', error);
        }
    };

    return (
        <div className="settings-page">
            <h2>Account Settings</h2>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={userInfo.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={userInfo.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password:</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={userInfo.currentPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={userInfo.newPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={userInfo.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Settings</button>
            </form>
        </div>
    );
}

export default SettingsPage;
