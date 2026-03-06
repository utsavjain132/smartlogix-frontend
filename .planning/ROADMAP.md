# Roadmap: FreightMatch Platform (UI/UX Revamp)

## Overview

A structured delivery plan for modernizing the FreightMatch platform UI to an enterprise SaaS standard. The roadmap follows a bottom-up component approach to safely transition from legacy CSS to Tailwind CSS v4 and shadcn/ui without breaking the existing backend integration.

## Phases

- [x] **Phase 1: Infrastructure & Theming** - Establish Tailwind CSS v4, shadcn/ui, and enterprise design tokens. (completed 2026-03-06)
- [ ] **Phase 2: App Shells & Layouts** - Implement role-specific navigation and modernize public/auth pages.
- [ ] **Phase 3: Core Data Views & Interactions** - Upgrade data tables, trucker cards, and form UX.
- [ ] **Phase 4: Map Integration** - Seamlessly embed and protect the map component within the new UI.

## Phase Details

### Phase 1: Infrastructure & Theming
**Goal**: The application foundation uses the new Tailwind and component system with standardized SaaS design tokens.
**Depends on**: Nothing
**Requirements**: INFR-01, INFR-02, INFR-03, INFR-04, INFR-05
**Success Criteria** (what must be TRUE):
  1. Application loads successfully and renders basic views without legacy styling artifacts.
  2. Typography and colors consistently reflect the new high-contrast, deep-blue SaaS theme.
  3. Standard interactive elements (buttons, inputs) function using the new component library system.
**Plans**: TBD

### Phase 2: App Shells & Layouts
**Goal**: Users experience consistent, responsive navigation and modernized static pages tailored to their roles.
**Depends on**: Phase 1
**Requirements**: LAYT-01, LAYT-02, LAYT-03, LAYT-04
**Success Criteria** (what must be TRUE):
  1. Unauthenticated users can view a modern landing page and clean auth cards.
  2. Business and Admin users can navigate via a persistent sticky sidebar on desktop.
  3. Truckers can navigate the app using a mobile-optimized menu.
  4. Layouts respond fluidly when resizing from mobile to desktop screens.
**Plans**: 5 plans

Plans:
- [ ] 02-01-PLAN.md — Wave 0: Create all test stubs (DashboardShell, TruckerShell, Navbar, Home, SignupPage)
- [ ] 02-02-PLAN.md — DashboardShell + App.jsx root fix + Navbar conditional hide (LAYT-01)
- [ ] 02-03-PLAN.md — Install shadcn Sheet + TruckerShell + App.jsx trucker route wiring (LAYT-02)
- [ ] 02-04-PLAN.md — Home.jsx token redesign: replace all teal hardcodes with design tokens (LAYT-03)
- [ ] 02-05-PLAN.md — Auth pages refinement: bg-background + brand mark on Login and Signup (LAYT-04)

### Phase 3: Core Data Views & Interactions
**Goal**: Users can efficiently manage and interact with freight load data through context-preserving interfaces and role-optimized views.
**Depends on**: Phase 2
**Requirements**: DATA-01, DATA-02, DATA-03, UX-01, UX-02, UX-03
**Success Criteria** (what must be TRUE):
  1. Business/Admin users can view and interact with loads in a dense data table.
  2. Truckers can browse their assigned loads via tap-friendly mobile cards.
  3. Users can identify load statuses instantly via color-coded visual badges.
  4. Users can create a new load within a slide-over/modal without leaving their current page context.
  5. Users receive immediate, clear error messages when submitting invalid form data.
  6. Users confirm critical load actions via cleanly styled modal dialogs.
**Plans**: TBD

### Phase 4: Map Integration
**Goal**: Users can view routing and location maps seamlessly integrated within the modern layouts.
**Depends on**: Phase 2, Phase 3
**Requirements**: MAP-01, MAP-02
**Success Criteria** (what must be TRUE):
  1. Maps render correctly inside load details without distorted tiles or missing controls.
  2. Users can interact with map pins and popups without UI overlay overlaps (z-index conflicts).
  3. The map component resizes correctly within the desktop and mobile layouts.
**Plans**: TBD

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Infrastructure & Theming | 5/6 | Complete    | 2026-03-06 |
| 2. App Shells & Layouts | 0/5 | Not started | - |
| 3. Core Data Views & Interactions | 0/TBD | Not started | - |
| 4. Map Integration | 0/TBD | Not started | - |
