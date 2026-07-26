import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Edit3, Check, Pin, Search, Sparkles, Tag, Calendar } from 'lucide-react';

export const NotesJournal = ({ notes, onAddNote, onUpdateNote, onDeleteNote, onConsultAi }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [editingId, setEditingId] = useState(null);

  // New Note Form State
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState('Coach Notes');
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = ['All', 'Coach Notes', 'Campus Visit', 'Camp & Showcase', 'Nursing Programs', 'Goals & Ideas'];

  const filteredNotes = notes.filter(n => {
    const matchesCategory = filterCategory === 'All' || n.category === filterCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const noteObj = {
      id: `note_${Date.now()}`,
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      category: newNoteCategory,
      pinned: false,
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    onAddNote(noteObj);
    setNewNoteTitle('');
    setNewNoteContent('');
    setShowAddForm(false);
  };

  return (
    <div style={{ marginBottom: '36px' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <span className="badge badge-primary">Personal Workspace</span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '4px', letterSpacing: '-0.02em' }}>
            Recruiting Journal & Strategy Notes
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Write down coach call takeaways, campus visit impressions, Nursing school comparisons, and recruiting goals.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary btn-sm">
            <Plus size={16} /> {showAddForm ? 'Cancel' : 'New Note'}
          </button>
        </div>
      </div>

      {/* Add New Note Drawer */}
      {showAddForm && (
        <form onSubmit={handleCreateNote} className="apple-card animate-fade-in" style={{ padding: '24px', marginBottom: '28px', background: 'var(--bg-surface)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px', color: 'var(--primary)' }}>
            + Create New Journal Note
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Note Title *
              </label>
              <input
                type="text"
                required
                className="input"
                placeholder="e.g. Call with UT Tyler Coach Reed, Visit to Regis Univ..."
                value={newNoteTitle}
                onChange={e => setNewNoteTitle(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Category Tag
              </label>
              <select
                className="select"
                value={newNoteCategory}
                onChange={e => setNewNoteCategory(e.target.value)}
              >
                <option value="Coach Notes">💬 Coach Call & Email Notes</option>
                <option value="Campus Visit">🏫 Campus Visit Impression</option>
                <option value="Camp & Showcase">🥎 Camp & Showcase Takeaway</option>
                <option value="Nursing Programs">🩺 Nursing BSN Comparison</option>
                <option value="Goals & Ideas">🎯 Goals & Strategy Ideas</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Note Thoughts & Details *
            </label>
            <textarea
              rows={5}
              required
              className="textarea"
              placeholder="Write your reflections, questions for coaches, impressions of the campus, or ideas here..."
              value={newNoteContent}
              onChange={e => setNewNoteContent(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="submit" className="btn btn-primary btn-sm">
              <Check size={16} /> Save Note to Journal
            </button>
          </div>
        </form>
      )}

      {/* Category Tabs & Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className="btn btn-sm"
              style={{
                background: filterCategory === cat ? 'var(--text-main)' : 'var(--bg-surface)',
                color: filterCategory === cat ? 'var(--bg-main)' : 'var(--text-muted)',
                borderRadius: '9999px',
                fontWeight: filterCategory === cat ? 700 : 500,
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ width: '100%', maxWidth: '280px' }}>
          <input
            type="text"
            className="input"
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            placeholder="Search notes..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="apple-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <BookOpen size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
          <p style={{ fontWeight: 600 }}>No notes saved yet in this category.</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            Click <strong>"+ New Note"</strong> above to jot down your thoughts, coach notes, or recruiting ideas!
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filteredNotes.map(note => {
            const isEditing = editingId === note.id;

            return (
              <div key={note.id} className="apple-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: note.pinned ? 'var(--bg-surface)' : 'var(--bg-card)', border: note.pinned ? '1px solid var(--primary)' : '1px solid var(--border-color)' }}>
                
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>{note.category}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                      <Calendar size={13} /> {note.createdDate}
                      <button
                        onClick={() => onUpdateNote({ ...note, pinned: !note.pinned })}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: note.pinned ? 'var(--gold)' : 'var(--text-dim)' }}
                        title="Pin Note"
                      >
                        <Pin size={15} fill={note.pinned ? 'var(--gold)' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {isEditing ? (
                    <div>
                      <input
                        type="text"
                        className="input"
                        style={{ marginBottom: '8px', fontWeight: 700 }}
                        value={note.title}
                        onChange={e => onUpdateNote({ ...note, title: e.target.value })}
                      />
                      <textarea
                        rows={4}
                        className="textarea"
                        value={note.content}
                        onChange={e => onUpdateNote({ ...note, content: e.target.value })}
                      />
                      <button onClick={() => setEditingId(null)} className="btn btn-primary btn-sm" style={{ marginTop: '8px' }}>
                        Save Edits
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-main)', lineHeight: 1.3 }}>
                        {note.title}
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                        {note.content}
                      </p>
                    </div>
                  )}
                </div>

                {!isEditing && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                    <button onClick={() => onConsultAi(`Help me reflect and expand on my recruiting note: "${note.title}: ${note.content}"`)} className="btn btn-secondary btn-sm" style={{ fontSize: '0.78rem' }}>
                      <Sparkles size={14} color="var(--primary)" /> Ask AI Strategy
                    </button>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => setEditingId(note.id)} className="btn btn-secondary btn-sm" style={{ padding: '6px' }}>
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => onDeleteNote(note.id)} className="btn btn-secondary btn-sm" style={{ padding: '6px', color: '#ef4444' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
