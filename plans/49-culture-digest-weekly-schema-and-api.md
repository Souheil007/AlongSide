# Plan 49: Culture & Trends Weekly Schema, Shared Contracts & Archive API
**Plan ID:** `PLAN-49`  
**Assignee:** Backend Agent  
**Dependencies:** `PLAN-08`, `PLAN-36`, `PLAN-43`  
**Estimated Scope:** Medium  
**Paperclip Issue:** TBD (Phase 1 of Culture & Trends Weekly Hub Redesign)

---

## 1. Objective & Business Value

Transform Alongside's Culture & Trends backend from a single static briefing (`CultureDigest` with hardcoded slang/exploit arrays) into a **6-tier, week-windowed (`weekStart`–`weekEnd`) weekly hub** powering real external blogs (with publisher attribution and canonical links), newly published embeddable YouTube videos, age-tailored Sunday dinner prompts, optional 7–18 weekly phrases, and user-persisted Read/Saved shortlists. Preserving full backward compatibility for existing `/api/v1/digest/latest`, `/slang`, and `/exploits` routes lets `PLAN-50` (live RSS/YouTube weekly sourcing) and `PLAN-51` (calm 3-band weekly UI) execute in parallel with zero breaking changes.

---

## 2. Inputs & Architectural References

- **Approved Visual & Interaction Prototype:** [`apps/web/public/explorations/digest-redesign-concept.html`](../apps/web/public/explorations/digest-redesign-concept.html)
- **Project Scope:** [`docs/PROJECT_SCOPE.md`](../docs/PROJECT_SCOPE.md)
- **System Architecture & API Spec:** [`docs/system-architecture.md`](../docs/system-architecture.md), [`docs/api-specification.md`](../docs/api-specification.md)
- **Data Models:** [`docs/data-models.md`](../docs/data-models.md)
- **Codebase Design & Backend Skill Matrix:** [`docs/engineering-standards/codebase-design.md`](../docs/engineering-standards/codebase-design.md), [`docs/engineering-standards/backend-skill-matrix.md`](../docs/engineering-standards/backend-skill-matrix.md)
- **Git & Quality Standards:** [`docs/engineering-standards/git-commit-standards.md`](../docs/engineering-standards/git-commit-standards.md), [`docs/engineering-standards/code-quality-principles.md`](../docs/engineering-standards/code-quality-principles.md)

---

## 3. Preconditions & Dependency Verification

- Confirm `PLAN-43` is merged and `npx prisma validate --schema=packages/database/prisma/schema.prisma` exits with code 0.
- Confirm existing digest and shared tests pass:
  ```bash
  npm run test --workspace=@alongside/shared
  npm run test --workspace=@alongside/api
  ```

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Shared Contracts, Zod Schemas & Pure Digest Algorithms (`packages/shared`)
1. Update `packages/shared/src/constants/index.ts` (using `as const` objects per Node v22 native type-stripping standard — never TypeScript `enum`):
   - `DigestIssueStatus`: `DRAFT`, `PUBLISHED`, `ARCHIVED`.
   - `DigestContentStatus`: `PENDING_REVIEW`, `APPROVED`, `REJECTED`.
   - `DigestItemType`: `ARTICLE`, `VIDEO`, `DINNER_PROMPT`.
