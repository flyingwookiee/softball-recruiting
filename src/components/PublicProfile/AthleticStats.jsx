import React, { useState } from 'react';
import { Zap, Target, Shield, Activity, Info } from 'lucide-react';

export const AthleticStats = ({ athlete }) => {
  const [activeTab, setActiveTab] = useState('combine');

  const tabs = [
    { id: 'combine', label: 'Verified Combine Metrics', icon: Zap },
    { id: 'hitting', label: 'Season Hitting Stats', icon: Target },
    { id: 'fielding', label: 'Fielding & Speed Testing', icon: Shield }
  ];

  return (
    <section className="portfolio-section" id="stats">
      <div className="section-header">
        <span className="badge badge-primary">Athletic Performance Data</span>
        <h2 className="section-title" style={{ marginTop: '6px' }}>
          Verified Athletic Metrics & Stats
        </h2>
        <p className="section-subtitle">
          Evaluated at official regional prospect combines and high school varsity / club competition.
        </p>
      </div>

      {/* Interactive Tab Switcher */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto' }}>
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
                fontWeight: isActive ? 700 : 500
              }}
            >
              <IconComp size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Cards */}
      {activeTab === 'combine' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Bat Exit Velocity', value: athlete.metrics.exitVelocity, note: 'Tee / Live Arm Evaluation' },
            { label: 'Overhand Throw Velo', value: athlete.metrics.overhandVelocity, note: 'Shortstop to 1B Throw' },
            { label: 'Home-to-First Time', value: athlete.metrics.homeToFirst, note: 'Laser Timed Sprint' },
            { label: 'Home-to-Home Time', value: athlete.metrics.homeToHome, note: 'Full Base Turn Sprint' },
            { label: 'Shuttle Run Agility', value: athlete.metrics.shuttleRun, note: 'Lateral Agility Test' }
          ].map((m, idx) => (
            <div key={idx} className="apple-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                {m.label}
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.03em', marginBottom: '4px' }}>
                {m.value}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>
                {m.note}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'hitting' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Batting Average (BA)', value: athlete.seasonStats.battingAverage, note: 'Varsity & Club 16U' },
            { label: 'On-Base Pct (OBP)', value: athlete.seasonStats.onBasePercentage, note: 'High Discipline Plate Appearances' },
            { label: 'Slugging Pct (SLG)', value: athlete.seasonStats.sluggingPercentage, note: 'Power & Extra Base Hits' },
            { label: 'Stolen Bases (SB)', value: athlete.seasonStats.stolenBases, note: 'High Success Base Running' },
            { label: 'Runs Batted In (RBI)', value: athlete.seasonStats.rbis, note: 'Clutch Hitting in Scoring Position' }
          ].map((m, idx) => (
            <div key={idx} className="apple-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                {m.label}
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.03em', marginBottom: '4px' }}>
                {m.value}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>
                {m.note}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'fielding' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Fielding Percentage', value: athlete.seasonStats.fieldingPercentage, note: 'Shortstop / 2B / Utility' },
            { label: 'Primary Defensive Spot', value: athlete.primaryPosition, note: 'Team Infield Captain' },
            { label: 'Secondary Defensive Spot', value: athlete.secondaryPosition, note: '2B & Outfield Versatility' },
            { label: 'Dominant Hand', value: `${athlete.bats} / ${athlete.throws}`, note: 'Right Handed Throw & Bat' }
          ].map((m, idx) => (
            <div key={idx} className="apple-card" style={{ padding: '24px', background: 'var(--bg-surface)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                {m.label}
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '-0.03em', marginBottom: '4px' }}>
                {m.value}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>
                {m.note}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
