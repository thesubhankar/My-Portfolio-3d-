import React, { useRef, useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { storage, subscribeToStorage } from '../services/storage';
import { animateSectionReveal } from '../animations/gsapAnimations';
import { 
  SiPython, 
  SiPandas, 
  SiNumpy, 
  SiScikitlearn, 
  SiTensorflow, 
  SiKeras, 
  SiPostgresql, 
  SiMysql, 
  SiSqlite, 
  SiJupyter, 
  SiAnaconda, 
  SiGit, 
  SiGithub, 
  SiFlask, 
  SiFastapi, 
  SiStreamlit
} from 'react-icons/si';
import { FaFileExcel } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
import { 
  TbReportAnalytics, 
  TbChartLine, 
  TbChartDots,
  TbChartBar,
  TbBinaryTree, 
  TbCircleDot, 
  TbBrain, 
  TbLayersIntersect,
  TbDatabase,
  TbLayoutDashboard 
} from 'react-icons/tb';

const iconComponents = {
  SiPython,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiTensorflow,
  SiKeras,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiJupyter,
  SiAnaconda,
  SiGit,
  SiGithub,
  SiFlask,
  SiFastapi,
  SiStreamlit,
  FaFileExcel,
  VscCode,
  TbReportAnalytics,
  TbChartLine,
  TbChartDots,
  TbChartBar,
  TbBinaryTree,
  TbCircleDot,
  TbBrain,
  TbLayersIntersect,
  TbDatabase,
  TbLayoutDashboard
};

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState([]);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    setSkillCategories(storage.getTechnologies());

    const unsubscribe = subscribeToStorage(({ key }) => {
      if (key?.includes('technologies') || key === 'RESET') {
        setSkillCategories(storage.getTechnologies());
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const header = sectionRef.current.querySelector('.section-header');
    animateSectionReveal(sectionRef.current, header, cardsRef.current);
  }, [skillCategories]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 px-4 sm:px-8 lg:px-12 border-t border-slate-900 bg-dark-950/40"
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          number="3"
          title="Technical Skills & Stack"
          subtitle="A comprehensive toolkit engineered for high-precision data science, machine learning models, and modern analytical systems."
          comment="skills_df.describe()"
        />

        {/* 9 Categories Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => {
            const HeaderIcon = iconComponents[category.icon] || SiPython;

            return (
              <div
                key={category.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="rounded-2xl p-6 bg-dark-900/80 border border-slate-800/80 hover:border-neon-cyan/40 hover:shadow-neon-cyan transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-dark-800 border border-slate-700/60 flex items-center justify-center text-neon-cyan">
                        <HeaderIcon className="text-lg" />
                      </div>
                      <h3 className="font-mono text-sm font-bold text-white tracking-wide">
                        {category.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Skills Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {category.skills.map((skill, sIdx) => {
                      const SkillIcon = iconComponents[skill.icon] || SiPython;
                      return (
                        <div
                          key={sIdx}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-800/80 border border-slate-700/40 hover:border-neon-pink/50 hover:bg-dark-800 transition-all duration-200 group cursor-default"
                        >
                          <SkillIcon className="text-xs text-neon-cyan group-hover:text-neon-pink transition-colors shrink-0" />
                          <div className="flex flex-col">
                            <span className="font-mono text-xs text-slate-200 group-hover:text-white transition-colors">
                              {skill.name}
                            </span>
                            <span className="text-[9px] text-slate-500 font-sans">
                              {skill.level}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/50 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>CATEGORY VERIFIED</span>
                  <span className="text-neon-pink">● ACTIVE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
