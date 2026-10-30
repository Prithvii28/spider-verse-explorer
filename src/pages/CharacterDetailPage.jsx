import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import charactersData from '../data/characters.json';
import Breadcrumb from '../components/Breadcrumb';
import MultiverseJumpOverlay from '../components/MultiverseJumpOverlay';
import useReducedMotion from '../hooks/useReducedMotion';
import '../styles/character-detail.css';

export default function CharacterDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const [jumpActive, setJumpActive] = useState(false);
  const [jumpSlug, setJumpSlug] = useState('');

  // Find character index and record
  const characterIndex = charactersData.findIndex((c) => c.slug === slug);
  const character = characterIndex !== -1 ? charactersData[characterIndex] : null;

  // Previous and Next characters
  const prevCharacter = characterIndex > 0 ? charactersData[characterIndex - 1] : charactersData[charactersData.length - 1];
  const nextCharacter = characterIndex < charactersData.length - 1 ? charactersData[characterIndex + 1] : charactersData[0];

  const [imgSrc, setImgSrc] = useState(character ? character.portrait : '');

  useEffect(() => {
    if (character) {
      setImgSrc(character.portrait);
      window.scrollTo(0, 0);
    }
  }, [slug, character]);

  const handleImageError = () => {
    setImgSrc('/portraits/fallback-portrait.svg');
  };

  const handleNavigateWithJump = (targetSlug) => {
    if (prefersReducedMotion) {
      navigate(`/characters/${targetSlug}`);
      return;
    }
    setJumpSlug(targetSlug);
    setJumpActive(true);
    setTimeout(() => {
      setJumpActive(false);
      navigate(`/characters/${targetSlug}`);
    }, 280);
  };

  // If slug is unknown, render helpful not-found state
  if (!character) {
    return (
      <div className="container detail-not-found-container">
        <div className="empty-state-card" role="alert">
          <div className="empty-state-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
              <polygon points="32,8 56,52 8,52" stroke="#c51b29" strokeWidth="2.5" />
              <line x1="32" y1="24" x2="32" y2="38" stroke="#f7f4ea" strokeWidth="3" strokeLinecap="round" />
              <circle cx="32" cy="45" r="2.5" fill="#f7f4ea" />
            </svg>
          </div>
          <h1 className="empty-state-title">Unknown Continuum Sector</h1>
          <p className="empty-state-desc">
            No record found for character slug "<strong>{slug}</strong>" in the local multiversal archive.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/gallery" className="btn btn-primary">
              Return to Gallery
            </Link>
            <Link to="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const theme = character.theme;
  const themeStyle = {
    '--char-accent': character.accentColor,
    '--universe-font-display': theme.fonts.display,
    '--universe-font-body': theme.fonts.body,
    '--universe-font-mono': theme.fonts.mono,
    '--universe-easing': theme.easing,
    '--universe-filter': theme.filterId === 'none' ? 'none' : `url(#${theme.filterId})`,
    ...theme.variables,
  };

  return (
    <div
      className="character-detail-view"
      data-universe={character.universe}
      data-theme={theme.id}
      data-filter-id={theme.filterId}
      style={themeStyle}
    >
      <MultiverseJumpOverlay isActive={jumpActive} targetSlug={jumpSlug} />

      <svg className="detail-filter-defs" aria-hidden="true" focusable="false">
        <defs>
          {theme.filterId === 'noir-film-grain' && (
            <filter id="noir-film-grain" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" seed="2" result="grain">
                {!prefersReducedMotion && (
                  <animate attributeName="seed" values="2;8;4;11;3;9;2" dur="560ms" repeatCount="indefinite" />
                )}
              </feTurbulence>
              <feColorMatrix in="grain" type="saturate" values="0" result="mono-grain" />
              <feComponentTransfer in="mono-grain" result="soft-grain">
                <feFuncA type="table" tableValues="0 0.12" />
              </feComponentTransfer>
              <feBlend in="SourceGraphic" in2="soft-grain" mode="multiply" />
            </filter>
          )}
          {theme.filterId === 'peni-cel-shade' && (
            <filter id="peni-cel-shade" colorInterpolationFilters="sRGB">
              <feComponentTransfer>
                <feFuncR type="discrete" tableValues="0 0.34 0.68 1" />
                <feFuncG type="discrete" tableValues="0 0.38 0.72 1" />
                <feFuncB type="discrete" tableValues="0 0.42 0.78 1" />
              </feComponentTransfer>
            </filter>
          )}
          {theme.filterId === 'ham-ink-outline' && (
            <filter id="ham-ink-outline" x="-5%" y="-5%" width="110%" height="110%">
              <feMorphology in="SourceAlpha" operator="dilate" radius="1.5" result="expanded-alpha" />
              <feFlood floodColor="#111015" result="ink" />
              <feComposite in="ink" in2="expanded-alpha" operator="in" result="outline" />
              <feComposite in="SourceGraphic" in2="outline" operator="over" />
            </filter>
          )}
          {theme.filterId === 'miles-halftone' && (
            <filter id="miles-halftone" colorInterpolationFilters="sRGB">
              <feComponentTransfer>
                <feFuncR type="linear" slope="1.08" intercept="-0.015" />
                <feFuncG type="linear" slope="1.04" intercept="0" />
                <feFuncB type="linear" slope="1.1" intercept="0.015" />
              </feComponentTransfer>
            </filter>
          )}
          {theme.filterId === 'miguel-hud' && (
            <filter id="miguel-hud" colorInterpolationFilters="sRGB">
              <feColorMatrix type="matrix" values="0.92 0 0 0 0  0 1 0 0 0.025  0 0 1.08 0 0.06  0 0 0 1 0" />
            </filter>
          )}
          {theme.filterId === 'punk-print' && (
            <filter id="punk-print" colorInterpolationFilters="sRGB">
              <feComponentTransfer>
                <feFuncR type="linear" slope="1.1" intercept="-0.02" />
                <feFuncG type="linear" slope="1.08" intercept="-0.015" />
                <feFuncB type="linear" slope="1.12" intercept="-0.025" />
              </feComponentTransfer>
            </filter>
          )}
        </defs>
      </svg>

      <div className="container">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Archive Home', to: '/' },
            { label: 'Hero Gallery', to: '/gallery' },
            { label: `${character.name} (${character.universe})`, to: `/characters/${character.slug}` },
          ]}
        />

        {/* Back Link */}
        <div className="detail-back-bar">
          <Link to="/gallery" className="back-link">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Back to Roster Gallery</span>
          </Link>
        </div>

        {/* Main Dossier Grid */}
        <div className="detail-dossier-grid">
          {/* Left Column: Big Portrait Artwork & Visual Metadata */}
          <div className="detail-portrait-col">
            <div className={`detail-image-card${theme.id === 'ham' ? ' ham-bounce-card' : ' on-twos'}`}>
              <img
                src={imgSrc}
                alt={character.alt}
                className="detail-large-portrait"
                onError={handleImageError}
              />
              <div className="detail-universe-art" aria-hidden="true" />
              <div className="detail-portrait-overlay" aria-hidden="true" />
              <div className="detail-portrait-badge-row">
                <span className="universe-badge">{character.universe}</span>
                <span className="detail-dimension-tag">{character.dimensionType}</span>
              </div>
            </div>

            {/* Quick Continuity Specs Box */}
            <div className="specs-card">
              <h3 className="specs-card-title">Continuity Classification</h3>
              <dl className="specs-dl">
                <div className="specs-row">
                  <dt>Hero Alias:</dt>
                  <dd>{character.alias}</dd>
                </div>
                <div className="specs-row">
                  <dt>Civilian Identity:</dt>
                  <dd>{character.name}</dd>
                </div>
                <div className="specs-row">
                  <dt>First Appearance:</dt>
                  <dd>{character.firstAppearance}</dd>
                </div>
                <div className="specs-row">
                  <dt>Continuum Status:</dt>
                  <dd className="status-highlight">{character.status}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Column: Narrative Dossier & Powers */}
          <div className="detail-content-col">
            <div className="detail-header-block">
              <span className="detail-alias-kicker">{character.alias}</span>
              <h1 className={`detail-hero-name${['miles', 'miguel', 'punk'].includes(theme.id) ? ' on-twos' : ''}`}>{character.name}</h1>
              <p className="detail-tagline-quote">"{character.tagline}"</p>
            </div>

            <div className="detail-section-block">
              <h2 className="detail-block-heading">Dimensional Biography</h2>
              <p className="detail-bio-paragraph">{character.biography}</p>
            </div>

            {/* Powers and Tactical Abilities */}
            <div className="detail-section-block">
              <h2 className="detail-block-heading">Tactical Powers &amp; Capabilities</h2>
              <ul className="powers-list-grid">
                {character.powers.map((power, idx) => (
                  <li key={idx} className="power-item-card">
                    <span className="power-item-bullet" aria-hidden="true">✦</span>
                    <span className="power-item-text">{power}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fictional Suit & Tech Notes */}
            {character.suitNotes && (
              <div className="detail-section-block">
                <h2 className="detail-block-heading">Fictional Suit &amp; Equipment Notes</h2>
                <div className="suit-notes-card">
                  <p className="suit-notes-text">{character.suitNotes}</p>
                  <span className="suit-notes-disclaimer">
                    * Brief fictional character description compiled for educational reference.
                  </span>
                </div>
              </div>
            )}

            {/* Previous / Next Character Jump Navigation */}
            <nav className="detail-jump-nav" aria-label="Adjacent characters navigation">
              <button
                type="button"
                className="jump-nav-btn prev-btn"
                onClick={() => handleNavigateWithJump(prevCharacter.slug)}
              >
                <span className="jump-nav-dir">← Previous</span>
                <span className="jump-nav-name">{prevCharacter.name}</span>
                <span className="jump-nav-universe">{prevCharacter.universe}</span>
              </button>

              <button
                type="button"
                className="jump-nav-btn next-btn"
                onClick={() => handleNavigateWithJump(nextCharacter.slug)}
              >
                <span className="jump-nav-dir">Next →</span>
                <span className="jump-nav-name">{nextCharacter.name}</span>
                <span className="jump-nav-universe">{nextCharacter.universe}</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
