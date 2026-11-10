import React, { useState, useEffect } from 'react';
import { useLenis } from './animations/scrollAnimations';

// Navigation & Global UI Chrome
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MobileMenu from './components/MobileMenu';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Footer from './components/Footer';
import AdminDashboard from './admin/AdminDashboard';

// All 11 Core Portfolio Sections
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Achievements from './sections/Achievements';
import GithubAnalytics from './sections/GithubAnalytics';
import Resume from './sections/Resume';
import Contact from './sections/Contact';

const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'projects',
  'certifications',
  'education',
  'experience',
  'achievements',
  'github',
  'resume',
  'contact'
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useLenis();

  // Active section tracking via IntersectionObserver & scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      let current = 'home';

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Keyboard shortcut for Admin: Ctrl + Shift + A or Escape to close
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsAdminOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-950 text-slate-200 overflow-x-hidden">
      {/* 1. Loading Screen */}
      <LoadingScreen onComplete={() => console.log('Portfolio initialized.')} />

      {/* 2. Global Utilities & Cursor */}
      <ScrollProgress />
      <CustomCursor />

      {/* 3. Navigation Controls */}
      <Navbar
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <Sidebar
        activeSection={activeSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 4. Admin Panel Dynamic Storage Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* 5. Main Application Content (Offset on desktop for fixed notebook sidebar) */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        <main className="flex-1 w-full max-w-full">
          {/* [1] Home */}
          <Home />

          {/* [2] About */}
          <About />

          {/* [3] Skills */}
          <Skills />

          {/* [4] Projects */}
          <Projects />

          {/* [5] Certifications */}
          <Certifications />

          {/* [6] Education */}
          <Education />

          {/* [7] Experience */}
          <Experience />

          {/* [8] Achievements */}
          <Achievements />

          {/* [9] GitHub Analytics */}
          <GithubAnalytics />

          {/* [10] Resume / CV */}
          <Resume />

          {/* [11] Contact */}
          <Contact />
        </main>

        {/* 6. Footer */}
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      </div>
    </div>
  );
}

export default App;
