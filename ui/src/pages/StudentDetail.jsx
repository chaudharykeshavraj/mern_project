import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { issueBook } from '../services/api';

const StudentDetail = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [books, setBooks] = useState([]);
    const [availableBooks, setAvailableBooks] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const backendUrl = 'http://localhost:5000';

    useEffect(() => {
      const fetchStudent = async () => {
        try {
          const res = await API.get(`/students/${id}`);
          setStudent(res.data.student);
          setBooks(res.data.issuedBooks);
          setLoading(false);
        } catch (err) {
          console.error('❌ Failed to fetch student:', err);
          setLoading(false);
        }
      };

      const fetchAvailableBooks = async () => {
        try {
          const res = await API.get('/books');
          // Filter books that are not currently issued
          const unissued = res.data.filter(book => !book.issuedTo);
          setAvailableBooks(unissued);
        } catch (err) {
          console.error('❌ Failed to fetch books:', err);
        }
      };

      fetchStudent();
      fetchAvailableBooks();
    }, [id]);

    const handleIssue = async () => {
      if (!selectedBookId) {
        setMessage('⚠️ Please select a book to issue.');
        return;
      }

      if (!returnDate) {
        setMessage('⚠️ Please select a return date.');
        return;
      }

      try {
        const res = await issueBook(student._id, selectedBookId, returnDate);
        setMessage('✅ Book issued successfully!');
        // Update issued books list
        setBooks(prev => [...prev, res.issuedBook]);
        // Remove from available
        setAvailableBooks(prev => prev.filter(book => book._id !== selectedBookId));
        setSelectedBookId('');
        setReturnDate('');
      } catch (err) {
        console.error('❌ Issue failed:', err);
        setMessage('❌ Failed to issue book.');
      }
    };

    const handleRelease = async (bookId) => {
    try {
      await API.post('/books/release', { bookId });

      const releasedBook = books.find(book => book._id === bookId);
      
      // Update UI
      setBooks(prev => prev.filter(book => book._id !== bookId));
      setAvailableBooks(prev => [...prev, releasedBook]);

      // ✅ Show success message with book title
      setMessage(`✅ "${releasedBook.title}" returned.`);
    } catch (err) {
      console.error('❌ Release failed:', err);
      setMessage('❌ Failed to release book.');
    }
  };

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (!student) return <div className="text-danger mt-5 text-center">Student not found</div>;

    return (
      <div className="container mt-4">
        <h3 className="mb-4">Student Detail</h3>

        <div className="row">
          {/* Student Info */}
          <div className="col-md-4 text-center">
            <img
              src={student.photo ? `${backendUrl}${student.photo}` : '/default-avatar.png'}
              alt={student.name}
              className="img-fluid rounded"
              style={{ maxHeight: '200px', objectFit: 'cover' }}
            />
          </div>

          <div className="col-md-8">
            <table className="table table-bordered">
              <tbody>
                <tr><th>Name</th><td>{student.name}</td></tr>
                <tr><th>Email</th><td>{student.email}</td></tr>
                <tr><th>Roll</th><td>{student.roll}</td></tr>
                <tr><th>Faculty</th><td>{student.faculty}</td></tr>
                <tr><th>Batch</th><td>{student.batch}</td></tr>
              </tbody>
            </table>

            <div className="mb-3">
              <label>Select Book to Issue:</label>
              <select
                className="form-select"
                value={selectedBookId}
                onChange={(e) => setSelectedBookId(e.target.value)}
              >
                <option value="">-- Select Book --</option>
                {availableBooks.map(book => (
                  <option key={book._id} value={book._id}>
                    {book.title} by {book.author}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium">Return Date:</label>
              <input
                type="date"
                className="border px-2 py-1 rounded"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>

            <button className="btn btn-primary" onClick={handleIssue}>
              Issue Book
            </button>

            {message && <div className="mt-2 text-info">{message}</div>}
          </div>
        </div>

        <hr className="my-4" />

        {/* Issued Books */}
        <h5>Issued Books</h5>
        {books.length === 0 ? (
          <p>No books issued.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publishedYear}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRelease(book._id)}
                    >
                      ❌ Release
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
};

export default StudentDetail;