2. Update `packages/shared/src/types/index.ts` with canonical DTOs:
   - `DigestIssueSummaryDTO`: `{ id, issueNumber, publishDate, weekStart, weekEnd, title, summary, status, articleCount, videoCount }`.
   - `DigestArticleDTO`: `{ id, digestId, issueNumber, title, summary, keyShift, perspectiveNote?, topicLabel, readMinutes, sourceName, sourceDomain, sourceUrl, authorName?, imageUrl?, publishedAt, isOriginalEditorial, contentMarkdown?, sourcesText?, targetTiers, isLead, sortOrder, isRead, isSaved }`.
   - `DigestVideoDTO`: `{ id, digestId, issueNumber, youtubeVideoId, videoUrl, title, presenter, channelName, channelId?, publishedAt, durationMinutes, formatLabel, takeaway, jumpChips?: VideoJumpChip[], skimBullets: string[], targetTiers, isEmbeddable, sortOrder, isSaved }`.
   - `DigestDinnerPromptDTO`: `{ id, digestId, issueNumber, question, parentTip, followUp, targetTiers, sortOrder, isSaved }`.
   - `DigestPhraseDTO`: `{ id, digestId, issueNumber, word, shortMeaning, fullMeaning, cringeLevel, cringeLabel, calmScript, targetTiers, sortOrder }`.
   - `WeeklyDigestEditionDTO`: `{ issue: DigestIssueSummaryDTO, resolvedTier: DevelopmentalTier, videos: DigestVideoDTO[], articles: DigestArticleDTO[], dinnerPrompts: DigestDinnerPromptDTO[], phrases: DigestPhraseDTO[], readArticleCount: number, totalArticleCount: number }`.
   - `SavedDigestShortlistDTO`: `{ articles: DigestArticleDTO[], videos: DigestVideoDTO[], dinnerPrompts: DigestDinnerPromptDTO[], totalCount: number }`.
3. Extend `packages/shared/src/schemas/digest.ts` with Zod schemas:
   - `DigestEditionQuerySchema`: `{ tier?: DevelopmentalTier, childId?: string }`.
   - `DigestArticlesQuerySchema`: `{ issueNumber?: number, scope?: 'issue' | 'all', tier?: DevelopmentalTier, unreadOnly?: boolean, q?: string }`.
   - `DigestVideosQuerySchema`: `{ issueNumber?: number, scope?: 'issue' | 'all', tier?: DevelopmentalTier, durationBucket?: 'all' | 'short' | 'medium' | 'deep', q?: string }`.
   - `DigestInteractionMutationSchema`: `{ itemType: DigestItemType, itemId: string, childId?: string, isRead?: boolean, isSaved?: boolean }` (requiring at least one of `isRead` or `isSaved`).
4. Create pure zero-side-effect algorithm module `packages/shared/src/algorithms/digest.ts` and export it from `packages/shared/src/index.ts`:
   - `resolveDigestTierBucket(tier: DevelopmentalTier): DevelopmentalTier` — normalizes all 8 lifespan sub-tranches (`TIER_0A`, `TIER_0B`, `TIER_0C` -> `TIER_0_INFANCY_TODDLER_0_3`) and legacy v2.3 aliases (`TIER_1_AGES_8_9` -> `TIER_2_MIDDLE_CHILDHOOD_7_9`, etc.) into the 6 Culture & Trends tiers (`0–3`, `4–6`, `7–9`, `10–12`, `13–15`, `16–18`).
   - `isSlangEligibleTier(tier: DevelopmentalTier): boolean` — returns `true` strictly for ages `7–18` buckets (`TIER_2_MIDDLE_CHILDHOOD_7_9` through `TIER_5_LATE_ADOLESCENCE_16_18`), `false` for `0–3` and `4–6`.
   - `parseYouTubeDescriptionChapters(description: string, durationSeconds?: number): VideoJumpChip[]` — deterministically extracts real `M:SS` / `H:MM:SS` timestamps from YouTube descriptions, sorts ascending, discards invalid timestamps (`>= durationSeconds`), caps to top 4 distinct highlights, and returns `[]` when fewer than 2 valid markers exist (zero fabricated timestamps).
   - `computeWeeklyEditionWindow(referenceDate?: Date): { weekStart: Date; weekEnd: Date; publishDate: Date }` — computes the canonical Sunday-to-Sunday UTC 7-day window.
5. Add comprehensive unit tests in `packages/shared/test/digestAlgorithms.test.ts`.

