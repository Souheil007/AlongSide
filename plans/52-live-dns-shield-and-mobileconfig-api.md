# Plan 52: Live DNS Shield & Apple DoH Mobileconfig Backend API
**Plan ID:** `PLAN-52`  
**Assignee:** Backend Agent  
**Dependencies:** `PLAN-04`, `PLAN-06`, `PLAN-44`  
**Estimated Scope:** Medium  
**Paperclip Issue:** TBD

---

## 1. Objective & Business Value
Turn Alongside's `/devices` parental control toggles from a static checklist into **real, live network enforcement** across iPhone/iPad (Wi-Fi + 5G), Android (Wi-Fi + 5G), and Home Routers/Consoles. By introducing a swappable `DnsPolicyProvider` seam (starting with a NextDNS REST adapter for MVP validation) and upgrading the existing Apple `.mobileconfig` compiler to emit valid `com.apple.dnsSettings.managed` DNS-over-HTTPS payloads, parents can enforce adult filtering, app blocking (TikTok, Snapchat, Instagram, Discord, Roblox, YouTube), SafeSearch, VPN bypass blocking, and bedtime recreation schedules from Alongside with zero third-party mobile apps required.

---

## 2. Inputs & Architectural References
- **Architecture Specification:** [`docs/dns-parental-controls-architecture.md`](../docs/dns-parental-controls-architecture.md)
- **System Architecture:** [`docs/system-architecture.md`](../docs/system-architecture.md)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md)
- **Data Models:** [`docs/data-models.md`](../docs/data-models.md)
- **Codebase Design & Seams:** [`docs/engineering-standards/codebase-design.md`](../docs/engineering-standards/codebase-design.md)
- **Backend Skill Matrix:** [`docs/engineering-standards/backend-skill-matrix.md`](../docs/engineering-standards/backend-skill-matrix.md)
- **Code Quality & Git Standards:** [`docs/engineering-standards/code-quality-principles.md`](../docs/engineering-standards/code-quality-principles.md), [`docs/engineering-standards/git-commit-standards.md`](../docs/engineering-standards/git-commit-standards.md)

---

## 3. Preconditions & Dependency Verification
- `packages/database/prisma/schema.prisma` contains `Child` and `DeviceProfile` models.
- `apps/api/src/modules/device-profiles/` contains `profile.signer.ts` (`AppleMobileConfigSigner` + `FakeDevProfileSigner`), `profile.compiler.ts`, and `device-profiles.routes.ts`.
- `packages/shared` compiles cleanly via `npm run typecheck`.
- Environment configuration pattern from `PLAN-44` is active in `apps/api/src/config/env.ts`.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Shared Canonical Contracts & Pure Age-Default Policy Mapper (`packages/shared`)
1. Create `packages/shared/src/device-shield.ts` and export it from `packages/shared/src/index.ts`.
2. Define `const` objects (never TypeScript `enum`, per Node v22 strip-types rules):
   - `DnsProviderType = { NEXTDNS: 'NEXTDNS', CONTROLD: 'CONTROLD', SELF_HOSTED: 'SELF_HOSTED', FAKE: 'FAKE' } as const`
   - `ShieldBlockableService = { TIKTOK: 'tiktok', INSTAGRAM: 'instagram', SNAPCHAT: 'snapchat', DISCORD: 'discord', ROBLOX: 'roblox', YOUTUBE: 'youtube', TWITCH: 'twitch', FORTNITE: 'fortnite', REDDIT: 'reddit' } as const`
