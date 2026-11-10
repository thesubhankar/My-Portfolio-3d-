import React, { useEffect, useState, useRef } from 'react';
import { fadeOutLoadingScreen } from '../animations/pageTransition';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING DIGITAL WORKSPACE...");
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const steps = [
      { at: 20, text: "LOADING NOTEBOOK KERNEL [PYTHON 3.11]..." },
      { at: 45, text: "MOUNTING 3D WORKSTATION & MODELS..." },
      { at: 75, text: "CONNECTING GITHUB TELEMETRY & DATASETS..." },
      { at: 95, text: "SYSTEM DIAGNOSTICS: ALL STREAMS READY..." },
      { at: 100, text: "STATUS: SYSTEM ONLINE." }
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(timer);
          setStatusText("STATUS: SYSTEM ONLINE");
          setTimeout(() => {
            setIsLoaded(true);
            fadeOutLoadingScreen(containerRef.current, onComplete);
          }, 350);
          return 100;
        }

        const currentStep = steps.find((s) => prev < s.at && next >= s.at);
        if (currentStep) {
          setStatusText(currentStep.text);
        }

        return next;
      });
    }, 55);

    // Safety timeout: max 2.5s
    const safetyTimeout = setTimeout(() => {
      clearInterval(timer);
      setProgress(100);
      setIsLoaded(true);
      fadeOutLoadingScreen(containerRef.current, onComplete);
    }, 2800);

    return () => {
      clearInterval(timer);
      clearTimeout(safetyTimeout);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsLoaded(true);
    fadeOutLoadingScreen(containerRef.current, onComplete);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-dark-950 text-slate-200 px-6 select-none"
    >
      <div className="w-full max-w-md p-6 rounded-xl border border-slate-800 bg-dark-900/90 shadow-2xl backdrop-blur-md">
        {/* IDE Window Title Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="font-mono text-xs text-slate-400">subhankar_portfolio.py</span>
          <span className="font-mono text-[10px] text-neon-pink bg-neon-pink/10 px-2 py-0.5 rounded border border-neon-pink/30">
            v3.0.0
          </span>
        </div>

        {/* Loading Terminal Text */}
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-neon-cyan">
            <span>&gt; {statusText}</span>
            <span className="font-bold text-neon-pink">{progress}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-dark-800 overflow-hidden border border-slate-700/60 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan transition-all duration-150 ease-out shadow-neon-pink"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500">
            <span>RAM: 16GB · GPU: ACCELERATED</span>
            <button
              onClick={handleSkip}
              className="hover:text-neon-cyan underline transition-colors"
            >
              Skip Intro [Esc]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
