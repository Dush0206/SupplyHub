import React, { useState, useEffect } from 'react';
import { Database, Settings, BrainCircuit, Activity } from 'lucide-react';

const MLPipeline = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/models/status')
      .then(res => res.json())
      .then(data => {
        setModels(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch model status:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>ML Pipeline & Data Processing</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Live architecture of the Pandas and XGBoost prediction models.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '3rem 0' }}>
        {/* Step 1 */}
        <div style={{ flex: 1, textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', position: 'relative' }}>
          <Database size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Data Collection</h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Census MARTS Data, Prices, Promotions</p>
        </div>
        
        <div style={{ width: '40px', height: '2px', background: 'var(--primary)' }}></div>
        
        {/* Step 2 */}
        <div style={{ flex: 1, textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <Settings size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Feature Engineering</h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Pandas: Clean, Missing Values, Seasonality</p>
        </div>
        
        <div style={{ width: '40px', height: '2px', background: 'var(--primary)' }}></div>

        {/* Step 3 */}
        <div style={{ flex: 1, textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <BrainCircuit size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Model Training</h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>XGBoost / scikit-learn / LightGBM</p>
        </div>
        
        <div style={{ width: '40px', height: '2px', background: 'var(--primary)' }}></div>

        {/* Step 4 */}
        <div style={{ flex: 1, textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--primary)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(37,99,235,0.1)' }}>
          <Activity size={32} color="var(--success)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)' }}>Model Prediction</h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>SHAP XAI, Demand Forecast</p>
        </div>
      </div>

      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Active Models</h2>
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Fetching live models...</div>
        ) : (
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Model ID</th>
                <th>Type</th>
                <th>Target</th>
                <th>Last Trained</th>
                <th>MSE</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {models.map(m => (
                <tr key={m.id}>
                  <td style={{ fontWeight: 500 }}>{m.id}</td>
                  <td>{m.type}</td>
                  <td>{m.target}</td>
                  <td>{m.last_trained}</td>
                  <td>{m.mse}</td>
                  <td><span className={`status-badge ${m.status === 'Deployed' ? 'active' : 'delayed'}`}>{m.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MLPipeline;
