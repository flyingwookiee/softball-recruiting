import React, { useState } from 'react';
import { Mail, Trash2, Edit3, Calendar, MessageSquare, ExternalLink, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

export const TargetTracker = ({ targets, onUpdateTarget, onRemoveTarget, onComposeEmail, onConsultAi }) => {
  const [editingId, setEditingId] = useState(null);

  const statusOptions = [
    { label: 'Target', color: 'var(--status-target)' },
    { label: 'Contacted', color: 'var(--status-contacted)' },
    { label: 'Replied', color: 'var(--status-replied)' },
    { label: 'Camp Invited', color: 'var(--status-camp)' },
    { label: 'Unofficial Visit', color: 'var(--status-visit)' },
    { label: 'Official Visit', color: 'var(--accent)' },
    { label: 'Offer Made', color: 'var(--status-offer)' }
  ];

  return (
    <div style={{ marginBottom: '32px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>My Target Colleges & CRM Log</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Track correspondence, update status milestones, and log notes for each program.
          </p>
        </div>
      </div>

      {targets.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>
            Your Target CRM list is currently empty.
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            Use the <strong>College Directory</strong> tab or ask the <strong>Gemini AI Assistant</strong> to recommend colleges for you!
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {targets.map(college => {
            const isEditing = editingId === college.id;

            return (
              <div key={college.id} className="glass-panel" style={{ padding: '20px' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', alignItems: 'flex-start' }}>
                  
                  {/* School Overview & Status Dropdown */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span className="badge badge-primary">{college.division}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{college.state}</span>
                    </div>

                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{college.name}</h4>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      Head Coach: <strong>{college.headCoach}</strong> ({college.coachEmail})
                    </div>

                    {/* Status Pill Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>STATUS:</span>
                      <select
                        className="select"
                        style={{ padding: '4px 10px', fontSize: '0.82rem', width: 'auto', fontWeight: 700 }}
                        value={college.status || 'Target'}
                        onChange={(e) => onUpdateTarget({ ...college, status: e.target.value })}
                      >
                        {statusOptions.map(opt => (
                          <option key={opt.label} value={opt.label}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dates & Last Outreach Log */}
                  <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                      LAST CONTACT DATE
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Calendar size={16} color="var(--primary)" />
                      <input
                        type="date"
                        className="input"
                        style={{ padding: '4px 8px', fontSize: '0.82rem' }}
                        value={college.lastContactDate || ''}
                        onChange={(e) => onUpdateTarget({ ...college, lastContactDate: e.target.value })}
                      />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Coach Email: <a href={`mailto:${college.coachEmail}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>{college.coachEmail}</a>
                    </div>
                  </div>

                  {/* Notes & Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MessageSquare size={14} /> Coach Notes:
                      </div>
                      {isEditing ? (
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <textarea
                            className="textarea"
                            rows={2}
                            value={college.notes || ''}
                            onChange={(e) => onUpdateTarget({ ...college, notes: e.target.value })}
                          />
                          <button onClick={() => setEditingId(null)} className="btn btn-primary btn-sm">Save</button>
                        </div>
                      ) : (
                        <div
                          onClick={() => setEditingId(college.id)}
                          style={{
                            fontSize: '0.85rem',
                            color: college.notes ? 'var(--text-main)' : 'var(--text-dim)',
                            background: 'var(--bg-input)',
                            padding: '8px 12px',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            minHeight: '40px',
                            border: '1px dashed var(--border-color)'
                          }}
                        >
                          {college.notes || 'Click to add notes or email updates...'}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button onClick={() => onComposeEmail(college)} className="btn btn-primary btn-sm">
                        <Mail size={14} /> Draft Email
                      </button>

                      <button onClick={() => onConsultAi(`How should I follow up with ${college.name} coach ${college.headCoach}?`)} className="btn btn-accent btn-sm">
                        <Sparkles size={14} /> Ask AI Strategy
                      </button>

                      <button onClick={() => onRemoveTarget(college.id)} className="btn btn-outline btn-sm" style={{ padding: '6px 10px', color: '#ff4d4d' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
