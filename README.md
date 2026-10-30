# Spider-Verse Explorer 🕷️🕸️

An interactive, responsive, and cinematic frontend web application for exploring Spider-People variants across alternate dimensions of the multiverse. Built specifically as a clean, modular React portfolio project for college coursework and technical presentations.

---

## 🌟 Key Features

- **Multiverse Hero Roster**: Catalogs 10 distinct Spider-People across key comic continuities:
  1. **Peter Parker** (Earth-616) — The prime timeline anchor and mentor.
  2. **Miles Morales** (Earth-1610) — Brooklyn's champion with bio-electric venom blasts.
  3. **Gwen Stacy / Ghost-Spider** (Earth-65) — Rhythmic drummer with interdimensional transit capabilities.
  4. **Miguel O'Hara / Spider-Man 2099** (Earth-928) — Cyberpunk geneticist wielding talons and neural stabilizers.
  5. **Peter Parker / Spider-Man Noir** (Earth-90214) — 1930s trench-coat detective operating in shadows.
  6. **Peni Parker & SP//dr** (Earth-14512) — Cyber-anime tech pilot psychic-linked to a mech chassis.
  7. **Peter Porker / Spider-Ham** (Earth-8311) — Cartoon slapstick hero armed with dimensional anvils.
  8. **Hobie Brown / Spider-Punk** (Earth-138) — Rebel resistance leader armed with guitar feedback and chrome spikes.
  9. **Mayday Parker / Spider-Girl** (Earth-982) — Next-gen MC2 high school athlete continuing the family legacy.
  10. **Ben Reilly / Scarlet Spider** (Earth-616) — Clone saga hero sporting a cobalt hoodie and impact webbing.

- **Local SVG Character Portraits**:
  - The portraits are stylized local SVG interpretations and do not rely on remote image services.
  - The source project did not record the portraits' individual creator or license. See `IMAGE_CREDITS.md`; do not treat the artwork as public domain or rights-cleared without checking its provenance.
  - Automatic `onError` fallback handling ensures no broken image icons ever appear.

- **Dynamic Cross-Field Search**:
  - Live filter matching character civil names, hero aliases, universe designations, or combat powers simultaneously.

- **Synchronized URL Deep-Linking**:
  - Filtering by dimension (e.g., `?universe=Earth-65` or `?q=venom`) updates the URL query string using React Router's `useSearchParams`. Sharing or refreshing the link maintains the exact filtered state.

- **Multiverse Jump Transition**:
  - A lightweight, non-blocking dimensional rift transition when navigating to hero dossiers. Automatically disables itself if the user has `prefers-reduced-motion` enabled.

- **Interactive Web Tracker**:
  - Explore an original stylized world map with selectable sample signals, status filters, zoom controls, and a recent activity panel.
  - Add a report that stays in this browser using `localStorage`; there is no live feed or backend.
  - All preloaded tracker entries are fictional demo data, not real-world sightings.

- **Scroll and discovery interactions**:
  - Scroll progress, reveal-on-scroll sections, a back-to-top control, and a random character jump from the home page.
  - The hero web canvas responds to pointer movement and respects reduced-motion preferences.

