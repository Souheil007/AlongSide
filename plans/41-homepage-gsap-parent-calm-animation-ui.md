# Plan 41: Homepage GSAP "Parent Calm" Animation & Scroll Experience
**Plan ID:** `PLAN-41`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-23, PLAN-33  
**Estimated Scope:** Medium (GSAP Animation Choreography, ScrollTrigger Staggers & "Parent Calm" Motion Polish)  
**Status:** Ready for Execution  

---

## 1. Objective & Business Value

Elevate the logged-out visitor experience on the AlongSide homepage (`apps/web/src/app/page.tsx`) by replacing static, sudden page loads with a soothing, orchestrated motion system built with **GSAP v3.15** and **`@gsap/react` v2.1**.

Parents seeking guidance on screen time, neurobiology, and child development are often fatigued and overwhelmed. High-velocity, bouncy animations increase cognitive load. Conversely, AlongSide's **"Parent Calm"** motion philosophy uses slow, reassuring reveals (0.6s–0.9s duration), subtle Y-offsets (16px–24px), natural organic easing (`power3.out`, `sine.out`), and smooth ScrollTrigger staggers to communicate clinical authority, safety, and modern elegance.

### Core Objectives:
1. **Orchestrated Sanctuary Hero Entrance:** Animate the hero background aura, eyebrow badge, serif headline, empathetic subheadline, dual CTAs, and trust badges in a coordinated timeline with zero layout shift.
2. **Scroll-Driven Staggered Reveals:** Progressively reveal and elevate sections (`PillarsShowcase`, `LifespanStageSelector`, `CulturePlaygroundDemo`, `DeviceActionHubSpotlight`, `PediatricAuthorityTestimonials`, `PricingSection`, `FaqSection`) as the user scrolls into view using `ScrollTrigger`.
3. **Interactive Micro-Interactions & Hover Polish:** Apply subtle magnetic card lifts and tab transitions using `contextSafe` from `useGSAP` without memory leaks.
4. **Strict Accessibility & Reduced Motion Support:** Honor `prefers-reduced-motion` across every animated element using `gsap.matchMedia()`, providing instantaneous, fade-only transitions for sensitive users.
5. **Headless & SSR Test Safety:** Ensure GSAP animations execute strictly within client DOM boundaries (`useGSAP` with scope ref) and do not break Vitest / JSDOM unit tests.

---

## 2. Inputs & Architectural References

