# External Integrations

**Analysis Date:** 2026-03-06

## APIs & External Services

**Mapping & Routing:**
- OpenStreetMap - Used as the tile layer provider for maps via Leaflet (`src/components/MapComponent.jsx`)
- Leaflet Routing Machine - Provides routing and direction calculations (`src/components/MapComponent.jsx`)

**Backend Services:**
- Custom API - The application communicates with a dedicated backend service. 
  - SDK/Client: Built-in `fetch` API wrapped in a centralized utility (`src/services/api.js`)
  - Config: Base URL configured via `VITE_API_URL` environment variable.

## Data Storage

**Databases:**
- External via Backend API - The frontend does not use local databases like IndexedDB or SQLite.

**File Storage:**
- Local filesystem only (Assets and static files)

**Caching:**
- Browser `localStorage` - Used to store user JWT tokens (`token`) and roles (`role`) for session persistence.

## Authentication & Identity

**Auth Provider:**
- Custom - Handled by the backend service via `/auth/login` and `/auth/signup` endpoints.
  - Implementation: JWT (JSON Web Tokens) stored in `localStorage`. The frontend includes a centralized `apiRequest` utility (`src/services/api.js`) that automatically attaches the `Authorization: Bearer <token>` header to all outbound requests and handles 401 Unauthorized redirects.
  - Role Management: Client-side routing checks user roles (`BUSINESS`, `TRUCKER`, `ADMIN`) after successful login (`src/pages/LoginPage.jsx`).

## Monitoring & Observability

**Error Tracking:**
- None detected natively in the codebase.

**Logs:**
- Standard browser console logging. Error notifications surface to users via `react-toastify`.

## CI/CD & Deployment

**Hosting:**
- Render (Inferred) - `vite.config.js` explicitly configures `smartlogix-yvmh.onrender.com` in `allowedHosts` for preview mode.

**CI Pipeline:**
- None detected (No GitHub Actions, GitLab CI, etc., in the repository)

## Environment Configuration

**Required env vars:**
- `VITE_API_URL` - The base URL for all backend API requests.

**Secrets location:**
- Stored locally in `.env` files. Handled via Vite's environment variable system.

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

---

*Integration audit: 2026-03-06*