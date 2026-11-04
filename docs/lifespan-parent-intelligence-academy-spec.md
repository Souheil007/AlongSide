# Alongside — Parental Intelligence Academy Lifespan Curriculum Specification
**Author:** Chief Technology Officer (CTO)  
**Status:** Canonical Architectural Specification  
**Version:** 2.5.0 (Full 0–18 Lifespan Neurodevelopmental Curriculum)  
**Target Audience:** Frontend Agent, Backend Agent, Product Leadership  
**Companion Documents:**  
- [`docs/PROJECT_SCOPE.md`](PROJECT_SCOPE.md) (Canonical Product Scope v2.4.0)  
- [`docs/system-architecture.md`](system-architecture.md) (System Architecture)  
- [`docs/codebase-design.md`](codebase-design.md) (Deep Modules & Seam Catalog)  
- [`docs/streamlined-navigation-and-tab-decluttering-spec.md`](streamlined-navigation-and-tab-decluttering-spec.md) (Navigation & Decluttering)  
- [`plans/28-parent-intelligence-academy-lifespan-curriculum-and-tier-expansion.md`](../plans/28-parent-intelligence-academy-lifespan-curriculum-and-tier-expansion.md)  
- [`plans/README.md`](../plans/README.md) (Master Engineering Execution Index)  

---

## 1. Executive Summary & Problem Framing

In Paperclip task **SOU-55**, leadership identified a critical gap in the Parental Intelligence Academy:
> *"Our parental intelligence academy is not updated, it still doesn't have courses for all the tiers and ages we are offering, since we are handling ages from 0–18, we have to fix it and update it."*

### 1.1 Root Cause Analysis

When AlongSide was originally scaffolded in v2.3 under Plans 08 & 09, the product was focused on the "First Smartphone Bridge" (Ages 8–18), dividing childhood into four legacy tiers:
- `TIER_1_AGES_8_9` (Explorer)
- `TIER_2_AGES_10_11` (Pathfinder)
- `TIER_3_AGES_12_13` (Navigator)
- `TIER_4_AGES_14_PLUS` (Pioneer)

When AlongSide v2.4 expanded into the **Universal Holistic Lifespan Family OS (Ages 0–18)**, domains like Pediatric Health Triage, Nutrition, Milestones, Brain Games, and Behavioral Psychology were upgraded to support 6 canonical lifespan tiers. However, the Parental Intelligence Academy was left untouched:

```
┌────────────────────────────────────────────────────────────────────────┐
│               THE ACADEMY LIFESPAN GAP IDENTIFIED (SOU-55)             │
├────────────────────────────────────────────────────────────────────────┤
│ 1. ZERO COURSES FOR AGES 0–3 (INFANCY & TODDLERHOOD):                  │
│    • Parents of babies and toddlers had zero neurodevelopmental        │
│      curriculum explaining sensory overload, amygdala development,      │
│      serve-and-return language acquisition, or the 3D video deficit.    │
│                                                                        │
│ 2. ZERO COURSES FOR AGES 4–6 (EARLY CHILDHOOD & PRESCHOOL):            │
│    • Zero guidance on Theory of Mind emergence, Piagetian egocentrism, │
│      block play vs. fast-tempo media, and bedtime separation anxiety.  │
│                                                                        │
│ 3. SCHEMA & API HARD-CODING:                                           │
│    • shared Zod schema (AcademyTierSchema) restricted queries to the   │
│      4 legacy tiers, returning 400 Validation Error for any 0–6 query. │
│    • Fastify routes and DTO schemas only permitted the 4 legacy tiers. │
│                                                                        │
│ 4. FRONTEND CATALOG SILOS:                                             │
│    • AcademyCatalogClient only rendered tabs for Ages 8–18.            │
│    • ModuleCard fell back to raw uppercase enum text for 0–6 tiers.    │
└────────────────────────────────────────────────────────────────────────┘
```

This specification establishes the comprehensive architecture, curriculum design, data contracts, and UI upgrades to deliver a **world-class 0–18 Neurodevelopmental Parenting Curriculum** across all 6 canonical tiers.

---

## 2. The 6 Canonical Lifespan Tiers (Ages 0–18)

The Academy curriculum is structured around the 6 canonical developmental stages defined in `@alongside/shared` and `packages/database/prisma/schema.prisma`:

