import React, { useState } from 'react';
import { Save, User, Activity, GraduationCap, Video, Calendar, Plus, Trash2, Check, Sparkles, Mail, Phone } from 'lucide-react';

export const ProfileEditor = ({ athlete, onSaveProfile }) => {
  const [formData, setFormData] = useState({ ...athlete });
  const [activeTab, setActiveTab] = useState('bio'); // 'bio' | 'stats' | 'academics' | 'videos' | 'schedule'
  const [saved, setSaved] = useState(false);

  // New Item Temporary States
  const [newMajor, setNewMajor] = useState('');
  const [newHonor, setNewHonor] = useState('');
  
  const [newVideo, setNewVideo] = useState({
    title: '',
    category: 'Full Showcase',
    duration: '2:30',
    url: '',
    hudlUrl: 'https://www.hudl.com',
    thumbnail: 'https://images.unsplash.com/photo-1599586120429-48281b6f0eca?auto=format&fit=crop&w=800&q=80'
  });

  const [newEvent, setNewEvent] = useState({
    event: '',
    dates: '',
    location: '',
    facility: '',
    team: formData.travelTeam || 'Alaska Gold 16U',
    notes: ''
  });

  const handleSave = (e) => {
    if (e) e.preventDefault();
    onSaveProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Helper Array Manipulations
  const addMajor = () => {
    if (!newMajor.trim()) return;
    const updated = [...(formData.intendedMajors || []), newMajor.trim()];
    setFormData({ ...formData, intendedMajors: updated });
    setNewMajor('');
  };

  const removeMajor = (idx) => {
    const updated = formData.intendedMajors.filter((_, i) => i !== idx);
    setFormData({ ...formData, intendedMajors: updated });
  };

  const addHonor = () => {
    if (!newHonor.trim()) return;
    const updated = [...(formData.academicHonors || []), newHonor.trim()];
    setFormData({ ...formData, academicHonors: updated });
    setNewHonor('');
  };

  const removeHonor = (idx) => {
    const updated = formData.academicHonors.filter((_, i) => i !== idx);
    setFormData({ ...formData, academicHonors: updated });
  };

  const addVideoItem = () => {
    if (!newVideo.title.trim()) return;
    const videoObj = {
      ...newVideo,
      id: `v_${Date.now()}`,
      url: newVideo.url || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    };
    const updated = [videoObj, ...(formData.videos || [])];
    setFormData({ ...formData, videos: updated });
    setNewVideo({
      title: '',
      category: 'Full Showcase',
      duration: '2:30',
      url: '',
      hudlUrl: 'https://www.hudl.com',
      thumbnail: 'https://images.unsplash.com/photo-1599586120429-48281b6f0eca?auto=format&fit=crop&w=800&q=80'
    });
  };

  const removeVideoItem = (vidId) => {
    const updated = formData.videos.filter(v => v.id !== vidId);
    setFormData({ ...formData, videos: updated });
  };

  const addScheduleEvent = () => {
    if (!newEvent.event.trim()) return;
    const eventObj = {
      ...newEvent,
      id: `s_${Date.now()}`
    };
    const updated = [...(formData.schedule || []), eventObj];
    setFormData({ ...formData, schedule: updated });
    setNewEvent({
      event: '',
      dates: '',
      location: '',
      facility: '',
      team: formData.travelTeam || 'Alaska Gold 16U',
      notes: ''
    });
  };

  const removeScheduleEvent = (eventId) => {
    const updated = formData.schedule.filter(s => s.id !== eventId);
    setFormData({ ...formData, schedule: updated });
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      
      {/* Editor Title & Save Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Complete Athlete Profile & Media Manager</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Edit stats, videos, tournament schedule, academics, and contact info displayed on your public profile.
          </p>
        </div>

        <button onClick={handleSave} className="btn btn-primary btn-lg" style={{ borderColor: saved ? '#10b981' : 'transparent' }}>
          {saved ? <Check size={18} /> : <Save size={18} />}
          {saved ? 'Changes Saved Live!' : 'Save All Changes'}
        </button>
      </div>

      {/* Editor Section Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '24px', overflowX: 'auto' }}>
        {[
          { id: 'bio', label: 'Bio & Info', icon: User },
          { id: 'stats', label: 'Metrics & Stats', icon: Activity },
          { id: 'academics', label: 'Academics & Contact', icon: GraduationCap },
          { id: 'videos', label: 'Highlight Videos', icon: Video, count: formData.videos?.length || 0 },
          { id: 'schedule', label: 'Tournament Schedule', icon: Calendar, count: formData.schedule?.length || 0 }
        ].map(t => {
          const IconComp = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="btn btn-sm"
              style={{
                background: isActive ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.04)',
                color: isActive ? '#0a0e17' : 'var(--text-muted)',
                borderColor: isActive ? 'transparent' : 'var(--border-color)',
                whiteSpace: 'nowrap'
              }}
            >
              <IconComp size={16} />
              {t.label}
              {t.count !== undefined && (
                <span style={{ background: isActive ? '#0a0e17' : 'var(--primary-glow)', color: isActive ? '#fff' : 'var(--primary)', padding: '1px 6px', borderRadius: '9999px', fontSize: '0.75rem' }}>
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="glass-panel" style={{ padding: '28px' }}>
        
        {/* ================= TAB 1: BIO & ATHLETICS ================= */}
        {activeTab === 'bio' && (
          <div className="animate-fade-in">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={20} /> General Athlete & Team Details
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Athlete Full Name</label>
                <input type="text" className="input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Graduation Year</label>
                <input type="text" className="input" value={formData.gradYear} onChange={e => setFormData({ ...formData, gradYear: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Class Level</label>
                <input type="text" className="input" value={formData.classLevel} onChange={e => setFormData({ ...formData, classLevel: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>High School</label>
                <input type="text" className="input" value={formData.highSchool} onChange={e => setFormData({ ...formData, highSchool: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Hometown / State</label>
                <input type="text" className="input" value={formData.hometown} onChange={e => setFormData({ ...formData, hometown: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Primary Position</label>
                <input type="text" className="input" value={formData.primaryPosition} onChange={e => setFormData({ ...formData, primaryPosition: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Secondary Position</label>
                <input type="text" className="input" value={formData.secondaryPosition} onChange={e => setFormData({ ...formData, secondaryPosition: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Bats / Throws</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" className="input" placeholder="Bats" value={formData.bats} onChange={e => setFormData({ ...formData, bats: e.target.value })} />
                  <input type="text" className="input" placeholder="Throws" value={formData.throws} onChange={e => setFormData({ ...formData, throws: e.target.value })} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Height / Weight</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" className="input" placeholder="Height" value={formData.height} onChange={e => setFormData({ ...formData, height: e.target.value })} />
                  <input type="text" className="input" placeholder="Weight" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Travel / Club Team</label>
                <input type="text" className="input" value={formData.travelTeam} onChange={e => setFormData({ ...formData, travelTeam: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Jersey Number</label>
                <input type="text" className="input" value={formData.jerseyNumber} onChange={e => setFormData({ ...formData, jerseyNumber: e.target.value })} />
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: METRICS & STATS ================= */}
        {activeTab === 'stats' && (
          <div className="animate-fade-in">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={20} /> Verified Showcase Metrics & Season Stats
            </h4>

            <div style={{ marginBottom: '24px' }}>
              <h5 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px' }}>Verified Physical Metrics</h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Exit Velocity</label>
                  <input type="text" className="input" value={formData.metrics?.exitVelocity || ''} onChange={e => setFormData({ ...formData, metrics: { ...formData.metrics, exitVelocity: e.target.value } })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Overhand Throw Velo</label>
                  <input type="text" className="input" value={formData.metrics?.overhandVelocity || ''} onChange={e => setFormData({ ...formData, metrics: { ...formData.metrics, overhandVelocity: e.target.value } })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Home-to-First Time</label>
                  <input type="text" className="input" value={formData.metrics?.homeToFirst || ''} onChange={e => setFormData({ ...formData, metrics: { ...formData.metrics, homeToFirst: e.target.value } })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Shuttle Run</label>
                  <input type="text" className="input" value={formData.metrics?.shuttleRun || ''} onChange={e => setFormData({ ...formData, metrics: { ...formData.metrics, shuttleRun: e.target.value } })} />
                </div>
              </div>
            </div>

            <div>
              <h5 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px' }}>Season Batting & Fielding Stats</h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Batting Avg (BA)</label>
                  <input type="text" className="input" value={formData.seasonStats?.battingAverage || ''} onChange={e => setFormData({ ...formData, seasonStats: { ...formData.seasonStats, battingAverage: e.target.value } })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>On Base Pct (OBP)</label>
                  <input type="text" className="input" value={formData.seasonStats?.onBasePct || ''} onChange={e => setFormData({ ...formData, seasonStats: { ...formData.seasonStats, onBasePct: e.target.value } })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Slugging (SLG)</label>
                  <input type="text" className="input" value={formData.seasonStats?.sluggingPct || ''} onChange={e => setFormData({ ...formData, seasonStats: { ...formData.seasonStats, sluggingPct: e.target.value } })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>OPS</label>
                  <input type="text" className="input" value={formData.seasonStats?.ops || ''} onChange={e => setFormData({ ...formData, seasonStats: { ...formData.seasonStats, ops: e.target.value } })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Fielding Pct</label>
                  <input type="text" className="input" value={formData.seasonStats?.fieldingPct || ''} onChange={e => setFormData({ ...formData, seasonStats: { ...formData.seasonStats, fieldingPct: e.target.value } })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Stolen Bases</label>
                  <input type="text" className="input" value={formData.seasonStats?.stolenBases || ''} onChange={e => setFormData({ ...formData, seasonStats: { ...formData.seasonStats, stolenBases: e.target.value } })} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ACADEMICS & CONTACT ================= */}
        {activeTab === 'academics' && (
          <div className="animate-fade-in">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap size={20} /> Academic Credentials & Contact Details
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Cumulative GPA</label>
                <input type="text" className="input" value={formData.gpa} onChange={e => setFormData({ ...formData, gpa: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>NCAA ID Number</label>
                <input type="text" className="input" value={formData.ncaaId} onChange={e => setFormData({ ...formData, ncaaId: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Athlete Email</label>
                <input type="email" className="input" value={formData.contact?.email || ''} onChange={e => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Athlete Phone</label>
                <input type="text" className="input" value={formData.contact?.phone || ''} onChange={e => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Parent Email</label>
                <input type="email" className="input" value={formData.contact?.parentEmail || ''} onChange={e => setFormData({ ...formData, contact: { ...formData.contact, parentEmail: e.target.value } })} />
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>Twitter Handle</label>
                <input type="text" className="input" value={formData.contact?.twitter || ''} onChange={e => setFormData({ ...formData, contact: { ...formData.contact, twitter: e.target.value } })} />
              </div>
            </div>

            {/* Intended Majors Manager */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 800, display: 'block', marginBottom: '8px' }}>
                Intended Majors & Academic Fields
              </label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Add major (e.g. Biology, Sports Management...)"
                  value={newMajor}
                  onChange={e => setNewMajor(e.target.value)}
                />
                <button onClick={addMajor} type="button" className="btn btn-primary btn-sm">
                  <Plus size={16} /> Add
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {formData.intendedMajors?.map((m, idx) => (
                  <span key={idx} className="badge badge-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    {m}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => removeMajor(idx)} />
                  </span>
                ))}
              </div>
            </div>

            {/* Academic Honors Manager */}
            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 800, display: 'block', marginBottom: '8px' }}>
                Academic Honors & Achievements
              </label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Add honor (e.g. Honor Roll, AP Scholar...)"
                  value={newHonor}
                  onChange={e => setNewHonor(e.target.value)}
                />
                <button onClick={addHonor} type="button" className="btn btn-primary btn-sm">
                  <Plus size={16} /> Add
                </button>
              </div>
              <div style={{ display: 'grid', gap: '6px' }}>
                {formData.academicHonors?.map((h, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-surface)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                    <span>• {h}</span>
                    <Trash2 size={14} color="#ff4d4d" style={{ cursor: 'pointer' }} onClick={() => removeHonor(idx)} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 4: HIGHLIGHT VIDEOS ================= */}
        {activeTab === 'videos' && (
          <div className="animate-fade-in">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Video size={20} /> Highlight Reels & Skills Video Manager
            </h4>

            {/* Add New Video Form */}
            <div style={{ background: 'var(--bg-surface)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
              <h5 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '12px', color: 'var(--primary)' }}>+ Add New Highlight Video</h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Video Title (e.g. 2025 Summer Showcase Film)"
                  value={newVideo.title}
                  onChange={e => setNewVideo({ ...newVideo, title: e.target.value })}
                />
                <select
                  className="select"
                  value={newVideo.category}
                  onChange={e => setNewVideo({ ...newVideo, category: e.target.value })}
                >
                  <option value="Full Showcase">Full Showcase</option>
                  <option value="Defense">Defense</option>
                  <option value="Batting">Batting</option>
                  <option value="Pitching">Pitching</option>
                </select>
                <input
                  type="text"
                  className="input"
                  placeholder="Embed URL (e.g. youtube.com/embed/...)"
                  value={newVideo.url}
                  onChange={e => setNewVideo({ ...newVideo, url: e.target.value })}
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Hudl Profile Link"
                  value={newVideo.hudlUrl}
                  onChange={e => setNewVideo({ ...newVideo, hudlUrl: e.target.value })}
                />
              </div>
              <button onClick={addVideoItem} type="button" className="btn btn-primary btn-sm">
                <Plus size={16} /> Add Video to Showcase
              </button>
            </div>

            {/* Existing Videos List */}
            <div style={{ display: 'grid', gap: '12px' }}>
              {formData.videos?.map((vid) => (
                <div key={vid.id} style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <span className="badge badge-accent" style={{ fontSize: '0.7rem', marginBottom: '4px' }}>{vid.category}</span>
                    <h5 style={{ fontWeight: 800, fontSize: '0.95rem' }}>{vid.title}</h5>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>URL: {vid.url}</p>
                  </div>
                  <button onClick={() => removeVideoItem(vid.id)} className="btn btn-outline btn-sm" style={{ color: '#ff4d4d' }}>
                    <Trash2 size={14} /> Remove Video
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: TOURNAMENT SCHEDULE ================= */}
        {activeTab === 'schedule' && (
          <div className="animate-fade-in">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={20} /> Tournament & Travel Ball Schedule Manager
            </h4>

            {/* Add New Schedule Form */}
            <div style={{ background: 'var(--bg-surface)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
              <h5 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '12px', color: 'var(--gold)' }}>+ Add New Showcase / Game Event</h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Event Name (e.g. PNW Showcase)"
                  value={newEvent.event}
                  onChange={e => setNewEvent({ ...newEvent, event: e.target.value })}
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Dates (e.g. Oct 18-20, 2025)"
                  value={newEvent.dates}
                  onChange={e => setNewEvent({ ...newEvent, dates: e.target.value })}
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Location (e.g. Seattle, WA)"
                  value={newEvent.location}
                  onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Facility / Field #"
                  value={newEvent.facility}
                  onChange={e => setNewEvent({ ...newEvent, facility: e.target.value })}
                />
              </div>
              <button onClick={addScheduleEvent} type="button" className="btn btn-primary btn-sm">
                <Plus size={16} /> Add Event to Schedule
              </button>
            </div>

            {/* Existing Schedule Items */}
            <div style={{ display: 'grid', gap: '12px' }}>
              {formData.schedule?.map((item) => (
                <div key={item.id} style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <span className="badge badge-gold" style={{ fontSize: '0.7rem', marginBottom: '4px' }}>{item.team}</span>
                    <h5 style={{ fontWeight: 800, fontSize: '0.95rem' }}>{item.event}</h5>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      📅 {item.dates} • 📍 {item.location} ({item.facility})
                    </p>
                  </div>
                  <button onClick={() => removeScheduleEvent(item.id)} className="btn btn-outline btn-sm" style={{ color: '#ff4d4d' }}>
                    <Trash2 size={14} /> Remove Event
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Save Button at bottom */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '20px', marginTop: '20px', borderTop: '1px solid var(--border-color)' }}>
          <button onClick={handleSave} className="btn btn-primary btn-lg" style={{ borderColor: saved ? '#10b981' : 'transparent' }}>
            {saved ? <Check size={18} /> : <Save size={18} />}
            {saved ? 'All Profile Changes Saved!' : 'Save All Changes'}
          </button>
        </div>

      </div>

    </div>
  );
};
