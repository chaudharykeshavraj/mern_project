import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import StudentsList from './pages/StudentsList';
import StudentDetail from './pages/StudentDetail';
import Issues from './pages/Issues';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes (with DashboardLayout) */}
          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="books" element={<Books />} />
            <Route path="books/add" element={<AddBook />} />
            <Route path="students" element={<StudentsList />} />
            <Route path="students/:id" element={<StudentDetail />} /> {/* ✅ moved inside */}
            <Route path="issues" element={<Issues />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
