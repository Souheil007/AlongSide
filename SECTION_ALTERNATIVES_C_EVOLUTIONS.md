# AlongSide — Design Alternatives: 5 Alternative C Evolutions
**Author:** Frontend Autonomous Systems Engineer  
**Task ID:** Paperclip Task SOU-81 (Component-Level UX Exploration)  
**Parent Section:** Tailored Advisory for Every *Developmental Horizon* (`LifespanStageSelector.tsx`)  
**Parent Page:** AlongSide Public Homepage (`apps/web/src/app/page.tsx`)  
**Design Standard:** Approved Direction: **Taste 2: Editorial Pediatric Almanac** (`design-system/alongside/MASTER.md`)  
**Context:** User Feedback Refinement on Alternative C (The Spotlight Lens)  

---

## 1. User Feedback Analysis & Architectural Directives

### 1.1 The User's Feedback
> *"Alternative C is the best, but can we start from it and make it better. First do we really need trace 1: domain across 0-18 feels like it adds more friction, and I think we should keep browse by child age stage. Can you make 5 more designs starting from Alternative C, make it more fluent, creative, easy to digest, user friendly, appealing."*

### 1.2 Key Design Directives
1. **Eliminate Trace 1 (The Dual-Mode Switcher):**  
   The original Alternative C included a segmented mode toggle: `[Browse by Age] vs [Track Domain Across Ages 0–18]`. While conceptually interesting for researchers, parents visit AlongSide with an acute, immediate question: *"My child is 8 years old (or 11, or 2) — what is happening in their brain right now?"* Forcing parents to choose between two abstract navigation paradigms introduced unnecessary cognitive friction. **Directive: Firmly anchor the entire experience in Child Age Stage browsing.**
2. **Preserve Alternative C's Breakthrough:**  
   In current production, course cards only display vague 1-line marketing summaries. Alternative C's superpower was **revealing the actual 3 micro-lesson titles, clinical rationale, and minute-by-minute duration** directly on the page. All 5 evolutions preserve and enhance this immediate curriculum transparency.
3. **Five Distinct UX Directions:**  
   Rather than minor skinning variations, we developed **five genuinely distinct architectural paradigms** that reimagine how parents explore the 5 core growth domains for their child's developmental horizon:
   - **C.1 — The Fluid Accordion Deck:** Inline progressive expansion with zero layout jumps.
   - **C.2 — The Editorial Studio Console:** Ergonomic 35/65 Master-Detail split with micro-telemetry.
   - **C.3 — The Whole-Child Horizon Compass:** Biophilic radial arc connecting all 5 developmental pillars.
   - **C.4 — The Pediatric Field Dossier:** Tactile archival binder with physical tab handles and board stamps.
   - **C.5 — The Horizon Carousel Stream:** Modern fluid horizontal ribbon with active center spotlight.

---

## 2. Design C.1 — The Fluid Accordion Deck (Inline Progressive Expansion)

```
+-------------------------------------------------------------------------------------------------------+
|  VOL. XXIV // CONTINUOUS LIFESPAN (0-18)                                                              |
|  Tailored Advisory for Every Developmental Horizon                                                    |
+-------------------------------------------------------------------------------------------------------+
|  [ 0–3 Infants ]   [ 4–6 Early ]   [ 7–9 Middle ]   [ 10–12 Tweens ]   [ 13–15 Teens ]   [ 16–18 Launch ] |
+-------------------------------------------------------------------------------------------------------+
|  HORIZON 01 // AGES 0–3: Physical Health, Milestones & Safe Feeding                                   |
|                                                                                                       |
|  +--------------------------------------------------------------------------------------------------+ |
|  | [🧠] BEHAVIOR & EMOTIONS                     Sensory Overload & Infant Co-Regulation   ⏱️ 13m [▲] | |
|  | ──────────────────────────────────────────────────────────────────────────────────────────────── | |
|  | (Left Overview)                              (Right 3-Lesson Interactive Drawer)                 | |
|  | Sensory Overload & Infant Co-Regulation      Inside This Chapter (3 Lessons):                    | |
|  | Master how the infant brain builds secure    01. Infant Amygdala & Attachment Bond       4 min   | |
|  | attachment, why meltdowns happen, and how    02. Pre-Verbal Tantrums: De-escalation      5 min   | |
|  | to anchor calm without isolation or shame.   03. Co-Regulation Protocol: 3 Resets        4 min   | |
|  |                                                                                                  | |
|  | [Start Course in Academy →]  [Save Syllabus]                                                     | |
|  +--------------------------------------------------------------------------------------------------+ |
|                                                                                                       |
|  +--------------------------------------------------------------------------------------------------+ |
|  | [🩺] PEDIATRIC HEALTH & SLEEP               Infant Health Foundations & Sleep         ⏱️ 13m [▼] | |
|  +--------------------------------------------------------------------------------------------------+ |
|  | [🥑] NUTRITION & MEALTIME                   Infant First Foods & Allergen Window      ⏱️ 13m [▼] | |
|  +--------------------------------------------------------------------------------------------------+ |
|  | [🧩] DEVELOPMENT & PLAY                     Sensory Awakening & Language Bursts       ⏱️ 12m [▼] | |
|  +--------------------------------------------------------------------------------------------------+ |
|  | [📱] DIGITAL & DEVICES                      Zero Screens Under 2 & Parent Modeling    ⏱️ 12m [▼] | |
|  +--------------------------------------------------------------------------------------------------+ |
+-------------------------------------------------------------------------------------------------------+
```

