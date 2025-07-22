import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { fetchStudents } from '../services/api';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchRoll, setSearchRoll] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    // 🔍 Search student by roll number
    const handleSearch = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/students/search?roll=${searchRoll.trim()}`);
            setSelectedStudent(res.data);
        } catch (err) {
            alert("Student not found");
            setSelectedStudent(null);
        }
    };

    // 📄 View details of selected student
    const handleViewStudent = async (student) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/students/search?roll=${student.roll}`);
            setSelectedStudent(res.data);
        } catch (err) {
            alert("Failed to load student details");
        }
    };

    // 📦 Fetch all students on mount
    useEffect(() => {
        const getStudents = async () => {
            try {
                const response = await fetchStudents();
                setStudents(response.data);
            } catch (err) {
                setError('Failed to load students');
            } finally {
                setLoading(false);
            }
        };

        getStudents();
    }, []);

    if (loading) return <p>Loading students...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Students List</h2>

            {/* 🔎 Search input (half width) */}
            <div className="d-flex justify-content-start mb-3">
                <div className="input-group" style={{ maxWidth: '500px', width: '100%' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Roll No"
                        value={searchRoll}
                        onChange={(e) => setSearchRoll(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>

            {/* 📋 Students table */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.roll || '—'}</td>
                            <td>{student.email}</td>
                            <td>
                                {/* <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => handleViewStudent(student)}
                                >
                                    View
                                </button> */}

                                <Link to={`/students/${student._id}`} className="btn btn-info btn-sm">
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 🧑‍🎓 Selected student details */}
            {selectedStudent && (
                <div className="card mt-4 p-3">
                    <h4>Student Details</h4>
                    <div className="d-flex align-items-center">
                        {selectedStudent.student?.photo && (
                            <img
                                src={selectedStudent.student.photo}
                                alt="student"
                                width="100"
                                className="me-3 rounded"
                            />
                        )}
                        <div>
                            <p><strong>Name:</strong> {selectedStudent.student.name}</p>
                            <p><strong>Roll:</strong> {selectedStudent.student.roll}</p>
                            <p><strong>Faculty:</strong> {selectedStudent.student.faculty || 'N/A'}</p>
                            <p><strong>Batch:</strong> {selectedStudent.student.batch || 'N/A'}</p>
                        </div>
                    </div>
                    <h5 className="mt-3">Issued Books:</h5>
                    <ul>
                        {selectedStudent.issues.length > 0 ? (
                            selectedStudent.issues.map(issue => (
                                <li key={issue._id}>
                                    {issue.bookId.title} (Issued on: {new Date(issue.issuedDate).toLocaleDateString()})
                                </li>
                            ))
                        ) : (
                            <li>No books issued</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Students;
