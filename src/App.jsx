import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardShell from './components/DashboardShell';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BusinessDashboard from './pages/BusinessDashboard';
import TruckerDashboard from './pages/TruckerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <div className="font-sans antialiased">
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
                <DashboardShell role="BUSINESS">
                  <BusinessDashboard />
                </DashboardShell>
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
                <DashboardShell role="ADMIN">
                  <AdminDashboard />
                </DashboardShell>
              </ProtectedRoute>
            } 
          />
          
          <Route path="/contact-us" element={<ContactPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
