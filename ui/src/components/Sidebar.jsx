import React from 'react';

const Sidebar = () => (
    <div className="d-flex flex-column p-3 bg-light" style={{ width: '220px', height: '100vh' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
        <span className="fs-4">Menu</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
            <a href="/dashboard" className="nav-link link-dark">Dashboard</a>
        </li>
        <li>
            <a href="/books" className="nav-link link-dark">Books</a>
        </li>
        <li>
            <a href="/students" className="nav-link link-dark">Students</a>
        </li>
        <li>
            <a href="/issues" className="nav-link link-dark">Issues</a>
        </li>
        <li>
            <a href="/logout" className="nav-link link-dark">Logout</a>
        </li>
        </ul>
    </div>
);

export default Sidebar;
