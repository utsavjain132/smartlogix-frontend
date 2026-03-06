---
phase: 2
slug: app-shells-layouts
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-06
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.0.18 + @testing-library/react 16.3.2 |
| **Config file** | `vite.config.js` (test block: globals: true, environment: jsdom, setupFiles: ./tests/setup.js) |
| **Quick run command** | `npx vitest run tests/` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~8 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run tests/`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** ~8 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 2-01-01 | 01 | 0 | LAYT-01, LAYT-02, LAYT-03, LAYT-04 | unit | `npx vitest run tests/DashboardShell.test.jsx tests/TruckerShell.test.jsx tests/Navbar.test.jsx tests/Home.test.jsx tests/SignupPage.test.jsx` | ❌ Wave 0 | ⬜ pending |
| 2-02-01 | 02 | 1 | LAYT-01 | unit | `npx vitest run tests/DashboardShell.test.jsx tests/Navbar.test.jsx` | ❌ W0 | ⬜ pending |
| 2-02-02 | 02 | 1 | LAYT-01 | unit | `npx vitest run tests/DashboardShell.test.jsx` | ❌ W0 | ⬜ pending |
| 2-03-01 | 03 | 1 | LAYT-02 | unit | `npx vitest run tests/TruckerShell.test.jsx` | ❌ W0 | ⬜ pending |
| 2-04-01 | 04 | 1 | LAYT-03 | unit | `npx vitest run tests/Home.test.jsx` | ❌ W0 | ⬜ pending |
| 2-04-02 | 04 | 1 | LAYT-04 | unit | `npx vitest run tests/SignupPage.test.jsx tests/LoginPage.test.jsx` | ✅ partial | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/DashboardShell.test.jsx` — stubs for LAYT-01 (sidebar renders, nav items present, children rendered)
- [ ] `tests/TruckerShell.test.jsx` — stubs for LAYT-02 (hamburger button renders, Sheet opens on click)
- [ ] `tests/Navbar.test.jsx` — stubs for LAYT-01 (Navbar returns null for dashboard routes when token set)
- [ ] `tests/Home.test.jsx` — stubs for LAYT-03 (hero heading renders, CTA button present, no hardcoded teal class)
- [ ] `tests/SignupPage.test.jsx` — stubs for LAYT-04 (Card renders, brand mark above card present)

*Note: `tests/LoginPage.test.jsx` already exists and covers partial LAYT-04.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Sidebar remains sticky while scrolling long content lists | LAYT-01 | jsdom has no real CSS layout engine; `sticky` positioning cannot be verified programmatically | Load Business/Admin dashboard in browser, add >20 load rows, scroll page — sidebar must not scroll away |
| Responsive sidebar collapse at mobile viewport | LAYT-01 | CSS `md:hidden` / `md:flex` responsive breakpoints not evaluated in jsdom | Open DevTools, toggle to 375px width, verify sidebar is hidden and hamburger icon appears |
| Sheet slide-over animation + backdrop | LAYT-02 | Visual/animation test | Open Trucker dashboard on mobile viewport (375px), tap hamburger, verify Sheet slides in from left with backdrop overlay |
| Landing page visual SaaS aesthetic | LAYT-03 | Subjective visual quality | Open `/` in browser, verify hero section uses Deep Blue primary color (not teal), feature cards are evenly spaced |
| Auth page vertical centering on short viewports | LAYT-04 | CSS layout visual | Open `/login` at 600px height viewport, verify card is vertically centered with brand mark above |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
