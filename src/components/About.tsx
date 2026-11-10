'use client';

import React from 'react';
import { SKILL_CATEGORIES, PRINCIPLES } from '@/data/portfolioData';
import { CheckCircle2, Shield, Compass, Cpu, Zap } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full">
      <div className="pb-12 border-b border-zinc-800">
        <div data-build="pop" className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#ff3b2f]" />
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            ENGINEERING PHILOSOPHY
          </span>
        </div>

        <h2
          data-build="wipe"
          className="font-anton text-4xl sm:text-6xl lg:text-7xl uppercase text-white tracking-tight"
        >
          About & Principles
        </h2>
      </div>

      {/* 2 SHORT PARAGRAPHS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 border-b border-zinc-900">
        <div data-build="pop" className="border-l-2 border-[#ff3b2f] pl-6">
          <span className="font-mono text-xs text-[#ff3b2f] font-semibold uppercase tracking-wider block mb-2">
            01 // BACKGROUND & ACADEMICS
          </span>
          <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
            Motivated Computer Science & Engineering undergraduate at BPUT with a solid academic foundation in Data Science, Data Analysis, and Machine Learning. Hands-on proficiency in Python, SQL, Pandas, NumPy, Scikit-learn, Power BI, and Excel, with practical experience engineering exploratory data analysis (EDA), feature pipelines, and deploying predictive ML applications.
          </p>
        </div>

        <div data-build="pop" className="border-l-2 border-zinc-700 pl-6">
          <span className="font-mono text-xs text-zinc-400 font-semibold uppercase tracking-wider block mb-2">
            02 // INDUSTRY APPLIED EXPERIENCE
          </span>
          <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
            Internship experience spanning PythonSoft LLP and IncodeVision, developing production-grade automated data cleaning pipelines and visual analytical dashboards on Streamlit. Dedicated to mathematical and algorithmic capabilities to uncover hidden trends, maintain absolute data integrity, and implement modern deep learning and generative AI architectures.
          </p>
        </div>
      </div>

      {/* SKILLS GRID */}
      <div className="py-12 border-b border-zinc-900">
        <div data-build="pop" className="flex items-center gap-2 mb-6">
          <Cpu className="w-4 h-4 text-[#ff3b2f]" />
          <h3 className="font-mono text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            CORE COMPETENCIES // DOMAIN CLUSTERS
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              data-build="pop"
              className="border border-zinc-800 bg-zinc-950/70 p-5 rounded-lg"
            >
              <h4 className="font-anton text-lg text-white tracking-wide mb-3 pb-2 border-b border-zinc-900">
                {cat.title}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-900/90 border border-zinc-800 text-zinc-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 PRINCIPLES I WORK BY */}
      <div className="pt-12">
        <div data-build="pop" className="flex items-center gap-2 mb-8">
          <Zap className="w-4 h-4 text-[#ff3b2f]" />
          <h3 className="font-mono text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            4 OPERATING PRINCIPLES
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRINCIPLES.map((p) => (
            <div
              key={p.number}
              data-build="pop"
              className="border border-zinc-800/90 hover:border-zinc-700 bg-zinc-950/80 p-6 rounded-lg transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="font-mono text-2xl font-bold text-[#ff3b2f] mb-2">
                  {p.number}
                </div>
                <h4 className="font-anton text-xl text-white tracking-wide mb-2 group-hover:text-zinc-100 transition-colors">
                  {p.title}
                </h4>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
