import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, XCircle } from 'lucide-react';

const PurchaseOrders = () => {
  const [pos, setPos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/purchase-orders')
      .then(res => res.json())
      .then(data => {
        setPos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch POs:", err);
        setLoading(false);
      });
  }, []);

  const handleAction = (id, action) => {
    // In a real app, this would be a PUT request to the backend.
    setPos(pos.map(po => po.id === id ? { ...po, status: action } : po));
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Purchase Order Management</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Review and approve AI-generated replenishment orders.</p>
      </div>

      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading live data...</div>
        ) : (
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>PO Number</th>
                <th>Supplier</th>
                <th>Item & Qty</th>
                <th>Total Value</th>
                <th>AI Confidence</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pos.map((po) => (
                <tr key={po.id}>
                  <td style={{ fontWeight: 500, color: 'var(--primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={16} />
                      {po.id}
                    </div>
                  </td>
                  <td>{po.supplier}</td>
                  <td>{po.quantity.toLocaleString()}x {po.item}</td>
                  <td style={{ fontWeight: 600 }}>${po.total_cost.toLocaleString()}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{po.ai_confidence}%</td>
                  <td>
                    <span className={`status-badge ${po.status === 'Auto-Approved' || po.status === 'Approved' ? 'healthy' : po.status === 'Rejected' ? 'critical' : 'warning'}`}>
                      {po.status}
                    </span>
                  </td>
                  <td>
                    {po.status === 'Pending Approval' ? (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleAction(po.id, 'Approved')} style={{ background: 'none', border: 'none', color: 'var(--success)', cursor: 'pointer' }} title="Approve">
                          <CheckCircle size={20} />
                        </button>
                        <button onClick={() => handleAction(po.id, 'Rejected')} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }} title="Reject">
                          <XCircle size={20} />
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Processed</span>
                    )}
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

export default PurchaseOrders;
