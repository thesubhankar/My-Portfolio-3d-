import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import { storage, subscribeToStorage } from '../services/storage';
import { animateSectionReveal } from '../animations/gsapAnimations';
import { 
  HiOutlineSparkles, 
  HiOutlineCode, 
  HiOutlineBadgeCheck 
} from 'react-icons/hi';
import { FaGithubAlt } from 'react-icons/fa';

const iconMap = {
  project: HiOutlineSparkles,
  cert: HiOutlineBadgeCheck,
  code: HiOutlineCode,
  github: FaGithubAlt
};

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    setAchievements(storage.getAchievements());

    const unsubscribe = subscribeToStorage(({ key }) => {
      if (key?.includes('achievements') || key === 'RESET') {
        setAchievements(storage.getAchievements());
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const header = sectionRef.current.querySelector('.section-header');
    animateSectionReveal(sectionRef.current, header, cardsRef.current);
  }, [achievements]);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-20 px-4 sm:px-8 lg:px-12 border-t border-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          number="8"
          title="Milestones & Key Accomplishments"
          subtitle="Quantified accomplishments representing relentless dedication to data science problem-solving and open engineering."
          comment="metrics.compute_milestones()"
        />

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {achievements.map((ach, idx) => {
            const Icon = iconMap[ach.icon] || HiOutlineSparkles;

            return (
              <div
                key={ach.id || idx}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800/80 hover:border-neon-cyan/50 hover:shadow-neon-cyan transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/60 font-mono text-[11px]">
                    <span className="text-neon-cyan font-semibold">
                      {ach.organization}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-dark-800 text-slate-400">
                      {ach.date}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-dark-800 border border-slate-700/60 flex items-center justify-center text-neon-pink group-hover:text-neon-cyan transition-colors shrink-0">
                      <Icon className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-mono text-base font-bold text-white group-hover:text-neon-pink transition-colors">
                        {ach.title}
                      </h3>
                      {ach.tag && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded bg-neon-pink/10 text-neon-pink border border-neon-pink/30 text-[10px] font-mono">
                          {ach.tag}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between font-mono text-[10px] text-slate-500">
                  <span>METRIC VERIFIED</span>
                  <span className="text-emerald-400">✓ RECORDED</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
