import React from 'react';
import { HiOutlineArrowNarrowDown, HiOutlineDocumentDownload } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn, FaKaggle } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import Button from '../Button';
import { scrollToTarget } from '../../animations/scrollAnimations';
import { portfolioData } from '../../data/navigation';

const HeroContent = ({ contentRef }) => {
  return (
    <div ref={contentRef} className="space-y-6 flex flex-col justify-center">
      {/* Small Welcome Tag */}
      <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-900 border border-neon-cyan/40 text-xs font-mono text-neon-cyan w-fit shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>WELCOME TO MY DIGITAL WORKSPACE</span>
      </div>

      {/* Main Heading & Role */}
      <div className="space-y-2">
        <h1 className="hero-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
          Hi, I'm <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan bg-clip-text text-transparent">Subhankar Giri</span>
        </h1>
        <h2 className="hero-role text-xl sm:text-2xl lg:text-3xl font-mono text-neon-cyan font-semibold">
          {portfolioData.role}
        </h2>
      </div>

      {/* Short Professional Introduction */}
      <p className="hero-desc text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
        {portfolioData.shortIntro}
      </p>

      {/* Live Notebook Status Indicator */}
      <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
        <span className="px-2.5 py-1 rounded bg-dark-800 border border-slate-700/80 text-emerald-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          {portfolioData.status}
        </span>
        <span className="hidden sm:inline text-slate-500">// {portfolioData.statusSub}</span>
      </div>

      {/* CTA Buttons */}
      <div className="hero-buttons flex flex-wrap items-center gap-3 pt-2">
        <Button
          variant="primary"
          size="md"
          onClick={() => scrollToTarget('#projects', -20)}
          icon={HiOutlineArrowNarrowDown}
          iconPosition="right"
        >
          Explore My Work
        </Button>

        <Button
          variant="secondary"
          size="md"
          href={portfolioData.resumePath}
          download="Subhankar_Giri_Resume.pdf"
          target="_blank"
          icon={HiOutlineDocumentDownload}
        >
          Download Resume
        </Button>
      </div>

      {/* Social Icons & LeetCode / Kaggle */}
      <div className="hero-socials flex items-center gap-3 pt-3">
        <span className="font-mono text-xs text-slate-500">Connect:</span>
        <a
          href="https://github.com/thesubhankar"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg bg-dark-800 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:border-neon-cyan hover:shadow-neon-cyan transition-all"
          aria-label="GitHub"
        >
          <FaGithub className="text-sm" />
        </a>
        <a
          href="https://www.linkedin.com/in/subhankar-giri-2a4b0a295"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg bg-dark-800 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-[#0a66c2] hover:border-[#0a66c2] transition-all"
          aria-label="LinkedIn"
        >
          <FaLinkedinIn className="text-sm" />
        </a>
        <a
          href="https://leetcode.com/u/subhaknar/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg bg-dark-800 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-[#ffa116] hover:border-[#ffa116] transition-all"
          aria-label="LeetCode"
        >
          <SiLeetcode className="text-sm" />
        </a>
        <a
          href="https://www.kaggle.com/thesubhankar"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg bg-dark-800 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-[#20beff] hover:border-[#20beff] transition-all"
          aria-label="Kaggle"
        >
          <FaKaggle className="text-sm" />
        </a>
      </div>
    </div>
  );
};

export default HeroContent;
