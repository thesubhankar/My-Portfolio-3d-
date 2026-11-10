'use client';

import React, { useState } from 'react';
import { Mail, Copy, Check, Globe, FileText, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="pt-20 pb-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full">
      {/* BIG CALL-TO-ACTION CARD */}
      <div
        data-build="pop"
        className="relative overflow-hidden border border-zinc-800 bg-zinc-950 p-8 sm:p-12 lg:p-16 rounded-2xl mb-20 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,_rgba(255,59,47,0.12)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b2f] animate-ping" />
            <span className="font-mono text-xs text-[#ff3b2f] font-semibold tracking-widest uppercase">
              AVAILABLE FOR ROLES & COLLABORATION
            </span>
          </div>

          <h2 className="font-anton text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95] mb-4">
            Let&apos;s build intelligent data solutions together.
          </h2>

          <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed mb-8">
            Whether you need end-to-end machine learning pipelines, automated data preprocessing suites, or intuitive BI dashboards, I am ready to contribute with analytical and algorithmic rigor.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="custom-btn inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#ff3b2f] hover:bg-[#ff5447] text-white font-mono text-xs sm:text-sm font-semibold tracking-wider shadow-lg shadow-[#ff3b2f]/25"
            >
              <Mail className="w-4 h-4" />
              <span>Send an Email</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="custom-btn inline-flex items-center gap-2 px-5 py-3 rounded-md border border-zinc-800 hover:border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-xs sm:text-sm font-medium tracking-wider"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-400" />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="custom-btn inline-flex items-center gap-2 px-5 py-3 rounded-md border border-zinc-800 hover:border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-xs sm:text-sm font-medium tracking-wider"
            >
              <FileText className="w-4 h-4 text-zinc-400" />
              <span>View Resume PDF</span>
            </a>
          </div>

          <div className="mt-6 font-mono text-xs text-zinc-500">
            Direct Email: <span className="text-zinc-300 select-all">{PERSONAL_INFO.email}</span>
          </div>
        </div>
      </div>

      {/* FOOTER & SOCIALS BAR */}
      <div className="border-t border-zinc-900 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-anton text-xl tracking-wider text-white uppercase">
            {PERSONAL_INFO.name}
          </div>
          <div className="font-mono text-xs text-zinc-500 mt-1">
            Data Analyst & Data Scientist • {PERSONAL_INFO.cityLine}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="custom-btn w-10 h-10 rounded-md border border-zinc-800 hover:border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="custom-btn w-10 h-10 rounded-md border border-zinc-800 hover:border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-[#0a66c2]"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Personal Website"
            className="custom-btn w-10 h-10 rounded-md border border-zinc-800 hover:border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-[#ff3b2f]"
          >
            <Globe className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="custom-btn w-10 h-10 rounded-md border border-zinc-800 hover:border-[#ff3b2f] bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white ml-2"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-8 text-center sm:text-left font-mono text-[11px] text-zinc-600">
        © {new Date().getFullYear()} Subhankar Giri. Next.js 15 App Router • TypeScript • Tailwind CSS v4.
      </div>
    </footer>
  );
}
