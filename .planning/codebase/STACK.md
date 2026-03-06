# Technology Stack

**Analysis Date:** 2026-03-06

## Languages

**Primary:**
- JavaScript (ES2020) - Primary application logic and React components (`src/**/*.jsx`, `src/**/*.js`)
- CSS - Application styling alongside Tailwind classes (`src/**/*.css`)

**Secondary:**
- HTML5 - Application entry point (`index.html`)

## Runtime

**Environment:**
- Node.js (via Vite development and build processes)

**Package Manager:**
- npm (v9/v10 implied)
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React 19.1.1 - UI Component Library
- React DOM 19.1.1 - DOM rendering
- React Router DOM 6.30.1 - Client-side routing

**Testing:**
- Not detected (No Jest, Vitest, or Testing Library configurations found)

**Build/Dev:**
- Vite 7.1.7 - Build tool and development server
- ESLint 9.36.0 - Code linting and formatting

## Key Dependencies

**Critical:**
- Tailwind CSS 4.1.16 - Utility-first CSS framework for styling
- Leaflet 1.9.4 & React Leaflet 5.0.0 - Interactive mapping components
- Leaflet Routing Machine 3.2.12 - Map routing and directions

**Infrastructure:**
- Firebase 12.5.0 - Installed in `package.json` but currently unused in source code
- React Toastify 11.0.5 - Notification and toast messaging system
- Lucide React 0.548.0 - SVG icon library

## Configuration

**Environment:**
- Configured via `.env` files (e.g., `VITE_API_URL` for backend connections)
- Environment variables are accessed via Vite's `import.meta.env`

**Build:**
- `vite.config.js`: Configured with React, Tailwind CSS, and SVGR plugins. Includes allowed hosts for preview environments (`smartlogix-yvmh.onrender.com`).
- `eslint.config.js`: Configured for React hooks, global browser environments, and specific rules (e.g., ignoring unused variables starting with caps).
- `package.json`: Contains standard build, dev, lint, and preview scripts.

## Platform Requirements

**Development:**
- Node.js and npm required to install dependencies and run the Vite dev server

**Production:**
- Any static hosting environment supporting Vite builds or Dockerized Node.js for running `vite preview`
- Current preview host configuration targets Render (`smartlogix-yvmh.onrender.com`)

---

*Stack analysis: 2026-03-06*