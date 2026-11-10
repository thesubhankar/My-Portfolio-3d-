import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { api } from '../services/api';
import { animateSectionReveal } from '../animations/gsapAnimations';
import { FaGithub, FaCodeBranch, FaStar, FaEye, FaSync } from 'react-icons/fa';

const GithubAnalytics = () => {
  const [userData, setUserData] = useState({
    login: 'thesubhankar',
    public_repos: 12,
    followers: 2,
    following: 5,
    status: 'Live API Synced'
  });
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true);
      const data = await api.getGitHubProfile();
      setUserData(data);
      setLoading(false);
    };

    fetchGitHubData();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const header = sectionRef.current.querySelector('.section-header');
    animateSectionReveal(sectionRef.current, header, cardsRef.current);
  }, []);

  return (
    <section
      id="github"
      ref={sectionRef}
      className="py-20 px-4 sm:px-8 lg:px-12 border-t border-slate-900 bg-dark-950/40"
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          number="9"
          title="GitHub Analytics & Live Activity"
          subtitle="Real-time open source telemetry, version control consistency, and repository contributions tracked on GitHub."
          comment="github_analytics.sync(user='thesubhankar', live=True)"
        />

        {/* Top User Status Header */}
        <div className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800/80 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-dark-800 border border-neon-cyan/40 flex items-center justify-center text-white text-2xl">
              <FaGithub />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-base font-bold text-white">
                  @{userData.login}
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {userData.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Python, Data Science & Machine Learning Repositories
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            href="https://github.com/thesubhankar"
            target="_blank"
            icon={FaGithub}
          >
            View GitHub Profile ↗
          </Button>
        </div>

        {/* 4 Telemetry Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="p-5 rounded-xl bg-dark-900/80 border border-slate-800/80 flex flex-col justify-between"
          >
            <span className="font-mono text-[11px] text-slate-400 flex items-center justify-between">
              REPOSITORIES
              <FaCodeBranch className="text-neon-cyan" />
            </span>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-white">
                {userData.public_repos}
              </span>
              <span className="block text-[10px] text-slate-500 font-mono mt-1">
                Public Codebases
              </span>
            </div>
          </div>

          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="p-5 rounded-xl bg-dark-900/80 border border-slate-800/80 flex flex-col justify-between"
          >
            <span className="font-mono text-[11px] text-slate-400 flex items-center justify-between">
              CONTRIBUTIONS
              <FaSync className="text-neon-pink" />
            </span>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-neon-pink">
                190+
              </span>
              <span className="block text-[10px] text-slate-500 font-mono mt-1">
                Commits & Merges
              </span>
            </div>
          </div>

          <div
            ref={(el) => (cardsRef.current[2] = el)}
            className="p-5 rounded-xl bg-dark-900/80 border border-slate-800/80 flex flex-col justify-between"
          >
            <span className="font-mono text-[11px] text-slate-400 flex items-center justify-between">
              FOLLOWERS
              <FaEye className="text-neon-purple" />
            </span>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-white">
                {userData.followers}
              </span>
              <span className="block text-[10px] text-slate-500 font-mono mt-1">
                Active Developers
              </span>
            </div>
          </div>

          <div
            ref={(el) => (cardsRef.current[3] = el)}
            className="p-5 rounded-xl bg-dark-900/80 border border-slate-800/80 flex flex-col justify-between"
          >
            <span className="font-mono text-[11px] text-slate-400 flex items-center justify-between">
              COMMUNITY STARS
              <FaStar className="text-amber-400" />
            </span>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-white">
                5+
              </span>
              <span className="block text-[10px] text-slate-500 font-mono mt-1">
                Starred Projects
              </span>
            </div>
          </div>
        </div>

        {/* Live GitHub Streak & Activity Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-4 rounded-2xl bg-dark-900/80 border border-slate-800/80 flex flex-col justify-between overflow-hidden">
            <span className="font-mono text-xs text-neon-cyan mb-3 block">
              // Live Activity Streak
            </span>
            <div className="w-full overflow-x-auto flex justify-center py-2">
              <img
                src="https://streak-stats.demolab.com/?user=thesubhankar&theme=tokyonight&hide_border=true"
                alt="GitHub Streak"
                className="max-w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-dark-900/80 border border-slate-800/80 flex flex-col justify-between overflow-hidden">
            <span className="font-mono text-xs text-neon-pink mb-3 block">
              // Top Repository Languages
            </span>
            <div className="w-full overflow-x-auto flex justify-center py-2">
              <img
                src="https://github-stats-extended.vercel.app/api/top-langs/?username=thesubhankar&theme=tokyonight&layout=donut&hide_border=true"
                alt="Top Languages"
                className="max-w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubAnalytics;
