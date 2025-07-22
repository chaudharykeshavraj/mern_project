import React, { useEffect, useState } from 'react';
import { fetchIssues } from '../services/api';

const BookIssues = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadIssues = async () => {
            try {
                const response = await fetchIssues();
                setIssues(response.data);
            } catch (err) {
                setError('Failed to fetch book issues');
            } finally {
                setLoading(false);
            }
        };

        loadIssues();
    }, []);

    if (loading) return <p>Loading book issues...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Book Issue Records</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Book Title</th>
                        <th>Author</th>
                        <th>Issue Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {issues.map((issue) => (
                        <tr key={issue._id}>
                            <td>{issue.studentId?.name}</td>
                            <td>{issue.studentId?.email}</td>
                            <td>{issue.bookId?.title}</td>
                            <td>{issue.bookId?.author}</td>
                            <td>{new Date(issue.issueDate).toLocaleDateString()}</td>
                            <td>{issue.returnDate ? new Date(issue.returnDate).toLocaleDateString() : 'N/A'}</td>
                            <td>{issue.status || 'issued'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookIssues;
