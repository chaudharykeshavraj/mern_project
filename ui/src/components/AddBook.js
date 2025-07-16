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
        publishedYear: parseInt(form.publishedYear), // ✅ convert to number
    };

    try {
        await axios.post('http://localhost:5000/api/books', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
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
            <input name="title" placeholder="Title" onChange={handleChange} required />
            <input name="author" placeholder="Author" onChange={handleChange} required />
            <input
            name="publishedYear"
            type="number"
            placeholder="Published Year"
            onChange={handleChange}
            required
            />
            <button type="submit">Add Book</button>
        </form>
        </div>
    );
};

export default AddBook;
