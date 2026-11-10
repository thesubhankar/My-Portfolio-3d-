'use client';

import React from 'react';
import { Briefcase, GraduationCap, Award, Calendar } from 'lucide-react';
import { TIMELINE_DATA } from '@/data/portfolioData';

export default function Record() {
  return (
    <section id="record" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full">
      <div className="pb-12 border-b border-zinc-800">
        <div data-build="pop" className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#ff3b2f]" />
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            CAREER & ACADEMIC LOG
          </span>
        </div>

        <h2
          data-build="wipe"
          className="font-anton text-4xl sm:text-6xl lg:text-7xl uppercase text-white tracking-tight"
        >
          Track Record
        </h2>

        <p data-build="type" className="font-sans text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
          Verified timeline of full-stack data science internships, academic degrees at BPUT, and industry-standard machine learning credentials.
        </p>
      </div>

      {/* TIMELINE FEED */}
      <div className="relative pt-12 pl-4 sm:pl-8 border-l border-zinc-800 space-y-12">
        {TIMELINE_DATA.map((item, idx) => (
          <div key={item.id} data-build="pop" className="relative group">
            {/* Timeline Node Marker */}
            <div className="absolute -left-[21px] sm:-left-[37px] top-1.5 w-6 h-6 rounded-full bg-zinc-950 border border-zinc-700 flex items-center justify-center group-hover:border-[#ff3b2f] group-hover:scale-110 transition-all">
              {item.type === 'experience' && (
                <Briefcase className="w-3 h-3 text-[#ff3b2f]" />
              )}
              {item.type === 'education' && (
                <GraduationCap className="w-3 h-3 text-cyan-400" />
              )}
              {item.type === 'certification' && (
                <Award className="w-3 h-3 text-amber-400" />
              )}
            </div>

            {/* Timeline Card */}
            <div className="border border-zinc-800/90 hover:border-zinc-700 bg-zinc-950/70 p-6 rounded-lg transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider ${
                      item.type === 'experience'
                        ? 'bg-[#ff3b2f]/15 text-[#ff3b2f] border border-[#ff3b2f]/30'
                        : item.type === 'education'
                        ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">{item.organization}</span>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.period}</span>
                </div>
              </div>

              <h3 className="font-anton text-xl sm:text-2xl text-white tracking-wide mt-1">
                {item.title}
              </h3>

              {item.subtitle && (
                <p className="font-mono text-xs text-[#ff3b2f]/90 mt-1">
                  {item.subtitle}
                </p>
              )}

              {item.bullets && item.bullets.length > 0 && (
                <ul className="space-y-2 mt-4 pt-3 border-t border-zinc-900">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      <span className="text-[#ff3b2f] font-mono mt-0.5">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
