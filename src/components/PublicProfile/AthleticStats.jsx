import React from 'react';
import { ShieldCheck, Flame, Zap, Activity, Gauge } from 'lucide-react';

export const AthleticStats = ({ athlete }) => {
  const metricsList = [
    { label: 'Exit Velocity', value: athlete.metrics.exitVelocity, valNum: 66, max: 80, unit: 'MPH', icon: Flame },
    { label: 'Overhand Throw', value: athlete.metrics.overhandVelocity, valNum: 62, max: 75, unit: 'MPH', icon: Zap },
    { label: 'Home to 1st', value: athlete.metrics.homeToFirst, valNum: 2.88, max: 3.5, unit: 'SEC', icon: Activity, isSpeed: true },
    { label: 'Shuttle Run', value: athlete.metrics.shuttleRun, valNum: 4.65, max: 5.5, unit: 'SEC', icon: Gauge, isSpeed: true }
  ];

  const seasonStatsList = [
    { label: 'Batting Avg', value: athlete.seasonStats.battingAverage },
    { label: 'On Base Pct', value: athlete.seasonStats.onBasePct },
    { label: 'Slugging Pct', value: athlete.seasonStats.sluggingPct },
    { label: 'OPS', value: athlete.seasonStats.ops },
    { label: 'Fielding Pct', value: athlete.seasonStats.fieldingPct },
    { label: 'Stolen Bases', value: athlete.seasonStats.stolenBases }
  ];

  return (
    <div style={{ marginBottom: '48px' }}>
      
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
          Verified Athletic Performance
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Showcase combine measurements and official high school season metrics.
        </p>
      </div>

      {/* Clean Metric Cards Grid */}
      <div className="grid-stats" style={{ marginBottom: '28px' }}>
        {metricsList.map((m, idx) => {
          const IconComp = m.icon;
          const percentage = m.isSpeed
            ? Math.min(100, Math.max(20, ((m.max - m.valNum) / (m.max - 2.5)) * 100))
            : Math.min(100, (m.valNum / m.max) * 100);

          return (
            <div
              key={idx}
              className="apple-card"
              style={{
                padding: '28px',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                  {m.label}
                </span>
                <IconComp size={18} color="var(--text-dim)" />
              </div>

              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {m.value}
              </div>

              {/* Minimal Progress Bar */}
              <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.08)', height: '4px', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{
                  width: `${percentage}%`,
                  height: '100%',
                  background: 'var(--primary)',
                  borderRadius: '9999px'
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Season Stats Summary */}
      <div className="apple-card" style={{ padding: '32px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-muted)' }}>
          High School & Travel Season Performance
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
          {seasonStatsList.map((st, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-surface)',
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase' }}>
                {st.label}
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '4px', letterSpacing: '-0.02em' }}>
                {st.value}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