- **GSAP Skills Specification:**
  - [`gsap-react` SKILL.md](file:///C:/GithubProjects/AlongSide/.agents/skills/gsap-react/SKILL.md) (Lifecycle, `useGSAP`, `scope`, `contextSafe`)
  - [`gsap-core` SKILL.md](file:///C:/GithubProjects/AlongSide/.agents/skills/gsap-core/SKILL.md) (Tweens, easing, duration, `gsap.matchMedia()`)
  - [`gsap-scrolltrigger` SKILL.md](file:///C:/GithubProjects/AlongSide/.agents/skills/gsap-scrolltrigger/SKILL.md) (Scroll-based triggers, toggles, markers removal)
  - [`gsap-performance` SKILL.md](file:///C:/GithubProjects/AlongSide/.agents/skills/gsap-performance/SKILL.md) (Transforms & opacity only, zero layout thrashing)
- **Frontend Governance & Skill Matrix:** [`docs/engineering-standards/frontend-skill-matrix.md`](../docs/engineering-standards/frontend-skill-matrix.md)
- **Code Quality & Testing Principles:** [`docs/engineering-standards/code-quality-principles.md`](../docs/engineering-standards/code-quality-principles.md)
- **Git Commit Standards:** [`docs/engineering-standards/git-commit-standards.md`](../docs/engineering-standards/git-commit-standards.md)
- **Homepage Structure:** [`apps/web/src/app/page.tsx`](../apps/web/src/app/page.tsx) and [`apps/web/src/components/home/`](../apps/web/src/components/home/)

---

## 3. Preconditions & Dependency Verification

- Verify `gsap` (>=3.15.1) and `@gsap/react` (>=2.1.2) are installed in `apps/web/package.json`.
- Verify `apps/web/src/app/page.tsx` remains a React Server Component (RSC) and does not contain `'use client'`.
- Verify all 42 Vitest test suites in `apps/web` pass with 100% success before beginning work.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Centralized GSAP Utility & Motion Constants (`apps/web/src/lib/animations/gsap.ts`)
1. Create a centralized animation utility module:
   - Safe registration of GSAP plugins (`useGSAP`, `ScrollTrigger`).
   - Define reusable "Parent Calm" motion tokens:
     ```ts
     export const MOTION_TOKENS = {
       ease: {
         gentle: 'power2.out',
         calm: 'power3.out',
         reassure: 'sine.out',
       },
       duration: {
         fast: 0.35,
         standard: 0.65,
         hero: 0.85,
         aura: 1.4,
       },
       offset: {
         subtle: 12,
         standard: 20,
         section: 28,
       },
       stagger: {
         tight: 0.06,
         standard: 0.1,
         cards: 0.12,
       },
     };
     ```
   - Provide a helper `setupReducedMotionMatch(scopeRef, normalAnimation, reducedAnimation?)` using `gsap.matchMedia()` to standardize accessibility.

---

### Task 2: Orchestrated Sanctuary Hero Entrance (`apps/web/src/components/home/HeroSection.tsx`)
1. Convert `HeroSection.tsx` to a client component with `'use client'`.
2. Wrap the section in a container `ref` and connect `useGSAP`.
3. Construct a smooth GSAP timeline:
   - **Phase 1 (0.0s):** Ambient arch aura blooms softly (`opacity: 0 -> 0.8`, `scale: 0.85 -> 1`, `duration: 1.4`, `ease: 'sine.out'`).
   - **Phase 2 (0.2s):** Eyebrow badge descends (`y: -12 -> 0`, `opacity: 0 -> 1`, `duration: 0.6`).
   - **Phase 3 (0.35s):** Sanctuary headline unfolds (`y: 20 -> 0`, `opacity: 0 -> 1`, `duration: 0.8`, `ease: 'power3.out'`).
   - **Phase 4 (0.5s):** Editorial subheadline glides up (`y: 16 -> 0`, `opacity: 0 -> 1`, `duration: 0.7`).
   - **Phase 5 (0.65s):** Dual CTA buttons appear (`y: 14 -> 0`, `opacity: 0 -> 1`, `duration: 0.6`).
   - **Phase 6 (0.8s):** 4 Trust signal badges stagger into view (`stagger: 0.08`, `y: 12 -> 0`, `opacity: 0 -> 1`, `duration: 0.5`).
4. Ensure SSR/fallback styles: elements remain readable even if JS is disabled or during hydration.

---

### Task 3: ScrollTrigger Stagger Reveals for Core Pillars & Lifespan Selector
1. **`PillarsShowcase.tsx`:**
   - Add `useGSAP` with `ScrollTrigger`.
   - Trigger on section entrance (`start: 'top 82%'`).
   - Animate the editorial section header (`opacity: 0 -> 1`, `y: 20`).
   - Stagger the 3 core pillar cards (`stagger: 0.12`, `opacity: 0 -> 1`, `y: 24`, `duration: 0.75`).
2. **`LifespanStageSelector.tsx`:**
   - Animate the stage navigation pills on initial scroll entry (`stagger: 0.05`).
   - Add gentle fade transition when switching between the 6 developmental stages (0–3, 4–6, 7–9, 10–12, 13–15, 16–18).

---

### Task 4: Interactive Micro-Interactions in Culture Playground & Action Hub
1. **`CulturePlaygroundDemo.tsx`:**
   - Scroll-trigger entrance for the slang dictionary cards and dinner conversation starters.
   - Use `contextSafe` to add subtle hover feedback on slang term pills (lift `y: -3px`, shadow elevation) using hardware-accelerated transforms.
2. **`DeviceActionHubSpotlight.tsx`:**
   - Stagger the 4 roadmap steps with subtle line connector animation.

---

### Task 5: Scroll Polish for Authority Testimonials, Pricing & FAQs
1. **`PediatricAuthorityTestimonials.tsx`:**
   - Fade-up reveal for developmental authority endorsements and trust badges.
2. **`PricingSection.tsx`:**
   - Staggered reveal of the Annual Hero Pass ($79/yr) and Flex Pass ($9.99/mo) cards, highlighting the 7-day risk-free badge.
3. **`FaqSection.tsx`:**
   - Graceful scroll entrance for the accordion cards.

---

### Task 6: Headless Vitest Testing & Motion Regression Suite
1. Create `apps/web/test/homepageAnimations.test.tsx`:
   - Verify `HeroSection`, `PillarsShowcase`, `LifespanStageSelector`, and other homepage components mount and render without throwing in test environments.
   - Verify mock GSAP does not mutate DOM unpredictably in headless test runners.
   - Verify all existing 42 test suites pass with 100% success.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `apps/web/src/lib/animations/gsap.ts` *(New: Centralized GSAP motion tokens & helpers)*
- [ ] `apps/web/src/components/home/HeroSection.tsx` *(Modified: Orchestrated timeline entrance & reduced motion)*
- [ ] `apps/web/src/components/home/PillarsShowcase.tsx` *(Modified: ScrollTrigger card stagger)*
- [ ] `apps/web/src/components/home/LifespanStageSelector.tsx` *(Modified: Scroll reveal & stage transition)*
- [ ] `apps/web/src/components/home/CulturePlaygroundDemo.tsx` *(Modified: Scroll reveal & interactive hover)*
- [ ] `apps/web/src/components/home/DeviceActionHubSpotlight.tsx` *(Modified: Step card reveals)*
- [ ] `apps/web/src/components/home/PediatricAuthorityTestimonials.tsx` *(Modified: Endorsement card reveals)*
- [ ] `apps/web/src/components/home/PricingSection.tsx` *(Modified: Pricing plan card reveals)*
- [ ] `apps/web/src/components/home/FaqSection.tsx` *(Modified: FAQ reveal)*
- [ ] `apps/web/test/homepageAnimations.test.tsx` *(New: Unit & animation mount safety tests)*
- [ ] `plans/README.md` *(Modified: Added PLAN-41 to index)*

---

## 6. Acceptance Criteria & Test Verification

1. **TypeScript Typecheck:**
   ```bash
   npm run typecheck --workspace=@alongside/web
   ```
   *Exit code 0, 0 type errors.*

2. **Automated Vitest Test Suite:**
   ```bash
   npm test --workspace=@alongside/web
   ```
   *All 43+ test files pass 100%.*

3. **Accessibility & Reduced Motion:**
   - Tested with `prefers-reduced-motion: reduce`; all elements render immediately visible with no motion.
4. **Performance:**
   - Only `transform` (`x`, `y`, `scale`) and `opacity` are animated. No layout thrashing (`width`, `height`, `margin`, `top`).

---

## 7. Role Boundaries & Prohibitions

- ❌ **DO NOT** edit files inside `apps/api/` or `packages/database/`.
- ❌ **DO NOT** convert `apps/web/src/app/page.tsx` to `'use client'`; keep page root as RSC.
- ❌ **DO NOT** use `useEffect()` without returning `ctx.revert()` or omitting `useGSAP()`.
- ❌ **DO NOT** use bouncy or cartoonish easing curves (`bounce.out`, `elastic.out`).
- ❌ **DO NOT** animate layout-triggering properties (`height`, `width`, `padding`, `top`).
- ❌ **DO NOT** merge PRs autonomously. Open PR for human review.

---

## 8. Definition of Done (DoD) Checklist

- [ ] `apps/web/src/lib/animations/gsap.ts` created with "Parent Calm" tokens.
- [ ] `HeroSection.tsx` orchestrated with timeline entrance and reduced-motion fallback.
- [ ] ScrollTrigger applied to `PillarsShowcase`, `LifespanStageSelector`, `CulturePlaygroundDemo`, `DeviceActionHubSpotlight`, `PediatricAuthorityTestimonials`, `PricingSection`, and `FaqSection`.
- [ ] `apps/web/test/homepageAnimations.test.tsx` authored and passing.
- [ ] `npm run typecheck` exits 0.
- [ ] `npm test` passes 100%.
- [ ] Ponytail review diff audit completed on `git diff HEAD`.
- [ ] Pull request opened with plain-text description targeting `main`.
