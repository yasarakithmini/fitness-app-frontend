import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Navbar from "../pages/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Adjust path as necessary

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Access login function from context

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = { email, password };

        try {
            const response = await axios.post('http://localhost:5000/login', user);
            setMessage(response.data.message);

            if (response.data.message === 'User logged in successfully!') {
                const userType = response.data.user_type;
                const userId = response.data.id;
                const firstName = response.data.first_name;
                const lastName = response.data.last_name;


                // Save both ID and user_type

                login(userId, userType,firstName, lastName);

                console.log("Logged in as:", userType); // Optional log to confirm

                if (userType === 'Trainer') {
                    navigate('/trainer-dashboard');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Error logging in');
            }
        }
    };


    return (
        <>
            <Navbar />
            <div className="login-container">
                <div className="login-box">
                    <div className="signup-link">
                        <p>
                            New here? <Link to="/signup">Sign up</Link>
                        </p>
                    </div>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </>
    );
};

export default Login;
