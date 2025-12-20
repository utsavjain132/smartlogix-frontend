import React from 'react';
import './BusinessDashboard.css';

const BusinessDashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Business Dashboard</h1>
        <div className="dashboard-actions">
          <button className="btn-primary">Post a New Load</button>
          <button className="btn-secondary">Manage Listings</button>
        </div>
      </header>

      <section className="dashboard-summary">
        <div className="summary-card">
          <h2>Active Loads</h2>
          <p>12</p>
        </div>
        <div className="summary-card">
          <h2>In Transit</h2>
          <p>5</p>
        </div>
        <div className="summary-card">
          <h2>Completed Trips</h2>
          <p>38</p>
        </div>
        <div className="summary-card">
          <h2>Pending Payments</h2>
          <p>₹ 75,000</p>
        </div>
      </section>

      <main className="dashboard-main">
        <div className="table-container">
          <h2>Recent Activity</h2>
          <table>
            <thead>
              <tr>
                <th>Load ID</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Trucker</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Row */}
              <tr>
                <td>#58943</td>
                <td>Mumbai</td>
                <td>Delhi</td>
                <td>In Transit</td>
                <td>Ramesh Kumar</td>
                <td><button className="btn-sm">View Details</button></td>
              </tr>
               <tr>
                <td>#58944</td>
                <td>Bangalore</td>
                <td>Chennai</td>
                <td>Delivered</td>
                <td>Suresh Singh</td>
                <td><button className="btn-sm">View Details</button></td>
              </tr>
               <tr>
                <td>#58945</td>
                <td>Kolkata</td>
                <td>Hyderabad</td>
                <td>Pending</td>
                <td>N/A</td>
                <td><button className="btn-sm">View Details</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2025 SmartLogix. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BusinessDashboard;
