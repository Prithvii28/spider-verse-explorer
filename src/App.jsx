import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollExperience from './components/ScrollExperience';

const HomePage = lazy(() => import('./pages/HomePage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const CharacterDetailPage = lazy(() => import('./pages/CharacterDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const TrackerPage = lazy(() => import('./pages/TrackerPage'));

// Helper component that scrolls to top on route change unless hash is present
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Navbar />
      <ScrollExperience />
      <Suspense fallback={(
        <main id="main-content" style={{ flexGrow: 1 }}>
          <div className="route-loading" role="status" aria-live="polite">
            <span className="route-loading-ring" aria-hidden="true" />
            <span>Opening universe…</span>
          </div>
        </main>
      )}>
        <main id="main-content" style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="/characters/:slug" element={<CharacterDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </Suspense>
    </div>
  );
}
