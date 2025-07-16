import React, { useState } from 'react';
import { login } from '../services/api';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await login(form);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        // console.log('Login Response:', res.data)    // added this line to see token in browser console
        alert(`✅ Login successful! Role: ${res.data.role}`);
        } catch (err) {
        alert(err.response?.data?.error || '❌ Login failed');
        }
    };

    return (
        <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
        </div>
    );
};

export default Login;
