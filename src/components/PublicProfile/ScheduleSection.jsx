import React from 'react';
import { Calendar, MapPin, Trophy, Compass } from 'lucide-react';

export const ScheduleSection = ({ schedule }) => {
  return (
    <section className="portfolio-section" id="schedule">
      <div className="section-header">
        <span className="badge badge-primary">Recruiting Tournaments</span>
        <h2 className="section-title" style={{ marginTop: '6px' }}>
          Upcoming Showcase & Tournament Schedule
        </h2>
        <p className="section-subtitle">
          Where college coaches and recruiters can evaluate Emily playing live during the 2025–2026 season.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {schedule.map(event => (
          <div key={event.id} className="apple-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--bg-surface)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                  <Calendar size={13} /> {event.date}
                </span>
                <span className="badge badge-outline" style={{ fontSize: '0.72rem' }}>
                  {event.division}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '6px', color: 'var(--text-main)', lineHeight: 1.3 }}>
                {event.event}
              </h3>

              <div style={{ fontSize: '0.88rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <MapPin size={15} /> {event.location}
              </div>
            </div>

            <div style={{ paddingTop: '14px', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              <span>📍 {event.field || 'Field Location TBA'}</span>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Alaska Arsenal #14</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
