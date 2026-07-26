import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProfileHero } from './components/PublicProfile/ProfileHero';
import { AthleticStats } from './components/PublicProfile/AthleticStats';
import { VideoSection } from './components/PublicProfile/VideoSection';
import { ScheduleSection } from './components/PublicProfile/ScheduleSection';
import { AcademicsSection } from './components/PublicProfile/AcademicsSection';
import { CoachContactModal } from './components/PublicProfile/CoachContactModal';

import { DashboardHeader } from './components/Dashboard/DashboardHeader';
import { CollegeFinder } from './components/Dashboard/CollegeFinder';
import { TargetTracker } from './components/Dashboard/TargetTracker';
import { EmailComposer } from './components/Dashboard/EmailComposer';
import { SophomoreRoadmap } from './components/Dashboard/SophomoreRoadmap';
import { ProfileEditor } from './components/Dashboard/ProfileEditor';
import { ScholarshipTracker } from './components/Dashboard/ScholarshipTracker';
import { NotesJournal } from './components/Dashboard/NotesJournal';
import { DashboardLockModal } from './components/Dashboard/DashboardLockModal';

import { GeminiChatModal } from './components/AIAssistant/GeminiChatModal';

import { storageService } from './services/storageService';
import { sophomoreRecruitingTimeline } from './data/recruitingRules';

import { Target, Search, Mail, CheckSquare, Edit3, Sparkles, DollarSign, BookOpen, Lock, ShieldCheck } from 'lucide-react';

