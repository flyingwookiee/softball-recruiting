import { initialAthleteProfile } from '../data/initialAthleteProfile';
import { collegesDatabase } from '../data/collegesDatabase';

const STORAGE_KEYS = {
  ATHLETE_PROFILE: 'softball_recruiting_profile_v1',
  TARGET_COLLEGES: 'softball_recruiting_targets_v1',
  GEMINI_API_KEY: 'softball_recruiting_gemini_key_v1',
  CHECKLIST_PROGRESS: 'softball_recruiting_checklist_v1'
};

// Initial target list with a few pre-loaded colleges for immediate showcase
const initialTargets = [
  {
    ...collegesDatabase[0], // Western Washington University
    status: 'Contacted',
    addedDate: '2025-10-01',
    lastContactDate: '2025-10-15',
    notes: 'Sent initial intro email with Fall Seattle showcase schedule and hitting video. Waiting for camp invite.'
  },
  {
    ...collegesDatabase[3], // Linfield University
    status: 'Interested',
    addedDate: '2025-10-05',
    lastContactDate: '',
    notes: 'Top D3 choice in Pacific Northwest. High nursing/pre-med program interest.'
  },
  {
    ...collegesDatabase[1], // Central Washington University
    status: 'Target',
    addedDate: '2025-10-10',
    lastContactDate: '',
    notes: 'GNAC program in Ellensburg. Planning to attend their Winter camp.'
  }
];

export const storageService = {
  // Profile Management
  getProfile: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ATHLETE_PROFILE);
      return saved ? JSON.parse(saved) : initialAthleteProfile;
    } catch (e) {
      console.error("Error reading profile from localStorage", e);
      return initialAthleteProfile;
    }
  },

  saveProfile: (profile) => {
    try {
      localStorage.setItem(STORAGE_KEYS.ATHLETE_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error("Error saving profile", e);
    }
  },

  // Target Colleges CRM
  getTargets: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TARGET_COLLEGES);
      return saved ? JSON.parse(saved) : initialTargets;
    } catch (e) {
      console.error("Error reading target colleges", e);
      return initialTargets;
    }
  },

  saveTargets: (targets) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TARGET_COLLEGES, JSON.stringify(targets));
    } catch (e) {
      console.error("Error saving targets", e);
    }
  },

  addTarget: (college) => {
    const current = storageService.getTargets();
    if (current.some(t => t.id === college.id || t.name === college.name)) {
      return current; // already exists
    }
    const newTarget = {
      ...college,
      status: 'Target',
      addedDate: new Date().toISOString().split('T')[0],
      lastContactDate: '',
      notes: ''
    };
    const updated = [newTarget, ...current];
    storageService.saveTargets(updated);
    return updated;
  },

  updateTarget: (updatedCollege) => {
    const current = storageService.getTargets();
    const updated = current.map(t => t.id === updatedCollege.id ? updatedCollege : t);
    storageService.saveTargets(updated);
    return updated;
  },

  removeTarget: (collegeId) => {
    const current = storageService.getTargets();
    const updated = current.filter(t => t.id !== collegeId);
    storageService.saveTargets(updated);
    return updated;
  },

  // Gemini API Key
  getApiKey: () => {
    return localStorage.getItem(STORAGE_KEYS.GEMINI_API_KEY) || '';
  },

  saveApiKey: (key) => {
    localStorage.setItem(STORAGE_KEYS.GEMINI_API_KEY, key.trim());
  },

  // Checklist Progress
  getChecklist: (defaultChecklist) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHECKLIST_PROGRESS);
      return saved ? JSON.parse(saved) : defaultChecklist;
    } catch (e) {
      return defaultChecklist;
    }
  },

  saveChecklist: (checklist) => {
    localStorage.setItem(STORAGE_KEYS.CHECKLIST_PROGRESS, JSON.stringify(checklist));
  },

  // CSV Exporter for Mailing List
  exportTargetsCSV: (targets) => {
    const headers = ["College Name", "Division", "Conference", "City", "State", "Status", "Head Coach", "Coach Email", "Recruiting Email", "Last Contact", "Notes"];
    const rows = targets.map(t => [
      `"${t.name}"`,
      `"${t.division || ''}"`,
      `"${t.conference || ''}"`,
      `"${t.city || ''}"`,
      `"${t.state || ''}"`,
      `"${t.status || 'Target'}"`,
      `"${t.headCoach || ''}"`,
      `"${t.coachEmail || ''}"`,
      `"${t.recruitingEmail || ''}"`,
      `"${t.lastContactDate || ''}"`,
      `"${(t.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `softball_recruiting_contacts_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
