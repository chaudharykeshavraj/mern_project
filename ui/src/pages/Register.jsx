import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
    const [touched, setTouched] = useState({ name: false, email: false, password: false });

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFocus = (e) => {
        const name = e.target.name;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            form.name.length < 3 ||
            !isValidEmail(form.email) ||
            form.password.length < 6
        ) {
            toast.error('Please fix validation errors.');
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, form);
            toast.success('Registration successful');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            toast.error(err.response?.data?.error || 'Registration failed');
        }
    };

    {/* return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <ToastContainer position="top-right" />
            <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="mb-4 text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter full name"
                            value={form.name}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            required
                        />
                        {touched.name && form.name.length < 3 && (
                            <div className="text-danger mt-1">Name must be at least 3 characters</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={form.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            required
                        />
                        {touched.email && !isValidEmail(form.email) && (
                            <div className="text-danger mt-1">Invalid email format</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={form.password}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                required
                            />
                            <span
                                className="input-group-text"
                                style={{ cursor: 'pointer' }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {touched.password && form.password.length < 6 && (
                            <div className="text-danger mt-1">Password must be at least 6 characters</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Select Role</label>
                        <select
                            id="role"
                            name="role"
                            className="form-select rounded-3"
                            value={form.role}
                            onChange={handleChange}
                            // style={{ padding: '10px', fontSize: '16px' }}
                            required
                        >
                            <option value="student">👨‍🎓 Student</option>
                            <option value="teacher">👩‍🏫 Teacher</option>
                            <option value="admin">📚 Librarian</option>
                        </select>
                    </div>

                    <button type="submit" className="btn w-100" style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
                        Register
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <small>Already have an account? <a href="/login">Login here</a></small>
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
            {/* Left side blue panel */}
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

            {/* Right side: your existing Register card unchanged */}
            <div style={{ flex: 1 }}>
                <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                    <h2 className="mb-4 text-center">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter full name"
                                value={form.name}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                required
                            />
                            {touched.name && form.name.length < 3 && (
                                <div className="text-danger mt-1">Name must be at least 3 characters</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={form.email}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                required
                            />
                            {touched.email && !isValidEmail(form.email) && (
                                <div className="text-danger mt-1">Invalid email format</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    value={form.password}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    required
                                />
                                <span
                                    className="input-group-text"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {touched.password && form.password.length < 6 && (
                                <div className="text-danger mt-1">Password must be at least 6 characters</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Select Role</label>
                            <select
                                id="role"
                                name="role"
                                className="form-select rounded-3"
                                value={form.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="student">👨‍🎓 Student</option>
                                <option value="teacher">👩‍🏫 Teacher</option>
                                <option value="admin">📚 Librarian</option>
                            </select>
                        </div>

                        <button type="submit" className="btn w-100" style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
                            Register
                        </button>
                    </form>
                    <div className="mt-3 text-center">
                        {/* <small>Already have an account? <a href="/login">Login here</a></small> */}
                        <small>Already have an account? <Link to="/login">Login here</Link></small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );

};

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

export default Register;
