import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/inventory')
      .then(res => res.json())
      .then(data => {
        setInventory(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch inventory:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Inventory & Shelf-Life Management</h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Track live stock levels, EOQ, and perishability risks.</p>
        </div>
        <button className="enterprise-btn">
          <Download size={16} />
          Export to CSV
        </button>
      </div>

      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading live data...</div>
        ) : (
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Current Qty</th>
                <th>Safety Stock</th>
                <th>Calculated EOQ</th>
                <th>Exp. Date</th>
                <th>Spoilage Risk</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td style={{ color: 'var(--text-secondary)' }}>{item.id}</td>
                  <td style={{ fontWeight: 500 }}>{item.item_name}</td>
                  <td>{item.quantity.toLocaleString()}</td>
                  <td>{item.safety_stock.toLocaleString()}</td>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{item.eoq.toLocaleString()}</td>
                  <td>{item.expiry_date}</td>
                  <td>
                    <span style={{ color: item.spoilage_risk === 'High' ? 'var(--danger)' : item.spoilage_risk === 'Medium' ? 'var(--warning)' : 'var(--text-secondary)', fontWeight: 500 }}>
                      {item.spoilage_risk}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="text-btn">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Inventory;
