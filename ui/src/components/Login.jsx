import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  // Declare state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            const { token, role } = response.data;

            console.log("🔑 Token received:", token);

            localStorage.setItem('token', token);   // <== This saves token in localStorage
            localStorage.setItem('role', role);

            alert('Login successful ✅');
            // redirect or other logic here
        } catch (err) {
            alert(err.response?.data?.error || 'Login failed ❌');
        }
    };

    return (
    <form onSubmit={handleSubmit}>
        <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        required 
        />
        <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        required 
        />
        <button type="submit">Login</button>

        {/* Temporary for localStorage check */}
        <button 
        type="button" 
        onClick={() => {
            localStorage.setItem('token', 'test123');
            alert('Set test token');
        }}
        >
        Set Test Token
        </button>
    </form>
);

};

export default Login;
