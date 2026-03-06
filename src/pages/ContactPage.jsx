import React from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 to-teal-100 font-sans p-4">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-xl animate-in fade-in duration-1000">
        
       <div className="text-center mb-8">
         <h1 className="text-3xl font-bold text-teal-900 mb-2">Contact Us</h1>
         <p className="text-[#00796B]">We'd love to hear from you. Here's how you can reach us.</p>
       </div>
       <div className="flex flex-col gap-6">
         <div className="text-center">
           <h3 className="text-xl font-semibold text-[#00796B] mb-2">Email</h3>
           <p className="text-teal-900">support@smartlogix.com</p>
         </div>
         <div className="text-center">
           <h3 className="text-xl font-semibold text-[#00796B] mb-2">Phone</h3>
           <p className="text-teal-900">+1 (555) 123-4567</p>
         </div>
         <div className="text-center">
           <h3 className="text-xl font-semibold text-[#00796B] mb-2">Address</h3>
           <p className="text-teal-900">123 Main Street, Anytown, USA 12345</p>
         </div>
       </div>
       <div className="text-center mt-8">
         <p className="text-teal-900">Back to <Link to="/" className="text-[#00796B] font-medium hover:underline">Home</Link></p>
       </div>
     </div>
     
   </div>
 );
};

export default ContactPage;
