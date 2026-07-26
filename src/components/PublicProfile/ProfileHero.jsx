import React from 'react';
import { MapPin, Trophy, Mail, Edit3, ArrowUpRight } from 'lucide-react';

export const ProfileHero = ({ athlete, onOpenContactModal, onOpenProfileEditor }) => {
  return (
    <section className="apple-card" style={{ padding: '48px', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
        
        {/* Left Column: Bold Headline & Bio */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span className="badge badge-primary">Class of {athlete.gradYear}</span>
            <span className="badge badge-outline">{athlete.classLevel}</span>
            <span className="badge badge-outline">NCAA ID: {athlete.ncaaId}</span>
          </div>

          <h1 style={{ fontSize: '3.6rem', fontWeight: 800, marginBottom: '8px', lineHeight: 1.05, letterSpacing: '-0.04em' }}>
            {athlete.name}
          </h1>

          <p style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            {athlete.primaryPosition} &bull; {athlete.secondaryPosition}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'var(--text-muted)', fontSize: '0.95rem', flexWrap: 'wrap', marginBottom: '28px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} color="var(--text-main)" /> {athlete.highSchool} ({athlete.hometown})
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Trophy size={16} color="var(--gold)" /> {athlete.travelTeam}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenContactModal}
              className="btn btn-primary btn-lg"
            >
              <Mail size={18} />
              College Coach Inquiry
            </button>

            <button
              onClick={onOpenProfileEditor}
              className="btn btn-secondary btn-lg"
            >
              <Edit3 size={18} />
              Edit Profile Data
            </button>
          </div>
        </div>

        {/* Right Column: Clean Apple-Style Key Metrics Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px'
        }}>
          
          <div className="apple-card" style={{ padding: '24px', textAlign: 'center', background: 'var(--bg-surface)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
              Exit Velocity
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
              {athlete.metrics.exitVelocity}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>Verified Showcase</div>
          </div>

          <div className="apple-card" style={{ padding: '24px', textAlign: 'center', background: 'var(--bg-surface)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
              Throw Velocity
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
              {athlete.metrics.overhandVelocity}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>Overhand Throw</div>
          </div>

          <div className="apple-card" style={{ padding: '24px', textAlign: 'center', background: 'var(--bg-surface)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
              Cumulative GPA
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '-0.03em' }}>
              {athlete.gpa}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>{athlete.gpaScale}</div>
          </div>

          <div className="apple-card" style={{ padding: '24px', textAlign: 'center', background: 'var(--bg-surface)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
              Batting Avg
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.03em' }}>
              {athlete.seasonStats.battingAverage}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>High School & Club</div>
          </div>

        </div>

      </div>
    </section>
  );
};
