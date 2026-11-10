import React, { useRef, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { educationData } from '../data/navigation';
import { animateSectionReveal } from '../animations/gsapAnimations';
import { HiOutlineAcademicCap } from 'react-icons/hi';

const Education = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const header = sectionRef.current.querySelector('.section-header');
    animateSectionReveal(sectionRef.current, header, itemsRef.current);
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-20 px-4 sm:px-8 lg:px-12 border-t border-slate-900"
    >
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          number="6"
          title="Academic Journey & Degrees"
          subtitle="Formal foundation in computer science, software engineering principles, algorithms, and applied mathematics."
          comment="education.get_timeline()"
        />

        {/* Timeline Stack */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-10 my-8">
          {educationData.map((edu, idx) => (
            <div
              key={edu.id || idx}
              ref={(el) => (itemsRef.current[idx] = el)}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-dark-950 border-2 border-neon-cyan group-hover:border-neon-pink group-hover:bg-neon-pink transition-all shadow-sm"></div>

              {/* Card */}
              <div className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800/80 group-hover:border-slate-700 transition-all space-y-3">
                {/* Duration Badge & Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <span className="px-3 py-1 rounded-md bg-dark-800 text-neon-cyan border border-neon-cyan/30">
                    {edu.duration}
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    {edu.status}
                  </span>
                </div>

                {/* Degree & Institution */}
                <div>
                  <h3 className="text-lg font-mono font-bold text-white group-hover:text-neon-pink transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-slate-300 font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-slate-500 font-mono">
                    {edu.affiliation}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {edu.description}
                </p>

                {/* Highlights chips */}
                {edu.highlights && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                    {edu.highlights.map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="px-2.5 py-0.5 rounded bg-dark-800 text-[10px] font-mono text-slate-300 border border-slate-700/50"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
