# Plan 50: Culture & Trends Live Weekly Blog & Video Sourcing Pipeline
**Plan ID:** `PLAN-50`  
**Assignee:** Backend Agent  
**Dependencies:** `PLAN-49`  
**Estimated Scope:** Large  
**Paperclip Issue:** TBD (Phase 2 of Culture & Trends Weekly Hub Redesign)

---

## 1. Objective & Business Value

Power Culture & Trends with a **real, automated weekly content sourcing and curation pipeline** so every Sunday issue genuinely reflects what was published that week across each child's developmental environment. Rather than displaying static evergreen posts, the backend fetches **real external parenting and youth-culture blogs** published inside `[weekStart, weekEnd]` from vetted RSS/Atom feeds (preserving publisher copyright via attribution-first previews + canonical links) and discovers **newly published, verified-embeddable YouTube videos** released during that exact time window via official channel Atom feeds and YouTube Data API v3 verification.

---

## 2. Inputs & Architectural References

- **Prerequisite Schema & Contracts:** [`PLAN-49`](49-culture-digest-weekly-schema-and-api.md)
- **System Architecture & Resilience Standards:** [`docs/system-architecture.md`](../docs/system-architecture.md), [`docs/system-design-specification.md`](../docs/system-design-specification.md)
- **Codebase Design (Deep Modules, Seams & Fakes):** [`docs/engineering-standards/codebase-design.md`](../docs/engineering-standards/codebase-design.md)
- **Backend Skill Matrix (Fastify & Node v22):** [`docs/engineering-standards/backend-skill-matrix.md`](../docs/engineering-standards/backend-skill-matrix.md)
- **Existing LLM Orchestrator Seam:** [`apps/api/src/modules/ai-advisor/adapters/llm-orchestrator.ts`](../apps/api/src/modules/ai-advisor/adapters/llm-orchestrator.ts)
- **Git & Quality Standards:** [`docs/engineering-standards/git-commit-standards.md`](../docs/engineering-standards/git-commit-standards.md), [`docs/engineering-standards/code-quality-principles.md`](../docs/engineering-standards/code-quality-principles.md)

---

## 3. Preconditions & Dependency Verification

