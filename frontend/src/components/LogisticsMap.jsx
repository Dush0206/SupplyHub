import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LogisticsMap = () => {
  const [suppliers, setSuppliers] = useState([]);
  
  // Hub location (e.g., Chicago)
  const hubPosition = [41.8781, -87.6298];

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/suppliers')
      .then(res => res.json())
      .then(data => setSuppliers(data))
      .catch(err => console.error("Failed to fetch map data:", err));
  }, []);

  return (
    <div style={{ width: '100%', height: '400px', marginTop: '2rem', borderRadius: '12px', overflow: 'hidden' }}>
      <h3 style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.9)', margin: 0, color: 'var(--text-secondary)' }}>
        Real-Time Logistics Optimization Map
      </h3>
      <MapContainer center={[38.0, -95.0]} zoom={4} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          className="map-tiles"
        />
        
        {/* Hub Marker */}
        <Marker position={hubPosition}>
          <Popup>
            <strong>Central Hub</strong><br/>Chicago, IL
          </Popup>
        </Marker>

        {/* Supplier Markers and Route Lines */}
        {suppliers.filter(s => s.lat && s.lng).map((supplier) => (
          <React.Fragment key={supplier.id}>
            <Marker position={[supplier.lat, supplier.lng]}>
              <Popup>
                <strong>{supplier.name}</strong><br/>Status: {supplier.status}
              </Popup>
            </Marker>
            <Polyline 
              positions={[hubPosition, [supplier.lat, supplier.lng]]} 
              color={supplier.status.includes('Delay') || supplier.status === 'Warning' ? '#ef4444' : '#10b981'} 
              dashArray="5, 10"
              weight={3}
              opacity={0.7}
            />
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default LogisticsMap;
