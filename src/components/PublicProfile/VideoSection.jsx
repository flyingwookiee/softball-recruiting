import React, { useState } from 'react';
import { Play, ChevronLeft, ChevronRight, X } from 'lucide-react';

export const VideoSection = ({ videos }) => {
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Full Showcase', 'Defense', 'Batting'];

  const filteredVideos = filterCategory === 'All'
    ? videos
    : videos.filter(v => v.category === filterCategory);

  return (
    <div style={{ marginBottom: '48px' }}>
      
      {/* Header & Filter Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
            Video Highlights & Skills Film
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Watch verified showcase film and skill drill evaluations.
          </p>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', background: 'var(--bg-surface)', padding: '4px', borderRadius: '9999px', border: '1px solid var(--border-color)' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className="btn btn-sm"
              style={{
                background: filterCategory === cat ? 'var(--text-main)' : 'transparent',
                color: filterCategory === cat ? 'var(--bg-main)' : 'var(--text-muted)',
                borderRadius: '9999px',
                fontWeight: filterCategory === cat ? 700 : 500
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="grid-cards">
        {filteredVideos.map(vid => (
          <div
            key={vid.id}
            className="apple-card"
            style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
            onClick={() => setActiveVideoModal(vid)}
          >
            
            {/* Thumbnail */}
            <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#000' }}>
              <img
                src={vid.thumbnail}
                alt={vid.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85, transition: 'transform 0.4s ease' }}
              />
              
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
                }}>
                  <Play size={24} fill="#000000" style={{ marginLeft: '3px' }} />
                </div>
              </div>

              <span className="badge badge-primary" style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.7)', color: '#fff', backdropFilter: 'blur(10px)' }}>
                {vid.category}
              </span>

              <span style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '0.78rem', padding: '3px 10px', borderRadius: '6px', fontWeight: 600 }}>
                {vid.duration}
              </span>
            </div>

            {/* Meta */}
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.3, color: 'var(--text-main)' }}>
                {vid.title}
              </h3>
            </div>

          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div className="modal-overlay" onClick={() => setActiveVideoModal(null)}>
          <div className="apple-card animate-fade-in" style={{ width: '100%', maxWidth: '840px', padding: '24px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-xl)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-primary">{activeVideoModal.category}</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '4px' }}>{activeVideoModal.title}</h3>
              </div>
              <button onClick={() => setActiveVideoModal(null)} className="btn btn-secondary btn-sm" style={{ padding: '8px' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)', background: '#000' }}>
              <iframe
                src={activeVideoModal.url}
                title={activeVideoModal.title}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
