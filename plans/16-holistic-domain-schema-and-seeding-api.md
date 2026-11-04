# Plan 16: Holistic Domain Schema, Health Triage & Milestone API
**Plan ID:** `PLAN-16`  
**Assignee:** Backend Agent  
**Dependencies:** PLAN-01, PLAN-04, PLAN-08  
**Estimated Scope:** Large  
**Paperclip Issue:** SOU-40 (To be delegated)  
**Status:** Queued  

---

## 1. Objective & Business Value

Implement the foundational backend data layer and REST APIs required to power Alongside's v2.4.0 shift into **The Holistic Child Upbringing, Pediatric Health & Lifespan Family Operating System (Ages 0–18)**. 

The Backend Agent will:
- Evolve the Prisma schema and database to support 6 canonical developmental tiers (`TIER_0_INFANCY_TODDLER_0_3` through `TIER_5_LATE_ADOLESCENCE_16_18`), child health logs, feeding stages, milestone benchmarks, and purposeful play catalogs.
- Author robust database seed scripts incorporating primary clinical research:
  * CDC and Bright Futures developmental milestones across physical, speech, and cognitive categories (Ages 0–18).
  * Barton Schmitt Pediatric Telephone Protocols & AAP triage guidelines (Red/Yellow/Green zones for fevers, respiratory distress, ear infections, croup, rashes).
  * WHO & Solid Starts infant feeding, Baby-Led Weaning (BLW), safe early allergen schedules (4–11 months), and choking hazard guardrails.
  * Harvard Center on the Developing Child ("Serve and Return") and Montessori purposeful play activities (animal puppets, sensory bins, blocks, logic puzzles, chess).
  * Behavioral translation guides and de-escalation scripts (HALT diagnostic, time-ins).
- Build deep Fastify domain modules in `apps/api/src/modules/`:
  * `milestones`: Milestone catalog, age filtering, and child milestone tracking.
  * `health`: 3-zone pediatric symptom triage engine (`PediatricTriageEngine` at Seam 6), antipyretic dosing calculator, and health event logs.
  * `nutrition`: Feeding stage guides, allergen schedules, and choking hazard screeners.
  * `brain-games`: Daily play recommender (`PlayActivityRecommender` at Seam 9) and toy catalog.
  * `behavior`: Behavioral translation guides and script repository.
