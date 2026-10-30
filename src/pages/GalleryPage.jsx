import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import charactersData from '../data/characters.json';
import CharacterCard from '../components/CharacterCard';
import MultiverseJumpOverlay from '../components/MultiverseJumpOverlay';
import ScrollReveal from '../components/ScrollReveal';
import useReducedMotion from '../hooks/useReducedMotion';
import '../styles/gallery.css';

export default function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  // Read universe filter from URL query string
  const selectedUniverse = searchParams.get('universe') || 'ALL';
  const currentSearch = searchParams.get('q') || '';
  const currentSort = searchParams.get('sort') || 'name-asc';

  const [jumpActive, setJumpActive] = useState(false);
  const [jumpSlug, setJumpSlug] = useState('');

  // Extract unique universe list from charactersData
  const universeList = useMemo(() => {
    const list = Array.from(new Set(charactersData.map((c) => c.universe)));
    return ['ALL', ...list];
  }, []);

  // Update query params helper
  const updateQueryParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'ALL' || (key === 'sort' && value === 'name-asc')) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleSearchChange = (e) => {
    updateQueryParam('q', e.target.value);
  };

  const handleUniverseChange = (universe) => {
    updateQueryParam('universe', universe);
  };

  const handleSortChange = (e) => {
    updateQueryParam('sort', e.target.value);
  };

  const resetAllFilters = () => {
    setSearchParams({});
  };

  // Multiverse jump transition
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

  // Filter and sort characters
  const filteredCharacters = useMemo(() => {
    return charactersData
      .filter((char) => {
        // Universe filter
        if (selectedUniverse !== 'ALL' && char.universe !== selectedUniverse) {
          return false;
        }

        // Search match: name, alias, universe, powers
        if (currentSearch.trim()) {
          const query = currentSearch.toLowerCase().trim();
          const matchesName = char.name.toLowerCase().includes(query);
          const matchesAlias = char.alias.toLowerCase().includes(query);
          const matchesUniverse = char.universe.toLowerCase().includes(query);
          const matchesPowers = char.powers.some((power) =>
            power.toLowerCase().includes(query)
          );

          if (!matchesName && !matchesAlias && !matchesUniverse && !matchesPowers) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (currentSort === 'name-asc') {
          return a.name.localeCompare(b.name);
        }
        if (currentSort === 'name-desc') {
          return b.name.localeCompare(a.name);
        }
        if (currentSort === 'alias-asc') {
          return a.alias.localeCompare(b.alias);
        }
        if (currentSort === 'universe-asc') {
          return a.universe.localeCompare(b.universe);
        }
        return 0;
      });
  }, [selectedUniverse, currentSearch, currentSort]);

  return (
    <div className="gallery-page-view">
      <MultiverseJumpOverlay isActive={jumpActive} targetSlug={jumpSlug} />

      <section className="gallery-header-section" aria-labelledby="gallery-main-title">
        <div className="container">
          <div className="gallery-title-wrapper">
            <span className="section-eyebrow">Multiversal Continuum Directory</span>
            <h1 id="gallery-main-title" className="gallery-headline">
              SPIDER-VERSE HERO ROSTER
            </h1>
            <p className="gallery-lead">
              Browse a locally stored collection of Spider-People from different realities. Search by name or powers, narrow the roster by universe, and open a profile to learn more.
            </p>
          </div>

          {/* Search and Filters Toolbar */}
          <div className="gallery-toolbar" role="region" aria-label="Roster search and filters">
            <div className="search-input-wrapper">
              <label htmlFor="gallery-search-input" className="sr-only">
                Search Spider-People by name, alias, universe, or powers
              </label>
              <svg 
                className="search-icon" 
                viewBox="0 0 24 24" 
                width="18" 
                height="18" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                id="gallery-search-input"
                type="search"
                className="gallery-search-input"
                placeholder="Search name, alias, universe, or power..."
                value={currentSearch}
                onChange={handleSearchChange}
                aria-label="Search roster"
              />
              {currentSearch && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => updateQueryParam('q', '')}
                  aria-label="Clear search input"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="sort-wrapper">
              <label htmlFor="gallery-sort-select" className="sort-label">
                Sort:
              </label>
              <select
                id="gallery-sort-select"
                className="gallery-sort-select"
                value={currentSort}
                onChange={handleSortChange}
                aria-label="Sort characters by"
              >
                <option value="name-asc">Name (A – Z)</option>
                <option value="name-desc">Name (Z – A)</option>
                <option value="alias-asc">Alias (A – Z)</option>
                <option value="universe-asc">Universe Designation</option>
              </select>
            </div>
          </div>

          {/* Universe Filter Chips */}
          <div className="universe-filter-row" role="group" aria-label="Filter by universe">
            <span className="universe-filter-label">Dimension:</span>
            <div className="universe-chips-scroller">
              {universeList.map((uni) => {
                const isSelected = selectedUniverse === uni;
                return (
                  <button
                    key={uni}
                    type="button"
                    className={`universe-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => handleUniverseChange(uni)}
                    aria-pressed={isSelected}
                  >
                    {uni === 'ALL' ? 'All Universes' : uni}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="results-summary-bar">
            <span className="results-count" aria-live="polite">
              Showing <strong>{filteredCharacters.length}</strong> of {charactersData.length} indexed Spider-People
            </span>

            {(selectedUniverse !== 'ALL' || currentSearch.trim() || currentSort !== 'name-asc') && (
              <button
                type="button"
                className="btn-reset-filters"
                onClick={resetAllFilters}
                aria-label="Reset all search and filter controls"
              >
                Reset All Filters ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Roster Cards Grid / Empty State */}
      <section className="gallery-grid-section" aria-label="Character roster grid">
        <div className="container">
          <h2 className="sr-only">Spider-People roster</h2>
          {filteredCharacters.length > 0 ? (
            <ScrollReveal className="cards-grid">
              {filteredCharacters.map((char) => (
                <CharacterCard
                  key={char.id}
                  character={char}
                  onNavigateWithJump={handleNavigateWithJump}
                />
              ))}
            </ScrollReveal>
          ) : (
            <div className="empty-state-card" role="alert">
              <div className="empty-state-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
                  <circle cx="32" cy="32" r="28" stroke="#3e445b" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M22 22 L42 42 M42 22 L22 42" stroke="#c51b29" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="empty-state-title">No Spider-People Located</h2>
              <p className="empty-state-desc">
                No hero records matched your query "{currentSearch}" {selectedUniverse !== 'ALL' ? `in ${selectedUniverse}` : ''}. Check your spelling or reset the dimensional filters.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={resetAllFilters}
              >
                Reset Multiverse Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
