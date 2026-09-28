import React, { useState, useEffect } from 'react';
import { Filter, Play, Cpu, TrendingUp, CheckCircle, BarChart3 } from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';

const DemandForecasting = () => {
  const [product, setProduct] = useState('Laptop');
  const [location, setLocation] = useState('Chennai');
  const [horizon, setHorizon] = useState(30);
  const [model, setModel] = useState('XGBoost');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const productsList = ['Laptop', 'Smartphone', 'Headphones', 'Monitor', 'Keyboard', 'Smartwatch', 'Tablet', 'Wireless Router', 'Server Blade', 'External SSD'];
  const locationsList = ['Chennai', 'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad'];
  const modelsList = ['XGBoost', 'LightGBM', 'SARIMA', 'Prophet', 'LSTM'];

  const fetchForecast = () => {
    setLoading(true);
    fetch(`http://localhost:8000/api/demand/forecast?product=${product}&location=${location}&horizon=${horizon}&model=${model}`)
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Title Header */}
      <div>
        <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>Demand Forecasting</h1>
        <p style={{ margin: '0.25rem 0 0 0', color: '#64748B', fontSize: '0.9rem' }}>Advanced machine learning time-series predictions with confidence interval bounds</p>
      </div>

      {/* Interactive Filter Control Bar */}
      <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'flex-end', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>Product</label>
          <select value={product} onChange={(e) => setProduct(e.target.value)} style={{ padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', outline: 'none' }}>
            {productsList.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>Location</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)} style={{ padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', outline: 'none' }}>
            {locationsList.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>Forecast Horizon</label>
          <select value={horizon} onChange={(e) => setHorizon(Number(e.target.value))} style={{ padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', outline: 'none' }}>
            <option value={7}>7 Days</option>
            <option value={14}>14 Days</option>
            <option value={30}>30 Days</option>
            <option value={60}>60 Days</option>
            <option value={90}>90 Days</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>Model Selected</label>
          <select value={model} onChange={(e) => setModel(e.target.value)} style={{ padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', outline: 'none' }}>
            {modelsList.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <button 
          onClick={fetchForecast} 
          disabled={loading}
          style={{ padding: '0.55rem 1.25rem', borderRadius: '8px', background: '#2563EB', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(37,99,235,0.2)' }}
        >
          <Play size={16} fill="#fff" /> {loading ? 'Running ML Model...' : 'Generate Forecast'}
        </button>
      </div>

      {/* Main Interactive Forecasting Graph */}
      <div className="glass-panel" style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>
              Demand Forecast for {product} ({location})
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
              Algorithm: <strong>{model}</strong> | Forecast Horizon: <strong>{horizon} Days</strong>
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: '#2563EB' }}>
              <span style={{ width: '12px', height: '12px', background: '#2563EB', borderRadius: '3px' }}></span> Historical Demand
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: '#F97316' }}>
              <span style={{ width: '12px', height: '12px', background: '#F97316', borderRadius: '3px' }}></span> {model} Predicted
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: '#94A3B8' }}>
              <span style={{ width: '12px', height: '12px', background: '#E2E8F0', borderRadius: '3px' }}></span> 95% Confidence Bounds
            </span>
          </div>
        </div>

        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data?.chart_data || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} label={{ value: 'Units', angle: -90, position: 'insideLeft', style: { fill: '#64748B' } }} />
              <Tooltip contentStyle={{ background: '#0F172A', color: '#fff', borderRadius: '8px', border: 'none' }} />
              <Area type="monotone" dataKey="upper_bound" stroke="none" fill="#CBD5E1" fillOpacity={0.3} />
              <Area type="monotone" dataKey="lower_bound" stroke="none" fill="#FFFFFF" fillOpacity={1.0} />
              <Line type="monotone" dataKey="actual" stroke="#2563EB" strokeWidth={3} dot={false} name="Historical Actual" />
              <Line type="monotone" dataKey="predicted" stroke="#F97316" strokeWidth={3} strokeDasharray="4 4" dot={true} name={`${model} Forecast`} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Forecast Summary & Model Performance Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Forecast Summary */}
        <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="#2563EB" /> Forecast Summary
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>EXPECTED DEMAND</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0F172A', marginTop: '0.2rem' }}>
                {data?.summary?.expected_demand?.toLocaleString() || '12,000'} units
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>AVERAGE DAILY DEMAND</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0F172A', marginTop: '0.2rem' }}>
                {data?.summary?.avg_daily_demand || '400'} units/day
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>FORECAST HORIZON</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0F172A', marginTop: '0.2rem' }}>
                {horizon} Days
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>CONFIDENCE RANGE</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2563EB', marginTop: '0.2rem' }}>
                {data?.summary?.confidence_range || '10,000 – 14,000 units'}
              </div>
            </div>
          </div>
        </div>

        {/* Model Metrics */}
        <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={18} color="#F97316" /> Model Performance Metrics ({model})
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#FFF7ED', padding: '0.85rem', borderRadius: '8px', border: '1px solid #FFEDD5' }}>
              <span style={{ fontSize: '0.75rem', color: '#9A3412', fontWeight: 600 }}>MAE (Mean Absolute Error)</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#C2410C', marginTop: '0.2rem' }}>
                {data?.metrics?.mae || '142.5'}
              </div>
            </div>

            <div style={{ background: '#FFF7ED', padding: '0.85rem', borderRadius: '8px', border: '1px solid #FFEDD5' }}>
              <span style={{ fontSize: '0.75rem', color: '#9A3412', fontWeight: 600 }}>RMSE (Root Mean Sq Error)</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#C2410C', marginTop: '0.2rem' }}>
                {data?.metrics?.rmse || '185.2'}
              </div>
            </div>

            <div style={{ background: '#ECFDF5', padding: '0.85rem', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
              <span style={{ fontSize: '0.75rem', color: '#065F46', fontWeight: 600 }}>MAPE (Mean Abs % Error)</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#047857', marginTop: '0.2rem' }}>
                {data?.metrics?.mape || '3.8'}%
              </div>
            </div>

            <div style={{ background: '#ECFDF5', padding: '0.85rem', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
              <span style={{ fontSize: '0.75rem', color: '#065F46', fontWeight: 600 }}>R² Score (Goodness of Fit)</span>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#047857', marginTop: '0.2rem' }}>
                {data?.metrics?.r2 || '0.96'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandForecasting;
