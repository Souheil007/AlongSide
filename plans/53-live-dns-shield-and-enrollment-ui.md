# Plan 53: Live DNS Shield Controls & One-Tap Enrollment UI
**Plan ID:** `PLAN-53`  
**Assignee:** Frontend Agent  
**Dependencies:** `PLAN-52` (or mocked via `@alongside/shared` contract during parallel development)  
**Estimated Scope:** Medium  
**Paperclip Issue:** TBD

---

## 1. Objective & Business Value
Upgrade the Direction G 3-step vertical journey timeline on `/devices` so parents don't just read static tips — they toggle real live protection switches (adult filtering, SafeSearch, VPN bypass blocking, specific apps like TikTok/Snapchat/Instagram/Discord/Roblox/YouTube, and bedtime pause) that sync directly with the backend DNS Shield API (`PLAN-52`), generate a one-tap Apple `.mobileconfig` QR/download or copyable Android Private DNS hostname, and display real-time privacy-preserving active status.

---

## 2. Inputs & Architectural References
- **Architecture Specification:** [`docs/dns-parental-controls-architecture.md`](../docs/dns-parental-controls-architecture.md)
- **Backend API Plan:** [`plans/52-live-dns-shield-and-mobileconfig-api.md`](52-live-dns-shield-and-mobileconfig-api.md)
- **Frontend Skill Matrix:** [`docs/engineering-standards/frontend-skill-matrix.md`](../docs/engineering-standards/frontend-skill-matrix.md)
- **Codebase Design:** [`docs/engineering-standards/codebase-design.md`](../docs/engineering-standards/codebase-design.md)
- **Design Aesthetic:** Alongside warm Editorial Almanac (`#FAF9F5` linen, `#F3EFE6` sand, `#143D2B` spruce, `#B45309` amber, `Newsreader` + `Inter`, zero violet, zero em-dashes, ≥44x44px touch targets).

---