3. Define Zod schemas:
   - `UpdateDeviceShieldSchema`:
     ```ts
     {
       platform: z.enum(['APPLE_IOS', 'ANDROID']),
       blockAdultContent: z.boolean(),
       safeSearch: z.boolean(),
       youtubeRestrictedMode: z.boolean(),
       blockBypass: z.boolean(),
       blockedServices: z.array(z.enum([...])).max(20),
       bedtimeServices: z.array(z.enum([...])).max(20), // services paused overnight only
       bedtimeEnabled: z.boolean(),
       bedtimeStart: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/), // e.g. "20:30"
       bedtimeEnd: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),   // e.g. "06:30"
       timezone: z.string().min(2).max(64),                         // IANA e.g. "America/New_York"
     }
     ```
   - `DeviceShieldDTO` interface including `id`, `childId`, `platform`, `providerType`, `isProvisioned`, `dohUrl`, `dotHostname`, `ipv4Servers`, `enrollmentToken`, `appleProfileDownloadUrl`, `enrollmentQrUrl`, policy fields, and `health: { isActive: boolean; totalQueries24h: number; blockedQueries24h: number; checkedAt: string | null }`.
4. Author pure algorithmic function `buildRecommendedShieldPolicy(age: number, timezone?: string)` returning age-calibrated defaults (e.g., ages 4-12 block TikTok/Snapchat/Instagram/Discord + adult/SafeSearch/bypass + 8:00/8:30 PM bedtime; ages 13-15 keep adult/SafeSearch/bypass + 9:30 PM bedtime; ages 16-18 keep adult + SafeSearch).

### Task 2: Database Schema Evolution (`packages/database`)
1. Update `packages/database/prisma/schema.prisma` to add `DeviceShieldConfig` (1:1 with `Child`, cascade delete on child removal):
   ```prisma
   model DeviceShieldConfig {
     id                    String         @id @default(uuid())
     childId               String         @unique
     child                 Child          @relation(fields: [childId], references: [id], onDelete: Cascade)
     platform              DevicePlatform @default(APPLE_IOS)
     providerType          String         @default("NEXTDNS")
     providerProfileId     String?
     enrollmentToken       String         @unique @default(uuid())
     blockAdultContent     Boolean        @default(true)
     safeSearch            Boolean        @default(true)
     youtubeRestrictedMode Boolean        @default(true)
     blockBypass           Boolean        @default(true)
     blockedServices       String[]       @default([])
     bedtimeServices       String[]       @default([])
     bedtimeEnabled        Boolean        @default(true)
     bedtimeStart          String         @default("20:30")
     bedtimeEnd            String         @default("06:30")
     timezone              String         @default("UTC")
     lastSyncedAt          DateTime?
     createdAt             DateTime       @default(now())
     updatedAt             DateTime       @updatedAt

     @@index([enrollmentToken])
     @@map("device_shield_configs")
   }
   ```
2. Generate Prisma migration (`npx prisma migrate dev --name add_device_shield_config`) and regenerate Prisma client.

### Task 3: Swappable `DnsPolicyProvider` Deep Module Seam (`apps/api`)
1. Create `apps/api/src/modules/device-profiles/dns-provider.ts` defining:
   - `DnsPolicyProvider` interface:
     - `createProfile(input: { displayName: string; policy: DeviceShieldPolicyInput }): Promise<ProvisionedDnsProfile>`
     - `syncPolicy(providerProfileId: string, policy: DeviceShieldPolicyInput): Promise<void>`
     - `getHealthSummary(providerProfileId: string): Promise<DnsHealthSummary>` (aggregate counts ONLY; zero domain logs)
     - `deleteProfile(providerProfileId: string): Promise<void>`
   - `NextDnsPolicyAdapter`:
     - Uses native Node 22 `fetch` with `X-Api-Key` header against `https://api.nextdns.io`.
     - Maps canonical `DeviceShieldPolicyInput` to NextDNS `parentalControl` JSON (`categories: porn/gambling/dating`, `services` with `active` + `recreation`, `safeSearch`, `youtubeRestrictedMode`, `blockBypass`, `recreation.times` across `monday..sunday` with `start: bedtimeEnd + ':00'`, `end: bedtimeStart + ':00'`, `timezone`).
     - Returns `dohUrl: https://dns.nextdns.io/${id}`, `dotHostname: ${id}.dns.nextdns.io`, `ipv4Servers: ['45.90.28.0', '45.90.30.0']`.
     - Queries `GET /profiles/${id}/analytics/status?from=-24h` for aggregate active/blocked counts only.
     - Enforces a 5-second `AbortSignal.timeout(5000)` and maps upstream HTTP errors to structured `DnsProviderError`.
   - `InMemoryDnsPolicyFake`:
     - Full deterministic in-memory fake storing provisioned profiles, synced policies, and simulated 24h query stats for zero-network unit & integration tests.
