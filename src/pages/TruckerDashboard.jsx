import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiRequest } from '../services/api';
import MapComponent from '../components/MapComponent';

const TruckerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [availableLoads, setAvailableLoads] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const syncLocation = async (isManual = false) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          await apiRequest("/trucker/location", {
            method: "PATCH",
            body: JSON.stringify({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            })
          });
          // Refresh profile after sync to get updated coords for the map
          const profileData = await apiRequest("/trucker/profile/me");
          setProfile(profileData);
          if (isManual) {
            toast.info("Location synced");
          }
        } catch (err) {
          console.error("Location sync failed", err);
          if (isManual) {
             toast.error("Failed to sync location");
          }
        }
      });
    }
  };

  const fetchData = async () => {
    try {
      // Fetch Profile
      const profileData = await apiRequest("/trucker/profile/me");
      setProfile(profileData);

      // Sync location once on load (silent)
      syncLocation(false);

      // Fetch Available Loads
      const loadsData = await apiRequest("/loads/available");
      setAvailableLoads(loadsData);

      // Fetch My Jobs (Active & Completed)
      const jobsData = await apiRequest("/loads/my-jobs");
      setMyJobs(jobsData);

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
      await apiRequest(`/loads/${loadId}/accept`, { method: "PATCH" });
      toast.success("Interest registered! Waiting for business approval.");
      fetchData(); // Refresh the list
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePickupLoad = async (loadId) => {
    try {
      await apiRequest(`/loads/${loadId}/pickup`, { method: "PATCH" });
      toast.success("Load picked up! Drive safe.");
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeliverLoad = async (loadId) => {
    try {
      await apiRequest(`/loads/${loadId}/deliver`, { method: "PATCH" });
      toast.success("Load delivered! Waiting for verification.");
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Derived Data
  const activeJob = myJobs.find(job => ["MATCHED", "ASSIGNED", "IN_TRANSIT"].includes(job.status));
  const completedJobs = myJobs.filter(job => ["DELIVERED", "CLOSED", "CANCELLED"].includes(job.status));
  const totalEarnings = completedJobs.filter(j => j.status === 'CLOSED').reduce((sum, job) => sum + (job.price || 0), 0); // Only count earnings for CLOSED (verified) jobs

  if (loading) return <div className="p-8 text-center text-slate-500">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Trucker Dashboard</h1>
        <div className="flex gap-4">
          <button 
            className="px-6 py-2.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-sm"
            onClick={() => document.getElementById('available-loads').scrollIntoView({ behavior: 'smooth' })}
          >
            Find New Loads
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-sm font-medium text-slate-500 mb-2">My Rig</h2>
          <p className="text-lg font-semibold text-slate-900">Vehicle: <span className="font-normal">{profile?.vehicleType}</span></p>
          <p className="text-sm text-slate-600 mt-1">Capacity: {profile?.availableCapacity} / {profile?.capacity} Tons</p>
          <p className="text-sm text-slate-600">Base: {profile?.currentLocation?.city}</p>
        </div>
        
        {activeJob ? (
          <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-green-500 col-span-1 md:col-span-2 lg:col-span-2 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-sm font-medium text-green-600 uppercase tracking-wide">Current Job: {activeJob.status}</h2>
                <p className="text-xl font-bold text-slate-900 mt-1">To: {activeJob.destination}</p>
                <p className="text-lg font-semibold text-slate-700">Pay: ₹ {activeJob.price}</p>
              </div>
              {activeJob.status === "MATCHED" && (
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">Pending Approval</span>
              )}
            </div>
            
            <div className="my-4 h-48 rounded-lg overflow-hidden border border-slate-200">
              <MapComponent 
                lat={profile?.currentLocation?.coordinates?.[1]} 
                lng={profile?.currentLocation?.coordinates?.[0]} 
                destLat={activeJob?.destinationLocation?.coordinates?.[1]}
                destLng={activeJob?.destinationLocation?.coordinates?.[0]}
                title="Your Current Location"
              />
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
                {activeJob.status === "ASSIGNED" && (
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium"
                      onClick={() => handlePickupLoad(activeJob._id)}
                    >
                    Confirm Pickup
                    </button>
                )}

                {activeJob.status === "IN_TRANSIT" && (
                    <button 
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm text-sm font-medium"
                      onClick={() => handleDeliverLoad(activeJob._id)}
                    >
                    Confirm Delivery
                    </button>
                )}

                <button 
                  onClick={() => syncLocation(true)} 
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium bg-white"
                >
                    Update GPS
                </button>
            </div>

             {activeJob.status === "MATCHED" && (
                <p className="mt-3 text-sm text-slate-500 italic">Waiting for Business Approval...</p>
            )}
          </div>
        ) : (
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-sm font-medium text-slate-500 mb-2">Active Job</h2>
            <p className="text-xl font-bold text-slate-400">None</p>
            <p className="text-sm text-slate-500 mt-2">Search available loads below</p>
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-sm font-medium text-slate-500 mb-2">Completed Trips</h2>
          <p className="text-3xl font-bold text-slate-900">{completedJobs.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-sm font-medium text-slate-500 mb-2">Verified Earnings</h2>
          <p className="text-3xl font-bold text-slate-900">₹ {totalEarnings.toLocaleString()}</p>
        </div>
      </section>

      <main className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 mb-8" id="available-loads">
        <div className="overflow-x-auto">
          <h2 className="text-xl font-semibold mb-6 text-slate-900">Available Loads Near You</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="pb-4 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">Cargo</th>
                <th className="pb-4 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="pb-4 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">Origin</th>
                <th className="pb-4 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">Destination</th>
                <th className="pb-4 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">Payout</th>
                <th className="pb-4 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">Weight</th>
                <th className="pb-4 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {availableLoads.map(load => (
                <tr key={load._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 text-slate-900 font-medium">{load.cargoType}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      load.loadType === 'FTL' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {load.loadType}
                    </span>
                  </td>
                  <td className="py-4 text-slate-600">{load.origin}</td>
                  <td className="py-4 text-slate-600">{load.destination}</td>
                  <td className="py-4 text-slate-900 font-semibold">₹ {load.price}</td>
                  <td className="py-4 text-slate-600">{load.weight} Tons</td>
                  <td className="py-4">
                    {!activeJob && (
                        <button 
                        className="px-3 py-1.5 text-sm rounded border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-colors" 
                        onClick={() => handleAcceptLoad(load._id)}
                        >
                        Request Load
                        </button>
                    )}
                    {activeJob && <span className="text-xs text-slate-400 italic">Finish current job first</span>}
                  </td>
                </tr>
              ))}
              {availableLoads.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">No available loads found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {completedJobs.length > 0 && (
            <div className="mt-12 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-6 text-slate-900">Job History</h2>
            <table className="w-full text-left border-collapse">
                <thead>
                <tr>
                    <th className="pb-4 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="pb-4 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">Route</th>
                    <th className="pb-4 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="pb-4 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">Earnings</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {completedJobs.map(job => (
                    <tr key={job._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 text-slate-600">{new Date(job.updatedAt).toLocaleDateString()}</td>
                    <td className="py-4 text-slate-600">{job.origin} → {job.destination}</td>
                    <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            job.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 
                            job.status === 'CLOSED' ? 'bg-slate-100 text-slate-800' : 'bg-red-100 text-red-800'
                        }`}>
                            {job.status}
                        </span>
                    </td>
                    <td className="py-4 text-slate-900 font-medium">₹ {job.status === 'CLOSED' ? job.price : 0}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
      </main>

      <footer className="text-center mt-12 mb-4 text-slate-400 text-sm">
        <p>&copy; 2025 SmartLogix. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TruckerDashboard;
