import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get userId from location state
    const userId = location.state?.userId;

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});

    if (!userId) {
        // If no userId, redirect to login (or show message)
        navigate('/login');
        return null;
    }

    const validate = () => {
        const errs = {};
        if (!currentPassword) errs.currentPassword = 'Current password is required';
        if (!newPassword) errs.newPassword = 'New password is required';
        if (newPassword && newPassword.length < 6)
        errs.newPassword = 'New password must be at least 6 characters';
        if (newPassword !== confirmPassword)
        errs.confirmPassword = 'Passwords do not match';

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/change-password`, {
            userId,
            currentPassword,
            newPassword,
        });

        toast.success('Password changed successfully. Please login again.');

        setTimeout(() => {
            navigate('/login');
        }, 2000);
        } catch (error) {
        const msg =
            error.response?.data?.error || 'Failed to change password. Please try again.';
        toast.error(msg);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <ToastContainer position="top-right" />
        <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
            <h2 className="mb-4 text-center">Change Password</h2>
            <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">
                Current Password
                </label>
                <input
                id="currentPassword"
                type="password"
                className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                />
                {errors.currentPassword && (
                <div className="invalid-feedback">{errors.currentPassword}</div>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                New Password
                </label>
                <input
                id="newPassword"
                type="password"
                className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                />
                {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                Confirm New Password
                </label>
                <input
                id="confirmPassword"
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
                )}
            </div>

            <button type="submit" className="btn btn-primary w-100">
                Change Password
            </button>
            </form>
        </div>
        </div>
    );
};

export default ChangePassword;
