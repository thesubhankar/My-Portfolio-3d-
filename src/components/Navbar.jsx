import React from 'react';
import { HiMenuAlt3, HiOutlineLockClosed } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { scrollToTarget } from '../animations/scrollAnimations';

const Navbar = ({ onOpenMobileMenu, onOpenAdmin }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-dark-950/80 backdrop-blur-md border-b border-slate-800/60 lg:hidden px-4 flex items-center justify-between">
      {/* Brand */}
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          scrollToTarget('#home');
        }}
        className="flex items-center gap-2.5 group"
      >
        <div className="w-8 h-8 rounded-lg bg-dark-800 border border-neon-pink/50 flex items-center justify-center font-mono text-neon-pink font-bold shadow-sm">
          SG
        </div>
        <div>
          <span className="font-mono text-sm font-bold text-white tracking-wide group-hover:text-neon-cyan transition-colors">
            Subhankar Giri
          </span>
          <span className="block text-[10px] font-mono text-neon-pink">
            Data Scientist & Analyst
          </span>
        </div>
      </a>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/thesubhankar"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-dark-800 text-slate-300 hover:text-white border border-slate-700/50"
          aria-label="GitHub"
        >
          <FaGithub className="text-base" />
        </a>

        <button
          onClick={onOpenAdmin}
          className="p-2 rounded-lg bg-dark-800 text-slate-400 hover:text-neon-pink border border-slate-700/50 transition-colors"
          title="Open Admin Dashboard"
          aria-label="Admin Dashboard"
        >
          <HiOutlineLockClosed className="text-base" />
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-lg bg-dark-800 text-neon-cyan border border-neon-cyan/40 hover:bg-neon-cyan/10 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <HiMenuAlt3 className="text-xl" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
