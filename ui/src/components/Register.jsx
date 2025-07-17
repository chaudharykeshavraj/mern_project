import React, { useState } from 'react';
import API, { register } from '../services/api';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await register(form);
        alert('✅ Registration successful!');
        } catch (err) {
        alert(err.response?.data?.error || '❌ Registration failed');
        }
    };

    return (
        <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <select name="role" onChange={handleChange}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Librarian</option>
            </select>
            <button type="submit">Register</button>
        </form>
        </div>
    );
};

export default Register;
