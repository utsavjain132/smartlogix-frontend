# Phase 2: App Shells & Layouts - Research

**Researched:** 2026-03-06
**Domain:** React layout architecture, Tailwind CSS v4, shadcn/ui Shell patterns
**Confidence:** HIGH

---

## Summary

Phase 2 builds role-aware, responsive navigation shells over the existing page components — without touching backend wiring. The app currently renders a global `<Navbar>` in `App.jsx` that wraps every route uniformly. The new shells replace this with **per-role layout wrappers**: a sticky sidebar for Business/Admin on desktop, and a mobile-first drawer/hamburger for Truckers. The existing `<Navbar>` stays for the public pages (Home, Login, Signup), but gets de-teal-ified.

The two highest-risk concerns are: (1) **layout wrapping strategy** — choosing the right mechanism to inject a shell around existing page components without rewriting them; and (2) **sidebar CSS mechanics** — sticky + full-height + scrollable main content requires a careful flex/grid parent that doesn't conflict with the existing `min-h-screen` root div in `App.jsx`. Everything else (Home redesign, auth card centering, navbar color fix) is straightforward CSS-only work.

The project already has Tailwind v4 CSS variables configured with dedicated `--sidebar-*` tokens, shadcn/ui installed (new-york style, JSX), Vitest + Testing Library wired up, and a localStorage mock in `tests/setup.js`. No new npm packages are strictly required for Phase 2 except `shadcn/ui Sheet` (Radix Dialog-based slide-over) which must be added via CLI.

**Primary recommendation:** Use a **layout component pattern** (`<DashboardShell>`, `<TruckerShell>`) rendered conditionally in `App.jsx` via route wrapping — not HOCs, not Context. Wrap existing page content inside the shell's main area; the shell owns only chrome (sidebar, header bar). This is the cleanest approach that keeps pages self-contained.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| LAYT-01 | Sticky sidebar navigation layout for Business and Admin dashboards (Desktop) | Tailwind `sticky top-0 h-screen` sidebar pattern, flex parent with `overflow-y-auto` main; sidebar CSS tokens already defined in `index.css` |
| LAYT-02 | Mobile-first bottom navigation or hamburger layout for Trucker dashboard | shadcn Sheet component for slide-over drawer; bottom nav bar pattern with fixed positioning; Sheet requires `npx shadcn add sheet` |
| LAYT-03 | Redesign public Landing Page (Home.jsx) with modern SaaS aesthetic, strong CTAs, and feature cards | Replace teal palette references with `text-primary`/`bg-primary`; restructure hero section; feature cards already grid-structured, need design token alignment |
| LAYT-04 | Redesign Auth pages (Login, Signup) into centered, clean card layouts | Both pages already use `Card` from shadcn and are centered — refinement needed: background treatment, vertical centering for short viewports, brand mark above card |
</phase_requirements>

---

## Standard Stack

### Core (already installed — no new installs needed except Sheet)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS v4 | 4.1.16 | Utility-first layout styling | Already configured via `@tailwindcss/vite` plugin |
| shadcn/ui | new-york style | Pre-built accessible components (Sheet, Separator, Avatar, Badge) | Already installed, `@/` alias wired, `cn()` utility available |
| Lucide React | 0.548.0 | Navigation icons (Menu, X, LayoutDashboard, Truck, Shield, LogOut) | Already installed |
| React Router DOM | 6.30.1 | Nested route layout wrappers | Already installed, `<Outlet>` pattern available |
| Radix UI (via shadcn) | Various | Accessible primitives for Sheet/Dialog | Already in node_modules via shadcn components |

### New Installs Required

| Library | Install Command | Purpose |
|---------|----------------|---------|
| shadcn Sheet | `npx shadcn@latest add sheet` | Mobile slide-over drawer for Trucker nav |
| shadcn Separator | `npx shadcn@latest add separator` | Visual divider in sidebar nav sections |
| shadcn Avatar | `npx shadcn@latest add avatar` | User avatar in sidebar header |
| shadcn Badge | `npx shadcn@latest add badge` | Role badge display (optional) |
| shadcn ScrollArea | `npx shadcn@latest add scroll-area` | Scrollable sidebar nav if many items (optional) |

