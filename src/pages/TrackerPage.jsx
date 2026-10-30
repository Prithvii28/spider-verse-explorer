import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import characters from '../data/characters.json';
import sampleSightings from '../data/sightings.json';
import '../styles/tracker.css';

const places = {
  'New York': { country: 'United States', latitude: 40.7128, longitude: -74.006, x: 29.4428, y: 37.6 },
  Brooklyn: { country: 'United States', latitude: 40.6782, longitude: -73.9442, x: 29.4599, y: 37.61 },
  'Mexico City': { country: 'Mexico', latitude: 19.4326, longitude: -99.1332, x: 22.463, y: 44.5 },
  London: { country: 'United Kingdom', latitude: 51.5072, longitude: -0.1276, x: 49.9646, y: 33.25 },
  Mumbai: { country: 'India', latitude: 19.076, longitude: 72.8777, x: 70.2438, y: 44.6 },
  Nairobi: { country: 'Kenya', latitude: -1.2921, longitude: 36.8219, x: 60.2283, y: 50.36 },
  Tokyo: { country: 'Japan', latitude: 35.6762, longitude: 139.6503, x: 88.7918, y: 39.37 },
  Sydney: { country: 'Australia', latitude: -33.8688, longitude: 151.2093, x: 92.0026, y: 60.01 },
};

function formatCoordinate(value, positiveDirection, negativeDirection) {
  let degrees = Math.floor(Math.abs(value));
  const fractionalMinutes = (Math.abs(value) - degrees) * 60;
  let minutes = Math.floor(fractionalMinutes);
  let seconds = Math.round((fractionalMinutes - minutes) * 60);
  if (seconds === 60) { seconds = 0; minutes += 1; }
  if (minutes === 60) { minutes = 0; degrees += 1; }
  const direction = value >= 0 ? positiveDirection : negativeDirection;
  return `${degrees}° ${String(minutes).padStart(2, '0')}′ ${String(seconds).padStart(2, '0')}″ ${direction}`;
}

function formatSightingCoordinates(sighting) {
  if (!Number.isFinite(sighting?.latitude) || !Number.isFinite(sighting?.longitude)) return 'COORDINATES UNAVAILABLE';
  return `${formatCoordinate(sighting.latitude, 'N', 'S')}  ${formatCoordinate(sighting.longitude, 'E', 'W')}`;
}

