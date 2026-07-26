import React, { useState } from 'react';
import { X, Send, CheckCircle, Mail, School, Shield } from 'lucide-react';

export const CoachContactModal = ({ isOpen, onClose, athlete }) => {
  const [formData, setFormData] = useState({
    coachName: '',
    collegeName: '',
    email: '',
    phone: '',
    division: 'NCAA D2',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '560px',
          padding: '28px',
          background: 'var(--bg-surface)',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="btn btn-outline btn-sm"
          style={{ position: 'absolute', top: '20px', right: '20px', padding: '6px' }}
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
            }}>
              <CheckCircle size={36} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>
              Message Delivered!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '20px' }}>
              Thank you Coach <strong>{formData.coachName}</strong> ({formData.collegeName}). Your inquiry has been sent to {athlete.name} and her recruiting coach.
            </p>
            <button onClick={() => { setSubmitted(false); onClose(); }} className="btn btn-primary">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <Shield color="var(--primary)" size={24} />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>College Coach Inquiry Form</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Recruiting inquiry for <strong>{athlete.name}</strong> (Class of {athlete.gradYear} • {athlete.primaryPosition} • {athlete.highSchool})
            </p>

            <div style={{ display: 'grid', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Coach Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="input"
                    placeholder="e.g. Coach Sarah Gilmore"
                    value={formData.coachName}
                    onChange={e => setFormData({ ...formData, coachName: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    College / University *
                  </label>
                  <input
                    type="text"
                    required
                    className="input"
                    placeholder="e.g. Western Washington Univ."
                    value={formData.collegeName}
                    onChange={e => setFormData({ ...formData, collegeName: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Coach Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="input"
                    placeholder="coach@university.edu"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Division Level
                  </label>
                  <select
                    className="select"
                    value={formData.division}
                    onChange={e => setFormData({ ...formData, division: e.target.value })}
                  >
                    <option value="NCAA D1">NCAA D1</option>
                    <option value="NCAA D2">NCAA D2</option>
                    <option value="NCAA D3">NCAA D3</option>
                    <option value="NAIA">NAIA</option>
                    <option value="NJCAA">NJCAA</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                  Inquiry Message or Camp Invitation *
                </label>
                <textarea
                  rows={4}
                  required
                  className="textarea"
                  placeholder="We are interested in evaluating your film / inviting you to our upcoming Elite Prospect Camp..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '8px' }}>
                <Send size={18} /> Send Inquiry to Athlete & Parents
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
