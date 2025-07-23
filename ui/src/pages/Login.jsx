import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    const [touched, setTouched] = useState({ email: false, password: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        setTouched((prev) => ({ ...prev, [field]: true }));
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
        setIsSubmitting(true);

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        const emailErr = validateEmail(trimmedEmail);
        const passwordErr = validatePassword(trimmedPassword);

        setEmailError(emailErr);
        setPasswordError(passwordErr);
        setTouched({ email: true, password: true });

        if (emailErr || passwordErr) {
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                email: trimmedEmail,
                password: trimmedPassword,
            });

            const { token, user } = response.data;

            if (!token || !user) throw new Error('Missing user or token');

            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);
            localStorage.setItem('userId', user._id);

            toast.success('Login successful');

            setTimeout(() => {
                if (user.role === 'student' && user.mustChangePassword) {
                    navigate('/change-password', { state: { userId: user._id } });
                } else if (user.role === 'admin') {
                    navigate('/dashboard');
                } else if (user.role === 'student') {
                    navigate('/students');
                } else {
                    navigate('/');
                }
            }, 1000);
        } catch (err) {
            console.error("Login error:", err?.response?.data || err.message);
            toast.error(err?.response?.data?.error || 'Login failed!');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <ToastContainer position="top-right" />
            <div className="d-flex shadow" style={{ maxWidth: '800px', width: '100%', borderRadius: '0.25rem' }}>
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

                {/* Right side login form */}
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
                                    onChange={(e) => handleChange('email', e.target.value)}
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
                                        onChange={(e) => handleChange('password', e.target.value)}
                                        onBlur={() => handleBlur('password')}
                                    />
                                    <span
                                        className="input-group-text"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                        </form>
                        <div className="mt-3 text-center">
                            <small>
                                Don't have an account? <Link to="/register">Register here</Link>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
