# Alongside — Streamlined Navigation, Tab Decluttering & Zero-Redundant-Age Specification
**Author:** Chief Technology Officer (CTO)  
**Status:** Approved Architectural Specification  
**Version:** 2.5.0 (Calm UX, Cognitive Load Reduction & Zero-Redundant-Age Architecture)  
**Target Audience:** Frontend Agent, Backend Agent, Product Leadership  
**Companion Documents:**  
- [`docs/PROJECT_SCOPE.md`](PROJECT_SCOPE.md) (Canonical Product Scope v2.4.0)  
- [`docs/holistic-redesign-and-navigation-spec.md`](holistic-redesign-and-navigation-spec.md) (Unified Navigation Architecture)  
- [`docs/system-architecture.md`](system-architecture.md) (System Architecture)  
- [`docs/codebase-design.md`](codebase-design.md) (Deep Modules & Seam Catalog)  
- [`plans/README.md`](../plans/README.md) (Master Engineering Execution Index)  

---

## 1. Executive Summary & Problem Framing

In Paperclip task **SOU-57**, the CEO conducted a holistic review of the user experience across AlongSide's active tabs and flagged four severe usability issues that create cognitive friction, user fatigue, and information overload:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   CURRENT UX FRICTIONS IDENTIFIED (SOU-57)             │
├────────────────────────────────────────────────────────────────────────┤
│ 1. TAB OVERLOAD & VAGUE NAMING:                                        │
│    • 6 Core Tabs + "More" Dropdown (7 destinations) in desktop header.  │
│    • "Today" is ambiguous—sounds like a daily to-do list, not Home.     │
│    • "More" menu hides key parent intelligence features awkwardly.     │
│                                                                        │
│ 2. USER DROPDOWN REDUNDANCY:                                           │
│    • Clicking user avatar reveals 4 redundant domain links:            │
│      "Family Dashboard", "Parent Academy", "Sunday Culture Digest",     │
│      and "24/7 AI Child Advisor".                                      │
│    • Conflates application navigation with personal account settings.  │
│                                                                        │
│ 3. REDUNDANT CHILD AGE QUESTIONS:                                      │
│    • Parents input child age and birth month/year during onboarding.   │
│    • Yet tools (e.g. Antipyretic Dosing Calculator) prompt:            │
│      "Child Age (Months)" as a manual numeric input field.             │
│    • Nutrition and Play force parents to browse all 5 age stages.      │
│                                                                        │
│ 4. INTRA-TAB DUPLICATION & CLUTTER:                                    │
│    • "Family OS Domain Hubs" card on Home repeats top navbar links.    │
│    • Sunday Culture Digest is triplicated: in More, User menu & Devices.│
│    • Teenagers see Baby-Led Weaning; infants see pubertal athletics.    │
└────────────────────────────────────────────────────────────────────────┘
```

The mission of AlongSide is **Parent Calm**. If our user interface presents an overwhelming wall of tabs, asks parents to re-enter their child's age, and duplicates links across multiple menus, we violate our core brand promise.

This specification defines the architectural overhaul to transform AlongSide into a serene, intuitive, and zero-redundancy platform.

---

## 2. Core Architectural Principles

### Principle 1: The "Home" Anchor (Mental Model Clarity)
- **Problem:** "Today" implies a daily agenda or ephemeral news feed. When parents are on `/health` or `/nutrition`, they wonder where the main overview or child profile cockpit is located.
- **Decision:** Rename `/dashboard` user-facing label from **"Today"** to **"Home"** across all navigation components, page headers, document titles, and breadcrumbs.
- **Rationale:** "Home" is the universal digital convention. It represents safety, grounding, and the central command center for the family.

### Principle 2: Strict Separation of Navigation vs. Account Governance
- **Problem:** The user profile dropdown contains links to Family Dashboard, Parent Academy, Sunday Culture Digest, and AI Advisor. This clutters the menu with 4 redundant links.
- **Decision:** The User Account Dropdown must be strictly scoped to **Account Identity, Credentials, Billing, and Authentication**.
  - **Included:** User Identity Pill (Name, Email, Hero Pass badge), Account Settings (`/settings`), Billing & Subscription (`/#pricing` / `/settings#billing`), Help & Support, and Hardened Session Logout.
  - **Purged:** All primary domain links (`/dashboard`, `/academy`, `/digest`, `/advisor`).

### Principle 3: Zero-Redundant-Age Architecture (Automatic Calibration)
- **Problem:** When parents add a child, the platform collects birth year/month (or age). Yet tools like `AntipyreticDosingCalculator.tsx` prompt for `Child Age (Months)` via an input field, and `NutritionDashboardView.tsx` displays all 5 lifespan stages simultaneously.
- **Decision:** **Never ask for child age again.**
  - The application automatically derives exact age in months (`ageMonths`), age in years (`ageYears`), and developmental tier from the active child profile in `useChildContextStore`.
  - Every calculation (medication dosing, feeding recommendations, play activities, tantrum scripts, curfews) auto-calibrates to the active child.
  - Age inputs are replaced with read-only calibration status badges: `Calibrated for Leo (14 mo, ~24 lbs)`.

