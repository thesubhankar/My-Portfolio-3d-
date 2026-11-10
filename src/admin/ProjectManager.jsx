import React, { useState } from 'react';
import { storage } from '../services/storage';
import { HiTrash, HiPencil, HiPhotograph } from 'react-icons/hi';

const ProjectManager = ({ projects, onRefresh }) => {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    category: 'Full Stack Data Science',
    description: '',
    technologies: '',
    github: '',
    live: '',
    images: []
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    const remainingSlots = 5 - form.images.length;
    const toProcess = files.slice(0, remainingSlots);

    toProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, event.target.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setForm({
      title: project.title || '',
      category: project.category || 'Full Stack Data Science',
      description: project.description || '',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      github: project.github || '',
      live: project.live || '',
      images: project.images || (project.image ? [project.image] : [])
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this project?')) {
      storage.deleteProject(id);
      onRefresh();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return;

    const techArray = form.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const projectPayload = {
      title: form.title,
      category: form.category,
      description: form.description,
      technologies: techArray,
      github: form.github,
      live: form.live,
      image: form.images[0] || '/images/profile/profile.png',
      images: form.images
    };

    if (editingId) {
      storage.updateProject(editingId, projectPayload);
      setEditingId(null);
    } else {
      storage.addProject(projectPayload);
    }

    setForm({
      title: '',
      category: 'Full Stack Data Science',
      description: '',
      technologies: '',
      github: '',
      live: '',
      images: []
    });
    onRefresh();
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-dark-950 border border-slate-800 space-y-4">
        <h3 className="font-mono text-sm font-bold text-neon-pink">
          {editingId ? 'Edit Project' : '+ Add New Project'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1 font-mono text-xs">
            <label className="text-slate-400">Project Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Thiranex Data Science Portal"
              className="w-full px-3 py-2 rounded bg-dark-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-neon-pink"
            />
          </div>

          <div className="space-y-1 font-mono text-xs">
            <label className="text-slate-400">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 rounded bg-dark-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-neon-pink"
            >
              <option value="Full Stack Data Science">Full Stack Data Science</option>
              <option value="Machine Learning & EDA">Machine Learning & EDA</option>
              <option value="AI & Recommendation Systems">AI & Recommendation Systems</option>
              <option value="Predictive Analytics">Predictive Analytics</option>
              <option value="Data Engineering">Data Engineering</option>
              <option value="Database Systems">Database Systems</option>
            </select>
          </div>
        </div>

        <div className="space-y-1 font-mono text-xs">
          <label className="text-slate-400">Description</label>
          <textarea
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Architecture, algorithms, workflow, outcomes..."
            className="w-full px-3 py-2 rounded bg-dark-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-neon-pink"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1 font-mono text-xs">
            <label className="text-slate-400">Technologies (comma separated)</label>
            <input
              type="text"
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              placeholder="Python, Streamlit, Scikit-learn"
              className="w-full px-3 py-2 rounded bg-dark-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-neon-pink"
            />
          </div>

          <div className="space-y-1 font-mono text-xs">
            <label className="text-slate-400">GitHub URL</label>
            <input
              type="url"
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              placeholder="https://github.com/thesubhankar/..."
              className="w-full px-3 py-2 rounded bg-dark-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-neon-pink"
            />
          </div>

          <div className="space-y-1 font-mono text-xs">
            <label className="text-slate-400">Live Demo URL</label>
            <input
              type="url"
              value={form.live}
              onChange={(e) => setForm({ ...form, live: e.target.value })}
              placeholder="https://thiranex-internship-njtpmctjcmcphu6hywitxa.streamlit.app/"
              className="w-full px-3 py-2 rounded bg-dark-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-neon-pink"
            />
          </div>
        </div>

        {/* Project Screenshots */}
        <div className="space-y-2 font-mono text-xs">
          <label className="text-slate-400 flex items-center justify-between">
            <span>Project Screenshots ({form.images.length}/5)</span>
            {form.images.length < 5 && (
              <span className="text-neon-cyan cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="p-img-upload"
                />
                <label htmlFor="p-img-upload" className="cursor-pointer hover:underline">
                  + Upload Images
                </label>
              </span>
            )}
          </label>

          <div className="flex flex-wrap gap-2 pt-1">
            {form.images.map((img, i) => (
              <div key={i} className="relative w-20 h-14 rounded border border-slate-700 overflow-hidden group">
                <img src={img} alt="preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute inset-0 bg-red-600/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-bold transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
            {form.images.length === 0 && (
              <label
                htmlFor="p-img-upload"
                className="w-24 h-14 rounded border border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 hover:text-slate-300 hover:border-slate-500 cursor-pointer"
              >
                <HiPhotograph className="text-lg" />
                <span className="text-[9px]">Add Image</span>
              </label>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-neon-pink text-white font-mono text-xs font-semibold hover:bg-neon-pink/90 transition-all shadow-neon-pink"
          >
            {editingId ? 'Save Changes' : 'Add Project'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ title: '', category: 'Full Stack Data Science', description: '', technologies: '', github: '', live: '', images: [] });
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
          Existing Projects ({projects.length})
        </h4>

        <div className="divide-y divide-slate-800/80 rounded-xl bg-dark-950 border border-slate-800 overflow-hidden">
          {projects.map((proj) => (
            <div key={proj.id} className="p-3.5 flex items-center justify-between gap-4 hover:bg-dark-900/50">
              <div className="flex items-center gap-3 truncate">
                <img
                  src={proj.image || '/images/profile/profile.png'}
                  alt={proj.title}
                  className="w-10 h-10 rounded object-cover border border-slate-800 shrink-0"
                />
                <div className="truncate">
                  <span className="block font-mono text-xs font-bold text-white truncate">
                    {proj.title}
                  </span>
                  <span className="block font-mono text-[10px] text-neon-cyan">
                    {proj.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(proj)}
                  className="p-1.5 rounded bg-dark-800 hover:bg-dark-700 text-slate-300 hover:text-neon-cyan"
                  title="Edit"
                >
                  <HiPencil className="text-xs" />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
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

export default ProjectManager;
