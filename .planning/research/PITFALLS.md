# Pitfalls Research

**Domain:** Freight Logistics Platform UI (B2B/B2C Hybrid)
**Researched:** 2026-03-06
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Data Density Loss (The "Airy SaaS" Trap)

**What goes wrong:**
Adopting shadcn/ui and Tailwind defaults leads to a UI with too much whitespace. Dispatchers (Business role) can only see 5-6 loads on their screen instead of 20, requiring endless scrolling. Conversely, touch targets on mobile for Truckers become too small or too tightly packed.

**Why it happens:**
shadcn/ui is optimized by default for standard consumer or light B2B SaaS (generous padding, large fonts). Freight logistics is a data-heavy domain (routes, rates, equipment types, dates) where information density is critical for operational efficiency on desktop, but clear, fat-finger-proof actions are needed on mobile.

**How to avoid:**
Implement a density toggle or create distinct variants for components (e.g., `table-dense`, `btn-touch`). Strip down the default padding in shadcn's table and card components for the Business dashboard. Ensure the Trucker mobile view uses card-based lists instead of squished data tables.

**Warning signs:**
Users complain about having to scroll too much to compare loads. Mobile users report accidentally accepting/declining the wrong loads.

**Phase to address:**
Phase 1 (Component Library Setup & Design Tokens)

---

### Pitfall 2: State Trapped in Modals (The "Unshareable Load" Problem)

**What goes wrong:**
Moving load details from dedicated pages to slide-overs or modals creates a "black box" UI. If a user refreshes the page, clicks the back button, or tries to share the URL of a specific load with a colleague/driver, they are dumped back to the main dashboard.

**Why it happens:**
Developers implement shadcn `<Sheet>` or `<Dialog>` using standard React state (`isOpen`, `setIsOpen`) instead of routing.

**How to avoid:**
Tie all critical modals and slide-overs to the URL using React Router. A load slide-over should be triggered by navigating to `/dashboard/loads/123`, and the slide-over component should render over the dashboard when that route matches.

**Warning signs:**
Users rely heavily on taking screenshots to share information instead of copying links. The browser back button closes the application or logs the user out instead of closing the modal.

**Phase to address:**
Phase 2 (UX Flows & Routing Revamp)

---

### Pitfall 3: Map Component Breakage (CSS Specificity Wars)

**What goes wrong:**
The integrated mapping feature (Leaflet, Mapbox, or Google Maps) breaks visually. Map tiles stretch, controls become unclickable, or map popups are hidden behind Tailwind UI components.

**Why it happens:**
Tailwind's Preflight (CSS reset) globally resets styles like `img { max-width: 100%; height: auto; }`, which notoriously breaks map tile rendering. Additionally, shadcn's aggressive z-index scale (e.g., z-50 for modals) often clashes with map control z-indexes.

**How to avoid:**
Isolate the map container. Override Tailwind's image reset specifically for the map wrapper `.map-container img { max-width: none !important; }`. Establish a strict z-index dictionary in `tailwind.config.js` that accounts for map layers.

**Warning signs:**
Map markers appear distorted. Clicking a map marker does nothing because an invisible Tailwind container is overlapping it.

**Phase to address:**
Phase 3 (Dashboard Integration & Legacy CSS Removal)

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| **Frankenstein CSS** (Leaving old CSS while adding Tailwind) | Zero regression risk on day 1 | Specificity wars; impossible to maintain or theme | Only during active, piecemeal migration (Phase 2) |
| **Inline shadcn customization** (Editing components per-page) | Fast prototyping of unique views | 15 variations of a button; breaking the design system | Never |
| **Hiding columns on mobile** (Responsive tables via `hidden`) | Easy mobile layout without redesigning | Important data (e.g., freight weight) is completely inaccessible to truckers | MVP only, must move to card-layouts |

## Integration Gotchas

