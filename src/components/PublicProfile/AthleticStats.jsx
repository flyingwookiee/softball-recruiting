import React, { useState } from 'react';
import { Zap, Target, Shield, Activity, BarChart2 } from 'lucide-react';

export const AthleticStats = ({ athlete }) => {
  const [activeTab, setActiveTab] = useState('combine');

  const tabs = [
    { id: 'combine', label: 'Verified Combine Metrics', icon: Zap },
    { id: 'hitting', label: 'Season Hitting Stats', icon: Target },
    { id: 'fielding', label: 'Fielding & Agility Testing', icon: Shield }
  ];

  return (
    <section className="portfolio-section" id="stats">
      <div className="section-header">
        <span className="badge badge-primary">Dribbble Roster Data</span>
        <h2 className="section-title" style={{ marginTop: '6px' }}>
          Athletic Metrics & Performance Visualizer
        </h2>
        <p className="section-subtitle">
          Evaluated at regional prospect combines and high school varsity / club 16U competition.
        </p>
      </div>

      {/* Dribbble Segmented Tab Switcher */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', overflowX: 'auto' }}>
        {tabs.map(tab => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="btn btn-sm"
              style={{
                background: isActive ? 'var(--text-main)' : 'var(--bg-surface)',
                color: isActive ? 'var(--bg-main)' : 'var(--text-muted)',
                border: isActive ? 'none' : '1px solid var(--border-color)',
                borderRadius: '9999px',
                fontWeight: isActive ? 800 : 500
              }}
            >
              <IconComp size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Grid */}
      {activeTab === 'combine' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {[
            { label: 'Bat Exit Velocity', value: athlete.metrics.exitVelocity, note: 'Tee & Live Arm Evaluation', pct: '88%', color: 'var(--primary)' },
            { label: 'Overhand Throw Velo', value: athlete.metrics.overhandVelocity, note: 'Shortstop to 1B Throw', pct: '84%', color: 'var(--primary)' },
            { label: 'Home-to-First Time', value: athlete.metrics.homeToFirst, note: 'Laser Timed Sprint', pct: '92%', color: 'var(--accent)' },
            { label: 'Home-to-Home Time', value: athlete.metrics.homeToHome, note: 'Full Base Turn Sprint', pct: '90%', color: 'var(--accent)' },
            { label: 'Shuttle Run Agility', value: athlete.metrics.shuttleRun, note: 'Lateral Agility Test', pct: '86%', color: 'var(--gold)' }
          ].map((m, idx) => (
            <div key={idx} className="apple-card" style={{ padding: '26px', background: 'var(--bg-surface)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                {m.label}
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.04em', marginBottom: '4px' }}>
                {m.value}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '12px' }}>
                {m.note}
              </div>

              {/* Progress Meter */}
              <div className="stat-meter-bar">
                <div className="stat-meter-fill" style={{ width: m.pct, background: m.color }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'hitting' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {[
            { label: 'Batting Average (BA)', value: athlete.seasonStats.battingAverage, note: 'Varsity & Club 16U Lead-off', pct: '85%', color: 'var(--accent)' },
            { label: 'On-Base Pct (OBP)', value: athlete.seasonStats.onBasePercentage, note: 'High Discipline Plate Appearances', pct: '90%', color: 'var(--accent)' },
            { label: 'Slugging Pct (SLG)', value: athlete.seasonStats.sluggingPercentage, note: 'Power & Extra Base Hits', pct: '82%', color: 'var(--gold)' },
            { label: 'Stolen Bases (SB)', value: athlete.seasonStats.stolenBases, note: 'High Success Base Running', pct: '88%', color: 'var(--primary)' },
            { label: 'Runs Batted In (RBI)', value: athlete.seasonStats.rbis, note: 'Clutch Hitting in Scoring Position', pct: '80%', color: 'var(--primary)' }
          ].map((m, idx) => (
            <div key={idx} className="apple-card" style={{ padding: '26px', background: 'var(--bg-surface)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                {m.label}
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.04em', marginBottom: '4px' }}>
                {m.value}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '12px' }}>
                {m.note}
              </div>

              {/* Progress Meter */}
              <div className="stat-meter-bar">
                <div className="stat-meter-fill" style={{ width: m.pct, background: m.color }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'fielding' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {[
            { label: 'Fielding Percentage', value: athlete.seasonStats.fieldingPercentage, note: 'Shortstop / 2B / Utility', pct: '96.5%', color: 'var(--gold)' },
            { label: 'Primary Defensive Spot', value: athlete.primaryPosition, note: 'Team Infield Captain', pct: '100%', color: 'var(--primary)' },
            { label: 'Secondary Defensive Spot', value: athlete.secondaryPosition, note: '2B & Outfield Versatility', pct: '90%', color: 'var(--primary)' },
            { label: 'Dominant Hand', value: `${athlete.bats} / ${athlete.throws}`, note: 'Right Handed Throw & Bat', pct: '100%', color: 'var(--accent)' }
          ].map((m, idx) => (
            <div key={idx} className="apple-card" style={{ padding: '26px', background: 'var(--bg-surface)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                {m.label}
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '-0.04em', marginBottom: '4px' }}>
                {m.value}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '12px' }}>
                {m.note}
              </div>

              {/* Progress Meter */}
              <div className="stat-meter-bar">
                <div className="stat-meter-fill" style={{ width: m.pct, background: m.color }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
