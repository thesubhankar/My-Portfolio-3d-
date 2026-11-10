import { 
  initialProjects, 
  initialCertificates, 
  initialAchievements, 
  technologyCategories 
} from '../data/technologies';
import { portfolioData } from '../data/navigation';

const STORAGE_KEYS = {
  PROJECTS: 'subhankar_portfolio_projects_v2',
  CERTIFICATES: 'subhankar_portfolio_certificates_v2',
  ACHIEVEMENTS: 'subhankar_portfolio_achievements_v2',
  RESUME: 'subhankar_portfolio_resume_v2',
  TECHNOLOGIES: 'subhankar_portfolio_technologies_v2'
};

const listeners = new Set();
export const subscribeToStorage = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

const notifyListeners = (key, data) => {
  listeners.forEach((cb) => {
    try {
      cb({ key, data });
    } catch (e) {
      console.error('Storage subscription error:', e);
    }
  });
};

export const storage = {
  // --- PROJECTS ---
  getProjects() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading projects:', e);
    }
    return initialProjects;
  },

  saveProjects(projects) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
      notifyListeners(STORAGE_KEYS.PROJECTS, projects);
    } catch (e) {
      console.error('Error saving projects:', e);
    }
  },

  addProject(project) {
    const current = this.getProjects();
    const newProject = {
      ...project,
      id: project.id || `proj_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newProject, ...current];
    this.saveProjects(updated);
    return newProject;
  },

  updateProject(id, updatedData) {
    const current = this.getProjects();
    const updated = current.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
    this.saveProjects(updated);
  },

  deleteProject(id) {
    const current = this.getProjects();
    const updated = current.filter((p) => p.id !== id);
    this.saveProjects(updated);
  },

  // --- CERTIFICATES ---
  getCertificates() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading certificates:', e);
    }
    return initialCertificates;
  },

  saveCertificates(certs) {
    try {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certs));
      notifyListeners(STORAGE_KEYS.CERTIFICATES, certs);
    } catch (e) {
      console.error('Error saving certificates:', e);
    }
  },

  addCertificate(cert) {
    const current = this.getCertificates();
    const newCert = {
      ...cert,
      id: cert.id || `cert_${Date.now()}`
    };
    const updated = [newCert, ...current];
    this.saveCertificates(updated);
    return newCert;
  },

  updateCertificate(id, updatedData) {
    const current = this.getCertificates();
    const updated = current.map((c) => (c.id === id ? { ...c, ...updatedData } : c));
    this.saveCertificates(updated);
  },

  deleteCertificate(id) {
    const current = this.getCertificates();
    const updated = current.filter((c) => c.id !== id);
    this.saveCertificates(updated);
  },

  // --- ACHIEVEMENTS ---
  getAchievements() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading achievements:', e);
    }
    return initialAchievements;
  },

  saveAchievements(achs) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achs));
      notifyListeners(STORAGE_KEYS.ACHIEVEMENTS, achs);
    } catch (e) {
      console.error('Error saving achievements:', e);
    }
  },

  addAchievement(ach) {
    const current = this.getAchievements();
    const newAch = {
      ...ach,
      id: ach.id || `ach_${Date.now()}`
    };
    const updated = [newAch, ...current];
    this.saveAchievements(updated);
    return newAch;
  },

  updateAchievement(id, updatedData) {
    const current = this.getAchievements();
    const updated = current.map((a) => (a.id === id ? { ...a, ...updatedData } : a));
    this.saveAchievements(updated);
  },

  deleteAchievement(id) {
    const current = this.getAchievements();
    const updated = current.filter((a) => a.id !== id);
    this.saveAchievements(updated);
  },

  // --- RESUME ---
  getResume() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RESUME);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading resume:', e);
    }
    return {
      name: "Subhankar_Giri_Resume.pdf",
      url: portfolioData.resumePath,
      updatedAt: "2024-12-01"
    };
  },

  saveResume(resumeObj) {
    try {
      localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(resumeObj));
      notifyListeners(STORAGE_KEYS.RESUME, resumeObj);
    } catch (e) {
      console.error('Error saving resume:', e);
    }
  },

  // --- TECHNOLOGIES ---
  getTechnologies() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TECHNOLOGIES);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading technologies:', e);
    }
    return technologyCategories;
  },

  saveTechnologies(techs) {
    try {
      localStorage.setItem(STORAGE_KEYS.TECHNOLOGIES, JSON.stringify(techs));
      notifyListeners(STORAGE_KEYS.TECHNOLOGIES, techs);
    } catch (e) {
      console.error('Error saving technologies:', e);
    }
  },

  // --- EXPORT & RESET ---
  exportBackup() {
    return JSON.stringify({
      projects: this.getProjects(),
      certificates: this.getCertificates(),
      achievements: this.getAchievements(),
      resume: this.getResume(),
      technologies: this.getTechnologies(),
      exportedAt: new Date().toISOString()
    }, null, 2);
  },

  resetDefault() {
    try {
      Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
      notifyListeners('RESET', null);
      return true;
    } catch (e) {
      console.error('Error resetting storage:', e);
      return false;
    }
  }
};