### 2.1 UX Philosophy & Fluidity
- **"Context in Place: Expand where you click."**
- Instead of clicking a button that updates a detached panel elsewhere on the screen, Design C.1 uses an **inline expanding accordion deck**.
- When a parent clicks any of the 4 collapsed domain bars, it smoothly expands *directly in place*, unfolding its course overview and 3-lesson syllabus drawer.
- The previously open domain collapses into a neat, 58px summary strip.
- **Why it's fluent & easy to digest:** Parents never lose spatial orientation. All 5 domains remain visible in a calm vertical stack. No jarring viewport shifts.

### 2.2 Prototype File
- **Standalone Prototype:** [`design-explorations/sou-81-developmental-horizons/horizon-c1-fluid-accordion.html`](./horizon-c1-fluid-accordion.html) (also in `previews/`)

---

## 3. Design C.2 — The Editorial Studio Console (Master-Detail Dual Panel)

```
+-------------------------------------------------------------------------------------------------------+
|  VOL. XXIV // CONTINUOUS LIFESPAN (0-18)                                                              |
|  Tailored Advisory for Every Developmental Horizon                                                    |
+-------------------------------------------------------------------------------------------------------+
|  [ 0–3 Infants ]   [ 4–6 Early ]   [ 7–9 Middle ]   [ 10–12 Tweens ]   [ 13–15 Teens ]   [ 16–18 Launch ] |
+-------------------------------------------------------------------------------------------------------+
|  +----------------------------------+  +------------------------------------------------------------+ |
|  | DOMAIN NAVIGATOR (35% Width)     |  | SPOTLIGHT CURRICULUM CANVAS (65% Width)                    | |
|  | HORIZON 01 // AGES 0–3           |  | BEHAVIOR & EMOTIONS • AGES 0–3                             | |
|  | 5 Core Growth Domains            |  |                                                            | |
|  |                                  |  | Sensory Overload & Infant Co-Regulation                    | |
|  | [●] [🧠] BEHAVIOR & EMOTIONS     |  | Master how the 0-3 infant and toddler brain builds secure  | |
|  |     Sensory Overload & Calm 13m  |  | attachment, why meltdowns happen, and how to anchor calm.  | |
|  |                                  |  |                                                            | |
|  | [○] [🩺] PEDIATRIC HEALTH        |  | (Shield) Clinical Focus: Infant amygdala response & mirror | |
|  |     Sleep Foundations       13m  |  | neuron co-regulation.                                      | |
|  |                                  |  |                                                            | |
|  | [○] [🥑] NUTRITION & MEALTIME    |  | CHAPTER BLUEPRINT (3 GUIDED CLINICAL LESSONS):             | |
|  |     Allergen Windows        13m  |  | +----------------+ +----------------+ +------------------+ | |
|  |                                  |  | | LESSON 01      | | LESSON 02      | | LESSON 03        | | |
|  | [○] [🧩] DEVELOPMENT & PLAY      |  | | Amygdala Bond  | | Pre-Verbal     | | Co-Regulation    | | |
|  |     Sensory & Language      12m  |  | | 4 min          | | Tantrums 5 min | | Resets 4 min     | | |
|  |                                  |  | +----------------+ +----------------+ +------------------+ | |
|  | [○] [📱] DIGITAL & DEVICES       |  |                                                            | |
|  |     Zero Screens Under 2    12m  |  | [Start Course in Academy →]       [Save Syllabus to Plan]  | |
|  +----------------------------------+  +------------------------------------------------------------+ |
+-------------------------------------------------------------------------------------------------------+
```

