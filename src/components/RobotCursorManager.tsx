'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Play, Pause, Bot, Compass, Eye, ShieldCheck } from 'lucide-react';

export interface AgentDef {
  name: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
}

const ALL_AGENTS: AgentDef[] = [
  { name: 'Scout', color: '#10b981', badgeBg: '#064e3b', badgeBorder: '#059669', badgeText: '#6ee7b7' },
  { name: 'Layout', color: '#3b82f6', badgeBg: '#1e3a8a', badgeBorder: '#2563eb', badgeText: '#93c5fd' },
  { name: 'Typeset', color: '#f59e0b', badgeBg: '#78350f', badgeBorder: '#d97706', badgeText: '#fde68a' },
  { name: 'Motion', color: '#8b5cf6', badgeBg: '#4c1d95', badgeBorder: '#7c3aed', badgeText: '#c4b5fd' },
  { name: 'QA', color: '#ff3b2f', badgeBg: '#7f1d1d', badgeBorder: '#dc2626', badgeText: '#fca5a5' },
  { name: 'Deploy', color: '#06b6d4', badgeBg: '#164e63', badgeBorder: '#0891b2', badgeText: '#a5f3fc' },
  { name: 'Copy', color: '#f97316', badgeBg: '#7c2d12', badgeBorder: '#ea580c', badgeText: '#fed7aa' },
  { name: 'Lint', color: '#84cc16', badgeBg: '#365314', badgeBorder: '#65a30d', badgeText: '#d9f99d' },
  { name: 'Index', color: '#ec4899', badgeBg: '#831843', badgeBorder: '#db2777', badgeText: '#fbcfe8' },
  { name: 'Render', color: '#6366f1', badgeBg: '#312e81', badgeBorder: '#4f46e5', badgeText: '#c7d2fe' },
  { name: 'Palette', color: '#14b8a6', badgeBg: '#134e4a', badgeBorder: '#0d9488', badgeText: '#99f6e4' },
  { name: 'Review', color: '#f43f5e', badgeBg: '#881337', badgeBorder: '#e11d48', badgeText: '#fecdd3' },
];

interface WireframeBox {
  id: string;
  agentName: string;
  color: string;
  buildType: string;
  x: number;
  y: number;
  width: number;
  height: number;
  progress: number; // 0 to 1
}

interface CursorState {
  agent: AgentDef;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  state: 'idle' | 'gliding' | 'dragging' | 'done';
  currentElement: HTMLElement | null;
  dragStartTime: number;
  boxStart: { x: number; y: number; w: number; h: number };
}

