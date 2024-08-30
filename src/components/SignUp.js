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
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = { first_name: firstName, last_name: lastName, email, password, user_type: userType };

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
                            <label>First Name:</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>User Type:</label>
                            <select
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option value="User">User</option>
                                <option value="Trainer">Trainer</option>
                            </select>
                        </div>
                        <button type="submit">Signup</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </>
    );
};

export default Signup;
