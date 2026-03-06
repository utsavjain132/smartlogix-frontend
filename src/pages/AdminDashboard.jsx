import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://93fd18fg-5000.inc1.devtunnels.ms/api";

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

  if (loading) return <div className="p-8">Loading Admin Panel...</div>;

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Control Center</h1>
        <div className="flex gap-2">
          <button className={`px-4 py-2 border rounded text-base cursor-pointer transition-colors ${view === 'stats' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`} onClick={() => setView("stats")}>Overview</button>
          <button className={`px-4 py-2 border rounded text-base cursor-pointer transition-colors ${view === 'users' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`} onClick={() => setView("users")}>Users</button>
          <button className={`px-4 py-2 border rounded text-base cursor-pointer transition-colors ${view === 'loads' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`} onClick={() => setView("loads")}>All Loads</button>
        </div>
      </header>

      {view === "stats" && stats && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Total Loads</h2>
            <p className="text-3xl font-bold text-gray-900">{stats.totalLoads}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Businesses</h2>
            <p className="text-3xl font-bold text-gray-900">{stats.businessUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Truckers</h2>
            <p className="text-3xl font-bold text-gray-900">{stats.truckerUsers}</p>
          </div>
        </section>
      )}

      {view === "users" && (
        <main className="bg-white p-8 rounded-lg shadow">
          <div className="w-full overflow-x-auto">
            <h2 className="text-xl font-semibold mb-6">Platform Users</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="pb-4 border-b font-semibold text-gray-600">Name</th>
                  <th className="pb-4 border-b font-semibold text-gray-600">Email</th>
                  <th className="pb-4 border-b font-semibold text-gray-600">Role</th>
                  <th className="pb-4 border-b font-semibold text-gray-600">Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td className="py-4 border-b border-gray-100">{u.name}</td>
                    <td className="py-4 border-b border-gray-100">{u.email}</td>
                    <td className="py-4 border-b border-gray-100">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        u.role === 'admin' ? 'bg-yellow-400 text-black' : 
                        u.role === 'business' ? 'bg-blue-500 text-white' : 
                        'bg-green-500 text-white'
                      }`}>{u.role}</span>
                    </td>
                    <td className="py-4 border-b border-gray-100">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {view === "loads" && (
        <main className="bg-white p-8 rounded-lg shadow">
          <div className="w-full overflow-x-auto">
            <h2 className="text-xl font-semibold mb-6">All Freight Records</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="pb-4 border-b font-semibold text-gray-600">Origin</th>
                  <th className="pb-4 border-b font-semibold text-gray-600">Destination</th>
                  <th className="pb-4 border-b font-semibold text-gray-600">Status</th>
                  <th className="pb-4 border-b font-semibold text-gray-600">Price</th>
                  <th className="pb-4 border-b font-semibold text-gray-600">Created By</th>
                </tr>
              </thead>
              <tbody>
                {loads.map(l => (
                  <tr key={l._id}>
                    <td className="py-4 border-b border-gray-100">{l.origin}</td>
                    <td className="py-4 border-b border-gray-100">{l.destination}</td>
                    <td className="py-4 border-b border-gray-100">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        l.status === 'POSTED' ? 'bg-blue-100 text-blue-800' : 
                        l.status === 'MATCHED' ? 'bg-yellow-100 text-yellow-800' : 
                        l.status === 'ASSIGNED' ? 'bg-indigo-100 text-indigo-800' : 
                        l.status === 'IN_TRANSIT' ? 'bg-orange-100 text-orange-800' : 
                        'bg-green-100 text-green-800'
                      }`}>{l.status}</span>
                    </td>
                    <td className="py-4 border-b border-gray-100">₹ {l.price}</td>
                    <td className="py-4 border-b border-gray-100">{l.createdBy?.name || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      <footer className="text-center mt-8 text-gray-500">
        <p>&copy; 2025 SmartLogix Admin. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
