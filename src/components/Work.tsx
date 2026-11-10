'use client';

import React from 'react';
import { ExternalLink, Terminal } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS, PERSONAL_INFO } from '@/data/portfolioData';

export default function Work() {
  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full">
      {/* SECTION HEADER & STATS BAR */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-zinc-800">
        <div>
          <div data-build="pop" className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#ff3b2f]" />
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              SELECTED PROJECTS
            </span>
          </div>

          <h2
            data-build="wipe"
            className="font-anton text-4xl sm:text-6xl lg:text-7xl uppercase text-white tracking-tight"
          >
            Work that ships
          </h2>

          <p data-build="type" className="font-sans text-sm sm:text-base text-zinc-400 mt-2 max-w-xl">
            Production-grade predictive pipelines, interactive analytical dashboards, and automated data audit applications built with robust mathematical rigor.
          </p>
        </div>

        {/* 3 STATS ON THE RIGHT */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 lg:gap-6">
          {PERSONAL_INFO.workStats.map((st) => (
            <div
              key={st.label}
              data-build="pop"
              className="border border-zinc-800 bg-zinc-900/60 px-4 py-3 rounded-md min-w-[130px]"
            >
              <div className="font-anton text-2xl sm:text-3xl text-[#ff3b2f] tracking-wide">
                {st.value}
              </div>
              <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECTS LIST (Clean Text Cards — No Screenshots) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
        {PROJECTS.map((proj, idx) => (
          <div
            key={proj.id}
            data-build="pop"
            className="border border-zinc-800 hover:border-zinc-700 bg-zinc-950/80 p-6 rounded-lg flex flex-col justify-between transition-colors group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800/80">
                <span className="font-mono text-xs text-[#ff3b2f] tracking-wider uppercase font-semibold">
                  0{idx + 1} // {proj.category}
                </span>
                <Terminal className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
              </div>

              {/* Title */}
              <h3 className="font-anton text-2xl text-white tracking-wide mb-4 group-hover:text-zinc-100 transition-colors">
                {proj.title}
              </h3>

              {/* 3 to 4 Bullet Points */}
              <ul className="space-y-2.5 mb-6">
                {proj.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                    <span className="text-[#ff3b2f] mt-0.5 font-mono select-none">▸</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* Tech Chips */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/80 mb-6">
                {proj.toolkit.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-3">
                {proj.links.live && (
                  <a
                    href={proj.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="custom-btn flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-[#ff3b2f] hover:bg-[#ff5447] text-white text-xs font-mono font-medium tracking-wide shadow-md shadow-[#ff3b2f]/10"
                  >
                    <span>Live App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={proj.links.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`custom-btn inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded border border-zinc-800 hover:border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono font-medium tracking-wide ${
                    proj.links.live ? '' : 'w-full'
                  }`}
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
