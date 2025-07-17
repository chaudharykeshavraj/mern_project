import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Books from './components/Books';
import Students from './components/Students';
import DashboardLayout from './components/DashboardLayout';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Layout-wrapped routes */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/books" element={<DashboardLayout><Books /></DashboardLayout>} />
        <Route path="/students" element={<DashboardLayout><Students /></DashboardLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
