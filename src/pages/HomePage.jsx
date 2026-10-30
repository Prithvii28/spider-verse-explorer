import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import charactersData from '../data/characters.json';
import CharacterCard from '../components/CharacterCard';
import DimensionalRiftCanvas from '../components/DimensionalRiftCanvas';
import MultiverseJumpOverlay from '../components/MultiverseJumpOverlay';
import ScrollReveal from '../components/ScrollReveal';
import useReducedMotion from '../hooks/useReducedMotion';
import '../styles/home.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [jumpActive, setJumpActive] = useState(false);
  const [jumpSlug, setJumpSlug] = useState('');
  const prefersReducedMotion = useReducedMotion();

  // Featured 4 characters: Peter Parker, Miles Morales, Gwen Stacy, Miguel O'Hara
  const featuredSlugs = ['peter-parker', 'miles-morales', 'gwen-stacy', 'miguel-ohara'];
  const featuredCharacters = charactersData.filter(char => featuredSlugs.includes(char.slug));
  const universeCount = new Set(charactersData.map((character) => character.universe)).size;

  const handleNavigateWithJump = (slug) => {
    if (prefersReducedMotion) {
      navigate(`/characters/${slug}`);
      return;
    }
    setJumpSlug(slug);
    setJumpActive(true);
    setTimeout(() => {
      setJumpActive(false);
      navigate(`/characters/${slug}`);
    }, 280);
  };

  const jumpToRandomHero = () => {
    const character = charactersData[Math.floor(Math.random() * charactersData.length)];
    if (character) handleNavigateWithJump(character.slug);
  };

  const scrollToHowItWorks = (e) => {
    e.preventDefault();
    const section = document.getElementById('how-it-works');
    if (section) {
      section.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <div className="home-page-view">
      <MultiverseJumpOverlay isActive={jumpActive} targetSlug={jumpSlug} />

      {/* Cinematic Hero Section */}
      <section className="hero-section" aria-labelledby="hero-main-title">
        <DimensionalRiftCanvas />

        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge-row">
              <span className="hero-kicker">
                <span className="hero-kicker-pulse"></span>
                DIMENSIONAL ANCHOR INDEX // ACTIVE
              </span>
              <span className="universe-badge">{universeCount} UNIVERSES</span>
            </div>

            <h1 id="hero-main-title" className="hero-headline">
              ONE MULTIVERSE. <br />
              <span className="hero-headline-accent">INFINITE MASKS.</span>
            </h1>

            <p className="hero-description">
              Every universe has a hero behind the mask. Meet {charactersData.length} different Spider-People, discover what makes each one unique, and find your way through the multiverse.
            </p>

            <div className="hero-cta-group">
              <Link to="/gallery" className="btn btn-primary hero-btn-main">
                Explore the Roster
                <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <a 
                href="#how-it-works" 
                onClick={scrollToHowItWorks} 
                className="btn btn-secondary hero-btn-secondary"
              >
                How It Works ↓
              </a>
              <button type="button" className="btn btn-rift-surprise" onClick={jumpToRandomHero}>
                <span className="surprise-spark" aria-hidden="true">✦</span>
                Surprise me
              </button>
            </div>

            {/* Multiverse Metric Bar */}
            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <span className="hero-stat-number">{charactersData.length}</span>
                <span className="hero-stat-label">Heroes to discover</span>
              </div>
              <div className="hero-stat-divider" aria-hidden="true" />
              <div className="hero-stat-item">
                <span className="hero-stat-number">{universeCount}</span>
                <span className="hero-stat-label">Unique Universes</span>
              </div>
              <div className="hero-stat-divider" aria-hidden="true" />
              <div className="hero-stat-item">
                <span className="hero-stat-number">{charactersData.length}</span>
                <span className="hero-stat-label">Local portraits</span>
              </div>
            </div>
          </div>
          <div className="hero-roster-art" aria-hidden="true">
            <div className="hero-art-orbit hero-art-orbit-one" />
            <div className="hero-art-orbit hero-art-orbit-two" />
            <div className="hero-art-stamp">MULTIVERSE<br />ROSTER <span>• 01 / 10</span></div>
            {['miles-morales', 'gwen-stacy', 'peter-parker'].map((slug, index) => {
              const character = charactersData.find((item) => item.slug === slug);
              if (!character) return null;
              return (
                <div className={`hero-art-card hero-art-card-${index + 1}`} key={character.id} style={{ '--char-accent': character.accentColor }}>
                  <img src={character.portrait} alt="" />
                  <span>{character.alias}</span>
                  <strong>{character.name}</strong>
                </div>
              );
            })}
            <span className="hero-art-coordinate hero-art-coordinate-one">EARTH-1610</span>
            <span className="hero-art-coordinate hero-art-coordinate-two">EARTH-65</span>
          </div>
        </div>
      </section>

      {/* Featured Characters Roster */}
      <section className="featured-section" aria-labelledby="featured-section-title">
        <div className="container">
          <ScrollReveal className="section-header-row">
            <div>
              <span className="section-eyebrow">Priority Continuum Dossiers</span>
              <h2 id="featured-section-title" className="section-title">Featured Multiverse Anchors</h2>
              <p className="section-subtitle">
                Core guardians holding key temporal sectors across the dimensional web.
              </p>
            </div>
            <Link to="/gallery" className="btn btn-outline section-view-all">
              View All {charactersData.length} Heroes →
            </Link>
          </ScrollReveal>

          <ScrollReveal className="cards-grid" delay={90}>
            {featuredCharacters.map((char) => (
              <CharacterCard
                key={char.id}
                character={char}
                onNavigateWithJump={handleNavigateWithJump}
              />
            ))}
          </ScrollReveal>
        </div>
      </section>

      <hr className="comic-divider container" aria-hidden="true" />

      {/* How It Works & About The Explorer Section */}
      <section id="how-it-works" className="about-section" aria-labelledby="about-section-title">
        <div className="container">
          <ScrollReveal className="about-grid" delay={60}>
            <div className="about-info-col">
              <span className="section-eyebrow">Inside the Explorer</span>
              <h2 id="about-section-title" className="section-title">
                A universe of heroes to explore
              </h2>
              <p className="about-text">
                The Spider-Verse Explorer is an web application cataloging variant Spider-Heroes across different dimensions of the comic multiverse. It provides a structured, responsive interface to inspect continuity designations, tactical abilities, and origin trajectories.
              </p>

              <div className="about-features-list">
                <div className="about-feature-item">
                  <div className="feature-icon-box" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="feature-item-title">Cross-Field Search &amp; Filter</h3>
                    <p className="feature-item-desc">
                      Instantly query heroes by civil name, superhero alias, universe designation (e.g. Earth-616, Earth-1610), or specific combat abilities.
                    </p>
                  </div>
                </div>

                <div className="about-feature-item">
                  <div className="feature-icon-box" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="feature-item-title">Synchronized URL Deep-Linking</h3>
                    <p className="feature-item-desc">
                      Universe filters synchronize directly with browser search parameters (`?universe=Earth-65`), allowing shareable, persistent multiversal links.
                    </p>
                  </div>
                </div>

                <div className="about-feature-item">
                  <div className="feature-icon-box" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="feature-item-title">A distinct portrait for every hero</h3>
                    <p className="feature-item-desc">
                      Explore a collection of stylized local portraits, each with its own colors and visual identity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-cta-row">
                <Link to="/gallery" className="btn btn-primary">
                  Jump into Full Archive
                </Link>
              </div>
            </div>

          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