| Tier Key | Age Range | Title & Developmental Stage | Core Neurobiological Theme |
| :--- | :--- | :--- | :--- |
| **`TIER_0_INFANCY_TODDLER_0_3`** | **0–3 years** | **Infancy & Toddlerhood** | Sensory Co-Regulation, Pre-Verbal Amygdala, Zero Screens & 3D Language Acquisition |
| **`TIER_1_EARLY_CHILDHOOD_4_6`** | **4–6 years** | **Early Childhood (Preschool)** | Theory of Mind, Emotional Egocentrism, Attention Architecture & Bedtime Sleep Pressure |
| **`TIER_2_MIDDLE_CHILDHOOD_7_9`** | **7–9 years** | **Middle Childhood (Elementary)** | Ventral Striatum Dopamine Loops, Prefrontal Cortex Scaffolding & Co-Viewing |
| **`TIER_3_PRE_TEEN_10_12`** | **10–12 years** | **Pre-Teen (Tween Transition)** | Adrenarche, Social Dopamine, Group Chat Dynamics & Exclusion Neural Pain |
| **`TIER_4_EARLY_ADOLESCENCE_13_15`** | **13–15 years** | **Early Adolescence (Puberty)** | Pubertal Melatonin Circadian Delay, Infinite Scrolls & Neutral 8:30 Bedtime Dock |
| **`TIER_5_LATE_ADOLESCENCE_16_18`** | **16–18 years** | **Late Adolescence (Independence)** | Autonomy Transition, Bilateral Covenants, Digital Footprints & Non-Punitive Repair |

---

## 3. Curriculum Architecture & Content Blueprint

Every Academy module contains 3 clinically reviewed micro-lessons structured with:
1. **Pediatric Neurobiology Foundation:** The biological or physiological reason behind the child's reaction.
2. **Clinical Insight Callout (`> **Clinical Insight:** ...`):** A high-impact takeaway extracted by the lesson reader.
3. **Actionable Parent Dialogue (`**What to Say:** "..."`):** Exact conversational scripts parents can say out loud.
4. **Concrete Action Protocol:** Bulleted steps to implement in daily family routines.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   ACADEMY LESSON PARSING ARCHITECTURE                  │
├────────────────────────────────────────────────────────────────────────┤
│ Markdown Lesson Stream                                                 │
│    │                                                                   │
│    ├──> Split on double newline (\n\n)                                 │
│    ├──> Extract "> **Clinical Insight:**" ──> Styled Callout Card      │
│    ├──> Extract "**What to Say:**"         ──> Dialogue Speech Bubble  │
│    └──> Render Prose Body                  ──> Typography Article      │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Tier 0 (Ages 0–3): Infancy & Toddler Sensory Foundations
* **Module Slug:** `infant-sensory-milestones-and-coregulation`
* **Module Title:** *Infant & Toddler Neurodevelopment: Sensory Co-Regulation, First Words & Zero-Screen Foundations*
* **Module Summary:** *Master how the 0-3 infant and toddler brain builds secure attachment, why pre-verbal emotional meltdowns occur, and how to protect 3D language acquisition.*
* **Lessons:**
  1. `sensory-overload-and-the-immature-amygdala` — *Sensory Overload & The Immature Amygdala: Why Toddlers Melt Down*
  2. `zero-screens-and-language-acquisition` — *Zero Screens Before Age 2: The Neuroscience of 3D Language Acquisition*
  3. `emotional-coregulation-rituals` — *The Calm Anchor: How Parents Wire Nervous System Resilience*

### 3.2 Tier 1 (Ages 4–6): Early Childhood Executive Function
* **Module Slug:** `early-childhood-executive-function-and-play`
* **Module Title:** *Early Childhood Executive Function: Theory of Mind, Play Scaffolding & Emotion Regulation*
* **Module Summary:** *Navigate preschool social leaps, egocentrism vs empathy sparks, bedtime battles, and the science of purposeful offline imaginative play.*
* **Lessons:**
  1. `theory-of-mind-and-preschool-empathy` — *Theory of Mind: Why 4-Year-Olds Struggle to Share and Cooperate*
  2. `scaffolded-offline-play-vs-fast-media` — *Purposeful Play vs. Fast-Paced Animation: Building Sustained Attention Spans*
  3. `bedtime-resistance-and-sleep-pressure` — *Ending Bedtime Battles: Sleep Pressure, Blue Light & Predictable Anchors*

