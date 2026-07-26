import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Key, Bot, User, Plus, Check, RefreshCw } from 'lucide-react';
import { geminiService } from '../../services/geminiService';

export const GeminiChatModal = ({ isOpen, onClose, apiKey, onSaveApiKey, athlete, targets, onAddTarget }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hello ${athlete.name}! I am your **Gemini Recruiting Coach**. Ask me to find college programs, write emails to head coaches, analyze NCAA recruiting rules for Class of ${athlete.gradYear}, or organize your target list!`,
      actions: []
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyInput, setKeyInput] = useState(apiKey || '');
  const [showKeyField, setShowKeyField] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim() || loading) return;

    const newMessages = [...messages, { role: 'user', text: prompt }];
    setMessages(newMessages);
    setInputPrompt('');
    setLoading(true);

    try {
      const response = await geminiService.askAssistant(prompt, apiKey, athlete);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          text: response.text,
          actions: response.actionRecommendations || []
        }
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          text: "I encountered an error processing your query. Please try again or check your Gemini API key."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "Find West Coast D2/D3 colleges with Kinesiology/Pre-Med",
    "Draft an intro email to Western Washington head coach",
    "Explain NCAA sophomore contact rules for Class of 2029",
    "How to prepare for Colorado Sparkler showcase"
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '720px',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-surface)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 'var(--radius-xl)'
        }}
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(10, 14, 23, 0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Gemini AI Recruiting Assistant</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Powered by Google Gemini • Tailored for Class of {athlete.gradYear} ({athlete.hometown})
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setShowKeyField(!showKeyField)}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.78rem', padding: '4px 10px' }}
            >
              <Key size={14} /> {apiKey ? 'Key Loaded' : 'Add API Key'}
            </button>

            <button onClick={onClose} className="btn btn-outline btn-sm" style={{ padding: '6px' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* API Key Input Drawer */}
        {showKeyField && (
          <div style={{ padding: '12px 24px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="password"
              className="input"
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
              placeholder="Paste Google Gemini API Key (e.g. AIzaSy...)"
              value={keyInput}
              onChange={e => setKeyInput(e.target.value)}
            />
            <button
              onClick={() => { onSaveApiKey(keyInput); setShowKeyField(false); }}
              className="btn btn-primary btn-sm"
            >
              Save Key
            </button>
          </div>
        )}

        {/* Chat Messages Log */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '12px',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%'
              }}
            >
              {msg.role === 'assistant' && (
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#fff', flexShrink: 0, marginTop: '4px' }}>
                  <Bot size={18} style={{ margin: 'auto' }} />
                </div>
              )}

              <div style={{
                background: msg.role === 'user' ? 'var(--primary-gradient)' : 'var(--bg-card)',
                color: msg.role === 'user' ? '#0a0e17' : 'var(--text-main)',
                padding: '14px 18px',
                borderRadius: '16px',
                borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                borderTopLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                border: msg.role === 'assistant' ? '1px solid var(--border-color)' : 'none',
                fontSize: '0.9rem',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.text}

                {/* Interactive Direct Actions inside AI Response */}
                {msg.actions && msg.actions.length > 0 && (
                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '8px' }}>
                      QUICK CRM ACTIONS:
                    </div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      {msg.actions.map(col => {
                        const exists = targets.some(t => t.id === col.id || t.name === col.name);
                        return (
                          <div key={col.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>{col.name} ({col.division})</span>
                            <button
                              onClick={() => onAddTarget(col)}
                              disabled={exists}
                              className="btn btn-sm"
                              style={{ padding: '4px 10px', fontSize: '0.75rem', background: exists ? 'rgba(16,185,129,0.2)' : 'var(--primary-gradient)', color: exists ? '#10b981' : '#0a0e17' }}
                            >
                              {exists ? <Check size={12} /> : <Plus size={12} />}
                              {exists ? 'In Target List' : 'Add to CRM'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-glow)', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0, marginTop: '4px' }}>
                  <User size={18} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Bot size={18} />
              </div>
              <div style={{ background: 'var(--bg-card)', padding: '12px 18px', borderRadius: '16px', color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RefreshCw size={16} className="animate-spin" /> Gemini AI is analyzing recruiting programs...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts Chips */}
        <div style={{ padding: '10px 24px', background: 'rgba(10, 14, 23, 0.4)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.75rem', whiteSpace: 'nowrap', borderRadius: '9999px', padding: '4px 12px' }}
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          style={{ padding: '16px 24px', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '10px' }}
        >
          <input
            type="text"
            className="input"
            placeholder="Ask Gemini anything (e.g. 'Recommend D2 schools with Nursing', 'Draft email to coach')..."
            value={inputPrompt}
            onChange={e => setInputPrompt(e.target.value)}
          />
          <button type="submit" disabled={loading || !inputPrompt.trim()} className="btn btn-accent btn-md">
            <Send size={18} />
          </button>
        </form>

      </div>
    </div>
  );
};
