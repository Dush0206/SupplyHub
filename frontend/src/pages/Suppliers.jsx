import React, { useState, useEffect } from 'react';
import LogisticsMap from '../components/LogisticsMap';
import { Download } from 'lucide-react';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/suppliers')
      .then(res => res.json())
      .then(data => {
        setSuppliers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch suppliers:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0' }}>Supplier Network</h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Monitor supplier risk, delivery routes, and performance.</p>
        </div>
        <button className="enterprise-btn">
          <Download size={16} />
          Export Report
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '1rem', marginBottom: '2rem' }}>
        <LogisticsMap />
      </div>

      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Supplier Directory</h2>
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading live data...</div>
        ) : (
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Supplier Name</th>
                <th>Location</th>
                <th>Reliability Score</th>
                <th>Avg Lead Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((sup) => {
                const reliabilityPercent = `${(sup.reliability_score * 100).toFixed(0)}%`;
                return (
                  <tr key={sup.id}>
                    <td style={{ color: 'var(--text-secondary)' }}>{sup.id}</td>
                    <td style={{ fontWeight: 500 }}>{sup.name}</td>
                    <td>{sup.location}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '50px', height: '6px', background: 'rgba(0,0,0,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: reliabilityPercent, height: '100%', background: sup.reliability_score > 0.9 ? 'var(--success)' : 'var(--danger)' }}></div>
                        </div>
                        {reliabilityPercent}
                      </div>
                    </td>
                    <td>{sup.lead_time_days} days</td>
                    <td>
                      <span className={`status-badge ${sup.status.toLowerCase()}`}>
                        {sup.status}
                      </span>
                    </td>
                    <td>
                      <button className="text-btn">View Profile</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Suppliers;
