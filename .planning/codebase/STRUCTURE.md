# Codebase Structure

**Analysis Date:** 2026-03-06

## Directory Layout

```text
.
├── src/                # Main source code directory
│   ├── assets/         # Static visual assets
│   │   └── icons/      # SVG icons
│   ├── components/     # Reusable and common React components
│   ├── pages/          # Top-level view components mapping to routes
│   ├── services/       # Network abstraction utilities
│   ├── App.jsx         # Main application router layout
│   └── main.jsx        # Entrypoint injecting React into DOM
├── .env                # Environment configuration
├── index.html          # HTML entry point for Vite
├── package.json        # Project metadata and dependencies
└── vite.config.js      # Bundler configuration
```

## Directory Purposes

**`src/assets/`:**
- Purpose: Stores purely static non-code assets.
- Contains: SVGs and image files.
- Key files: `src/assets/icons/`

**`src/components/`:**
- Purpose: Provides encapsulated UI logic for reuse.
- Contains: Layout components, security wrappers, UI widgets.
- Key files: `src/components/ProtectedRoute.jsx`, `src/components/Navbar.jsx`, `src/components/MapComponent.jsx`

**`src/pages/`:**
- Purpose: Represents whole-page views accessible via direct URLs.
- Contains: Role-specific dashboard views, landing page, auth pages.
- Key files: `src/pages/Home.jsx`, `src/pages/BusinessDashboard.jsx`, `src/pages/TruckerDashboard.jsx`

**`src/services/`:**
- Purpose: Encapsulates API requests to decouple network logic from UI.
- Contains: Fetch wrappers and utility functions.
- Key files: `src/services/api.js`

## Key File Locations

**Entry Points:**
- `index.html`: Base template parsed by Vite.
- `src/main.jsx`: Bootstraps the application rendering tree.
- `src/App.jsx`: Global route definitions.

**Configuration:**
- `vite.config.js`: Bundler build settings.
- `eslint.config.js`: Linting rules.
- `package.json`: Core dependency graph.

**Core Logic:**
- `src/services/api.js`: Network request builder with auth/token middleware logic.

**Testing:**
- Not detected. No testing directories or specs (`*.test.js`, `*.spec.js`) are present in the current layout.

## Naming Conventions

**Files:**
- **React Components:** PascalCase with `.jsx` suffix (e.g., `AdminDashboard.jsx`, `Navbar.jsx`).
- **Styles:** PascalCase matching the component name (e.g., `AdminDashboard.css`), or `App.css` / `index.css` for globals.
- **Utilities:** camelCase with `.js` suffix (e.g., `api.js`).

**Directories:**
- **Standard Dirs:** lowercase, typically single words (e.g., `pages`, `components`, `services`, `assets`).

## Where to Add New Code

**New Feature (View):**
- Primary code: `src/pages/[FeatureName].jsx`
- Styles: `src/pages/[FeatureName].css`
- Route addition: Register the new component within `<Routes>` in `src/App.jsx`.

**New Component/Module (Reusable):**
- Implementation: `src/components/[ComponentName].jsx`
- Associated styles: `src/components/[ComponentName].css`

**Utilities:**
- Shared helpers: Define inside `src/services/` if related to data fetching. Otherwise, a `src/utils/` directory should be created for non-network logic.

## Special Directories

**`.planning/`:**
- Purpose: Generated GSD architecture and codebase analysis documentation.
- Generated: Yes
- Committed: Yes/No (Depending on `.gitignore` strategy for agentic meta-data)

---

*Structure analysis: 2026-03-06*