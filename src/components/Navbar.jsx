import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const dashboardLink = role === "BUSINESS" ? "/business-dashboard" : "/trucker-dashboard";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🚛 SmartLogix
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/contact-us" className="nav-button">
              Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-button">
              Home
            </Link>
          </li>

          {!token ? (
            <li className="nav-item">
              <Link to="/login" className="nav-button">
                Login
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link to={dashboardLink} className="nav-button">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-button btn-logout">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
