# Coding Conventions

**Analysis Date:** 2026-03-06

## Naming Patterns

**Files:**
- React components and pages use PascalCase: `BusinessDashboard.jsx`, `MapComponent.jsx`
- Utility, service, and configuration files use camelCase/kebab-case: `api.js`, `vite.config.js`, `eslint.config.js`

**Functions:**
- Standard functions and event handlers use camelCase: `apiRequest`, `fetchData`, `handleInputChange`, `handleSubmitLoad`
- React Functional Components use PascalCase: `const BusinessDashboard = () => { ... }`

**Variables:**
- State variables and standard variables use camelCase: `activeTab`, `filteredLoads`, `trackingLoad`
- Constants use UPPER_SNAKE_CASE: `CITY_COORDS`, `API_BASE_URL`

## Code Style

**Formatting:**
- General style: 2-space indentation (based on observations in `App.jsx` and `BusinessDashboard.jsx`).
- Semicolons are used consistently at the end of statements.
- Quotes: Primarily single quotes for imports and string literals in JS, double quotes for JSX attributes.

**Linting:**
- Tool: ESLint v9 (`eslint.config.js`)
- Rules: Uses `js.configs.recommended`, `reactHooks.configs['recommended-latest']`, and `reactRefresh.configs.vite`.
- Custom rules: `'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]`

## Import Organization

**Order:**
1. React and Core Libraries (`import React, { useState } from 'react';`)
2. External Packages/Third-party (`import { toast } from 'react-toastify';`, `import { BrowserRouter } from 'react-router-dom';`)
3. Internal Services and Components (`import { apiRequest } from '../services/api';`, `import MapComponent from '../components/MapComponent';`)
4. Stylesheets (`import './BusinessDashboard.css';`, `import './App.css';`)

**Path Aliases:**
- Not currently used. Imports use relative paths like `../services/api` or `./components/Navbar`.

## Error Handling

**Patterns:**
- **API Level:** Centralized wrapper in `src/services/api.js` that checks `response.ok`. Throws a native `Error(data.message)` on failure. It also handles 401 Unauthorized globally by clearing `localStorage` and redirecting.
- **Component Level:** Async operations inside components use `try/catch` blocks.
- **UI Feedback:** Errors caught in the UI are displayed to the user using `react-toastify`: `toast.error(err.message)`.

## Logging

**Framework:** `console` for debugging, though stripped out or minimal in the final production patterns.
- UI notifications via `react-toastify` are preferred for user-facing outcomes.

## Comments

**When to Comment:**
- Kept minimal. Used primarily to explain business logic choices or mock data configurations, e.g., `// Simple coordinate mapping for demo purposes` in `src/pages/BusinessDashboard.jsx`.
- Used to identify sections in larger components (e.g., `// Fetch Profile`, `// Handle Routing`).

**JSDoc/TSDoc:**
- Not strictly enforced or broadly used. Functions are mostly typed by inference and naming conventions.

## Function Design

**Component Pattern:**
- Functional components are defined using arrow functions: `const ComponentName = ({ props }) => { ... }`.
- Default exports are universally used for pages and components at the bottom of the file (`export default App;`).

**Event Handlers:**
- Follow a strict `handle[Action]` naming pattern, e.g., `handleAssign`, `handleClose`, `handleCancel`.

## Module Design

**State Management:**
- Component-level state relies heavily on `useState` and `useEffect`.
- Authentication state (token, role) is read synchronously from `localStorage` in critical spots like `src/components/ProtectedRoute.jsx` and `src/services/api.js`.

---

*Convention analysis: 2026-03-06*