---
phase: 02-app-shells-layouts
plan: "02"
subsystem: ui
tags: [react, tailwind, shadcn, lucide, sidebar, dashboard, routing]

# Dependency graph
requires:
  - phase: 02-app-shells-layouts
    provides: Vitest test stubs (RED state) for DashboardShell and Navbar (from Plan 01)
  - phase: 01-infrastructure-theming
    provides: Tailwind v4 sidebar CSS tokens (--color-sidebar-*), shadcn Button, cn() utility, lucide-react icons
provides:
  - DashboardShell sticky sidebar component for BUSINESS and ADMIN roles
  - App.jsx routing updated with DashboardShell wrappers for dashboard routes
  - Navbar.jsx fixed to return null on dashboard routes (no double-header)
  - BusinessDashboard and AdminDashboard outer divs cleaned of conflicting layout classes
affects: [02-03, 02-04, 02-05]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "DashboardShell pattern: h-screen overflow-hidden flex layout for sticky sidebar"
    - "Sidebar uses Tailwind design tokens (bg-sidebar, text-sidebar-foreground, border-sidebar-border)"
    - "Navbar location-aware null-return: useLocation + dashboardPaths.includes check"
    - "Mobile hamburger: useState toggle + fixed overlay + md:hidden/md:flex responsive classes"

key-files:
  created:
    - src/components/DashboardShell.jsx
  modified:
    - src/App.jsx
    - src/components/Navbar.jsx
    - src/pages/BusinessDashboard.jsx
    - src/pages/AdminDashboard.jsx

key-decisions:
  - "DashboardShell uses h-screen overflow-hidden (NOT min-h-screen) to keep sidebar fixed while content scrolls"
  - "Sidebar divider implemented as <div className='border-t border-sidebar-border' /> — Separator component not yet installed (Plan 03)"
  - "All hardcoded bg-[#00796b] teal removed from Navbar Buttons; shadcn default variant used instead"
  - "Trucker route NOT wrapped in Plan 02 — TruckerShell created in Plan 03"

patterns-established:
  - "Pattern 1: DashboardShell wraps ProtectedRoute children in App.jsx to provide persistent layout"
  - "Pattern 2: Navbar returns null when token + dashboardPaths.includes(location.pathname) — no double-header"
  - "Pattern 3: Dashboard pages render content only (no bg/min-h-screen) — shell provides layout context"

requirements-completed: [LAYT-01]

# Metrics
duration: 1min
completed: 2026-03-06
---

# Phase 2 Plan 02: DashboardShell Summary

**DashboardShell sticky sidebar component with role-aware nav, wired into App.jsx routing for Business and Admin dashboards, Navbar fixed to hide on dashboard routes**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-06T09:43:54Z
- **Completed:** 2026-03-06T09:45:53Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Created `DashboardShell.jsx` with sticky sidebar, role-aware nav items, mobile hamburger toggle, and design token usage
- Wired DashboardShell into App.jsx — Business and Admin routes now wrapped with the shell
- Fixed Navbar to return null on `/business-dashboard`, `/trucker-dashboard`, `/admin-dashboard` when token present
- Stripped conflicting `bg-teal-50`/`bg-gray-50`/`min-h-screen` from BusinessDashboard and AdminDashboard outer divs
- Removed all hardcoded `bg-[#00796b]` teal overrides from Navbar Buttons

## Task Commits

Each task was committed atomically:

1. **Task 1: Create DashboardShell.jsx** - `00211e5` (feat)
2. **Task 2: Fix App.jsx root div + wrap dashboard routes + fix Navbar** - `0cdf6c9` (feat)

**Plan metadata:** *(docs commit — see below)*

_Note: Both tasks followed TDD GREEN pattern — test stubs were written in Plan 01 (RED), implementations here turn them GREEN_

## Files Created/Modified
- `src/components/DashboardShell.jsx` - Sticky sidebar shell for BUSINESS and ADMIN roles with hamburger mobile fallback
- `src/App.jsx` - DashboardShell import added; Business+Admin routes wrapped; root div cleaned of text-center/min-h-screen/bg-[#f4f7f6]
- `src/components/Navbar.jsx` - Added useLocation + dashboardPaths null-return guard; removed hardcoded teal Button colors
- `src/pages/BusinessDashboard.jsx` - Outer divs stripped of bg-teal-50, min-h-screen, font-sans, text-teal-900
- `src/pages/AdminDashboard.jsx` - Outer divs stripped of bg-gray-50, min-h-screen, font-sans, text-gray-900

## Decisions Made
- Used `h-screen overflow-hidden` on the DashboardShell root (NOT `min-h-screen`) to enable independent scrolling of main content while sidebar stays fixed
- Used `<div className="border-t border-sidebar-border" />` as divider instead of shadcn `<Separator>` — Separator is not yet installed (reserved for Plan 03)
- Trucker route intentionally NOT wrapped — TruckerShell is a different component created in Plan 03

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None — full test suite passes for DashboardShell (4/4) and Navbar (4/4). Pre-existing RED stubs for TruckerShell, Home teal-check, and SignupPage remain failing (expected — out of scope for this plan, covered in Plans 03-05).

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- DashboardShell fully implemented and tested — LAYT-01 complete
- Plan 03 can build TruckerShell and install shadcn Separator
- Business and Admin dashboards now render inside the persistent shell layout

---
*Phase: 02-app-shells-layouts*
*Completed: 2026-03-06*

## Self-Check: PASSED

- FOUND: src/components/DashboardShell.jsx ✓
- FOUND: .planning/phases/02-app-shells-layouts/02-02-SUMMARY.md ✓
- FOUND: commit 00211e5 (feat(02-02): create DashboardShell sticky sidebar component) ✓
- FOUND: commit 0cdf6c9 (feat(02-02): wire DashboardShell into routing, fix Navbar and dashboard pages) ✓
- All 8 target tests GREEN (4 DashboardShell + 4 Navbar) ✓
- App.jsx: no text-center/min-h-screen/bg-[#f4f7f6] ✓
- App.jsx: DashboardShell wraps Business + Admin routes ✓
- Navbar.jsx: useLocation + dashboardPaths null-return ✓
