import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, MapPin, BadgeIndianRupee, Linkedin, Twitter, Youtube } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Optimizing Freight Logistics with Smart AI Rules</h1>
          <p>Connect truckers and businesses instantly for efficient, cost-effective, and rule-based freight delivery.</p>
          <Link to="/signup" className="btn-primary">Get Started</Link>
        </div>
        <div className="hero-illustration">
          {/* Placeholder for illustration */}
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <Bot size={48} color="#2563EB" />
            <h3>Rule-Based Matchmaking</h3>
            <p>Smart freight allocation logic ensures the best fit for every load, optimizing routes and costs.</p>
          </div>
          <div className="feature-card">
            <MapPin size={48} color="#2563EB" />
            <h3>Real-Time Tracking</h3>
            <p>Gain complete visibility with live GPS tracking of your shipment from pickup to delivery.</p>
          </div>
          <div className="feature-card">
            <BadgeIndianRupee size={48} color="#2563EB" />
            <h3>Fair Pricing System</h3>
            <p>Our transparent, data-driven pricing model ensures competitive rates for both businesses and truckers.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section
      <section className="cta-section">
        <h2>Ready to move smarter?</h2>
        <p>Join SmartLogix and optimize your logistics today.</p>
        <div className="cta-buttons">
          <Link to="/signup" className="btn-secondary">Join as Trucker</Link>
          <Link to="/signup" className="btn-primary">Join as Business Owner</Link>
        </div>
      </section> */}

            {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>Ready to move smarter?</h2>
        <p>Join SmartLogix and optimize your logistics today.</p>
        <div className="cta-buttons">
          <Link to="/signup?type=trucker" className="btn-secondary">
            Join as Trucker
          </Link>
          <Link to="/signup?type=business" className="btn-primary">
            Join as Business Owner
          </Link>
        </div>
      </section>


      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 SmartLogix. All rights reserved.</p>
        <div className="social-media-icons">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin size={24} /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter size={24} /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><Youtube size={24} /></a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
