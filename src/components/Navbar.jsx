import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="navbar-header" role="banner">
      <div className="container navbar-container">
        {/* Custom Original Wordmark */}
        <Link to="/" className="navbar-brand">
          <span className="brand-rift-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
              <polygon points="16,3 28,10 28,22 16,29 4,22 4,10" stroke="#c51b29" strokeWidth="2" fill="#14151e" />
              <polygon points="16,8 23,12 23,20 16,24 9,20 9,12" stroke="#e63946" strokeWidth="1.5" fill="none" />
              <circle cx="16" cy="16" r="3" fill="#e63946" />
              <line x1="16" y1="3" x2="16" y2="29" stroke="#f7f4ea" strokeWidth="1.2" strokeDasharray="2 2" />
              <line x1="4" y1="16" x2="28" y2="16" stroke="#f7f4ea" strokeWidth="1.2" strokeDasharray="2 2" />
            </svg>
          </span>
          <div className="brand-text-group">
            <span className="brand-title">SPIDER-VERSE</span>
            <span className="brand-subtitle">EXPLORER</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            <li>
              <NavLink 
                to="/" 
                end 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/gallery" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tracker"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Tracker
              </NavLink>
            </li>
            <li>
              <Link to="/gallery" className="btn btn-primary nav-cta">
                Browse Roster
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div 
        id="mobile-nav-menu" 
        className={`mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer-inner">
          <nav aria-label="Mobile Navigation">
            <ul className="mobile-nav-list">
              <li>
                <NavLink 
                  to="/" 
                  end 
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/gallery" 
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                >
                  Gallery Roster
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tracker"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                >
                  Web Tracker
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="mobile-drawer-footer">
            <Link 
              to="/gallery" 
              className="btn btn-primary mobile-full-btn"
              onClick={() => setMobileMenuOpen(false)}
              tabIndex={mobileMenuOpen ? 0 : -1}
            >
              Explore All 10 Spider-People
            </Link>
            <p className="mobile-drawer-tagline">
              Multiverse Dimensional Archive
            </p>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div 
          className="mobile-backdrop" 
          onClick={() => setMobileMenuOpen(false)} 
          aria-hidden="true" 
        />
      )}
    </header>
  );
}
