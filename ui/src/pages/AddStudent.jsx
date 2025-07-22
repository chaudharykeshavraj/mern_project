import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddStudent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        roll: '',
        faculty: '',
        batch: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                ...formData,
                role: 'student' // Ensure the role is 'student'
            });

            toast.success('Student added successfully');
            setFormData({ name: '', email: '', password: '', roll: '', faculty: '', batch: '' });
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to register student');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add New Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <label>Roll</label>
                    <input type="text" name="roll" className="form-control" value={formData.roll} onChange={handleChange} />
                </div>
                <div className="mb-2">
                    <label>Faculty</label>
                    <input type="text" name="faculty" className="form-control" value={formData.faculty} onChange={handleChange} />
                </div>
                <div className="mb-2">
                    <label>Batch</label>
                    <input type="text" name="batch" className="form-control" value={formData.batch} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary">Add Student</button>
            </form>
        </div>
    );
};

export default AddStudent;