### 3.1 UX Philosophy & Ergonomics
- **"The Clinical Studio: Professional mastery with zero clutter."**
- Employs a classic **Master-Detail architectural split**:
  - **Left Sidebar (35%):** Displays the 5 domains as tactile cards with micro-telemetry (icons, category titles, teases, duration chips).
  - **Right Canvas (65%):** Displays the comprehensive curriculum stage with display serif typography, clinical fellow callout, horizontal 3-lesson blueprint cards, and clear CTA actions.
- **Why it's user-friendly & appealing:** The interaction is instantaneous and intuitive: click domain on left, canvas on right updates with smooth cross-fade animation. On desktop, this is the most ergonomic and spacious presentation possible.

### 3.2 Prototype File
- **Standalone Prototype:** [`design-explorations/sou-81-developmental-horizons/horizon-c2-studio-console.html`](./horizon-c2-studio-console.html) (also in `previews/`)

---

## 4. Design C.3 — The Whole-Child Horizon Compass (5-Pillar Radial Arc)

```
+-------------------------------------------------------------------------------------------------------+
|  VOL. XXIV // CONTINUOUS LIFESPAN (0-18)                                                              |
|  Tailored Advisory for Every Developmental Horizon                                                    |
+-------------------------------------------------------------------------------------------------------+
|  [ 0–3 Infants ]   [ 4–6 Early ]   [ 7–9 Middle ]   [ 10–12 Tweens ]   [ 13–15 Teens ]   [ 16–18 Launch ] |
+-------------------------------------------------------------------------------------------------------+
|  WHOLE-CHILD COMPASS // AGES 0–3                                                                      |
|                                                                                                       |
|  CONNECTIVE 5-PILLAR DEVELOPMENTAL ARC:                                                               |
|  +----------------+  +----------------+  +----------------+  +----------------+  +----------------+   |
|  | [● ACTIVE]     |  | [○]            |  | [○]            |  | [○]            |  | [○]            |   |
|  | 🧠 Behavior    |──| 🩺 Health/Sleep|──| 🥑 Nutrition   |──| 🧩 Play/Speech |──| 📱 Digital     |   |
|  | 13 min         |  | 13 min         |  | 13 min         |  | 12 min         |  | 12 min         |   |
|  +----------------+  +----------------+  +----------------+  +----------------+  +----------------+   |
|          ▼                                                                                            |
|  +--------------------------------------------------------------------------------------------------+ |
|  | PILLAR FOCUS // BEHAVIOR & EMOTIONS • AGES 0–3                                                   | |
|  |                                                                                                  | |
|  | Sensory Overload & Infant Co-Regulation                 INSIDE THIS PILLAR (3 LESSONS):          | |
|  | Master how the 0-3 infant and toddler brain builds      01. Infant Amygdala & Attachment  4 min  | |
|  | secure attachment, why meltdowns happen, and how        02. Pre-Verbal Tantrum Reset     5 min  | |
|  | to anchor calm without isolation or shame.              03. Co-Regulation Sensory Resets 4 min  | |
|  |                                                                                                  | |
|  | [Start Pillar Course in Academy →]                                                               | |
|  +--------------------------------------------------------------------------------------------------+ |
+-------------------------------------------------------------------------------------------------------+
```

### 4.1 UX Philosophy & Emotional Resonance
- **"The Whole Child: Development is interconnected, not siloed."**
- Visually communicates Alongside's core medical thesis: a toddler's tantrums (Behavior) are directly tied to their wake windows (Health/Sleep), mealtime hunger (Nutrition), speech milestones (Development), and parent presence (Digital).
- An interactive **5-node connected arc** spans the top of the container with organic connector lines.
- Selecting any node lights up that domain with an emerald pulse and points directly down into the curriculum spotlight stage.
- **Why it's creative & appealing:** Moves beyond generic software boxes into an empathetic, human-centered pediatric dashboard.

