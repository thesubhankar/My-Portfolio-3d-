import React, { useState } from 'react';
import { storage } from '../services/storage';
import { HiPlus, HiTrash, HiCheck } from 'react-icons/hi';

const TechnologyManager = ({ technologies, onRefresh }) => {
  const [selectedCat, setSelectedCat] = useState(technologies[0]?.id || 'programming');
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const currentCategory = technologies.find((c) => c.id === selectedCat) || technologies[0];

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const updatedCategories = technologies.map((cat) => {
      if (cat.id === selectedCat) {
        return {
          ...cat,
          skills: [
            ...cat.skills,
            {
              name: newSkillName.trim(),
              icon: 'SiPython',
              level: newSkillLevel.trim() || 'Core Competency'
            }
          ]
        };
      }
      return cat;
    });

    storage.saveTechnologies(updatedCategories);
    setNewSkillName('');
    setNewSkillLevel('');
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
    onRefresh();
  };

  const handleDeleteSkill = (catId, skillIndex) => {
    const updatedCategories = technologies.map((cat) => {
      if (cat.id === catId) {
        return {
          ...cat,
          skills: cat.skills.filter((_, i) => i !== skillIndex)
        };
      }
      return cat;
    });

    storage.saveTechnologies(updatedCategories);
    onRefresh();
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-xl bg-dark-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-sm font-bold text-neon-pink">
            Technology Stack & Skills Management
          </h3>
          {savedNotice && (
            <span className="text-emerald-400 font-mono text-xs flex items-center gap-1">
              <HiCheck /> Changes Saved!
            </span>
          )}
        </div>

        {/* Category Picker */}
        <div className="space-y-1 font-mono text-xs">
          <label className="text-slate-400">Select Category to Manage</label>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="w-full px-3 py-2 rounded bg-dark-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-neon-pink"
          >
            {technologies.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title} ({cat.skills.length} skills)
              </option>
            ))}
          </select>
        </div>

        {/* Add Skill to current category */}
        <form onSubmit={handleAddSkill} className="p-4 rounded-lg bg-dark-900/60 border border-slate-800 space-y-3">
          <h4 className="font-mono text-xs font-semibold text-neon-cyan">
            + Add Technology to {currentCategory?.title}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Technology Name (e.g. PyTorch / Docker)"
              className="px-3 py-2 rounded bg-dark-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-neon-cyan"
            />
            <input
              type="text"
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value)}
              placeholder="Proficiency / Role (e.g. Deep Learning)"
              className="px-3 py-2 rounded bg-dark-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-neon-cyan"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-1.5 rounded-lg bg-neon-cyan text-dark-950 font-mono text-xs font-bold hover:bg-neon-cyan/90 transition-all flex items-center gap-1"
          >
            <HiPlus /> Add Technology
          </button>
        </form>

        {/* Existing Skills in current category */}
        <div className="space-y-2 pt-2">
          <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider">
            Current Skills in {currentCategory?.title} ({currentCategory?.skills.length})
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentCategory?.skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="p-2.5 rounded-lg bg-dark-900 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <span className="block font-mono text-xs text-white font-medium">
                    {skill.name}
                  </span>
                  <span className="block font-mono text-[10px] text-slate-400">
                    {skill.level}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteSkill(selectedCat, sIdx)}
                  className="p-1 rounded bg-dark-800 text-slate-400 hover:text-red-400"
                  title="Remove"
                >
                  <HiTrash className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyManager;
