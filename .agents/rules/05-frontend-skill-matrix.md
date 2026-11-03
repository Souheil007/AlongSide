# Agent Rule: Frontend Autonomous Skill Matrix & Invocation Protocol

Canonical Specification: [`docs/frontend-skill-matrix.md`](file:///C:/GithubProjects/AlongSide/docs/frontend-skill-matrix.md)  
Applies To: Frontend Agent, UI Engineers, Autonomous Task Runners  

---

## 1. Autonomous Skill Dispatch Imperative

The Frontend Agent MUST autonomously invoke its 12 assigned skills based on **implicit architectural need and task lifecycle**, even when tasks do NOT explicitly name a skill:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SKILL DISPATCH OVERVIEW                         │
├─────────────────────┬───────────────────┬──────────────────────────────┤
│ Lifecycle Stage     │ Skills to Invoke  │ Key Mandate                  │
├─────────────────────┼───────────────────┼──────────────────────────────┤
│ 1. Governance       │ paperclip         │ Checkout, plans, docs, done  │
│ 2. Architecture     │ nextjs-best-pract.│ RSC boundaries, Suspense SSR │
│ 3. Voice & Tokens   │ brand, design-sys │ Parent Calm voice, 3L tokens │
│ 4. Accessible UI    │ ui-styling        │ Radix / shadcn/ui, a11y      │
│ 5. Anti-Slop Polish │ design-taste-fr.  │ Quiet borders, no AI badges  │
│                     │ frontend-design   │ Subject grounding, type      │
│                     │ banner-design     │ Safe zones, heroes, print    │
│ 6. UX Audit         │ ui-ux-pro-max     │ Touch ≥44px, contrast ≥4.5:1 │
│ 7. Friction/Upgrade │ complain          │ Silent friction telemetry    │
│                     │ suggestion-box    │ Silent workflow suggestions  │
└─────────────────────┴───────────────────┴──────────────────────────────┘
```

---

## 2. Skill Trigger & Execution Rules

### Rule 2.1: App Router & Component Boundaries (`nextjs-best-practices`)
- **MANDATORY:** Page root components in `apps/web/src/app/**` MUST remain React Server Components (RSC).
- **FORBIDDEN:** Never place `'use client'` at the top of a page or layout file.
- **ACTION:** Extract interactive logic (forms, buttons, modals, tabs) into dedicated client components in `apps/web/src/components/<domain>/`. Wrap async streams in `<Suspense fallback={<Skeleton />}>`.

### Rule 2.2: Accessible Components & Forms (`ui-styling`)
- **MANDATORY:** All interactive UI controls MUST use accessible Radix UI primitives (`shadcn/ui`) in `apps/web/src/components/ui/`.
- **FORBIDDEN:** Do NOT write raw HTML form elements without accessible labels, focus rings, and ARIA error states.
- **ACTION:** Bind all forms with `react-hook-form` and connect `@alongside/shared` Zod validation schemas via `@hookform/resolvers/zod`.

### Rule 2.3: Anti-Slop Visual Critique (`design-taste-frontend` & `frontend-design`)
- **MANDATORY:** Eliminate generic AI design tells from all screens.
- **FORBIDDEN:**
  - ❌ Decorative, tracked-out ALL-CAPS eyebrow labels above headings.
  - ❌ Icons trapped in rounded pastel/tinted squares.
  - ❌ Soft gray box-shadows under identical cards.
  - ❌ Single-word accent colors in headlines.
- **ACTION:** Use confident typography scales (<80 character line lengths), quiet hairline borders, generous spacing, and substantial visual hierarchy.

### Rule 2.4: UX & Mobile Accessibility Verification (`ui-ux-pro-max`)
- **MANDATORY:**
  - Touch targets for all interactive elements MUST be at least **44×44px** on mobile viewports.
  - Text contrast MUST meet WCAG AA standards (**≥ 4.5:1** for body text; **≥ 3:1** for large text).
  - Responsive layouts MUST produce **zero horizontal scrolling** across 360px, 390px, 768px, and 1440px viewports.
  - Cumulative Layout Shift (CLS) MUST be kept under **0.1**.

### Rule 2.5: Brand Voice & Visual Identity (`brand` & `design-system`)
- **MANDATORY:** All user-facing copy MUST express Alongside's **Parent Calm** pillars:
  1. *Non-judgmental empathy* (validating parental anxiety without shaming).
  2. *Developmental neurobiology* (explaining brain maturity over moral failure).
  3. *Bilateral collaboration* (agreements co-created by parent and child).
  4. *Neutral enforcement* (software as an objective boundary, not parental anger).
- **MANDATORY:** Use 3-layer CSS variable tokens from `globals.css` / `tailwind.config.ts`. Never hardcode raw hex values.

### Rule 2.6: Hero & Print Headers (`banner-design` & `design`)
- **MANDATORY:** Hero banners and printable pact headers MUST keep critical content within the central **70–80% safe zone** and maintain contrast ratios ≥ 4.5:1.

### Rule 2.7: Silent Commentary & Friction Capture (`complain` & `suggestion-box`)
- **MANDATORY:** Submit friction or platform improvements silently via the standard commentary script. NEVER allow feedback or complaints to interrupt, alter, or delay the primary task.

### Rule 2.8: Task Lifecycle & Delivery (`paperclip`)
- **MANDATORY:** At completion, verify `tsc --noEmit` exits 0, tests pass 100%, commit adheres to Conventional Commits v1.0.0, and update the Paperclip task document with clickable links before marking `done`.