export function App() {
  // Theme State ('dark' | 'light' | 'spacex')
  const [theme, setTheme] = useState(() => localStorage.getItem('softball_theme_v2') || 'dark');

  // Security Lock State for Internal Dashboard
  const [isUnlocked, setIsUnlocked] = useState(() => {
    // Check URL parameters for ?dashboard=true or local session
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('dashboard') === 'true' || localStorage.getItem('softball_unlocked_session') === 'true';
  });

  // Navigation View State: Default 'public' portfolio resume
  const [activeView, setActiveView] = useState(isUnlocked ? 'dashboard' : 'public');
  const [dashboardTab, setDashboardTab] = useState('crm'); // 'crm' | 'finder' | 'scholarships' | 'journal' | 'email' | 'roadmap' | 'editor'

  // Application Data States
  const [athlete, setAthlete] = useState(storageService.getProfile());
  const [targets, setTargets] = useState(storageService.getTargets());
  const [apiKey, setApiKey] = useState(storageService.getApiKey());
  const [checklist, setChecklist] = useState(storageService.getChecklist(sophomoreRecruitingTimeline.checklist));
  const [savedScholarships, setSavedScholarships] = useState(storageService.getSavedScholarships());
  const [notes, setNotes] = useState(storageService.getNotes());

  // Selection & Modal States
  const [selectedCollegeForEmail, setSelectedCollegeForEmail] = useState(null);
  const [isCoachContactOpen, setIsCoachContactOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);

  // Apply Theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('softball_theme_v2', theme);
  }, [theme]);

  // Handle Unlock Action
  const handleUnlockDashboard = () => {
    setIsUnlocked(true);
    localStorage.setItem('softball_unlocked_session', 'true');
    setIsLockModalOpen(false);
    setActiveView('dashboard');
  };

  // Handle Lock / Exit Action
  const handleLockDashboard = () => {
    setIsUnlocked(false);
    localStorage.removeItem('softball_unlocked_session');
    setActiveView('public');
  };

  // Persistence Handlers
  const handleSaveProfile = (updatedProfile) => {
    setAthlete(updatedProfile);
    storageService.saveProfile(updatedProfile);
  };

  const handleUpdateTargets = (updatedTargets) => {
    setTargets(updatedTargets);
    storageService.saveTargets(updatedTargets);
  };

  const handleAddTarget = (college) => {
    const updated = storageService.addTarget(college);
    setTargets(updated);
  };

  const handleUpdateTarget = (updatedCollege) => {
    const updated = storageService.updateTarget(updatedCollege);
    setTargets(updated);
  };

  const handleRemoveTarget = (collegeId) => {
    const updated = storageService.removeTarget(collegeId);
    setTargets(updated);
  };

  // Scholarship Handlers
  const handleSaveScholarship = (sch) => {
    if (savedScholarships.some(s => s.id === sch.id)) return;
    const updated = [{ ...sch, status: 'Not Applied' }, ...savedScholarships];
    setSavedScholarships(updated);
    storageService.saveScholarships(updated);
  };

  const handleRemoveScholarship = (schId) => {
    const updated = savedScholarships.filter(s => s.id !== schId);
    setSavedScholarships(updated);
    storageService.saveScholarships(updated);
  };

  const handleUpdateScholarshipStatus = (schId, status) => {
    const updated = savedScholarships.map(s => s.id === schId ? { ...s, status } : s);
    setSavedScholarships(updated);
    storageService.saveScholarships(updated);
  };

  // Journal Notes Handlers
  const handleAddNote = (newNote) => {
    const updated = [newNote, ...notes];
    setNotes(updated);
    storageService.saveNotes(updated);
  };

  const handleUpdateNote = (updatedNote) => {
    const updated = notes.map(n => n.id === updatedNote.id ? updatedNote : n);
    setNotes(updated);
    storageService.saveNotes(updated);
  };

  const handleDeleteNote = (noteId) => {
    const updated = notes.filter(n => n.id !== noteId);
    setNotes(updated);
    storageService.saveNotes(updated);
  };

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    storageService.saveApiKey(key);
  };

  const handleToggleChecklist = (id) => {
    const updated = checklist.map(c => c.id === id ? { ...c, completed: !c.completed } : c);
    setChecklist(updated);
    storageService.saveChecklist(updated);
  };

  const handleComposeEmailForSchool = (college) => {
    setSelectedCollegeForEmail(college);
    setActiveView('dashboard');
    setDashboardTab('email');
  };

  const handleConsultAiForSchool = (prompt) => {
    setIsAiChatOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navigation Bar */}
      <Navbar
        activeView={activeView}
        athlete={athlete}
        currentTheme={theme}
        onThemeChange={setTheme}
        onOpenLockModal={() => setIsLockModalOpen(true)}
        onLockDashboard={handleLockDashboard}
        isUnlocked={isUnlocked}
      />

      {/* Main Content Area */}
      <main className="container" style={{ flex: 1, padding: '36px 24px' }}>
        
        {/* ==================== VIEW 1: STANDALONE PUBLIC ATHLETE PORTFOLIO RESUME ==================== */}
        {activeView === 'public' && (
          <div className="animate-fade-in">
            
            {/* Profile Hero Section */}
            <ProfileHero
              athlete={athlete}
              onOpenContactModal={() => setIsCoachContactOpen(true)}
            />

            {/* Athletic Metrics & Stats */}
            <div id="stats">
              <AthleticStats athlete={athlete} />
            </div>

            {/* Video Highlights & Showcase Film */}
            <div id="videos">
              <VideoSection videos={athlete.videos} />
            </div>

            {/* Tournament & Game Schedule */}
            <div id="schedule">
              <ScheduleSection schedule={athlete.schedule} />
            </div>

            {/* Academic Credentials */}
            <div id="academics">
              <AcademicsSection athlete={athlete} />
            </div>

          </div>
        )}

        {/* ==================== VIEW 2: PRIVATE ATHLETE RECRUITING DASHBOARD ==================== */}
        {activeView === 'dashboard' && isUnlocked && (
          <div className="animate-fade-in">
            
            {/* Summary Metrics & Action Bar */}
            <DashboardHeader
              targets={targets}
              checklist={checklist}
              onExportCsv={() => storageService.exportTargetsCSV(targets)}
              onOpenCollegeFinder={() => setDashboardTab('finder')}
              onOpenAiChat={() => setIsAiChatOpen(true)}
            />

            {/* Dashboard Secondary Tabs */}
            <div style={{
              display: 'flex',
              gap: '10px',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '12px',
              marginBottom: '28px',
              overflowX: 'auto'
            }}>
              {[
                { id: 'crm', label: 'My Target CRM', icon: Target, count: targets.length },
                { id: 'finder', label: 'College Directory', icon: Search },
                { id: 'scholarships', label: 'Scholarships & GI Bill', icon: DollarSign, count: savedScholarships.length },
                { id: 'journal', label: 'Journal & Notes', icon: BookOpen, count: notes.length },
                { id: 'email', label: 'Email Builder', icon: Mail },
                { id: 'roadmap', label: 'Sophomore Roadmap', icon: CheckSquare },
                { id: 'editor', label: 'Edit Profile & Stats', icon: Edit3 }
              ].map(tab => {
                const IconComp = tab.icon;
                const isActive = dashboardTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setDashboardTab(tab.id)}
                    className="btn btn-sm"
                    style={{
                      background: isActive ? 'var(--text-main)' : 'var(--bg-surface)',
                      color: isActive ? 'var(--bg-main)' : 'var(--text-muted)',
                      border: isActive ? 'none' : '1px solid var(--border-color)',
                      whiteSpace: 'nowrap',
                      fontWeight: isActive ? 700 : 500
                    }}
                  >
                    <IconComp size={16} />
                    {tab.label}
                    {tab.count !== undefined && (
                      <span style={{ background: isActive ? 'var(--bg-main)' : 'var(--primary-bg)', color: isActive ? '#ffffff' : 'var(--primary)', padding: '1px 7px', borderRadius: '9999px', fontSize: '0.75rem' }}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            {dashboardTab === 'crm' && (
              <TargetTracker
                targets={targets}
                onUpdateTarget={handleUpdateTarget}
                onRemoveTarget={handleRemoveTarget}
                onComposeEmail={handleComposeEmailForSchool}
                onConsultAi={handleConsultAiForSchool}
              />
            )}

            {dashboardTab === 'finder' && (
              <CollegeFinder
                targets={targets}
                onAddTarget={handleAddTarget}
              />
            )}

            {dashboardTab === 'scholarships' && (
              <ScholarshipTracker
                savedScholarships={savedScholarships}
                onSaveScholarship={handleSaveScholarship}
                onRemoveScholarship={handleRemoveScholarship}
                onUpdateScholarshipStatus={handleUpdateScholarshipStatus}
                onConsultAi={handleConsultAiForSchool}
              />
            )}

            {dashboardTab === 'journal' && (
              <NotesJournal
                notes={notes}
                onAddNote={handleAddNote}
                onUpdateNote={handleUpdateNote}
                onDeleteNote={handleDeleteNote}
                onConsultAi={handleConsultAiForSchool}
              />
            )}

            {dashboardTab === 'email' && (
              <EmailComposer
                athlete={athlete}
                selectedCollege={selectedCollegeForEmail}
                targets={targets}
              />
            )}

            {dashboardTab === 'roadmap' && (
              <SophomoreRoadmap
                checklist={checklist}
                onToggleChecklist={handleToggleChecklist}
              />
            )}

            {dashboardTab === 'editor' && (
              <ProfileEditor
                athlete={athlete}
                onSaveProfile={handleSaveProfile}
              />
            )}

          </div>
        )}

      </main>

      {/* Standalone Public Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '28px 0', background: 'var(--bg-surface)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p>
              🥎 <strong>{athlete.name} Softball Recruiting Portfolio</strong> &bull; Class of {athlete.gradYear} ({athlete.highSchool})
            </p>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.78rem', marginTop: '2px' }}>
              Academic Focus: Nursing (BSN) &bull; Eagle River, Alaska
            </p>
          </div>

          {/* Discreet Athlete Passcode Unlock Icon in Footer */}
          <div>
            {isUnlocked ? (
              <button
                onClick={() => setActiveView(activeView === 'public' ? 'dashboard' : 'public')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.78rem' }}
              >
                {activeView === 'public' ? '🔓 Open Athlete Dashboard' : '🌐 View Public Resume'}
              </button>
            ) : (
              <button
                onClick={() => setIsLockModalOpen(true)}
                style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                title="Athlete Dashboard Login"
              >
                <Lock size={13} /> Athlete Access
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Floating AI Assistant Trigger Button (Visible ONLY when Unlocked in Dashboard) */}
      {isUnlocked && activeView === 'dashboard' && (
        <button
          onClick={() => setIsAiChatOpen(true)}
          className="btn btn-primary btn-lg"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 40,
            borderRadius: '9999px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 24px'
          }}
        >
          <Sparkles size={20} />
          Ask Gemini AI
        </button>
      )}

      {/* Modals */}
      <CoachContactModal
        isOpen={isCoachContactOpen}
        onClose={() => setIsCoachContactOpen(false)}
        athlete={athlete}
      />

      <DashboardLockModal
        isOpen={isLockModalOpen}
        onClose={() => setIsLockModalOpen(false)}
        onUnlock={handleUnlockDashboard}
      />

      <GeminiChatModal
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
        athlete={athlete}
        targets={targets}
        onAddTarget={handleAddTarget}
        onUpdateProfile={handleSaveProfile}
        onUpdateTargets={handleUpdateTargets}
      />

    </div>
  );
}

export default App;