### 3.3 Tier 2 (Ages 7–9): Middle Childhood Impulse Centers
* **Module Slug:** `early-impulse-centers-and-shared-media`
* **Module Title:** *Early Impulse Centers: The Developing Prefrontal Cortex & Shared Media*
* **Module Summary:** *Understand how the 7-9 year old brain processes immediate digital reward before inhibitory control is fully wired.*
* **Lessons:**
  1. `dopamine-loops-and-curiosity` — *The Dopamine Loop: Why Stopping Gameplay Causes Meltdowns*
  2. `shared-screens-scaffolding` — *Co-Viewing & The Scaffolded Experience: Side-by-Side Guidance*
  3. `first-boundaries-without-shame` — *Setting Digital Boundaries Without Triggering Shame*

### 3.4 Tier 3 (Ages 10–12): Pre-Teen Adrenarche & Social Dopamine
* **Module Slug:** `tween-neurobiology-and-adrenarche`
* **Module Title:** *The Tween Brain: Adrenarche, Social Dopamine & The Peer Shift*
* **Module Summary:** *Understand why peer approval suddenly eclipses family connection at ages 10-12 and how to protect sleep while honoring social connection.*
* **Lessons:**
  1. `adrenarche-and-identity` — *Adrenarche: The Biological Awakening to Social Standing*
  2. `group-chats-fomo` — *Group Chats, Disappearing Messages & Silent Exclusion*
  3. `calm-tech-conversations` — *De-escalating Screen Friction: The 3-Step Empathetic Reset*

### 3.5 Tier 4 (Ages 13–15): Early Adolescence Circadian Delay
* **Module Slug:** `pubertal-circadian-delay-and-sleep`
* **Module Title:** *Pubertal Circadian Delay, Algorithmic Feeds & The Neutral Bedtime Dock*
* **Module Summary:** *Explore the biological 2-hour sleep phase shift in puberty and why physical device separation prevents chronic sleep deprivation.*
* **Lessons:**
  1. `the-biological-clock-shift` — *The 2-Hour Melatonin Shift: Why They Can't Sleep at 9:00 PM*
  2. `bedroom-sanctuary-rule` — *The Refrigerator Basket: Making the 8:30 PM Curfew Neutral*
  3. `algorithmic-rabbit-holes` — *Algorithmic Feeds: How Infinite Scrolls Exploit Fatigued Brains*

### 3.6 Tier 5 (Ages 16–18): Late Adolescence Autonomy Transition
* **Module Slug:** `teen-autonomy-and-graduated-privileges`
* **Module Title:** *The Autonomy Transition: Graduated Privileges, Digital Footprints & Agency*
* **Module Summary:** *Shift from managerial monitoring to collaborative mentorship as adolescent agency, metacognition, and adult independence develop.*
* **Lessons:**
  1. `from-surveillance-to-covenant` — *Moving From Surveillance to Bilateral Agreements: Why Spyware Fails*
  2. `digital-reputation-and-permanence` — *Permanence, Screenshots & Impulse Reflection*
  3. `repair-after-breach` — *When Agreements Break: The Non-Punitive Repair Blueprint*

---

## 4. Technical Architecture & Data Contracts

### 4.1 Shared Validation Layer (`@alongside/shared`)

In `packages/shared/src/schemas/academy.ts`, the `AcademyTierSchema` is expanded to accept both canonical v2.4 lifespan tiers and legacy aliases:

```typescript
export const AcademyTierSchema = z.enum([
  // Canonical v2.4 Lifespan Tiers (Ages 0–18)
  DevelopmentalTier.TIER_0_INFANCY_TODDLER_0_3,
  DevelopmentalTier.TIER_1_EARLY_CHILDHOOD_4_6,
  DevelopmentalTier.TIER_2_MIDDLE_CHILDHOOD_7_9,
  DevelopmentalTier.TIER_3_PRE_TEEN_10_12,
  DevelopmentalTier.TIER_4_EARLY_ADOLESCENCE_13_15,
  DevelopmentalTier.TIER_5_LATE_ADOLESCENCE_16_18,

  // Legacy compatibility aliases (v2.3)
  DevelopmentalTier.TIER_1_AGES_8_9,
  DevelopmentalTier.TIER_2_AGES_10_11,
  DevelopmentalTier.TIER_3_AGES_12_13,
  DevelopmentalTier.TIER_4_AGES_14_PLUS,
]);
```

### 4.2 Fastify Route Validation (`apps/api`)

