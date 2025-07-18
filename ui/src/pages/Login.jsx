import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
            
            const { token, role } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            toast.success('Login successful');

            setTimeout(() => {
                if (role === 'admin' || role === 'teacher') {
                navigate('/dashboard');
                } else if (role === 'student') {
                    navigate('/students');
                } else {
                    navigate('/dashboard');
                }
            }, 1500);  // 1.5 seconds delay to show toast

            } catch (err) {
            toast.error(err.response?.data?.error || 'Login failed!');
            console.error(err.response?.data || err.message);;
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <ToastContainer position="top-right" />
        <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
            <h2 className="mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <div className="mt-3 text-center">
            <small>Don't have an account? <a href="/register">Register here</a></small>
            </div>
        </div>
        </div>
    );
};

export default Login;