**Installation (run all at once):**
```bash
npx shadcn@latest add sheet separator avatar badge scroll-area --yes
```

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| shadcn Sheet for mobile | Custom `<dialog>` | Sheet provides accessible focus trapping, ESC key, overlay click-close out of the box |
| Layout component pattern | React Router Outlet/nested routes | Outlet is cleaner architecturally but requires refactoring all 6 routes in App.jsx; layout components are a drop-in wrapping approach with less churn |
| CSS sticky sidebar | shadcn `<Sidebar>` component | shadcn Sidebar is a heavy compound component with its own context/state; overkill for this SPA — raw Tailwind CSS is simpler and sufficient |
| Bottom nav for Truckers | Hamburger top nav | Bottom nav is more mobile-native, thumb-friendly; however hamburger Sheet is adequate and simpler given Truckers have few nav items |

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn primitives (existing)
│   ├── Navbar.jsx             # MODIFY: fix teal → bg-primary
│   ├── ProtectedRoute.jsx     # UNCHANGED
│   ├── MapComponent.jsx       # UNCHANGED
│   ├── DashboardShell.jsx     # NEW: Business + Admin sticky sidebar shell
│   └── TruckerShell.jsx       # NEW: Trucker mobile-first shell
├── pages/
│   ├── Home.jsx               # MODIFY: replace teal with design tokens
│   ├── LoginPage.jsx          # MODIFY: minor centering + brand mark
│   ├── SignupPage.jsx         # MODIFY: minor centering + brand mark
│   ├── BusinessDashboard.jsx  # MODIFY: remove outer padding/bg (shell owns it)
│   ├── AdminDashboard.jsx     # MODIFY: remove outer padding/bg (shell owns it)
│   └── TruckerDashboard.jsx   # MODIFY: remove outer padding/bg (shell owns it)
└── App.jsx                    # MODIFY: wrap dashboard routes with shells
```

### Pattern 1: Layout Component Shell (Recommended)

**What:** A wrapper component that renders sidebar + main area, accepts `{children}` for the page content.

**When to use:** When existing pages need chrome added without page rewrites. Shell owns the nav; page owns the data.

**Example:**
```jsx
// src/components/DashboardShell.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard, Package, Users, Settings, LogOut, Menu, X
} from 'lucide-react';

const DashboardShell = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const navItems = role === 'ADMIN'
    ? [
        { label: 'Overview', icon: LayoutDashboard, href: '/admin-dashboard' },
        { label: 'Users', icon: Users, href: '/admin-dashboard' },
        { label: 'All Loads', icon: Package, href: '/admin-dashboard' },
      ]
    : [
        { label: 'My Loads', icon: Package, href: '/business-dashboard' },
      ];

  return (
    // Full-viewport flex container — critical for sticky sidebar
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar — hidden on mobile, visible md+ */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 flex-col',
        'bg-sidebar text-sidebar-foreground',
        'border-r border-sidebar-border',
        'transition-transform duration-300',
        // Desktop: always visible
        'md:relative md:translate-x-0 md:flex',
        // Mobile: controlled by sidebarOpen state
        sidebarOpen ? 'flex translate-x-0' : '-translate-x-full md:flex'
      )}>
        {/* Brand */}
        <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2 font-bold text-sidebar-foreground text-lg">
            🚛 SmartLogix
          </Link>
        </div>
        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.href + item.label}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>
        <Separator className="bg-sidebar-border" />
        {/* Logout */}
        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar — mobile hamburger + desktop breadcrumb */}
        <header className="flex h-16 items-center gap-4 border-b border-border bg-card px-6 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <span className="text-sm font-medium text-muted-foreground capitalize">
            {role === 'ADMIN' ? 'Admin Control Center' : 'Business Dashboard'}
          </span>
        </header>
        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;
```

**Usage in App.jsx:**
```jsx
// Wrap the ProtectedRoute in App.jsx:
<Route
  path="/business-dashboard"
  element={
    <ProtectedRoute allowedRole="BUSINESS">
      <DashboardShell role="BUSINESS">
        <BusinessDashboard />
      </DashboardShell>
    </ProtectedRoute>
  }
/>
```

### Pattern 2: Trucker Shell with Sheet (Mobile Hamburger Drawer)

**What:** A minimal top-header shell with a hamburger button that opens a Sheet (shadcn Radix Dialog-based slide-over) for navigation.

**When to use:** Trucker UI is primarily mobile. No persistent sidebar — navigation is behind a hamburger or can be a bottom nav bar.

**Example:**
```jsx
// src/components/TruckerShell.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, LogOut, Package, MapPin } from 'lucide-react';

