import React from 'react';

const MapComponent = ({ lat, lng, zoom = 13, title = "Location" }) => {
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
        Location not available
      </div>
    );
  }

  // OpenStreetMap Embed URL
  // bbox = left, bottom, right, top
  // For a simple marker, we use the export/embed.html with layer=mapnik
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01}%2C${lat-0.01}%2C${lng+0.01}%2C${lat+0.01}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="map-wrapper" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #B2DFDB' }}>
      <iframe
        width="100%"
        height="300"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={osmUrl}
        title={title}
        style={{ border: 'none' }}
      ></iframe>
      <div style={{ padding: '8px', fontSize: '0.8rem', backgroundColor: '#fff', textAlign: 'center' }}>
        <a 
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#00796B', textDecoration: 'none' }}
        >
          View Larger Map
        </a>
      </div>
    </div>
  );
};

export default MapComponent;
