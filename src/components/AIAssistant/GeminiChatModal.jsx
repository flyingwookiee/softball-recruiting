import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Key, Bot, User, Plus, Check, RefreshCw, ExternalLink } from 'lucide-react';
import { geminiService } from '../../services/geminiService';

export const GeminiChatModal = ({ isOpen, onClose, apiKey, onSaveApiKey, athlete, targets, onAddTarget, onUpdateProfile, onUpdateTargets }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hello ${athlete.name}! I am your **Gemini AI Assistant**.\n\n🩺 I see you are interested in **Nursing (BSN)** and colleges in **Texas, Colorado, and the Pacific Northwest**!\n\n⚡ **Live Website Editing**: You can type natural commands to me and I will **update your website profile or target CRM list for you live**! Try clicking one of the quick prompts below or type your own command.`,
      actions: []
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyInput, setKeyInput] = useState(apiKey || '');
  const [showKeyField, setShowKeyField] = useState(false);
  const [notification, setNotification] = useState('');

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
      const response = await geminiService.askAssistant(prompt, apiKey, athlete, targets);

      // Handle Direct Live Website Modifications executed by AI
      if (response.profileUpdates) {
        onUpdateProfile(response.profileUpdates);
        setNotification('⚡ Gemini AI updated Emily\'s profile live!');
        setTimeout(() => setNotification(''), 3500);
      }
      if (response.targetsUpdates) {
        onUpdateTargets(response.targetsUpdates);
        setNotification('🎯 Gemini AI updated Target CRM list live!');
        setTimeout(() => setNotification(''), 3500);
      }

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
          text: "I encountered an error processing your request. Please check your Gemini API key."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "Add Texas & Colorado Nursing Schools to CRM",
    "Change Exit Velocity to 68 MPH",
    "Suggest Nursing programs in Texas with D2 softball",
    "Draft intro email to UT Tyler Head Coach",
    "Update GPA to 4.0"
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="apple-card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '760px',
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
        
        {/* Live Notification Banner */}
        {notification && (
          <div style={{ background: 'var(--primary-bg)', color: 'var(--primary)', padding: '10px 20px', fontSize: '0.85rem', fontWeight: 700, textAlign: 'center', borderBottom: '1px solid var(--primary)' }}>
            {notification}
          </div>
        )}

        {/* Header Bar */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'var(--primary-bg)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Gemini AI Assistant & Live Website Editor</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Powered by Google Gemini • Google AI Subscription Compatible
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setShowKeyField(!showKeyField)}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.78rem', borderColor: apiKey ? '#10b981' : 'var(--border-color)', color: apiKey ? '#10b981' : 'var(--text-main)' }}
            >
              <Key size={14} /> {apiKey ? 'Gemini Key Active' : 'Connect Google AI Key'}
            </button>

            <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ padding: '8px' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* API Key Connection Drawer with Guide */}
        {showKeyField && (
          <div style={{ padding: '16px 24px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '6px' }}>
              🔑 Connect Google Gemini AI Premium Subscription:
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Generate a free API key using your Google account at <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 700 }}>aistudio.google.com <ExternalLink size={12} /></a> and paste it below:
            </p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="password"
                className="input"
                style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                placeholder="Paste Gemini API Key (starts with AIzaSy...)"
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
          </div>
        )}

        {/* Chat Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: '12px',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '88%'
              }}
            >
              {msg.role === 'assistant' && (
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-bg)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyCenter: 'center', flexShrink: 0, marginTop: '4px' }}>
                  <Bot size={18} style={{ margin: 'auto' }} />
                </div>
              )}

              <div style={{
                background: msg.role === 'user' ? 'var(--primary)' : 'var(--bg-card)',
                color: msg.role === 'user' ? '#ffffff' : 'var(--text-main)',
                padding: '16px 20px',
                borderRadius: '20px',
                borderTopRightRadius: msg.role === 'user' ? '4px' : '20px',
                borderTopLeftRadius: msg.role === 'assistant' ? '4px' : '20px',
                border: msg.role === 'assistant' ? '1px solid var(--border-color)' : 'none',
                fontSize: '0.92rem',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.text}

                {/* Quick Add Actions */}
                {msg.actions && msg.actions.length > 0 && (
                  <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '8px' }}>
                      RECOMMENDED NURSING PROGRAMS (CLICK TO SAVE TO CRM):
                    </div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      {msg.actions.map(col => {
                        const exists = targets.some(t => t.id === col.id || t.name === col.name);
                        return (
                          <div key={col.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.86rem' }}>{col.name} ({col.division})</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📍 {col.city}, {col.state} • 🩺 {col.popularMajors[0]}</div>
                            </div>
                            <button
                              onClick={() => onAddTarget(col)}
                              disabled={exists}
                              className="btn btn-sm"
                              style={{ padding: '6px 12px', fontSize: '0.78rem', background: exists ? 'rgba(16,185,129,0.2)' : 'var(--primary)', color: exists ? '#10b981' : '#ffffff' }}
                            >
                              {exists ? <Check size={14} /> : <Plus size={14} />}
                              {exists ? 'Saved' : 'Add to CRM'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, marginTop: '4px' }}>
                  <User size={18} />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-bg)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={18} />
              </div>
              <div style={{ background: 'var(--bg-card)', padding: '14px 20px', borderRadius: '20px', color: 'var(--text-muted)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RefreshCw size={16} className="animate-spin" /> Gemini AI is analyzing request and updating website...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Commands Bar */}
        <div style={{ padding: '12px 24px', background: 'rgba(0, 0, 0, 0.4)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.78rem', whiteSpace: 'nowrap', borderRadius: '9999px', padding: '6px 14px' }}
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          style={{ padding: '18px 24px', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px' }}
        >
          <input
            type="text"
            className="input"
            placeholder="Ask AI or type a website update command (e.g. 'Add Texas Nursing schools to target list', 'Change exit velo to 68')..."
            value={inputPrompt}
            onChange={e => setInputPrompt(e.target.value)}
          />
          <button type="submit" disabled={loading || !inputPrompt.trim()} className="btn btn-primary btn-md">
            <Send size={18} />
          </button>
        </form>

      </div>
    </div>
  );
};
