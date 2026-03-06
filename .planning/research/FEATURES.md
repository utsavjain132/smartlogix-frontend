# Feature Research

**Domain:** Freight Logistics Platform UI (SaaS Revamp)
**Researched:** 2026-03-06
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete or frustrating to use, especially in a B2B SaaS context.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Sticky Sidebar Navigation** | Standard SaaS pattern. Provides stable context and fast switching for Shippers/Admins on desktop. | LOW | Utilize a persistent layout shell. Highlight active states clearly. |
| **Mobile-First Trucker UI** | Truckers are primarily on mobile devices. Desktop-centric tables are unusable in-cab. | MEDIUM | Needs specialized card-based views instead of complex tables on small screens (`md:hidden`). |
| **Interactive Data Tables** | Core UI for "Load Boards". Users must be able to sort, filter, and paginate large datasets effortlessly. | MEDIUM | Use headless table libraries (like `@tanstack/react-table`) combined with `shadcn/ui`. |
| **Context-Preserving Overlays (Slide-overs)** | Users hate losing their place in a table when creating or editing a load. | LOW | Use Slide-overs (Drawers/Sheets) instead of full-page redirects for CRUD operations. |
| **Actionable Row Context Menus** | Quick access to actions (Edit, Assign, Cancel) without opening the full record. | LOW | Three-dot dropdown menus aligned to the right side of table rows. |
| **Standardized Status Badges** | Instant visual recognition of load state (e.g., Pending, In-Transit, Delivered). | LOW | Consistent color-coding (Yellow, Blue, Green) across the entire platform. |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required for basic functionality, but highly valued by power users (Shippers/Brokers).

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Bulk Table Actions** | Massively speeds up workflow for Shippers managing dozens of loads daily. | MEDIUM | Multi-select checkboxes triggering a persistent action bar (Assign/Delete). |
| **Command Palette (Cmd+K)** | Lightning-fast navigation and action execution for power users without touching the mouse. | MEDIUM | Implement via `cmdk`. Great for "Search Load #123" or "Create New Load". |
| **Integrated Map Overlays** | Allows users to see route details directly within a Load details slide-over. | HIGH | Prevents context switching. Requires passing map context cleanly into portals/modals. |
| **Customizable Table Views** | Users can toggle columns on/off, reorder them, and adjust density. | HIGH | Gives enterprise users the "Excel-like" control they desire. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems in modern SaaS design.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Infinite Scroll on Tables** | "Feels modern like social media." | Breaks browser back-button position, makes footer unreachable, consumes high memory on large datasets, makes finding specific records hard. | Standard pagination with adjustable rows-per-page (10, 50, 100). |
| **"Real-time" Everything** | "We want to see loads pop up instantly." | Constant UI shifting makes clicking rows frustrating. High battery drain for mobile Truckers. | Smart background polling (e.g., SWR/React Query) with visual "New Data Available" refresh prompts. |
| **Mega-Modals for Data Entry** | "Keep the user on the same page." | Center-screen modals feel cramped for complex multi-step forms (like creating a load with multiple stops). High risk of accidental dismissal. | Wide Slide-overs (Drawers) anchored to the right, or dedicated full-page routes with auto-save. |

## Feature Dependencies

```text
[Tailwind CSS & Core Layouts]
    └──requires──> [shadcn/ui Component Foundation]
                       ├──requires──> [Interactive Data Tables]
                       └──requires──> [Slide-overs & Modals]

[Interactive Data Tables]
    ├──enhances──> [Bulk Table Actions]
    └──enhances──> [Customizable Table Views]

[Slide-overs & Modals]
    └──enhances──> [Integrated Map Overlays]
```

### Dependency Notes

- **Tailwind & Core Layouts requires shadcn/ui:** To achieve the modern SaaS look, the primitive design tokens and structural components must be established first.
- **Interactive Data Tables enhances Bulk Table Actions:** Bulk actions rely entirely on the row-selection capabilities of the underlying table architecture.
- **Slide-overs enhances Integrated Map Overlays:** Maps will be injected into the slide-overs to show route info without breaking table context.

## MVP Definition

### Launch With (v1 - UI Revamp MVP)

Minimum viable product for the UI overhaul — what's needed to achieve the "modern SaaS" feel.

- [x] **Tailwind CSS Foundation** — Completely replaces existing legacy CSS.
- [x] **Sticky Layout Shell** — Modern sidebar for desktop, bottom/hamburger nav for mobile.
- [x] **Interactive Data Tables** — Sortable, filterable, paginated tables replacing static ones.
- [x] **Slide-overs for CRUD** — "Create Load" and "Edit Load" open in side-drawers, preserving list context.
- [x] **Mobile-first Trucker Cards** — Redesigned list views specifically for small screens.

### Add After Validation (v1.x)

Features to add once core UI migrations are stable.

- [ ] **Bulk Table Actions** — Add selection checkboxes to data tables.
- [ ] **Command Palette (Cmd+K)** — Quick search and navigation.
- [ ] **Table Column Customization** — Let users hide/show specific data columns.

### Future Consideration (v2+)

Features to defer until the platform is fully stabilized on the new UI stack.

- [ ] **Saved Table Views** — Saving complex filter/sort states to user profiles.
- [ ] **Dark Mode** — Full system-wide theme toggling (requires rigorous design token mapping).

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Sticky Layout Shell | HIGH | LOW | P1 |
| Interactive Data Tables | HIGH | MEDIUM | P1 |
| Slide-overs / Drawers | HIGH | LOW | P1 |
| Mobile-first Trucker UI | HIGH | MEDIUM | P1 |
| Bulk Table Actions | MEDIUM | MEDIUM | P2 |
| Command Palette | MEDIUM | MEDIUM | P2 |
| Column Customization | LOW | HIGH | P3 |
| Dark Mode | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch (Core UI Revamp)
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature | Legacy Load Boards (DAT) | Modern Freight SaaS (Uber Freight, Convoy) | Our Approach |
|---------|--------------------------|--------------------------------------------|--------------|
| **Navigation** | Cluttered top navs, multiple disjointed pages. | Clean sticky sidebars, single-page application feel. | **Sticky Sidebar** + Slide-overs to mimic modern SaaS workflow. |
| **Data Tables** | Static, hard to read, requires page reloads for sorting. | Highly interactive, customizable, infinite scroll or fast pagination. | **React-Table + Pagination** for speed, avoiding infinite scroll pitfalls. |
| **Mobile Experience** | Shrunken desktop view, pinch-to-zoom required. | Dedicated mobile app or highly optimized PWA responsive views. | **Tailwind Mobile-first Cards** for Trucker roles, hiding complex tables on small screens. |

## Sources

- Core internal context (`.planning/PROJECT.md`)
- Modern UI/UX patterns established by Vercel, Stripe, and Linear (SaaS standard).
- `@tanstack/react-table` UI/UX best practices for data-dense B2B applications.

---
*Feature research for: Freight Logistics Platform UI*
*Researched: 2026-03-06*
