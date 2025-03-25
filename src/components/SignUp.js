import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { Link } from "react-router-dom";
import Navbar from "../pages/Navbar";

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('User'); // Default to 'User'
    const [consent, setConsent] = useState(false); // Consent checkbox
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!consent) {
            setMessage('You must consent to data usage to continue.');
            return;
        }

        const user = {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            user_type: userType,
            consent_given: consent
        };

        try {
            const response = await axios.post('http://localhost:5000/signup', user);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error registering user');
        }
    };

    return (
        <>
            <Navbar />
            <div className="signup-container">
                <div className="signup-box">
                    <div className="signup-link">
                        <p>
                            New here? <Link to="/login">Login</Link>
                        </p>
                    </div>

                    <h2>Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>User Type</label>
                            <select
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option value="User">User</option>
                                <option value="Trainer">Trainer</option>
                            </select>
                        </div>

                        {/* Consent Section */}
                        <div className="consent-box">
                            <input
                                type="checkbox"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                id="consent"
                            />
                            <label htmlFor="consent" className="consent-label">
                                I consent to the collection and use of my personal data for personalized workout planning, trainer consultations, and other fitness-related features on FixFit. I understand that my data will be stored securely and not shared externally.
                            </label>
                        </div>

                        <button type="submit">Signup</button>
                    </form>
                    {message && <p className="message">{message}</p>}
                </div>
            </div>
        </>
    );
};

export default Signup;
