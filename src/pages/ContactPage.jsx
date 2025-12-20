import React from 'react';
import { Link } from 'react-router-dom';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-container">
      <div className="contact-card">
        
       <div className="contact-header">
         <h1>Contact Us</h1>
         <p>We'd love to hear from you. Here's how you can reach us.</p>
       </div>
       <div className="contact-info">
         <div className="info-item">
           <h3>Email</h3>
           <p>support@smartlogix.com</p>
         </div>
         <div className="info-item">
           <h3>Phone</h3>
           <p>+1 (555) 123-4567</p>
         </div>
         <div className="info-item">
           <h3>Address</h3>
           <p>123 Main Street, Anytown, USA 12345</p>
           
         </div>
       </div>
       <div className="home-link">
         <p>Back to <Link to="/">Home</Link></p>
       </div>
     </div>
     
   </div>
 );
};

export default ContactPage;
