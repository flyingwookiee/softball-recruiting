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

import { GeminiChatModal } from './components/AIAssistant/GeminiChatModal';

import { storageService } from './services/storageService';
import { sophomoreRecruitingTimeline } from './data/recruitingRules';

import { Target, Search, Mail, CheckSquare, Edit3, Sparkles } from 'lucide-react';

export function App() {
  // Theme State ('mustangs' | 'arsenal' | 'cyber')
  const [theme, setTheme] = useState(() => localStorage.getItem('softball_theme_v1') || 'mustangs');

  // Navigation & View States
  const [activeView, setActiveView] = useState('public'); // 'public' | 'dashboard'
  const [dashboardTab, setDashboardTab] = useState('crm'); // 'crm' | 'finder' | 'email' | 'roadmap' | 'editor'

  // Application Data States
  const [athlete, setAthlete] = useState(storageService.getProfile());
  const [targets, setTargets] = useState(storageService.getTargets());
  const [apiKey, setApiKey] = useState(storageService.getApiKey());
  const [checklist, setChecklist] = useState(storageService.getChecklist(sophomoreRecruitingTimeline.checklist));

  // Selection & Modal States
  const [selectedCollegeForEmail, setSelectedCollegeForEmail] = useState(null);
  const [isCoachContactOpen, setIsCoachContactOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  // Apply Theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('softball_theme_v1', theme);
  }, [theme]);

  // Direct trigger to jump straight to Profile Editor
  const handleOpenProfileEditor = () => {
    setActiveView('dashboard');
    setDashboardTab('editor');
  };

  // Persistence Handlers
  const handleSaveProfile = (updatedProfile) => {
    setAthlete(updatedProfile);
    storageService.saveProfile(updatedProfile);
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
      
      {/* Top Sticky Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenApiKeyModal={() => setIsAiChatOpen(true)}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        onOpenProfileEditor={handleOpenProfileEditor}
        hasApiKey={!!apiKey}
        athlete={athlete}
        currentTheme={theme}
        onThemeChange={setTheme}
      />

      {/* Main Content Area */}
      <main className="container" style={{ flex: 1, padding: '32px 24px' }}>
        
        {/* ==================== VIEW 1: PUBLIC ATHLETE PROFILE ==================== */}
        {activeView === 'public' && (
          <div className="animate-fade-in">
            
            {/* Public Coach Banner */}
            <div style={{ background: 'var(--primary-glow)', border: '1px solid var(--primary)', padding: '12px 20px', borderRadius: 'var(--radius-md)', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 600 }}>
                🌐 <strong>Public Coach View</strong>: Showcase profile for college recruiters evaluating film & stats.
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleOpenProfileEditor} className="btn btn-outline btn-sm" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
                  <Edit3 size={15} /> Edit Profile Data
                </button>
                <button onClick={() => setActiveView('dashboard')} className="btn btn-primary btn-sm">
                  Switch to Dashboard
                </button>
              </div>
            </div>

            {/* Profile Hero Section */}
            <ProfileHero
              athlete={athlete}
              onOpenContactModal={() => setIsCoachContactOpen(true)}
              onOpenProfileEditor={handleOpenProfileEditor}
            />

            {/* Athletic Metrics & Stats */}
            <AthleticStats athlete={athlete} />

            {/* Video Highlights & Showcase Film */}
            <VideoSection videos={athlete.videos} />

            {/* Tournament & Game Schedule */}
            <ScheduleSection schedule={athlete.schedule} />

            {/* Academic Credentials */}
            <AcademicsSection athlete={athlete} />

          </div>
        )}

        {/* ==================== VIEW 2: RECRUITING DASHBOARD ==================== */}
        {activeView === 'dashboard' && (
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
                      background: isActive ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.04)',
                      color: isActive ? '#ffffff' : 'var(--text-muted)',
                      border: isActive ? 'none' : '1px solid var(--border-color)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <IconComp size={16} />
                    {tab.label}
                    {tab.count !== undefined && (
                      <span style={{ background: isActive ? 'rgba(0,0,0,0.3)' : 'var(--primary-glow)', color: '#fff', padding: '1px 7px', borderRadius: '9999px', fontSize: '0.75rem' }}>
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

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '24px 0', background: 'var(--bg-surface)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <div className="container">
          <p>
            🥎 <strong>{athlete.name} Softball Recruiting Platform</strong> &bull; Class of {athlete.gradYear} ({athlete.highSchool})
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.78rem', marginTop: '4px' }}>
            {athlete.travelTeam} &bull; Eagle River, Alaska
          </p>
        </div>
      </footer>

      {/* Floating AI Assistant Trigger Button (Bottom Right) */}
      <button
        onClick={() => setIsAiChatOpen(true)}
        className="btn btn-accent btn-lg"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 40,
          borderRadius: '9999px',
          boxShadow: 'var(--shadow-glow)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 22px'
        }}
      >
        <Sparkles size={22} />
        Ask Gemini AI
      </button>

      {/* Modals */}
      <CoachContactModal
        isOpen={isCoachContactOpen}
        onClose={() => setIsCoachContactOpen(false)}
        athlete={athlete}
      />

      <GeminiChatModal
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
        athlete={athlete}
        targets={targets}
        onAddTarget={handleAddTarget}
      />

    </div>
  );
}

export default App;
