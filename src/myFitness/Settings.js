import React, { useState } from 'react';
import './Settings.css';


export default function Settings() {
    const [profilePic, setProfilePic] = useState(null);
    const [userInfo, setUserInfo] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
    });
    const [form, setForm] = useState({ ...userInfo });
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file));
        }
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setUserInfo({ ...form });
        alert('Profile updated!');
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        alert('Password changed!');
        // Reset fields after success
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Account Settings</h2>

            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-8">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mb-4">
                    {profilePic ? (
                        <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                            No Image
                        </div>
                    )}
                </div>
                <input type="file" onChange={handleImageChange} className="mb-2" />
            </div>

            {/* User Info Update Form */}
            <form onSubmit={handleUpdateProfile} className="mb-10">
                <h3 className="text-xl font-semibold mb-4">Update User Info</h3>
                <div className="mb-4">
                    <label className="block mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Update Info
                </button>
            </form>

            {/* Change Password Section */}
            <form onSubmit={handleChangePassword}>
                <h3 className="text-xl font-semibold mb-4">Change Password</h3>
                <div className="mb-4">
                    <label className="block mb-1">Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={passwords.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                    Change Password
                </button>
            </form>
        </div>
    );
}
