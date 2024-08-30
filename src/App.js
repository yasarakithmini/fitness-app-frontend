import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Footer from './pages/Footer';
import Navbar from "./pages/Navbar";
import Home from './pages/Main Home';
import About from './pages/About';
import Services from './pages/Services';
import Dashboard from './myFitness/Dash';
import ScheduleMeetings from './myFitness/ScheduleMeetings';
import ContactUs from "./myFitness/ContactUs";

function App() {
    const location = useLocation();

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/schedule-meetings" element={<ScheduleMeetings />} />
                <Route path="/contact-us" element={<ContactUs />} />


            </Routes>
            {/* Render Footer only if the current path is not /dashboard */}
            {(location.pathname === "/about" || location.pathname === "/services" || location.pathname === "/" || location.pathname === "signup" || location.pathname === "login") && <Footer />}

        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
