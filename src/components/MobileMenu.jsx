import React from 'react';
import { HiX, HiOutlineLockClosed } from 'react-icons/hi';
import { navItems } from '../data/navigation';
import { scrollToTarget } from '../animations/scrollAnimations';

const MobileMenu = ({ isOpen, onClose, activeSection, onOpenAdmin }) => {
  if (!isOpen) return null;

  const handleSelect = (id) => {
    onClose();
    setTimeout(() => {
      scrollToTarget(`#${id}`, -70);
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-dark-950/98 backdrop-blur-2xl">
      {/* Top Header */}
      <div className="h-16 px-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-dark-800 border border-neon-pink/50 flex items-center justify-center font-mono text-neon-pink font-bold">
            SG
          </div>
          <span className="font-mono text-sm font-bold text-white">Menu Index</span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-lg bg-dark-800 text-slate-300 hover:text-white border border-slate-700"
          aria-label="Close Navigation"
        >
          <HiX className="text-xl" />
        </button>
      </div>

      {/* Nav Items List */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2 font-mono">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-colors ${
                isActive
                  ? 'bg-neon-pink/20 text-white border-l-4 border-neon-pink font-semibold'
                  : 'text-slate-300 hover:bg-dark-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-xs ${isActive ? 'text-neon-pink' : 'text-slate-500'}`}>
                  [{item.number}]
                </span>
                <span className="text-base">{item.label}</span>
              </div>
              {isActive && (
                <span className="text-xs text-neon-pink">ACTIVE</span>
              )}
            </button>
          );
        })}

        {/* Mobile Admin Trigger */}
        <div className="pt-4 border-t border-slate-800/80">
          <button
            onClick={() => {
              onClose();
              onOpenAdmin();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-dark-800 text-slate-300 hover:text-neon-pink border border-slate-700/60"
          >
            <HiOutlineLockClosed className="text-lg" />
            <span className="text-sm">Admin Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
