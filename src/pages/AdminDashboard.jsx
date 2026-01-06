import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './AdminDashboard.css';

const API_BASE_URL = "http://localhost:5000/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("stats");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [statsRes, usersRes, loadsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/stats`, { headers }),
        fetch(`${API_BASE_URL}/admin/users`, { headers }),
        fetch(`${API_BASE_URL}/admin/loads`, { headers })
      ]);

      if (!statsRes.ok || !usersRes.ok || !loadsRes.ok) throw new Error("Failed to fetch admin data");

      setStats(await statsRes.json());
      setUsers(await usersRes.json());
      setLoads(await loadsRes.json());
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="dashboard-container">Loading Admin Panel...</div>;

  return (
    <div className="dashboard-container admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Control Center</h1>
        <div className="dashboard-actions">
          <button className={`btn-secondary ${view === 'stats' ? 'active' : ''}`} onClick={() => setView("stats")}>Overview</button>
          <button className={`btn-secondary ${view === 'users' ? 'active' : ''}`} onClick={() => setView("users")}>Users</button>
          <button className={`btn-secondary ${view === 'loads' ? 'active' : ''}`} onClick={() => setView("loads")}>All Loads</button>
        </div>
      </header>

      {view === "stats" && stats && (
        <section className="dashboard-summary">
          <div className="summary-card">
            <h2>Total Users</h2>
            <p>{stats.totalUsers}</p>
          </div>
          <div className="summary-card">
            <h2>Total Loads</h2>
            <p>{stats.totalLoads}</p>
          </div>
          <div className="summary-card">
            <h2>Businesses</h2>
            <p>{stats.businessUsers}</p>
          </div>
          <div className="summary-card">
            <h2>Truckers</h2>
            <p>{stats.truckerUsers}</p>
          </div>
        </section>
      )}

      {view === "users" && (
        <main className="dashboard-main">
          <div className="table-container">
            <h2>Platform Users</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className={`role-badge ${u.role.toLowerCase()}`}>{u.role}</span></td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {view === "loads" && (
        <main className="dashboard-main">
          <div className="table-container">
            <h2>All Freight Records</h2>
            <table>
              <thead>
                <tr>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Created By</th>
                </tr>
              </thead>
              <tbody>
                {loads.map(l => (
                  <tr key={l._id}>
                    <td>{l.origin}</td>
                    <td>{l.destination}</td>
                    <td><span className={`status-badge ${l.status.toLowerCase()}`}>{l.status}</span></td>
                    <td>₹ {l.price}</td>
                    <td>{l.createdBy?.name || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      <footer className="dashboard-footer">
        <p>&copy; 2025 SmartLogix Admin. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
