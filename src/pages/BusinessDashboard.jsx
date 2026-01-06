import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiRequest } from '../services/api';
import MapComponent from '../components/MapComponent';
import './BusinessDashboard.css';

const BusinessDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [trackingLoad, setTrackingLoad] = useState(null);
  
  // New Load Form State
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    cargoType: "",
    vehicleTypeRequired: "",
    weight: "",
    price: "",
    pickupDate: ""
  });

  const [activeTab, setActiveTab] = useState("active");

  const filteredLoads = loads.filter(load => {
      const activeStatuses = ["POSTED", "MATCHED", "ASSIGNED", "IN_TRANSIT", "DELIVERED"]; // Keeping DELIVERED in active so user can Close it
      if (activeTab === "active") return activeStatuses.includes(load.status);
      return ["CLOSED", "CANCELLED"].includes(load.status);
  });

  const fetchData = async () => {
    try {
      // Fetch Profile
      const profileData = await apiRequest("/business/profile/me");
      setProfile(profileData);

      // Fetch My Loads
      const loadsData = await apiRequest("/loads/my-loads");
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
      await apiRequest("/loads", {
        method: "POST",
        body: JSON.stringify(formData)
      });

      toast.success("Load posted successfully!");
      setShowForm(false);
      setFormData({ origin: "", destination: "", cargoType: "", weight: "", price: "", pickupDate: "" });
      fetchData(); // Refresh list
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAssign = async (loadId, truckerId) => {
      try {
          await apiRequest(`/loads/${loadId}/assign`, {
              method: "PATCH",
              body: JSON.stringify({ truckerId }) // In this simple flow, backend knows the matched trucker, but good to be explicit if we had multiple applicants
          });
          toast.success("Trucker assigned!");
          fetchData();
      } catch (err) {
          toast.error(err.message);
      }
  };

  const handleClose = async (loadId) => {
      try {
          await apiRequest(`/loads/${loadId}/close`, { method: "PATCH" });
          toast.success("Load closed!");
          fetchData();
      } catch (err) {
          toast.error(err.message);
      }
  };

  const handleCancel = async (loadId) => {
      if(!window.confirm("Are you sure you want to cancel this load?")) return;
      try {
          await apiRequest(`/loads/${loadId}/cancel`, { method: "PATCH" });
          toast.info("Load cancelled.");
          fetchData();
      } catch (err) {
          toast.error(err.message);
      }
  };

  const handleTrack = async (loadId) => {
      try {
          const data = await apiRequest(`/loads/${loadId}`);
          setTrackingLoad(data);
          toast.info("Tracking data updated");
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
              <input name="vehicleTypeRequired" placeholder="Required Truck Type (e.g. Semi-Truck)" onChange={handleInputChange} required />
              <input name="weight" type="number" placeholder="Max Weight (Tons)" onChange={handleInputChange} required />
              <input name="price" type="number" placeholder="Price (₹)" onChange={handleInputChange} required />
              <input name="pickupDate" type="date" onChange={handleInputChange} required />
            </div>
            <button type="submit" className="btn-submit">Submit Load</button>
          </form>
        </section>
      )}

      {trackingLoad && (
          <section className="tracking-section" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '2px solid #00796B' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div>
                    <h2 style={{ margin: 0 }}>Tracking Load: {trackingLoad.load.cargoType}</h2>
                    <p style={{ margin: '5px 0' }}>Status: <strong>{trackingLoad.load.status}</strong></p>
                    <p style={{ margin: '5px 0' }}>Trucker: {trackingLoad.load.assignedTo?.name} ({trackingLoad.truckerProfile?.licensePlate || 'N/A'})</p>
                </div>
                <button className="btn-sm" onClick={() => setTrackingLoad(null)}>Close Tracker</button>
              </div>
              <MapComponent 
                lat={trackingLoad.truckerProfile?.currentLocation?.coordinates?.[1]} 
                lng={trackingLoad.truckerProfile?.currentLocation?.coordinates?.[0]} 
                title="Trucker Last Known Location"
              />
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
          <h2>Active</h2>
          <p>{loads.filter(l => ['POSTED','MATCHED','ASSIGNED','IN_TRANSIT'].includes(l.status)).length}</p>
        </div>
        <div className="summary-card">
          <h2>Completed</h2>
          <p>{loads.filter(l => l.status === 'CLOSED').length}</p>
        </div>
      </section>

      <main className="dashboard-main">
        <div className="table-container">
          <div className="tabs" style={{ marginBottom: '15px', borderBottom: '1px solid #ddd' }}>
              <button 
                  onClick={() => setActiveTab("active")}
                  style={{ 
                      padding: '10px 20px', 
                      marginRight: '10px',
                      background: 'none',
                      border: 'none',
                      borderBottom: activeTab === 'active' ? '2px solid #00796B' : 'none',
                      color: activeTab === 'active' ? '#00796B' : '#666',
                      fontWeight: activeTab === 'active' ? '600' : '400',
                      cursor: 'pointer'
                  }}
              >
                  Active Shipments
              </button>
              <button 
                  onClick={() => setActiveTab("history")}
                  style={{ 
                      padding: '10px 20px', 
                      background: 'none',
                      border: 'none',
                      borderBottom: activeTab === 'history' ? '2px solid #00796B' : 'none',
                      color: activeTab === 'history' ? '#00796B' : '#666',
                      fontWeight: activeTab === 'history' ? '600' : '400',
                      cursor: 'pointer'
                  }}
              >
                  History
              </button>
          </div>

          <h2>{activeTab === 'active' ? 'Active Shipments' : 'Past Shipments'}</h2>
          <table>
            <thead>
              <tr>
                <th>Cargo</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Assigned Trucker</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoads.map(load => (
                <tr key={load._id}>
                  <td>{load.cargoType}</td>
                  <td>{load.origin}</td>
                  <td>{load.destination}</td>
                  <td><span className={`status-badge ${load.status.toLowerCase()}`}>{load.status}</span></td>
                  <td>
                    {load.assignedTo ? (
                      <div>
                        <strong>{load.assignedTo.name}</strong>
                        <br />
                        <small>{load.assignedTo.email}</small>
                      </div>
                    ) : (
                      <span className="text-muted">Pending</span>
                    )}
                  </td>
                  <td>₹ {load.price}</td>
                  <td>
                      {load.status === 'MATCHED' && (
                          <button className="btn-sm btn-action" onClick={() => handleAssign(load._id, load.assignedTo._id)}>
                              Confirm Assignment
                          </button>
                      )}
                      {load.status === 'DELIVERED' && (
                          <button className="btn-sm btn-action" onClick={() => handleClose(load._id)}>
                              Close & Verify
                          </button>
                      )}
                      {['IN_TRANSIT', 'DELIVERED'].includes(load.status) && (
                          <button className="btn-sm" onClick={() => handleTrack(load._id)} style={{marginLeft: '5px'}}>
                              Track
                          </button>
                      )}
                      {(load.status === 'POSTED' || load.status === 'MATCHED') && (
                          <button className="btn-sm btn-danger" onClick={() => handleCancel(load._id)} style={{marginLeft: '5px', color: 'red', borderColor: 'red'}}>
                              Cancel
                          </button>
                      )}
                  </td>
                </tr>
              ))}
              {filteredLoads.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>No {activeTab} loads found.</td>
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
