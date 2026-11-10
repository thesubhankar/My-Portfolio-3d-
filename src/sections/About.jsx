import React, { useRef, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { portfolioData } from '../data/navigation';
import { animateSectionReveal } from '../animations/gsapAnimations';
import { 
  HiOutlineLightningBolt, 
  HiOutlineDatabase, 
  HiOutlineChartBar, 
  HiOutlineServer 
} from 'react-icons/hi';

const iconMap = {
  brain: HiOutlineLightningBolt,
  chart: HiOutlineChartBar,
  server: HiOutlineServer,
  database: HiOutlineDatabase
};

const About = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const header = sectionRef.current.querySelector('.section-header');
    animateSectionReveal(sectionRef.current, header, cardsRef.current);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-4 sm:px-8 lg:px-12 border-t border-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          number="2"
          title="About Me & Philosophy"
          subtitle="Transforming unstructured patterns into actionable business decisions and reliable machine learning pipelines."
          comment="subhankar.get_biography()"
        />

        {/* Top Story & IDE Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left: Detailed Story */}
          <div className="lg:col-span-7 space-y-4 text-slate-300 leading-relaxed font-sans text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-dark-900/80 border border-slate-800 font-mono text-xs text-neon-cyan flex items-center justify-between">
              <span>In [2]: print(subhankar.objective)</span>
              <span className="text-neon-pink">Out [2]:</span>
            </div>

            <p>
              I am <strong className="text-white font-semibold">Subhankar Giri</strong>, a Data Scientist and Data Analyst with a deep obsession for how numbers, probability, and algorithms shape strategic decisions. My passion lies at the intersection of statistical discovery and production engineering.
            </p>

            <p>
              Whether handling noisy real-world CSV/JSON telemetry, fine-tuning classification models, or developing streamlined Streamlit interfaces, I prioritize clarity, reproducibility, and measurable real-world performance over vanity metrics.
            </p>

            <p>
              My goal is to collaborate with visionary teams where data science directly empowers business growth, unlocks predictive foresight, and delivers clean, maintainable analytical architecture.
            </p>
          </div>

          {/* Right: Quick Stats & Terminal Metadata */}
          <div className="lg:col-span-5 rounded-2xl bg-dark-900/90 border border-slate-800/80 p-6 shadow-glass space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-neon-pink font-semibold border-b border-slate-800 pb-2">
              // Core Profile Parameters
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">ROLE</span>
                <span className="text-white font-medium">Data Scientist & Analyst</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">LOCATION</span>
                <span className="text-slate-200">Odisha, India</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">PRIMARY TOOLS</span>
                <span className="text-neon-cyan">Python · SQL · Power BI</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-800/50">
                <span className="text-slate-400">FRAMEWORKS</span>
                <span className="text-neon-pink">Scikit-learn · Streamlit</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-slate-400">AVAILABILITY</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Immediate / Open for Work
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {portfolioData.bioHighlights.map((item, idx) => {
            const Icon = iconMap[item.icon] || HiOutlineLightningBolt;
            return (
              <div
                key={idx}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="p-5 rounded-xl bg-dark-900/60 border border-slate-800/80 hover:border-neon-cyan/50 hover:shadow-neon-cyan transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-dark-800 border border-slate-700/60 flex items-center justify-center text-neon-cyan group-hover:text-neon-pink group-hover:border-neon-pink/40 transition-colors mb-4">
                    <Icon className="text-xl" />
                  </div>
                  <h4 className="font-mono text-sm font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