2. Add optional `NEXTDNS_API_KEY` and `DNS_PROVIDER` (`nextdns` | `fake`) to `apps/api/src/config/env.ts` and `.env.example`.

### Task 4: Upgrade Apple `.mobileconfig` Compiler to Official DoH (`com.apple.dnsSettings.managed`)
1. Add `compileEncryptedDnsProfile(input: { childName: string; dohUrl: string; serverAddresses: string[]; profileIdentifierSuffix: string })` to `apps/api/src/modules/device-profiles/profile.compiler.ts`.
2. Emit valid Apple XML plist containing `PayloadType: 'com.apple.dnsSettings.managed'`, `DNSSettings: { DNSProtocol: 'HTTPS', ServerURL: dohUrl, ServerAddresses: serverAddresses }`, `ProhibitDisablement: false`, `PayloadRemovalDisallowed: false` (mandatory for unsupervised consumer iPhones/iPads).
3. Wrap the compiled plist through the injected `ProfileSigner` (`AppleMobileConfigSigner` in prod, `FakeDevProfileSigner` in tests).

### Task 5: Device Shield Repository, Service & Fastify Routes (`apps/api`)
1. Create `apps/api/src/modules/device-profiles/device-shield.repository.ts` (`DeviceShieldRepository` + `PrismaDeviceShieldRepository` + `InMemoryDeviceShieldRepository`).
2. Create `apps/api/src/modules/device-profiles/device-shield.service.ts` (`DeviceShieldService`):
   - `getOrInitializeShield(userId, childId)`: verifies child ownership; returns existing shield config or age-calibrated unprovisioned draft.
   - `upsertAndSyncShield(userId, childId, input)`: validates ownership, provisions external DNS profile on first activation (or updates existing profile via `dnsProvider.syncPolicy`), persists to DB, returns `DeviceShieldDTO`.
   - `getLiveStatus(userId, childId)`: calls `dnsProvider.getHealthSummary` (never returns browsing logs).
   - `getAppleMobileConfigByToken(enrollmentToken)`: public OTA download endpoint returning signed `.mobileconfig` with headers `Content-Type: application/x-apple-aspen-config; charset=utf-8`, `Content-Disposition: attachment; filename="Alongside_<Child>_Shield.mobileconfig"`, and `Cache-Control: no-store`.
3. Register authenticated and OTA routes in `apps/api/src/modules/device-profiles/device-profiles.routes.ts` (with Ajv JSON Schema validation):
   - `GET /api/v1/devices/shield/:childId` (auth required)
   - `PUT /api/v1/devices/shield/:childId` (auth required)
   - `GET /api/v1/devices/shield/:childId/status` (auth required)
   - `GET /api/v1/devices/shield/profile/:enrollmentToken` (token-scoped OTA `.mobileconfig` download)
   - `GET /api/v1/devices/shield/qr/:enrollmentToken` (token-scoped QR code pointing to OTA `.mobileconfig` URL)

