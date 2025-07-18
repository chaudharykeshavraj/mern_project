import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => (
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

export default DashboardLayout;
