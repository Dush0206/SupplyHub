import React, { useState } from 'react';
import { MapPin, Navigation, Truck, Clock, DollarSign, Play, CheckCircle2 } from 'lucide-react';

const Logistics = () => {
  const [origin, setOrigin] = useState('Warehouse Alpha (Chennai)');
  const [destination, setDestination] = useState('Chennai Hub');
  const [capacity, setCapacity] = useState('10 Ton Truck');
  const [deadline, setDeadline] = useState(24.0);
  const [routeResult, setRouteResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const originsList = ['Warehouse Alpha (Chennai)', 'Mumbai Port Depot', 'Delhi Central Depot', 'Bengaluru Hub'];
  const destinationsList = ['Chennai Hub', 'Customer Zone 4 (Bengaluru)', 'Pune Distribution Point', 'Noida Hub'];

  const handleOptimize = () => {
    setLoading(true);
    fetch('http://localhost:8000/api/logistics/optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origin,
        destination,
        vehicle_capacity: capacity,
        delivery_deadline: deadline
      })
    })
      .then(res => res.json())
      .then(data => {
        setRouteResult(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>Logistics Optimization</h1>
        <p style={{ margin: '0.25rem 0 0 0', color: '#64748B', fontSize: '0.9rem' }}>Smart route planning, distance minimization & transit cost estimation</p>
      </div>

      {/* Input Parameters Panel */}
      <div className="glass-panel" style={{ padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>Origin</label>
          <select value={origin} onChange={(e) => setOrigin(e.target.value)} style={{ padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}>
            {originsList.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>Destination</label>
          <select value={destination} onChange={(e) => setDestination(e.target.value)} style={{ padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}>
            {destinationsList.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>Vehicle Capacity</label>
          <select value={capacity} onChange={(e) => setCapacity(e.target.value)} style={{ padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}>
            <option value="5 Ton Van">5 Ton Van</option>
            <option value="10 Ton Truck">10 Ton Truck</option>
            <option value="15 Ton Container">15 Ton Container</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>Deadline (Hours)</label>
          <input type="number" value={deadline} onChange={(e) => setDeadline(Number(e.target.value))} style={{ padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', width: '100px' }} />
        </div>

        <button 
          onClick={handleOptimize} 
          disabled={loading}
          style={{ padding: '0.55rem 1.25rem', borderRadius: '8px', background: '#2563EB', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(37,99,235,0.2)' }}
        >
          <Play size={16} fill="#fff" /> {loading ? 'Calculating Route...' : 'Optimize Route'}
        </button>
      </div>

      {/* Recommended Route Visualization Card */}
      <div className="glass-panel" style={{ padding: '1.5rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', borderLeft: '4px solid #10B981' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Navigation color="#10B981" size={20} /> Optimized Route Output
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Navigation size={14} /> RECOMMENDED ROUTE</span>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginTop: '0.3rem' }}>
              {routeResult?.recommended_route || 'Warehouse → Chennai Outer Ring Road → Customer Zone'}
            </div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> DISTANCE</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#2563EB', marginTop: '0.3rem' }}>
              {routeResult?.distance_km || 145} km
            </div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> ESTIMATED TIME</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#F97316', marginTop: '0.3rem' }}>
              {routeResult?.estimated_time_hrs || 3.2} hours
            </div>
          </div>

          <div style={{ background: '#ECFDF5', padding: '1rem', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
            <span style={{ fontSize: '0.75rem', color: '#065F46', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}><DollarSign size={14} /> TRANSPORTATION COST</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#047857', marginTop: '0.3rem' }}>
              ₹{routeResult?.transportation_cost_inr?.toLocaleString() || '1,250'}
            </div>
          </div>
        </div>

        {/* Visual Route Flow Step Map */}
        <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', fontWeight: 700, color: '#0F172A' }}>Route Dispatch Timeline & Checkpoints</h4>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', zIndex: 1 }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2563EB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>1</div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>Origin Depot</span>
              <span style={{ fontSize: '0.7rem', color: '#64748B' }}>0.0 hrs (Departure)</span>
            </div>

            <div style={{ flex: 1, height: '3px', background: '#2563EB' }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', zIndex: 1 }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F97316', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>2</div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>Express Highway Exit</span>
              <span style={{ fontSize: '0.7rem', color: '#64748B' }}>+1.5 hrs Transit</span>
            </div>

            <div style={{ flex: 1, height: '3px', background: '#10B981' }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', zIndex: 1 }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#10B981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>3</div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>Destination Hub</span>
              <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Delivery Arrival</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logistics;
