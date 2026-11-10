import { gsap } from 'gsap';

export const fadeOutLoadingScreen = (element, onComplete) => {
  if (!element) {
    if (onComplete) onComplete();
    return;
  }

  gsap.to(element, {
    opacity: 0,
    scale: 1.02,
    duration: 0.7,
    ease: 'power3.inOut',
    onComplete: () => {
      element.style.display = 'none';
      if (onComplete) onComplete();
    }
  });
};
