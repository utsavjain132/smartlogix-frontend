# Codebase Concerns

**Analysis Date:** 2026-03-06

## Tech Debt

**Component Coupling:**
- Issue: UI, state, API calls, and business logic are tightly coupled in large components. `SignupPage.jsx` manually orchestrates multi-step registration (Signup -> Login -> Profile creation).
- Files: `src/pages/SignupPage.jsx`, `src/pages/BusinessDashboard.jsx`, `src/pages/TruckerDashboard.jsx`
- Impact: Code is difficult to read, maintain, and test. Reusability is minimal.
- Fix approach: Abstract API logic into custom hooks (e.g., `useAuth`, `useLoads`) and separate multi-step forms into sub-components.

**Hardcoded Business Data:**
- Issue: `CITY_COORDS` is a hardcoded dictionary mapping cities to static coordinates.
- Files: `src/pages/BusinessDashboard.jsx`
- Impact: System only works for specific Indian cities. Adding a new city requires a code change and deployment.
- Fix approach: Integrate a real Geocoding API (e.g., Google Maps Geocoding or OpenStreetMap Nominatim) or fetch coordinates from the backend.

**Duplicate API Handling:**
- Issue: Dashboard bypasses the configured `apiRequest` utility and writes manual `fetch()` calls with authorization headers.
- Files: `src/pages/AdminDashboard.jsx`
- Impact: Inconsistent error handling and token expiration management. If the auth logic changes, admin pages will break.
- Fix approach: Refactor `AdminDashboard.jsx` to use `apiRequest` from `src/services/api.js`.

**CSS Fragmentation:**
- Issue: Tailwind CSS is installed but heavily underutilized. Instead, components use custom CSS files with BEM-like class names.
- Files: `src/App.css`, `src/pages/BusinessDashboard.css`, `src/pages/TruckerDashboard.css`
- Impact: Duplicated styles, higher maintenance overhead, and inconsistent design language.
- Fix approach: Adopt Tailwind utility classes fully and deprecate component-specific CSS files.

## Security Considerations

**Client-Side Role Enforcement:**
- Risk: Role-based routing relies solely on the role string saved in local storage. Malicious users can edit local storage to `ADMIN` and access administrative UI.
- Files: `src/components/ProtectedRoute.jsx`
- Current mitigation: None on the frontend.
- Recommendations: Validate roles via an authenticated `/api/auth/me` endpoint on app load or decode the JWT on the client to securely read the role.

**Token Storage:**
- Risk: JWT tokens are stored in `localStorage`, making them highly vulnerable to XSS attacks.
- Files: `src/services/api.js`, `src/pages/SignupPage.jsx`, `src/pages/LoginPage.jsx`
- Current mitigation: None.
- Recommendations: Store tokens in HttpOnly secure cookies.

**Hardcoded API URL Fallback:**
- Risk: Exposing developer/tunnel URLs in production builds if env variables fail.
- Files: `src/services/api.js`, `src/pages/AdminDashboard.jsx`
- Current mitigation: Checks `import.meta.env.VITE_API_URL` first.
- Recommendations: Remove the fallback URL and enforce `VITE_API_URL` presence during the build process.

## Performance Bottlenecks

**Sequential API Waterfalls:**
- Problem: The dashboard fetches profile, loads, and jobs sequentially rather than in parallel.
- Files: `src/pages/TruckerDashboard.jsx` (`fetchData` method)
- Cause: `await apiRequest(...)` used sequentially.
- Improvement path: Group independent API calls using `Promise.all()`.

**Missing Global State / Caching:**
- Problem: Navigating between routes re-fetches all data from scratch every time.
- Files: All page components.
- Cause: Reliance on component-level `useEffect` without a caching layer like React Query or Redux.
- Improvement path: Implement `@tanstack/react-query` to cache network responses and handle loading states.

## Fragile Areas

**Map Initialization Memory Leaks:**
- Files: `src/components/MapComponent.jsx`
- Why fragile: The `useEffect` managing the Leaflet map `L.map` has an empty cleanup function.
- Safe modification: Call `mapInstance.current.remove()` in the cleanup function to prevent "Map container is already initialized" errors during re-renders.
- Test coverage: None.

**Global Navigation Side-effects:**
- Files: `src/services/api.js`
- Why fragile: Uses `window.location.href = "/login"` on 401 Unauthorized errors, resetting the entire React application state instead of using React Router.
- Safe modification: Intercept 401s globally using a React Context or an Axios/Fetch interceptor that has access to React Router's `navigate` function.

## Scaling Limits

**Unpaginated Data Queries:**
- Current capacity: Works for a few dozen records.
- Limit: Fetches the entire `Users` and `Loads` database collections simultaneously on the admin panel. Will cause memory exhaustion or long timeouts as usage grows.
- Scaling path: Implement pagination (e.g., limit, offset) on both the backend endpoints and frontend tables.

## Test Coverage Gaps

**Application-Wide Missing Tests:**
- What's not tested: The entire frontend application. Zero test files exist.
- Files: `src/**/*`
- Risk: Refactoring shared components or API utilities has a high probability of causing silent regressions.
- Priority: High. Introduce Vitest/Jest and React Testing Library. Start with unit tests for `src/services/api.js` and `src/components/ProtectedRoute.jsx`.

---

*Concerns audit: 2026-03-06*