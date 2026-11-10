# Plan 23: Holistic Lifespan Family OS Homepage Redesign
**Plan ID:** `PLAN-23`  
**Assignee:** Frontend Agent  
**Dependencies:** PLAN-03, PLAN-16, PLAN-17, PLAN-21  
**Estimated Scope:** Large  
**Paperclip Issue:** SOU-54 (Subtask of SOU-53)  
**Pull Request:** [#35](https://github.com/Souheil007/AlongSide/pull/35)  
**Status:** Complete (PR #35)  

---

## 1. Objective & Business Value

Redesign the AlongSide public homepage (`apps/web/src/app/page.tsx`) to reflect the canonical v2.4.0 product scope and eradicate the "Device Blinders" trap identified in the YC Paul Graham evaluation ([`docs/PAUL_GRAHAM_ROAST.md`](../docs/PAUL_GRAHAM_ROAST.md)).

Currently, the landing page is frozen in an obsolete v2.0/v2.1 framing ("Replace screen conflict with calm developmental science", "The Two Roads: Pre-Device vs Active-Device", "smartphone curfews"). This falsely tells parents of babies, toddlers, and early elementary children that AlongSide is only a middle-school phone utility, shrinking our addressable market by over 70% and increasing customer acquisition costs.

This plan transforms the landing page into a stunning, empathetic, and comprehensive showcase of **The Holistic Child Upbringing, Pediatric Health & Lifespan Family OS (Ages 0–18)**:
- Hero messaging celebrating the full journey of modern parenting from infancy through adolescence.
- An interactive **Lifespan Stage Selector (Ages 0–3, 4–6, 7–9, 10–18)** allowing visiting parents to immediately preview the exact health, nutrition, milestone, play, and behavioral guidance tailored to their child.
- Visual showcase of the **5 Balanced Pillars of AlongSide**.
- Repositioning device governance into the **"Thinking About Buying a Device?" Action Hub**, highlighting the Bilateral Family Pact and automated curfews as a celebrated rite of passage rather than a dreary chore.

---

## 2. Inputs & Architectural References

- **Holistic Redesign & Navigation Spec:** [`docs/holistic-redesign-and-navigation-spec.md`](../docs/holistic-redesign-and-navigation-spec.md) (Section 2.1)
- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Pillars 1–5, Section 4.1)
- **Paul Graham Idea Roast & Decacorn Pivot:** [`docs/PAUL_GRAHAM_ROAST.md`](../docs/PAUL_GRAHAM_ROAST.md) (Sections 9, 10, 11)
- **Technical Roadmap:** [`docs/technical-roadmap-v2.4.0.md`](../docs/technical-roadmap-v2.4.0.md)
- **Frontend Autonomous Skill Matrix:** [`docs/engineering-standards/frontend-skill-matrix.md`](../docs/engineering-standards/frontend-skill-matrix.md)
- **Existing Page:** `apps/web/src/app/page.tsx`

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-21` (Unified Navigation) queued/ready.
- **Verification:** Run `npm run typecheck --workspace=@alongside/web` to confirm clean builds.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Redesign the Hero Proposition (`apps/web/src/components/home/HeroSection.tsx`)
1. Implement a modern, high-conversion hero section:
   - Badge: *"Clinical Pediatric Science • Lifespan Child OS (Ages 0–18) • Zero-Spyware Family Calm"*
   - Headline:  
     `The Complete Operating System for Raising Thriving Kids in the Modern World.`
   - Subheadline:  
     `From 2:00 AM pediatric fever triage, safe allergen introduction, and speech milestones to purposeful brain play, tantrum co-regulation, and healthy digital pacts.`
   - Primary CTAs:  
     `Start 7-Day Risk-Free Trial` (Primary with ArrowRight) and `Explore by Child Age` (Secondary scrolling to the Lifespan Stage Selector).
   - Trust Badges:  
     `Barton Schmitt Pediatric Protocols`, `CDC & AAP Developmental Milestones`, `Zero-Spyware Privacy Pledge`, `Cancel Anytime with 1-Click`.

### Task 2: Interactive Lifespan Stage Selector (`apps/web/src/components/home/LifespanStageSelector.tsx`)
1. Build an interactive client component featuring 4 distinct developmental stages:
   - **Stage 1: Infants & Toddlers (Ages 0–3):**
     * Focus: Physical Health, Motor/Speech Milestones & Feeding.
     * Highlights: 3-Zone Pediatric Fever Triage ("Safe Resort"), Baby-Led Weaning & Safe Allergen Timeline, "When he moves, when he talks" CDC milestone checklists, Animal puppet vocal mirroring games.
   - **Stage 2: Early Childhood (Ages 4–6):**
     * Focus: Emotional Regulation, Picky Eating & Symbolic Play.
     * Highlights: HALT tantrum decoding, Division of Responsibility feeding guides, sensory building blocks, bedtime routine co-regulation.
   - **Stage 3: Middle Childhood (Ages 7–9):**
     * Focus: Cognitive Brain Games & Social Foundations.
     * Highlights: Logic puzzles & chess intro, Boredom Buster generator, navigating elementary school friendships, foundational screen habits.
   - **Stage 4: Pre-Teens & Adolescents (Ages 10–18):**
     * Focus: Autonomy, Modern Tech & Youth Culture.
     * Highlights: "Thinking About a Device?" First-Phone Readiness Assessment (0–100), Bilateral Family Pact-as-Code, neutral automated 8:30 PM curfews, Sunday youth culture & slang decoders.
2. Clicking each tab reveals realistic visual preview cards showing actual UI widgets from the AlongSide platform.

### Task 3: The 5 Balanced Pillars Architecture Showcase (`apps/web/src/components/home/PillarsShowcase.tsx`)
1. Build a 5-pillar grid highlighting the breadth of AlongSide:
   - **Pillar 1: 24/7 Pediatric Health & Triage ("The Safe Resort"):** 3-zone triage algorithm, knowing when to call doctor vs home care, pediatric fever thresholds.
   - **Pillar 2: Pediatric Nutrition & Feeding Vault:** Safe early allergen exposure, choking hazard protocols, picky eating de-escalation.
   - **Pillar 3: Developmental Milestones & Purposeful Play:** Gross/fine motor, speech bursts, daily brain games, boredom busters.
   - **Pillar 4: Behavioral Psychology & Co-Regulation:** HALT diagnostic, word-for-word empathy scripts, authoritative parenting principles.
   - **Pillar 5: Modern Culture, Devices & Bilateral Pacts:** The "Thinking About Buying a Device?" Action Hub, bilateral co-signed pacts, Sunday slang decoders.

### Task 4: "Thinking About Buying a Device?" Action Hub Spotlight (`apps/web/src/components/home/DeviceActionHubSpotlight.tsx`)
1. Reframe device governance from a restrictive surveillance tool into an empowering transition:
   - Step 1: **Objective Readiness Score (0–100):** Evaluate impulse control and responsibility before unboxing.
   - Step 2: **The Bilateral Family Pact ("Pact-as-Code"):** Parent and child co-create shared values and sign on the screen.
   - Step 3: **Automated Neutral Enforcement:** OS locks non-exempt apps at 8:30 PM, ending bedtime yelling without spyware.

### Task 5: Integrate and Assemble Redesigned Homepage (`apps/web/src/app/page.tsx`)
1. Replace legacy `page.tsx` with the modular sections:
   - `<HeroSection />`
   - `<LifespanStageSelector />`
   - `<PillarsShowcase />`
   - `<DeviceActionHubSpotlight />`
   - `<ClinicalAuthorityTestimonials />`
   - `<PricingSection />` (Highlighting $79/yr Annual Hero Pass with 7-day upfront trial)
   - `<FaqSection />`
2. Follow anti-slop guidelines: avoid generic placeholder illustrations, ensure responsive contrast ≥ 4.5:1, and verify smooth mobile scrolling with zero horizontal overflow.

---

## 5. Specific Deliverables (Files to Create / Modify)

### `apps/web`:
- [x] `apps/web/src/app/page.tsx` (Complete homepage rewrite)
- [x] `apps/web/src/components/home/HeroSection.tsx` (Lifespan hero proposition and trust signals)
- [x] `apps/web/src/components/home/LifespanStageSelector.tsx` (Interactive 4-stage switcher: Ages 0-3, 4-6, 7-9, 10-18)
- [x] `apps/web/src/components/home/PillarsShowcase.tsx` (The 5 balanced pillars grid)
- [x] `apps/web/src/components/home/DeviceActionHubSpotlight.tsx` ("Thinking About a Device?" feature spotlight)
- [x] `apps/web/src/components/home/ClinicalAuthorityTestimonials.tsx` (Pediatrician and parenting psychologist endorsements)

---

## 6. Definition of Done (DoD) & Verification Checklist

- [x] Homepage hero immediately conveys the 0–18 full childhood scope, removing the narrow phone-only headline.
- [x] Interactive Lifespan Stage Selector allows visitors to toggle between Ages 0–3, 4–6, 7–9, and 10–18, displaying relevant preview cards for each stage.
- [x] All 5 balanced pillars (Health, Nutrition, Play, Behavior, Devices) are visually showcased with clear value propositions.
- [x] Device governance is positioned as an empowering rite-of-passage transition within the modern world pillar.
- [x] Page layout is 100% responsive across 360px–1440px viewports with zero horizontal overflow.
- [x] `npm run typecheck` passes with zero errors.
- [x] Diff audited with `ponytail-review` to ensure clean, lean component structure.
