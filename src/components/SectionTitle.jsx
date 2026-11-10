import React from 'react';

const SectionTitle = ({ number, title, subtitle, comment }) => {
  return (
    <div className="mb-12 section-header">
      <div className="flex items-center gap-3 font-mono text-xs md:text-sm text-neon-cyan mb-2">
        <span className="px-2 py-0.5 rounded bg-dark-800 border border-neon-cyan/30 text-neon-pink font-semibold">
          [{number}]
        </span>
        <span className="text-slate-400">
          // {comment || "system.exec()"}
        </span>
      </div>
      <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-2">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm md:text-base text-slate-400 max-w-2xl font-sans">
          {subtitle}
        </p>
      )}
      <div className="mt-4 h-0.5 w-16 bg-gradient-to-r from-neon-pink to-neon-cyan rounded-full"></div>
    </div>
  );
};

export default SectionTitle;
