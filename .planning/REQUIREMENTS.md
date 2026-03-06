# Requirements: FreightMatch Platform (UI/UX Revamp)

**Defined:** 2026-03-06
**Core Value:** Connect truckers and businesses instantly for efficient, cost-effective, and rule-based freight delivery.

## v1 Requirements

Requirements for the initial UI/UX revamp release.

### Infrastructure & Theming

- [x] **INFR-01**: Remove all legacy custom CSS files (except absolute globals).
- [x] **INFR-02**: Install and configure Tailwind CSS v4.
- [x] **INFR-03**: Install and configure `shadcn/ui` base and utility functions.
- [x] **INFR-04**: Define a modern, high-trust color palette (deep blues/slate, high contrast) in Tailwind config.
- [x] **INFR-05**: Implement an enterprise typography scale (Inter or Poppins) optimized for data density.

### App Shells & Layouts

- [ ] **LAYT-01**: Create a sticky sidebar navigation layout for the Business and Admin dashboards (Desktop).
- [ ] **LAYT-02**: Create a mobile-first bottom navigation or hamburger layout for the Trucker dashboard.
- [ ] **LAYT-03**: Redesign the public Landing Page (`Home.jsx`) with a modern SaaS aesthetic, strong CTAs, and feature cards.
- [ ] **LAYT-04**: Redesign Auth pages (Login, Signup) into centered, clean card layouts.

### Core Data Views

- [ ] **DATA-01**: Upgrade the Business/Admin load list to an interactive Data Table (e.g., using TanStack Table or shadcn Table).
- [ ] **DATA-02**: Upgrade the Trucker load list to large, tap-friendly touch cards optimized for mobile.
- [ ] **DATA-03**: Implement visual status badges (e.g., Green/Delivered, Yellow/In Transit) across all load views.

### Context-Preserving UX (Forms)

- [ ] **UX-01**: Convert the "New Load" form from an inline expanding div to a Slide-over (Sheet) or Modal (Dialog).
- [ ] **UX-02**: Implement robust client-side form validation (e.g., `react-hook-form` + `zod`) with clear error states.
- [ ] **UX-03**: Convert Load Action confirmations (e.g., "Accept Load", "Update Status") to clean modal dialogs.

### Map Integration

- [ ] **MAP-01**: Ensure the MapComponent integrates seamlessly into the new layouts without z-index conflicts.
- [ ] **MAP-02**: Protect map tiles and controls from Tailwind's Preflight CSS reset.

## v2 Requirements

Deferred to future releases.

### Advanced Data Grids
- **GRID-01**: User-customizable table views (saved filters/column visibility) persisted to the backend.
- **GRID-02**: Bulk action capabilities (select multiple rows) on the Business Dashboard.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend API changes | Scope is strictly limited to the frontend UI/UX presentation layer. |
| Real-time WebSockets | Current scope is visual/UX improvements; real-time data sync is a heavy architectural change. |
| Framework Migration | Staying on React + Vite; no migration to Next.js or Remix. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFR-01 | Phase 1 | Complete |
| INFR-02 | Phase 1 | Complete |
| INFR-03 | Phase 1 | Complete |
| INFR-04 | Phase 1 | Complete |
| INFR-05 | Phase 1 | Complete |
| LAYT-01 | Phase 2 | Pending |
| LAYT-02 | Phase 2 | Pending |
| LAYT-03 | Phase 2 | Pending |
| LAYT-04 | Phase 2 | Pending |
| DATA-01 | Phase 3 | Pending |
| DATA-02 | Phase 3 | Pending |
| DATA-03 | Phase 3 | Pending |
| UX-01 | Phase 3 | Pending |
| UX-02 | Phase 3 | Pending |
| UX-03 | Phase 3 | Pending |
| MAP-01 | Phase 4 | Pending |
| MAP-02 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 17 total
- Mapped to phases: 17
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-06*
*Last updated: 2026-03-06 after initial definition*
