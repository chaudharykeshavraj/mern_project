import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import Students from './pages/Students';
import Issues from './pages/Issues';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes WITH layout */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="books" element={<Books />} />
          <Route path="students" element={<Students />} />
          <Route path="issues" element={<Issues />} />
          <Route path="/books/add" element={<AddBook />} />
        </Route>

        {/* Protected route WITHOUT layout */}

        {/* Optional: Catch all unmatched routes and redirect */}
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
