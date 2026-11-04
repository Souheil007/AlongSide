# Alongside — Engineering Execution Plans Roadmap
**Author:** Chief Technology Officer (CTO)  
**Status:** Master Engineering Plan Index  
**Version:** 2.4.0 (The Holistic Child Upbringing, Pediatric Health & Lifespan Family OS)  
**Companion Documents:**  
- [`docs/technical-roadmap-v2.4.0.md`](../docs/technical-roadmap-v2.4.0.md)  
- [`docs/PROJECT_SCOPE.md`](../docs/PROJECT_SCOPE.md)  
- [`docs/system-architecture.md`](../docs/system-architecture.md)  
- [`docs/codebase-design.md`](../docs/codebase-design.md)  

---

## 1. Overview & Phased Dependency Graph

This directory contains 23 discrete, actionable engineering execution plans designed to be assigned directly as Paperclip issues to our engineering team members: **Frontend Agent**, **Backend Agent**, **Research Engineer**, and **Joint (FE & BE)**.

```mermaid
graph TD
    subgraph FoundationalAndCore ["Foundational Platform & Core Governance (Complete)"]
        P01["01: Monorepo Setup & Database (BE)"]
        P02["02: Auth & Session API (BE)"]
        P03["03: Frontend Scaffolding & Auth UI (FE)"]
        P04["04: Child Profile & Road Fork API (BE)"]
        P05["05: Child Onboarding & Road UI (FE)"]
        P06["06: Bilateral Pact & Profile Signer API (BE)"]
        P07["07: Pact Wizard & QR Enrollment UI (FE)"]
        P08["08: Academy & Culture Digest API (BE)"]
        P09["09: Academy Player & Culture UI (FE)"]
        P10["10: 24/7 AI Advisor & FAQ API (BE)"]
        P11["11: AI Chat & Sparring UI (FE)"]
        P15["15: Whole-Child Development Research (Research)"]
    end

    subgraph HolisticLifespanShift ["v2.4.0 Holistic Lifespan OS Transition (Active & Queued)"]
        P16["16: Holistic Domain Schema, Health Triage & Milestone API (BE)"]
        P17["17: Holistic Family Dashboard & Unified Navigation UI (FE)"]
        P18["18: Pediatric Health Triage & Nutrition Hub UI (FE)"]
        P19["19: Brain Games, Puppets & Behavioral Psychology UI (FE)"]
        P20["20: Clinical AI Advisor Lifespan RAG & Sparring Upgrade (Joint)"]
        P21["21: Unified Navigation Shell & Logout Hardening UI (FE/BE)"]
        P22["22: Omnipresent Floating AI Advisor Bubble & Drawer UI (FE)"]
        P23["23: Holistic Lifespan Family OS Homepage Redesign (FE)"]
    end

    subgraph CommercialAndHardening ["Commercialization & Production Hardening (Queued)"]
        P12["12: Interactive Assessment Suite (Joint)"]
        P13["13: Stripe Billing & 7-Day Trial (BE)"]
        P14["14: E2E Integration & Launch Hardening (Joint)"]
    end

    P01 --> P02
    P01 --> P03
    P01 --> P08
    P02 --> P04
    P02 --> P13
    P03 --> P05
    P04 --> P05
    P04 --> P06
    P04 --> P10
    P05 --> P07
    P05 --> P12
    P06 --> P07
    P08 --> P09
    P08 --> P10
    P10 --> P11
    P15 -. "Feeds Clinical Knowledge" .-> P16
    P15 -. "Feeds Triage & RAG" .-> P20

    P04 --> P16
    P08 --> P16
    P16 --> P17
    P16 --> P18
    P16 --> P19
    P16 --> P20
    P17 --> P18
    P17 --> P19
    P17 --> P20
    P17 --> P21
    P20 --> P22
    P21 --> P22
    P21 --> P23

    P07 --> P14
    P09 --> P14
    P11 --> P14
    P12 --> P14
    P13 --> P14
    P18 --> P14
    P19 --> P14
    P20 --> P14
```

---

## 2. Master Execution Plan Index

