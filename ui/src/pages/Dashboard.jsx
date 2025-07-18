import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import API from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({ books: 0, students: 0, issued: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
        try {
            const res = await API.get('/stats'); // You should have this endpoint in backend
            setStats(res.data);
        } catch (err) {
            setError('Failed to load dashboard stats');
        } finally {
            setLoading(false);
        }
        };
        fetchStats();
    }, []);

    return (
        <DashboardLayout>
        <h2>Admin Dashboard</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
            <div className="row">
            <div className="col-md-4">
                <div className="card bg-primary text-white mb-3">
                <div className="card-body">
                    <h5>Total Books</h5>
                    <p>{stats.books}</p>
                </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card bg-success text-white mb-3">
                <div className="card-body">
                    <h5>Students</h5>
                    <p>{stats.students}</p>
                </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card bg-warning text-dark mb-3">
                <div className="card-body">
                    <h5>Issued Books</h5>
                    <p>{stats.issued}</p>
                </div>
                </div>
            </div>
            </div>
        )}
        </DashboardLayout>
    );
};

export default Dashboard;
