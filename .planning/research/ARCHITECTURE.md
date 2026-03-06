# Architecture Research

**Domain:** Freight Logistics Platform UI (React SPA)
**Researched:** 2026-03-06
**Confidence:** HIGH

## Standard Architecture

### System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                       Routing & Auth                         │
│                    (react-router-dom)                        │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌───────────────────┐  ┌───────────────┐    │
│  │ Public App │  │ Business Dashboard│  │Trucker Dash   │    │
│  └────┬───────┘  └───────┬───────────┘  └───────┬───────┘    │
│       │                  │                      │            │
├───────┴──────────────────┴──────────────────────┴────────────┤
│                    Feature Components                        │
│   (Load Tables, Maps, Modals, Forms, Stats Cards)            │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐     │
│  │               Shared UI Primitives                   │     │
│  │          (shadcn/ui + Tailwind CSS + Radix)          │     │
│  └───────────────────────┬─────────────────────────────┘     │
├──────────────────────────┴──────────────────────────────────┤
│                     Data & API Layer                         │
│  ┌──────────────┐  ┌────────────────┐  ┌────────────────┐    │
│  │ Auth State   │  │  src/services/ │  │ Form Management│    │
│  │ (Context)    │  │     api.js     │  │ (React Hook    │    │
│  └──────────────┘  └────────────────┘  │  Form + Zod)   │    │
└────────────────────────────────────────┴────────────────┘
```

### Component Boundaries & Responsibilities

| Layer / Component | Responsibility | Typical Implementation |
|-------------------|----------------|------------------------|
| **App Shell** | Global layout, routing configuration, authentication guards. | `react-router-dom`, React Context Providers, Root Layout wrappers. |
| **Layouts** | Role-specific scaffolding (sticky sidebars, responsive navbars, headers). | Custom React components using Tailwind flex/grid; Mobile uses shadcn `Sheet`. |
| **Domain Views** | Page-level components assembling features for specific routes (e.g., Load Board). | React components handling data fetching via `api.js` and managing local state. |
| **Smart Components** | Complex UI elements handling domain logic (e.g., Load Form Modal, Map View). | Combines UI primitives with domain logic (Zod validation, API submission). |
| **UI Primitives** | Dumb, stateless UI building blocks. Strict adherence to design system. | `shadcn/ui` components (built on Radix Primitives + Tailwind). |
| **Data Access** | Fetching and updating server state. | Existing `src/services/api.js`. |

## Recommended Project Structure

When migrating an existing React SPA to a modern component-driven structure, isolating the UI primitives from domain features is critical.

```text
src/
├── components/         # Shared UI and generic components
│   ├── ui/             # shadcn/ui primitives (auto-generated)
│   ├── layout/         # Shell components (Sidebar, Navbar, Layout wrappers)
│   └── shared/         # Reusable generic components (e.g., Logo, Loader)
├── features/           # Domain-specific modules
│   ├── auth/           # Login, Signup, Role Guard
│   ├── loads/          # Load board, Create Load modal, Load details
│   ├── map/            # Map integration wrapper
│   └── dashboard/      # Role-specific dashboard views
├── hooks/              # Custom React hooks (e.g., useMediaQuery, useAuth)
├── services/           # Existing API layer
│   └── api.js          # (Preserved per project constraints)
├── lib/                # Utility functions
│   └── utils.js        # Tailwind merge utilities (clsx, twMerge)
└── App.jsx             # Root router and providers
```

### Structure Rationale

- **`components/ui/`**: Keeps all vendor-like UI primitives (shadcn) isolated. This ensures they don't get tangled with business logic.
- **`features/`**: Groups code by domain rather than file type. A feature folder contains its own components, specific hooks, and sub-routing, making the app easier to navigate as it grows.
- **`services/api.js`**: Kept intact to satisfy the strict constraint of not breaking existing API connections.

## Suggested Build Order (Dependencies)

To ensure a smooth transition without breaking the existing application, the UI revamp should be built sequentially based on dependencies. This directly informs the roadmap phases:

1. **Phase 1: Foundation & Primitives (Infrastructure)**
   - *Action:* Install Tailwind CSS, configure `shadcn/ui`, set up `lib/utils.js`. Generate base UI components (Button, Input, Card, Dialog, Table, Sheet).
   - *Why:* All future layouts and features depend on these core styling building blocks. Must be done first.

2. **Phase 2: Global Layouts (App Shell)**
   - *Action:* Build the responsive Layout shell (Sidebar, Header, Mobile Navigation using Sheet).
   - *Why:* Establishes the spatial boundaries and navigation structure for the domain views.

3. **Phase 3: Public & Auth Views (Bottom-Up Migration)**
   - *Action:* Revamp Landing Page and Auth pages (Login/Register).
   - *Why:* Lowest complexity, isolated from deep business logic, tests the new design system before tackling complex data.

4. **Phase 4: Core Domain Features (Complex UI)**
   - *Action:* Migrate the Freight Loads management (Data tables, filtering, Create/Edit modals). Revamp role-specific dashboards (Stats cards, recent activity).
   - *Why:* High complexity. Depends heavily on Dialogs, Tables, and Form validation established in previous phases.

5. **Phase 5: Map Integration & Polish**
   - *Action:* Wrap the existing mapping component in the new UI layout.
   - *Why:* Requires careful handling to ensure Tailwind doesn't conflict with map library CSS (e.g., Leaflet/Mapbox). Best done last when surrounding UI is stable.

## Data Flow

### Request Flow (Forms & Actions)

```text
[User Action] (e.g., "Post Load" Button in modal)
    ↓