## 3. Preconditions & Dependency Verification
- Direction G 3-step vertical journey timeline is merged on `/devices` (`DevicesManagementView.tsx`, PR #196).
- `@alongside/shared` exports `DeviceShieldDTO`, `UpdateDeviceShieldSchema`, `ShieldBlockableService`, and `buildRecommendedShieldPolicy` (from `PLAN-52`).
- App Router page `apps/web/src/app/(dashboard)/devices/page.tsx` remains a React Server Component (zero `'use client'`).

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Isolated Device Shield API Client & Offline Fallback (`apps/web/src/lib/api/deviceShield.ts`)
1. Create `apps/web/src/lib/api/deviceShield.ts` wrapping `apiClient`:
   - `getChildDeviceShield(childId: string): Promise<DeviceShieldDTO>`
   - `updateChildDeviceShield(childId: string, input: UpdateDeviceShieldInput): Promise<DeviceShieldDTO>`
   - `getChildDeviceShieldStatus(childId: string): Promise<DeviceShieldDTO['health']>`
2. Provide deterministic local fallback when the backend is offline or `NEXTDNS_API_KEY` is unconfigured so UI flows remain cleanly testable and never crash.

### Task 2: Deep Client Hook `useDeviceShield` (`apps/web/src/hooks/useDeviceShield.ts`)
1. Encapsulate TanStack Query fetching, optimistic toggle mutations with automatic rollback on failure, debounced bedtime/app batching, copy-to-clipboard state for Android Private DNS, and child-switching state cleanup inside `useDeviceShield(childId, childAge)`.
2. Keep presentational components purely declarative and decoupled from raw network side effects.

### Task 3: Live Shield Controls & One-Tap Install Panel on `/devices`
1. Create `apps/web/src/components/devices/LiveDnsShieldCard.tsx` matching Direction G's calm editorial aesthetic (no dense walls of text):
   - **Header:** Live status pill (`Protected · Active` when queries seen in last 24h, `Ready to install` before first connection) + clean 2-way **`iPhone / iPad` | `Android`** switcher.
   - **Core Live Switches (4 clean 44px rows):**
     1. Adult & explicit websites (`blockAdultContent`)
     2. SafeSearch & YouTube Restricted Mode (`safeSearch` + `youtubeRestrictedMode`)
     3. Block VPN & proxy bypasses (`blockBypass`)
     4. Bedtime Internet Pause (`bedtimeEnabled` + quick picker `8:00 PM` / `8:30 PM` / `9:00 PM` / `9:30 PM`)
   - **Quick App Blocks (compact pill toggles):** `TikTok`, `Snapchat`, `Instagram`, `Discord`, `Roblox`, `YouTube` — tapping immediately saves and updates the live DNS profile.
   - **Install on Child's Device Drawer (compact, OS-adaptive):**
     - **iPhone / iPad:** Prominent `Download Protection Profile` button (`appleProfileDownloadUrl`) + scannable QR code (`enrollmentQrUrl`) + 2-line instruction (`Open Camera on child's iPhone → Tap link → Settings → Profile Downloaded → Install`).
     - **Android:** Copyable Private DNS hostname box (`<id>.dns.nextdns.io`) with `Copy hostname` button + 2-line instruction (`Settings → Network & internet → Private DNS → Private DNS provider hostname → Paste & Save`).
     - **Home Router / Consoles (collapsible):** Displays DNS IPv4 addresses (`45.90.28.0`, `45.90.30.0`) for Switch/PS5/Xbox/TVs.
   - **Privacy Note (1 quiet line):** `"Alongside never reads or stores browsing history or messages. Status only checks that protection is online."`
2. Integrate `LiveDnsShieldCard` cleanly into `DevicesManagementView.tsx`:
   - **Step 1:** Phone Readiness Check (unchanged: score ring + Retake, or Start check).
   - **Step 2:** Live Network Shield (`LiveDnsShieldCard` — actually enforces toggles in real time!).
   - **Step 3:** Essential Built-In OS Locks (shortened to the 3 native Apple/Google switches DNS cannot handle: `Screen Time Passcode / Lock Profile`, `App Store Approvals (Ask to Buy / Play)`, and `Contacts Only & Explicit Photo Blur` — plus optional Roblox/YouTube in-app extras).
   - Keep Toddler Tier 0 Screen-Free Sanctuary (ages 0-3) completely intact.

### Task 4: Verification & Automated Tests (`apps/web/test/liveDnsShield.test.tsx`)
1. Add Vitest render & hook tests verifying:
   - Step 1 Readiness + Step 2 Live DNS Shield + Step 3 Essential OS Locks render cleanly with zero pact wording, zero em-dashes, and zero violet classes.
   - iPhone view renders `.mobileconfig` install action and QR enrollment link; Android view renders copyable Private DNS hostname.
   - Status pill reflects `Protected` vs `Ready to install` cleanly without exposing browsing URLs.
   - Toddler view (ages 0-3) continues showing Screen-Free Sanctuary without DNS shield controls.

---

## 5. Specific Deliverables (Files to Create / Modify)
- [ ] `apps/web/src/lib/api/deviceShield.ts` (new)
- [ ] `apps/web/src/hooks/useDeviceShield.ts` (new)
- [ ] `apps/web/src/components/devices/LiveDnsShieldCard.tsx` (new)
- [ ] `apps/web/src/components/devices/DevicesManagementView.tsx` (integrate Step 2 Live Shield + lean Step 3 OS Locks)
- [ ] `apps/web/test/liveDnsShield.test.tsx` (new)
- [ ] `apps/web/test/devicesJourneyCanvas.test.tsx` (update assertions for integrated Live Shield)

---

## 6. Acceptance Criteria & Verification Plan
Run and confirm exit code 0:
1. `Push-Location apps/web; npm run typecheck; npm run lint; npm run test; Pop-Location`
2. Verify `apps/web/src/app/(dashboard)/devices/page.tsx` remains an RSC (no `'use client'`).
3. Verify all buttons/toggles meet `min-h-[44px]` touch target accessibility and contrast >= 4.5:1.
4. Verify zero em-dashes (`—`) and zero violet/purple accents in new components.

---

## 7. Role Boundaries & Prohibitions
- **Frontend Agent ONLY:** Do NOT edit files in `apps/api/` or `packages/database/`.
- Do NOT leak or expose `NEXTDNS_API_KEY` anywhere in `NEXT_PUBLIC_*` env vars or client bundles.
- Do NOT make `page.tsx` a Client Component; isolate interactivity inside `LiveDnsShieldCard.tsx` and `DevicesManagementView.tsx`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist
- [ ] All deliverables created and located in the specified directories.
- [ ] `useDeviceShield` hook encapsulates state, optimistic updates, and rollbacks cleanly.
- [ ] `npm run typecheck` exits 0 with zero TypeScript errors.
- [ ] Full Vitest suite in `apps/web` passes 100%.
- [ ] `ponytail-review` diff audit passes with zero speculative bloat.
- [ ] Conventional Commit created with `--no-gpg-sign` on a feature branch off `origin/main` and PR opened with plain-text (`.txt`) body (left OPEN for human Squash & Merge).
