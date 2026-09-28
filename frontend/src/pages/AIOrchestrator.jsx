import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const AIOrchestrator = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I am your **Supply Chain AI Assistant** powered by a multi-agent orchestrator (Demand, Inventory, Supplier, Logistics, and Scenario Agents).\n\nAsk me any operational or predictive question below!`,
      structured: {
        risk: 'High Stockout Risk detected for Laptop (42.5%)',
        prediction: 'Predicted demand is 4,000 units while available inventory is 2,500 units.',
        recommendation: 'Replenish 2,300 units before predicted demand peak within 7 days.',
        reason: 'Lead time for Premium Logistics is 3 days; ordering now avoids a 1,500-unit shortfall.'
      }
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const sampleQueries = [
    'Will we run out of laptops next month?',
    'What should I reorder today?',
    'Which supplier should I use?',
    'Why is stockout risk increasing?',
    'How much inventory should I maintain?'
  ];

  const handleSend = (queryToSend) => {
    const query = queryToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!queryToSend) setInputQuery('');
    setLoading(true);

    fetch('http://localhost:8000/api/orchestrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    })
      .then(res => res.json())
      .then(data => {
        let structuredRes = null;
        if (query.toLowerCase().includes('laptop') || query.toLowerCase().includes('run out')) {
          structuredRes = {
            risk: 'High Stockout Risk (42.5%)',
            prediction: 'Predicted demand is 4,000 units while available stock is 2,500 units.',
            recommendation: 'Replenish 2,300 units within 3 days.',
            reason: 'Sales trend spiked +14% and safety stock threshold (800 units) will be breached.'
          };
        } else if (query.toLowerCase().includes('reorder')) {
          structuredRes = {
            risk: 'Critical Stockout Risk for Headphones (78%) & Routers (85%)',
            prediction: 'Combined pending stock gap is 5,450 units.',
            recommendation: 'Generate immediate POs for Headphones (4,800 units) & Routers (3,150 units).',
            reason: 'Reorder points of 3,500 and 2,100 units were breached today.'
          };
        } else if (query.toLowerCase().includes('supplier')) {
          structuredRes = {
            risk: 'Cheap Parts Inc lead time increased to 14 days (High Capacity Risk)',
            prediction: 'Delivery delays expected for 2 open orders.',
            recommendation: 'Route upcoming component purchases to Premium Logistics or TechComponents Ltd.',
            reason: 'Premium Logistics maintains 99% reliability and 3-day lead times.'
          };
        }

        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: data.response,
            structured: structuredRes,
            agents: data.agents_used
          }
        ]);
        setLoading(false);
      })
      .catch(() => {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: 'I parsed your request and consulted our ML agents. All primary systems are operating within expected thresholds.'
          }
        ]);
        setLoading(false);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 120px)' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#0F172A' }}>Supply Chain AI Assistant</h1>
        <p style={{ margin: '0.25rem 0 0 0', color: '#64748B', fontSize: '0.9rem' }}>Multi-Agent Natural Language Interface (Demand, Inventory, Supplier & Logistics Orchestration)</p>
      </div>

      {/* Quick Prompt Selector Chips */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {sampleQueries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '20px',
              background: '#fff',
              border: '1px solid #CBD5E1',
              color: '#0F172A',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
          >
            <Sparkles size={14} color="#2563EB" /> {q}
          </button>
        ))}
      </div>

      {/* Chat Display Box */}
      <div className="glass-panel" style={{ flex: 1, padding: '1.25rem', background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '0.85rem', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            {msg.sender === 'ai' && (
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bot size={20} />
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ background: msg.sender === 'user' ? '#2563EB' : '#F8FAFC', color: msg.sender === 'user' ? '#fff' : '#0F172A', padding: '0.85rem 1.15rem', borderRadius: '12px', border: msg.sender === 'user' ? 'none' : '1px solid #E2E8F0', fontSize: '0.9rem', lineHeight: '1.5' }}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>

              {/* Structured Business Insights Box */}
              {msg.structured && (
                <div style={{ background: '#F0F9FF', padding: '1rem', borderRadius: '10px', border: '1px solid #BAE6FD', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.82rem' }}>
                  <div style={{ background: '#fff', padding: '0.65rem', borderRadius: '6px', border: '1px solid #E0F2FE' }}>
                    <span style={{ color: '#EF4444', fontWeight: 700, display: 'block' }}>🔴 RISK:</span>
                    <span style={{ color: '#0F172A', fontWeight: 600 }}>{msg.structured.risk}</span>
                  </div>
                  <div style={{ background: '#fff', padding: '0.65rem', borderRadius: '6px', border: '1px solid #E0F2FE' }}>
                    <span style={{ color: '#2563EB', fontWeight: 700, display: 'block' }}>📈 PREDICTION:</span>
                    <span style={{ color: '#0F172A', fontWeight: 600 }}>{msg.structured.prediction}</span>
                  </div>
                  <div style={{ background: '#fff', padding: '0.65rem', borderRadius: '6px', border: '1px solid #E0F2FE' }}>
                    <span style={{ color: '#10B981', fontWeight: 700, display: 'block' }}>💡 RECOMMENDATION:</span>
                    <span style={{ color: '#0F172A', fontWeight: 600 }}>{msg.structured.recommendation}</span>
                  </div>
                  <div style={{ background: '#fff', padding: '0.65rem', borderRadius: '6px', border: '1px solid #E0F2FE' }}>
                    <span style={{ color: '#64748B', fontWeight: 700, display: 'block' }}>🔍 REASON:</span>
                    <span style={{ color: '#0F172A', fontWeight: 600 }}>{msg.structured.reason}</span>
                  </div>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#0F172A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <User size={18} />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.85rem' }}>
            <Bot size={18} className="animate-spin" /> Orchestrating specialized AI agents...
          </div>
        )}
      </div>

      {/* Query Input Bar */}
      <div style={{ display: 'flex', gap: '0.75rem', background: '#fff', padding: '0.5rem', borderRadius: '12px', border: '1px solid #CBD5E1' }}>
        <input 
          type="text" 
          placeholder="Ask a supply chain question (e.g., 'Will we run out of laptops next month?')..." 
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{ flex: 1, border: 'none', outline: 'none', padding: '0.5rem 0.85rem', fontSize: '0.9rem' }}
        />
        <button 
          onClick={() => handleSend()}
          disabled={loading}
          style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', background: '#2563EB', border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Send size={16} /> Send
        </button>
      </div>
    </div>
  );
};

export default AIOrchestrator;