Fastify route schemas in `apps/api/src/modules/academy/academy.routes.ts` validate `querystring.tier` and serialize `academyModuleDtoSchema.developmentalTier` against all 6 canonical tiers and legacy aliases.

### 4.3 Bidirectional Tier Equivalence Engine (`AcademyRepository`)

To prevent breaking existing API consumers or legacy child profiles, `AcademyRepository` implements bidirectional tier normalization:

```typescript
export function getEquivalentTiers(tier: string): string[] {
  switch (tier) {
    case 'TIER_1_AGES_8_9':
    case 'TIER_2_MIDDLE_CHILDHOOD_7_9':
      return ['TIER_1_AGES_8_9', 'TIER_2_MIDDLE_CHILDHOOD_7_9'];
    case 'TIER_2_AGES_10_11':
    case 'TIER_3_PRE_TEEN_10_12':
      return ['TIER_2_AGES_10_11', 'TIER_3_PRE_TEEN_10_12'];
    case 'TIER_3_AGES_12_13':
    case 'TIER_4_EARLY_ADOLESCENCE_13_15':
      return ['TIER_3_AGES_12_13', 'TIER_4_EARLY_ADOLESCENCE_13_15'];
    case 'TIER_4_AGES_14_PLUS':
    case 'TIER_5_LATE_ADOLESCENCE_16_18':
      return ['TIER_4_AGES_14_PLUS', 'TIER_5_LATE_ADOLESCENCE_16_18'];
    default:
      return [tier];
  }
}
```

This guarantees that:
- Querying with `tier=TIER_0_INFANCY_TODDLER_0_3` returns the 0–3 module.
- Querying with `tier=TIER_1_AGES_8_9` (legacy) returns the 7–9 module (`TIER_2_MIDDLE_CHILDHOOD_7_9`).
- Querying with `tier=TIER_3_PRE_TEEN_10_12` (canonical) returns the 10–12 module.

---

## 5. Frontend Catalog & Presentation Layer (`apps/web`)

### 5.1 Lifespan Tab Filter Bar (`AcademyCatalogClient.tsx`)

The tab bar provides one-click filtering across all developmental phases:
- **All Modules (Ages 0–18)**
- **Tier 0: Infancy & Toddler (0–3 yrs)**
- **Tier 1: Early Childhood (4–6 yrs)**
- **Tier 2: Explorer (7–9 yrs)**
- **Tier 3: Pathfinder (10–12 yrs)**
- **Tier 4: Navigator (13–15 yrs)**
- **Tier 5: Pioneer (16–18 yrs)**

When a parent has an active child, `normalizeChildTier()` automatically selects the child's exact developmental tab upon page load.

### 5.2 Module Card Visual Badging (`ModuleCard.tsx`)

Each tier features high-contrast, accessible styling:
- **Tier 0 (0–3):** Rose (`bg-rose-50 text-rose-800 border-rose-200`)
- **Tier 1 (4–6):** Amber (`bg-amber-50 text-amber-800 border-amber-200`)
- **Tier 2 (7–9):** Emerald (`bg-emerald-50 text-emerald-800 border-emerald-200`)
- **Tier 3 (10–12):** Teal (`bg-teal-50 text-teal-800 border-teal-200`)
- **Tier 4 (13–15):** Indigo (`bg-indigo-50 text-indigo-800 border-indigo-200`)
- **Tier 5 (16–18):** Purple (`bg-purple-50 text-purple-800 border-purple-200`)

---

## 6. Definition of Done (DoD) & Verification Matrix

1. **Curriculum Completeness:** 6 complete neurodevelopmental modules seeded with 18 comprehensive lessons (3 per module), verified in both `InMemoryAcademyRepository` and `PrismaAcademyRepository`.
2. **Type Safety:** `npm run typecheck` passes with 0 errors monorepo-wide.
3. **Automated Test Coverage:**
   - `apps/api/test/academy.test.ts` asserts:
     * 6 modules returned when no tier filter is provided.
     * Accurate filtering by canonical tier (`TIER_0_INFANCY_TODDLER_0_3`).
     * Backward-compatible queries for legacy aliases (`TIER_2_AGES_10_11`).
     * Proper 400 rejection on invalid tier strings.
   - `apps/web/test/academy.test.ts` asserts:
     * `getTierBadgeInfo` correctly maps all 6 lifespan tiers and 4 legacy aliases with proper styling tokens.
4. **Ponytail Audit:** Minimal diff size, zero redundant packages, clean plain text PR documentation.