Common mistakes when connecting to external services or existing core logic.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| **Mapping APIs** | Putting the map inside a React Context that updates often, causing constant map re-renders. | Memoize the map component; update markers via refs without triggering a full re-render. |
| **react-hook-form** | Forcing complex nested freight data (multi-stop routes) into flat shadcn form templates. | Use `useFieldArray` for stops; build custom compound components for complex inputs (e.g., location + time window). |
| **Legacy API** | Modifying API response shapes to fit the new UI table expectations on the client side. | Keep API responses intact; use adapter functions or TanStack Table accessors to transform data for display. |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| **Unvirtualized Tables** | Browser freezes or lags when scrolling the "Available Loads" board. | Implement `@tanstack/react-virtual` with shadcn tables for any infinite-scroll data. | > 100 active loads |
| **Heavy Modals** | Opening a load detail slide-over takes 2+ seconds and causes layout shift. | Lazy load the content of the slide-over; don't render hidden modals in the DOM for every row. | > 50 rows in table |
| **Over-fetching for UI** | Fetching all load details just to display a summary card on the map. | Ensure API endpoints support slim/summary projections specifically for map and list views. | High traffic/Mobile data |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| **Client-side Role Hiding** | Hiding "Admin" or "Business" buttons using Tailwind `hidden` based on role state. | Malicious users can unhide and trigger actions. Ensure API strictly validates role authorization, and conditionally *render* UI, don't just hide it. |
| **ID Enumeration in URLs** | Using sequential IDs for load slide-overs (`/loads/123`). | Competitors can scrape freight volume and pricing. Use UUIDs or opaque tokens for load URLs. |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| **One-Size-Fits-All Dashboard** | Truckers struggle to use complex sidebars on the road; Businesses feel constrained by simplistic mobile layouts. | Role-specific layouts: Bottom nav/hamburger for Truckers (mobile-first); Dense sticky sidebars for Businesses (desktop). |
| **Missing "Undo" on Fast Actions** | Accidentally rejecting a load with a single tap loses revenue permanently. | Implement toast notifications with an "Undo" action or require a swipe-to-confirm for destructive/critical actions. |
| **Vague Empty States** | "No loads found" gives zero context on *why*. | Provide actionable empty states: "No loads match your filter for Flatbeds in Chicago. Try expanding your radius." |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Data Tables:** Often missing horizontal scroll on tablet — verify it doesn't break page layout.
- [ ] **Slide-overs/Modals:** Often missing deep-linking — verify you can paste the URL in an incognito window and see the load (if public/authed).
- [ ] **Map Integration:** Often missing dark mode support — verify map tiles remain readable or switch to a dark style when the UI toggles.
- [ ] **Mobile Forms:** Often missing correct input types (`type="number"`, `type="tel"`) — verify the correct mobile keyboard opens for rate/phone inputs.

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| **CSS Specificity Wars** | HIGH | Stop feature development. Audit and rip out all legacy CSS files. Rely entirely on Tailwind classes to force a clean slate. |
| **State Trapped in Modals** | MEDIUM | Refactor `<Sheet>` components to be route-driven wrappers. Update all `onClick` handlers to `Link` components. |
| **Map Rendering Broken** | LOW | Wrap map in an iframe (temporary) or apply aggressive CSS resets specific to the map container class. |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Data Density Loss | Phase 1: Foundation | UX review on desktop vs mobile for load tables. |
| Map Component Breakage | Phase 2: Core Refactor | Map renders flawlessly with popups intact after Tailwind preflight. |
| State Trapped in Modals | Phase 3: UX Enhancements | Deep-linking a load detail URL successfully opens the slide-over. |
| Unvirtualized Tables | Phase 3: UX Enhancements | Lighthouse / Performance profiling with 500+ mock rows. |
| One-Size-Fits-All Layout | Phase 1: Foundation | Separate entry points/layouts for `/trucker/*` and `/business/*`. |

## Sources

- Tailwind CSS Documentation (Preflight overrides)
- shadcn/ui Community Discussions (Data table density)
- React Router Documentation (Route-driven modals)
- Logistics UX/UI Best Practices (High-density data, mobile-first dispatch)

---
*Pitfalls research for: Freight Logistics Platform UI*
*Researched: 2026-03-06*
