import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const StudentDetail = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [availableBooks, setAvailableBooks] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState('');

    const fetchStudentDetails = async () => {
        try {
            const res = await API.get(`/students/${id}`);
            setStudent(res.data.student);
            setIssuedBooks(res.data.issuedBooks);
        } catch (err) {
            console.error('Error fetching student:', err);
        }
    };

    const fetchAvailableBooks = async () => {
        try {
            const res = await API.get('/books');
            const unissued = res.data.filter(book => !book.issuedTo);
            setAvailableBooks(unissued);
        } catch (err) {
            console.error('Error fetching available books:', err);
        }
    };

    useEffect(() => {
        fetchStudentDetails();
        fetchAvailableBooks();
    }, [id]);

    const handleIssueBook = async () => {
        if (!selectedBookId) return alert('Please select a book to issue.');

        try {
            await API.post('/students/issue', {
                studentId: student._id,
                bookId: selectedBookId
            });
            alert('Book issued successfully.');
            await fetchStudentDetails();
            await fetchAvailableBooks();
            setSelectedBookId('');
        } catch (err) {
            alert('Error issuing book');
            console.error(err);
        }
    };

    const handleReleaseBook = async (bookId) => {
        const confirmRelease = window.confirm("Are you sure you want to release this book?");
        if (!confirmRelease) return;

        try {
            await API.post('/students/release', { bookId });
            alert('Book released successfully.');
            await fetchStudentDetails();
            await fetchAvailableBooks();
        } catch (err) {
            alert('Error releasing book');
            console.error(err);
        }
    };

    if (!student) return <p>Loading student info...</p>;

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Student Details</h2>
            <div className="border rounded p-4 bg-gray-50">
                {student.photo && (
                    <img
                        src={`http://localhost:5000/${student.photo}`}
                        alt="Student"
                        className="w-32 h-32 object-cover mb-4 rounded"
                    />
                )}
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Roll:</strong> {student.roll}</p>
                <p><strong>Faculty:</strong> {student.faculty}</p>
                <p><strong>Batch:</strong> {student.batch}</p>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-2">Issued Books</h3>
            {issuedBooks.length > 0 ? (
                <ul className="space-y-2">
                    {issuedBooks.map(book => (
                        <li key={book._id} className="flex justify-between items-center bg-white shadow-sm p-2 rounded border">
                            <span>{book.title}</span>
                            <button
                                onClick={() => handleReleaseBook(book._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                            >
                                Release
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books issued.</p>
            )}

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Issue New Book</h3>
                <div className="flex gap-4">
                    <select
                        className="border p-2 rounded"
                        value={selectedBookId}
                        onChange={e => setSelectedBookId(e.target.value)}
                    >
                        <option value="">Select a book</option>
                        {availableBooks.map(book => (
                            <option key={book._id} value={book._id}>
                                {book.title}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleIssueBook}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Issue Book
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentDetail;
