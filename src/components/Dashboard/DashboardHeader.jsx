import React from 'react';
import { Target, Mail, CalendarCheck, CheckSquare, Download, Sparkles, Plus } from 'lucide-react';

export const DashboardHeader = ({ targets, checklist, onExportCsv, onOpenCollegeFinder, onOpenAiChat }) => {
  const contactedCount = targets.filter(t => t.status !== 'Target' && t.status !== 'Interested').length;
  const completedChecklistCount = checklist.filter(c => c.completed).length;

  return (
    <div style={{ marginBottom: '28px' }}>
      
      {/* Top Banner Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <span className="badge badge-primary">Class of 2029 Portal</span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginTop: '4px', letterSpacing: '-0.02em' }}>
            Recruiting Management Hub
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Organize target programs, track coach correspondence, build emails, and consult your Gemini AI Assistant.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={onOpenCollegeFinder} className="btn btn-primary btn-sm">
            <Plus size={16} /> Discover Programs
          </button>
          
          <button onClick={onExportCsv} className="btn btn-outline btn-sm">
            <Download size={16} /> Export Contact CSV
          </button>

          <button onClick={onOpenAiChat} className="btn btn-accent btn-sm">
            <Sparkles size={16} /> AI Recruiting Coach
          </button>
        </div>
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid-stats">
        
        <div className="glass-panel" style={{ padding: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.15)', color: 'var(--status-target)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Target size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Target Programs</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{targets.length}</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.15)', color: 'var(--status-contacted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mail size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Coaches Contacted</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{contactedCount}</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckSquare size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Sophomore Roadmap</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{completedChecklistCount} / {checklist.length}</div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(255, 183, 3, 0.15)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CalendarCheck size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Target Division Mix</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, marginTop: '2px', color: 'var(--text-main)' }}>
              D1 / D2 / D3 / NAIA
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
