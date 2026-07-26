import React, { useState } from 'react';
import { Mail, Phone, MapPin, X, Check, Copy, Send, Trophy } from 'lucide-react';

export const CoachContactModal = ({ isOpen, onClose, athlete }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [coachName, setCoachName] = useState('');
  const [coachCollege, setCoachCollege] = useState('');
  const [coachEmail, setCoachEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(athlete.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="apple-card animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '560px',
          padding: '32px',
          background: 'var(--bg-surface)',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="btn btn-secondary btn-sm"
          style={{ position: 'absolute', top: '18px', right: '18px', padding: '6px' }}
        >
          <X size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--primary-bg)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mail size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>College Coach Inquiry</h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Contact {athlete.name} & Family / Travel Ball Coaches</p>
          </div>
        </div>

        {submitted ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#10b981' }}>
            <Check size={48} style={{ margin: '0 auto 12px auto' }} />
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Inquiry Received!</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Thank you Coach {coachName}! Emily and her family will respond shortly.
            </p>
          </div>
        ) : (
          <div>
            {/* Instant Contact Info Card */}
            <div style={{ background: 'var(--bg-card)', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontWeight: 600 }}>Direct Email:</span>
                <button onClick={handleCopyEmail} className="btn btn-secondary btn-sm" style={{ padding: '3px 10px', fontSize: '0.75rem' }}>
                  {copiedEmail ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                  {copiedEmail ? 'Copied!' : 'Copy Email'}
                </button>
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)' }}>
                {athlete.email}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                📞 Phone: {athlete.phone} (Parent / Athlete Contact)
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    Coach Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="input"
                    placeholder="e.g. Coach Reed"
                    value={coachName}
                    onChange={e => setCoachName(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    College / Program *
                  </label>
                  <input
                    type="text"
                    required
                    className="input"
                    placeholder="e.g. UT Tyler / Regis Univ"
                    value={coachCollege}
                    onChange={e => setCoachCollege(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  Coach Email *
                </label>
                <input
                  type="email"
                  required
                  className="input"
                  placeholder="coach@university.edu"
                  value={coachEmail}
                  onChange={e => setCoachEmail(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  Message or Prospect Camp Invitation
                </label>
                <textarea
                  rows={4}
                  className="textarea"
                  placeholder="Share details regarding camp evaluations, roster needs, or campus visits..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <Send size={16} /> Send Direct Message to Emily
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