### Principle 4: Tab Consolidation & Redundancy Purge
- **Problem:** Sunday Culture Digest exists in 3 separate places (Header "More" dropdown, User dropdown, and Tab 4 inside Devices Hub). The Home feed repeats domain links in a bottom card.
- **Decision:**
  - Consolidate Sunday Culture Digest directly into the **Modern World & Devices Hub** (`/devices`) as its native "Culture & Slang Radar" tab.
  - Eliminate the clumsy "More" dropdown from desktop navigation.
  - Establish a clean, balanced 6-tab primary navigation:
    `[ Home | Health | Nutrition | Play | Behavior | Devices ]`
  - Remove the redundant "Family OS Domain Hubs" shortcut card from the Home feed (`HolisticHomeFeed.tsx`).

---

## 3. Navigation Information Architecture (Before vs. After)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   BEFORE: FRAGMENTED & OVERWHELMING                             │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Top Bar:  [ Today ] [ Health ] [ Nutrition ] [ Play ] [ Behavior ] [ Devices & Pacts ] [ More ▾ ]│
│                                                                          │                      │
│                                                                          ├─ Academy             │
│                                                                          └─ Culture Digest      │
│                                                                                                 │
│ User Menu: [ Family Dashboard ] [ Parent Academy ] [ Culture Digest ] [ AI Advisor ]            │
│            [ Billing ] [ Account Settings ] [ Log Out ]                                         │
│                                                                                                 │
│ Home Feed: [ Child Hero ] [ Health Triage ] [ Milestones ] [ Play ] [ Nutrition ] [ AI Bar ]    │
│            [ Family OS Domain Hubs (Repeats All 7 Links Above!) ]                                │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   AFTER: STREAMLINED & PURPOSE-BUILT                            │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Top Bar:  [ Home ] [ Health ] [ Nutrition ] [ Play ] [ Behavior ] [ Devices ]                   │
│                                                                                                 │
│ User Menu: [ User Identity (Name, Email, Plan Tier) ]                                           │
│            [ Account Settings ]                                                                 │
│            [ Billing & Subscription ]                                                           │
│            [ Help & Clinical Support ]                                                          │
│            [ Log Out ]                                                                          │
│                                                                                                 │
│ Home Feed: [ Child Hero ] [ Health Triage ] [ Milestones ] [ Play ] [ Nutrition ] [ AI Bar ]    │
│            (No redundant link farms; 100% focused on active child's daily essentials)           │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Zero-Redundant-Age Technical Contract

### 4.1 The `useChildAge` Hook Specification
To eliminate duplicate age calculations and ensure that no component ever prompts for child age, we introduce a canonical hook in `apps/web/src/hooks/useChildAge.ts`:

```typescript
export interface ChildAgeProfile {
  childId: string | null;
  name: string;
  ageYears: number;
  ageMonths: number;
  ageDisplay: string;              // e.g. "14 mo" or "4 yrs" or "11 yrs"
  developmentalTier: DevelopmentalTier;
  estimatedWeightLbs: number;      // Barton Schmitt pediatric weight formula
  feedingStage: NutritionStage;     // AAP & Ellyn Satter calibrated feeding stage
  isInfantUnder6Mo: boolean;        // Strictly contraindicates Ibuprofen
  isToddlerUnder2: boolean;         // 6-24 months
  isElementary: boolean;           // 6-11 years
  isAdolescent: boolean;           // 12-18 years
  isAutoCalibrated: boolean;        // True when derived from activeChild
}
```

### 4.2 Auto-Derivation Rules & Formulas
1. **Age in Months:**
   - If `birthYear` and `birthMonth` exist:
     $$\text{ageMonths} = (\text{currentYear} - \text{birthYear}) \times 12 + (\text{currentMonth} - \text{birthMonth})$$
   - Fallback: $\text{ageMonths} = \text{ageYears} \times 12 + 6$.
2. **Pediatric Weight Estimation (Barton Schmitt):**
   - Infants under 1 year: $16 \text{ lbs}$ (or calibrated to months: $8 + 1.2 \times \text{months}$).
   - Age 1: $24 \text{ lbs}$.
   - Age 2+: $\text{round}(20 + \text{ageYears} \times 5) \text{ lbs}$.
3. **Feeding Stage Mapping:**
   - $\text{ageMonths} < 6 \implies \text{MILK\_ONLY}$
   - $6 \le \text{ageMonths} < 12 \implies \text{SOLIDS\_INTRODUCED}$
   - $1 \le \text{ageYears} \le 5 \implies \text{TODDLER\_TABLE}$
   - $6 \le \text{ageYears} \le 12 \implies \text{BALANCED\_SCHOOL}$
   - $\text{ageYears} \ge 13 \implies \text{PUBERTAL\_GROWTH}$
4. **Ibuprofen Contraindication Gate:**
   - $\text{ageMonths} < 6 \implies \text{Ibuprofen is strictly contraindicated}$; system automatically selects Acetaminophen and displays clear pediatric caution.

---

## 5. Tab-by-Tab Decluttering Blueprint

### 5.1 Tab 1: Home (`/dashboard`)
- **Renaming:** Change nav label and page title from "Today" to "Home".
- **Purge Redundancy:** Delete the `<Card>` rendering "Family OS Domain Hubs" (`HolisticHomeFeed.tsx` lines 96–188). This card simply repeated links to Academy, Devices, Nutrition, and Play.
- **Preserve:** ChildHeroCard, QuickHealthTriageLauncher, TodayMilestonesWidget, DailyPlayActivityCard, DailyNutritionTipCard, AskAdvisorPromptBar.

### 5.2 Tab 2: Health (`/health`)
- **Purge Redundant Inputs:**
  - In `AntipyreticDosingCalculator.tsx`, eliminate `<input id="age-months-input" />`.
  - Replace with read-only calibration pill: `Calibrated for {child.name} ({ageDisplay}, ~{weight} lbs)`.
- **Streamline Hero & Warnings:**
  - Replace the 400-word Barton Schmitt text wall with a crisp 2-sentence clinical reassurance.
  - Retain the 3 clean subtabs: "Symptom Triage", "Dosing Calculator", and "Sleep Regression".

### 5.3 Tab 3: Nutrition (`/nutrition`)
- **Stop Forcing 5 Lifespan Stages on Every Parent:**
  - Currently, `NutritionDashboardView.tsx` renders 5 full-width tabs ("Milk Only", "Solids Introduced", "Toddler Table", "Balanced School", "Pubertal Growth") right at the top.
  - Update: Automatically load the active child's calibrated stage.
  - Move the other 4 stages into a subtle, secondary collapsible accordion or select menu: `"Explore other developmental stages (0–18)"`.
- **Age-Relevant Subtabs:**
  - If child is $\ge 3$ years old: Hide Baby-Led Weaning from the primary subtab bar.
  - If child is $< 1$ year old: Highlight BLW and Safe Allergen Introduction, de-emphasize school lunches.

### 5.4 Tab 4: Play (`/brain-games`)
- **Auto-Filter Catalog to Child Tier:**
  - In `PlayActivityCatalog.tsx`, auto-select the active child's developmental tier.
  - Replace the 6 tier filter buttons ("All Ages", "0-2", "3-5", etc.) with a clean active filter chip: `Filtered for {child.name} ({tierLabel})` with a simple "Show all ages" toggle.
- **Maintain Core Tools:** Daily Brain Game, Boredom Buster Generator, Purposeful Play Catalog, Puppet Theater Sparring.

### 5.5 Tab 5: Behavior (`/behavior`)
- **Auto-Filter Dilemma Scenarios:**
  - Auto-select the active child's tier (e.g. Toddler hitting/biting vs. Middle Childhood lying/secrecy vs. Teen digital defiance).
  - Collapse the 7 horizontal situation buttons into the top 3-4 dilemmas calibrated for that age bracket, plus a searchable selector for other situations.
- **Highlight HALT:** Keep the 1-tap HALT diagnostic ("Hungry, Angry, Lonely, Tired") front and center.

### 5.6 Tab 6: Devices & Modern World (`/devices`)
- **Consolidate Sunday Culture Digest:**
  - Reconcile the duplicate `/digest` page with Devices Hub Tab 4 ("Youth Culture & Slang Radar").
  - Devices Hub is the single home for Screen Time, Bilateral Pacts, 8:30 PM Curfews, and Sunday Slang/Exploits.
- **Age-Calibrated Pacts:** Auto-suggest 8:00 PM curfew for younger kids, 8:30 PM for middle childhood, and 9:30 PM for teens.

---

## 6. Execution Plan Breakdown

To implement this specification with minimal blast radius and zero application breakage, the work is divided into 3 discrete engineering plans:

| Plan ID | Title | Assignee | Scope |
| :--- | :--- | :--- | :--- |
| **PLAN-25** | `25-streamlined-navigation-and-account-menu-decluttering-ui.md` | **Frontend Agent** | Rename "Today" to "Home", clean user dropdown, eliminate "More" menu, remove duplicate link card from Home feed. |
| **PLAN-26** | `26-automatic-child-age-derivation-and-domain-sync-ui.md` | **Frontend Agent** | Implement `useChildAge`, eliminate manual age inputs in Dosing Calculator, auto-calibrate pediatric tools. |
| **PLAN-27** | `27-holistic-domain-tabs-decluttering-and-redundancy-purge-ui.md` | **Frontend Agent** | Tab-by-tab decluttering (Health, Nutrition, Play, Behavior, Devices), stage collapsing, and Digest consolidation. |

---

## 7. Verification & Anti-Over-Engineering Checklist

- [ ] Zero new npm package dependencies (100% native React 19, TypeScript, Tailwind CSS, Lucide icons).
- [ ] No regression on existing automated test suites (`vitest`, Fastify inject, Prisma schema).
- [ ] Responsive navigation verified across 360px–1440px viewports with zero horizontal overflow.
- [ ] All child tools operate smoothly for accounts with 0 children, 1 child, or multiple children.
- [ ] Ponytail Diff Audit: Smallest working change that fully resolves the problem.
