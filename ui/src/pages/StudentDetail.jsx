import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Set your backend URL here or use environment variable
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
    fetchStudent();
  }, [id]);

  const handleIssue = () => {
    // You can add redirect to issue book form or modal later
  };

  const handleRelease = async (bookId) => {
    try {
      await API.post('/books/release', { bookId });
      const updated = books.filter(book => book._id !== bookId);
      setBooks(updated);
    } catch (err) {
      console.error('❌ Release failed:', err);
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

          <button className="btn btn-primary" onClick={handleIssue}>
            Issue Book
          </button>
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