[UI Form Component] (shadcn Form / React Hook Form)
    ↓ (validates)
[Schema] (Zod)
    ↓ (if valid)
[Feature Handler] (Calls existing `api.js`)
    ↓
[API Service] → [Backend API]
    ↓
[State Update] (Triggers React re-render or Toast notification)
```

### State Management Flow

```text
[Auth Context Provider]
    ↓ (provides Role & User Data)
[Role Guards / Router]
    ↓ (renders appropriate Dashboard)
[Dashboard View]
    ↓ (fetches data via `api.js` on mount)
[Local React State]
    ↓ (passes data as props)
[UI Primitives] (Tables, Cards)
```

### Key Data Flows

1. **Authentication & RBAC:** User logs in → API returns token & role → AuthContext updates → Router redirects to Business/Trucker/Admin dashboard layout.
2. **Freight Operations:** User opens "Create Load" dialog (UI State) → submits form → API call fires → On success, Modal closes and Load Table refetches data (Server State).

## Integration Points & Constraints

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **UI Primitives ↔ Domain Logic** | Props | UI primitives (`components/ui`) MUST remain "dumb" (no API calls, no domain logic). They only receive props and emit events (callbacks). |
| **Forms ↔ API Services** | Async Functions | Forms handle their own internal validation state. Only validated data is passed to `src/services/api.js`. |

## Anti-Patterns to Avoid

### Anti-Pattern 1: Leaking Business Logic into UI Primitives
**What people do:** Modifying a `shadcn/ui` Button or Table component to directly call `api.post('/load')`.
**Why it's wrong:** Breaks component reusability and makes the UI layer tightly coupled to the backend, hindering future updates.
**Do this instead:** Keep UI primitives in `components/ui` strictly presentational. Pass `onClick` or `onSubmit` handlers down from the Feature components.

### Anti-Pattern 2: Replacing `api.js` during UI migration
**What people do:** Deciding to switch to React Query or RTK Query while concurrently rewriting the CSS/UI.
**Why it's wrong:** Violates project constraints and introduces massive regression risk by changing state management and UI at the same time.
**Do this instead:** Isolate the UI layer changes. Keep the existing `useEffect` or basic state patterns that call `api.js` intact, merely wrapping them in the new Tailwind/shadcn presentation components.

### Anti-Pattern 3: Z-Index Conflicts with Map Components
**What people do:** Using arbitrary z-indexes in Tailwind (`z-50`, `z-100`) that overlap or hide the integrated map's controls or popups.
**Why it's wrong:** Freight platforms rely heavily on maps. UI overlays (modals, slide-overs) must layer correctly over maps without obscuring interaction.
**Do this instead:** Establish a strict z-index scale in Tailwind config, or rely on Radix UI's (shadcn) portal behavior, which automatically manages stacking contexts for Dialogs and Popovers by appending them to the document body.

## Sources

- React SPA Architecture best practices
- `shadcn/ui` documentation & integration guides
- Tailwind CSS design system patterns
- *Project Context constraints (preserving API/Router layer)*

---
*Architecture research for: Freight Logistics Platform UI*
*Researched: 2026-03-06*
