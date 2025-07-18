import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
        navigate('/login');
        }
    }, []);

    return (
        <div>
        <Navbar />
        <div style={{ display: "flex" }}>
            <Sidebar />
            <main style={{ padding: "20px", flexGrow: 1 }}>
            <Outlet />
            </main>
        </div>
        </div>
    );
};

export default DashboardLayout;
