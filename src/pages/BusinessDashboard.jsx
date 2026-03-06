import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiRequest } from '../services/api';
import MapComponent from '../components/MapComponent';

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

  // Simple coordinate mapping for demo purposes
  const CITY_COORDS = {
    "mumbai": [72.8777, 19.0760],
    "delhi": [77.1025, 28.7041],
    "bangalore": [77.5946, 12.9716],
    "hyderabad": [78.4867, 17.3850],
    "chennai": [80.2707, 13.0827],
    "kolkata": [88.3639, 22.5726],
    "pune": [73.8567, 18.5204],
    "jaipur": [75.7873, 26.9124],
    "ahmedabad": [72.5714, 23.0225],
    "surat": [72.8311, 21.1702],
    "lucknow": [80.9462, 26.8467],
    "kanpur": [80.3318, 26.4499],
    "nagpur": [79.0882, 21.1458],
    "indore": [75.8577, 22.7196],
    "thane": [72.9781, 19.2183],
    "bhopal": [77.4126, 23.2599],
    "visakhapatnam": [83.2185, 17.6868],
    "patna": [85.1376, 25.5941],
    "vadodara": [73.1812, 22.3072],
    "ghaziabad": [77.4538, 28.6692]
  };

  const handleSubmitLoad = async (e) => {
    e.preventDefault();
    try {
      // Auto-attach coordinates if city matches our list
      const originKey = formData.origin.toLowerCase().trim();
      const destKey = formData.destination.toLowerCase().trim();
      
      const payload = {
        ...formData,
        originCoords: CITY_COORDS[originKey] || null, // Backend handles null/undefined
        destinationCoords: CITY_COORDS[destKey] || null
      };

      await apiRequest("/loads", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      toast.success("Load posted successfully!");
      if (!payload.originCoords) toast.info("Note: Coordinates not found for origin. Tracking may be limited.");

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

  if (loading) return <div className="p-8 bg-teal-50 min-h-screen font-sans text-teal-900">Loading...</div>;
  if (error) return <div className="p-8 bg-teal-50 min-h-screen font-sans text-teal-900">Error: {error}</div>;

  return (
    <div className="p-8 bg-teal-50 min-h-screen font-sans text-teal-900">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{profile?.businessName || "Business Dashboard"}</h1>
        <div className="flex">
          <button className="px-6 py-3 border-none rounded-lg text-base font-medium cursor-pointer transition-all duration-300 bg-teal-700 text-white hover:bg-teal-800" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Post a New Load"}
          </button>
        </div>
      </header>

      {showForm && (
        <section className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Post New Shipment</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmitLoad}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <input className="p-2 border border-gray-300 rounded" name="origin" placeholder="Origin (e.g. Mumbai)" onChange={handleInputChange} required />
              <input className="p-2 border border-gray-300 rounded" name="destination" placeholder="Destination (e.g. Delhi)" onChange={handleInputChange} required />
              <input className="p-2 border border-gray-300 rounded" name="cargoType" placeholder="Cargo Type (e.g. Electronics)" onChange={handleInputChange} required />
              <input className="p-2 border border-gray-300 rounded" name="vehicleTypeRequired" placeholder="Required Truck Type (e.g. Semi-Truck)" onChange={handleInputChange} required />
              <input className="p-2 border border-gray-300 rounded" name="weight" type="number" placeholder="Max Weight (Tons)" onChange={handleInputChange} required />
              <input className="p-2 border border-gray-300 rounded" name="price" type="number" placeholder="Price (₹)" onChange={handleInputChange} required />
              <input className="p-2 border border-gray-300 rounded" name="pickupDate" type="date" onChange={handleInputChange} required />
              <select className="p-2 border border-gray-300 rounded" name="loadType" onChange={handleInputChange} required>
                <option value="FTL">Full Truck Load (FTL)</option>
                <option value="PTL">Partial Truck Load (PTL)</option>
              </select>
            </div>
            <button type="submit" className="self-start px-6 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors">Submit Load</button>
          </form>
        </section>
      )}

      {trackingLoad && (
          <section className="bg-white p-6 rounded-xl shadow-sm mb-6 border-2 border-teal-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-bold m-0">Tracking Load: {trackingLoad.load.cargoType}</h2>
                    <p className="my-1">Status: <strong>{trackingLoad.load.status}</strong></p>
                    <p className="my-1">Trucker: {trackingLoad.load.assignedTo?.name} ({trackingLoad.truckerProfile?.licensePlate || 'N/A'})</p>
                </div>
                <button className="px-3 py-1.5 text-xs rounded-md border border-teal-700 bg-transparent text-teal-700 hover:bg-teal-700 hover:text-white transition-all" onClick={() => setTrackingLoad(null)}>Close Tracker</button>
              </div>
              <MapComponent 
                lat={trackingLoad.truckerProfile?.currentLocation?.coordinates?.[1]} 
                lng={trackingLoad.truckerProfile?.currentLocation?.coordinates?.[0]} 
                title="Trucker Last Known Location"
              />
          </section>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-base font-medium text-gray-500 mb-2">Profile Details</h2>
          <p className="text-sm font-semibold text-teal-900"><strong>Contact:</strong> {profile?.contactPerson}</p>
          <p className="text-sm font-semibold text-teal-900"><strong>Location:</strong> {profile?.location?.city}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-base font-medium text-gray-500 mb-2">Total Loads</h2>
          <p className="text-3xl font-bold text-teal-900">{loads.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-base font-medium text-gray-500 mb-2">Active</h2>
          <p className="text-3xl font-bold text-teal-900">{loads.filter(l => ['POSTED','MATCHED','ASSIGNED','IN_TRANSIT'].includes(l.status)).length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-base font-medium text-gray-500 mb-2">Completed</h2>
          <p className="text-3xl font-bold text-teal-900">{loads.filter(l => l.status === 'CLOSED').length}</p>
        </div>
      </section>

      <main className="bg-white p-8 rounded-xl shadow-sm">
        <div className="w-full">
          <div className="mb-4 border-b border-gray-200">
              <button 
                  onClick={() => setActiveTab("active")}
                  className={`py-2 px-4 mr-2 border-none bg-transparent cursor-pointer font-semibold ${activeTab === 'active' ? 'text-teal-700 border-b-2 border-teal-700' : 'text-gray-500'}`}
              >
                  Active Shipments
              </button>
              <button 
                  onClick={() => setActiveTab("history")}
                  className={`py-2 px-4 bg-transparent border-none cursor-pointer font-semibold ${activeTab === 'history' ? 'text-teal-700 border-b-2 border-teal-700' : 'text-gray-500'}`}
              >
                  History
              </button>
          </div>

          <h2 className="text-2xl font-semibold mb-6">{activeTab === 'active' ? 'Active Shipments' : 'Past Shipments'}</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-sm font-semibold text-gray-500 pb-4 border-b-2 border-teal-100">Cargo</th>
                <th className="text-left text-sm font-semibold text-gray-500 pb-4 border-b-2 border-teal-100">Origin</th>
                <th className="text-left text-sm font-semibold text-gray-500 pb-4 border-b-2 border-teal-100">Destination</th>
                <th className="text-left text-sm font-semibold text-gray-500 pb-4 border-b-2 border-teal-100">Status</th>
                <th className="text-left text-sm font-semibold text-gray-500 pb-4 border-b-2 border-teal-100">Assigned Trucker</th>
                <th className="text-left text-sm font-semibold text-gray-500 pb-4 border-b-2 border-teal-100">Price</th>
                <th className="text-left text-sm font-semibold text-gray-500 pb-4 border-b-2 border-teal-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoads.map(load => (
                <tr key={load._id}>
                  <td className="py-4 border-b border-teal-100">{load.cargoType}</td>
                  <td className="py-4 border-b border-teal-100">{load.origin}</td>
                  <td className="py-4 border-b border-teal-100">{load.destination}</td>
                  <td className="py-4 border-b border-teal-100"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${load.status === 'POSTED' ? 'bg-blue-100 text-blue-800' : load.status === 'MATCHED' ? 'bg-yellow-100 text-yellow-800' : load.status === 'ASSIGNED' ? 'bg-indigo-100 text-indigo-800' : load.status === 'IN_TRANSIT' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>{load.status}</span></td>
                  <td className="py-4 border-b border-teal-100">
                    {load.assignedTo ? (
                      <div>
                        <strong>{load.assignedTo.name}</strong>
                        <br />
                        <small className="text-gray-500">{load.assignedTo.email}</small>
                      </div>
                    ) : (
                      <span className="text-gray-400">Pending</span>
                    )}
                  </td>
                  <td className="py-4 border-b border-teal-100">₹ {load.price}</td>
                  <td className="py-4 border-b border-teal-100 flex gap-2">
                      {load.status === 'MATCHED' && (
                          <button className="px-3 py-1.5 text-xs rounded-md border border-teal-700 bg-transparent text-teal-700 hover:bg-teal-700 hover:text-white transition-all" onClick={() => handleAssign(load._id, load.assignedTo._id)}>
                              Confirm Assignment
                          </button>
                      )}
                      {load.status === 'DELIVERED' && (
                          <button className="px-3 py-1.5 text-xs rounded-md border border-teal-700 bg-transparent text-teal-700 hover:bg-teal-700 hover:text-white transition-all" onClick={() => handleClose(load._id)}>
                              Close & Verify
                          </button>
                      )}
                      {['IN_TRANSIT', 'DELIVERED'].includes(load.status) && (
                          <button className="px-3 py-1.5 text-xs rounded-md border border-teal-700 bg-transparent text-teal-700 hover:bg-teal-700 hover:text-white transition-all" onClick={() => handleTrack(load._id)}>
                              Track
                          </button>
                      )}
                      {(load.status === 'POSTED' || load.status === 'MATCHED') && (
                          <button className="px-3 py-1.5 text-xs rounded-md border border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white transition-all" onClick={() => handleCancel(load._id)}>
                              Cancel
                          </button>
                      )}
                  </td>
                </tr>
              ))}
              {filteredLoads.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">No {activeTab} loads found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="text-center mt-8 text-gray-500">
        <p>&copy; 2025 SmartLogix. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BusinessDashboard;
