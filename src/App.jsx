import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BusinessDashboard from './pages/BusinessDashboard';
import TruckerDashboard from './pages/TruckerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route 
          path="/business-dashboard" 
          element={
            <ProtectedRoute allowedRole="BUSINESS">
              <BusinessDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/trucker-dashboard" 
          element={
            <ProtectedRoute allowedRole="TRUCKER">
              <TruckerDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route path="/contact-us" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
