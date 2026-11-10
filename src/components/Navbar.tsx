'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, FileText } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Stack', href: '#stack' },
    { name: 'Record', href: '#record' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 py-3.5 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="#hero"
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f]"
        >
          <span className="w-2 h-2 rounded-full bg-[#ff3b2f] group-hover:scale-125 transition-transform" />
          <span className="font-anton text-xl tracking-wider text-white uppercase group-hover:text-zinc-200">
            {PERSONAL_INFO.name}
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-mono text-xs text-zinc-400 hover:text-white uppercase tracking-wider transition-colors hover:scale-105"
            >
              {link.name}
            </a>
          ))}

          <div className="w-px h-4 bg-zinc-800 ml-2" />

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="custom-btn p-2 rounded-md border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>

          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="custom-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#ff3b2f] hover:bg-[#ff5447] text-white font-mono text-xs font-semibold tracking-wider shadow-md shadow-[#ff3b2f]/20"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <div className="md:hidden flex items-center gap-2">
          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="custom-btn px-2.5 py-1 rounded bg-[#ff3b2f] text-white font-mono text-[11px] font-semibold"
          >
            Resume
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="custom-btn p-2 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-mono text-xs uppercase tracking-wider text-zinc-300 hover:text-[#ff3b2f] py-1.5"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-zinc-900 flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="custom-btn flex items-center gap-2 text-xs font-mono text-zinc-400 py-1"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
