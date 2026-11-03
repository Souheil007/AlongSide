# Plan 06: Bilateral Family Pact Engine & Device Profile Compiler API
**Plan ID:** `PLAN-06`  
**Assignee:** Backend Agent  
**Dependencies:** PLAN-04  
**Estimated Scope:** Large  
**Status:** Completed & Verified  

---

## 1. Objective & Business Value

Implement the Bilateral Family Pact engine and the "Pact-as-Code" Device Profile compiler. This service generates customized family tech treaties (with parent and child commitments), compiles them into cryptographically signed Apple `.mobileconfig` (Declarative Management) and Android Enterprise policy payloads, provides the single-scan QR enrollment endpoint, and renders refrigerator-ready vector PDF agreements.

---

## 2. Inputs & Architectural References

- **Canonical Product Scope:** [`PROJECT_SCOPE.md`](../PROJECT_SCOPE.md) (Section 3: Pillar 5 "Pact-as-Code" OS)
- **Architecture Specification:** [`docs/system-architecture.md`](../docs/system-architecture.md) (Data Flow 3.2: Pact-to-Profile Compiler Pipeline)
- **API Specification:** [`docs/api-specification.md`](../docs/api-specification.md) (Section 7: Agreements, Section 8: Device Profiles)
- **Database Schema:** [`docs/data-models.md`](../docs/data-models.md) (`Agreement`, `AgreementClause`, `DeviceProfile` models)
- **Agent Boundaries:** [`AGENTS.md`](../AGENTS.md)

---

## 3. Preconditions & Dependency Verification

- **Prerequisites:** `PLAN-04` completed (`Child` entity operational with `roadType` and `developmentalTier`).
- **Dependencies:** Install `node-forge` (cryptographic PKCS#7 signing) and `plist` (Apple configuration XML generation) in `apps/api/package.json`.

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Bilateral Agreement Engine & Presets
1. Implement preset clauses categorized by child age tier and road type in `apps/api/src/modules/agreements/agreements.presets.ts`:
   - Screen Time Budgets, 8:30 PM Bedtime Curfew, No-Snooping Safe Harbor, Category Age Gating.
2. Implement `apps/api/src/modules/agreements/agreements.service.ts`:
   - `createAgreement(userId: string, data: CreateAgreementInput)`: Validates parent and child signatures.
   - `getAgreementById(userId: string, agreementId: string)`.
   - `updateAgreement(userId: string, agreementId: string, data: UpdateAgreementInput)`.

### Task 2: Vector PDF Render Engine
1. Implement PDF generation service in `apps/api/src/modules/agreements/pdf.service.ts` using `@react-pdf/renderer` or Puppeteer:
   - Beautiful, refrigerator-ready 1-2 page layout.
   - Displays bilateral commitments, co-signatures, date, and "Safe Harbor Guarantee" badge.
2. Implement route `GET /api/v1/agreements/:id/export-pdf` streaming `application/pdf`.

### Task 3: "Pact-as-Code" Apple / Android Profile Compiler
1. Implement profile generator in `apps/api/src/modules/device-profiles/profile.compiler.ts`:
   - Generates Apple `.mobileconfig` XML plist containing `com.apple.applicationaccess` restrictions:
     - Scheduled bedtime app lockout (`20:30` curfew).
     - App Store age rating restrictions (e.g. 12+ or 17+ block).
     - Emergency whitelist: Phone calls (`com.apple.mobilephone`), Emergency hotlines, and Parent SMS are preserved 24/7.
2. Implement cryptographic signing service in `apps/api/src/modules/device-profiles/profile.signer.ts`:
   - Uses `node-forge` to produce PKCS#7 signed CMS message wrapping the `.mobileconfig` XML with SHA-256 digest.
   - Fallback to unsigned XML in local development environments.

### Task 4: Device Enrollment & Heartbeat Endpoints
1. Implement `POST /api/v1/agreements/:id/compile-profile`:
   - Compiles clauses into a signed profile, creates `DeviceProfile` record with `PENDING_ENROLLMENT`, generates unique `enrollmentToken`, and returns QR code enrollment URL.
2. Implement OTA profile delivery endpoint `GET /api/v1/devices/enroll/:token`:
   - Validates token, serves signed `.mobileconfig` with header `Content-Type: application/x-apple-aspen-config; charset=utf-8`.
3. Implement `POST /api/v1/devices/heartbeat/:token`:
   - Records device connection and checks for profile tampering.

### Task 5: Automated Integration Testing
1. Author Vitest tests in `apps/api/tests/modules/agreements/agreements.test.ts`:
   - Create agreement with clauses -> asserts 201 Created and persisted clauses.
   - Export PDF -> asserts HTTP 200 and `application/pdf` content-type.
   - Compile profile -> asserts valid enrollment token generated and XML plist payload formatted.
   - Enrollment endpoint -> asserts profile delivery with proper MIME headers.

---

## 5. Specific Deliverables (Files to Create / Modify)

- [x] `apps/api/src/modules/agreements/agreements.presets.ts`
- [x] `apps/api/src/modules/agreements/agreements.service.ts`
- [x] `apps/api/src/modules/agreements/agreements.controller.ts`
- [x] `apps/api/src/modules/agreements/agreements.routes.ts`
- [x] `apps/api/src/modules/agreements/pdf.service.ts`
- [x] `apps/api/src/modules/device-profiles/profile.compiler.ts`
- [x] `apps/api/src/modules/device-profiles/profile.signer.ts`
- [x] `apps/api/src/modules/device-profiles/device-profiles.service.ts`
- [x] `apps/api/src/modules/device-profiles/device-profiles.controller.ts`
- [x] `apps/api/src/modules/device-profiles/device-profiles.routes.ts`
- [x] `apps/api/test/agreements.test.ts`
- [x] `apps/api/test/deviceProfiles.test.ts`

---

## 6. Acceptance Criteria & Verification Plan

1. **Type Checking:**
   ```bash
   npm run typecheck --workspace=@alongside/api
   ```
   *Pass criteria:* Clean compilation with zero TypeScript errors.
2. **Automated Test Suite:**
   ```bash
   npm test --workspace=@alongside/api
   ```
   *Pass criteria:* 100% of agreement and device-profile test suites pass.
3. **MIME Type & Plist Assertion:**
   *Pass criteria:* Test asserts enrollment endpoint delivers `application/x-apple-aspen-config` containing `<plist version="1.0">`.

---

## 7. Role Boundaries & Prohibitions

- **Assigned:** Backend Agent.
- ❌ **DO NOT** edit files in `apps/web/`.
- ❌ **DO NOT** implement React canvas signature pads or QR code UI components.
- ✅ Work exclusively inside `apps/api/` and `packages/shared/`.

---

## 8. Definition of Done (DoD) Sign-Off Checklist

- [x] All deliverables created and located in correct directories.
- [x] Apple `.mobileconfig` compiler produces valid XML plist structure.
- [x] PKCS#7 signing service configured with fallbacks for development.
- [x] Vector PDF export operational.
- [x] `npm run typecheck` exits with code 0.
- [x] All automated tests pass.
- [x] Commits adhere to Conventional Commits (`feat(pact): ...`).