- **Responsive & Accessible Design**:
  - Responsive layouts are designed for narrow phones, tablets, laptops, and wide desktop displays. Check the live deployment at these sizes before submission.
  - Complete keyboard navigation with visible focus rings, ARIA roles, breadcrumb navigation, and screen-reader considerations.
  - Pure CSS design system with cinematic dark tones (`#0a0b0e`), charcoal surfaces, and deep crimson highlights (`#c51b29`, `#e63946`).

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [React 18](https://react.dev/)
- **Bundler & Build Tool**: [Vite 6](https://vitejs.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Styling**: Vanilla Modern CSS (CSS Custom Properties, Flexbox, CSS Grid, Media Queries)
- **Data Source**: Local JSON (`src/data/characters.json`)
- **Graphics**: Scalable Vector Graphics (SVG) + HTML5 Canvas Rift Particle Motif

---

## 📁 Project Structure

```text
Spider-Verse/
├── public/
│   ├── images/
│   │   └── README.txt             # Directory for optional user-provided licensed images
│   ├── portraits/
│   │   ├── peter-parker.svg       # Original vector illustration
│   │   ├── miles-morales.svg      # Original vector illustration
│   │   ├── gwen-stacy.svg         # Original vector illustration
│   │   ├── miguel-ohara.svg       # Original vector illustration
│   │   ├── spider-man-noir.svg    # Original vector illustration
│   │   ├── peni-parker.svg        # Original vector illustration
│   │   ├── peter-porker.svg       # Original vector illustration
│   │   ├── spider-punk.svg        # Original vector illustration
│   │   ├── mayday-parker.svg      # Original vector illustration
│   │   ├── ben-reilly.svg         # Original vector illustration
│   │   └── fallback-portrait.svg  # Graceful fallback portrait
│   └── rift-icon.svg              # Geometric dimensional favicon
├── src/
│   ├── components/
│   │   ├── Breadcrumb.jsx         # Accessible breadcrumb trail
│   │   ├── CharacterCard.jsx      # Reusable hero card with image fallback
│   │   ├── DimensionalRiftCanvas.jsx # Interactive canvas background motif
│   │   ├── Footer.jsx             # Site footer with disclaimer & links
│   │   ├── MultiverseJumpOverlay.jsx # Quick dimensional jump effect
│   │   ├── ScrollExperience.jsx   # Scroll progress and back-to-top controls
│   │   ├── ScrollReveal.jsx       # Reveal-on-scroll helper
│   │   └── Navbar.jsx             # Responsive top navbar with mobile drawer
│   ├── data/
│   │   ├── characters.json        # Central local database of all 10 heroes
│   │   └── sightings.json         # Fictional tracker demo entries
│   ├── pages/
│   │   ├── HomePage.jsx           # Hero, featured roster, about section
│   │   ├── GalleryPage.jsx        # Search, universe filter chips, sorting, empty state
│   │   ├── TrackerPage.jsx        # Interactive map, activity feed, local reports
│   │   ├── CharacterDetailPage.jsx# Detailed dossier, powers, specs, prev/next jump
│   │   └── NotFoundPage.jsx       # 404 dimensional glitch page
│   ├── styles/
│   │   ├── cards.css              # Character card layout and hover glow
│   │   ├── character-detail.css   # Full dossier layout
│   │   ├── footer.css             # Footer grid and disclaimer
│   │   ├── gallery.css            # Search bar, filter chips, and grid
│   │   ├── home.css               # Hero and about section styles
│   │   ├── tracker.css            # Interactive tracker page styles
│   │   ├── index.css              # CSS variables, typography, and resets
│   │   └── navbar.css             # Header, wordmark, and mobile drawer
│   ├── App.jsx                    # Route configuration & scroll restoration
│   └── main.jsx                   # React root entry point
├── index.html                     # HTML skeleton with font preconnects
├── package.json                   # Dependencies and npm scripts
├── vite.config.js                 # Vite bundler configuration
├── IMAGE_CREDITS.md               # Legal image provenance & license log
└── README.md                      # Complete documentation
```

---

## 🚦 Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine (version 18+ or 20+ recommended).

To verify your Node installation:
```bash
node -v
npm -v
```

### Installation
Clone or open this project directory in your terminal and install dependencies:

```bash
# Navigate into the project folder
cd Spider-Verse

# Install dependencies (React, React Router, Vite)
npm install
```

### Running the Development Server
Launch the local development server:

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173/`). Open this link in any browser to experience the site live with Instant Hot Module Replacement (HMR).

### Building for Production
Create an optimized production bundle:

```bash
npm run build
```

The production assets will be output to the `dist/` directory.

### Previewing the Production Build
To test the built production bundle locally:

```bash
npm run preview
```

---

## 🧭 Routes & Deep-Linking

| Route Path | Description | Query Parameters Supported |
| :--- | :--- | :--- |
| `/` | **Home Archive** with cinematic hero, dimensional rift animation, featured cards, and project overview. | None |
| `/gallery` | **Full Gallery Roster** displaying all 10 characters with search, universe filters, and sorting. | `?universe=Earth-1610`<br>`?q=venom`<br>`?sort=alias-asc` |
| `/tracker` | **Web Tracker** with a stylized interactive map, fictional demo activity feed, status filters, zoom controls, and reports saved locally in this browser. | None |
| `/characters/:slug` | **Individual Hero Dossier** showing large vector portrait, tactical powers, specs, and adjacent navigation. | None (`:slug` matches e.g. `miles-morales`, `gwen-stacy`) |
| `*` | **Custom 404 Page** for invalid routes with quick return buttons. | None |

---

## 📋 Character Data Schema

All hero records are stored cleanly in [`src/data/characters.json`](src/data/characters.json) using the following structure:

```json
{
  "id": "miles-morales-1610",
  "slug": "miles-morales",
  "name": "Miles Morales",
  "alias": "Spider-Man",
  "universe": "Earth-1610",
  "tagline": "Brooklyn's protector forging his own path with electrifying venom blasts and camouflage.",
  "biography": "Following the tragic fall of his universe's original Spider-Man...",
  "powers": [
    "Bio-Electric Venom Blast & Strike",
    "Arachnid Camouflage (Invisibility)",
    "Enhanced Spider-Sense"
  ],
  "portrait": "/portraits/miles-morales.svg",
  "alt": "Stylized vector portrait of Miles Morales in black and crimson suit",
  "accentColor": "#c51b29",
  "secondaryColor": "#111317",
  "firstAppearance": "Ultimate Fallout #4 (2011)",
  "status": "Active Champion",
  "dimensionType": "Ultimate Timeline",
  "suitNotes": "Custom spray-painted black tactical weave with crimson graffiti web motif."
}
```

---

## 🖼️ How to Replace an Original SVG Portrait with Your Own Image

If you have permission to use a photo, 3D model render, or personal artwork:

1. **Verify your rights**: Ensure you have explicit permission or a Creative Commons license (e.g., CC0, CC-BY) allowing portfolio use. Do not scrape Google Images or fan wikis.
2. **Add the file**: Place your image inside `public/images/` (for example, `public/images/peter-parker-photo.jpg`).
3. **Update `src/data/characters.json`**:
   Change the `portrait` property for that character:
   ```json
   "portrait": "/images/peter-parker-photo.jpg"
   ```
4. **Update `IMAGE_CREDITS.md`**:
   Record the creator, source URL, and license terms in `IMAGE_CREDITS.md`.
5. **Safety Guarantee**: If your image path has a typo or fails to load, the app's `onError` fallback will automatically display the local vector silhouette `/portraits/fallback-portrait.svg`.

---

## 🚀 Deployment Guide

### Deploying to Netlify
1. Push your repository to GitHub or GitLab.
2. Log into [Netlify](https://www.netlify.com/) and click **"Add new site" > "Import an existing project"**.
3. Select your repository.
4. Set Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add a simple redirect rule for client-side routing:
   Create a `public/_redirects` file containing:
   ```text
   /*    /index.html   200
   ```
6. Click **Deploy Site**.

### Deploying to Vercel
1. Log into [Vercel](https://vercel.com/) and select **"Add New Project"**.
2. Import your GitHub repository.
3. Framework Preset: **Vite** (auto-detected).
4. Root Directory: `./`
5. Click **Deploy**. Vercel automatically handles Single Page Application (SPA) routing for React Router.

---

## ⚖️ Educational Disclaimer & Copyright Notice

This is an unofficial educational frontend project. Use and publication of franchise-derived names and designs may be subject to rights-holder and college rules; this README is not legal advice.

- It is **not** an official Marvel, Sony Pictures, or Spider-Man product.
- The project files contain local SVG portraits and no external image URLs or movie stills were found. The source files do not document who created the portraits or their license status; see `IMAGE_CREDITS.md`.
- Character names and related concepts belong to their respective rights holders. The project is not affiliated with, sponsored by, or endorsed by Marvel or Sony.
