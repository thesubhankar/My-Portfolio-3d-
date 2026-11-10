import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { storage, subscribeToStorage } from '../services/storage';
import { animateSectionReveal } from '../animations/gsapAnimations';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { HiOutlinePhotograph } from 'react-icons/hi';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [activeSlide, setActiveSlide] = useState({});
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Initial fetch from storage service
    setProjects(storage.getProjects());

    // Subscribe to real-time additions/edits from Admin panel
    const unsubscribe = subscribeToStorage(({ key }) => {
      if (key?.includes('projects') || key === 'RESET') {
        setProjects(storage.getProjects());
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const header = sectionRef.current.querySelector('.section-header');
    animateSectionReveal(sectionRef.current, header, cardsRef.current);
  }, [projects, filter]);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ds', label: 'Data Science' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'analytics', label: 'Analytics & EDA' }
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'ds') return p.category?.toLowerCase().includes('data science') || p.category?.toLowerCase().includes('engineering');
    if (filter === 'ml') return p.category?.toLowerCase().includes('machine learning') || p.category?.toLowerCase().includes('ai');
    if (filter === 'analytics') return p.category?.toLowerCase().includes('analytics') || p.category?.toLowerCase().includes('database');
    return true;
  });

  const handleNextSlide = (projId, totalSlides, e) => {
    e.stopPropagation();
    setActiveSlide((prev) => ({
      ...prev,
      [projId]: ((prev[projId] || 0) + 1) % totalSlides
    }));
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-4 sm:px-8 lg:px-12 border-t border-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          number="4"
          title="Featured Projects & Production Code"
          subtitle="Real-world data science platforms, machine learning algorithms, and interactive analytics studios built with production rigor."
          comment="portfolio.get_projects(status='deployed')"
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-xl transition-all duration-200 border ${
                filter === cat.id
                  ? 'bg-neon-pink/15 text-white border-neon-pink shadow-neon-pink'
                  : 'bg-dark-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="text-slate-500 text-xs ml-auto hidden sm:inline">
            Showing {filteredProjects.length} codebases
          </span>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const slides = project.images && project.images.length > 0 ? project.images : [project.image];
            const currentSlideIdx = activeSlide[project.id] || 0;
            const currentImage = slides[currentSlideIdx] || project.image || '/images/profile.jpg';

            return (
              <div
                key={project.id || idx}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="project-card rounded-2xl bg-dark-900/80 border border-slate-800/90 overflow-hidden flex flex-col justify-between hover:border-neon-pink/50 hover:shadow-neon-pink transition-all duration-300 group"
              >
                <div>
                  {/* Image & Slide Area */}
                  <div className="relative aspect-[16/10] bg-dark-950 overflow-hidden">
                    <img
                      src={currentImage}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80";
                      }}
                    />

                    {/* Category Overlay Tag */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-dark-950/80 backdrop-blur-md border border-slate-700/60 font-mono text-[10px] text-neon-cyan">
                      {project.category || 'Data Science'}
                    </div>

                    {/* Multi-image indicator & switcher */}
                    {slides.length > 1 && (
                      <button
                        onClick={(e) => handleNextSlide(project.id, slides.length, e)}
                        className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-dark-950/80 backdrop-blur-md border border-slate-700/60 font-mono text-[10px] text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                        title="Click to see next screenshot"
                      >
                        <HiOutlinePhotograph className="text-xs text-neon-pink" />
                        <span>{currentSlideIdx + 1}/{slides.length}</span>
                      </button>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="font-mono text-base font-bold text-white mb-2.5 group-hover:text-neon-cyan transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies?.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-dark-800 text-[10px] font-mono text-slate-300 border border-slate-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-6 pt-0 border-t border-slate-800/40 mt-4 flex items-center justify-between gap-3">
                  {project.github ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      href={project.github}
                      target="_blank"
                      icon={FaGithub}
                      className="w-full"
                    >
                      Code
                    </Button>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-600">Private Repo</span>
                  )}

                  {project.live && (
                    <Button
                      variant="primary"
                      size="sm"
                      href={project.live}
                      target="_blank"
                      icon={FaExternalLinkAlt}
                      className="w-full"
                    >
                      Demo
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
