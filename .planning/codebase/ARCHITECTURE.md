# Architecture

**Analysis Date:** 2026-03-06

## Pattern Overview

**Overall:** Client-Side Rendered (CSR) Single Page Application (SPA)

**Key Characteristics:**
- Built with React 19 and bundled via Vite.
- Thick client handling routing, role-based access control, and presentation.
- Stateless API communication, relying on JWT/Bearer tokens stored in `localStorage`.
- Component-level state management without global stores (no Redux/Zustand observed).

## Layers

**Routing Layer:**
- Purpose: Maps URLs to view components and enforces role-based access.
- Location: `src/App.jsx`
- Contains: `react-router-dom` definitions (`<Routes>`, `<Route>`) and layout wrappers (`<Navbar>`).
- Depends on: `<ProtectedRoute>` for authorization.

**View/Page Layer:**
- Purpose: Represents full-page screens mapped to specific routes.
- Location: `src/pages/`
- Contains: Stateful React components handling their own data fetching, loading, and error states.
- Depends on: API Layer, Component Layer, `react-toastify`.

**Component Layer:**
- Purpose: Reusable UI widgets and layout segments.
- Location: `src/components/`
- Contains: Pure and mildly stateful components (`MapComponent.jsx`, `Navbar.jsx`).
- Used by: View/Page Layer.

**Service/API Layer:**
- Purpose: Abstracts network requests and centralized error/auth handling.
- Location: `src/services/`
- Contains: `apiRequest` utility fetching from `VITE_API_URL`.
- Used by: View/Page Layer to communicate with the backend.

## Data Flow

**Standard View Render Flow:**
1. User navigates to a route defined in `src/App.jsx`.
2. `<ProtectedRoute>` verifies `token` and `role` in `localStorage`. If invalid, redirects to login.
3. Page component (e.g., `BusinessDashboard.jsx`) mounts.
4. `useEffect` hook triggers a data fetch using `apiRequest("/endpoint")`.
5. `apiRequest` reads the token from `localStorage`, attaches it to the `Authorization: Bearer` header, and awaits the fetch response.
6. The resolved data is stored in local React state (`useState`).
7. The component re-renders with the fetched data.

**State Management:**
- **Local UI State:** Handled via React `useState` at the component level.
- **Session/Auth State:** Synchronous reads/writes to `localStorage` (`token`, `role`). No Context API wrapper observed.

## Key Abstractions

**API Request Wrapper (`apiRequest`):**
- Purpose: Centralizes fetch logic, headers, JSON parsing, and authentication validation.
- Location: `src/services/api.js`
- Pattern: Async function abstraction wrapping native `fetch()`. Automatically catches `401 Unauthorized` responses, clears local storage, and redirects to `/login`.

**Authorization Guard (`ProtectedRoute`):**
- Purpose: Wraps sensitive routes to enforce role-based access controls (RBAC).
- Location: `src/components/ProtectedRoute.jsx`
- Pattern: Higher-Order Component/Wrapper pattern. Checks `localStorage` role against `allowedRole` prop and redirects via `<Navigate>` if mismatched.

## Entry Points

**Application Bootstrap:**
- Location: `src/main.jsx`
- Triggers: Initial HTML load from `index.html`.
- Responsibilities: Renders the React tree root using `createRoot` and applies `<StrictMode>`.

**Routing Definition:**
- Location: `src/App.jsx`
- Triggers: Rendered by `main.jsx`.
- Responsibilities: Sets up `BrowserRouter`, global UI overlays (`ToastContainer`, `Navbar`), and route mapping.

## Error Handling

**Strategy:** Centralized API rejection with localized UI presentation.

**Patterns:**
- **API Level:** `apiRequest` inspects `response.ok`. If false, it throws an `Error` containing the server's `data.message` or a fallback. It handles `401` specifically by purging session data and redirecting.
- **UI Level:** Page components wrap `apiRequest` calls in `try...catch` blocks, set an `error` state string, and display notification banners using `toast.error(err.message)` from `react-toastify`.

## Cross-Cutting Concerns

**Authentication:** 
- JWTs stored in `localStorage` under the `token` key. Implicitly passed on every API call via `apiRequest`.
**Role-Based Access Control (RBAC):** 
- User roles (e.g., `BUSINESS`, `TRUCKER`, `ADMIN`) are stored in `localStorage` as `role` and verified by `<ProtectedRoute>`.
**Styling:** 
- Traditional `*.css` files mapped 1:1 with components (e.g., `Home.jsx` imports `Home.css`), supplemented by some global rules in `index.css`.
**Notifications:** 
- Global toast notifications implemented via `react-toastify` inside `<App>`.

---

*Architecture analysis: 2026-03-06*
