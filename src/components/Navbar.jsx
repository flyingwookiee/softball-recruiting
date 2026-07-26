import React from 'react';
import { LayoutDashboard, UserCheck, Sparkles, Edit3, Sun, Moon, Rocket } from 'lucide-react';

export const Navbar = ({ activeView, setActiveView, onOpenAiChat, onOpenProfileEditor, athlete, currentTheme, onThemeChange }) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '12px 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand & Athlete Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--text-main)',
            color: 'var(--bg-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.9rem'
          }}>
            {athlete.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {athlete.name}
              </span>
              <span className="badge badge-primary" style={{ fontSize: '0.72rem', padding: '2px 10px' }}>
                Class of {athlete.gradYear}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {athlete.highSchool} • {athlete.travelTeam}
            </p>
          </div>
        </div>

        {/* Apple Style Segmented Pill View Switcher */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.08)',
          padding: '3px',
          borderRadius: '9999px',
          border: '1px solid var(--border-color)'
        }}>
          <button
            onClick={() => setActiveView('public')}
            className="btn btn-sm"
            style={{
              background: activeView === 'public' ? '#ffffff' : 'transparent',
              color: activeView === 'public' ? '#000000' : 'var(--text-muted)',
              borderRadius: '9999px',
              fontWeight: activeView === 'public' ? 700 : 500,
              padding: '6px 18px'
            }}
          >
            <UserCheck size={15} />
            Public Coach Profile
          </button>

          <button
            onClick={() => setActiveView('dashboard')}
            className="btn btn-sm"
            style={{
              background: activeView === 'dashboard' ? '#ffffff' : 'transparent',
              color: activeView === 'dashboard' ? '#000000' : 'var(--text-muted)',
              borderRadius: '9999px',
              fontWeight: activeView === 'dashboard' ? 700 : 500,
              padding: '6px 18px'
            }}
          >
            <LayoutDashboard size={15} />
            Recruiting Dashboard
          </button>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Theme Selector Dropdown */}
          <select
            className="select"
            style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '9999px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)', width: 'auto', cursor: 'pointer' }}
            value={currentTheme}
            onChange={e => onThemeChange(e.target.value)}
          >
            <option value="dark"> Apple Studio Dark</option>
            <option value="light"> Apple Studio Light</option>
            <option value="spacex">🚀 SpaceX Stealth</option>
          </select>

          {/* Edit Profile Button */}
          <button
            onClick={onOpenProfileEditor}
            className="btn btn-secondary btn-sm"
          >
            <Edit3 size={15} />
            Edit Profile
          </button>

          {/* AI Assistant Button */}
          <button
            onClick={onOpenAiChat}
            className="btn btn-primary btn-sm"
          >
            <Sparkles size={15} />
            Gemini AI
          </button>

        </div>

      </div>
    </header>
  );
};
