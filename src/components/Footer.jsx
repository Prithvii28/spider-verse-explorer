import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
  const scrollToTop = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-container">
        <div className="footer-top">
          {/* Brand & Mission */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <span className="brand-title">SPIDER-VERSE</span>
              <span className="brand-subtitle">EXPLORER</span>
            </div>
            <p className="footer-desc">
              An educational, interactive frontend exploration of parallel dimensional arachnid heroes across alternate continuities.
            </p>
            <div className="footer-meta-pill">
              <span className="pulse-dot"></span>
              <span>10 Spider-People · 9 Universes</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-nav-col">
            <h2 className="footer-col-title">Navigation</h2>
            <ul className="footer-links-list">
              <li><Link to="/">Home Archive</Link></li>
              <li><Link to="/gallery">Full Character Gallery</Link></li>
              <li><Link to="/#how-it-works">How It Works</Link></li>
              <li><button type="button" onClick={scrollToTop} className="footer-text-btn">Back to Top ↑</button></li>
            </ul>
          </div>

          {/* Key Dimensions */}
          <div className="footer-nav-col">
            <h2 className="footer-col-title">Dimensional Anchors</h2>
            <ul className="footer-links-list">
              <li><Link to="/gallery?universe=Earth-616">Earth-616 (Prime)</Link></li>
              <li><Link to="/gallery?universe=Earth-1610">Earth-1610 (Miles Morales)</Link></li>
              <li><Link to="/gallery?universe=Earth-65">Earth-65 (Ghost-Spider)</Link></li>
              <li><Link to="/gallery?universe=Earth-928">Earth-928 (Nueva York 2099)</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
