import React from 'react';

const Students = () => {
    const students = [
        { name: 'Ram', email: 'ram@gmail.com', role: 'student' },
        { name: 'Shyam', email: 'shyam@gmail.com', role: 'student' },
    ];

    return (
        <div className="container mt-4">
        <h3>👨‍🎓 Students</h3>
        <input type="text" className="form-control mb-2" placeholder="Search students..." />
        <table className="table table-hover">
            <thead className="thead-dark">
            <tr><th>Name</th><th>Email</th><th>Role</th></tr>
            </thead>
            <tbody>
            {students.map((s, i) => (
                <tr key={i}>
                <td>{s.name}</td><td>{s.email}</td><td>{s.role}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default Students;
