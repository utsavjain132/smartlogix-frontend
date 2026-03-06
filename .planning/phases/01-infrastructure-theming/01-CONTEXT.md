# Phase 1: Infrastructure & Theming - Context

**Gathered:** 2026-03-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Establishing the foundational styling system using Tailwind CSS v4 and shadcn/ui primitives, defining the global color and typography tokens, and removing legacy CSS files. This sets up the infrastructure for downstream feature development.

</domain>

<decisions>
## Implementation Decisions

### Color Palette & Theming
- Migrate to a modern, high-trust SaaS palette (Deep Blues/Slate) replacing the legacy Teal/Mint theme.
- Claude's Discretion: Select specific Tailwind-native hex codes that ensure high contrast for data-dense dashboards.

### Typography
- Upgrade to an enterprise-grade font optimized for data density (Inter or Poppins).
- Claude's Discretion: Finalize exact font families, weights, and leading rules.

### Component Styling
- Strictly adopt `shadcn/ui` components based on Radix UI primitives.
- Use default shadcn styles and behaviors out-of-the-box to accelerate development.

### CSS Cleanup Strategy
- Remove legacy `.css` files *completely* from the codebase.
- Ensure component migrations map legacy CSS classes functionally over to Tailwind utility classes so the UI does not visually break during the transition.
- Use native `@tailwindcss/vite` plugin (already configured); no need for PostCSS.

### Claude's Discretion
- Exact Tailwind utility mappings for complex legacy CSS structures.
- Spacing scales (paddings/margins) to ensure the UI feels modern and not cramped.

</decisions>

<specifics>
## Specific Ideas

- The goal is a true "SaaS" feel, moving away from older bootstrap-style dense layouts to clean, component-based views.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `vite.config.js` is already configured for native `@tailwindcss/vite` integration.
- Legacy PostCSS dependencies exist in `package.json` but are unused and can be safely purged.

### Established Patterns
- Existing components use `.css` file imports extensively (`Navbar.css`, `Home.css`, etc.). These need to be stripped and converted inline.

### Integration Points
- `src/index.css` and `src/App.css` contain globals that need migrating to standard Tailwind `@layer base` definitions.
- `index.html` needs any global font imports updated.

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-infrastructure-theming*
*Context gathered: 2026-03-06*
