---
phase: 01
slug: infrastructure-theming
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-06
---

# Phase 01 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + React Testing Library |
| **Config file** | none — Wave 0 installs |
| **Quick run command** | `npx vitest run` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run`
- **After every plan wave:** Run `npx vitest run --coverage`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | INFR-01/02 | smoke | `npx vitest run tests/App.test.jsx` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | INFR-03/04 | unit | `npx vitest run tests/LoginPage.test.jsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Install `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`
- [ ] Configure `vite.config.js` with `test` environment
- [ ] `tests/App.test.jsx` — Basic smoke test to ensure UI mounts without missing CSS imports
- [ ] `tests/LoginPage.test.jsx` — Smoke test for migrated auth form

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual Theme Match | INFR-04/05 | Requires visual inspection | Open browser and verify Deep Blues palette and Inter font visually match expectations |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
