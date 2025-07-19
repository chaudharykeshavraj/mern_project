import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [showPassword, setShowPassword] = useState(false);


    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });

    const navigate = useNavigate();

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return 'Email is required';
        if (!emailRegex.test(value)) return 'Invalid email format';
        return '';
    };

    const validatePassword = (value) => {
        if (!value.trim()) return 'Password is required';
        return '';
    };

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));

        if (field === 'email') setEmailError(validateEmail(email));
        if (field === 'password') setPasswordError(validatePassword(password));
    };

    const handleChange = (field, value) => {
        if (field === 'email') {
            setEmail(value);
            if (touched.email) setEmailError(validateEmail(value));
        }

        if (field === 'password') {
            setPassword(value);
            if (touched.password) setPasswordError(validatePassword(value));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const emailErr = validateEmail(email);
        const passwordErr = validatePassword(password);

        setEmailError(emailErr);
        setPasswordError(passwordErr);

        // Mark both as touched to trigger error display
        setTouched({ email: true, password: true });

        if (emailErr || passwordErr) return;

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
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
            }, 1000);

        } catch (err) {
            toast.error(err.response?.data?.error || 'Login failed!');
            // console.error(err.response?.data || err.message);
        }
    };

    {/* return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <ToastContainer position="top-right" />
            <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>

                

                <h2 className="mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            id="email"
                            type="email"
                            className={`form-control ${emailError ? 'is-invalid' : ''}`}
                            placeholder="Enter email"
                            value={email}
                            onChange={e => handleChange('email', e.target.value)}
                            onBlur={() => handleBlur('email')}
                        />
                        {emailError && <div className="invalid-feedback">{emailError}</div>}
                    </div>

                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                                placeholder="Enter password"
                                value={password}
                                onChange={e => handleChange('password', e.target.value)}
                                onBlur={() => handleBlur('password')}
                            />

                            <span
                                className="input-group-text"
                                style={{ cursor: 'pointer' }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <div className="mt-3 text-center">
                    <small>Don't have an account? <a href="/register">Register here</a></small>
                </div>
            </div>
        </div>
    ); */}

    
    return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
        <ToastContainer position="top-right" />
        <div
            className="d-flex shadow"
            style={{ maxWidth: '800px', width: '100%', borderRadius: '0.25rem' }}
        >
            {/* Left side title */}
            <div
                style={{
                    flex: 1,
                    backgroundColor: '#1877f2',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    borderTopLeftRadius: '0.25rem',
                    borderBottomLeftRadius: '0.25rem',
                    userSelect: 'none',
                }}
            >
                Himalaya College Library
            </div>

            {/* Right side: your existing login card */}
            <div style={{ flex: 1 }}>
                <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                    <h2 className="mb-4 text-center">Login</h2>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                id="email"
                                type="email"
                                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                                placeholder="Enter email"
                                value={email}
                                onChange={e => handleChange('email', e.target.value)}
                                onBlur={() => handleBlur('email')}
                            />
                            {emailError && <div className="invalid-feedback">{emailError}</div>}
                        </div>

                        <div className="mb-3 position-relative">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={e => handleChange('password', e.target.value)}
                                    onBlur={() => handleBlur('password')}
                                />

                                <span
                                    className="input-group-text"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                    <div className="mt-3 text-center">
                        <small>Don't have an account? <a href="/register">Register here</a></small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );


};

export default Login;
