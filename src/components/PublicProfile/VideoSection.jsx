import React, { useState } from 'react';
import { Play, Film, Clock, Tag, ExternalLink, X } from 'lucide-react';

export const VideoSection = ({ videos }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const categories = ['All', 'Full Showcase', 'Defense', 'Batting'];

  const filteredVideos = videos.filter(v => 
    activeCategory === 'All' || v.category === activeCategory
  );

  return (
    <section className="portfolio-section" id="videos">
      <div className="section-header">
        <span className="badge badge-primary">Recruiting Video Film</span>
        <h2 className="section-title" style={{ marginTop: '6px' }}>
          Video Highlights & Skills Showcase
        </h2>
        <p className="section-subtitle">
          Watch Emily's unedited game film, combine hitting evaluations, and infield footwork reels.
        </p>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="btn btn-sm"
            style={{
              background: activeCategory === cat ? 'var(--text-main)' : 'var(--bg-surface)',
              color: activeCategory === cat ? 'var(--bg-main)' : 'var(--text-muted)',
              borderRadius: '9999px',
              fontWeight: activeCategory === cat ? 700 : 500
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Cards Grid (Lovable Cinematographer Pattern) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredVideos.map(video => (
          <div
            key={video.id}
            className="apple-card"
            style={{ overflow: 'hidden', cursor: 'pointer', background: 'var(--bg-surface)' }}
            onClick={() => setSelectedVideo(video)}
          >
            {/* Thumbnail Box with Play Overlay */}
            <div style={{
              position: 'relative',
              aspectRatio: '16/9',
              background: '#050508',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={video.thumbnail}
                alt={video.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
              />

              {/* Center Play Button Overlay */}
              <div style={{
                position: 'absolute',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                transition: 'all 0.2s ease'
              }}>
                <Play size={24} fill="#ffffff" style={{ marginLeft: '3px' }} />
              </div>

              {/* Top Badges Overlay */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.72rem', backdropFilter: 'blur(10px)' }}>
                  {video.category}
                </span>
              </div>

              <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.75)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.74rem', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} /> {video.duration}
              </div>
            </div>

            {/* Video Meta Info */}
            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '1.08rem', fontWeight: 800, marginBottom: '6px', lineHeight: 1.3 }}>
                {video.title}
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '12px' }}>
                {video.description}
              </p>
              <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                Watch Video Film <ExternalLink size={13} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Video Player Modal */}
      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div
            className="apple-card animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '800px',
              padding: '24px',
              background: 'var(--bg-surface)',
              position: 'relative'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="btn btn-secondary btn-sm"
              style={{ position: 'absolute', top: '16px', right: '16px', padding: '6px', zIndex: 10 }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '14px' }}>
              {selectedVideo.title}
            </h3>

            <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#000', marginBottom: '16px' }}>
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo.embedUrl}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {selectedVideo.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
