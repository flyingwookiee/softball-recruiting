import React from 'react';
import { Shield, Sparkles, Lock, LogOut } from 'lucide-react';

export const Navbar = ({ activeView, athlete, currentTheme, onThemeChange, onOpenLockModal, onLockDashboard, isUnlocked }) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(7, 7, 9, 0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '14px 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Left: Emily Sain Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--text-main)',
            color: 'var(--bg-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.92rem'
          }}>
            {athlete.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                {athlete.name}
              </span>
              <span className="badge badge-primary" style={{ fontSize: '0.72rem', padding: '2px 10px' }}>
                Class of {athlete.gradYear}
              </span>
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              {athlete.highSchool} • {athlete.primaryPosition}
            </p>
          </div>
        </div>

        {/* Center: Public Portfolio Navigation Anchors */}
        {activeView === 'public' ? (
          <div style={{ display: 'flex', gap: '20px', fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }} className="desktop-only">
            <a href="#stats" style={{ color: 'inherit', textDecoration: 'none' }}>Performance Stats</a>
            <a href="#videos" style={{ color: 'inherit', textDecoration: 'none' }}>Video Reels</a>
            <a href="#schedule" style={{ color: 'inherit', textDecoration: 'none' }}>Tournament Schedule</a>
            <a href="#academics" style={{ color: 'inherit', textDecoration: 'none' }}>Academics</a>
            <a href="#coaches" style={{ color: 'inherit', textDecoration: 'none' }}>Coach References</a>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-primary" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid #10b981' }}>
              🔒 Private Dashboard Active
            </span>
          </div>
        )}

        {/* Right: Controls (Theme Selector ONLY visible on Internal Dashboard) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Theme Selector: Rendered ONLY on Internal Dashboard */}
          {activeView === 'dashboard' && (
            <select
              className="select"
              style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '9999px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)', width: 'auto', cursor: 'pointer' }}
              value={currentTheme}
              onChange={e => onThemeChange(e.target.value)}
            >
              <option value="dark"> Studio Dark</option>
              <option value="light"> Studio Light</option>
              <option value="spacex">🚀 SpaceX Stealth</option>
            </select>
          )}

          {/* Unlocked Dashboard vs Public Portfolio Exit Control */}
          {isUnlocked && activeView === 'dashboard' ? (
            <button
              onClick={onLockDashboard}
              className="btn btn-secondary btn-sm"
            >
              <LogOut size={15} /> Exit to Public Portfolio
            </button>
          ) : isUnlocked && activeView === 'public' ? (
            <button
              onClick={onOpenLockModal}
              className="btn btn-secondary btn-sm"
            >
              <Lock size={15} /> Return to Dashboard
            </button>
          ) : null}

        </div>

      </div>
    </header>
  );
};