| Plan ID | Title | Assignee | Dependencies | Status |
| :--- | :--- | :--- | :--- | :--- |
| [**`01-project-setup-and-db.md`**](01-project-setup-and-db.md) | Workspace Scaffolding, Shared Package & Prisma DB | **Backend Agent** | None | Complete |
| [**`02-auth-and-user-profile.md`**](02-auth-and-user-profile.md) | Authentication, Session Cookies & Parent Account API | **Backend Agent** | PLAN-01 | Complete |
| [**`03-frontend-scaffolding-and-auth-ui.md`**](03-frontend-scaffolding-and-auth-ui.md) | Next.js 15 PWA, ParentCalm Design System & Auth UI | **Frontend Agent** | PLAN-01 | Complete |
| [**`04-child-profile-and-road-bifurcation-api.md`**](04-child-profile-and-road-bifurcation-api.md) | Child Profile CRUD, Road Fork & Readiness API | **Backend Agent** | PLAN-02 | Complete |
| [**`05-child-profile-and-road-selection-ui.md`**](05-child-profile-and-road-selection-ui.md) | Child Onboarding, Road Selection & Assessment UI | **Frontend Agent** | PLAN-03, PLAN-04 | Complete |
| [**`06-bilateral-pact-and-profile-compiler-api.md`**](06-bilateral-pact-and-profile-compiler-api.md) | Bilateral Pact Engine & Device Profile Compiler API | **Backend Agent** | PLAN-04 | Complete |
| [**`07-agreement-builder-and-device-enrollment-ui.md`**](07-agreement-builder-and-device-enrollment-ui.md) | Pact Wizard, Digital Co-Signing & QR Enrollment UI | **Frontend Agent** | PLAN-05, PLAN-06 | Complete |
| [**`08-parent-academy-and-culture-digest-api.md`**](08-parent-academy-and-culture-digest-api.md) | Academy Modules & Youth Culture Digest API | **Backend Agent** | PLAN-01 | Complete |
| [**`09-parent-academy-and-culture-digest-ui.md`**](09-parent-academy-and-culture-digest-ui.md) | Academy Course Player, Sunday Culture Digest & PWA | **Frontend Agent** | PLAN-03, PLAN-08 | Complete |
| [**`10-ai-child-advisor-and-faq-vault-api.md`**](10-ai-child-advisor-and-faq-vault-api.md) | 24/7 AI Child Advisor & Modern Parenting FAQ API | **Backend Agent** | PLAN-04, PLAN-08 | Complete (PR #23) |
| [**`11-ai-advisor-and-voice-sparring-ui.md`**](11-ai-advisor-and-voice-sparring-ui.md) | 24/7 AI Advisor Chat, Living FAQ Explorer & Sparring UI | **Frontend Agent** | PLAN-03, PLAN-10 | Complete (PR #22) |
| [**`12-interactive-quiz-suite-and-fluency-checks.md`**](12-interactive-quiz-suite-and-fluency-checks.md) | Interactive Assessment Suite & Cultural Fluency Quizzes | **Joint (FE & BE)** | PLAN-04, PLAN-05 | Queued |
| [**`13-stripe-billing-and-trial-lifecycle.md`**](13-stripe-billing-and-trial-lifecycle.md) | Stripe 7-Day Trial, $79/yr Hero Pass & Webhook Sync | **Backend Agent** | PLAN-02 | Queued |
| [**`14-e2e-integration-hardening-and-launch.md`**](14-e2e-integration-hardening-and-launch.md) | End-to-End Integration, Playwright Verification & Launch | **Joint (FE & BE)** | PLAN-07, 09, 11, 12, 13, 16-20 | Queued |
| [**`15-child-development-research-and-knowledge-base.md`**](15-child-development-research-and-knowledge-base.md) | Whole-Child Development Research & Knowledge Base | **Research Engineer** | None | Complete |
| [**`16-holistic-domain-schema-and-seeding-api.md`**](16-holistic-domain-schema-and-seeding-api.md) | Holistic Domain Schema, Health Triage & Milestone API | **Backend Agent** | PLAN-01, PLAN-04, PLAN-08 | Complete (PR #28) |
| [**`17-holistic-family-dashboard-and-navigation-ui.md`**](17-holistic-family-dashboard-and-navigation-ui.md) | Holistic Family Dashboard & Unified Navigation UI | **Frontend Agent** | PLAN-03, PLAN-05, PLAN-16 | Complete (PR #29) |
| [**`18-pediatric-health-triage-and-nutrition-ui.md`**](18-pediatric-health-triage-and-nutrition-ui.md) | Pediatric Health Triage & Nutrition Hub UI | **Frontend Agent** | PLAN-16, PLAN-17 | Complete (PR #27) |
| [**`19-brain-games-puppets-and-behavior-ui.md`**](19-brain-games-puppets-and-behavior-ui.md) | Brain Games, Puppets & Behavioral Psychology UI | **Frontend Agent** | PLAN-16, PLAN-17 | Complete (PR #30) |
| [**`20-ai-clinical-advisor-lifespan-rag-upgrade.md`**](20-ai-clinical-advisor-lifespan-rag-upgrade.md) | Clinical AI Advisor Lifespan RAG & Sparring Upgrade | **Joint (FE & BE)** | PLAN-10, 11, 16, 17, 18, 19 | Complete (PR #31) |
| [**`21-unified-navigation-and-session-logout-hardening-ui.md`**](21-unified-navigation-and-session-logout-hardening-ui.md) | Unified Navigation Shell & Session Logout Hardening UI | **Frontend Agent** | PLAN-03, PLAN-17 | Complete (PR #33) |
| [**`22-omnipresent-floating-ai-advisor-bubble-ui.md`**](22-omnipresent-floating-ai-advisor-bubble-ui.md) | Omnipresent Floating AI Advisor Bubble & Drawer UI | **Frontend Agent** | PLAN-03, PLAN-10, PLAN-11, PLAN-21 | Complete (PR #34) |
| [**`23-holistic-lifespan-homepage-redesign.md`**](23-holistic-lifespan-homepage-redesign.md) | Holistic Lifespan Family OS Homepage Redesign | **Frontend Agent** | PLAN-03, PLAN-16, PLAN-17, PLAN-21 | Queued |

---

## 3. Plan Authoring & Execution Standards

All plans within this directory strictly comply with [**`docs/plan-standards.md`**](../docs/plan-standards.md):
1. **Naming Standard:** `plans/[XX]-[short-kebab-case-descriptive-title].md` (two-digit zero-padded sequence).
2. **Standard Document Sections:**
   - Metadata Header (Plan ID, Assignee, Dependencies, Scope)
   - 1. Objective & Business Value
   - 2. Inputs & Architectural References
   - 3. Preconditions & Dependency Verification
   - 4. Step-by-Step Implementation Tasks
   - 5. Specific Deliverables (Files to Create / Modify)
   - 6. Acceptance Criteria & Verification Plan
   - 7. Role Boundaries & Prohibitions
   - 8. Definition of Done (DoD) Sign-Off Checklist
3. **Commit Standards:** Any commits made during plan execution must follow [**`docs/git-commit-standards.md`**](../docs/git-commit-standards.md) (Conventional Commits v1.0.0).

---

## 4. Assignment Guidelines for Paperclip

When delegating a plan as a Paperclip issue:
1. Provide the exact plan file path in the issue description.
2. Verify that all preceding dependency plans have reached `done` status.
3. Assert that the executing agent adheres strictly to directory ownership in [`AGENTS.md`](../AGENTS.md).
4. Review the deliverables checklist upon plan completion against `docs/plan-standards.md`.

---

## 5. Codebase Design & Deep Module Implementation Requirements

When implementing any plan, executing engineers (Frontend Agent & Backend Agent) MUST adhere to [**`docs/codebase-design.md`**](../docs/codebase-design.md) and [**`.agents/rules/06-codebase-design.md`**](../.agents/rules/06-codebase-design.md):
- **Pass the Deletion Test:** Avoid authoring shallow pass-through services where a method merely forwards arguments 1:1 to Prisma or downstream libraries without enforcing domain invariants.
- **Accept Dependencies at Seams:** Inject external collaborators (cryptography, AI streaming, Stripe, storage) via parameters or constructors rather than hardcoding client singletons.
- **Ship Matching Test Fakes:** Every external I/O seam must include both a production adapter and an in-memory test fake adapter (`FakeDevProfileSigner`, `DeterministicAiAdvisorFake`, `FakeBillingGateway`, `FakePediatricTriageAdapter`, `FakePlayRecommender`) for fast, deterministic unit and integration tests.
- **Pure Algorithmic Engines:** Complex business logic (readiness scoring, curfew rule evaluation, milestone checks, Barton Schmitt fever thresholds, allergen schedules) belongs in `@alongside/shared` as pure functions with zero network side effects.
