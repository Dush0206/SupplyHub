import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Clock, MapPin, CheckCircle2, ShieldAlert } from 'lucide-react';

const AlertCenter = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    fetch('http://localhost:8000/api/alerts')
      .then(res => res.json())
      .then(data => setAlerts(data))
      .catch(() => {});
  }, []);

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'Critical':
        return <span style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', background: '#FEE2E2', color: '#B91C1C', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>🔴 Critical Stockout Risk</span>;
      case 'Warning':
        return <span style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', background: '#FFEDD5', color: '#C2410C', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>🟠 Supplier Delay Risk</span>;
      case 'Low Inventory':
        return <span style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', background: '#FEF3C7', color: '#B45309', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>🟡 Low Inventory</span>;
      case 'Demand Increase':
        return <span style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', background: '#DBEAFE', color: '#1E40AF', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>🔵 Demand Increase</span>;
      default:
        return <span style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', background: '#F3E8FF', color: '#6B21A8', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>🟣 Forecast Anomaly</span>;
    }
  };

  const filteredAlerts = selectedFilter === 'All' ? alerts : alerts.filter(a => a.severity === selectedFilter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>Alert Center</h1>
        <p style={{ margin: '0.25rem 0 0 0', color: '#64748B', fontSize: '0.9rem' }}>Real-time supply chain risk notifications and prescriptive mitigation triggers</p>
      </div>

      {/* Severity Filter Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {['All', 'Critical', 'Warning', 'Info'].map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '8px',
              background: selectedFilter === f ? '#2563EB' : '#fff',
              color: selectedFilter === f ? '#fff' : '#0F172A',
              border: selectedFilter === f ? 'none' : '1px solid #CBD5E1',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {f === 'All' ? 'All Alerts' : `${f} Alerts`}
          </button>
        ))}
      </div>

      {/* Alert Feed Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredAlerts.map((alert, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', borderLeft: alert.severity === 'Critical' ? '4px solid #EF4444' : '4px solid #F59E0B' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {getSeverityBadge(alert.severity)}
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
                  {alert.product} ({alert.location})
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={14} /> Expected: {alert.expected_date}
              </span>
            </div>

            <p style={{ margin: '0 0 0.85rem 0', color: '#334155', fontSize: '0.9rem', lineHeight: '1.5' }}>
              {alert.message}
            </p>

            <div style={{ background: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.82rem', color: '#1E40AF', fontWeight: 600 }}>
                💡 Recommended Action: {alert.recommended_action}
              </div>
              <button style={{ padding: '0.35rem 0.85rem', borderRadius: '6px', background: '#2563EB', color: '#fff', border: 'none', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                Execute Resolution
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertCenter;
