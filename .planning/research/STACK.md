# Stack Research

**Domain:** Freight Logistics Platform UI (SaaS)
**Researched:** 2026-03-06
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| tailwindcss | 4.2.1 | Utility-first CSS | The absolute standard for modern SaaS UI. Version 4 provides massive performance gains with the new Oxide engine and native Vite support. |
| @tailwindcss/vite | 4.2.1 | Build integration | Direct integration into Vite (removes PostCSS overhead), significantly improving build times for React SPA applications. |
| shadcn/ui | CLI latest | Component Library | Provides enterprise-grade, accessible components that you own and can fully customize. Unmatched developer experience and a highly polished, high-trust SaaS aesthetic. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @radix-ui/react-* | 1.x.x | Headless UI primitives | The underlying accessible logic for most shadcn/ui components (e.g., Dialog for modals, Sheet for slide-overs). |
| clsx | 2.1.1 | Class composition | Conditionally joining class names together dynamically. |
| tailwind-merge | 3.5.0 | Style resolution | Prevents style conflicts when overriding Tailwind utility classes in custom components. Essential for reusable component libraries. |
| lucide-react | 0.577.0 | Iconography | Standard icon set for shadcn/ui. Highly consistent, professional, and customizable SVG icons. |
| @tanstack/react-table | 8.21.3 | Data Grids | Building complex, interactive data tables (sorting, filtering, pagination) for load management and administrative overviews. |
| react-hook-form | 7.71.2 | Form Management | High-performance, unopinionated form state management for load posting and trucker onboarding forms. |
| zod | 4.3.6 | Schema Validation | Type-safe form validation schemas, tightly integrated with react-hook-form via resolvers. |
| @hookform/resolvers | 5.2.2 | Form validation bridge | Connecting the Zod schema directly to the React Hook Form validation cycle. |
| recharts | 3.7.0 | Data Visualization | Displaying metrics on business and trucker dashboards. Clean, responsive SVG charting. |
| react-day-picker | 9.14.0 | Date Selection | Choosing pickup/delivery dates. Integrates cleanly with date-fns and forms the basis of the shadcn/ui Calendar. |
| date-fns | 4.1.0 | Date utility | Lightweight, modular date parsing and formatting, essential for scheduling logistics. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| npx shadcn@latest | Scaffolding components | Use to initialize the project (`init`) and to incrementally add components (`add dialog sheet table sidebar`) to `src/components/ui`. |

## Installation

```bash
# Core Styling (Tailwind v4 Vite plugin)
npm install tailwindcss @tailwindcss/vite

# Utilities for component design
npm install clsx tailwind-merge lucide-react

# Forms and Data validation
npm install react-hook-form zod @hookform/resolvers

# Interactive Tables and Charts
npm install @tanstack/react-table recharts

# Date handling
npm install date-fns react-day-picker

# Types
npm install -D @types/react @types/node
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| shadcn/ui | React Aria Components | When extremely rigorous accessibility (a11y) standards are required and you want more behavioral flexibility without DOM markup injection. |
| tailwindcss | Panda CSS | If strict build-time static extraction and type-safe CSS-in-JS APIs are prioritized over the standard Tailwind ecosystem. |
| @tanstack/react-table | AG Grid (React) | If building massive Excel-like datasets with complex pivoting and enterprise-tier features, though it's much heavier and often requires paid licensing. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Traditional CSS / SCSS | Hard to scale across teams, lacks consistency, and leads to massive, dead-code bundles over time. | tailwindcss |
| Material-UI (MUI) / AntD | Difficult to fully customize without fighting default styles. Often looks generic and bulky, failing to meet the "modern high-trust SaaS" requirement. | shadcn/ui |
| PostCSS (for Tailwind 4) | Tailwind 4 provides a native `@tailwindcss/vite` plugin which is much faster and simpler to configure. | `@tailwindcss/vite` |

## Stack Patterns by Variant

**If building Modals or Slide-overs for Load Forms:**
- Use `Dialog` (Modals) or `Sheet` (Slide-overs) from shadcn/ui.
- Because they natively handle focus-trapping, ARIA attributes, and outside-clicks, providing a seamless UX for creating/editing loads without losing map context.

**If designing standard SaaS Dashboard Layouts:**
- Use the `Sidebar` block pattern from shadcn/ui.
- Because it provides a robust, sticky side navigation structure with mobile sheet-drawer support out of the box, standardizing the UI across Trucker, Business, and Admin roles.

**If dealing with heavy Data Tables (Load Management):**
- Use `@tanstack/react-table` styled via shadcn/ui.
- Because it provides headless logic allowing 100% custom Tailwind styling while managing complex sorting, filtering, and pagination state efficiently.

**If managing complex Load Posting forms:**
- Use `react-hook-form` with `@hookform/resolvers` and `zod`.
- Because it minimizes re-renders on every keystroke and centralizes validation rules (e.g., verifying max weight, ensuring pickup date is before delivery date), which is critical for logistics data integrity.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| tailwindcss@4.2.1 | @tailwindcss/vite@4.2.1 | Required for Tailwind v4 integration with Vite. Ensure `postcss.config.js` is removed from pipeline if upgrading from an older Tailwind version. |
| @hookform/resolvers@5.2.2 | zod@4.x.x | Verify the resolver package natively supports the latest Zod 4 API changes and type signatures. |
| react-day-picker@9.14.0 | date-fns@4.1.0 | Standard combination used by modern shadcn/ui calendar components. Verify version overlaps to prevent runtime formatting errors. |

## Sources

- `npm view <package> version` — Verified current 2026 stable releases for all core and supporting libraries. (HIGH confidence)
- Official documentation patterns — Confirmed shadcn/ui relies on Radix, Lucide, and tailwind-merge as the dominant enterprise standard. (HIGH confidence)
- React 19 / Tailwind 4 Ecosystem Trends — Confirmed migration to `@tailwindcss/vite` over PostCSS as the modern Vite standard. (HIGH confidence)

---
*Stack research for: Freight Logistics Platform UI (SaaS)*
*Researched: 2026-03-06*
