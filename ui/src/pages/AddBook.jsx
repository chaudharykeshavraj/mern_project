import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const navigate = useNavigate();

    const [book, setBook] = useState({
        title: '',
        author: '',
        // isbn: '',
        publishedYear: '',
        quantity: '',
    });

    const handleChange = e => {
        setBook(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

         const token = localStorage.getItem('token');  // <-- Get token here


        const cleanedBook = {
            ...book,
            publishedYear: parseInt(book.publishedYear),
            quantity: parseInt(book.quantity)
        };

        // console.log("📦 Sending book:", cleanedBook); // for debugging

        /* if(
            !cleanedBook.title ||
            !cleanedBook.author ||
            isNaN(cleanedBook.publishedYear) ||
            isNaN(cleanedBook.quantity)
        ) {
            toast.error('Please fill all the fields correctly.');
        } */

        try {
            console.log("📦 Sending book with token:", cleanedBook, token); // for debugging

            const res = await axios.post('http://localhost:5000/api/books', 
            cleanedBook,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Book added successfully ✅');
            navigate('/books');
            setTimeout(() => navigate('/books'), 2000);
        } catch (err) {
            toast.error('Failed to add book ❌. Please try again.');
            // console.error(err.response?.data || err.message);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <ToastContainer position="top-right" />
        <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
            <h2 className="mb-4 text-center">Add New Book</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" name="title" placeholder='Book Name' value={book.title} className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Author</label>
                <input type="text" name="author" placeholder='Author Name' value={book.author} className="form-control" onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label className="form-label">Published Date</label>
                <input type="number" name="publishedYear" placeholder='Published Year' value={book.publishedYear} className="form-control" min="1900" max={new Date().getFullYear()} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input type="number" name="quantity" placeholder='Quantity' value={book.quantity} className="form-control" onChange={handleChange} required min="1" />
            </div>
            <button type="submit" className="btn btn-success w-100">Add Book</button>
            </form>
        </div>
        </div>
    );
};

export default AddBook;
