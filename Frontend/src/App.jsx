import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminDashboard />} />
        <Route path="/admin/articles" element={<AdminDashboard />} />
        <Route path="/admin/articles/create" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminDashboard />} />
        {/* Other routes can be added here */}
      </Routes>
    );
}

export default App;