const TruckerShell = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-card px-4 shrink-0">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle>
                <Link to="/" className="flex items-center gap-2 font-bold text-lg">
                  🚛 SmartLogix
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 space-y-1">
              <Link
                to="/trucker-dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                <Package className="h-4 w-4" />
                My Jobs
              </Link>
              <Link
                to="/trucker-dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                <MapPin className="h-4 w-4" />
                Find Loads
              </Link>
            </nav>
            <div className="absolute bottom-6 left-4 right-4">
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <span className="font-semibold text-foreground">Trucker Dashboard</span>
      </header>
      <main className="flex-1 p-4 md:p-6">
        {children}
      </main>
    </div>
  );
};

export default TruckerShell;
```

### Pattern 3: Sticky Sidebar CSS Mechanics

**What:** The critical Tailwind pattern for a sidebar that stays fixed while main content scrolls.

**The key:** The root container must be `h-screen overflow-hidden`. The sidebar uses `sticky top-0 h-screen` or `h-full`. The main content uses `flex-1 overflow-y-auto`.

```jsx
// CORRECT: Full-height flex layout
<div className="flex h-screen overflow-hidden">          {/* Root: viewport height, no scroll */}
  <aside className="w-64 h-full overflow-y-auto sticky top-0 bg-sidebar">  {/* Sidebar: full height, own scroll */}
    {/* nav items */}
  </aside>
  <main className="flex-1 overflow-y-auto">              {/* Content: takes remaining width, scrolls */}
    {/* page content */}
  </main>
</div>

// WRONG: This breaks sticky behavior
<div className="min-h-screen">                           // ❌ min-h-screen on root causes layout to exceed viewport
  <aside className="sticky top-0">                       // ❌ sticky won't work without a scrolling parent
