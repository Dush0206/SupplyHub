import React from 'react';
import AIAssistant from '../components/AIAssistant';
import { Bot, Sparkles } from 'lucide-react';

const AIOrchestrator = () => {
  return (
    <div className="fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Bot size={28} color="var(--primary)" />
            AI Orchestrator
          </h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Chat with your specialized Supply Chain Agents to optimize decisions.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 500 }}>
          <Sparkles size={16} />
          Agents Online
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <AIAssistant fullHeight={true} />
      </div>
    </div>
  );
};

export default AIOrchestrator;
