import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-nav" style={{ marginBottom: '1.5rem' }}>
      <ol 
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          fontSize: '0.85rem',
          fontFamily: "var(--font-mono)",
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {index > 0 && (
                <span style={{ color: 'var(--text-dim)', userSelect: 'none' }} aria-hidden="true">
                  /
                </span>
              )}
              {isLast ? (
                <span 
                  aria-current="page" 
                  style={{ color: 'var(--crimson-bright)', fontWeight: 600 }}
                >
                  {item.label}
                </span>
              ) : (
                <Link 
                  to={item.to} 
                  style={{ 
                    color: 'var(--text-muted)', 
                    textDecoration: 'none',
                    transition: 'color var(--trans-fast)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