### Task 2: Additive Prisma Migration & Multi-Issue Bootstrap Seed (`packages/database`)
1. Update `packages/database/prisma/schema.prisma`:
   - Add enums `DigestIssueStatus` (`DRAFT`, `PUBLISHED`, `ARCHIVED`), `DigestContentStatus` (`PENDING_REVIEW`, `APPROVED`, `REJECTED`), and `DigestItemType` (`ARTICLE`, `VIDEO`, `DINNER_PROMPT`).
   - Extend `CultureDigest` additively:
     ```prisma
     weekStart     DateTime          @default(now())
     weekEnd       DateTime          @default(now())
     status        DigestIssueStatus @default(PUBLISHED)
     curatedAt     DateTime?

     articles      DigestArticle[]
     videos        DigestVideo[]
     dinnerPrompts DigestDinnerPrompt[]
     phrases       DigestPhrase[]
     ```
   - Add models:
     - `DigestArticle`: `id`, `digestId`, `canonicalHash`, `sourceUrl`, `sourceName`, `sourceDomain`, `authorName?`, `imageUrl?`, `publishedAt`, `isOriginalEditorial Boolean @default(false)`, `topicLabel`, `readMinutes Int @default(3)`, `title`, `summary`, `keyShift`, `perspectiveNote?`, `contentMarkdown?`, `sourcesText?`, `targetTiers DevelopmentalTier[]`, `isLead Boolean @default(false)`, `sortOrder Int @default(0)`, `ingestionStatus DigestContentStatus @default(APPROVED)`, `createdAt`, `updatedAt`. Unique constraint `@@unique([digestId, canonicalHash])`; index `@@index([digestId, ingestionStatus, sortOrder])`.
     - `DigestVideo`: `id`, `digestId`, `youtubeVideoId`, `videoUrl`, `title`, `presenter`, `channelName`, `channelId?`, `publishedAt`, `durationMinutes`, `formatLabel`, `takeaway`, `jumpChips Json?`, `skimBullets String[] @default([])`, `targetTiers DevelopmentalTier[]`, `isEmbeddable Boolean @default(true)`, `sortOrder Int @default(0)`, `ingestionStatus DigestContentStatus @default(APPROVED)`, `createdAt`, `updatedAt`. Unique constraint `@@unique([digestId, youtubeVideoId])`; index `@@index([digestId, ingestionStatus, sortOrder])`.
     - `DigestDinnerPrompt`: `id`, `digestId`, `question`, `parentTip`, `followUp`, `targetTiers DevelopmentalTier[]`, `sortOrder Int @default(0)`, `createdAt`. Index `@@index([digestId, sortOrder])`.
     - `DigestPhrase`: `id`, `digestId`, `word`, `shortMeaning`, `fullMeaning`, `cringeLevel Int @default(2)`, `cringeLabel`, `calmScript`, `targetTiers DevelopmentalTier[]`, `sortOrder Int @default(0)`, `createdAt`. Index `@@index([digestId, sortOrder])`.
     - `UserDigestInteraction`: `id`, `userId`, `user` relation (`onDelete: Cascade`), `childId?`, `itemType DigestItemType`, `itemId`, `isRead Boolean @default(false)`, `readAt DateTime?`, `isSaved Boolean @default(false)`, `savedAt DateTime?`, `createdAt`, `updatedAt`. Unique constraint `@@unique([userId, itemType, itemId])`; indexes `@@index([userId, isSaved])`, `@@index([userId, itemType, isRead])`.
   - Add `digestInteractions UserDigestInteraction[]` relation on `User`.
