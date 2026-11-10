import React, { useState } from 'react';
import { storage } from '../services/storage';
import { HiTrash, HiPencil } from 'react-icons/hi';

const CertificateManager = ({ certificates, onRefresh }) => {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    organization: '',
    date: '2024',
    credentialUrl: '',
    description: ''
  });

  const handleEdit = (cert) => {
    setEditingId(cert.id);
    setForm({
      title: cert.title || '',
      organization: cert.organization || '',
      date: cert.date || '2024',
      credentialUrl: cert.credentialUrl || '',
      description: cert.description || ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this certificate?')) {
      storage.deleteCertificate(id);
      onRefresh();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.organization) return;

    const payload = {
      title: form.title,
      organization: form.organization,
      date: form.date,
      credentialUrl: form.credentialUrl,
      description: form.description,
      image: '/images/favicon-32x32.png'
    };

    if (editingId) {
      storage.updateCertificate(editingId, payload);
      setEditingId(null);
    } else {
      storage.addCertificate(payload);
    }

    setForm({
      title: '',
      organization: '',
      date: '2024',
      credentialUrl: '',
      description: ''
    });
    onRefresh();
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-dark-950 border border-slate-800 space-y-4">
        <h3 className="font-mono text-sm font-bold text-neon-pink">
          {editingId ? 'Edit Certificate' : '+ Add New Certificate'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1 font-mono text-xs">
            <label className="text-slate-400">Certificate Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Full Stack Data Science & AIML"
              className="w-full px-3 py-2 rounded bg-dark-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-neon-pink"
            />
          </div>

          <div className="space-y-1 font-mono text-xs">
            <label className="text-slate-400">Issuing Organization *</label>
            <input
              type="text"
              required
              value={form.organization}
              onChange={(e) => setForm({ ...form, organization: e.target.value })}
              placeholder="e.g. PythonSoft LLP / Coursera"
              className="w-full px-3 py-2 rounded bg-dark-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-neon-pink"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1 font-mono text-xs">
            <label className="text-slate-400">Year / Date</label>
            <input
              type="text"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              placeholder="2024"
              className="w-full px-3 py-2 rounded bg-dark-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-neon-pink"
            />
          </div>

          <div className="space-y-1 font-mono text-xs">
            <label className="text-slate-400">Credential URL</label>
            <input
              type="url"
              value={form.credentialUrl}
              onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
              placeholder="https://drive.google.com/..."
              className="w-full px-3 py-2 rounded bg-dark-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-neon-pink"
            />
          </div>
        </div>

        <div className="space-y-1 font-mono text-xs">
          <label className="text-slate-400">Short Description</label>
          <textarea
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Curriculum, competencies, algorithms, and projects covered..."
            className="w-full px-3 py-2 rounded bg-dark-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-neon-pink"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-neon-pink text-white font-mono text-xs font-semibold hover:bg-neon-pink/90 transition-all shadow-neon-pink"
          >
            {editingId ? 'Save Changes' : 'Add Certificate'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ title: '', organization: '', date: '2024', credentialUrl: '', description: '' });
              }}
              className="text-xs font-mono text-slate-400 hover:text-white"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider">
          Existing Certifications ({certificates.length})
        </h4>

        <div className="divide-y divide-slate-800/80 rounded-xl bg-dark-950 border border-slate-800 overflow-hidden">
          {certificates.map((cert) => (
            <div key={cert.id} className="p-3.5 flex items-center justify-between gap-4 hover:bg-dark-900/50">
              <div className="truncate">
                <span className="block font-mono text-xs font-bold text-white truncate">
                  {cert.title}
                </span>
                <span className="block font-mono text-[10px] text-neon-cyan">
                  {cert.organization} · {cert.date}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(cert)}
                  className="p-1.5 rounded bg-dark-800 hover:bg-dark-700 text-slate-300 hover:text-neon-cyan"
                  title="Edit"
                >
                  <HiPencil className="text-xs" />
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="p-1.5 rounded bg-dark-800 hover:bg-red-900/40 text-slate-400 hover:text-red-400"
                  title="Delete"
                >
                  <HiTrash className="text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificateManager;
