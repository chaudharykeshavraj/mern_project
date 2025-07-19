import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleRedirectHome = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
        navigate('/login');
    } else if (role === 'admin' || role === 'teacher') {
        navigate('/dashboard');
    } else if (role === 'student') {
        navigate('/students');
    } else {
        navigate('/dashboard'); // default
    }
    };

    const handleLogout = () => {
        localStorage.clear(); // remove token, user, etc.
        toast.success("Logged Out");

        setTimeout(() => {
            navigate('/login');   // redirect to login page
        }, 1000);
    };

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        
        <div className="container-fluid">
            <a className="navbar-brand" onClick={handleRedirectHome} href="/dashboard">Library Management System</a>
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
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </li>
            </ul>
            </div>
        </div>
        </nav>

        <ToastContainer position="top-right" autoClose={1000} />
        </>
    );
};

export default Navbar;
