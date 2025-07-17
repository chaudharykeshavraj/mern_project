import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // remove token, user, etc.
        navigate('/login');   // redirect to login page
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Library Management</a>
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                <a className="nav-link active" href="/dashboard">Dashboard</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/books">Books</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/students">Students</a>
                </li>
                <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;
