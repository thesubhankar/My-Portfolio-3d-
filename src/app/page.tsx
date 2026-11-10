import React from 'react';
import RobotCursorManager from '../components/RobotCursorManager';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Work from '../components/Work';
import StackMarquee from '../components/StackMarquee';
import Record from '../components/Record';
import About from '../components/About';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      {/* 12 Robot Cursors Signature Engine & Floating Controls */}
      <RobotCursorManager />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Hero Section with Metallic Gradient & Headshot */}
      <Hero />

      {/* Section 1: Work that ships */}
      <Work />

      {/* Section 2: Endless Technical Arsenal Stack Marquee */}
      <StackMarquee />

      {/* Section 3: Track Record (Experience, Education, Certifications) */}
      <Record />

      {/* Section 4: About & Operating Principles */}
      <About />

      {/* Section 5: Big Call to Action & Footer */}
      <Contact />
    </main>
  );
}