- Provide production adapters and in-memory test fakes for all external seams, maintaining 100% test pass rate in Vitest without physical TCP ports.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Pillars 1, 2, 3, 4, 5)
- **Technical Roadmap:** [`docs/technical-roadmap-v2.4.0.md`](../docs/technical-roadmap-v2.4.0.md) (Sections 2, 3, 4, 5)
- **System Architecture:** [`docs/system-architecture.md`](../docs/system-architecture.md) (Monorepo layout, Service layer, Data layer)
- **Codebase Design & Seam Architecture:** [`docs/codebase-design.md`](../docs/codebase-design.md) (Seam 6: Pediatric Triage Engine, Seam 7: Milestone Engine, Seam 8: Nutrition Engine, Seam 9: Play Recommender)
- **Data Models:** [`docs/data-models.md`](../docs/data-models.md) (Prisma models: `Milestone`, `ChildMilestone`, `SymptomProtocol`, `ChildHealthLog`, `NutritionGuide`, `BrainGameActivity`, `BehaviorGuide`)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Sections 11, 12, 13, 14, 15)
- **Primary Source Research:** [`docs/research/pediatric-health-triage-protocols.md`](../docs/research/pediatric-health-triage-protocols.md)
- **Backend Protocol:** [`docs/backend-skill-matrix.md`](../docs/backend-skill-matrix.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-01` (Prisma DB scaffolding), `PLAN-04` (Children module), and `PLAN-08` (Academy module) completed.
- **Verification:** Run `npm run typecheck` and `npm test` across monorepo to ensure clean baseline before migrations.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Prisma Schema Evolution & Migration (`packages/database`)
1. Update `packages/database/prisma/schema.prisma`:
   - Expand `DevelopmentalTier` enum:
     * `TIER_0_INFANCY_TODDLER_0_3`
     * `TIER_1_EARLY_CHILDHOOD_4_6`
     * `TIER_2_MIDDLE_CHILDHOOD_7_9`
     * `TIER_3_PRE_TEEN_10_12`
     * `TIER_4_EARLY_ADOLESCENCE_13_15`
     * `TIER_5_LATE_ADOLESCENCE_16_18`
   - Add new Enums: `TriageZone` (`RED`, `YELLOW`, `GREEN`), `DietaryStage` (`MILK_ONLY`, `SOLIDS_INTRODUCED`, `TODDLER_TABLE`, `BALANCED_SCHOOL`, `PUBERTAL_GROWTH`), `MilestoneCategory` (`GROSS_MOTOR`, `FINE_MOTOR`, `SPEECH_LANGUAGE`, `COGNITIVE`, `SOCIAL_EMOTIONAL`), `MilestoneStatus` (`NOT_STARTED`, `IN_PROGRESS`, `ACHIEVED`), `PlayCategory` (`PUPPET`, `SENSORY`, `CONSTRUCTION`, `LOGIC_PUZZLE`, `MAKER`, `BOREDOM_BUSTER`).
   - Evolve `Child` model: Add `birthDate DateTime?`, `dietaryStage DietaryStage @default(TODDLER_TABLE)`, `allergies String[] @default([])`, `pediatricNotes String?`, and relations `milestones ChildMilestone[]`, `healthLogs ChildHealthLog[]`.
   - Add new models: `Milestone`, `ChildMilestone`, `SymptomProtocol`, `ChildHealthLog`, `NutritionGuide`, `BrainGameActivity`, `BehaviorGuide`.
2. Generate and apply migration:
   ```bash
   npx prisma migrate dev --name v2_4_holistic_domain_evolution
   ```

### Task 2: Shared Algorithmic Engines & Contracts (`packages/shared`)
1. Update `packages/shared/src/constants/index.ts`:
   - Update `DevelopmentalTier` to 6 canonical tiers.
   - Add constants for `TriageZone`, `DietaryStage`, `MilestoneCategory`, `MilestoneStatus`, and `PlayCategory`.
2. Update `packages/shared/src/algorithms/childTier.ts`:
   - Calculate developmental tier based on birth date/month/year mapping into the 6 tiers.
3. Author pure algorithmic engines:
   - `packages/shared/src/algorithms/milestones.ts`: Pure milestone progress evaluation.
   - `packages/shared/src/algorithms/nutrition.ts`: Feeding stage resolution, allergen schedules, and choking hazard validation.
   - `packages/shared/src/algorithms/healthTriage.ts`: Barton Schmitt fever threshold evaluations and red-flag rules.
4. Export updated Zod schemas in `packages/shared/src/schemas/` and TypeScript types in `packages/shared/src/types/`.

### Task 3: Database Seeding (`packages/database/prisma/seed/`)
1. Create seed files:
   - `milestones.seed.ts`: 40+ CDC and Bright Futures milestones across gross motor, speech bursts, and cognitive stages.
   - `health.seed.ts`: Canonical triage protocols (Fever, RSV/Wheezing, Croup, Ear Infection, Dehydration, Rashes, Stomach Bug).
   - `nutrition.seed.ts`: Feeding stages (Infant solids, BLW spears, Allergen timelines, Picky eating division of responsibility).
   - `brainGames.seed.ts`: Montessori and sensory play activities (animal puppets, sensory bins, unit blocks, logic riddles, chess).
   - `behavior.seed.ts`: Tantrum decoding scenarios, HALT diagnostic guidelines, and de-escalation scripts.
2. Wire all seed files into `packages/database/prisma/seed.ts`.

### Task 4: Fastify Domain Modules & REST Routes (`apps/api`)
1. **Milestones Module (`apps/api/src/modules/milestones/`)**:
   - `milestones.service.ts`: Query catalog by tier/category, record milestone achievement.
   - `milestones.routes.ts`: `GET /api/v1/milestones`, `POST /api/v1/children/:childId/milestones`.
2. **Pediatric Health Module (`apps/api/src/modules/health/`)**:
   - Implement `PediatricTriageEngine` at Seam 6 (`BartonSchmittTriageAdapter` + `FakePediatricTriageAdapter`).
   - `health.service.ts`: Execute symptom triage, antipyretic dosing, and health event logging.
   - `health.routes.ts`: `POST /api/v1/health/triage`, `GET /api/v1/health/protocols`, `GET /api/v1/children/:childId/health-logs`, `POST /api/v1/children/:childId/health-logs`.
3. **Nutrition Module (`apps/api/src/modules/nutrition/`)**:
   - `nutrition.service.ts`: Retrieve guides by stage, generate allergen introduction timelines.
   - `nutrition.routes.ts`: `GET /api/v1/nutrition/guides`, `GET /api/v1/nutrition/allergens`.
4. **Brain Games Module (`apps/api/src/modules/brain-games/`)**:
   - Implement `PlayActivityRecommender` at Seam 9 (`DevelopmentalPlayAdapter` + `FakePlayRecommender`).
   - `brain-games.service.ts`: Recommend daily play activity, list play catalog.
   - `brain-games.routes.ts`: `GET /api/v1/brain-games/daily`, `GET /api/v1/brain-games`.
5. **Behavior Module (`apps/api/src/modules/behavior/`)**:
   - `behavior.service.ts`: Retrieve situation-specific emotional scripts and HALT guides.
   - `behavior.routes.ts`: `GET /api/v1/behavior/guides`.
6. Register all new modules in `apps/api/src/app.ts`.

### Task 5: Integration Testing via Fastify Inject (`apps/api/test/`)
1. Create test suites:
   - `apps/api/test/milestones.test.ts`: Asserts catalog filtering and achievement persistence.
   - `apps/api/test/health.test.ts`: Asserts Red-Zone emergency triggers, Yellow-Zone otitis media triage, and antipyretic dosing.
   - `apps/api/test/nutrition.test.ts`: Asserts feeding stage guidance and allergen schedules.
   - `apps/api/test/brain-games.test.ts`: Asserts daily puppet/game recommendation.
   - `apps/api/test/behavior.test.ts`: Asserts behavioral de-escalation script retrieval.

---

## 5. Specific Deliverables (Files to Create / Modify)

### `packages/database`:
- [ ] `packages/database/prisma/schema.prisma`
- [ ] `packages/database/prisma/seed/milestones.seed.ts`
- [ ] `packages/database/prisma/seed/health.seed.ts`
- [ ] `packages/database/prisma/seed/nutrition.seed.ts`
- [ ] `packages/database/prisma/seed/brainGames.seed.ts`
- [ ] `packages/database/prisma/seed/behavior.seed.ts`
- [ ] `packages/database/prisma/seed.ts`

### `packages/shared`:
- [ ] `packages/shared/src/constants/index.ts`
- [ ] `packages/shared/src/algorithms/childTier.ts`
- [ ] `packages/shared/src/algorithms/milestones.ts`
- [ ] `packages/shared/src/algorithms/nutrition.ts`
- [ ] `packages/shared/src/algorithms/healthTriage.ts`
- [ ] `packages/shared/src/schemas/index.ts`
- [ ] `packages/shared/src/types/index.ts`

### `apps/api`:
- [ ] `apps/api/src/modules/milestones/milestones.service.ts`
- [ ] `apps/api/src/modules/milestones/milestones.routes.ts`
- [ ] `apps/api/src/modules/health/triage.engine.ts`
- [ ] `apps/api/src/modules/health/health.service.ts`
- [ ] `apps/api/src/modules/health/health.routes.ts`
- [ ] `apps/api/src/modules/nutrition/nutrition.service.ts`
- [ ] `apps/api/src/modules/nutrition/nutrition.routes.ts`
- [ ] `apps/api/src/modules/brain-games/play.recommender.ts`
- [ ] `apps/api/src/modules/brain-games/brain-games.service.ts`
- [ ] `apps/api/src/modules/brain-games/brain-games.routes.ts`
- [ ] `apps/api/src/modules/behavior/behavior.service.ts`
- [ ] `apps/api/src/modules/behavior/behavior.routes.ts`
- [ ] `apps/api/src/app.ts`
- [ ] `apps/api/test/milestones.test.ts`
- [ ] `apps/api/test/health.test.ts`
- [ ] `apps/api/test/nutrition.test.ts`
- [ ] `apps/api/test/brain-games.test.ts`
- [ ] `apps/api/test/behavior.test.ts`

---

## 6. Acceptance Criteria & Verification Plan

1. **Compilation & Typecheck:**
   ```bash
   npm run typecheck
   ```
   *Pass criteria:* Clean compilation with zero TypeScript errors across all workspaces.
2. **Automated Integration Tests:**
   ```bash
   npm test
   ```
   *Pass criteria:* 100% test pass rate with in-memory test fakes and zero physical TCP listening sockets.
3. **Clinical Triage Guardrails:**
   *Pass criteria:* Any symptom input with infant fever <90 days ≥100.4°F or respiratory retractions immediately outputs `zone: "RED"` and `requiresEmergency911: true`.
4. **Ponytail Principle Diff Audit:**
   *Pass criteria:* Working diff audited via `ponytail-review` ensuring minimal diff size, deep modules, and zero speculative bloat.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Backend Agent.
- ❌ **DO NOT** edit files inside `apps/web/`.
- ❌ **DO NOT** write React components, JSX/TSX UI code, or Tailwind classes.
- ❌ **DO NOT** break REST response contracts defined in `docs/api-specification.md`.
- ❌ **DO NOT** hardcode external API instances; accept adapters via parameters or constructors at designated seams.
- ✅ Work strictly inside `packages/database/`, `packages/shared/`, and `apps/api/`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables created and located in correct directories.
- [ ] Prisma schema evolved to 6 developmental tiers and migrated cleanly.
- [ ] Barton Schmitt triage protocols, CDC milestones, BLW nutrition, and play activities seeded.
- [ ] Fastify domain routes operational for milestones, health, nutrition, brain-games, and behavior.
- [ ] Seams 6 and 9 equipped with both production adapters and in-memory test fakes.
- [ ] Fastify `.inject()` integration tests pass with 100% success rate.
- [ ] `npm run typecheck` exits with code 0.
- [ ] Ponytail Principle diff audit passed.
- [ ] Feature branch submitted as Pull Request targeting `main` with plain text (`.txt`) description.
