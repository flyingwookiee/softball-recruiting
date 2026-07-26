import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

export const ScheduleSection = ({ schedule }) => {
  return (
    <div style={{ marginBottom: '48px' }}>
      
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
          Showcase & Travel Ball Itinerary
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Class of 2029 upcoming college exposure tournaments and high school games.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {schedule.map((item, idx) => (
          <div
            key={item.id}
            className="apple-card"
            style={{
              padding: '24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              alignItems: 'center'
            }}
          >
            
            {/* Event Name & Team */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>{item.team}</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {item.event}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginTop: '4px' }}>
                {item.notes}
              </p>
            </div>

            {/* Date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar size={20} color="var(--primary)" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase' }}>DATES</div>
                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>{item.dates}</div>
              </div>
            </div>

            {/* Location & Facility */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MapPin size={20} color="var(--accent)" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase' }}>LOCATION / COMPLEX</div>
                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>{item.location}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.facility}</div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
