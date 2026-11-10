# AlongSide — Design Alternatives: Family Pacts & Devices Hub
**Author:** Frontend Autonomous Systems Engineer  
**Task ID:** SOU-83 (Phase 2 — Page-Level UX Exploration & Design Alternatives)  
**Target Page:** Family Pacts & Devices Hub (`/devices`)  
**Design Standard:** Approved Direction: **Taste 2: Editorial Pediatric Almanac** (`design-system/alongside/MASTER.md`)  
**Status:** Design Proposal Complete — Pending Direction Approval  

---

## Executive Summary

Based on the quantitative and qualitative findings in [`PAGE_AUDIT.md`](./PAGE_AUDIT.md), the current Family Pacts & Devices Hub suffers from:
1. **Cognitive fragmentation** across 4 disconnected horizontal tabs.
2. **Dense IT enterprise jargon** ("PKCS#7 cryptographic signing", "tamper webhook", "MDM profile").
3. **Severe redundancy** with the Sunday Youth Culture Digest (`/digest`).
4. **Obscured primary user actions** (verifying tonight's 8:30 PM bedtime lock and inspecting family treaty terms).
5. **Visual clutter and inconsistent color themes** (competing violet, teal, green, and amber gradients).

To solve these frictions while preserving AlongSide's foundational brand identity ("Parent Calm"), we have developed **THREE genuinely distinct design alternatives**.

---

## Alternative Overview Matrix

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   THREE DISTINCT UX APPROACHES                                       │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DIRECTION A: MINIMAL & FOCUSED ("The Calm Pact & Curfew Cockpit")                                  │
│ • Adaptive single-page cockpit with zero tab flipping.                                              │
│ • Hero Curfew Status Dock answers "Is bedtime protected tonight?" in 1 second.                     │
│ • Side-by-side Mutual Commitments card (Parent & Child) in plain human language.                    │
│ • Jargon eliminated; secondary workflows (Bridge Ladder, QR modal) accessible in 1 click.          │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DIRECTION B: VISUAL & INTERACTIVE ("The Living Family Treaty & Device Dock")                        │
│ • Visual, graphical mental model replacing explanatory paragraphs.                                 │
│ • 24-Hour Bedtime Arc Timeline: interactive dial simulating daytime -> 8:30 PM lock -> morning.     │
│ • Digital Parchment Treaty with realistic signed wax seals / signature badges for Parent & Child.   │
│ • Live Device Mockup showing the calm, locked screen ("Emergency calls to Mom & Dad active").       │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DIRECTION C: STRUCTURED & GUIDED ("The 3-Stage Family Tech Journey")                               │
│ • Stepwise, progressive lifecycle model guiding parents through their family tech journey.           │
│ • Stage 1: Readiness & Bridge Devices -> Stage 2: Co-Negotiated Pact -> Stage 3: Automated Bedtime. │
│ • Clear status indicators (Completed, In Progress, Scheduled) with accordion progressive disclosure.│
│ • Ideal for parents who feel overwhelmed and crave structured, step-by-step guidance.               │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Phase 2b: Synthesized Design Alternatives (Merging Direction B & C with Tier Tailoring)

### 5.1 User Directive & Synthesis Rationale
Following review of the initial exploratory directions, the user issued explicit steering guidance:
> *"Direction B and C are good but we should submerge things together, so let's keep from Direction C the guiding, to make us know whether our child is at which stage, also make it tailored to each child (like doing a pact for a toddler is not relevant, so tailored by tier), and we keep this part from Direction B where we are showing the phone and showing these informations: The Bilateral Family Treaty (Co-authored by Leo and Parents • Certified Bilateral Agreement, ✓, Leo's Mutual Pledges [Dock phone by 9:00 PM nightly, Homework completed first, Zero secret disguise apps], Parents' Mutual Pledges [Zero stealth spyware, Device-free dinner table, Safe Harbor Guarantee], ✍ Leo's Signature Verified, ✍ Parents' Signature Verified, Print Treaty PDF), and Lock Screen Preview (9:00 PM Wednesday, Nov 12, 🌙 Bedtime Peace Active, Recreational apps are paused until 7:00 AM under your AlongSide Family Pact, Always Unlocked: 📞 Call Mom, 📞 Call Dad, Emergency 911 & Contacts Always Open, Scan Device Enrollment QR). So create me 3 more designs from there."*

To satisfy this mandate, we engineered **THREE distinct synthesized design alternatives** that combine developmental stage tailoring with the high-fidelity Bilateral Treaty and live Phone Simulator.

---

### 5.2 Synthesized Alternative 1: Adaptive Split-Deck & Developmental Compass
**Prototype File:** [`prototype-1-adaptive-split-deck.html`](./prototype-1-adaptive-split-deck.html)

#### 1. UX Philosophy
**"Spatial Harmony: Developmental Guidance on Top, Operational Peace in the Cockpit."**
Parents instantly understand where their child sits along the developmental lifespan (Tiers 0–5) and interact with a side-by-side split cockpit where the co-signed Treaty and the live Phone Lock Screen exist in direct symbiosis.

#### 2. Key Architecture & Features
- **Developmental Compass Header:** Displays the 4 primary lifespan milestones:
  - *Tier 0 (Ages 0–3): Infant/Toddler* — Sensorimotor Habit & Zero Solitary Screens.
  - *Tier 2 (Ages 4–9): Elementary* — Bridge Device & Shared Family Tablet Boundaries.
  - *Tier 3 (Ages 10–12): Pre-Teen* — Active Smartphone & Certified Bilateral Covenant.
  - *Tier 4 (Ages 13–18): Teen* — Circadian Autonomy & Privacy Safe Harbor.
- **Dynamic Tier Adaptation (Toddler vs. Pre-Teen):**
  - When switching to **Toby (Age 2 • Toddler)**: The system alerts the parent that bilateral contracts are neurodevelopmentally inappropriate for a toddler. It automatically swaps out the treaty/phone with **Pediatric Environmental Guidelines** (Zero Solitary Screens, Co-Viewing Only, 7:30 PM Melatonin Sunset Routine).
  - When switching to **Leo (Age 10 • Pre-Teen)**: Unlocks the full **Split-Deck Workbench**:
- **Left Deck (7 cols) — The Bilateral Family Treaty:**
  - Co-authored by Leo Davies and Parents • Certified Bilateral Agreement (#4092) with verified seal (`✓`).
  - **Leo's 3 Pledges (Child):** 1) Dock phone at hallway station by 9:00 PM nightly; zero bedroom screens during sleep hours, 2) Homework & household tasks completed before recreational YouTube or gaming, 3) Zero secret disguise apps (calculator vaults) or hidden secondary accounts.
  - **Parents' 3 Pledges (Adults):** 1) Zero stealth spyware: Parents will never read private text messages or secretly spy on conversations, 2) Device-free dinner table: Adults dock work laptops and phones away during shared family meals, 3) Safe Harbor Guarantee: No punitive device confiscation when Leo seeks help about uncomfortable online encounters.
  - **Verified Signatures:** `✍ Leo Davies (Verified Digital Signature)` and `✍ Sarah & Michael Davies (Verified Digital Signature)`.
  - **1-Click Actions:** `Print Treaty (PDF)` modal with refrigerator-ready print layout.
- **Right Deck (5 cols) — Physical iPhone Lock Screen & Curfew Controller:**
  - Realistic iPhone frame displaying:
    - `9:00 PM` • `Wednesday, Nov 12`
    - Notification: `🌙 Bedtime Peace Active — Recreational apps are paused until 7:00 AM under your AlongSide Family Pact.`
    - Always Unlocked Emergency Dials: `📞 Call Mom`, `📞 Call Dad`, and `Emergency 911 & Contacts Always Open`.
  - Curfew slider to simulate dynamic lock times (7:00 PM to 10:00 PM).
  - High-visibility `Scan Device Enrollment QR` button launching an interactive QR pairing modal with instant profile download and direct link copy.

---

### 5.3 Synthesized Alternative 2: The Sequential Journey Ladder & Phone Canvas
**Prototype File:** [`prototype-2-journey-canvas.html`](./prototype-2-journey-canvas.html)

#### 1. UX Philosophy
**"Narrative Scaffolding: Guiding Parents Through Milestones Before Presenting Tools."**
Parents often feel overwhelmed by tech rules without context. This alternative structures the experience as a 3-step developmental progression ladder, integrating the treaty and phone into an open canvas at Step 2 & 3.

#### 2. Key Architecture & Features
- **Developmental Progression Stepper:**
  - *Step 1: First-Phone Neuro-Readiness Diagnostic* (Completed • Score 84/100).
  - *Step 2 & 3: Bilateral Treaty Co-Authoring & Automated Bedtime Enforcement* (Active & Operational).
- **Toddler Adaptation:**
  - Clearly explains developmental neurobiology: why toddlers under 3 cannot process contracts and directs parents to age-appropriate language exposure and ambient sleep habits.
- **Integrated Canvas for Pre-Teens (Leo):**
  - Step 2 & 3 are unified into an open parchment ledger displaying the exact mutual pledges, dual signatures, and print export trigger.
  - Floating physical device simulator embedded alongside the treaty, showing the 9:00 PM lock screen, always-unlocked emergency contacts, and the device enrollment QR launcher.

---

### 5.4 Synthesized Alternative 3: Ambient Command Center & Live Viewport
**Prototype File:** [`prototype-3-ambient-command-center.html`](./prototype-3-ambient-command-center.html)

#### 1. UX Philosophy
**"Zero Friction Dashboard: All Developmental Signals & Controls in One High-Density Screen."**
Designed for the active parent who wants immediate status, rapid adjustments, and clean visual confirmation without scrolling.

#### 2. Key Architecture & Features
- **Unified Child Identity & Tier HUD:**
  - Displays child avatar, age, developmental tier badge, device enrollment status (`iPhone 13 • Profile Enforced`), and tonight's lock schedule at a single glance.
  - Rapid action toolbar: `⏱ +30 Min Weekend Pass` (toggles curfew between 9:00 PM and 9:30 PM with live phone screen update) and `🖨 Print Treaty (PDF)`.
- **Side-by-Side Co-Pilot Grid:**
  - Left: The Bilateral Family Treaty with verified badge, interactive checklist of Leo's 3 pledges and Parents' 3 pledges, and dual verified signature stamps.
  - Right: Tactical iPhone viewport with 9:00 PM lock screen, emergency dials, and `Scan Device Enrollment QR` card.
- **Autonomy Trajectory Drawer:**
  - Informs parents of upcoming neurodevelopmental milestones (e.g. Age 11 weekend flex-pass unlock after 90 days of consistent hallway docking).


### 1. UX Philosophy
**"Maximum clarity in 2 seconds. Bedtime peace guaranteed without cognitive friction."**

Parents are tired. When they open AlongSide in the evening, they do not want to navigate a 4-tab labyrinth or read about PKCS#7 cryptography. They want immediate reassurance that the bedtime curfew is armed, quick access to review their family rules, and a 1-tap trigger to enroll or extend curfew by 30 minutes for special occasions.

Direction A collapses the 4-tab paradigm into a **single, unified, adaptive cockpit**. It places the two essential pillars of digital parenting front and center:
1. **The Automated Bedtime Curfew** (the neutral, automated enforcer).
2. **The Bilateral Family Pact** (the co-created mutual promise).

Technical jargon is stripped away in favor of calming, plain-spoken language: *"Leo's phone rests at 8:30 PM. Emergency calls to parents are always open."*

---

### 2. Information Architecture & Layout Wireframe

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│  HEADER: Child Context Strip [ Leo (Age 10 • 5th Grade) ▾ ]  [ Road 2: Active Governance ]       │
│  H1: Family Pact & Device Protection                                                            │
│  Sub: Peaceful evenings guaranteed through bilateral agreements and neutral bedtime locks.      │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ HERO: Bedtime Curfew Dock (Operational Status)                                              │  │
│  │ ● TONIGHT'S BEDTIME CURFEW: 8:30 PM LOCK [ ACTIVE & VERIFIED ]                             │  │
│  │ "At 8:30 PM, recreational apps sleep automatically. Emergency calls to parents active 24/7"│  │
│  │                                                                                            │  │
│  │ Actions: [ ⚡ +30 Min Weekend Pass ]  [ ⚙ Adjust Curfew ]  [ 📲 Show QR Enrollment ]       │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ BILATERAL FAMILY PACT SUMMARY (Signed Nov 12, 2026 • Verified Dual-Signature)              │  │
│  │                                                                                            │  │
│  │ ┌──────────────────────────────────────┐  ┌──────────────────────────────────────────────┐  │  │
│  │ │ LEO'S PROMISES (Child)               │  │ PARENTS' PROMISES (Adults)                   │  │  │
│  │ │ • Hallway dock by 8:30 PM nightly    │  │ • Zero secret surveillance / text reading    │  │  │
│  │ │ • Homework before recreation         │  │ • Screen-free family dinner table            │  │  │
│  │ │ • No hidden vault or disguise apps   │  │ • Safe Harbor: No punishment if issues report│  │  │
│  │ └──────────────────────────────────────┘  └──────────────────────────────────────────────┘  │  │
│  │                                                                                            │  │
│  │ Footer Actions: [ Edit Agreement Clauses ]  [ Print Refrigerator Treaty (PDF) ]            │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ SECONDARY UTILITY BAR: [ Bridge Device Autonomy Ladder (Stage 4) ▾ ]  [ Culture Digest ↗ ] │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3. Key UX Improvements & Content Simplifications
- **Zero Tab Flipping:** Both the pact commitments and the device curfew status live together, highlighting the symbiotic relationship between rules and enforcement.
- **Human Copy Over IT Jargon:**
  - *Before:* "Every Alongside device profile is cryptographically signed with Apple PKCS#7 certificates."
  - *After:* "Verified by Apple • Emergency calls to parents are never locked."
- **Quick-Pass Flexibility:** Parents can grant a 30-minute "Friday Movie Pass" with a single click, eliminating rigid friction.
- **Culture Intel Consolidated:** The redundant slang decoder grid is replaced with a discreet link to `/digest`, removing 300+ words of off-topic clutter.

### 4. Advantages & Disadvantages
- **Advantages:**
  - Lowest cognitive load of all options (answers questions in < 2 seconds).
  - Outstanding mobile experience with zero horizontal scrolling.
  - Perfect alignment with "Parent Calm at 2:00 AM" brand promise.
- **Disadvantages:**
  - For parents who want to browse all 4 bridge stages simultaneously, secondary content requires opening a drawer or expansion panel.

---

## Direction B — Visual & Interactive: "The Living Family Treaty & Device Dock"

### 1. UX Philosophy
**"Show the calm rhythm of the day. Make agreements tactile, visual, and engaging."**

Reading text lists of rules is boring and feels punitive. Direction B transforms the Family Pacts and Devices page into an **interactive visual experience** that parent and child can explore together on a tablet or laptop.

It introduces three interactive visual mental models:
1. **Interactive 24-Hour Bedtime Arc Timeline:** A circular/arc time dial showing daytime learning, dinner wind-down, 8:30 PM neutral lock, and overnight charging. Parents can drag or click to preview when apps lock and unlock.
2. **The Living Parchment Agreement:** A beautifully styled editorial treaty complete with digital signature stamps, pledge checklist toggles, and mutual seal badges.
3. **Live Device State Simulator:** An authentic visual mockup of an iPhone/Android screen showing the calm bedtime display: *"Bedtime Peace Active • Phone resting until 7:00 AM • Emergency calls to Mom & Dad available"*.

---

### 2. Information Architecture & Layout Wireframe

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│  HEADER: Child Context Selector & Lifespan Badge                                                │
│  H1: The Family Agreement & Living Device Dock                                                   │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ INTERACTIVE 24-HOUR BEDTIME ARC TIMELINE                                                   │  │
│  │                                                                                            │  │
│  │   [ 7:00 AM Morning ] ──────── [ 6:00 PM Dinner ] ────┬─── [ 8:30 PM Lock ] ── [ Sleep ]   │  │
│  │                                                       │                                    │  │
│  │   Active Time Dial: [ 8:30 PM ] (Slider: 7:30 PM ───●─── 9:30 PM)                          │  │
│  │   Status: "Curfew engages in 2 hrs 14 mins • 100% Parent Safety Calls Preserved"           │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
│  ┌───────────────────────────────────────────────┐  ┌─────────────────────────────────────────┐  │
│  │ THE BILATERAL TREATY PARCHMENT                │  │ LIVE DEVICE SIMULATOR                   │  │
│  │ [ Certified Bilateral Family Covenant ]       │  │                                         │  │
│  │                                               │  │     ┌─────────────────────────────┐     │  │
│  │ 👤 Leo's Pledges (3 Verified)                 │  │     │  📱 Apple iPhone 14         │     │  │
│  │  ☑ Dock at hallway station by 8:30 PM         │  │     │                             │     │  │
│  │  ☑ Schoolwork prior to screen games           │  │     │      🌙 Bedtime Calm Active │     │  │
│  │  ☑ Zero disguised or hidden vault apps        │  │     │         Apps locked at 8:30 │     │  │
│  │                                               │  │     │                             │     │  │
│  │ 🛡 Parents' Pledges (3 Verified)              │  │     │      📞 Call Mom / Call Dad │     │  │
│  │  ☑ No secret spyware reading personal texts   │  │     │         (Always Allowed)    │     │  │
│  │  ☑ Screen-free family dinner table            │  │     └─────────────────────────────┘     │  │
│  │  ☑ Safe Harbor Guarantee for honest reports   │  │                                         │  │
│  │                                               │  │  Profile: Cryptographically Active      │  │
│  │ Dual Signatures: [ Leo ✍ ]  [ Parents ✍ ]     │  │  Actions: [ 📲 Scan QR ] [ 📄 PDF ]    │  │
│  └───────────────────────────────────────────────┘  └─────────────────────────────────────────┘  │
│                                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ VISUAL BRIDGE AUTONOMY ROADMAP (4 Visual Milestones: Tablet → Watch → Feature → Phone)      │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3. Key UX Improvements & Content Simplifications
- **Visual Reassurance:** The phone simulator shows parents *exactly* what the child sees at 8:30 PM, demystifying the technology and eliminating the fear that the phone is "bricked" or unable to call 911.
- **Interactive Time Dial:** Instead of typing hours into a form or reading a static time badge, parents slide a tactile dial to see the curfew adjust in real time.
- **Bilateral Parchment:** Formats the agreement as a solemn, collaborative family treaty that parents and children can review side-by-side.

### 4. Advantages & Disadvantages
- **Advantages:**
  - Highest visual polish and engagement.
  - Eliminates abstract explanations by showing the exact device state.
  - Highly collaborative; ideal for family co-negotiation meetings.
- **Disadvantages:**
  - Slightly more complex UI footprint with interactive widgets and device mockups.
  - Requires careful responsive optimization on smaller mobile devices.

---

## Direction C — Structured & Guided: "The 3-Stage Family Tech Journey"

### 1. UX Philosophy
**"A clear, step-by-step path from first curiosity to peaceful daily tech habits."**

Many parents feel completely overwhelmed by digital parenting. They don't know where to begin: *Should I buy a watch? When do I install parental controls? What do we agree on?*

Direction C frames the Family Pacts and Devices page as a **clear, 3-stage family journey**. Rather than presenting all tools at once, it guides parents through three sequential milestones:
- **Stage 1: Readiness & Bridge Devices** ("Where are we today? What device fits Leo's developmental maturity?")
- **Stage 2: The Bilateral Agreement** ("What are our shared family rules and mutual commitments?")
- **Stage 3: Automated Bedtime Protection** ("How do we enforce the rules neutrally without arguments?")

Each stage has an explicit status indicator (`Completed`, `In Progress`, or `Active`), a completion score, and expandable details that reveal deeper tools when the parent is ready.

---

### 2. Information Architecture & Layout Wireframe

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│  HEADER: Journey Overview & Child Context                                                        │
│  H1: Leo's Digital Independence Journey                                                          │
│  Progress: [ 2 of 3 Milestones Completed • 85% Health Score ]                                    │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ STAGE 1: READINESS & BRIDGE DEVICES                            [ ✓ COMPLETED • SCORE 84/100 ]│
│  │ Status: Leo is evaluated as ready for a supervised bilateral smartphone.                   │
│  │ Device Stage: Stage 4 (Bilateral Smartphone) reached via Bridge Autonomy Ladder.           │
│  │ [ View 10-Dimension Audit Report → ]                                                       │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ STAGE 2: THE BILATERAL FAMILY PACT                             [ ✓ SIGNED & ACTIVE ]        │  │
│  │ Status: Dual-signed agreement sealed on Nov 12, 2026. 6 mutual commitments active.         │  │
│  │ Summary: Hallway docking by 8:30 PM • Homework first • Zero spyware • Safe Harbor guaranteed│  │
│  │ Actions: [ Review Full Agreement ]  [ Print Refrigerator PDF ]                              │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ STAGE 3: AUTOMATED BEDTIME CURFEW                             [ ● OPERATIONAL TONIGHT ]    │  │
│  │ Status: Apple iOS Profile Active • 8:30 PM Automatic App Pause                             │  │
│  │ Peace of Mind: Emergency phone calls to parents are guaranteed 24/7.                       │  │
│  │ Actions: [ 📲 Scan QR Enrollment ]  [ ⏱ Adjust Curfew (8:30 PM) ]  [ ⚡ Extend Tonight ]   │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ FOOTER: Next Milestone Recommendation & Sunday Youth Culture Preview                       │  │
│  └────────────────────────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3. Key UX Improvements & Content Simplifications
- **Linear Mental Model:** Solves parent confusion by answering *"What should I do first, second, and third?"*
- **Progressive Disclosure:** Each stage card is summarized cleanly in 3 lines; clicking expands the full audit or clause editor without leaving the page.
- **Clear Health Status:** Gives parents a sense of accomplishment (2 of 3 milestones complete) rather than an endless checklist.

### 4. Advantages & Disadvantages
- **Advantages:**
  - Exceptional guidance for new parents who need handholding through the smartphone transition.
  - Clean, hierarchical structure that prevents cognitive overload.
- **Disadvantages:**
  - Experienced parents who just want to check tonight's curfew must look down to Stage 3.
  - Less immediate than Direction A's single-glance cockpit.

---

## Conclusion & Transition to Prototypes

All three design alternatives strictly respect the **Taste 2: Editorial Pediatric Almanac** design system (`#143D2B` Spruce Forest, `#FBFBF9` Linen Canvas, `#B45309` Amber, `#111413` Ink, Newsreader serif, and JetBrains Mono).

Each direction is realized as an interactive, fully responsive standalone HTML/CSS prototype in `design-explorations/sou-83-family-pacts-devices/`:
1. `prototype-a-minimal-focused.html`
2. `prototype-b-visual-interactive.html`
3. `prototype-c-structured-guided.html`

View and compare all three live in the interactive preview portal at `index.html`.
