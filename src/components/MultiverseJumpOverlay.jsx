import React from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

export default function MultiverseJumpOverlay({ isActive, targetSlug }) {
  const prefersReducedMotion = useReducedMotion();
  if (!isActive || prefersReducedMotion) return null;

  return (
    <div 
      className="multiverse-jump-overlay"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(10, 11, 14, 0.75)',
        backdropFilter: 'blur(8px)',
        animation: 'riftFlash 320ms ease-out forwards',
      }}
    >
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.8rem',
        }}
      >
        <svg viewBox="0 0 100 100" width="80" height="80" fill="none">
          <circle cx="50" cy="50" r="44" stroke="#c51b29" strokeWidth="3" strokeDasharray="4 4">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
          <polygon points="50,15 78,35 78,65 50,85 22,65 22,35" stroke="#e63946" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="6" fill="#e63946" />
        </svg>
        <span 
          style={{
            fontFamily: "'Bebas Neue', Impact, sans-serif",
            fontSize: '1.4rem',
            letterSpacing: '0.12em',
            color: '#f7f4ea',
            textTransform: 'uppercase',
          }}
        >
          INITIATING MULTIVERSE JUMP...
        </span>
      </div>
      <style>{`
        @keyframes riftFlash {
          0% { opacity: 0; transform: scale(0.96); }
          50% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 0.9; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
