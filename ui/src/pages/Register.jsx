import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', form);
            toast.success('✅ Registration successful!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            toast.error(err.response?.data?.error || '❌ Registration failed');
        }
    };

    return (
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
                            required
                        />
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
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
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
