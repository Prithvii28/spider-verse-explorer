import React, { useEffect, useRef, useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

export default function ScrollReveal({ as: Element = 'div', children, className = '', delay = 0, ...props }) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = elementRef.current;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }
    if (!element || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <Element
      ref={elementRef}
      className={`scroll-reveal${isVisible || prefersReducedMotion ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      {...props}
      style={{ '--reveal-delay': `${delay}ms`, ...props.style }}
    >
      {children}
    </Element>
  );
}