function loadLocalReports() {
  try {
    const saved = JSON.parse(window.localStorage.getItem('spider-verse-tracker-reports') || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export default function TrackerPage() {
  const [localReports, setLocalReports] = useState(loadLocalReports);
  const [filter, setFilter] = useState('all');
  const [activePanel, setActivePanel] = useState('activity');
  const [selectedId, setSelectedId] = useState(sampleSightings[0].id);
  const [zoom, setZoom] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const sightings = useMemo(() => [...localReports, ...sampleSightings], [localReports]);
  const visibleSightings = useMemo(
    () => sightings.filter((sighting) => filter === 'all' || sighting.status === filter),
    [sightings, filter]
  );
  const selectedSighting = selectedId
    ? visibleSightings.find((sighting) => sighting.id === selectedId) || visibleSightings[0]
    : null;

  const handleReport = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const city = formData.get('city');
    const place = places[city];
    if (!place) return;

    const report = {
      id: `local-${Date.now()}`,
      city,
      country: place.country,
      latitude: place.latitude,
      longitude: place.longitude,
      characterSlug: formData.get('character'),
      status: 'rumored',
      time: 'Just now',
      note: String(formData.get('note') || '').trim(),
      x: place.x,
      y: place.y,
      isLocal: true,
    };

    const nextReports = [report, ...localReports];
    setLocalReports(nextReports);
    try {
      window.localStorage.setItem('spider-verse-tracker-reports', JSON.stringify(nextReports));
    } catch {
      // The report still appears for the current session when storage is unavailable.
    }
    setSelectedId(report.id);
    setFilter('all');
    setSubmitted(true);
    setActivePanel('activity');
    event.currentTarget.reset();
    window.setTimeout(() => setSubmitted(false), 4500);
  };

  const selectSighting = (sighting) => {
    setSelectedId(sighting.id);
    setActivePanel('activity');
  };

  return (
    <div className="tracker-page">
      <header className="tracker-heading container">
        <div className="tracker-heading-copy">
          <span className="tracker-eyebrow"><i aria-hidden="true" /> MULTIVERSE SIGNAL NETWORK</span>
          <h1>THE WEB TRACKER</h1>
          <p>Follow sample sightings, explore the global map, and add your own local report.</p>
        </div>
        <div className="tracker-heading-status" aria-label="Demo mode is active">
          <span className="tracker-status-dot" /> DEMO MODE
        </div>
      </header>

      <section className="tracker-shell container" aria-label="Interactive tracker tools">
        <div className="tracker-toolbar">
          <div className="tracker-toolbar-title">
            <span className="tracker-live-mark" /> GLOBAL SIGNAL MAP
            <span className="tracker-record-count">{sightings.length.toString().padStart(2, '0')} SIGNALS</span>
          </div>
          <div className="tracker-filter-group" role="group" aria-label="Filter map signals">
            {[
              ['all', 'All signals'],
              ['confirmed', 'Confirmed'],
              ['rumored', 'Unconfirmed'],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                className={`tracker-filter${filter === value ? ' active' : ''}`}
                aria-pressed={filter === value}
                onClick={() => {
                  setFilter(value);
                  const firstMatch = sightings.find((sighting) => value === 'all' || sighting.status === value);
                  setSelectedId(firstMatch?.id || '');
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <button type="button" className="tracker-report-button" onClick={() => setActivePanel('report')}>
            <span aria-hidden="true">＋</span> Report a sighting
          </button>
        </div>

        <div className="tracker-layout">
          <section className="tracker-map-panel" aria-label="Interactive demo sightings map">
            <div className="tracker-map-frame">
              <div className="tracker-map-topline">
                <span>WORLDWIDE / EARTH-616</span>
                <span className="tracker-map-coordinates">{selectedSighting ? formatSightingCoordinates(selectedSighting) : 'SELECT A SIGNAL'}</span>
              </div>
              <div className="tracker-map-stage">
                <div className="tracker-map-world" style={{ transform: `scale(${zoom})` }}>
                  <img className="tracker-land-art" src="/maps/world-map.svg" alt="" aria-hidden="true" />
                  <svg className="tracker-world-svg" viewBox="0 0 1000 500" role="img" aria-label="Interactive world map with demo sighting locations">
                    <g className="tracker-map-grid">
                      <path d="M0 100H1000M0 200H1000M0 300H1000M0 400H1000M200 0V500M400 0V500M600 0V500M800 0V500" />
                    </g>
                    <g className="tracker-map-graticule">
                      <ellipse cx="500" cy="250" rx="460" ry="230" />
                      <ellipse cx="500" cy="250" rx="300" ry="230" />
                      <path d="M40 250H960M500 20V480" />
                    </g>
                    <g className="tracker-map-labels" aria-hidden="true">
                      <text x="190" y="195">NORTH AMERICA</text>
                      <text x="315" y="330">SOUTH AMERICA</text>
                      <text x="525" y="300">AFRICA</text>
                      <text x="745" y="205">ASIA</text>
                      <text x="825" y="405">OCEANIA</text>
                      <text x="505" y="175">EUROPE</text>
                    </g>
                  </svg>

                  {visibleSightings.map((sighting) => {
                    const character = characters.find((item) => item.slug === sighting.characterSlug);
                    if (!character) return null;
                    const active = selectedId === sighting.id;
                    return (
                      <button
                        type="button"
                        key={sighting.id}
                        className={`tracker-pin ${sighting.status}${active ? ' selected' : ''}`}
                        style={{ left: `${sighting.x}%`, top: `${sighting.y}%`, '--pin-accent': character.accentColor }}
                        onClick={() => selectSighting(sighting)}
                        aria-label={`${sighting.status === 'confirmed' ? 'Demo confirmed' : 'Demo unconfirmed'} sighting: ${character.alias} in ${sighting.city}`}
                        title={`${character.alias} · ${sighting.city}`}
                      >
                        <svg viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges">
                          <path className="tracker-spider-legs" d="M12 12 8 8 4 9 2 6M11 16 6 14 2 16M11 20 6 22 2 20M13 23 9 27 5 27M20 12 24 8 28 9 30 6M21 16 26 14 30 16M21 20 26 22 30 20M19 23 23 27 27 27" />
                          <path className="tracker-spider-body" d="M14 7h4v3h3v4h2v7h-3v4h-8v-4H9v-7h2v-4h3z" />
                          <path className="tracker-spider-eyes" d="M14 11h1v1h-1zm3 0h1v1h-1z" />
                        </svg>
                      </button>
                    );
                  })}
                </div>

                <div className="tracker-map-controls" aria-label="Map zoom controls">
                  <button type="button" onClick={() => setZoom((value) => Math.min(1.45, value + 0.12))} aria-label="Zoom in">＋</button>
                  <button type="button" onClick={() => setZoom((value) => Math.max(0.82, value - 0.12))} aria-label="Zoom out">−</button>
                  <button type="button" onClick={() => setZoom(1)} aria-label="Reset map zoom">⌂</button>
                </div>

                {selectedSighting && (() => {
                  const character = characters.find((item) => item.slug === selectedSighting.characterSlug);
                  return character ? (
                    <div className="tracker-map-callout" role="status">
                      <span className={`tracker-callout-status ${selectedSighting.status}`} />
                      <div>
                        <strong>{character.alias}</strong>
                        <span>{selectedSighting.city} · {selectedSighting.country}</span>
                      </div>
                      <button type="button" aria-label="Dismiss map detail" onClick={() => setSelectedId('')}>×</button>
                    </div>
                  ) : null;
                })()}

                <div className="tracker-map-scale" aria-hidden="true"><span /> 1,000 KM</div>
              </div>
              <div className="tracker-map-legend">
                <span><i className="legend-confirmed" /> Confirmed sample</span>
                <span><i className="legend-rumored" /> Unconfirmed sample</span>
                <span className="tracker-demo-note">All map entries are fictional demo data.</span>
              </div>
            </div>
          </section>

          <aside className="tracker-side-panel" aria-label="Tracker activity and report form">
            <div className="tracker-panel-tabs" role="tablist" aria-label="Tracker tools">
              <button type="button" role="tab" aria-selected={activePanel === 'activity'} className={activePanel === 'activity' ? 'active' : ''} onClick={() => setActivePanel('activity')}>
                Activity <span>{visibleSightings.length.toString().padStart(2, '0')}</span>
              </button>
              <button type="button" role="tab" aria-selected={activePanel === 'report'} className={activePanel === 'report' ? 'active' : ''} onClick={() => setActivePanel('report')}>
                Report
              </button>
            </div>

            {activePanel === 'activity' ? (
              <div className="tracker-activity-panel" role="tabpanel">
                {selectedSighting && (() => {
                  const character = characters.find((item) => item.slug === selectedSighting.characterSlug);
                  return character ? (
                    <article className="tracker-selected-card" style={{ '--pin-accent': character.accentColor }}>
                      <div className="tracker-selected-topline">
                        <span className={`tracker-sighting-tag ${selectedSighting.status}`}>{selectedSighting.status === 'confirmed' ? 'CONFIRMED · DEMO' : 'UNCONFIRMED · DEMO'}</span>
                        <span>{selectedSighting.time}</span>
                      </div>
                      <h2>{character.alias}</h2>
                      <p className="tracker-selected-location">{selectedSighting.city}, {selectedSighting.country}</p>
                      <p className="tracker-selected-note">“{selectedSighting.note}”</p>
                      <Link to={`/characters/${character.slug}`} className="tracker-character-link">Open hero profile <span aria-hidden="true">↗</span></Link>
                    </article>
                  ) : null;
                })()}
                <div className="tracker-activity-heading">
                  <h2>Recent signals</h2>
                  <span>LOCAL DEMO FEED</span>
                </div>
                <div className="tracker-sighting-list">
                  {visibleSightings.map((sighting) => {
                    const character = characters.find((item) => item.slug === sighting.characterSlug);
                    if (!character) return null;
                    return (
                      <button type="button" key={sighting.id} className={`tracker-feed-item${selectedId === sighting.id ? ' active' : ''}`} onClick={() => selectSighting(sighting)}>
                        <span className={`tracker-feed-indicator ${sighting.status}`} />
                        <span className="tracker-feed-copy"><strong>{character.alias}</strong><small>{sighting.city}, {sighting.country}</small></span>
                        <span className="tracker-feed-time">{sighting.time}</span>
                      </button>
                    );
                  })}
                  {visibleSightings.length === 0 && <p className="tracker-no-results">No signals match this filter.</p>}
                </div>
              </div>
            ) : (
              <div className="tracker-report-panel" role="tabpanel">
                <span className="tracker-form-kicker">ADD TO YOUR LOCAL MAP</span>
                <h2>Report a sighting</h2>
                <p>Reports stay in this browser only and appear as unconfirmed sample signals.</p>
                <form onSubmit={handleReport}>
                  <label htmlFor="tracker-city">Location</label>
                  <select id="tracker-city" name="city" defaultValue="New York" required>
                    {Object.entries(places).map(([city, place]) => <option key={city} value={city}>{city}, {place.country}</option>)}
                  </select>
                  <label htmlFor="tracker-character">Spider-Person</label>
                  <select id="tracker-character" name="character" defaultValue={characters[0].slug} required>
                    {characters.map((character) => <option key={character.id} value={character.slug}>{character.alias} — {character.name}</option>)}
                  </select>
                  <label htmlFor="tracker-note">What did you notice?</label>
                  <textarea id="tracker-note" name="note" rows="3" maxLength="180" placeholder="Describe the demo sighting…" required />
                  <button className="tracker-submit-button" type="submit">Save local report <span aria-hidden="true">↗</span></button>
                  {submitted && <p className="tracker-success" role="status">Report added to your local map.</p>}
                </form>
                <p className="tracker-storage-note">No account or server is used. Clearing browser storage removes local reports.</p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
