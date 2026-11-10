import React, { useRef, useEffect } from 'react';
import Hero3DScene from '../components/home/Hero3DScene';
import HeroContent from '../components/home/HeroContent';
import { animateHeroEntrance } from '../animations/gsapAnimations';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import { scrollToTarget } from '../animations/scrollAnimations';

const Home = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const badge = contentRef.current.querySelector('.hero-badge');
    const heading = contentRef.current.querySelector('.hero-heading');
    const role = contentRef.current.querySelector('.hero-role');
    const desc = contentRef.current.querySelector('.hero-desc');
    const buttons = contentRef.current.querySelectorAll('.hero-buttons button, .hero-buttons a');
    const socials = contentRef.current.querySelectorAll('.hero-socials a');

    animateHeroEntrance({
      badge,
      heading,
      role,
      desc,
      buttons,
      socials,
      visual: visualRef.current
    });
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between pt-24 lg:pt-16 pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Grid */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left: Hero Content */}
        <div className="lg:col-span-6 z-10">
          <HeroContent contentRef={contentRef} />
        </div>

        {/* Right: 3D Developer Workstation */}
        <div ref={visualRef} className="lg:col-span-6 z-10 w-full">
          <Hero3DScene />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="pt-8 flex flex-col items-center justify-center text-slate-500 hover:text-neon-cyan transition-colors cursor-pointer select-none">
        <button
          onClick={() => scrollToTarget('#about', -20)}
          className="flex flex-col items-center gap-1 group font-mono text-xs"
        >
          <span className="text-[11px] group-hover:text-neon-cyan transition-colors">Scroll to explore</span>
          <HiOutlineChevronDoubleDown className="text-base animate-bounce text-neon-pink group-hover:text-neon-cyan transition-colors" />
        </button>
      </div>
    </section>
  );
};

export default Home;