2. Create additive SQL migration `packages/database/prisma/migrations/20261121_culture_digest_weekly_v2/migration.sql` and verify via `npx prisma validate && npx prisma generate`.
3. Expand `packages/database/prisma/seed/digest.seed.ts` (preserving legacy `DIGEST_SEED_ISSUE`, `SLANG_SEED_TERMS`, `EXPLOIT_SEED_ALERTS` exports for existing tests):
   - Seed 3 full weekly editions (`Issue #42`, `#41`, `#40`) with realistic 7-day `weekStart`/`weekEnd` windows across all 6 canonical tiers.
   - Populate real, verified authoritative external blog URLs (HealthyChildren.org / AAP, Child Mind Institute, Common Sense Media, Zero to Three, Greater Good, Harvard Center on the Developing Child) with publisher attribution and `isOriginalEditorial: false`, plus embeddable verified YouTube video IDs from `academyVideos.seed.ts`, 3 age-tailored dinner prompts per tier, and 3 weekly phrases strictly for ages `7–18` (`0` phrases for `0–3` and `4–6`).
   - Guarantee strict idempotency on repeated `npm run db:seed` runs via upserts on `(digestId, canonicalHash)` and `(digestId, youtubeVideoId)`.

### Task 3: Fastify Weekly Edition, Week-Scoped Blogs/Videos & Interaction API (`apps/api`)
1. Extend `DigestRepository`, `PrismaDigestRepository`, and `InMemoryDigestRepository` in `apps/api/src/modules/digest/digest.repository.ts`:
   - `listPublishedIssues(tier?: DevelopmentalTier): Promise<DigestIssueSummaryDTO[]>`
   - `findEditionByIssueNumber(issueNumber: number | 'latest', tier: DevelopmentalTier, userId?: string): Promise<WeeklyDigestEditionDTO | null>`
   - `findArticles(params: { issueNumber?: number; scope: 'issue' | 'all'; tier: DevelopmentalTier; unreadOnly?: boolean; q?: string; userId?: string }): Promise<{ articles: DigestArticleDTO[]; unreadCount: number; totalInScope: number; issueNumber?: number }>`
   - `findVideos(params: { issueNumber?: number; scope: 'issue' | 'all'; tier: DevelopmentalTier; durationBucket?: 'all' | 'short' | 'medium' | 'deep'; q?: string; userId?: string }): Promise<{ videos: DigestVideoDTO[]; totalInScope: number; issueNumber?: number }>`
   - `findSavedShortlist(userId: string, tier?: DevelopmentalTier): Promise<SavedDigestShortlistDTO>`
   - `upsertInteraction(userId: string, input: { itemType: DigestItemType; itemId: string; childId?: string; isRead?: boolean; isSaved?: boolean }): Promise<{ itemType: DigestItemType; itemId: string; isRead: boolean; isSaved: boolean }>`
   - Enforce domain invariant inside `DigestService` (`apps/api/src/modules/digest/digest.service.ts`):
     - Normalize incoming `tier` (or resolve from `childId` when authenticated) via `resolveDigestTierBucket()`.
     - Strictly return `phrases: []` whenever `!isSlangEligibleTier(resolvedTier)`.
     - Return only `ingestionStatus === 'APPROVED'` articles and embeddable approved videos (`isEmbeddable === true`).
     - Validate `itemId` exists before upserting `UserDigestInteraction` (return `404 NOT_FOUND` if missing).
