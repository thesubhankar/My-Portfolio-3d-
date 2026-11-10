import React, { useRef, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { experienceData } from '../data/navigation';
import { animateSectionReveal } from '../animations/gsapAnimations';
import { HiOutlineBriefcase } from 'react-icons/hi';

const Experience = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const header = sectionRef.current.querySelector('.section-header');
    animateSectionReveal(sectionRef.current, header, itemsRef.current);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 px-4 sm:px-8 lg:px-12 border-t border-slate-900 bg-dark-950/40"
    >
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          number="7"
          title="Professional Experience & Work History"
          subtitle="Applied industry internships and freelance consulting contracts tackling data pipelines, dashboard architecture, and predictive analytics."
          comment="experience.display_history()"
        />

        {/* Experience Cards Stack */}
        <div className="space-y-8 my-8">
          {experienceData.map((exp, idx) => (
            <div
              key={exp.id || idx}
              ref={(el) => (itemsRef.current[idx] = el)}
              className="p-6 sm:p-8 rounded-2xl bg-dark-900/80 border border-slate-800/80 hover:border-neon-pink/40 hover:shadow-neon-pink transition-all duration-300 space-y-4 group"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-dark-800 border border-slate-700/60 flex items-center justify-center text-neon-pink group-hover:text-neon-cyan transition-colors shrink-0">
                    <HiOutlineBriefcase className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-mono text-base sm:text-lg font-bold text-white group-hover:text-neon-pink transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-neon-cyan">
                      {exp.organization}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-3 py-1 rounded bg-dark-800 text-slate-300 border border-slate-700/60">
                    {exp.duration}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neon-purple/20 text-neon-purple border border-neon-purple/30 text-[10px]">
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Responsibilities Bullets */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-sans list-disc list-inside">
                {exp.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx} className="leading-relaxed">
                    <span className="text-slate-200">{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="pt-3 border-t border-slate-800/60 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] text-slate-500">
                  Tech Applied:
                </span>
                {exp.technologies?.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-0.5 rounded-md bg-dark-800 text-[10px] font-mono text-slate-300 border border-slate-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
