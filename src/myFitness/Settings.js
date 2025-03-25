import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../pages/Navbar';

const SettingsPage = () => {
    const userId = localStorage.getItem('id'); // Make sure to store this at login
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Fetch user details on load
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/user/${userId}`);
                const user = res.data;
                setFirstName(user.first_name);
                setLastName(user.last_name);
                setEmail(user.email);
            } catch (err) {
                console.error(err);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    const handleSave = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/user/update/${userId}`, {
                first_name: firstName,
                last_name: lastName,
                email: email,
            });

            setMessage(response.data.message);
        } catch (err) {
            console.error(err);
            setMessage('Failed to update settings.');
        }
    };

    return (
        <>
            <Navbar />
            <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
                <h2>Account Settings</h2>

                <div style={{ marginBottom: '20px' }}>
                    <label>First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <button
                    onClick={handleSave}
                    style={{ padding: '10px 20px', backgroundColor: '#93ACED', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                    Save Changes
                </button>

                {message && <p style={{ marginTop: '15px' }}>{message}</p>}
            </div>
        </>
    );
};

export default SettingsPage;
