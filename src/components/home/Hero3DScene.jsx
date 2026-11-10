import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import DeveloperWorkstation3D from './DeveloperWorkstation3D';
import WorkstationFallback from './WorkstationFallback';

const Hero3DScene = () => {
  const mousePos = useRef({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check WebGL availability safely
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    // Check device size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      // Normalize mouse coordinates from -1 to 1
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!hasWebGL) {
    return <WorkstationFallback />;
  }

  return (
    <div className="relative w-full h-[380px] md:h-[480px] lg:h-[540px] select-none rounded-2xl overflow-hidden border border-slate-800/60 bg-dark-950/60 shadow-glass">
      {/* Top Floating Terminal Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 font-mono text-[11px] px-3 py-1.5 rounded-lg bg-dark-900/80 border border-slate-800 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="text-slate-300">DIGITAL WORKSPACE</span>
        <span className="text-neon-pink">[3D LIVE]</span>
      </div>

      <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 font-mono text-[10px] px-2.5 py-1 rounded bg-dark-900/60 text-slate-400 border border-slate-800">
        <span>INTERACTIVE PARALLAX</span>
      </div>

      <Suspense fallback={<WorkstationFallback />}>
        <Canvas
          shadows
          camera={{ position: [0, 0.4, 2.6], fov: isMobile ? 55 : 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          {/* Ambient Lighting */}
          <ambientLight intensity={0.4} />
          {/* Key Light (Cyan) */}
          <directionalLight
            position={[3, 5, 2]}
            intensity={0.9}
            color="#00f0ff"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          {/* Rim Light (Neon Pink) */}
          <pointLight position={[-3, 2, -2]} intensity={1.8} color="#ff007f" />
          {/* Fill Light (Deep Purple) */}
          <pointLight position={[0, -2, 2]} intensity={0.8} color="#9d4edd" />

          {/* Floating Subtle Ambient Dust Particles */}
          <Sparkles count={40} scale={4} size={2.5} speed={0.4} opacity={0.6} color="#00f0ff" />

          <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.1}>
            <DeveloperWorkstation3D mousePos={mousePos} />
          </Float>
        </Canvas>
      </Suspense>

      {/* Subtle bottom gradient overlay for smooth layout blending */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Hero3DScene;
