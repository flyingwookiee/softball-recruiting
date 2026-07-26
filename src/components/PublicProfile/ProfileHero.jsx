import React from 'react';
import { MapPin, Trophy, Mail, Film, GraduationCap, ShieldCheck, Zap, Activity, ArrowRight, Download } from 'lucide-react';

export const ProfileHero = ({ athlete, onOpenContactModal }) => {
  return (
    <section className="apple-card glow-animation" style={{ padding: '48px 40px', marginBottom: '44px', background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative Dribbble Background Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '44px', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        
        {/* Left Column: Athlete Identity & Statement of Purpose */}
        <div>
          
          {/* Top Status Roster Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span className="badge badge-primary" style={{ fontSize: '0.82rem' }}>
              <Zap size={14} /> Class of {athlete.gradYear} ({athlete.classLevel})
            </span>
            <span className="badge badge-gold" style={{ fontSize: '0.82rem' }}>
              <GraduationCap size={14} /> Nursing (BSN) Major
            </span>
            <span className="badge badge-outline" style={{ fontSize: '0.82rem' }}>
              <ShieldCheck size={14} color="var(--accent)" /> NCAA ID #{athlete.ncaaId}
            </span>
          </div>

          {/* Large Oversized Display Headline */}
          <h1 style={{ fontSize: '3.8rem', fontWeight: 800, marginBottom: '4px', lineHeight: 1.02, letterSpacing: '-0.045em', color: 'var(--text-main)' }}>
            {athlete.name}
          </h1>

          <p style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            {athlete.primaryPosition} &bull; {athlete.secondaryPosition} &bull; Jersey #{athlete.jerseyNumber}
          </p>

          {/* Location & Team Specs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'var(--text-muted)', fontSize: '0.95rem', flexWrap: 'wrap', marginBottom: '24px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} color="var(--text-main)" /> {athlete.highSchool} ({athlete.hometown})
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Trophy size={16} color="var(--gold)" /> {athlete.travelTeam}
            </span>
          </div>

          {/* Statement of Purpose Box (Lovable / Dribbble Highlight Pattern) */}
          <div style={{ background: 'var(--bg-card)', padding: '20px 24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '32px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' }}>
              Recruiting Statement of Purpose
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6, fontWeight: 400 }}>
              "Seeking to contribute as a high-tempo Shortstop/Utility player for a competitive college softball program in Texas, Colorado, or the Pacific Northwest while earning a Bachelor of Science in Nursing (BSN)."
            </p>
          </div>

          {/* Dribbble Action Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
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
              Watch Showcase Film
            </a>
          </div>
        </div>

        {/* Right Column: Dribbble Athletic Roster Meter Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          
          <div className="apple-card" style={{ padding: '24px', background: 'var(--bg-card)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
              Exit Velocity
            </div>
            <div style={{ fontSize: '2.6rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.04em' }}>
              {athlete.metrics.exitVelocity}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>Verified Combine</div>
            
            {/* Visual Stat Meter */}
            <div className="stat-meter-bar">
              <div className="stat-meter-fill" style={{ width: '88%', background: 'var(--primary)' }} />
            </div>
          </div>

          <div className="apple-card" style={{ padding: '24px', background: 'var(--bg-card)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
              Throw Velocity
            </div>
            <div style={{ fontSize: '2.6rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.04em' }}>
              {athlete.metrics.overhandVelocity}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>Overhand Throw</div>
            
            {/* Visual Stat Meter */}
            <div className="stat-meter-bar">
              <div className="stat-meter-fill" style={{ width: '84%', background: 'var(--primary)' }} />
            </div>
          </div>

          <div className="apple-card" style={{ padding: '24px', background: 'var(--bg-card)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
              Cumulative GPA
            </div>
            <div style={{ fontSize: '2.6rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '-0.04em' }}>
              {athlete.gpa}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>{athlete.gpaScale} Unweighted</div>
            
            {/* Visual Stat Meter */}
            <div className="stat-meter-bar">
              <div className="stat-meter-fill" style={{ width: '98%', background: 'var(--gold)' }} />
            </div>
          </div>

          <div className="apple-card" style={{ padding: '24px', background: 'var(--bg-card)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
              Batting Average
            </div>
            <div style={{ fontSize: '2.6rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.04em' }}>
              {athlete.seasonStats.battingAverage}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>OBP: {athlete.seasonStats.onBasePercentage}</div>
            
            {/* Visual Stat Meter */}
            <div className="stat-meter-bar">
              <div className="stat-meter-fill" style={{ width: '85%', background: 'var(--accent)' }} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
