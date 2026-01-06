import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './BusinessDashboard.css';

const API_BASE_URL = "http://localhost:5000/api";

const BusinessDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  // New Load Form State
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    cargoType: "",
    weight: "",
    price: "",
    pickupDate: ""
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch Profile
      const profileRes = await fetch(`${API_BASE_URL}/business/profile/me`, { headers });
      if (!profileRes.ok) throw new Error("Failed to fetch profile");
      const profileData = await profileRes.json();
      setProfile(profileData);

      // Fetch My Loads
      const loadsRes = await fetch(`${API_BASE_URL}/loads/my-loads`, { headers });
      if (!loadsRes.ok) throw new Error("Failed to fetch loads");
      const loadsData = await loadsRes.json();
      setLoads(loadsData);

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitLoad = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/loads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Failed to post load");

      toast.success("Load posted successfully!");
      setShowForm(false);
      setFormData({ origin: "", destination: "", cargoType: "", weight: "", price: "", pickupDate: "" });
      fetchData(); // Refresh list
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="dashboard-container">Loading...</div>;
  if (error) return <div className="dashboard-container">Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>{profile?.businessName || "Business Dashboard"}</h1>
        <div className="dashboard-actions">
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Post a New Load"}
          </button>
        </div>
      </header>

      {showForm && (
        <section className="post-load-section">
          <h2>Post New Shipment</h2>
          <form className="post-load-form" onSubmit={handleSubmitLoad}>
            <div className="form-grid">
              <input name="origin" placeholder="Origin (e.g. Mumbai)" onChange={handleInputChange} required />
              <input name="destination" placeholder="Destination (e.g. Delhi)" onChange={handleInputChange} required />
              <input name="cargoType" placeholder="Cargo Type (e.g. Electronics)" onChange={handleInputChange} required />
              <input name="weight" type="number" placeholder="Weight (Tons)" onChange={handleInputChange} required />
              <input name="price" type="number" placeholder="Price (₹)" onChange={handleInputChange} required />
              <input name="pickupDate" type="date" onChange={handleInputChange} required />
            </div>
            <button type="submit" className="btn-submit">Submit Load</button>
          </form>
        </section>
      )}

      <section className="dashboard-summary">
        <div className="summary-card profile-card">
          <h2>Profile Details</h2>
          <p><strong>Contact:</strong> {profile?.contactPerson}</p>
          <p><strong>Location:</strong> {profile?.location?.city}</p>
        </div>
        <div className="summary-card">
          <h2>Total Loads</h2>
          <p>{loads.length}</p>
        </div>
        <div className="summary-card">
          <h2>Pending</h2>
          <p>{loads.filter(l => l.status === 'PENDING').length}</p>
        </div>
        <div className="summary-card">
          <h2>In Transit</h2>
          <p>{loads.filter(l => l.status === 'IN_TRANSIT').length}</p>
        </div>
      </section>

      <main className="dashboard-main">
        <div className="table-container">
          <h2>Your Posted Loads</h2>
          <table>
            <thead>
              <tr>
                <th>Cargo</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loads.map(load => (
                <tr key={load._id}>
                  <td>{load.cargoType}</td>
                  <td>{load.origin}</td>
                  <td>{load.destination}</td>
                  <td><span className={`status-badge ${load.status.toLowerCase()}`}>{load.status}</span></td>
                  <td>₹ {load.price}</td>
                  <td><button className="btn-sm">Details</button></td>
                </tr>
              ))}
              {loads.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No loads posted yet.</td>
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

export default BusinessDashboard;
