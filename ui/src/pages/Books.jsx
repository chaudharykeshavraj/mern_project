import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await API.get('/books');
                setBooks(res.data);
            } catch (err) {
                setError('Failed to load books');
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div>
            <h2>Books List</h2>
            <Link to="/books/add" className="btn btn-primary mb-3"> <strong>+</strong> Add New Book</Link>
            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Published Year</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publishedYear}</td>
                                <td>{book.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Books;
