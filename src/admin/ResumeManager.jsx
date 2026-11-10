import React, { useState } from 'react';
import { storage } from '../services/storage';
import { HiOutlineDocumentText, HiOutlineUpload, HiOutlineCheck } from 'react-icons/hi';

const ResumeManager = ({ resume, onRefresh }) => {
  const [success, setSuccess] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newResumeObj = {
        name: file.name,
        url: event.target.result,
        updatedAt: new Date().toISOString()
      };
      storage.saveResume(newResumeObj);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      onRefresh();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl bg-dark-950 border border-slate-800 space-y-4">
        <h3 className="font-mono text-sm font-bold text-neon-pink">
          Resume Document Management
        </h3>
        <p className="text-xs text-slate-300 font-sans">
          Upload a new PDF to dynamically replace the active portfolio resume. All download links and preview modals will immediately serve the updated document.
        </p>

        {success && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-2">
            <HiOutlineCheck /> Resume replaced successfully!
          </div>
        )}

        {/* Current Resume Info */}
        <div className="p-4 rounded-lg bg-dark-900 border border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HiOutlineDocumentText className="text-neon-cyan text-2xl shrink-0" />
            <div>
              <span className="block font-mono text-xs font-bold text-white">
                {resume?.name || 'Subhankar_Giri_Resume.pdf'}
              </span>
              <span className="block font-mono text-[10px] text-slate-500">
                ACTIVE IN PRODUCTION
              </span>
            </div>
          </div>

          <a
            href={resume?.url || '/resume.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-neon-cyan hover:underline"
          >
            Preview Current ↗
          </a>
        </div>

        {/* Upload Button */}
        <div className="pt-2">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            id="resume-pdf-upload"
            className="hidden"
          />
          <label
            htmlFor="resume-pdf-upload"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neon-pink text-white font-mono text-xs font-semibold hover:bg-neon-pink/90 cursor-pointer shadow-neon-pink transition-all"
          >
            <HiOutlineUpload className="text-base" />
            <span>Upload & Replace Resume (PDF)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ResumeManager;