### 4.2 Prototype File
- **Standalone Prototype:** [`design-explorations/sou-81-developmental-horizons/horizon-c3-radial-arc.html`](./horizon-c3-radial-arc.html) (also in `previews/`)

---

## 5. Design C.4 — The Pediatric Field Dossier (Tactile Tabbed Binder)

```
+-------------------------------------------------------------------------------------------------------+
|  VOL. XXIV // CONTINUOUS LIFESPAN (0-18)                                                              |
|  Tailored Advisory for Every Developmental Horizon                                                    |
+-------------------------------------------------------------------------------------------------------+
|  [ 0–3 Infants ]   [ 4–6 Early ]   [ 7–9 Middle ]   [ 10–12 Tweens ]   [ 13–15 Teens ]   [ 16–18 Launch ] |
+-------------------------------------------------------------------------------------------------------+
|                                                                                                       |
|      +------------------+ +----------------+ +---------------+ +---------------+ +-----------------+  |
|      | [🧠 Behavior] ★  | | [🩺 Health]    | | [🥑 Nutrition]| | [🧩 Play]     | | [📱 Digital]    |  |
|  +---┴──────────────────┴─┴────────────────┴─┴───────────────┴─┴───────────────┴─┴─────────────────+  |
|  | VOL. XXIV // HORIZON 01 // BEHAVIOR & EMOTIONS                          [PEDIATRIC BOARD SEAL]   |  |
|  |                                                                         Curriculum Calibrated    |  |
|  | Sensory Overload & Infant Co-Regulation                                 for Ages 0–3 • 13 min    |  |
|  | Master how the infant brain builds secure attachment, why meltdowns occur...                    |  |
|  |                                                                                                  |  |
|  | Clinical Fellow Observation: Pre-verbal infants lack cognitive self-soothing mechanisms;        |  |
|  | emotional stabilization requires physical mirror-neuron co-regulation from a calm caregiver.     |  |
|  |                                                                                                  |  |
|  | INCLUDED CLINICAL MODULES (3 STEP-BY-STEP LESSONS):                                              |  |
|  | ───────────────────────────────────────────────────────────────────────────────────────────────  |  |
|  | § 01. The Neurobiology of the Infant Amygdala & Attachment Bond                         ⏱️ 4 min  |  |
|  | § 02. Pre-Verbal Tantrums: De-escalation Without Isolation or Shame                     ⏱️ 5 min  |  |
|  | § 03. The Co-Regulation Protocol: 3 Sensory Resets When Exhausted                       ⏱️ 4 min  |  |
|  | ───────────────────────────────────────────────────────────────────────────────────────────────  |  |
|  |                                                                                                  |  |
|  | [Open Clinical Module in Academy →]                           Document Archive Ref: #ALN-0-0     |  |
|  +--------------------------------------------------------------------------------------------------+  |
+-------------------------------------------------------------------------------------------------------+
```

### 5.1 UX Philosophy & Prestige
- **"The Pediatric Field Guide: Tactile archival authority."**
- Modeled after prestige archival scientific binders, clinical case dossiers, and field naturalists' notebooks.
- Features **staggered physical tab handles** along the top of the sheet (`[ 🧠 Behavior ]`, `[ 🩺 Health ]`, etc.). Clicking a tab brings that section's dossier page forward with subtle depth layering.
- Includes an official **Pediatric Board Review Seal**, clinical fellow observation note, and an elegant ledger table with section markers (`§ 01`, `§ 02`, `§ 03`).
- **Why it's appealing & easy to digest:** Parents immediately recognize physical notebook tabs. It conveys deep scientific rigor and safety without clinical coldness.

### 5.2 Prototype File
- **Standalone Prototype:** [`design-explorations/sou-81-developmental-horizons/horizon-c4-field-dossier.html`](./horizon-c4-field-dossier.html) (also in `previews/`)

---

## 6. Design C.5 — The Horizon Carousel Stream (Horizontal Spotlight Ribbon)

