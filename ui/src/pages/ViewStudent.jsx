import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

const ViewStudent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get(`/students/${id}`);
                setStudent(res.data.student);
                setBooks(res.data.issuedBooks);
            } catch (err) {
                toast.error('Failed to fetch student details');
            }
        };
        fetchData();
    }, [id]);

    const releaseBook = async (bookId) => {
        try {
            await API.post('/books/release', { bookId });
            toast.success('Book released');
            setBooks(books.filter(b => b._id !== bookId));
        } catch {
            toast.error('Failed to release book');
        }
    };

    return student ? (
        <div className="container">
            <h2>Student Details</h2>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Roll:</strong> {student.roll}</p>
            <p><strong>Faculty:</strong> {student.faculty}</p>
            <p><strong>Batch:</strong> {student.batch}</p>
            {student.photo && <img src={student.photo} alt="Student" width="150" />}
            <h3 className="mt-4">Issued Books</h3>
            {books.length === 0 ? (
                <p>No books issued</p>
            ) : (
                <ul>
                    {books.map(book => (
                        <li key={book._id}>
                            {book.title}
                            <button onClick={() => releaseBook(book._id)} className="btn btn-sm btn-danger ms-2">Release</button>
                        </li>
                    ))}
                </ul>
            )}
            <button className="btn btn-primary mt-3" onClick={() => window.location.href = `/issue-book/${student._id}`}>Issue New Book</button>
        </div>
    ) : (
        <p>Loading student...</p>
    );
};

export default ViewStudent;
