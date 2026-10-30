import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container" style={{ padding: '6rem 1.25rem', textAlign: 'center' }}>
      <div 
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-active)',
          borderRadius: '8px',
          padding: '3.5rem 2rem',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <span 
            style={{
              fontFamily: "var(--font-display)",
              fontSize: '6.5rem',
              color: 'var(--crimson-bright)',
              lineHeight: 1,
              letterSpacing: '0.08em',
              textShadow: '0 0 30px var(--crimson-glow)',
              display: 'block',
            }}
          >
            404
          </span>
          <span 
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: '0.85rem',
              letterSpacing: '0.2em',
              color: 'var(--silver-accent)',
              textTransform: 'uppercase',
            }}
          >
            DIMENSIONAL GLITCH DETECTED
          </span>
        </div>

        <h1 
          style={{
            fontSize: '2rem',
            marginBottom: '1rem',
            color: 'var(--text-main)',
          }}
        >
          Lost in the Multiverse
        </h1>

        <p 
          style={{
            color: 'var(--text-muted)',
            fontSize: '1rem',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
          }}
        >
          The coordinate reality you are attempting to reach does not exist in this continuum or has been relocated by temporal stabilizers.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/gallery" className="btn btn-primary">
            Explore Gallery Roster
          </Link>
          <Link to="/" className="btn btn-secondary">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