- Confirm `PLAN-49` is merged (Prisma `DigestArticle`, `DigestVideo`, `DigestDinnerPrompt`, `DigestPhrase`, and `CultureDigest.weekStart`/`weekEnd` exist and pass `npx prisma validate`).
- Confirm `npm run test --workspace=@alongside/api` passes before introducing ingestion modules.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Curated Allowlist Source Registry (`apps/api/src/modules/digest/ingestion/curatedSources.ts`)
1. Author a clean, version-controlled TypeScript allowlist registry (zero premature Admin CMS bloat — easily reviewed in PRs):
   - **`CURATED_BLOG_FEEDS`** (official RSS 2.0 / Atom 1.0 endpoints from authoritative, non-clickbait parenting, pediatric, and youth digital-culture publications):
     - HealthyChildren.org (American Academy of Pediatrics — ages 0–18)
     - Child Mind Institute (ages 4–18 behavior, school, social & teen culture)
     - Common Sense Media (ages 4–18 digital media, games, apps & teen trends)
     - Zero to Three (ages 0–3 infant/toddler neurodevelopment)
     - Greater Good Magazine — Parenting (UC Berkeley, ages 4–18)
     - Harvard Center on the Developing Child (ages 0–9)
     - Understood.org (ages 7–15 learning, focus & school dynamics)
     - Screenagers / Tech Talk Tuesdays (ages 10–18 digital life)
     - Each entry defines: `id`, `sourceName`, `sourceDomain`, `feedUrl`, `defaultTiers: DevelopmentalTier[]`, `authorityWeight` (`1–3`).
   - **`CURATED_YOUTUBE_CHANNELS`** (30–40 vetted pediatric, psychology, and youth-culture educator channels covering all 6 canonical tiers):
     - Each entry defines: `channelId`, `channelName`, `defaultPresenter`, `defaultTiers: DevelopmentalTier[]`, `topicHint`.
     - Uses official zero-quota public Atom feed `https://www.youtube.com/feeds/videos.xml?channel_id={channelId}` for primary weekly discovery.
   - **`TIER_FALLBACK_SEARCH_QUERIES`** (optional curated YouTube Data API `search.list` queries per developmental tier, invoked ONLY when `YOUTUBE_API_KEY` is configured and a tier has fewer than `minVideosPerTier` fresh uploads from curated channels in that week's window).

### Task 2: External I/O Seams & Production + In-Memory Fake Adapters (`apps/api/src/modules/digest/ingestion/adapters/`)
Add `fast-xml-parser` to `apps/api/package.json` for fast, zero-native-dependency RSS/Atom XML parsing.

1. **Blog Feed Seam (`blogFeedFetcher.ts`):**
   - Interface `BlogFeedFetcher`: `fetchCandidates(window: { weekStart: Date; weekEnd: Date }): Promise<{ candidates: RawBlogCandidate[]; warnings: string[] }>`.
   - **`RssBlogFeedAdapter`:**
     - Fetches every enabled feed concurrently via `Promise.allSettled` with strict `8_000ms` timeout (`AbortSignal.timeout(8_000)`).
     - Enforces HTTPS-only SSRF validation (`assertSafeExternalUrl()` rejecting non-HTTPS schemes, `localhost`, private RFC 1918/link-local/loopback hosts).
     - Parses RSS 2.0 (`<item>`) and Atom 1.0 (`<entry>`) via `fast-xml-parser`.
     - Filters strictly to items with valid `publishedAt >= window.weekStart && publishedAt <= window.weekEnd`.
     - Strips HTML cleanly from RSS `<description>`/`<summary>`, caps plain-text excerpt to `600` characters (**never scrapes or stores full copyrighted article bodies**), normalizes canonical URL (stripping `utm_*` / tracking params), and computes SHA-256 `canonicalHash`.
   - **`FakeBlogFeedFetcher`:** Deterministic in-memory test fake returning realistic dated candidates across all 6 tiers plus test fixtures for out-of-window posts, duplicate URLs, and simulated feed timeout warnings.

2. **Fresh YouTube Video Seam (`youtubeFeedFetcher.ts`):**
   - Interface `YouTubeFeedFetcher`: `fetchFreshVideos(window: { weekStart: Date; weekEnd: Date }, opts?: { minPerTier?: number }): Promise<{ candidates: RawVideoCandidate[]; warnings: string[] }>`.
   - **`YouTubeWeeklyFeedAdapter`:**
     - Step A: Fetches curated channel Atom feeds concurrently (`Promise.allSettled`, `8_000ms` timeout) and filters strictly to `<published>` within `[window.weekStart, window.weekEnd]`.
     - Step B (Optional Supplemental Discovery): If `YOUTUBE_API_KEY` is set and any tier has `< minPerTier` candidates, queries `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&safeSearch=strict&relevanceLanguage=en&publishedAfter={weekStartISO}&publishedBefore={weekEndISO}&order=relevance`.
     - Step C (Mandatory Verification & Metadata Enrichment):
       - When `YOUTUBE_API_KEY` is configured: batches up to 50 video IDs per call to `videos.list?part=contentDetails,status,snippet` (1 quota unit per 50 videos!).
         - **Hard-rejects** any video with `status.embeddable !== true` or `status.privacyStatus !== 'public'`.
         - Parses ISO-8601 `contentDetails.duration` (`PT14M22S`) into `durationSeconds` / `durationMinutes` and **rejects short teasers/Shorts (`durationSeconds < 90`)**.
         - Extracts real description chapters using `parseYouTubeDescriptionChapters(snippet.description, durationSeconds)` (zero hallucinated timestamps).
       - When `YOUTUBE_API_KEY` is omitted (local dev fallback): validates playability via `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={id}&format=json` (`HTTP 200` required) and parses description chapters from the Atom `<media:description>`.
   - **`FakeYouTubeFeedFetcher`:** Deterministic in-memory test fake returning fresh in-window videos alongside explicit test cases for non-embeddable videos (`isEmbeddable: false`), `<90s` Shorts, and out-of-window uploads.

3. **Editorial Curation & Calm-Summary Seam (`digestCurator.ts`):**
   - Interface `DigestContentCurator`:
     - `curateArticles(candidates: RawBlogCandidate[]): Promise<CuratedBlogDraft[]>`
     - `curateVideos(candidates: RawVideoCandidate[]): Promise<CuratedVideoDraft[]>`
     - `synthesizeWeeklyExtras(params: { weekStart: Date; weekEnd: Date; tier: DevelopmentalTier; articles: CuratedBlogDraft[]; videos: CuratedVideoDraft[] }): Promise<{ dinnerPrompts: DinnerPromptDraft[]; phrases: PhraseDraft[] }>`
   - **`LlmDigestCuratorAdapter`:**
     - Accepts `MultiProviderLlmOrchestrator` (reusing OpenAI/Gemini/Mistral provider chain already wired in `apps/api/src/app.ts`) and parses strict Zod-validated JSON output.
     - Enforces **Parent Calm Editorial Guidelines**:
       - Rejects sensationalism, alarmist fear-mongering, sponsored advertorials, or off-topic items (`approved: false`).
       - Maps each approved item to 1–2 canonical 6-tier buckets (`targetTiers`) and a concise, plain `topicLabel` (`Media & Tech`, `Sleep & Routines`, `Social & Peers`, `Play & Learning`, `School & Focus`, `Family Communication`).
       - Generates an original calm 2-sentence `summary`, 1-sentence `keyShift`, and 3-bullet `skimBullets` (for videos) — never copying full external prose.
       - Synthesizes 3 age-calibrated Sunday dinner prompts per tier, and 3 weekly phrases **strictly for ages `7–18`** (`phrases: []` for `0–3` and `4–6`).
   - **`DeterministicDigestCuratorFake`:** Zero-network deterministic curator using feed `defaultTiers`, clean excerpt summarization, and curated templates for fast tests and offline local dev.

### Task 3: Deep Orchestrator, Repository Write Seam, Admin Endpoint & Weekly Cron CLI (`apps/api`)
1. Extend `DigestRepository` (`PrismaDigestRepository` & `InMemoryDigestRepository`) with:
   - `findRecentCanonicalHashes(lookbackIssues?: number): Promise<Set<string>>`
   - `findRecentYouTubeVideoIds(lookbackIssues?: number): Promise<Set<string>>`
   - `upsertWeeklyEdition(payload: UpsertWeeklyEditionInput): Promise<DigestIssueSummaryDTO>` (transactional upsert of `CultureDigest` + `DigestArticle[]` + `DigestVideo[]` + `DigestDinnerPrompt[]` + `DigestPhrase[]`).
2. Author deep module `apps/api/src/modules/digest/ingestion/digestIngestion.orchestrator.ts`:
   - `syncWeeklyEdition({ weekStart?, weekEnd?, issueNumber?, dryRun?, fallbackLookbackDays? })`:
     - Computes canonical 7-day window via `computeWeeklyEditionWindow()` when omitted.
     - Fetches blogs and fresh videos concurrently (`Promise.allSettled`).
     - Deduplicates against both the current batch and the last 4 published issues (so last week's article or video never repeats this week).
     - Enforces per-tier freshness floor (`minArticlesPerTier = 3`, `minVideosPerTier = 3`): if a specific tier has fewer than 3 items inside the strict 7-day window, widens lookback up to `fallbackLookbackDays` (default `14`, max `30`) **only for that sparse tier** while preserving each item's truthful `publishedAt` timestamp.
     - Selects up to `6` top ranked blogs (marking #1 `isLead: true`) and up to `6` freshly published videos per tier per issue so `This Week` highlights top 3 + top 3 while clicking `Blogs` or `Videos` reveals that week's fuller curated set.
     - Persists transactionally (unless `dryRun: true`) and returns structured `DigestSyncReportDTO` (issue number, window dates, counts fetched/rejected/deduplicated/persisted per tier, and source warnings).
3. Wire into Fastify & CLI:
   - Add `POST /api/v1/digest/issues/sync` in `apps/api/src/modules/digest/digest.routes.ts` guarded by `ADMIN` role authentication OR constant-time `timingSafeEqual` check on `X-Digest-Sync-Secret` header against `process.env.DIGEST_SYNC_SECRET` (`401`/`403` otherwise).
   - Create standalone CLI runner `apps/api/src/scripts/syncWeeklyDigest.ts` supporting `--weekStart=YYYY-MM-DD --weekEnd=YYYY-MM-DD --dryRun` and register `"digest:sync": "tsx src/scripts/syncWeeklyDigest.ts"` in `apps/api/package.json` for weekly Sunday `05:00 UTC` cron execution.
   - Update `.env.example` with optional `YOUTUBE_API_KEY` and `DIGEST_SYNC_SECRET` documentation.
4. Author comprehensive unit & `.inject()` integration tests in `apps/api/tests/digestIngestion.test.ts` using `FakeBlogFeedFetcher`, `FakeYouTubeFeedFetcher`, `DeterministicDigestCuratorFake`, and `InMemoryDigestRepository`:
   - Strict `[weekStart, weekEnd]` window filtering for both blogs and videos.
   - Rejection of non-embeddable videos, Shorts `< 90s`, and SSRF/non-HTTPS URLs.
   - Cross-issue deduplication (running sync twice is 100% idempotent; items from Issue #41 never repeat in Issue #42).
   - Partial feed failure resilience (1 failing RSS feed logs a warning while remaining feeds still build a complete edition).
   - Sparse-tier lookback fallback preserves exact original `publishedAt`.
   - `POST /api/v1/digest/issues/sync` returns `401` unauthenticated, `403` for non-admin `PARENT` user, and `200` with `DigestSyncReportDTO` for `ADMIN` or valid `X-Digest-Sync-Secret`.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [ ] `apps/api/package.json` (add `fast-xml-parser` and `"digest:sync"` script)
- [ ] `.env.example` (document `YOUTUBE_API_KEY`, `DIGEST_SYNC_SECRET`)
- [ ] `apps/api/src/modules/digest/ingestion/curatedSources.ts`
- [ ] `apps/api/src/modules/digest/ingestion/adapters/blogFeedFetcher.ts`
- [ ] `apps/api/src/modules/digest/ingestion/adapters/youtubeFeedFetcher.ts`
- [ ] `apps/api/src/modules/digest/ingestion/adapters/digestCurator.ts`
- [ ] `apps/api/src/modules/digest/ingestion/digestIngestion.orchestrator.ts`
- [ ] `apps/api/src/modules/digest/digest.repository.ts`
- [ ] `apps/api/src/modules/digest/digest.controller.ts`
- [ ] `apps/api/src/modules/digest/digest.routes.ts`
- [ ] `apps/api/src/app.ts` (inject optional ingestion seams for tests)
- [ ] `apps/api/src/scripts/syncWeeklyDigest.ts`
- [ ] `apps/api/tests/digestIngestion.test.ts`

---

## 6. Acceptance Criteria & Verification Plan

```bash
npm run typecheck --workspace=@alongside/api
npm run test --workspace=@alongside/api -- digestIngestion
npm run test --workspace=@alongside/api
npm run digest:sync --workspace=@alongside/api -- --dryRun
```

- Automated tests execute completely offline using in-memory fakes (`0` live network calls during CI test suite) and pass 100%.
- `--dryRun` CLI verification against real RSS + YouTube Atom feeds outputs a valid `DigestSyncReportDTO` with real HTTPS publisher URLs and live embeddable video IDs published inside the target week window.
- Zero copyrighted full-article scraping anywhere in the codebase (`rssExcerpt <= 600 chars`, attribution + canonical `sourceUrl` preserved on every external blog).
- `POST /api/v1/digest/issues/sync` enforces strict admin/secret auth (`401`/`403` when unauthorized).

---

## 7. Role Boundaries & Prohibitions

- **Strict Backend Scope:** Do NOT edit files inside `apps/web/`.
- **Copyright & Safety Mandate:** Never scrape or persist full external HTML article bodies; store only canonical metadata, sanitized RSS excerpt (`<= 600 chars`), and original Alongside calm takeaways linking directly to `sourceUrl`.
- **Zero Hardcoded Clients:** Accept `BlogFeedFetcher`, `YouTubeFeedFetcher`, `DigestContentCurator`, and `DigestRepository` via constructor/plugin injection.
- **No Fabricated Timestamps:** Only populate `jumpChips` from real parsed YouTube description chapters via `parseYouTubeDescriptionChapters()`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [ ] All deliverables created and located in correct directories.
- [ ] All external I/O seams ship matching production adapters and deterministic in-memory fakes.
- [ ] `npm run typecheck` exits with code 0.
- [ ] `apps/api` test suite passes 100% including `digestIngestion.test.ts`.
- [ ] `ponytail-review` diff audit passed with zero speculative bloat.
- [ ] Conventional Commits used and plain-text PR opened targeting `main` (left open for human merge).
