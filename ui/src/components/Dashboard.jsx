import React from 'react';
import DashboardLayout from './DashboardLayout';

const Dashboard = () => (
    <DashboardLayout>
        <div className="container mt-4">
        <h2>📊 Admin Dashboard</h2>
        <div className="row">
            <div className="col-md-4">
            <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                <h5 className="card-title">Total Books</h5>
                <p className="card-text">📚 120</p>
                </div>
            </div>
            </div>
            <div className="col-md-4">
            <div className="card text-white bg-success mb-3">
                <div className="card-body">
                <h5 className="card-title">Students</h5>
                <p className="card-text">👨‍🎓 65</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </DashboardLayout>
);

export default Dashboard;
