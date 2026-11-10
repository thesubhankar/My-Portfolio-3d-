import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Hero Entrance Animation Timeline
export const animateHeroEntrance = (targets, onComplete) => {
  const { badge, heading, role, desc, buttons, socials, visual } = targets;

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out', duration: 0.9 },
    onComplete
  });

  if (badge) {
    tl.fromTo(badge, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
  }

  if (heading) {
    tl.fromTo(heading, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, '-=0.3');
  }

  if (role) {
    tl.fromTo(role, { opacity: 0, y: 25 }, { opacity: 1, y: 0 }, '-=0.4');
  }

  if (desc) {
    tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.4');
  }

  if (buttons) {
    tl.fromTo(buttons, { opacity: 0, y: 20, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, stagger: 0.12 }, '-=0.3');
  }

  if (socials) {
    tl.fromTo(socials, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, stagger: 0.08 }, '-=0.3');
  }

  if (visual) {
    tl.fromTo(visual, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.2 }, 0.2);
  }

  return tl;
};

// Section Reveal Animation with ScrollTrigger
export const animateSectionReveal = (sectionEl, headerEl, itemsEl = []) => {
  if (!sectionEl) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      start: 'top 82%',
      toggleActions: 'play none none none'
    }
  });

  if (headerEl) {
    tl.fromTo(headerEl, 
      { opacity: 0, y: 35 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
  }

  if (itemsEl && itemsEl.length > 0) {
    tl.fromTo(itemsEl, 
      { opacity: 0, y: 30, scale: 0.97 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out' },
      '-=0.4'
    );
  }

  return tl;
};

// Subtle Card Hover
export const attachCardHover = (element) => {
  if (!element) return () => {};

  const enter = () => {
    gsap.to(element, {
      y: -5,
      duration: 0.3,
      ease: 'power2.out',
      boxShadow: '0 12px 30px rgba(0, 240, 255, 0.12)'
    });
  };

  const leave = () => {
    gsap.to(element, {
      y: 0,
      duration: 0.35,
      ease: 'power2.out',
      boxShadow: 'none'
    });
  };

  element.addEventListener('mouseenter', enter);
  element.addEventListener('mouseleave', leave);

  return () => {
    element.removeEventListener('mouseenter', enter);
    element.removeEventListener('mouseleave', leave);
  };
};

// Magnetic Button Hover
export const buttonMagneticHover = (element) => {
  if (!element) return () => {};

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};