```
+-------------------------------------------------------------------------------------------------------+
|  VOL. XXIV // CONTINUOUS LIFESPAN (0-18)                                                              |
|  Tailored Advisory for Every Developmental Horizon                                                    |
+-------------------------------------------------------------------------------------------------------+
|  [ 0–3 Infants ]   [ 4–6 Early ]   [ 7–9 Middle ]   [ 10–12 Tweens ]   [ 13–15 Teens ]   [ 16–18 Launch ] |
+-------------------------------------------------------------------------------------------------------+
|  CATEGORY QUICK JUMP:                                                                                 |
|  [● 🧠 Behavior]  [○ 🩺 Health]  [○ 🥑 Nutrition]  [○ 🧩 Play & Speech]  [○ 📱 Digital & Tech]        |
|                                                                                                       |
|  +--------------------------------------------------------------------------------------------------+ |
|  |  (‹) PREV                                                                             NEXT (›)   | |
|  |                                                                                                  | |
|  |  [🧠] BEHAVIOR & EMOTIONS • AGES 0–3 • ⏱️ 13 MIN                                                | |
|  |                                                                                                  | |
|  |  Sensory Overload & Infant Co-Regulation               3 CLINICAL MICRO-LESSONS:                 | |
|  |  Master how the infant brain builds secure             01. Infant Amygdala & Bond       4 min    | |
|  |  attachment, why meltdowns happen, and how             02. Pre-Verbal Tantrum Reset     5 min    | |
|  |  to anchor calm without isolation or shame.            03. Co-Regulation Resets         4 min    | |
|  |                                                                                                  | |
|  |  [Start Course in Academy →]                                                                     | |
|  +--------------------------------------------------------------------------------------------------+ |
|                                                                                                       |
|  STREAM POSITION:  [====]  [----]  [----]  [----]  [----]                                             |
+-------------------------------------------------------------------------------------------------------+
```

### 6.1 UX Philosophy & Modern App Flow
- **"The Spotlight Ribbon: Solves the 5-card puzzle through continuous horizontal flow."**
- Completely sidesteps the awkward 3+2 grid asymmetry by treating the 5 domains as a **fluid horizontal card ribbon**.
- The active domain sits in full elevated spotlight with its 3 lessons displayed.
- Arrow navigation (`‹` and `›`), bottom pill bars, and mobile touch swipe allow fluid progression through all 5 areas.
- **Why it's fluent & user friendly:** Very familiar modern app interaction; ideal for mobile users who prefer swiping over scanning long vertical pages.

### 6.2 Prototype File
- **Standalone Prototype:** [`design-explorations/sou-81-developmental-horizons/horizon-c5-carousel-stream.html`](./horizon-c5-carousel-stream.html) (also in `previews/`)

---

## 7. Comparative Feature Matrix of the 5 Evolutions

| Feature / Dimension | C.1: Fluid Accordion | C.2: Studio Console | C.3: Compass Arc | C.4: Field Dossier | C.5: Carousel Stream |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary Interaction** | In-place card expand | Master-detail click | Arc node select | Folder tab click | Arrow / swipe stream |
| **Spatial Behavior** | Vertical accordion | 2-column split (35/65) | Top arc + bottom stage | Tabbed binder sheet | Horizontal center spotlight |
| **5-Domain Presence** | Always visible (summary strips) | Always visible (sidebar list) | Always visible (top arc) | Always visible (tab handles) | Top quick-jump pills + dots |
| **Cognitive Load** | **Extremely Low** | **Very Low** | Moderate | Low | Low |
| **Mobile Adaptability** | Flawless vertical stack | Stacks to tabbed view | Responsive wrap grid | Horizontal tab scroll | Natural touch swipe |
| **Aesthetic Vibe** | Clean editorial journal | Professional clinical studio | Holistic biophilic arc | Warm archival notebook | Modern SaaS app ribbon |
| **Trace 1 Mode Switch** | ❌ Completely removed | ❌ Completely removed | ❌ Completely removed | ❌ Completely removed | ❌ Completely removed |
| **Age Stage Anchoring** | 100% direct age browse | 100% direct age browse | 100% direct age browse | 100% direct age browse | 100% direct age browse |
| **Lesson Preview Depth** | 3 lessons with minutes | 3 lessons in bento grid | 3 lessons in right drawer | 3 lessons in ledger table | 3 lessons in right drawer |
