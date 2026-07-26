import React from 'react';
import { GraduationCap, Award, BookOpen, ShieldCheck, CheckCircle2, HeartPulse } from 'lucide-react';

export const AcademicsSection = ({ athlete }) => {
  return (
    <section className="portfolio-section" id="academics">
      <div className="section-header">
        <span className="badge badge-primary">Academic Credentials</span>
        <h2 className="section-title" style={{ marginTop: '6px' }}>
          Scholarly Achievements & Nursing Major
        </h2>
        <p className="section-subtitle">
          Academic excellence, NCAA eligibility verification, and healthcare career focus.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Card 1: High School & GPA */}
        <div className="apple-card" style={{ padding: '32px', background: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--primary-bg)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{athlete.highSchool}</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Class of {athlete.gradYear} ({athlete.classLevel}) &bull; {athlete.hometown}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Cumulative GPA</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold)' }}>{athlete.gpa}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{athlete.gpaScale} Scale</div>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>NCAA Eligibility</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)', marginTop: '4px' }}>VERIFIED</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>ID #{athlete.ncaaId}</div>
            </div>
          </div>

          <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            <strong>SAT / ACT Testing:</strong> Scheduled for Fall 2026 / Spring 2027.
          </div>
        </div>

        {/* Card 2: Intended College Major & Academic Track */}
        <div className="apple-card" style={{ padding: '32px', background: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(251, 191, 36, 0.12)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HeartPulse size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Intended Academic Majors</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Healthcare & Medical Science</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {athlete.intendedMajors.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-card)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.9rem', fontWeight: 600 }}>
                <CheckCircle2 size={16} color="var(--primary)" />
                {m}
              </div>
            ))}
          </div>

          <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            💡 Seeking institutions offering <strong>Direct-Entry BSN Nursing</strong> or strong clinical partnerships with regional hospitals.
          </div>
        </div>

      </div>
    </section>
  );
};
