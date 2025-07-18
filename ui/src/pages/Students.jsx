import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import API from '../services/api';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
        try {
            const res = await API.get('/students');
            setStudents(res.data);
        } catch (err) {
            setError('Failed to load students');
        } finally {
            setLoading(false);
        }
        };
        fetchStudents();
    }, []);

    return (
        <DashboardLayout>
        <h2>Students List</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
            <table className="table table-striped">
            <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {students.map(s => (
                <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.role}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </DashboardLayout>
    );
};

export default Students;
