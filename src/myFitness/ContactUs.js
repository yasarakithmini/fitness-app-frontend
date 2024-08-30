// src/ContactUs.js
import React, { useState } from 'react';
import axios from 'axios';
import './ContactUs.css'; // Optional: Create this CSS file for styling
import Sidebar from "./Sidebar";

function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('Sending...');

        try {
            const response = await axios.post('http://localhost:5000/api/contact', { name, email, message });
            if (response.status === 200) {
                setStatus('Message sent successfully!');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setStatus('Error sending message. Please try again.');
            }
        } catch (error) {
            setStatus('Error sending message. Please try again.');
            console.error('There was an error sending the message!', error);
        }
    };

    return (
        <div className="contact-us">
            <Sidebar/>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}

export default ContactUs;
