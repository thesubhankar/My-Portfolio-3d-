import React from 'react';
import { HiOutlineArrowUp, HiOutlineLockClosed } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn, FaKaggle } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { scrollToTarget } from '../animations/scrollAnimations';

const Footer = ({ onOpenAdmin }) => {
  const handleBackToTop = () => {
    scrollToTarget('#home');
  };

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-dark-950 py-12 px-6 lg:px-12 text-slate-400 font-mono text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Column */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-bold text-sm text-white">Subhankar Giri</span>
            <span className="text-neon-pink">|</span>
            <span className="text-neon-cyan">Data Scientist & Analyst</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Engineered with React, Vite, Three.js, GSAP & Tailwind CSS.
          </p>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/thesubhankar"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-dark-800 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-neon-cyan hover:shadow-neon-cyan transition-all"
            aria-label="GitHub"
          >
            <FaGithub className="text-sm" />
          </a>
          <a
            href="https://www.linkedin.com/in/subhankar-giri-2a4b0a295"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-dark-800 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#0077b5] hover:border-[#0077b5] transition-all"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="text-sm" />
          </a>
          <a
            href="https://leetcode.com/u/subhaknar/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-dark-800 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#ffa116] hover:border-[#ffa116] transition-all"
            aria-label="LeetCode"
          >
            <SiLeetcode className="text-sm" />
          </a>
          <a
            href="https://www.kaggle.com/thesubhankar"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-dark-800 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#20beff] hover:border-[#20beff] transition-all"
            aria-label="Kaggle"
          >
            <FaKaggle className="text-sm" />
          </a>
          <button
            onClick={onOpenAdmin}
            className="w-9 h-9 rounded-lg bg-dark-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-neon-pink hover:border-neon-pink transition-all"
            title="Admin Login"
            aria-label="Admin Login"
          >
            <HiOutlineLockClosed className="text-sm" />
          </button>
        </div>

        {/* Right Column: Back to top */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} All rights reserved.
          </span>
          <button
            onClick={handleBackToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 border border-slate-700/60 hover:border-neon-pink hover:text-white transition-all text-xs"
          >
            <span>Top</span>
            <HiOutlineArrowUp className="text-xs" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
