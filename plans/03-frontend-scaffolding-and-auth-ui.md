# Plan 03: Next.js 15 PWA Scaffolding, ParentCalm Design System & Auth UI
**Plan ID:** `PLAN-03`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-01  
**Estimated Scope:** Medium  
**Status:** Completed & Verified  

---

## 1. Objective & Business Value

Scaffold the `apps/web/` application using Next.js 15 (App Router, React 19), Tailwind CSS v3.4, and Radix UI / `shadcn/ui` configured with the empathetic "Parent Calm" design system palette. Implement the public marketing landing page, PWA offline manifest, and complete authentication flows (Login, Register for 7-day trial, Forgot Password) connecting to `@alongside/shared` validation schemas.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Section 1: Vision & Pillars, Section 5: Trial Onboarding)
- **Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md) (Client Layer)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Section 2: Auth Endpoints)
- **Code Quality & Design Standards:** [`docs/engineering-standards/code-quality-principles.md`](../docs/engineering-standards/code-quality-principles.md)
- **Agent Boundaries:** [`AGENTS.md`](../AGENTS.md) (Frontend Engineer Scope)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-01` completed (`packages/shared` types and schemas available via monorepo workspace).
- **Verification:** Run `npm run typecheck --workspace=@alongside/shared` to verify schemas.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Next.js 15 & PWA Scaffolding
1. Scaffold `apps/web/package.json` with Next.js 15, React 19, `@ducanh2912/next-pwa`, `tailwind-merge`, `clsx`, `lucide-react`, `zustand`, `@tanstack/react-query`.
2. Configure `apps/web/next.config.mjs` with PWA plugin enabling service worker caching for static assets and offline navigation.
3. Configure `apps/web/public/manifest.json` with Alongside brand metadata ("Parent Calm" theme color `#0D9488`, icons, standalone display).

### Task 2: Implement "Parent Calm" Design System & Primitives
1. Configure `apps/web/tailwind.config.ts` with empathetic design tokens:
   - Primary: Sage/Teal (`#0D9488`, `#14B8A6`, `#F0FDFA`)
   - Neutral: Warm Gray/Slate (`#1E293B`, `#64748B`, `#F8FAFC`)
   - Accent: Warm Amber / Sunset Gold (`#F59E0B`, `#FEF3C7`)
2. Implement primitive components in `apps/web/src/components/ui/`:
   - `Button.tsx`, `Input.tsx`, `Card.tsx`, `Dialog.tsx`, `Tabs.tsx`, `Badge.tsx`.

### Task 3: API Client & Auth State Management
1. Implement `apps/web/src/lib/api/client.ts` with custom fetch wrapper handling cookie credentials (`credentials: 'include'`), JSON deserialization, and standard error toasts.
2. Implement `apps/web/src/lib/api/auth.ts` wrapping `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `GET /api/v1/auth/me`.
3. Implement `apps/web/src/hooks/useAuth.ts` using TanStack Query to manage authenticated user state.

### Task 4: Public Marketing Landing & Auth Pages
1. Implement `apps/web/src/app/page.tsx` (Executive landing page highlighting the 5 pillars, Road 1 vs Road 2 preview, and 7-day risk-free trial CTA).
2. Implement `apps/web/src/app/(auth)/register/page.tsx` with React Hook Form, `@hookform/resolvers/zod`, and `RegisterUserSchema`.
3. Implement `apps/web/src/app/(auth)/login/page.tsx` with `LoginUserSchema`.
4. Implement navigation header (`apps/web/src/components/shared/Header.tsx`) and responsive mobile drawer.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [x] `apps/web/package.json`
- [x] `apps/web/tsconfig.json`
- [x] `apps/web/next.config.mjs`
- [x] `apps/web/tailwind.config.ts`
- [x] `apps/web/public/manifest.json`
- [x] `apps/web/src/styles/globals.css`
- [x] `apps/web/src/components/ui/Button.tsx`
- [x] `apps/web/src/components/ui/Input.tsx`
- [x] `apps/web/src/components/ui/Card.tsx`
- [x] `apps/web/src/components/ui/Badge.tsx`
- [x] `apps/web/src/components/ui/Dialog.tsx`
- [x] `apps/web/src/components/ui/Tabs.tsx`
- [x] `apps/web/src/components/shared/Header.tsx`
- [x] `apps/web/src/components/shared/Footer.tsx`
- [x] `apps/web/src/components/providers/QueryProvider.tsx`
- [x] `apps/web/src/components/providers/Providers.tsx`
- [x] `apps/web/src/components/auth/LoginForm.tsx`
- [x] `apps/web/src/components/auth/RegisterForm.tsx`
- [x] `apps/web/src/lib/utils.ts`
- [x] `apps/web/src/lib/api/client.ts`
- [x] `apps/web/src/lib/api/auth.ts`
- [x] `apps/web/src/hooks/useAuth.ts`
- [x] `apps/web/src/app/layout.tsx`
- [x] `apps/web/src/app/page.tsx`
- [x] `apps/web/src/app/(auth)/login/page.tsx`
- [x] `apps/web/src/app/(auth)/register/page.tsx`
- [x] `apps/web/test/auth.form.test.ts`
- [x] `apps/web/test/client.test.ts`
- [x] `apps/web/test/utils.test.ts`

---

## 6. Acceptance Criteria & Verification Plan

1. **Frontend Compilation:**
   ```bash
   npm run typecheck --workspace=@alongside/web
   ```
   *Pass criteria:* Clean compilation with zero TypeScript errors.
2. **Next.js Production Build:**
   ```bash
   npm run build --workspace=@alongside/web
   ```
   *Pass criteria:* Successful production build with generated PWA service worker.
3. **Form Validation Verification:**
   *Pass criteria:* Registration form displays inline Zod error messages when submitting invalid email or weak password.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Frontend Agent.
- ❌ **DO NOT** edit or create files in `apps/api/` or `packages/database/`.
- ❌ **DO NOT** write backend routes or SQL queries.
- ✅ Work exclusively inside `apps/web/`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [x] All deliverables created and located in correct directories.
- [x] Design follows "Parent Calm" aesthetic with accessible Radix primitives.
- [x] `npm run typecheck` exits with code 0.
- [x] `npm run build` exits with code 0.
- [x] All commits follow Conventional Commits (`feat(web): ...`).
