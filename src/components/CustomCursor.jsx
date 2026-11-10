import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .interactive, .project-card');
      setIsPointer(!!isInteractive);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Central dot */}
      <div
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '8px' : '6px',
          height: isPointer ? '8px' : '6px',
          backgroundColor: isPointer ? '#ff007f' : '#00f0ff',
          boxShadow: isPointer ? '0 0 10px #ff007f' : '0 0 8px #00f0ff'
        }}
      />
      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out border"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isPointer ? '44px' : '26px',
          height: isPointer ? '44px' : '26px',
          borderColor: isPointer ? 'rgba(255, 0, 127, 0.6)' : 'rgba(0, 240, 255, 0.4)',
          backgroundColor: isPointer ? 'rgba(255, 0, 127, 0.08)' : 'transparent',
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.15 : 1})`
        }}
      />
    </>
  );
};

export default CustomCursor;
