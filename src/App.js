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
import WorkoutPlans from './myFitness/WorkoutPlans';
import ContactUs from "./myFitness/ContactUs";
import Settings from "./myFitness/Settings";
import TrainerDashboard from "./myTrainer/TrainerDash";
import MeetingRequests from "./myTrainer/MeetingRequests"
import Sidebar from "./myFitness/Sidebar";
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import { AuthProvider } from './components/AuthContext';
import ActivityLog from "./myFitness/FitnessMetrics";
import TrainerSettings from "./myTrainer/TrainerSettings";


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
                <Route path="/dashboard/*" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/workout_plans" element={<ProtectedRoute element={<WorkoutPlans />} />} />
                <Route path="/schedule-meetings" element={<ProtectedRoute element={<ScheduleMeetings />} />} />
                <Route path="/activity-log" element={<ProtectedRoute element={<ActivityLog />} />} />
                <Route path="/contact-us" element={<ProtectedRoute element={<ContactUs />} />} />
                <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
                <Route path="/trainer-dashboard" element={<ProtectedRoute element={<TrainerDashboard />} />} />
                <Route path="/meeting-requests" element={<ProtectedRoute element={<MeetingRequests />} />} />
                <Route path="/profile" element={<ProtectedRoute element={<Settings />} />} />
                <Route path="/trainer-settings" element={<ProtectedRoute element={<TrainerSettings />} />} />



            </Routes>
            {(location.pathname === "/" || location.pathname === "/about" || location.pathname === "/services" || location.pathname === "/signup" || location.pathname === "/login") && <Footer />}
            {(location.pathname !== "/" && location.pathname !== "/about" && location.pathname !== "/services" && location.pathname !== "/signup" && location.pathname !== "/login" && location.pathname !== "/trainer-dashboard" && location.pathname !== "/meeting-requests" && location.pathname !== "/trainer-settings") && <Sidebar />}
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Router>
    );
}
