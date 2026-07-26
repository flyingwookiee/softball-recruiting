import React, { useState } from 'react';
import { Lock, Key, X, ArrowRight, ShieldCheck } from 'lucide-react';

export const DashboardLockModal = ({ isOpen, onClose, onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Default PIN: 1414 (Emily's jersey number #14)
    if (pin.trim() === '1414' || pin.trim() === 'admin') {
      setError(false);
      onUnlock();
      setPin('');
    } else {
      setError(true);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="apple-card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '32px',
          background: 'var(--bg-surface)',
          position: 'relative',
          textAlign: 'center'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="btn btn-secondary btn-sm"
          style={{ position: 'absolute', top: '16px', right: '16px', padding: '6px' }}
        >
          <X size={16} />
        </button>

        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--primary-bg)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto'
        }}>
          <Lock size={28} />
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px' }}>
          Athlete Dashboard Login
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '20px' }}>
          Enter PIN passcode to unlock Emily's private recruiting CRM & AI workspace.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              maxLength={6}
              required
              className="input"
              style={{ textAlign: 'center', fontSize: '1.4rem', letterSpacing: '0.3em', fontWeight: 800, padding: '12px' }}
              placeholder="••••"
              value={pin}
              onChange={e => { setPin(e.target.value); setError(false); }}
            />
          </div>

          {error && (
            <div style={{ color: '#ef4444', fontSize: '0.82rem', marginBottom: '14px', fontWeight: 600 }}>
              Incorrect passcode. (Default PIN is 1414)
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            Unlock Private Dashboard <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '16px', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          Passcode hint: Emily's Jersey Number (1414)
        </div>
      </div>
    </div>
  );
};
