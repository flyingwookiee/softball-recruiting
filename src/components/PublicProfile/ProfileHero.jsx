import React from 'react';
import { MapPin, Trophy, Mail, Film, Download, ShieldCheck, GraduationCap, ArrowUpRight } from 'lucide-react';

export const ProfileHero = ({ athlete, onOpenContactModal }) => {
  return (
    <section className="apple-card" style={{ padding: '40px', marginBottom: '40px', background: 'var(--bg-surface)' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
        
        {/* Left Column: Statement of Purpose & Bio */}
        <div>
          
          {/* Status Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
            <span className="badge badge-primary">Class of {athlete.gradYear}</span>
            <span className="badge badge-gold">
              <GraduationCap size={14} /> Nursing (BSN) Major Track
            </span>
            <span className="badge badge-outline">
              <ShieldCheck size={14} color="var(--accent)" /> NCAA ID: {athlete.ncaaId}
            </span>
          </div>

          {/* Name & Headline */}
          <h1 style={{ fontSize: '3.4rem', fontWeight: 800, marginBottom: '6px', lineHeight: 1.05, letterSpacing: '-0.04em' }}>
            {athlete.name}
          </h1>

          <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {athlete.primaryPosition} &bull; {athlete.secondaryPosition} &bull; Jersey #{athlete.jerseyNumber}
          </p>

          {/* Location & Team Specs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', color: 'var(--text-muted)', fontSize: '0.92rem', flexWrap: 'wrap', marginBottom: '20px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} color="var(--text-main)" /> {athlete.highSchool} ({athlete.hometown})
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Trophy size={16} color="var(--gold)" /> {athlete.travelTeam}
            </span>
          </div>

          {/* Statement of Purpose Box (Lovable Portfolio Principle) */}
          <div style={{ background: 'var(--bg-card)', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '28px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
              Statement of Purpose
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
              "Seeking to contribute as a high-tempo Shortstop/Utility player for a competitive college softball program in Texas, Colorado, or the Pacific Northwest while earning a Bachelor of Science in Nursing (BSN)."
            </p>
          </div>

          {/* Primary Action Buttons */}
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
              Watch Showcase Film
            </a>
          </div>
        </div>

        {/* Right Column: Key Digitals & Performance Grid (Lovable Model/Athlete Pattern) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          
          <div className="apple-card" style={{ padding: '22px', textAlign: 'center', background: 'var(--bg-card)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
              Exit Velocity
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
              {athlete.metrics.exitVelocity}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--primary)', fontWeight: 600 }}>Verified Combine</div>
          </div>

          <div className="apple-card" style={{ padding: '22px', textAlign: 'center', background: 'var(--bg-card)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
              Throw Velocity
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
              {athlete.metrics.overhandVelocity}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>Overhand Throw</div>
          </div>

          <div className="apple-card" style={{ padding: '22px', textAlign: 'center', background: 'var(--bg-card)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
              Cumulative GPA
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '-0.03em' }}>
              {athlete.gpa}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>{athlete.gpaScale} Unweighted</div>
          </div>

          <div className="apple-card" style={{ padding: '22px', textAlign: 'center', background: 'var(--bg-card)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
              Batting Average
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.03em' }}>
              {athlete.seasonStats.battingAverage}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>OBP: {athlete.seasonStats.onBasePercentage}</div>
          </div>

        </div>

      </div>
    </section>
  );
};
