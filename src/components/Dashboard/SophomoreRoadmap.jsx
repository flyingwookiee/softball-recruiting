import React from 'react';
import { CheckSquare, Square, ShieldAlert, Award, Calendar, Info } from 'lucide-react';
import { sophomoreRecruitingTimeline } from '../../data/recruitingRules';

export const SophomoreRoadmap = ({ checklist, onToggleChecklist }) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Class of 2029 Sophomore Recruiting Roadmap</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Interactive timeline and NCAA rules guide for 10th graders in Alaska.
          </p>
        </div>
      </div>

      {/* NCAA Rules Highlight Box */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', borderLeft: '4px solid var(--primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <Info color="var(--primary)" size={22} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
            NCAA Recruiting Rule Overview for Sophomores
          </h4>
        </div>
        <p style={{ color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '16px' }}>
          {sophomoreRecruitingTimeline.ncaaRuleOverview}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {sophomoreRecruitingTimeline.keyRules.map((rule, idx) => (
            <div key={idx} style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h5 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--gold)', marginBottom: '4px' }}>
                {rule.title}
              </h5>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {rule.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Sophomore Action Items Checklist */}
      <div style={{ display: 'grid', gap: '12px' }}>
        {checklist.map((item) => (
          <div
            key={item.id}
            onClick={() => onToggleChecklist(item.id)}
            className="glass-panel"
            style={{
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              cursor: 'pointer',
              borderLeft: item.completed ? '4px solid #10b981' : '1px solid var(--border-color)',
              opacity: item.completed ? 0.85 : 1
            }}
          >
            <div style={{ marginTop: '2px', color: item.completed ? '#10b981' : 'var(--text-muted)' }}>
              {item.completed ? <CheckSquare size={22} /> : <Square size={22} />}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{item.month}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>{item.category}</span>
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.title}
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginTop: '4px' }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
