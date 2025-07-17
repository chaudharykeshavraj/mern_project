import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [form, setForm] = useState({
        title: '',
        author: '',
        publishedYear: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const formData = {
            ...form,
            publishedYear: parseInt(form.publishedYear),
        };

        try {
            await axios.post('http://localhost:5000/api/books', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            alert('✅ Book added successfully');
        } catch (err) {
            alert(err.response?.data?.error || '❌ Failed to add book');
        }
    };

    return (
        <div>
            <h2>Add Book (Admin only)</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                id="title"
                name="title"
                type="text"
                className="form-control"
                placeholder="Title"
                onChange={handleChange}
                required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">Author</label>
                <input
                id="author"
                name="author"
                type="text"
                className="form-control"
                placeholder="Author"
                onChange={handleChange}
                required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="publishedYear" className="form-label">Published Year</label>
                <input
                id="publishedYear"
                name="publishedYear"
                type="number"
                className="form-control"
                placeholder="Published Year"
                onChange={handleChange}
                required
                />
            </div>
                <button type="submit" className="btn btn-primary">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;
