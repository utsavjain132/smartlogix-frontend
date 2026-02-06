import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';

// Fix for default marker icons in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapComponent = ({ lat, lng, destLat, destLng, title = "Location" }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const routingControl = useRef(null);

  useEffect(() => {
    if (!lat || !lng || (lat === 0 && lng === 0)) return;

    // Initialize map if not already done
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([lat, lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstance.current);
    } else {
      mapInstance.current.setView([lat, lng]);
    }

    // Handle Routing
    if (destLat && destLng && (destLat !== 0 || destLng !== 0)) {
      // Remove existing route if any
      if (routingControl.current) {
        mapInstance.current.removeControl(routingControl.current);
      }

      // Add new route
      routingControl.current = L.Routing.control({
        waypoints: [
          L.latLng(lat, lng),
          L.latLng(destLat, destLng)
        ],
        lineOptions: {
          styles: [{ color: '#00796B', weight: 6 }]
        },
        createMarker: function(i, waypoint, n) {
          const markerLabel = i === 0 ? "You" : "Destination";
          return L.marker(waypoint.latLng).bindPopup(markerLabel);
        },
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false
      }).addTo(mapInstance.current);
    } else {
      // Just add a single marker if no destination
      L.marker([lat, lng]).addTo(mapInstance.current).bindPopup(title).openPopup();
    }

    return () => {
      // Cleanup on unmount handled by ref check
    };
  }, [lat, lng, destLat, destLng, title]);

  if (!lat || !lng || (lat === 0 && lng === 0)) {
    return (
      <div style={{ 
        height: '300px', 
        width: '100%', 
        backgroundColor: '#f0f0f0', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: '8px',
        border: '1px solid #ddd',
        color: '#666'
      }}>
        Location coordinates missing. Ensure GPS is enabled.
      </div>
    );
  }

  return (
    <div className="map-wrapper" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #B2DFDB', position: 'relative' }}>
      <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
      <style>{`
        .leaflet-routing-container {
          background-color: white;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          max-height: 150px;
          overflow-y: auto;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};

export default MapComponent;