```

**Critical:** `App.jsx` currently wraps everything in `<div className="text-center min-h-screen bg-[#f4f7f6]">`. This must be modified for dashboard routes — the shell must be the direct child of `<Router>`, not nested inside this wrapper. Options:
1. Move the wrapper div inside `<Routes>` for public pages only
2. Remove the wrapper from `App.jsx` and let each layout/page own its own background

**Recommended:** Option 2 — remove the root `bg-[#f4f7f6]` and `text-center` from `App.jsx` and let `bg-background` from `body { @apply bg-background }` in `index.css` handle the default. This is already correctly set up.

### Pattern 4: Navbar Color Token Fix

**What:** Replace all hardcoded `bg-[#00796b]` (teal) with `bg-primary` across `Navbar.jsx` and `Home.jsx`.

**Current problem in Navbar.jsx:**
```jsx
// BEFORE (hardcoded teal — Phase 1 leftover)
<Button asChild className="bg-[#00796b] hover:bg-[#006054] text-white">

// AFTER (design token)
<Button asChild variant="default">
  {/* shadcn Button default variant already = bg-primary text-primary-foreground */}
```

Since the shadcn Button `default` variant is already `bg-primary text-primary-foreground`, removing the className override is sufficient. For the ghost/outline variant on the navbar links, use `variant="ghost"` or no override.

### Pattern 5: Landing Page SaaS Redesign

**What:** Replace teal color references in `Home.jsx` with design tokens. Modernize hero typography and CTA styling. The structure (hero, features grid, CTA section, footer) is already solid.

**Key changes needed:**
```jsx
// Replace teal hardcodes with tokens:
// text-teal-900 → text-foreground
// text-teal-700 → text-muted-foreground
// bg-[#00796B] → bg-primary
// bg-gradient-to-br from-[#00796B] to-[#004D40] → bg-gradient-to-br from-primary to-primary/80
// border-teal-100 → border-border

// Feature card icon color:
// color="#2563EB" (hardcoded blue) → use className="text-primary" on the icon wrapper
// <Bot size={48} color="#2563EB" /> → <Bot size={48} className="text-primary" />
// Note: Lucide icons accept className for color via currentColor
```

**Hero enhancement:** Add a subtle radial gradient background to the hero section and increase heading contrast using `text-foreground`.

### Pattern 6: Auth Page Layout Refinement

**What:** `LoginPage.jsx` and `SignupPage.jsx` already use `shadcn Card` and are centered with `flex items-center justify-center min-h-screen bg-slate-50`. This is 90% correct. Two refinements needed:
1. Replace `bg-slate-50` with `bg-background` (design token)
2. Add a brand logo/name above the card for visual anchoring

```jsx
// CURRENT (works but not on theme)
<div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
  <Card className="w-full max-w-md shadow-lg">

// IMPROVED
<div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 gap-6">
  {/* Brand mark above card */}
  <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-foreground">
    🚛 SmartLogix
  </Link>
  <Card className="w-full max-w-md shadow-lg border-border">
```

### Anti-Patterns to Avoid

- **`min-h-screen` on the root div in App.jsx:** Breaks sticky sidebar. Remove it from the root wrapper; each shell/page owns its own height strategy.
- **Sidebar with `position: fixed` without accounting for main content offset:** If sidebar is truly `fixed`, the main content needs `ml-64` on desktop. The `sticky` + flex approach avoids this entirely.
- **Using `overflow-hidden` on the sidebar container:** The sidebar itself needs `overflow-y-auto` if it has many items; the root flex container gets `overflow-hidden`.
- **Hardcoding sidebar width in pixel classes without responsive hiding:** Always pair `w-64` with `hidden md:flex` for the sidebar; use `md:ml-64` for main offset if using fixed positioning.
- **Putting ToastContainer inside a shell:** It's already in `App.jsx` above the shells, which is correct. Don't move it inside shell children.
- **Setting `text-center` on the App root:** Currently set in App.jsx. This propagates `text-align: center` to dashboard tables and breaks layout. Must be removed.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Mobile slide-over drawer | Custom CSS drawer/modal | `shadcn Sheet` (Radix Dialog) | Focus trapping, ESC key, ARIA roles, overlay, animations all handled |
| Icon buttons | SVG inline + button | Lucide React (already installed) | Consistent sizing, accessible, tree-shakable |
| CSS variable theming for sidebar | Custom CSS classes | Tailwind `bg-sidebar`, `text-sidebar-foreground` via `--sidebar-*` vars | Already defined in `index.css` with correct oklch values |
| Responsive sidebar show/hide | Media query JavaScript | Tailwind `md:flex hidden` + CSS transition | Pure CSS, no JS resize listener needed |
| Utility class merging | String concatenation | `cn()` from `@/lib/utils` | Handles conditional classes + tailwind-merge conflict resolution |

**Key insight:** The entire sidebar color scheme is already designed — `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-accent`, `--sidebar-border` are all in `index.css`. Use `bg-sidebar`, `text-sidebar-foreground`, `hover:bg-sidebar-accent` Tailwind classes directly.

---

## Common Pitfalls

### Pitfall 1: App.jsx Root `text-center` Breaking Dashboard Tables

**What goes wrong:** `App.jsx` line 17 has `text-center` on the root div. This centers all text including table cells, header content in the sidebar, and form labels inside dashboards.
**Why it happens:** Legacy styling from before the sidebar layout was conceived.
**How to avoid:** Remove `text-center` and `bg-[#f4f7f6]` from the App.jsx root div. The body background is now handled by `bg-background` in `index.css`.
**Warning signs:** Sidebar nav labels, table column headers, and form fields appearing center-aligned.

### Pitfall 2: Sticky Sidebar Not Sticking

**What goes wrong:** Sidebar scrolls away with the page instead of staying fixed.
**Why it happens:** `sticky` positioning requires the parent element to have a defined height (not `auto` / `min-h-screen`). If the root is `min-h-screen`, the parent grows with content and `sticky top-0 h-screen` loses its anchor.
**How to avoid:** Root shell div must be `h-screen overflow-hidden`. Main content area gets `overflow-y-auto`. Test by setting content taller than the viewport.
**Warning signs:** Sidebar disappears when scrolling long load tables.

### Pitfall 3: shadcn Sheet Not Available (Not Installed)

**What goes wrong:** `import { Sheet } from '@/components/ui/sheet'` throws a module not found error.
**Why it happens:** Sheet is not in the current `src/components/ui/` directory (only button, card, input, label, radio-group are installed).
**How to avoid:** Run `npx shadcn@latest add sheet separator avatar badge --yes` before implementing TruckerShell.
**Warning signs:** Build error on Sheet import.

### Pitfall 4: `h-screen` Inside a Parent That Already Has `h-screen`

**What goes wrong:** Double `h-screen` causes 200vh total height or scroll issues.
**Why it happens:** Shell is `h-screen`, and the inner dashboard page also has `min-h-screen`.
**How to avoid:** After wrapping dashboards in shells, strip `min-h-screen`, `bg-teal-50`, `bg-gray-50`, `bg-slate-50` from the outermost div of `BusinessDashboard.jsx`, `AdminDashboard.jsx`, and `TruckerDashboard.jsx`. The shell provides the background and height.
**Warning signs:** Vertical scrollbar appears at 100% viewport with no content overflow.

### Pitfall 5: Navbar Appearing Inside Dashboard Shell

**What goes wrong:** The global `<Navbar>` renders above the dashboard shell, causing a double-header (Navbar on top, shell header below it).
**Why it happens:** `<Navbar>` is rendered unconditionally in `App.jsx` for all routes including `/business-dashboard`.
**How to avoid:** The shell has its own top header (mobile hamburger bar). The global Navbar must be **conditionally hidden for authenticated dashboard routes**. Solution: check `token` + `role` in Navbar and return `null` for dashboard routes, OR move Navbar outside the `<Routes>` but conditionally render based on route using `useLocation`.
**Warning signs:** Two header bars visible on Business/Admin/Trucker dashboards.

### Pitfall 6: Lucide Icon Color Prop vs className

**What goes wrong:** `<Bot size={48} color="#2563EB" />` hardcodes a hex color that ignores design tokens.
**Why it happens:** Lucide icons accept both `color` (SVG fill/stroke) and `className` (CSS `currentColor`).
**How to avoid:** Use `className="text-primary"` instead of `color="#2563EB"`. The icon renders via `currentColor` which picks up the CSS token.
```jsx
// WRONG
<Bot size={48} color="#2563EB" />
// RIGHT  
<Bot size={48} className="text-primary" />
```

---

## Code Examples

Verified patterns for this project:

### Using Sidebar CSS Tokens (from index.css)

```jsx
// Source: index.css sidebar vars (--sidebar, --sidebar-foreground, etc.)
// Tailwind v4 maps --color-sidebar → bg-sidebar via @theme inline block

<aside className="bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
  <nav>
    <a className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg px-3 py-2">
      Dashboard
    </a>
  </nav>
</aside>
```

### shadcn Sheet for Mobile Drawer

```jsx
// Source: shadcn/ui Sheet docs — Radix Dialog-based slide-over
// Install: npx shadcn@latest add sheet

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        {/* nav items */}
      </SheetContent>
    </Sheet>
  );
}
```

### Responsive Sidebar Toggle Pattern

```jsx
// Mobile: sidebar hidden by default, toggled via state
// Desktop: sidebar always visible via md: prefix

<aside className={cn(
  // Base: full height, positioned for transition
  'fixed inset-y-0 left-0 z-50 w-64 flex-col bg-sidebar',
  // Desktop: static, always visible
  'md:relative md:flex md:translate-x-0',
  // Mobile: depends on state
  isOpen ? 'flex translate-x-0' : 'hidden md:flex'
)}>
```

### Conditional Navbar Rendering

```jsx
// In Navbar.jsx — hide for authenticated dashboard routes
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  
  // Dashboard routes have their own shell headers
  const dashboardPaths = ['/business-dashboard', '/trucker-dashboard', '/admin-dashboard'];
  if (token && dashboardPaths.includes(location.pathname)) return null;
  
  // ... rest of navbar
};
```

### App.jsx Root Fix

```jsx
// BEFORE (breaks sticky sidebar)
<div className="text-center min-h-screen bg-[#f4f7f6] font-sans antialiased ...">

// AFTER (neutral wrapper, shells own their layout)
<div className="font-sans antialiased animate-in fade-in duration-500">
```

### Landing Page Token Replacement

```jsx
// BEFORE (hardcoded teal)
<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
<p className="text-xl text-teal-700 mb-8">
<Button asChild className="bg-[#00796B] hover:bg-[#004D40] text-white ...">
<div className="bg-gradient-to-br from-[#00796B] to-[#004D40] ...">

// AFTER (design tokens)
<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
<p className="text-xl text-muted-foreground mb-8">
<Button asChild size="lg" className="text-lg px-8 py-6 ...">  {/* default variant = bg-primary */}
<div className="bg-gradient-to-br from-primary to-primary/80 ...">
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Global Navbar for all routes | Role-aware layout shells per route group | Phase 2 | Sidebar for Business/Admin, hamburger for Trucker, original navbar for public |
| Hardcoded teal `#00796b` colors | `bg-primary` CSS token (oklch deep blue) | Phase 2 | Unified Deep Blue SaaS palette |
| `min-h-screen` root in App.jsx | `h-screen overflow-hidden` in shells | Phase 2 | Enables sticky sidebar pattern |
| No test coverage for layouts | Vitest component tests for shell rendering | Phase 2 | Validates LAYT-01 through LAYT-04 at CI level |

**Deprecated/outdated for Phase 2:**
- `bg-[#f4f7f6]` on App.jsx root: replaced by `bg-background` from body styles in index.css
- `bg-teal-50` / `bg-teal-900` / `text-teal-*` in page files: replaced by semantic design tokens
- `text-center` on App.jsx root: removed, causing alignment regressions in data tables

---

## Open Questions

1. **AdminDashboard tab state (view: stats/users/loads) vs sidebar items**
   - What we know: AdminDashboard uses `view` state and 3 buttons to switch between tabs
   - What's unclear: Should sidebar nav items for Admin trigger `setView()` inside the dashboard, or should Admin have separate routes per view?
   - Recommendation: Keep tab state inside AdminDashboard for Phase 2 (sidebar navigation items just link to `/admin-dashboard` and the existing tab buttons stay). Phase 3 can introduce sub-routes if needed.

2. **Navbar visibility logic: `useLocation` vs restructuring routes**
   - What we know: Navbar is rendered globally before `<Routes>` in App.jsx
   - What's unclear: Whether hiding Navbar via `useLocation` in the component is cleaner than restructuring App.jsx to have a "public layout" and "authenticated layout" route group
   - Recommendation: Use the `useLocation` check inside Navbar for Phase 2 — it's a 3-line change. Route restructuring is a Phase 3 concern.

3. **`DashboardShell` shared between Business and Admin vs separate components**
   - What we know: Both Business and Admin have similar sidebar structure but different nav items
   - What's unclear: One component with `role` prop vs two separate shell files
   - Recommendation: One `DashboardShell` with `role` prop determining nav items. Simpler to maintain.

---

## Validation Architecture

> `nyquist_validation: true` is set in `.planning/config.json` — this section is mandatory.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 4.0.18 + @testing-library/react 16.3.2 |
| Config file | `vite.config.js` (test block: globals: true, environment: jsdom, setupFiles: ./tests/setup.js) |
| Quick run command | `npx vitest run tests/` |
| Full suite command | `npx vitest run` |

**Existing test infrastructure:**
- `tests/setup.js` — localStorage mock, @testing-library/jest-dom matchers ✅
- `tests/App.test.jsx` — smoke test: renders Home on `/` ✅
- `tests/LoginPage.test.jsx` — login page tests ✅

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| LAYT-01 | Business/Admin sidebar renders on `/business-dashboard` and `/admin-dashboard` | Component | `npx vitest run tests/DashboardShell.test.jsx` | ❌ Wave 0 |
| LAYT-01 | Sidebar contains navigation links (My Loads, Users, etc.) | Component | `npx vitest run tests/DashboardShell.test.jsx` | ❌ Wave 0 |
| LAYT-01 | Global Navbar is NOT rendered on authenticated dashboard routes | Component | `npx vitest run tests/Navbar.test.jsx` | ❌ Wave 0 |
| LAYT-02 | TruckerShell renders hamburger button on mobile viewport | Component | `npx vitest run tests/TruckerShell.test.jsx` | ❌ Wave 0 |
| LAYT-02 | Sheet drawer opens when hamburger is clicked | Component | `npx vitest run tests/TruckerShell.test.jsx` | ❌ Wave 0 |
| LAYT-03 | Home page renders with `bg-primary` CTA button (no hardcoded teal class) | Component | `npx vitest run tests/Home.test.jsx` | ❌ Wave 0 |
| LAYT-03 | Home hero section renders heading and Get Started CTA | Component | `npx vitest run tests/Home.test.jsx` | ❌ Wave 0 |
| LAYT-04 | LoginPage renders Card centered in a min-h-screen container | Component | `npx vitest run tests/LoginPage.test.jsx` | ✅ exists |
| LAYT-04 | SignupPage renders Card with brand mark above | Component | `npx vitest run tests/SignupPage.test.jsx` | ❌ Wave 0 |

**Note on LAYT-01/02 (responsive layout):** True responsive visual testing (sidebar shows on `md:`, Sheet shows on mobile) cannot be fully automated with jsdom (no real CSS media queries). The test strategy is:
- **Structural tests:** Verify sidebar DOM element renders with correct Tailwind class strings
- **Behavioral tests:** Verify hamburger toggle opens/closes the mobile overlay
- **Manual verification:** Responsive visual check at the phase gate using browser devtools device emulation

### Sampling Rate

- **Per task commit:** `npx vitest run tests/` (all layout tests, ~5 sec)
- **Per wave merge:** `npx vitest run` (full suite including existing App + Login tests)
- **Phase gate:** Full suite green before `/gsd-verify-work`

### Wave 0 Gaps

The following test files need to be created before or alongside implementation:

- [ ] `tests/DashboardShell.test.jsx` — covers LAYT-01 (sidebar renders, nav items present, Navbar hidden on dashboard routes)
- [ ] `tests/TruckerShell.test.jsx` — covers LAYT-02 (hamburger renders, Sheet opens on click)
- [ ] `tests/Navbar.test.jsx` — covers LAYT-01 (Navbar returns null for `/business-dashboard`, `/admin-dashboard`, `/trucker-dashboard` when token present)
- [ ] `tests/Home.test.jsx` — covers LAYT-03 (hero renders, CTA present, no hardcoded teal class on CTA button)
- [ ] `tests/SignupPage.test.jsx` — covers LAYT-04 (Card renders, brand mark present)

**Test scaffolding pattern (consistent with existing tests):**
```jsx
// tests/DashboardShell.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import DashboardShell from '../src/components/DashboardShell';

describe('DashboardShell (LAYT-01)', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('role', 'BUSINESS');
  });

  it('renders sidebar with nav items', () => {
    render(
      <MemoryRouter initialEntries={['/business-dashboard']}>
        <DashboardShell role="BUSINESS"><div>content</div></DashboardShell>
      </MemoryRouter>
    );
    expect(screen.getByText('My Loads')).toBeInTheDocument();
  });

  it('renders children inside main area', () => {
    render(
      <MemoryRouter>
        <DashboardShell role="BUSINESS"><div>test-content</div></DashboardShell>
      </MemoryRouter>
    );
    expect(screen.getByText('test-content')).toBeInTheDocument();
  });
});
```

---

## Sources

### Primary (HIGH confidence)

- **Direct codebase inspection** — `src/index.css` (sidebar CSS vars confirmed), `src/components/ui/*.jsx` (installed shadcn components listed), `src/App.jsx` (routing structure), all dashboard pages
- **`package.json` + `vite.config.js`** — Vitest configured with jsdom, Testing Library installed, shadcn CLI available
- **`components.json`** — new-york style, tsx: false (JSX only), rsc: false, @/ alias confirmed

### Secondary (MEDIUM confidence)

- **shadcn/ui Sheet documentation** — Sheet component is a Radix Dialog configured as a slide-over; `side="left"` prop controls direction; `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle` are standard named exports
- **Tailwind CSS v4 responsive prefix pattern** — `md:flex`, `md:hidden` prefixes work identically to v3; no breaking changes for responsive breakpoint utilities
- **React Router DOM v6 `useLocation`** — available in functional components inside `<Router>` context; `location.pathname` returns current route string

### Tertiary (LOW confidence — validate if unusual)

- **Tailwind v4 `@theme inline` custom property mapping** — the `--color-sidebar` → `bg-sidebar` mapping works because `index.css` has `@theme inline { --color-sidebar: var(--sidebar); }`. This is a Tailwind v4 feature; verify class resolves correctly if any IDE autocomplete gaps are seen.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages confirmed via package.json, no guessing
- Architecture: HIGH — patterns derived from direct codebase inspection; pitfalls derived from actual code issues found (text-center, hardcoded teal, min-h-screen)
- Pitfalls: HIGH — all pitfalls identified from actual existing code anti-patterns
- Test strategy: MEDIUM — jsdom limitations for CSS media queries are a known constraint; workaround (class assertion) documented

**Research date:** 2026-03-06
**Valid until:** 2026-04-06 (Tailwind v4 is stable; shadcn new-york style is stable)
