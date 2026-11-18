# Plan 42: React Bits UI Primitives & "Parent Calm" Ambient Motion System
**Plan ID:** `PLAN-42`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-41  
**Estimated Scope:** Medium (React Bits Component Integration, Sensory Calm Design, Ambient Backgrounds & Tactile Cards)  
**Status:** In Progress  

---

## 1. Objective & Business Value

Integrate curated, high-craft interactive components inspired by [React Bits](https://reactbits.dev/) into AlongSide's frontend architecture (`apps/web/src/components/ui/`).

AlongSide's mission requires a restorative **"Parent Calm"** aesthetic: interfaces must project clinical reassurance, emotional warmth, and frictionless clarity for parents navigating high-stress situations. Rather than importing noisy cyberpunk shaders or jarring cursor effects, this plan extracts the highest-utility primitives from React Bits and rebuilds them natively with **GSAP v3.15**, **Tailwind CSS v3.4**, and **accessible Radix UI patterns**.

### Core Objectives:
1. **`SpotlightCard` Primitives:** Tactile, cursor-tracked radial glow cards for the Sunday Youth Culture Digest and 4 Developmental Pillars, elevating content without jarring transforms.
2. **`BlurText` Kinetic Typography:** Sophisticated editorial blur-to-focus staggered reveals for the Landing Page Hero and milestone celebrations.
3. **`AuroraBackground` Ambient Wash:** Multi-layer, low-frequency atmospheric aura for the Hero and 24/7 AI Child Advisor chat window that creates a soothing cocoon.
4. **`CountUp` Numerical Motion:** Accessible numerical counter tweens for First-Phone Readiness scores (0–100), habit streaks, and milestone counters.
5. **`RotatingText` Dynamic Flipper:** Accessible, smooth word-flipping carousel highlighting the breadth of developmental stages.
6. **Strict Accessibility & Reduced Motion Support:** Every component honors `prefers-reduced-motion` via `setupReducedMotionMatch()`, rendering instant, static fallbacks.
7. **Zero Speculative Bloat:** Lightweight, zero external heavy 3D canvas libraries (no Three.js / OGL dependencies), preserving fast Core Web Vitals (LCP < 1.2s, INP < 100ms).

---

## 2. Inputs & Architectural References

- **Project Scope:** [`docs/PROJECT_SCOPE.md`](../docs/PROJECT_SCOPE.md)
- **Frontend Governance & Skill Matrix:** [`docs/engineering-standards/frontend-skill-matrix.md`](../docs/engineering-standards/frontend-skill-matrix.md)
- **Codebase Design Principles:** [`docs/engineering-standards/codebase-design.md`](../docs/engineering-standards/codebase-design.md)
- **GSAP Animation Tokens:** [`apps/web/src/lib/animations/gsap.ts`](../apps/web/src/lib/animations/gsap.ts)
- **UI Components Directory:** [`apps/web/src/components/ui/`](../apps/web/src/components/ui/)

---

## 3. Preconditions & Dependency Verification

- Verify `gsap` (>=3.15.1) and `@gsap/react` (>=2.1.2) are present in `apps/web/package.json`.
- Verify `tsc --noEmit` exits 0.
- Verify Vitest suites in `apps/web` pass cleanly.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Author Reusable UI Primitives in `apps/web/src/components/ui/`
1. **`SpotlightCard.tsx`**:
   - Track mouse position relative to the card container on pointer move.
   - Render a configurable radial gradient overlay (`rgba(20, 184, 166, 0.12)` default, size `320px`).
   - Add graceful touch-device and `prefers-reduced-motion` fallback.
2. **`BlurText.tsx`**:
   - Split input text by words or letters into accessible `<span>` elements.
   - Animate from `filter: blur(10px); opacity: 0; transform: translateY(16px)` to crisp state via GSAP.
   - Support `delay`, `stagger`, `duration`, and `onComplete`.
   - Maintain `aria-label` on the parent container for screen readers.
3. **`AuroraBackground.tsx`**:
   - Soft, organic multi-hue radial gradient layers with CSS keyframe drifts and Parent Calm color tokens (teal, emerald, warm amber, indigo).
   - Inset gradient masks to blend cleanly into the background.
4. **`CountUp.tsx`**:
   - Hardware-accelerated numeric counter using GSAP `to()` on an internal proxy object.
   - Support `from`, `to`, `duration`, `delay`, `prefix`, `suffix`, and `decimals`.
5. **`RotatingText.tsx`**:
   - Seamless vertical flip / fade carousel through an array of phrases with accessible ARIA live regions.

### Task 2: Integrate into Feature Views
1. **Landing Hero Section (`apps/web/src/components/home/HeroSection.tsx`)**:
   - Integrate `AuroraBackground` ambient aura behind the central typography.
   - Enhance the main serif headline with `BlurText` entrance.
2. **Sunday Youth Culture Digest (`apps/web/src/components/digest/WeeklyMagazineView.tsx` & `DinnerConversationStarters.tsx`)**:
   - Wrap featured editorial and conversation starter cards in `SpotlightCard`.
3. **AI Child Advisor (`apps/web/src/components/advisor/FloatingAdvisorBubble.tsx`)**:
   - Apply subtle `AuroraBackground` to the chat header and conversation backdrop.

### Task 3: Comprehensive Testing & Verification
1. Author `apps/web/test/reactBitsComponents.test.tsx` covering:
   - `SpotlightCard` pointer coordinates and child rendering.
   - `BlurText` word splitting, ARIA attributes, and reduced motion.
   - `AuroraBackground` container rendering and styling.
   - `CountUp` initial and target value formatting.
   - `RotatingText` active word rendering.
2. Execute `npm run typecheck`, `npm run lint`, and `npm test`.

---

## 5. Specific Deliverables

- [ ] `plans/42-reactbits-ui-components-and-parent-calm-motion.md` (this plan)
- [ ] `plans/README.md` (updated index)
- [ ] `apps/web/src/components/ui/SpotlightCard.tsx`
- [ ] `apps/web/src/components/ui/BlurText.tsx`
- [ ] `apps/web/src/components/ui/AuroraBackground.tsx`
- [ ] `apps/web/src/components/ui/CountUp.tsx`
- [ ] `apps/web/src/components/ui/RotatingText.tsx`
- [ ] `apps/web/src/components/home/HeroSection.tsx` (enhanced with Aurora & BlurText)
- [ ] `apps/web/src/components/digest/WeeklyMagazineView.tsx` (enhanced with SpotlightCard)
- [ ] `apps/web/src/components/digest/DinnerConversationStarters.tsx` (enhanced with SpotlightCard)
- [ ] `apps/web/src/components/advisor/FloatingAdvisorBubble.tsx` (enhanced with Aurora ambience)
- [ ] `apps/web/test/reactBitsComponents.test.tsx` (headless Vitest test suite)

---

## 6. Definition of Done Checklist

- [ ] All 5 UI primitives created in `apps/web/src/components/ui/`.
- [ ] Components integrated into Hero, Digest, and Advisor touchpoints.
- [ ] All components honor `prefers-reduced-motion` and accessibility guidelines.
- [ ] `npm --prefix apps/web run typecheck` exits 0.
- [ ] `npm --prefix apps/web run test` passes 100%.
- [ ] Conventional commit created and pull request opened targeting `main` with plain text description.
