# Agent Rule: Codebase Design & Deep Module Architecture

Canonical Specification: [`docs/engineering-standards/codebase-design.md`](file:///C:/GithubProjects/AlongSide/docs/engineering-standards/codebase-design.md)  
Applies To: Frontend Agent, Backend Agent, Technical Planners  

---

## 1. Mandatory Vocabulary & Mental Model

Agents MUST use the canonical vocabulary strictly. Do NOT substitute "component," "service," "API," or "boundary":
- **Module:** Anything with an interface and an implementation (function, class, package, or domain slice).
- **Interface:** Everything a caller must know: types, invariants, ordering, error modes, configuration.
- **Implementation:** Private body of code inside a module.
- **Depth:** Behavioral leverage at the interface (large capability behind a small interface).
- **Seam:** Location where behavior can be altered without editing in that place (Michael Feathers).
- **Adapter:** Concrete artifact that satisfies an interface at a seam (role, not substance).
- **Leverage:** Maximum capability gained per unit of interface learned.
- **Locality:** Concentrating change, bugs, and invariants in one place.

---

## 2. Deep Modules & The Deletion Test (STRICT)

1. **Design Deep Modules:**
   - Expose the smallest possible public interface.
   - Hide complex domain logic (validation, cryptography, state machines, error mapping) inside the implementation.
   - **FORBIDDEN:** Thin pass-through services where a controller method calls a service method that merely forwards identical arguments to Prisma.
2. **Apply the Deletion Test:**
   - Before authoring or committing any module, verify: If this module were deleted, does complexity disappear (shallow wrapper to be deleted), or scatter across $N$ callers (deep module earning its keep)?

---

## 3. Designing for Testability (The 3 Imperatives)

### Rule 3.1: Accept Dependencies, Don't Create Them
- **MANDATORY:** Inject collaborators (adapters at seams) via constructor or function parameters.
- **FORBIDDEN:** Calling `new Stripe()`, `new OpenAI()`, or hardcoding filesystem/network clients inside domain modules.

### Rule 3.2: Return Results, Don't Produce Hidden Side Effects
- **MANDATORY:** Domain engines (`@alongside/shared/src/algorithms/`) MUST be pure functions returning immutable decision structures.
- **FORBIDDEN:** Hiding database writes or network calls inside assessment scoring or pact rule evaluation functions.

### Rule 3.3: Small Surface Area & Seam-Level Testing
- **MANDATORY:** Callers and tests MUST cross the exact same seam. Test through the public interface.
- **FORBIDDEN:** Writing tests that bypass the interface to inspect private state or mock deep internal helper methods.

---

## 4. The Two-Adapter Seam Rule

> **"One adapter means a hypothetical seam. Two adapters means a real one."**

Every external I/O seam in AlongSide MUST have at least two adapters:
1. **Production Adapter:** Connects to real hardware, cloud, or external APIs (`AppleMobileConfigSigner`, `OpenAiStreamingAdapter`, `StripeBillingAdapter`, `ReactPdfRendererAdapter`).
2. **Test Fake Adapter:** Fast, deterministic, in-memory implementation (`FakeDevProfileSigner`, `DeterministicAiAdvisorFake`, `FakeBillingGateway`, `InMemoryPdfFake`).

Never introduce an abstract seam without supplying both adapters.

---

## 5. Domain Seam Reference Table

| Seam ID | Domain Module | Interface Contract | Production Adapter | Test Fake Adapter |
| :--- | :--- | :--- | :--- | :--- |
| **SEAM-01** | `device-profiles` | `DeviceProfileCompiler` | `AppleMobileConfigSigner` | `FakeDevProfileSigner` |
| **SEAM-02** | `ai-advisor` | `AiAdvisorEngine` | `OpenAiStreamingAdapter` | `DeterministicAiAdvisorFake` |
| **SEAM-03** | `agreements` | `PdfDocumentRenderer` | `ReactPdfRendererAdapter` | `InMemoryPdfFake` |
| **SEAM-04** | `billing` | `BillingGateway` | `StripeBillingAdapter` | `FakeBillingGateway` |
| **SEAM-05** | `storage` | `StorageEngine` | `EncryptedS3StorageAdapter` | `InMemoryStorageFake` |
| **SEAM-06** | `packages/shared` | Algorithmic scoring | Pure functional engine | Vitest parameter matrix |
| **SEAM-07** | `apps/web/stores` | `PactWizardStore` | `ZustandPactStore` | `MockPactWizardStore` |
