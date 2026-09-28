import React, { useState, useEffect } from 'react';
import { Truck, ShieldAlert, CheckCircle2, AlertTriangle, DollarSign, Clock } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/suppliers/risk')
      .then(res => res.json())
      .then(data => setSuppliers(data))
      .catch(() => {});
  }, []);

  const comparisonData = suppliers.map(s => ({
    name: s.name,
    Reliability: Math.round(s.reliability_score * 100),
    Quality: Math.round(s.quality_score * 100),
    LeadTimeDays: s.lead_time_days
  }));

  const getRiskBadge = (level) => {
    if (level === 'Low Risk') {
      return <span style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', background: '#DCFCE7', color: '#15803D', fontSize: '0.75rem', fontWeight: 700 }}>Low Risk</span>;
    }
    if (level === 'Medium Risk') {
      return <span style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', background: '#FEF3C7', color: '#B45309', fontSize: '0.75rem', fontWeight: 700 }}>Medium Risk</span>;
    }
    return <span style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', background: '#FEE2E2', color: '#B91C1C', fontSize: '0.75rem', fontWeight: 700 }}>High Risk</span>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>Supplier Risk Assessment</h1>
        <p style={{ margin: '0.25rem 0 0 0', color: '#64748B', fontSize: '0.9rem' }}>Vendor performance matrix, lead time variance & composite risk level tracking</p>
      </div>

      {/* Supplier Performance Table */}
      <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>Vendor Evaluation Matrix</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#64748B', fontWeight: 700 }}>
                <th style={{ padding: '0.75rem 1rem' }}>Supplier</th>
                <th style={{ padding: '0.75rem 1rem' }}>Location</th>
                <th style={{ padding: '0.75rem 1rem' }}>Price Index</th>
                <th style={{ padding: '0.75rem 1rem' }}>Lead Time</th>
                <th style={{ padding: '0.75rem 1rem' }}>Reliability</th>
                <th style={{ padding: '0.75rem 1rem' }}>Quality Score</th>
                <th style={{ padding: '0.75rem 1rem' }}>Capacity Risk</th>
                <th style={{ padding: '0.75rem 1rem' }}>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0F172A' }}>{s.name}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>{s.location}</td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{s.price_index?.toFixed(2)}x</td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{s.lead_time_days} Days</td>
                  <td style={{ padding: '0.75rem 1rem', color: s.reliability_score > 0.9 ? '#10B981' : '#EF4444', fontWeight: 700 }}>
                    {(s.reliability_score * 100).toFixed(0)}%
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: '#2563EB', fontWeight: 600 }}>
                    {(s.quality_score * 100).toFixed(0)}%
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: s.capacity_risk === 'High' ? '#EF4444' : '#64748B' }}>{s.capacity_risk}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{getRiskBadge(s.risk_level)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supplier Comparison Chart */}
      <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>Supplier Reliability (%) vs Quality Score (%)</h3>
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 100]} />
              <Tooltip formatter={(val) => [`${val}%`]} />
              <Legend />
              <Bar dataKey="Reliability" fill="#2563EB" radius={[4, 4, 0, 0]} name="Reliability Score (%)" />
              <Bar dataKey="Quality" fill="#10B981" radius={[4, 4, 0, 0]} name="Quality Score (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
