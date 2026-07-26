import React, { useState } from 'react';
import { Search, Filter, Plus, Check, ExternalLink, MapPin, Award, BookOpen } from 'lucide-react';
import { collegesDatabase } from '../../data/collegesDatabase';

export const CollegeFinder = ({ targets, onAddTarget }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');

  const divisions = ['All', 'NCAA D1', 'NCAA D2', 'NCAA D3', 'NAIA'];
  const regions = ['All', 'Pacific Northwest', 'West Coast', 'Mountain', 'Southwest'];

  const isTargeted = (id) => targets.some(t => t.id === id || t.name === id);

  const filteredColleges = collegesDatabase.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.popularMajors.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDiv = divisionFilter === 'All' || c.division === divisionFilter;
    const matchesReg = regionFilter === 'All' || c.region === regionFilter;

    return matchesSearch && matchesDiv && matchesReg;
  });

  return (
    <div style={{ marginBottom: '32px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>College Softball Program Directory</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Discover programs, explore coach contact emails, and save schools directly to your target CRM.
          </p>
        </div>

        {/* Search & Filters */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', width: '100%', maxWidth: '650px' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input"
              style={{ paddingLeft: '40px' }}
              placeholder="Search school name, city, state, or major..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="select"
            style={{ width: 'auto', minWidth: '130px' }}
            value={divisionFilter}
            onChange={e => setDivisionFilter(e.target.value)}
          >
            {divisions.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <select
            className="select"
            style={{ width: 'auto', minWidth: '150px' }}
            value={regionFilter}
            onChange={e => setRegionFilter(e.target.value)}
          >
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* College Cards Grid */}
      <div className="grid-cards">
        {filteredColleges.map(college => {
          const added = isTargeted(college.id);

          return (
            <div key={college.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-primary">{college.division}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{college.conference}</span>
                </div>

                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '4px' }}>
                  {college.name}
                </h4>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                  <MapPin size={14} color="var(--accent)" /> {college.city}, {college.state} ({college.region})
                </div>

                {/* Coach Info Box */}
                <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>HEAD COACH</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>{college.headCoach}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary)', wordBreak: 'break-all' }}>{college.coachEmail}</div>
                </div>

                {/* Majors Tags */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <BookOpen size={12} /> Popular Majors:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {college.popularMajors.slice(0, 3).map((m, idx) => (
                      <span key={idx} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '6px', color: 'var(--text-muted)' }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                <button
                  onClick={() => onAddTarget(college)}
                  disabled={added}
                  className="btn btn-sm"
                  style={{
                    flex: 1,
                    background: added ? 'rgba(16, 185, 129, 0.15)' : 'var(--primary-gradient)',
                    color: added ? '#10b981' : '#0a0e17',
                    borderColor: added ? '#10b981' : 'transparent',
                    cursor: added ? 'default' : 'pointer'
                  }}
                >
                  {added ? <Check size={16} /> : <Plus size={16} />}
                  {added ? 'Added to Target List' : 'Add to Target CRM'}
                </button>

                <a
                  href={college.website}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ padding: '8px' }}
                  title="Visit Team Website"
                >
                  <ExternalLink size={16} />
                </a>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
