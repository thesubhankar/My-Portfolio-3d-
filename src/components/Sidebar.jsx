import React from 'react';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { navItems } from '../data/navigation';
import { scrollToTarget } from '../animations/scrollAnimations';

const Sidebar = ({ activeSection, onOpenAdmin }) => {
  const handleNavClick = (id) => {
    scrollToTarget(`#${id}`, -20);
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 flex-col bg-dark-900/95 border-r border-slate-800/80 backdrop-blur-xl z-40 overflow-y-auto select-none">
      {/* Top Profile Header */}
      <div className="p-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <div className="relative group">
            <img
              src="/images/profile/profile.png"
              alt="Subhankar Giri"
              className="w-12 h-12 rounded-xl object-cover border-2 border-neon-pink/40 shadow-neon-pink group-hover:border-neon-cyan transition-colors"
              onError={(e) => {
                e.target.src = "/images/profile.jpg";
              }}
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-dark-900 animate-pulse"></span>
          </div>

          <div className="overflow-hidden">
            <h1 className="font-mono text-sm font-bold text-white truncate hover:text-neon-cyan transition-colors">
              Subhankar Giri
            </h1>
            <p className="text-xs text-neon-pink font-mono truncate">
              Data Scientist & Analyst
            </p>
          </div>
        </div>

        {/* Python Notebook Status Badge */}
        <div className="mt-3.5 px-3 py-1.5 rounded-lg bg-dark-800/90 border border-slate-800 text-[11px] font-mono flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-400">Python 3.11</span>
          </div>
          <span className="text-neon-cyan">idle</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 font-mono text-xs">
        <div className="px-3 pb-2 text-[10px] tracking-wider uppercase text-slate-500 font-semibold">
          // Navigation Index
        </div>

        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                isActive
                  ? 'bg-neon-pink/15 text-white border-l-4 border-neon-pink font-semibold shadow-[inset_0_0_12px_rgba(255,0,127,0.15)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-dark-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className={`text-[11px] font-mono ${isActive ? 'text-neon-pink' : 'text-slate-500 group-hover:text-slate-400'}`}>
                  [{item.number}]
                </span>
                <Icon className={`text-sm shrink-0 ${isActive ? 'text-neon-pink' : 'text-slate-400 group-hover:text-neon-cyan'}`} />
                <span className="truncate">{item.label}</span>
              </div>

              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-neon-pink shadow-neon-pink"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Admin Panel Entry & Quick Info */}
      <div className="p-3 border-t border-slate-800/80 font-mono text-[11px] space-y-2">
        <button
          onClick={onOpenAdmin}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-dark-800 hover:bg-dark-700 text-slate-400 hover:text-neon-pink border border-slate-700/40 transition-colors"
        >
          <span className="flex items-center gap-2">
            <HiOutlineLockClosed className="text-sm" />
            <span>Admin Console</span>
          </span>
          <span className="text-[10px] text-slate-500">/admin</span>
        </button>

        <div className="px-2 pt-1 text-[10px] text-slate-500 flex justify-between items-center">
          <span>PORTFOLIO v3.0</span>
          <span className="text-emerald-400">● LIVE</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
