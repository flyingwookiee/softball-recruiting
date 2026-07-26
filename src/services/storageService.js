import { initialAthleteProfile } from '../data/initialAthleteProfile';
import { collegesDatabase } from '../data/collegesDatabase';
import { scholarshipsDatabase } from '../data/scholarshipsDatabase';

const STORAGE_KEYS = {
  ATHLETE_PROFILE: 'softball_recruiting_profile_v2',
  TARGET_COLLEGES: 'softball_recruiting_targets_v1',
  GEMINI_API_KEY: 'softball_recruiting_gemini_key_v1',
  CHECKLIST_PROGRESS: 'softball_recruiting_checklist_v1',
  SAVED_SCHOLARSHIPS: 'softball_recruiting_scholarships_v1'
};

const initialTargets = [
  {
    ...collegesDatabase[0], // UT Tyler
    status: 'Contacted',
    addedDate: '2025-10-01',
    lastContactDate: '2025-10-15',
    notes: 'Sent initial intro email with Fall Seattle showcase schedule and hitting video. Top Nursing choice.'
  },
  {
    ...collegesDatabase[1], // West Texas A&M
    status: 'Interested',
    addedDate: '2025-10-05',
    lastContactDate: '',
    notes: 'National D2 softball powerhouse in Canyon TX with top BSN Nursing program.'
  },
  {
    ...collegesDatabase[6], // Colorado Mesa University
    status: 'Target',
    addedDate: '2025-10-10',
    lastContactDate: '',
    notes: 'RMAC program in Grand Junction CO with premier Department of Health Sciences.'
  }
];

const initialScholarships = [
  {
    ...scholarshipsDatabase[0], // Marine Corps Scholarship
    status: 'In Progress'
  },
  {
    ...scholarshipsDatabase[3], // HRSA NURSE Corps
    status: 'Not Applied'
  },
  {
    ...scholarshipsDatabase[7], // Alaska Performance Scholarship
    status: 'Awarded'
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
      return current;
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

  // Scholarships CRM
  getSavedScholarships: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_SCHOLARSHIPS);
      return saved ? JSON.parse(saved) : initialScholarships;
    } catch (e) {
      return initialScholarships;
    }
  },

  saveScholarships: (scholarships) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_SCHOLARSHIPS, JSON.stringify(scholarships));
    } catch (e) {
      console.error("Error saving scholarships", e);
    }
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
