import React, { useState } from 'react';
import { DollarSign, Award, ShieldCheck, Check, Plus, ExternalLink, Calendar, Calculator, Sparkles, BookOpen, Trash2 } from 'lucide-react';
import { scholarshipsDatabase } from '../../data/scholarshipsDatabase';

export const ScholarshipTracker = ({ savedScholarships, onSaveScholarship, onRemoveScholarship, onUpdateScholarshipStatus, onConsultAi }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [giBillYears, setGiBillYears] = useState(2); // 2 years GI Bill
  const [estAnnualTuition, setEstAnnualTuition] = useState(22000); // Average D2/D3/State In-State tuition
  const [estAthleticAid, setEstAthleticAid] = useState(7000); // Average partial softball aid

  const categories = ['All', 'Nursing BSN', 'Military Child / Veteran Family', 'Alaska Resident', 'Athletic Softball', 'Academic Merit'];

  const filteredScholarships = scholarshipsDatabase.filter(s => {
    const matchesCat = filterCategory === 'All' || s.category === filterCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.eligibility.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const isSaved = (id) => savedScholarships.some(s => s.id === id);

  // GI Bill & Funding Calculation
  const giBillTotalCoverage = giBillYears * estAnnualTuition;
  const athletic4YearTotal = estAthleticAid * 4;
  const total4YearNeed = estAnnualTuition * 4;
  const remainingNeedToCover = Math.max(0, total4YearNeed - (giBillTotalCoverage + athletic4YearTotal));

  return (
    <div style={{ marginBottom: '36px' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <span className="badge badge-primary">College Funding Strategy</span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '4px', letterSpacing: '-0.02em' }}>
            Scholarship Finder & GI Bill Funding Planner
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Combine your 2-Year Transferred GI Bill with Nursing Grants, Veteran Child Scholarships, and Softball Athletic Aid to graduate 100% debt-free.
          </p>
        </div>

        <button onClick={() => onConsultAi("Explain how to stack 2 years of transferred Post-9/11 GI Bill with softball athletic scholarships and Nursing BSN grants")} className="btn btn-primary btn-sm">
          <Sparkles size={16} /> Consult AI Funding Coach
        </button>
      </div>

      {/* GI Bill & 4-Year College Funding Calculator Card */}
      <div className="apple-card" style={{ padding: '28px', marginBottom: '32px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Calculator color="var(--primary)" size={22} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
            4-Year Funding & GI Bill Stacking Calculator
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          
          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Transferred GI Bill Duration (Years)
            </label>
            <select
              className="select"
              value={giBillYears}
              onChange={e => setGiBillYears(Number(e.target.value))}
            >
              <option value={1}>1 Year (18 months of benefits)</option>
              <option value={2}>2 Years (36 months of benefits)</option>
              <option value={3}>3 Years</option>
              <option value={4}>4 Years (Full GI Bill)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Est. Annual College Tuition & Fees ($)
            </label>
            <input
              type="number"
              className="input"
              value={estAnnualTuition}
              onChange={e => setEstAnnualTuition(Number(e.target.value))}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Est. Annual Athletic/Merit Aid ($)
            </label>
            <input
              type="number"
              className="input"
              value={estAthleticAid}
              onChange={e => setEstAthleticAid(Number(e.target.value))}
            />
          </div>

        </div>

        {/* Output Financial Summary Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Total 4-Year Tuition Need</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>${total4YearNeed.toLocaleString()}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 600 }}>GI Bill Coverage ({giBillYears} Yrs)</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>-${giBillTotalCoverage.toLocaleString()}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--gold)', textTransform: 'uppercase', fontWeight: 600 }}>Softball Aid (4 Yrs)</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold)' }}>-${athletic4YearTotal.toLocaleString()}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: remainingNeedToCover === 0 ? '#10b981' : 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>
              {remainingNeedToCover === 0 ? 'Fully Funded (100% Paid!)' : 'Gap to Cover via Grants'}
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: remainingNeedToCover === 0 ? '#10b981' : 'var(--accent)' }}>
              ${remainingNeedToCover.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Scholarship & Grant Directory</h3>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', width: '100%', maxWidth: '600px' }}>
          <input
            type="text"
            className="input"
            style={{ padding: '8px 14px', fontSize: '0.85rem', flex: 1 }}
            placeholder="Search scholarships (e.g. Nursing, Military, Alaska)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          <select
            className="select"
            style={{ width: 'auto', padding: '8px 14px', fontSize: '0.85rem' }}
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Directory Cards Grid */}
      <div className="grid-cards" style={{ marginBottom: '36px' }}>
        {filteredScholarships.map(sch => {
          const saved = isSaved(sch.id);

          return (
            <div key={sch.id} className="apple-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>{sch.category}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Deadline: {sch.deadline}</span>
                </div>

                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px', lineHeight: 1.3 }}>
                  {sch.name}
                </h4>

                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--gold)', marginBottom: '10px' }}>
                  {sch.amount}
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.5 }}>
                  {sch.eligibility}
                </p>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontStyle: 'italic', marginBottom: '16px' }}>
                  💡 {sch.notes}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
                <button
                  onClick={() => onSaveScholarship(sch)}
                  disabled={saved}
                  className="btn btn-sm"
                  style={{
                    flex: 1,
                    background: saved ? 'rgba(16, 185, 129, 0.2)' : 'var(--text-main)',
                    color: saved ? '#10b981' : 'var(--bg-main)',
                    cursor: saved ? 'default' : 'pointer'
                  }}
                >
                  {saved ? <Check size={16} /> : <Plus size={16} />}
                  {saved ? 'Saved to Tracker' : 'Save Scholarship'}
                </button>

                <a
                  href={sch.website}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '8px' }}
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* My Saved Scholarships CRM Table */}
      <div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px' }}>
          My Scholarship Applications Tracker ({savedScholarships.length})
        </h3>

        {savedScholarships.length === 0 ? (
          <div className="apple-card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>You have not saved any scholarship applications yet.</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              Click <strong>"Save Scholarship"</strong> on any award above to track deadlines and application statuses!
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {savedScholarships.map(sch => (
              <div key={sch.id} className="apple-card" style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'center' }}>
                <div>
                  <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{sch.category}</span>
                  <h4 style={{ fontWeight: 800, fontSize: '1.05rem', marginTop: '2px' }}>{sch.name}</h4>
                  <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.9rem' }}>{sch.amount}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>DEADLINE</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{sch.deadline}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, marginBottom: '4px' }}>APPLICATION STATUS</div>
                  <select
                    className="select"
                    style={{ padding: '4px 10px', fontSize: '0.82rem', fontWeight: 700 }}
                    value={sch.status || 'Not Applied'}
                    onChange={e => onUpdateScholarshipStatus(sch.id, e.target.value)}
                  >
                    <option value="Not Applied">Not Applied</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Awarded">Awarded 🎉</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <a href={sch.website} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                    Apply <ExternalLink size={14} />
                  </a>
                  <button onClick={() => onRemoveScholarship(sch.id)} className="btn btn-secondary btn-sm" style={{ color: '#ef4444' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
