import React, { useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { auth } from '../services/auth';
import AdminLogin from './AdminLogin';
import ProjectManager from './ProjectManager';
import CertificateManager from './CertificateManager';
import ResumeManager from './ResumeManager';
import TechnologyManager from './TechnologyManager';
import { 
  HiX, 
  HiOutlineBriefcase, 
  HiOutlineAcademicCap, 
  HiOutlineDocumentText, 
  HiOutlineCode,
  HiOutlineDatabase,
  HiOutlineDownload,
  HiOutlineRefresh,
  HiOutlineLogout
} from 'react-icons/hi';

const AdminDashboard = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [resume, setResume] = useState(null);
  const [technologies, setTechnologies] = useState([]);
  const [notice, setNotice] = useState('');

  const refreshData = () => {
    setProjects(storage.getProjects());
    setCertificates(storage.getCertificates());
    setResume(storage.getResume());
    setTechnologies(storage.getTechnologies());
  };

  useEffect(() => {
    if (isOpen) {
      setIsAuthenticated(auth.isAuthenticated());
      refreshData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          refreshData();
        }}
        onClose={onClose}
      />
    );
  }

  const handleExport = () => {
    const backupStr = storage.exportBackup();
    const blob = new Blob([backupStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subhankar_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setNotice('Database backup downloaded successfully!');
    setTimeout(() => setNotice(''), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all dynamic data to initial factory defaults? This cannot be undone.')) {
      storage.resetDefault();
      refreshData();
      setNotice('Reset to initial defaults successfully.');
      setTimeout(() => setNotice(''), 3000);
    }
  };

  const handleLogout = () => {
    auth.logout();
    setIsAuthenticated(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-dark-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 bg-dark-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neon-pink/20 border border-neon-pink/40 flex items-center justify-center text-neon-pink font-mono text-sm">
              🔐
            </div>
            <div>
              <h2 className="font-mono text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Admin Management Console</span>
                <span className="text-[10px] text-emerald-400 font-normal px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  AUTHENTICATED
                </span>
              </h2>
              <p className="text-[11px] font-mono text-slate-400">
                Live Dynamic Storage & Portfolio Content CMS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-dark-800 text-slate-400 hover:text-red-400 border border-slate-700 transition-colors"
              title="Logout"
            >
              <HiOutlineLogout className="text-base" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-dark-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              aria-label="Close Admin Console"
            >
              <HiX className="text-lg" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2 bg-dark-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto font-mono text-xs">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-neon-pink text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-dark-800'
            }`}
          >
            <HiOutlineBriefcase />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'certificates'
                ? 'bg-neon-pink text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-dark-800'
            }`}
          >
            <HiOutlineAcademicCap />
            <span>Certifications ({certificates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('technologies')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'technologies'
                ? 'bg-neon-pink text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-dark-800'
            }`}
          >
            <HiOutlineCode />
            <span>Technologies ({technologies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'resume'
                ? 'bg-neon-pink text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-dark-800'
            }`}
          >
            <HiOutlineDocumentText />
            <span>Resume / CV</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`px-3.5 py-2 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ml-auto ${
              activeTab === 'backup'
                ? 'bg-neon-cyan text-dark-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-dark-800'
            }`}
          >
            <HiOutlineDatabase />
            <span>Storage & Backup</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'projects' && (
            <ProjectManager projects={projects} onRefresh={refreshData} />
          )}

          {activeTab === 'certificates' && (
            <CertificateManager certificates={certificates} onRefresh={refreshData} />
          )}

          {activeTab === 'technologies' && (
            <TechnologyManager technologies={technologies} onRefresh={refreshData} />
          )}

          {activeTab === 'resume' && (
            <ResumeManager resume={resume} onRefresh={refreshData} />
          )}

          {activeTab === 'backup' && (
            <div className="p-6 rounded-xl bg-dark-950 border border-slate-800 space-y-5 font-mono text-xs">
              <h3 className="text-sm font-bold text-neon-cyan">
                Database & Dynamic Content Backup
              </h3>
              <p className="text-slate-300 font-sans">
                Export all changes made inside the admin panel as a standalone JSON backup file, or reset all entities to the pristine initial state.
              </p>

              {notice && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  {notice}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleExport}
                  className="px-4 py-2.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-neon-cyan border border-neon-cyan/40 hover:border-neon-cyan flex items-center gap-2 transition-colors"
                >
                  <HiOutlineDownload className="text-base" />
                  <span>Export Database JSON</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-lg bg-dark-800 hover:bg-red-900/40 text-red-400 border border-red-500/30 hover:border-red-500 flex items-center gap-2 transition-colors"
                >
                  <HiOutlineRefresh className="text-base" />
                  <span>Reset All to Initial Data</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
