import React from 'react';
import { MapPin, Trophy, Mail, Film, ArrowUpRight } from 'lucide-react';

export const ProfileHero = ({ athlete, onOpenContactModal }) => {
  return (
    <section className="apple-card" style={{ padding: '40px', marginBottom: '32px' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'center' }}>
        
        {/* Left: Bio & Details */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span className="badge badge-primary">Class of {athlete.gradYear}</span>
            <span className="badge badge-outline">{athlete.classLevel}</span>
            <span className="badge badge-outline">NCAA ID: {athlete.ncaaId}</span>
          </div>

          <h1 style={{ fontSize: '3.2rem', fontWeight: 800, marginBottom: '6px', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
            {athlete.name}
          </h1>

          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '14px' }}>
            {athlete.primaryPosition} &bull; {athlete.secondaryPosition}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-muted)', fontSize: '0.9rem', flexWrap: 'wrap', marginBottom: '24px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={15} color="var(--text-main)" /> {athlete.highSchool} ({athlete.hometown})
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Trophy size={15} color="var(--gold)" /> {athlete.travelTeam}
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

            <a
              href="#videos"
              className="btn btn-secondary btn-lg"
            >
              <Film size={18} />
              Watch Video Film
            </a>
          </div>
        </div>

        {/* Right: Crisp Metrics Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        }}>
          
          <div className="apple-card" style={{ padding: '20px', textAlign: 'center', background: 'var(--bg-surface)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>
              Exit Velocity
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
              {athlete.metrics.exitVelocity}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Verified Combine</div>
          </div>

          <div className="apple-card" style={{ padding: '20px', textAlign: 'center', background: 'var(--bg-surface)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>
              Throw Velocity
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
              {athlete.metrics.overhandVelocity}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Overhand Throw</div>
          </div>

          <div className="apple-card" style={{ padding: '20px', textAlign: 'center', background: 'var(--bg-surface)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>
              Cumulative GPA
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '-0.03em' }}>
              {athlete.gpa}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{athlete.gpaScale}</div>
          </div>

          <div className="apple-card" style={{ padding: '20px', textAlign: 'center', background: 'var(--bg-surface)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>
              Batting Avg
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.03em' }}>
              {athlete.seasonStats.battingAverage}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>High School & Club</div>
          </div>

        </div>

      </div>
    </section>
  );
};
