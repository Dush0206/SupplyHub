import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, CheckCircle2, RotateCcw, Lightbulb, Play, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('Laptop');
  const [reorderResult, setReorderResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/inventory/status')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(() => {});
  }, []);

  const handleGenerateReorder = () => {
    setLoading(true);
    fetch('http://localhost:8000/api/inventory/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: selectedProduct })
    })
      .then(res => res.json())
      .then(data => {
        setReorderResult(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const currentVsRequiredData = items.map(item => ({
    name: item.item_name,
    Current: item.quantity,
    Required: item.predicted_demand + item.safety_stock
  }));

  const getStatusBadge = (status) => {
    if (status === 'Healthy') {
      return <span style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', background: '#DCFCE7', color: '#15803D', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle2 size={12} /> Healthy</span>;
    }
    if (status === 'Low Stock') {
      return <span style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', background: '#FEF3C7', color: '#B45309', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><AlertTriangle size={12} /> Low Stock</span>;
    }
    return <span style={{ padding: '0.25rem 0.6rem', borderRadius: '12px', background: '#FEE2E2', color: '#B91C1C', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><AlertTriangle size={12} /> Critical</span>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>Inventory Intelligence</h1>
        <p style={{ margin: '0.25rem 0 0 0', color: '#64748B', fontSize: '0.9rem' }}>Real-time stock monitoring, reorder point calculations & automated replenishment recommendations</p>
      </div>

      {/* Main Inventory Data Table */}
      <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>
          Product Stock & Demand Matrix
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#64748B', fontWeight: 700 }}>
                <th style={{ padding: '0.75rem 1rem' }}>Product</th>
                <th style={{ padding: '0.75rem 1rem' }}>Current Stock</th>
                <th style={{ padding: '0.75rem 1rem' }}>Predicted Demand</th>
                <th style={{ padding: '0.75rem 1rem' }}>Safety Stock</th>
                <th style={{ padding: '0.75rem 1rem' }}>Reorder Point</th>
                <th style={{ padding: '0.75rem 1rem' }}>Stockout Risk</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9', background: item.item_name === selectedProduct ? '#F0F9FF' : 'transparent', cursor: 'pointer' }} onClick={() => setSelectedProduct(item.item_name)}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0F172A' }}>{item.item_name}</td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{item.quantity?.toLocaleString()} units</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#2563EB', fontWeight: 600 }}>{item.predicted_demand?.toLocaleString()} units</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>{item.safety_stock?.toLocaleString()} units</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>{item.reorder_point?.toLocaleString()} units</td>
                  <td style={{ padding: '0.75rem 1rem', color: item.stockout_risk_pct > 50 ? '#EF4444' : '#10B981', fontWeight: 700 }}>{item.stockout_risk_pct}%</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reorder Recommendation Engine Section */}
      <div className="glass-panel" style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', borderLeft: '4px solid #2563EB' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lightbulb color="#2563EB" size={20} /> Reorder Recommendation Engine
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Selected Product for Decision Optimization: <strong>{selectedProduct}</strong></span>
          </div>

          <button 
            onClick={handleGenerateReorder}
            disabled={loading}
            style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', background: '#2563EB', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(37,99,235,0.25)' }}
          >
            <Play size={16} fill="#fff" /> {loading ? 'Computing EOQ...' : 'Generate Reorder Recommendation'}
          </button>
        </div>

        {reorderResult && (
          <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#fff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>CURRENT STOCK</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A' }}>{reorderResult.current_inventory?.toLocaleString()} units</div>
              </div>
              <div style={{ background: '#fff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>PREDICTED DEMAND</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2563EB' }}>{reorderResult.predicted_demand?.toLocaleString()} units</div>
              </div>
              <div style={{ background: '#fff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>SAFETY STOCK</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#64748B' }}>{reorderResult.safety_stock?.toLocaleString()} units</div>
              </div>
              <div style={{ background: '#fff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>REORDER POINT</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#F59E0B' }}>{reorderResult.reorder_point?.toLocaleString()} units</div>
              </div>
              <div style={{ background: '#EFF6FF', padding: '0.75rem', borderRadius: '8px', border: '1px solid #BFDBFE' }}>
                <span style={{ fontSize: '0.75rem', color: '#1E40AF', fontWeight: 700 }}>RECOMMENDED ORDER</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2563EB' }}>{reorderResult.recommended_order?.toLocaleString()} units</div>
              </div>
              <div style={{ background: '#FFF7ED', padding: '0.75rem', borderRadius: '8px', border: '1px solid #FFEDD5' }}>
                <span style={{ fontSize: '0.75rem', color: '#9A3412', fontWeight: 700 }}>ORDER DATE</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#C2410C' }}>{reorderResult.recommended_order_date}</div>
              </div>
            </div>

            <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', color: '#334155', fontSize: '0.88rem', lineHeight: '1.5' }}>
              <strong>Business Rationale:</strong> {reorderResult.explanation}
            </div>
          </div>
        )}
      </div>

      {/* Inventory Charts */}
      <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>Current vs Required Inventory Comparison</h3>
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentVsRequiredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
              <YAxis stroke="#94A3B8" fontSize={11} />
              <Tooltip formatter={(val) => [`${val.toLocaleString()} units`]} />
              <Bar dataKey="Current" fill="#2563EB" radius={[4, 4, 0, 0]} name="Current Stock" />
              <Bar dataKey="Required" fill="#F97316" radius={[4, 4, 0, 0]} name="Required (Demand + Safety)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
