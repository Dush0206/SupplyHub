import React from 'react';
import DemandChart from './DemandChart';
import LogisticsMap from './LogisticsMap';
import { AlertTriangle, AlertCircle, DollarSign, PackageOpen, TrendingDown, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  return (
    <div>
      {/* Financial & Core KPIs */}
      <div className="dashboard-grid">
        <div className="metric-card glass-panel fade-in" style={{animationDelay: '0.1s', borderTop: '4px solid var(--primary)'}}>
          <div className="metric-title">Projected Revenue (Next Month)</div>
          <div className="metric-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><DollarSign size={28} /> 4.25M</div>
          <div className="metric-trend positive" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><ArrowUpRight size={16} /> +12.5% vs Last Month</div>
        </div>
        
        <div className="metric-card glass-panel fade-in" style={{animationDelay: '0.2s'}}>
          <div className="metric-title">Total Holding Costs</div>
          <div className="metric-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><DollarSign size={28} /> 124.5K</div>
          <div className="metric-trend positive" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><TrendingDown size={16} /> -2.1% Optimized via EOQ</div>
        </div>
        
        <div className="metric-card glass-panel fade-in" style={{animationDelay: '0.3s'}}>
          <div className="metric-title">Est. Stockout Risk Cost</div>
          <div className="metric-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><DollarSign size={28} /> 14.2K</div>
          <div className="metric-trend negative" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Widget C shortage predicted</div>
        </div>
        
        <div className="metric-card glass-panel fade-in" style={{animationDelay: '0.4s'}}>
          <div className="metric-title">Avg. Supplier Lead Time</div>
          <div className="metric-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><PackageOpen size={28} /> 4.8 Days</div>
          <div className="metric-trend positive">98% On-Time Delivery</div>
        </div>
      </div>

      
      {/* Smart Alerts Section */}
      <div className="glass-panel fade-in" style={{ padding: '1.5rem', marginTop: '2rem', animationDelay: '0.45s', borderLeft: '4px solid var(--warning)' }}>
        <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
          <AlertTriangle size={20} color="var(--warning)" />
          Smart AI Alerts
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
            <AlertCircle size={16} color="var(--danger)" />
            <span style={{ fontSize: '0.875rem' }}><strong>Stockout Risk:</strong> Widget C inventory is critically low (500 units). EOQ recommends ordering 1,800 units immediately.</span>
            <button className="enterprise-btn" style={{ marginLeft: 'auto', padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>Auto-Reorder</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '6px' }}>
            <AlertTriangle size={16} color="var(--warning)" />
            <span style={{ fontSize: '0.875rem' }}><strong>Supplier Delay Predicted:</strong> Weather events near New York port may delay Cheap Parts Inc shipments by 48 hours.</span>
            <button className="enterprise-btn" style={{ marginLeft: 'auto', padding: '0.25rem 0.75rem', fontSize: '0.75rem', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>View Alternate Routes</button>
          </div>
        </div>
      </div>

      <div className="glass-panel fade-in" style={{ padding: '1.5rem', marginTop: '2rem', animationDelay: '0.5s' }}>
        <DemandChart />
      </div>

      <div className="glass-panel fade-in" style={{ padding: '1.5rem', marginTop: '2rem', animationDelay: '0.6s' }}>
        <LogisticsMap />
      </div>
    </div>
  );
};

export default Dashboard;


