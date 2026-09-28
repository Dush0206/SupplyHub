import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Package, 
  AlertTriangle, 
  ShieldAlert, 
  RotateCw, 
  ShoppingCart, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  Lightbulb 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';

const Dashboard = () => {
  const [kpis, setKpis] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch KPI data
    fetch('http://localhost:8000/api/dashboard/kpi')
      .then(res => res.json())
      .then(data => setKpis(data))
      .catch(() => {
        // Fallback demo KPIs
        setKpis({
          predicted_demand_30d: 32400,
          current_inventory: 35850,
          stockout_risk_pct: 20.0,
          supplier_risk_index: 12.4,
          inventory_turnover: 6.8,
          pending_reorders: 3
        });
      });

    // Fetch Forecast Chart Data
    fetch('http://localhost:8000/api/demand/forecast?product=Laptop&horizon=30')
      .then(res => res.json())
      .then(data => {
        setForecastData(data.chart_data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const inventoryHealthData = [
    { name: 'Healthy', value: 7, color: '#10B981' },
    { name: 'Low Stock', value: 2, color: '#F59E0B' },
    { name: 'Critical', value: 1, color: '#EF4444' },
  ];

  const supplierRiskData = [
    { name: 'Global Supply Co', risk: 2.0 },
    { name: 'Cheap Parts Inc', risk: 18.0 },
    { name: 'Premium Logistics', risk: 1.0 },
    { name: 'TechComponents', risk: 9.0 },
    { name: 'Apex Hardware', risk: 12.0 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>AI Supply Chain Intelligence</h1>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748B', fontSize: '0.9rem' }}>Real-time machine learning predictions, risk monitoring & prescriptive optimization</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#fff', border: '1px solid #E2E8F0', color: '#0F172A', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RotateCw size={16} /> Refresh ML Models
          </button>
          <button style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#2563EB', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
            Export Executive Report
          </button>
        </div>
      </div>

      {/* 6 KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        {/* KPI 1: Predicted Demand */}
        <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>PREDICTED DEMAND (30D)</span>
            <TrendingUp size={20} color="#F97316" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>
            {kpis?.predicted_demand_30d?.toLocaleString() || '32,400'} <span style={{ fontSize: '0.85rem', fontWeight: 400, color: '#64748B' }}>units</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>
            <ArrowUpRight size={14} /> +14.2% vs last month
          </div>
        </div>

        {/* KPI 2: Current Inventory */}
        <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>CURRENT INVENTORY</span>
            <Package size={20} color="#2563EB" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>
            {kpis?.current_inventory?.toLocaleString() || '35,850'} <span style={{ fontSize: '0.85rem', fontWeight: 400, color: '#64748B' }}>units</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748B' }}>
            across 10 products
          </div>
        </div>

        {/* KPI 3: Stockout Risk */}
        <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>STOCKOUT RISK</span>
            <AlertTriangle size={20} color="#EF4444" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#EF4444' }}>
            {kpis?.stockout_risk_pct}%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#EF4444', fontWeight: 600 }}>
            2 products critical
          </div>
        </div>

        {/* KPI 4: Supplier Risk */}
        <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>SUPPLIER RISK INDEX</span>
            <ShieldAlert size={20} color="#F59E0B" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>
            {kpis?.supplier_risk_index}%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>
            <ArrowDownRight size={14} /> -3.1% (Low overall)
          </div>
        </div>

        {/* KPI 5: Inventory Turnover */}
        <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>INVENTORY TURNOVER</span>
            <RotateCw size={20} color="#10B981" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>
            {kpis?.inventory_turnover}x
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>
            Optimal efficiency
          </div>
        </div>

        {/* KPI 6: Pending Reorders */}
        <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>PENDING REORDERS</span>
            <ShoppingCart size={20} color="#6366F1" />
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>
            {kpis?.pending_reorders}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#6366F1', fontWeight: 600 }}>
            Action required
          </div>
        </div>
      </div>

      {/* Main Chart Section: Demand Forecast */}
      <div className="glass-panel" style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>Demand Forecasting (Actual vs Predicted)</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Blue: Historical Actual Demand | Orange: XGBoost Predicted Demand & Confidence Range</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', fontSize: '0.85rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: '#2563EB' }}>
              <span style={{ width: '12px', height: '12px', background: '#2563EB', borderRadius: '3px' }}></span> Actual Demand
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: '#F97316' }}>
              <span style={{ width: '12px', height: '12px', background: '#F97316', borderRadius: '3px' }}></span> Predicted Demand
            </span>
          </div>
        </div>

        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} label={{ value: 'Demand Quantity', angle: -90, position: 'insideLeft', style: { fill: '#64748B', fontSize: 12 } }} />
              <Tooltip 
                contentStyle={{ background: '#0F172A', color: '#fff', borderRadius: '8px', border: 'none' }}
                formatter={(value, name) => [value ? `${value.toLocaleString()} units` : 'N/A', name === 'actual' ? 'Actual Demand' : 'Predicted Demand']}
              />
              <Area type="monotone" dataKey="actual" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
              <Area type="monotone" dataKey="predicted" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorPred)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sub Grid: Inventory Health + Supplier Risk + Live Alerts & Recommendations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Inventory Health Breakdown */}
        <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>Inventory Health Status</h3>
          <div style={{ width: '100%', height: 200, display: 'flex', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={inventoryHealthData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                  {inventoryHealthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} products`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '0.8rem', fontWeight: 600, marginTop: '0.5rem' }}>
            <span style={{ color: '#10B981' }}>● Healthy (7)</span>
            <span style={{ color: '#F59E0B' }}>● Low Stock (2)</span>
            <span style={{ color: '#EF4444' }}>● Critical (1)</span>
          </div>
        </div>

        {/* Supplier Risk Analysis */}
        <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>Supplier Risk Ratings (%)</h3>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={supplierRiskData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis type="number" stroke="#94A3B8" fontSize={11} domain={[0, 25]} />
                <YAxis dataKey="name" type="category" stroke="#0F172A" fontSize={11} width={100} />
                <Tooltip formatter={(value) => [`${value}% Risk Index`]} />
                <Bar dataKey="risk" fill="#F59E0B" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Stockout Alerts & Prescriptive AI Advice */}
        <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', gridColumn: 'span 1' }}>
          <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle color="#EF4444" size={18} /> Stockout Risk Alert
          </h3>
          <div style={{ padding: '0.75rem', background: '#FEF2F2', borderRadius: '8px', borderLeft: '4px solid #EF4444', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#991B1B' }}>⚠ High Stockout Risk: Laptop</div>
            <div style={{ fontSize: '0.8rem', color: '#7F1D1D', marginTop: '0.25rem' }}>
              Laptop demand (4,000 units) may exceed available inventory (2,500 units) within 7 days.
            </div>
          </div>

          <h3 style={{ margin: '1rem 0 0.5rem 0', fontSize: '1rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lightbulb color="#2563EB" size={18} /> Prescriptive AI Action
          </h3>
          <div style={{ padding: '0.75rem', background: '#EFF6FF', borderRadius: '8px', borderLeft: '4px solid #2563EB' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E40AF' }}>Recommended Action:</div>
            <div style={{ fontSize: '0.8rem', color: '#1E3A8A', marginTop: '0.25rem' }}>
              Reorder 2,300 units from Premium Logistics before Friday to guarantee zero stockout risk.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