2. Register typed routes with strict Ajv input validation and `fast-json-stringify` response schemas in `apps/api/src/modules/digest/digest.routes.ts` & `digest.controller.ts`:
   - Preserve `GET /api/v1/digest/latest`, `GET /api/v1/digest/slang`, and `GET /api/v1/digest/exploits` unchanged.
   - Add:
     - `GET /api/v1/digest/issues`
     - `GET /api/v1/digest/issues/:issueNumber` (accepts integer or `'latest'`, optional auth via `fastify.optionalAuthenticate` or cookie check to hydrate `isRead`/`isSaved`)
     - `GET /api/v1/digest/articles` (defaults `scope='issue'` so clicking **Blogs** strictly returns the selected week's blogs unless `scope=all` is explicitly requested)
     - `GET /api/v1/digest/videos` (defaults `scope='issue'` so clicking **Videos** strictly returns the selected week's videos unless `scope=all` is explicitly requested)
     - `GET /api/v1/digest/saved` (authenticated — `401` if unauthenticated)
     - `PUT /api/v1/digest/interactions` (authenticated — `401` if unauthenticated, `404` if `itemId` unknown)
3. Update `docs/api-specification.md` Section 9 to document the new weekly edition, week-scoped articles/videos, saved shortlist, and interaction endpoints.
4. Author Fastify `.inject()` integration tests in `apps/api/tests/digestWeekly.test.ts` covering:
   - Issue listing and edition fetch across all 6 tiers (`0–3` and `4–6` strictly return `phrases: []`; `7–18` return 3 phrases).
   - Week-scoped `GET /articles?issueNumber=41` vs. `scope=all` and `unreadOnly=true` filtering after `PUT /interactions`.
   - Week-scoped `GET /videos?issueNumber=42&durationBucket=short`.
   - `GET /saved` aggregation and `401`/`404` error envelopes.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `packages/shared/src/constants/index.ts`
- [ ] `packages/shared/src/types/index.ts`
- [ ] `packages/shared/src/schemas/digest.ts`
- [ ] `packages/shared/src/algorithms/digest.ts`
- [ ] `packages/shared/src/index.ts`
- [ ] `packages/shared/test/digestAlgorithms.test.ts`
- [ ] `packages/database/prisma/schema.prisma`
- [ ] `packages/database/prisma/migrations/20261121_culture_digest_weekly_v2/migration.sql`
- [ ] `packages/database/prisma/seed/digest.seed.ts`
- [ ] `apps/api/src/modules/digest/digest.repository.ts`
- [ ] `apps/api/src/modules/digest/digest.service.ts`
- [ ] `apps/api/src/modules/digest/digest.controller.ts`
- [ ] `apps/api/src/modules/digest/digest.routes.ts`
- [ ] `apps/api/tests/digestWeekly.test.ts`
- [ ] `docs/api-specification.md`

---

## 6. Acceptance Criteria & Verification Plan

```bash
npm run build --workspace=@alongside/shared
npm run test --workspace=@alongside/shared
npx prisma validate --schema=packages/database/prisma/schema.prisma
npm run test --workspace=@alongside/api
npm run typecheck
```

- All existing `apps/api` tests (including legacy `/digest/latest`, `/slang`, `/exploits`) continue passing with zero regressions.
- `resolveDigestTierBucket()` and `isSlangEligibleTier()` pass 100% of unit tests across all 8 lifespan tiers and legacy aliases.
- `parseYouTubeDescriptionChapters()` parses real chapter lines accurately and returns `[]` on chapter-less descriptions.
- `GET /api/v1/digest/issues/42?tier=TIER_0_INFANCY_TODDLER_0_3` returns `phrases: []`, while `TIER_4_EARLY_ADOLESCENCE_13_15` returns 3 phrases.
- `GET /api/v1/digest/articles?issueNumber=41` strictly returns Issue #41 articles; `PUT /api/v1/digest/interactions` flips `isRead`/`isSaved` and reflects immediately in `unreadOnly=true` and `GET /saved`.

---

## 7. Role Boundaries & Prohibitions

- **Strict Backend Scope:** Do NOT edit files inside `apps/web/`.
- Do NOT break existing `/api/v1/digest/latest`, `/api/v1/digest/slang`, or `/api/v1/digest/exploits` response contracts.
- Keep `InMemoryDigestRepository` strictly in parity with `PrismaDigestRepository` so integration tests never touch a physical database or TCP socket.
- Never use TypeScript `enum` in `packages/shared` (use `as const` objects for Node v22 type stripping).

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables created and located in correct directories.
- [ ] Code strictly follows naming, codebase-design, and Fastify best-practice standards.
- [ ] `npm run typecheck` exits with code 0.
- [ ] All `@alongside/shared` and `apps/api` unit/integration tests pass 100%.
- [ ] `ponytail-review` diff audit passed with zero speculative bloat.
- [ ] Conventional Commits used and plain-text PR opened targeting `main` (left open for human merge).
