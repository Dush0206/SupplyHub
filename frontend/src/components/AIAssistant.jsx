import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const AIAssistant = ({ fullHeight }) => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Hello! I am your AI Supply Chain Orchestrator. I am connected to the Pandas data models and XGBoost forecasting engines. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: 'system', content: data.response }]);
      
    } catch (error) {
      console.error('Backend unavailable:', error);
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: 'system', content: `**Connection Error**: Unable to reach the orchestrator backend. Please ensure the Python FastAPI server is running. (${error.message})` }]);
    }
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: fullHeight ? '100%' : '600px', background: 'var(--bg-secondary)' }}>
      {!fullHeight && (
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-tertiary)' }}>
          <h3 style={{ margin: 0 }}>AI Orchestrator</h3>
        </div>
      )}
      
      <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-system'}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              maxWidth: '80%',
              animation: 'fadeIn 0.3s ease-out',
              boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
            }}
          >
            {msg.role === 'system' ? (
              <div className="markdown-body">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ) : (
              msg.content
            )}
          </div>
        ))}
        {isTyping && (
          <div style={{ alignSelf: 'flex-start', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '1rem', background: 'var(--bg-tertiary)' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the orchestrator..."
          style={{
            flex: 1,
            padding: '0.85rem 1rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            outline: 'none',
            fontSize: '0.95rem'
          }}
        />
        <button 
          type="submit" 
          disabled={isTyping}
          className="enterprise-btn"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AIAssistant;
