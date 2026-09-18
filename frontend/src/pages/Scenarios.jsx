import React, { useState } from 'react';
import { Play, TrendingUp, AlertTriangle } from 'lucide-react';

const Scenarios = () => {
  const [demandSpike, setDemandSpike] = useState(0);
  const [portDelay, setPortDelay] = useState(0);
  const [results, setResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const runSimulation = async () => {
    setIsRunning(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/scenarios/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ demandSpike: Number(demandSpike), portDelay: Number(portDelay) }),
      });
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Error running simulation:', err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>What-If Scenario Builder</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Stress-test your supply chain using the AI Scenario Agent.</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Controls */}
        <div className="glass-panel" style={{ flex: 1, padding: '2rem' }}>
          <h3 style={{ margin: '0 0 1.5rem 0' }}>Simulation Parameters</h3>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 500 }}>
              Demand Spike Projection
              <span style={{ color: 'var(--primary)' }}>+{demandSpike}%</span>
            </label>
            <input 
              type="range" 
              min="0" max="100" 
              value={demandSpike} 
              onChange={(e) => setDemandSpike(e.target.value)}
              style={{ width: '100%' }}
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Simulates sudden virality or seasonal shifts.</p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 500 }}>
              Global Port Delay
              <span style={{ color: 'var(--danger)' }}>+{portDelay} Days</span>
            </label>
            <input 
              type="range" 
              min="0" max="30" 
              value={portDelay} 
              onChange={(e) => setPortDelay(e.target.value)}
              style={{ width: '100%' }}
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Simulates strikes, weather events, or logistics bottlenecks.</p>
          </div>

          <button 
            className="enterprise-btn" 
            onClick={runSimulation}
            disabled={isRunning}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {isRunning ? 'Running Simulation...' : <><Play size={18} /> Run Scenario Agent</>}
          </button>
        </div>

        {/* Results */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {results ? (
            <>
              <div className="glass-panel fade-in" style={{ padding: '1.5rem', borderLeft: `4px solid ${results.stockoutRisk.includes('High') ? 'var(--danger)' : 'var(--success)'}` }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem' }}>Stockout Risk</h4>
                <div style={{ fontSize: '2rem', fontWeight: 700 }}>{results.stockoutRisk}</div>
              </div>

              <div className="glass-panel fade-in" style={{ padding: '1.5rem', borderLeft: '4px solid var(--warning)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem' }}>Projected Financial Loss</h4>
                <div style={{ fontSize: '2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={24} color="var(--warning)" />
                  ${results.projectedLoss.toLocaleString()}
                </div>
              </div>

              <div className="glass-panel fade-in" style={{ padding: '1.5rem', background: 'var(--bg-tertiary)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle size={18} color="var(--primary)" />
                  AI Recommendation
                </h4>
                <p style={{ margin: 0, lineHeight: 1.5 }}>{results.recommendedAction}</p>
              </div>
            </>
          ) : (
            <div className="glass-panel" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
              Adjust parameters and run simulation to view AI impact analysis.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scenarios;
