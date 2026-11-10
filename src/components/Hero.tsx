'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, MapPin, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function Hero() {
  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-24 px-4 sm:px-6 lg:px-12 bg-[#09090b]"
    >
      {/* BACKGROUND GIANT METALLIC WORD "PORTFOLIO" */}
      <div
        data-build="wipe"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="metallic-portfolio-text font-anton text-[18vw] leading-none tracking-tight uppercase opacity-85 text-center">
          PORTFOLIO
        </span>
      </div>

      {/* SOFT RED RADIAL GLOW BEHIND HEADSHOT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] h-[340px] sm:h-[580px] bg-[radial-gradient(circle,_rgba(255,59,47,0.18)_0%,_transparent_70%)] pointer-events-none z-0" />

      {/* CENTERED HEADSHOT (Black & White + Bottom Fade) */}
      <div
        data-build="pop"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[380px] lg:w-[460px] pointer-events-none flex justify-center"
      >
        <div className="relative w-full aspect-[4/5] [mask-image:linear-gradient(to_bottom,black_65%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_65%,transparent_100%)]">
          <Image
            src={PERSONAL_INFO.headshotUrl}
            alt={PERSONAL_INFO.name}
            fill
            sizes="(max-width: 768px) 280px, (max-width: 1200px) 380px, 460px"
            priority
            className="object-contain object-bottom filter grayscale contrast-125 brightness-95 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>

      {/* FOREGROUND CONTENT GRID */}
      <div className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-10rem)] pointer-events-auto">
        {/* LEFT COLUMN: HERO INTRO & BIO */}
        <div className="lg:col-span-5 flex flex-col items-start gap-4">
          <div data-build="pop">
            <span className="font-caveat text-3xl sm:text-4xl text-zinc-400 rotate-[-3deg] inline-block mb-1">
              Hello, I&apos;m
            </span>
          </div>

          <h1
            data-build="wipe"
            className="font-anton text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase text-white leading-[0.95]"
          >
            {PERSONAL_INFO.name}
          </h1>

          <div data-build="pop" className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff3b2f] animate-ping" />
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#ff3b2f] uppercase">
              {PERSONAL_INFO.role}
            </span>
          </div>

          <p
            data-build="type"
            className="font-sans text-sm sm:text-base text-zinc-300 max-w-md leading-relaxed border-l-2 border-zinc-800 pl-4 py-1"
          >
            {PERSONAL_INFO.bio}
          </p>

          <div data-build="pop" className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={scrollToWork}
              className="custom-btn group inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#ff3b2f] hover:bg-[#ff5447] text-white font-mono text-xs sm:text-sm font-semibold tracking-wider shadow-lg shadow-[#ff3b2f]/20"
            >
              <span>View work</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </button>

            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="custom-btn inline-flex items-center gap-2 px-5 py-3 rounded-md border border-zinc-800 hover:border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800/80 text-zinc-300 hover:text-white font-mono text-xs sm:text-sm font-medium tracking-wider"
            >
              <span>Resume PDF</span>
            </a>
          </div>

          <div data-build="pop" className="pt-2 flex items-center gap-2 text-xs font-mono text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-[#ff3b2f]" />
            <span>{PERSONAL_INFO.cityLine}</span>
          </div>
        </div>

        {/* CENTER SPACER FOR HEADSHOT */}
        <div className="hidden lg:block lg:col-span-3 pointer-events-none" />

        {/* RIGHT COLUMN: 3 REAL STATS FROM RESUME */}
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end">
          {PERSONAL_INFO.heroStats.map((stat, idx) => (
            <div
              key={stat.label}
              data-build="pop"
              className="flex-1 border border-zinc-800/90 hover:border-zinc-700 bg-zinc-950/70 backdrop-blur-xs p-5 rounded-lg transition-colors group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-anton text-4xl sm:text-5xl text-white tracking-wide group-hover:text-[#ff3b2f] transition-colors">
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] text-zinc-600">0{idx + 1}</span>
              </div>
              <p className="font-mono text-xs text-zinc-400 tracking-wider uppercase leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity z-20">
        <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-widest">SCROLL</span>
        <div className="w-4 h-7 rounded-full border border-zinc-700 flex justify-center p-1">
          <div className="w-1 h-1.5 bg-[#ff3b2f] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