### Task 6: Integration & Unit Test Suite (`apps/api`)
1. Create `apps/api/tests/device-shield.test.ts` using Vitest + Fastify `.inject()` + `InMemoryDnsPolicyFake` + `FakeDevProfileSigner` + `InMemoryDeviceShieldRepository`.
2. Cover:
   - Age-calibrated default policy derivation (`buildRecommendedShieldPolicy` for ages 7, 10, 14, 17).
   - First-time `PUT /api/v1/devices/shield/:childId` provisions DNS profile and returns `dohUrl`, `dotHostname`, and `appleProfileDownloadUrl`.
   - Subsequent `PUT` syncs updated blocked services & bedtime schedule to existing `providerProfileId` without creating duplicates.
   - `GET /api/v1/devices/shield/profile/:enrollmentToken` returns valid XML plist containing `com.apple.dnsSettings.managed`, `DNSProtocol` = `HTTPS`, `ProhibitDisablement` = `false`, and child's `dohUrl`.
   - `GET /api/v1/devices/shield/:childId/status` returns aggregate counts only and enforces parent ownership (404/403 for another parent's child).
   - `NextDnsPolicyAdapter` payload mapping unit test (mocked `fetch` verifying exact `X-Api-Key`, `parentalControl` JSON, and timeout error handling).

---

## 5. Specific Deliverables (Files to Create / Modify)
- [x] `packages/shared/src/constants/index.ts`, `packages/shared/src/types/index.ts`, `packages/shared/src/schemas/deviceShield.ts`, `packages/shared/src/algorithms/deviceShield.ts`, `packages/shared/src/index.ts`, `packages/shared/test/deviceShield.test.ts`
- [x] `packages/database/prisma/schema.prisma` (add `DeviceShieldConfig`)
- [x] `packages/database/prisma/migrations/20261123_add_device_shield_config/migration.sql` (new)
- [x] `.env.example` (document `NEXTDNS_API_KEY`, `DNS_PROVIDER`)
- [x] `apps/api/src/modules/device-profiles/dns-provider.ts` (new)
- [x] `apps/api/src/modules/device-profiles/profile.compiler.ts` (add `compileEncryptedDnsProfile`)
- [x] `apps/api/src/modules/device-profiles/device-shield.repository.ts` (new)
- [x] `apps/api/src/modules/device-profiles/device-shield.service.ts` (new)
- [x] `apps/api/src/modules/device-profiles/device-shield.controller.ts` (new)
- [x] `apps/api/src/modules/device-profiles/device-profiles.routes.ts`, `index.ts`, and `apps/api/src/app.ts` (wire routes & DI seam)
- [x] `apps/api/test/deviceShield.test.ts` (new)

---

## 6. Acceptance Criteria & Verification Plan
Run and confirm exit code 0 across all commands:
1. `Push-Location packages/shared; npm run typecheck; Pop-Location`
2. `Push-Location packages/database; npx prisma validate; Pop-Location`
3. `Push-Location apps/api; npm run typecheck; npm test; Pop-Location`
4. Verify compiled `.mobileconfig` XML parses cleanly with `plist.parse()`, contains `com.apple.dnsSettings.managed`, and keeps `ProhibitDisablement === false`.
5. Verify zero browsing-history domains are requested or persisted anywhere in `dns-provider.ts` or `DeviceShieldConfig`.

---

## 7. Role Boundaries & Prohibitions
- **Backend Agent ONLY:** Do NOT edit files in `apps/web/`.
- Do NOT hardcode `new NextDnsPolicyAdapter()` inside services without accepting a `DnsPolicyProvider` constructor parameter.
- Do NOT call NextDNS `/logs` endpoints or store child browsing URLs.
- Do NOT use TypeScript `enum`; use `as const` objects compatible with Node v22 native type stripping.

---

## 8. Definition of Done (DoD) Sign-Off Checklist
- [ ] All deliverables created and located in the specified directories.
- [ ] `DnsPolicyProvider` seam ships with both `NextDnsPolicyAdapter` and `InMemoryDnsPolicyFake`.
- [ ] `npm run typecheck` exits 0 across `packages/shared` and `apps/api`.
- [ ] `npm test` passes 100% with Fastify `.inject()` integration tests.
- [ ] `ponytail-review` diff audit passes with zero speculative bloat.
- [ ] Conventional Commit created with `--no-gpg-sign` on a feature branch off `origin/main` and PR opened with plain-text (`.txt`) body (left OPEN for human Squash & Merge).