export default function RobotCursorManager() {
  const [agentsEnabled, setAgentsEnabled] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isTouring, setIsTouring] = useState<boolean>(false);
  const [booting, setBooting] = useState<boolean>(true);
  const [bootText, setBootText] = useState<string>('INITIALIZING 12 BUILD ROBOTS...');
  const [activeBoxes, setActiveBoxes] = useState<WireframeBox[]>([]);
  const [cursorRenderList, setCursorRenderList] = useState<
    Array<{ agent: AgentDef; x: number; y: number; state: string; isBuilding: boolean }>
  >([]);

  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  const agentsEnabledRef = useRef(agentsEnabled);
  agentsEnabledRef.current = agentsEnabled;

  const isTouringRef = useRef(isTouring);
  isTouringRef.current = isTouring;

  const cursorsRef = useRef<CursorState[]>([]);
  const queueRef = useRef<HTMLElement[]>([]);
  const buildingSetRef = useRef<Set<HTMLElement>>(new Set());
  const rAFRef = useRef<number | null>(null);

  // Initialize agents & settings
  useEffect(() => {
    // Check URL parameters
    const params = new URLSearchParams(window.location.search);
    const agentsParam = params.get('agents');
    const saved = localStorage.getItem('subhankar_agents_enabled');

    let enabled = true;
    if (agentsParam === 'off') {
      enabled = false;
    } else if (agentsParam === 'on') {
      enabled = true;
    } else if (saved === 'false') {
      enabled = false;
    }

    setAgentsEnabled(enabled);

    // Initial agent count based on screen width
    const isMobile = window.innerWidth < 768;
    const activeDefs = isMobile ? ALL_AGENTS.slice(0, 6) : ALL_AGENTS;

    cursorsRef.current = activeDefs.map((agent, i) => ({
      agent,
      x: 30 + (i % 6) * 110,
      y: 80 + Math.floor(i / 6) * 90,
      targetX: 30 + (i % 6) * 110,
      targetY: 80 + Math.floor(i / 6) * 90,
      state: 'idle',
      currentElement: null,
      dragStartTime: 0,
      boxStart: { x: 0, y: 0, w: 0, h: 0 },
    }));

    // Boot loader countdown
    const bootTimer = setTimeout(() => {
      setBootText('AGENTS DEPLOYED. COMMENCING BUILD.');
      setTimeout(() => {
        setBooting(false);
      }, 350);
    }, 750);

    return () => clearTimeout(bootTimer);
  }, []);

  // Sync class on document
  useEffect(() => {
    if (agentsEnabled) {
      document.documentElement.classList.add('build-mode');
      localStorage.setItem('subhankar_agents_enabled', 'true');
    } else {
      document.documentElement.classList.remove('build-mode');
      localStorage.setItem('subhankar_agents_enabled', 'false');
      // Mark all elements built immediately
      document.querySelectorAll('[data-build]').forEach((el) => {
        el.classList.add('is-built');
        el.classList.remove('is-building');
      });
      setActiveBoxes([]);
    }
  }, [agentsEnabled]);

  // Handle building logic for an element
  const triggerElementBuild = useCallback((el: HTMLElement, buildType: string) => {
    el.classList.add('is-building');

    if (buildType === 'type') {
      // Letter by letter typing
      const fullText = el.getAttribute('data-full-text') || el.innerText || '';
      if (!el.getAttribute('data-full-text')) {
        el.setAttribute('data-full-text', fullText);
      }
      el.innerText = '';
      el.style.visibility = 'visible';

      let charIndex = 0;
      const typeSpeed = Math.max(12, Math.min(30, 450 / Math.max(1, fullText.length)));
      const typeInterval = setInterval(() => {
        if (isPausedRef.current) return;
        charIndex++;
        el.innerText = fullText.slice(0, charIndex);
        if (charIndex >= fullText.length) {
          clearInterval(typeInterval);
          el.classList.remove('is-building');
          el.classList.add('is-built');
        }
      }, typeSpeed);
    } else if (buildType === 'pop') {
      el.style.visibility = 'visible';
      setTimeout(() => {
        el.classList.remove('is-building');
        el.classList.add('is-built');
      }, 350);
    } else if (buildType === 'wipe') {
      el.style.visibility = 'visible';
      setTimeout(() => {
        el.classList.remove('is-building');
        el.classList.add('is-built');
      }, 420);
    } else {
      el.style.visibility = 'visible';
      el.classList.remove('is-building');
      el.classList.add('is-built');
    }
  }, []);

  // IntersectionObserver to discover elements in reading order
  useEffect(() => {
    if (!agentsEnabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (target.classList.contains('is-built')) return;

          // If scrolled past already, build immediately
          const rect = target.getBoundingClientRect();
          if (rect.bottom < 0) {
            target.classList.add('is-built');
            target.style.visibility = 'visible';
            return;
          }

          if (entry.isIntersecting) {
            if (!queueRef.current.includes(target) && !buildingSetRef.current.has(target)) {
              queueRef.current.push(target);
              // Sort queue by vertical page position, then horizontal (reading order)
              queueRef.current.sort((a, b) => {
                const ra = a.getBoundingClientRect();
                const rb = b.getBoundingClientRect();
                if (Math.abs(ra.top - rb.top) > 15) {
                  return ra.top - rb.top;
                }
                return ra.left - rb.left;
              });
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '100px 0px 40px 0px',
        threshold: 0.05,
      }
    );

    const elements = document.querySelectorAll('[data-build]:not(.is-built)');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [agentsEnabled, booting]);

  // Main requestAnimationFrame loop
  useEffect(() => {
    if (!agentsEnabled || booting) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min(50, time - lastTime);
      lastTime = time;

      if (!isPausedRef.current) {
        // Count active building cursors (max 6 simultaneously)
        const buildingCount = cursorsRef.current.filter(
          (c) => c.state === 'dragging' || c.state === 'gliding'
        ).length;

        // Assign idle cursors to queue items
        if (buildingCount < 6 && queueRef.current.length > 0) {
          const idleCursors = cursorsRef.current.filter((c) => c.state === 'idle');
          while (idleCursors.length > 0 && queueRef.current.length > 0 && cursorsRef.current.filter(c => c.state !== 'idle').length < 6) {
            const nextEl = queueRef.current.shift()!;
            if (!nextEl || nextEl.classList.contains('is-built')) continue;

            const cursor = idleCursors.shift()!;
            buildingSetRef.current.add(nextEl);

            const rect = nextEl.getBoundingClientRect();
            cursor.currentElement = nextEl;
            cursor.state = 'gliding';
            cursor.targetX = rect.left;
            cursor.targetY = rect.top;
            cursor.boxStart = {
              x: rect.left,
              y: rect.top,
              w: Math.max(30, rect.width),
              h: Math.max(20, rect.height),
            };
          }
        }

        // Update cursor positions and wireframe boxes
        const nextBoxes: WireframeBox[] = [];

        cursorsRef.current.forEach((cursor) => {
          if (cursor.state === 'gliding') {
            // Smooth glide towards top-left
            const dx = cursor.targetX - cursor.x;
            const dy = cursor.targetY - cursor.y;
            const dist = Math.hypot(dx, dy);

            cursor.x += dx * 0.18;
            cursor.y += dy * 0.18;

            if (dist < 8) {
              // Arrived! Start dragging wireframe box
              cursor.state = 'dragging';
              cursor.dragStartTime = time;
            }
          } else if (cursor.state === 'dragging' && cursor.currentElement) {
            const el = cursor.currentElement;
            const rect = el.getBoundingClientRect();
            // Re-sync with actual viewport position (in case user scrolled)
            cursor.boxStart = {
              x: rect.left,
              y: rect.top,
              w: Math.max(30, rect.width),
              h: Math.max(20, rect.height),
            };

            const duration = 240; // ms to drag box
            const elapsed = time - cursor.dragStartTime;
            const progress = Math.min(1, elapsed / duration);

            // Cursor drags to bottom right
            cursor.x = cursor.boxStart.x + cursor.boxStart.w * progress;
            cursor.y = cursor.boxStart.y + cursor.boxStart.h * progress;

            const buildType = el.getAttribute('data-build') || 'pop';

            nextBoxes.push({
              id: `${cursor.agent.name}-${el.id || Math.random()}`,
              agentName: cursor.agent.name,
              color: cursor.agent.color,
              buildType,
              x: cursor.boxStart.x,
              y: cursor.boxStart.y,
              width: cursor.boxStart.w * progress,
              height: cursor.boxStart.h * progress,
              progress,
            });

            if (progress >= 1) {
              // Trigger element content reveal
              triggerElementBuild(el, buildType);
              cursor.state = 'idle';
              buildingSetRef.current.delete(el);
              cursor.currentElement = null;
            }
          }
        });

        setActiveBoxes(nextBoxes);

        // Update render state for cursors
        setCursorRenderList(
          cursorsRef.current.map((c) => ({
            agent: c.agent,
            x: c.x,
            y: c.y,
            state: c.state,
            isBuilding: c.state === 'dragging',
          }))
        );
      }

      rAFRef.current = requestAnimationFrame(loop);
    };

    rAFRef.current = requestAnimationFrame(loop);

    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, [agentsEnabled, booting, triggerElementBuild]);

  // Tour Auto-Scroll Handler
  useEffect(() => {
    if (!isTouring) return;

    let tourActive = true;
    let scrollSpeed = 2.4; // smooth steady recording speed

    // Cancel tour on any manual scroll, mouse wheel, touch or keydown
    const stopTour = () => {
      tourActive = false;
      setIsTouring(false);
    };

    window.addEventListener('wheel', stopTour, { passive: true });
    window.addEventListener('touchstart', stopTour, { passive: true });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') stopTour();
    });

    const scrollStep = () => {
      if (!tourActive || !isTouringRef.current) return;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 4) {
        // Reached the bottom!
        stopTour();
        return;
      }

      window.scrollBy(0, scrollSpeed);
      requestAnimationFrame(scrollStep);
    };

    const startTimer = setTimeout(() => {
      requestAnimationFrame(scrollStep);
    }, 900);

    return () => {
      tourActive = false;
      clearTimeout(startTimer);
      window.removeEventListener('wheel', stopTour);
      window.removeEventListener('touchstart', stopTour);
    };
  }, [isTouring]);

  // Keyboard Shortcuts: T = Tour, A = Agents, P = Pause, Esc = Cancel Tour
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'p' || e.key === 'P') {
        setIsPaused((prev) => !prev);
      } else if (e.key === 'a' || e.key === 'A') {
        setAgentsEnabled((prev) => !prev);
      } else if (e.key === 't' || e.key === 'T') {
        startTour();
      } else if (e.key === 'Escape' && isTouring) {
        setIsTouring(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTouring]);

  const startTour = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsTouring(true);
  };

  return (
    <>
      {/* Short Boot Loader Screen */}
      {booting && (
        <div className="fixed inset-0 z-50 bg-[#09090b] flex flex-col items-center justify-center pointer-events-none transition-opacity duration-500 font-mono text-xs">
          <div className="border border-zinc-800 bg-zinc-950/90 p-5 rounded-lg max-w-sm w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-2 mb-3 border-b border-zinc-800 pb-2">
              <span className="w-2 h-2 rounded-full bg-[#ff3b2f] animate-ping" />
              <span className="text-[#ff3b2f] font-bold tracking-wider">SYSTEM INITIALIZING</span>
            </div>
            <p className="text-zinc-300 text-sm mb-2">{bootText}</p>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#ff3b2f] h-full w-full animate-[wipeIn_0.8s_ease-out_forwards]" />
            </div>
            <div className="mt-3 flex justify-between text-zinc-500 text-[10px]">
              <span>AGENTS: 12 ASSIGNED</span>
              <span>READING ORDER: READY</span>
            </div>
          </div>
        </div>
      )}

      {/* Wireframe Boxes Overlay */}
      {agentsEnabled && activeBoxes.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {activeBoxes.map((box) => (
            <div
              key={box.id}
              className="absolute border border-blue-500/80 bg-blue-500/10 transition-all pointer-events-none"
              style={{
                left: `${box.x}px`,
                top: `${box.y}px`,
                width: `${box.width}px`,
                height: `${box.height}px`,
              }}
            >
              {/* Corner Handles */}
              <span className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 border border-white" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 border border-white" />
              <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 border border-white" />
              <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 border border-white" />

              {/* Wireframe Tag Label */}
              <div className="absolute -top-5 left-0 px-1.5 py-0.5 text-[9px] font-mono uppercase bg-blue-600 text-white rounded shadow-sm whitespace-nowrap">
                [{box.agentName}: {Math.round(box.width)}×{Math.round(box.height)}]
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Robot Cursors Layer */}
      {agentsEnabled && !booting && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {cursorRenderList.map(({ agent, x, y, state, isBuilding }) => (
            <div
              key={agent.name}
              className="absolute transition-transform will-change-transform duration-75"
              style={{
                transform: `translate3d(${x}px, ${y}px, 0)`,
                opacity: state === 'idle' ? 0.35 : 1,
              }}
            >
              {/* Arrow Pointer */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] -translate-x-1 -translate-y-1"
              >
                <path
                  d="M3 2L20 9L12 12L9 20L3 2Z"
                  fill={agent.color}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Agent Tag with Tiny Robot Head */}
              <div
                className="absolute left-4 top-2 flex items-center gap-1.5 px-2 py-0.5 rounded border shadow-lg text-[10px] font-mono font-medium whitespace-nowrap"
                style={{
                  backgroundColor: agent.badgeBg,
                  borderColor: agent.badgeBorder,
                  color: agent.badgeText,
                }}
              >
                {/* Tiny Robot Head SVG with Blinking Eyes & Pulsing Antenna */}
                <div className="relative w-4 h-4 flex items-center justify-center">
                  {/* Antenna with pulsing red tip */}
                  <div className="absolute -top-1 left-1.5 w-1 h-1 rounded-full bg-[#ff3b2f] robot-antenna-tip" />
                  <div className="absolute -top-0.5 left-2 w-px h-1 bg-zinc-300" />
                  {/* Robot Face Container */}
                  <div className="w-3.5 h-3 bg-zinc-800 border border-zinc-500 rounded-xs flex items-center justify-around px-0.5">
                    {/* LED Eyes */}
                    <span className="w-0.5 h-0.5 rounded-full bg-cyan-300 robot-led-eye" />
                    <span className="w-0.5 h-0.5 rounded-full bg-cyan-300 robot-led-eye" />
                  </div>
                </div>

                <span>{agent.name}</span>
                {isBuilding && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping ml-0.5" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Controls Dock at bottom center */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 px-3 rounded-full border border-zinc-800 bg-zinc-950/90 backdrop-blur-md shadow-2xl">
        {/* Pause / Resume Button */}
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          className={`custom-btn flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
            isPaused
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-zinc-300 hover:text-white hover:bg-zinc-800/80'
          }`}
          title="Pause or resume robot building (Shortcut: P)"
        >
          {isPaused ? <Play className="w-3.5 h-3.5 text-amber-400" /> : <Pause className="w-3.5 h-3.5" />}
          <span>{isPaused ? 'Resume' : 'Pause'}</span>
          <kbd className="hidden sm:inline-block px-1 py-0.2 text-[9px] bg-zinc-800 text-zinc-400 rounded">P</kbd>
        </button>

        <div className="w-px h-4 bg-zinc-800" />

        {/* Agents On / Off Toggle */}
        <button
          type="button"
          onClick={() => setAgentsEnabled((prev) => !prev)}
          className={`custom-btn flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
            agentsEnabled
              ? 'bg-[#ff3b2f]/15 text-white border border-[#ff3b2f]/40'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80'
          }`}
          title="Toggle robot builders on/off (Shortcut: A)"
        >
          <Bot className={`w-3.5 h-3.5 ${agentsEnabled ? 'text-[#ff3b2f]' : 'text-zinc-500'}`} />
          <span>Agents: {agentsEnabled ? 'ON' : 'OFF'}</span>
          <kbd className="hidden sm:inline-block px-1 py-0.2 text-[9px] bg-zinc-800 text-zinc-400 rounded">A</kbd>
        </button>

        <div className="w-px h-4 bg-zinc-800" />

        {/* Tour Button */}
        <button
          type="button"
          onClick={startTour}
          className={`custom-btn flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
            isTouring
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse'
              : 'text-zinc-300 hover:text-white hover:bg-zinc-800/80'
          }`}
          title="Auto-scroll tour for screen recording (Shortcut: T or Esc to stop)"
        >
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isTouring ? 'Touring...' : 'Tour'}</span>
          <kbd className="hidden sm:inline-block px-1 py-0.2 text-[9px] bg-zinc-800 text-zinc-400 rounded">T</kbd>
        </button>
      </div>
    </>
  );
}
