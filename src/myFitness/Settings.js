import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';
import UserSidebar from '../myFitness/Sidebar';
import TrainerSidebar from '../myTrainer/TrainerSidebar';

function Settings() {
    const userId = localStorage.getItem('id');

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        old_password: '',
        new_password: '',
        confirm_password: '',
    });

    const [userType, setUserType] = useState(null); // Not from localStorage
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch user info including user_type
        axios.get(`http://localhost:5000/user/${userId}`)
            .then(res => {
                const { first_name, last_name, email, user_type } = res.data;
                setFormData(prev => ({ ...prev, first_name, last_name, email }));
                setUserType(user_type);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching user info", err);
                setLoading(false);
            });
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await axios.post(`http://localhost:5000/api/user/update/${userId}`, {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email
            });
            setMessage(response.data.message);
        } catch (err) {
            console.error("Error updating profile", err);
            setMessage("Failed to update profile. Please try again.");
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (formData.new_password !== formData.confirm_password) {
            setMessage("New passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/user/change-password/${userId}`, {
                old_password: formData.old_password,
                new_password: formData.new_password
            });
            setMessage(response.data.message);
        } catch (err) {
            console.error("Error changing password", err);
            setMessage("Failed to change password. Please try again.");
        }
    };

    // 🔁 Don't render until data is ready
    if (loading || !userType) return <p>Loading settings...</p>;

    return (
        <div className="settings-page">
            {userType === 'Trainer' ? <TrainerSidebar /> : <UserSidebar />}

            <div className="settings-container">
                <h2>Account Settings</h2>

                <form onSubmit={handleProfileSubmit} className="settings-form">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />

                    <label>Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Save Changes</button>
                </form>

                <hr />
                <h3>Change Password</h3>

                <form onSubmit={handlePasswordSubmit} className="settings-form">
                    <label>Old Password</label>
                    <input
                        type="password"
                        name="old_password"
                        value={formData.old_password}
                        onChange={handleChange}
                    />

                    <label>New Password</label>
                    <input
                        type="password"
                        name="new_password"
                        value={formData.new_password}
                        onChange={handleChange}
                    />

                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                    />

                    <button type="submit">Change Password</button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}

export default Settings;
