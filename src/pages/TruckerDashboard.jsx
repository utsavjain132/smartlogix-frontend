import React from 'react';
import './TruckerDashboard.css';

const TruckerDashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Trucker Dashboard</h1>
        <div className="dashboard-actions">
          <button className="btn-primary">Find New Loads</button>
          <button className="btn-secondary">My Schedule</button>
        </div>
      </header>

      <section className="dashboard-summary">
        <div className="summary-card">
          <h2>Active Job</h2>
          <p>Mumbai to Delhi</p>
        </div>
        <div className="summary-card">
          <h2>Next Payout</h2>
          <p>₹ 25,000</p>
        </div>
        <div className="summary-card">
          <h2>Completed Trips</h2>
          <p>112</p>
        </div>
        <div className="summary-card">
          <h2>Total Earnings</h2>
          <p>₹ 8,50,000</p>
        </div>
      </section>

      <main className="dashboard-main">
        <div className="table-container">
          <h2>Available Loads Near You</h2>
          <table>
            <thead>
              <tr>
                <th>Load ID</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Payout</th>
                <th>Est. Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Row */}
              <tr>
                <td>#67890</td>
                <td>Pune</td>
                <td>Nagpur</td>
                <td>₹ 18,000</td>
                <td>2 days</td>
                <td><button className="btn-sm">Accept</button></td>
              </tr>
              <tr>
                <td>#67891</td>
                <td>Thane</td>
                <td>Surat</td>
                <td>₹ 12,000</td>
                <td>1 day</td>
                <td><button className="btn-sm">Accept</button></td>
              </tr>
              <tr>
                <td>#67892</td>
                <td>Mumbai</td>
                <td>Goa</td>
                <td>₹ 22,000</td>
                <td>2 days</td>
                <td><button className="btn-sm">Accept</button></td>
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

export default TruckerDashboard;
