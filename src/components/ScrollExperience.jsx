import React, { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

export default function ScrollExperience() {
  const progressRef = useRef(null);
  const [showTop, setShowTop] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const updateScrollEffects = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
        setShowTop(window.scrollY > 520);
      });
    };

    updateScrollEffects();
    window.addEventListener('scroll', updateScrollEffects, { passive: true });
    window.addEventListener('resize', updateScrollEffects);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateScrollEffects);
      window.removeEventListener('resize', updateScrollEffects);
    };
  }, []);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <>
      <div className="scroll-progress-track" aria-hidden="true">
        <div className="scroll-progress-fill" ref={progressRef} />
      </div>
      <button
        type="button"
        className={`scroll-top-button${showTop ? ' is-visible' : ''}`}
        onClick={backToTop}
        aria-label="Scroll back to the top"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
      >
        <span aria-hidden="true">↑</span>
      </button>
    </>
  );
}
