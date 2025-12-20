import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🚛 SmartLogix
        </Link>
        
        <ul className="nav-menu">
        <li className="nav-item">
            <Link to="/contact" className="nav-button">
              Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-button">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-button">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
