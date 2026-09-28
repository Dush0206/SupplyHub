import React, { useState, useEffect } from 'react';
import { Sliders, AlertTriangle, ShieldCheck, TrendingUp, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Scenarios = () => {
  const [demandChange, setDemandChange] = useState(20);
  const [priceChange, setPriceChange] = useState(0);
  const [leadTimeChange, setLeadTimeChange] = useState(2);
  const [safetyMult, setSafetyMult] = useState(1.0);
  const [simulation, setSimulation] = useState(null);

  const runSimulation = () => {
    fetch('http://localhost:8000/api/whatif/simulation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        demand_change_pct: demandChange,
        price_change_pct: priceChange,
        lead_time_change_days: leadTimeChange,
        safety_stock_mult: safetyMult
      })
    })
      .then(res => res.json())
      .then(data => setSimulation(data))
      .catch(() => {});
  };

  useEffect(() => {
    runSimulation();
  }, [demandChange, priceChange, leadTimeChange, safetyMult]);

  // Simulation Chart Data
  const chartData = [
    { month: 'Week 1', BaselineRisk: 18, ScenarioRisk: Math.min(99, Math.max(1, 18 * (1 + demandChange*0.01))) },
    { month: 'Week 2', BaselineRisk: 22, ScenarioRisk: Math.min(99, Math.max(1, 22 * (1 + demandChange*0.01) + leadTimeChange*2)) },
    { month: 'Week 3', BaselineRisk: 25, ScenarioRisk: Math.min(99, Math.max(1, 25 * (1 + demandChange*0.01) + leadTimeChange*3.5)) },
    { month: 'Week 4', BaselineRisk: 20, ScenarioRisk: Math.min(99, Math.max(1, 20 * (1 + demandChange*0.01) + leadTimeChange*3)) }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>What-If Scenario Analysis</h1>
        <p style={{ margin: '0.25rem 0 0 0', color: '#64748B', fontSize: '0.9rem' }}>Dynamic Monte Carlo simulation modeling demand surges, lead time delays & price shifts</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Sliders Panel */}
        <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sliders size={18} color="#2563EB" /> Simulation Controls
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Demand Change Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.35rem' }}>
                <span>Demand Surge / Drop:</span>
                <span style={{ color: demandChange >= 0 ? '#2563EB' : '#EF4444', fontWeight: 700 }}>{demandChange > 0 ? `+${demandChange}%` : `${demandChange}%`}</span>
              </div>
              <input 
                type="range" 
                min="-50" 
                max="50" 
                value={demandChange} 
                onChange={(e) => setDemandChange(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#2563EB', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94A3B8' }}>
                <span>-50% Slump</span>
                <span>0% Baseline</span>
                <span>+50% Spike</span>
              </div>
            </div>

            {/* Price Change Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.35rem' }}>
                <span>Unit Price Adjustment:</span>
                <span style={{ color: '#0F172A', fontWeight: 700 }}>{priceChange > 0 ? `+${priceChange}%` : `${priceChange}%`}</span>
              </div>
              <input 
                type="range" 
                min="-30" 
                max="30" 
                value={priceChange} 
                onChange={(e) => setPriceChange(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#2563EB', cursor: 'pointer' }}
              />
            </div>

            {/* Lead Time Variation Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.35rem' }}>
                <span>Supplier Lead Time Delay:</span>
                <span style={{ color: leadTimeChange > 0 ? '#EF4444' : '#10B981', fontWeight: 700 }}>+{leadTimeChange} Days</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="14" 
                value={leadTimeChange} 
                onChange={(e) => setLeadTimeChange(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#EF4444', cursor: 'pointer' }}
              />
            </div>

            {/* Safety Stock Buffer Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.35rem' }}>
                <span>Safety Stock Multiplier:</span>
                <span style={{ color: '#10B981', fontWeight: 700 }}>{safetyMult.toFixed(1)}x</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="2.0" 
                step="0.1"
                value={safetyMult} 
                onChange={(e) => setSafetyMult(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#10B981', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Simulation Output Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>Scenario Impact Breakdown</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>BASELINE STOCKOUT RISK</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0F172A', marginTop: '0.2rem' }}>
                  {simulation?.baseline_stockout_risk_pct || 18.0}%
                </div>
              </div>

              <div style={{ background: simulation?.simulated_stockout_risk_pct > 25 ? '#FEF2F2' : '#F0FDF4', padding: '0.85rem', borderRadius: '8px', border: simulation?.simulated_stockout_risk_pct > 25 ? '1px solid #FCA5A5' : '1px solid #86EFAC' }}>
                <span style={{ fontSize: '0.75rem', color: simulation?.simulated_stockout_risk_pct > 25 ? '#991B1B' : '#166534', fontWeight: 700 }}>SCENARIO STOCKOUT RISK</span>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: simulation?.simulated_stockout_risk_pct > 25 ? '#DC2626' : '#16A34A', marginTop: '0.2rem' }}>
                  {simulation?.simulated_stockout_risk_pct || 35.0}%
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1rem', background: '#EFF6FF', padding: '1rem', borderRadius: '8px', border: '1px solid #BFDBFE' }}>
              <span style={{ fontSize: '0.75rem', color: '#1E40AF', fontWeight: 700 }}>ADDITIONAL INVENTORY REQUIRED</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#2563EB', marginTop: '0.2rem' }}>
                {simulation?.additional_inventory_required?.toLocaleString() || '2,400'} units
              </div>
            </div>

            <p style={{ margin: '1rem 0 0 0', fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>
              {simulation?.impact_summary}
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Simulated Risk Chart */}
      <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>Baseline vs Scenario Risk Curve (%)</h3>
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} domain={[0, 100]} />
              <Tooltip formatter={(val) => [`${val}% Risk`]} />
              <Line type="monotone" dataKey="BaselineRisk" stroke="#2563EB" strokeWidth={3} name="Baseline Risk" />
              <Line type="monotone" dataKey="ScenarioRisk" stroke="#EF4444" strokeWidth={3} strokeDasharray="4 4" name="Simulated Scenario Risk" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Scenarios;
