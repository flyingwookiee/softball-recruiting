import React from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export const AcademicsSection = ({ athlete }) => {
  return (
    <div style={{ marginBottom: '48px' }}>
      
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
          Academic Profile & Credentials
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* GPA & High School Card */}
        <div className="apple-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--primary-bg)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <GraduationCap size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                High School
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                {athlete.highSchool} ({athlete.hometown})
              </h3>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>GPA</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '-0.03em' }}>{athlete.gpa}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{athlete.gpaScale}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>NCAA ID</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', marginTop: '4px' }}>{athlete.ncaaId}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Class of {athlete.gradYear}</div>
            </div>
          </div>
        </div>

        {/* Intended Majors & Honors */}
        <div className="apple-card" style={{ padding: '32px' }}>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={16} /> Intended Academic Majors
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {athlete.intendedMajors.map((m, idx) => (
                <span key={idx} className="badge badge-primary">
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={16} /> Academic Honors
            </h4>
            <ul style={{ listStyleType: 'none', display: 'grid', gap: '8px' }}>
              {athlete.academicHonors.map((h, i) => (
                <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)' }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
