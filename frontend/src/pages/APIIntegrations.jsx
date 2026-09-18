import React from 'react';
import { Key, Copy, Code, CheckCircle } from 'lucide-react';

const APIIntegrations = () => {
  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>API & Integrations</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Manage SaaS subscription keys and ERP connections.</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 2 }}>
          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Key size={20} />
              Production API Keys
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem' }}>Enterprise GraphQL API Key</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="password" 
                  value="sk_live_51Mqwertyuiop1234567890" 
                  readOnly 
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                />
                <button className="enterprise-btn" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
                  <Copy size={16} />
                  Copy
                </button>
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
              Use this key to integrate your existing SAP, Oracle, or custom e-commerce systems with our prediction engine.
            </p>
          </div>

          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Active Integrations</h2>
          <div className="glass-panel" style={{ overflow: 'hidden' }}>
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>System</th>
                  <th>Type</th>
                  <th>Sync Frequency</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 500 }}>SAP S/4HANA</td>
                  <td>ERP (Inventory)</td>
                  <td>Real-time (Webhooks)</td>
                  <td><span className="status-badge healthy">Connected</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>Shopify Plus</td>
                  <td>E-Commerce (Sales)</td>
                  <td>Hourly</td>
                  <td><span className="status-badge healthy">Connected</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div className="glass-panel" style={{ padding: '2rem', background: 'var(--bg-tertiary)' }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Current Subscription</h3>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>Enterprise Plan</div>
            <ul style={{ paddingLeft: '1.5rem', margin: '0 0 1.5rem 0', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <li>Unlimited Forecasts</li>
              <li>Supplier Risk AI</li>
              <li>Autonomous PO Generation</li>
              <li>24/7 SLA Support</li>
            </ul>
            <button className="enterprise-btn" style={{ width: '100%', justifyContent: 'center' }}>Manage Billing</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIIntegrations;
