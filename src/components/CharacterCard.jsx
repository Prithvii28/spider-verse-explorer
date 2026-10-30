import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/cards.css';

export default function CharacterCard({ character, onNavigateWithJump }) {
  const [imgSrc, setImgSrc] = useState(character.portrait);

  const handleImageError = () => {
    // Graceful fallback to local SVG fallback portrait
    setImgSrc('/portraits/fallback-portrait.svg');
  };

  const handleCardClick = (e) => {
    if (onNavigateWithJump) {
      e.preventDefault();
      onNavigateWithJump(character.slug);
    }
  };

  return (
    <article className="character-card" style={{ '--char-accent': character.accentColor }}>
      <div className="card-media-wrapper">
        <img
          src={imgSrc}
          alt={character.alt || `${character.name} as ${character.alias}`}
          className="card-portrait"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="card-media-overlay" aria-hidden="true" />
        <span className="card-universe-badge">
          {character.universe}
        </span>
      </div>

      <div className="card-body">
        <div className="card-header-titles">
          <span className="card-hero-alias">{character.alias}</span>
          <h3 className="card-character-name">{character.name}</h3>
        </div>

        <p className="card-tagline">
          {character.tagline}
        </p>

        {/* Powers preview tags */}
        <div className="card-powers-preview" aria-label="Key abilities">
          {character.powers.slice(0, 2).map((power, idx) => (
            <span key={idx} className="card-power-pill">
              {power}
            </span>
          ))}
          {character.powers.length > 2 && (
            <span className="card-power-pill-more">
              +{character.powers.length - 2} more
            </span>
          )}
        </div>

        <div className="card-footer-action">
          <Link
            to={`/characters/${character.slug}`}
            className="card-action-btn"
            onClick={handleCardClick}
            aria-label={`Examine dossier for ${character.name} (${character.alias}) from ${character.universe}`}
          >
            <span>Examine Dossier</span>
            <svg 
              className="card-arrow-icon" 
              viewBox="0 0 20 20" 
              width="16" 
              height="16" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
