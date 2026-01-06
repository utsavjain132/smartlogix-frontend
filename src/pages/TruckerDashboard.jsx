import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './TruckerDashboard.css';

const API_BASE_URL = "http://localhost:5000/api";

const TruckerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [availableLoads, setAvailableLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch Profile
      const profileRes = await fetch(`${API_BASE_URL}/trucker/profile/me`, { headers });
      if (!profileRes.ok) throw new Error("Failed to fetch profile");
      const profileData = await profileRes.json();
      setProfile(profileData);

      // Fetch Available Loads
      const loadsRes = await fetch(`${API_BASE_URL}/loads/available`, { headers });
      if (!loadsRes.ok) throw new Error("Failed to fetch available loads");
      const loadsData = await loadsRes.json();
      setAvailableLoads(loadsData);

    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAcceptLoad = async (loadId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/loads/${loadId}/accept`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to accept load");
      }

      toast.success("Load accepted! Safe travels.");
      fetchData(); // Refresh the list
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="dashboard-container">Loading...</div>;
  if (error) return <div className="dashboard-container">Error: {error}</div>;

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
        <div className="summary-card profile-card">
          <h2>My Rig</h2>
          <p><strong>Vehicle:</strong> {profile?.vehicleType}</p>
          <p><strong>Capacity:</strong> {profile?.capacity} Tons</p>
          <p><strong>Base:</strong> {profile?.currentLocation?.city}</p>
        </div>
        <div className="summary-card">
          <h2>Available Loads</h2>
          <p>{availableLoads.length}</p>
        </div>
        <div className="summary-card">
          <h2>Active Job</h2>
          <p>None</p>
        </div>
        <div className="summary-card">
          <h2>Total Earnings</h2>
          <p>₹ 0</p>
        </div>
      </section>

      <main className="dashboard-main">
        <div className="table-container">
          <h2>Available Loads Near You</h2>
          <table>
            <thead>
              <tr>
                <th>Cargo</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Payout</th>
                <th>Weight</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {availableLoads.map(load => (
                <tr key={load._id}>
                  <td>{load.cargoType}</td>
                  <td>{load.origin}</td>
                  <td>{load.destination}</td>
                  <td>₹ {load.price}</td>
                  <td>{load.weight} Tons</td>
                  <td>
                    <button 
                      className="btn-sm" 
                      onClick={() => handleAcceptLoad(load._id)}
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              ))}
              {availableLoads.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No available loads found.</td>
                </tr>
              )}
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
