import React from 'react';
import { Quote, Award, CheckCircle } from 'lucide-react';

export const CoachEndorsements = () => {
  const endorsements = [
    {
      id: 'end-1',
      coachName: 'Coach Ryan Johnson',
      role: 'Head Coach, Chugiak High School Varsity Softball',
      location: 'Eagle River, AK',
      quote: 'Emily is a exceptional student-athlete. Her instincts at shortstop are elite, but her work ethic and vocal leadership in the dugout are what set her apart. She brings 100% effort to every single practice and game.',
      highlights: ['Varsity Starter as Sophomore', 'Team High GPA Award', 'Vocal Defensive Captain']
    },
    {
      id: 'end-2',
      coachName: 'Coach Marcus Vance',
      role: 'Head Coach, Alaska Arsenal 16U Fastpitch',
      location: 'Anchorage / Regional Showcase Team',
      quote: 'Having coached Emily across regional travel tournaments in Washington and California, she thrives against top-tier D1/D2 prospect pitching. Her exit velocity off the bat (66 MPH) and fast turn at 2B make her a game-changer.',
      highlights: ['Lead-off Hitter .418 BA', 'Multi-Position Utility', 'Top Combine Velocity']
    }
  ];

  return (
    <section className="portfolio-section" id="coaches">
      <div className="section-header">
        <span className="badge badge-primary">Social Proof & Character</span>
        <h2 className="section-title" style={{ marginTop: '6px' }}>
          Coach Endorsements & References
        </h2>
        <p className="section-subtitle">
          Testimonials from Emily's High School & Regional Travel Ball Head Coaches evaluating her athletic IQ and work ethic.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {endorsements.map(item => (
          <div key={item.id} className="apple-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <Quote color="var(--primary)" size={32} style={{ opacity: 0.8 }} />
                <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>Verified Coach Reference</span>
              </div>

              <p style={{ fontSize: '1.02rem', fontStyle: 'italic', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '24px' }}>
                "{item.quote}"
              </p>
            </div>

            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {item.coachName}
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--primary)', fontWeight: 600 }}>
                {item.role}
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '14px' }}>
                📍 {item.location}
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {item.highlights.map((h, i) => (
                  <span key={i} className="badge badge-outline" style={{ fontSize: '0.72rem' }}>
                    <CheckCircle size={12} color="var(--accent)" /> {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
