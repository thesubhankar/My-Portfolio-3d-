import React, { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-dark-900/60 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan transition-all duration-75 ease-out shadow-neon-pink"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
