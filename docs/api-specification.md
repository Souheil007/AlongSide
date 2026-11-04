# Alongside — REST API Specification
**Author:** Chief Technology Officer (CTO)  
**Status:** Approved for Engineering Implementation  
**Version:** 2.4.0 (The Holistic Child Upbringing, Pediatric Health & Lifespan Family OS)  
**Target Audience:** Frontend Engineer, Backend Engineer, QA  
**Companion Documents:**  
- [`docs/system-architecture.md`](system-architecture.md)  
- [`docs/technical-roadmap-v2.4.0.md`](technical-roadmap-v2.4.0.md)  
- [`docs/data-models.md`](data-models.md)  

---

## 1. General API Standards

- **Base URL:** `/api/v1`
- **Content Type:** `application/json` (unless streaming SSE: `text/event-stream`, downloading PDF: `application/pdf`, or downloading Apple profile: `application/x-apple-aspen-config`)
- **Authentication:** HTTP-Only Secure Cookie (`alongside_session`) or `Authorization: Bearer <jwt_token>` header.
- **Standard Error Envelope:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input provided.",
    "details": [
      {
        "field": "roadType",
        "message": "roadType must be either PRE_DEVICE or ACTIVE_DEVICE"
      }
    ]
  }
}
```
- **Standard Success Envelope:**
```json
{
  "success": true,
  "data": { ... },
  "meta": { ... }
}
```

---

## 2. Authentication & User Profile (`/api/v1/auth`)

### 2.1 Register
- **Endpoint:** `POST /api/v1/auth/register`
- **Request Body:**
```json
{
  "email": "sarah.parent@example.com",
  "password": "StrongPassword123!",
  "fullName": "Sarah Jenkins"
}
```
- **Response (201 Created):** Sets `alongside_session` cookie and returns user record with `subscriptionTier: "TRIAL"`.

### 2.2 Login
- **Endpoint:** `POST /api/v1/auth/login`
- **Request Body:**
```json
{
  "email": "sarah.parent@example.com",
  "password": "StrongPassword123!"
}
```
- **Response (200 OK):** Sets session cookie and returns user profile.

### 2.3 Current Profile (`GET /api/v1/auth/me`)
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "c7a8b3e2-...",
      "email": "sarah.parent@example.com",
      "fullName": "Sarah Jenkins",
      "subscription": {
        "tier": "TRIAL",
        "isActive": true,
        "trialEndsAt": "2026-11-10T12:00:00Z"
      },
      "childrenCount": 2
    }
  }
}
```

---

## 3. Children & Lifespan Developmental Profiles (`/api/v1/children`)

### 3.1 Create Child Profile
- **Endpoint:** `POST /api/v1/children`
- **Request Body:**
```json
{
  "name": "Leo",
  "birthYear": 2024,
  "birthMonth": 6,
  "birthDate": "2024-06-15T00:00:00.000Z",
  "roadType": "PRE_DEVICE",
  "dietaryStage": "SOLIDS_INTRODUCED",
  "allergies": ["peanut"],
  "pediatricNotes": "Mild eczema on ankles",
  "schoolGrade": "Infant Care"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "child": {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "name": "Leo",
      "birthYear": 2024,
      "birthMonth": 6,
      "ageMonths": 14,
      "roadType": "PRE_DEVICE",
      "developmentalTier": "TIER_0_INFANCY_TODDLER_0_3",
      "dietaryStage": "SOLIDS_INTRODUCED",
      "allergies": ["peanut"],
      "pediatricNotes": "Mild eczema on ankles",
      "schoolGrade": "Infant Care"
    }
  }
}
```

### 3.2 List Children
- **Endpoint:** `GET /api/v1/children`
- **Response (200 OK):** Array of `ChildDTO` objects with their active device profile status, active milestones count, and latest health logs.

---

## 4. Interactive Quizzes & Assessments (`/api/v1/quizzes`)

### 4.1 Get Quiz by Type
- **Endpoint:** `GET /api/v1/quizzes/:type`
- **Allowed Types:** `CULTURAL_FLUENCY_TWEEN`, `PARENTING_STYLE_CONFLICT`, `FIRST_PHONE_READINESS`, `HOUSEHOLD_SCREEN_AUDIT`, `JOINT_DISCOVERY_BRIDGE`
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "quiz": {
      "id": "q-tween-slang",
      "type": "CULTURAL_FLUENCY_TWEEN",
      "title": "Do You Speak Tween? Slang & Culture Fluency",
      "description": "5 rapid-fire questions testing your knowledge of emerging tween vocabulary and covert apps.",
      "questions": [
        {
          "id": "q1",
          "questionText": "What does 'crashout' mean when your 7th grader uses it?",
          "dimensionKey": "slang_literacy",
          "options": [
            { "id": "opt1", "optionText": "Falling asleep instantly after school", "isCorrect": false },
            { "id": "opt2", "optionText": "Having an explosive emotional reaction to a minor event", "isCorrect": true, "feedbackText": "Correct! Crashout refers to reckless, explosive behavior." },
            { "id": "opt3", "optionText": "Leaving a Discord call abruptly", "isCorrect": false }
          ]
        }
      ]
    }
  }
}
```

### 4.2 Submit Quiz Attempt
- **Endpoint:** `POST /api/v1/quizzes/attempts`
- **Request Body:**
```json
{
  "quizId": "q-readiness",
  "childId": "f47ac10b-...",
  "responses": [
    { "questionId": "q1", "selectedOptionId": "opt2" },
    { "questionId": "q2", "selectedOptionId": "opt4" }
  ]
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "attempt": {
      "id": "att-998",
      "overallScore": 78,
      "dimensionScores": {
        "executive_function": 80,
        "emotional_regulation": 70,
        "online_safety": 85
      },
      "recommendation": "Leo shows strong online safety instincts but requires external boundary scaffolding around bedtime transitions.",
      "recommendedRoadmapPreset": "ROAD_1_BRIDGE_CHARTER"
    }
  }
}
```

---

## 5. Parent Intelligence Academy (`/api/v1/academy`)

### 5.1 List Modules by Developmental Tier
- **Endpoint:** `GET /api/v1/academy/modules?tier=TIER_2_AGES_10_11`
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "modules": [
      {
        "id": "mod-tween-brain",
        "slug": "tween-neurobiology-and-adrenarche",
        "title": "The Tween Brain: Adrenarche, Social Dopamine & The Peer Shift",
        "summary": "Understand why peer approval suddenly eclipses family connection at ages 10-11.",
        "lessonCount": 4,
        "completedLessonCount": 1
      }
    ]
  }
}
```

### 5.2 Get Lesson Content
- **Endpoint:** `GET /api/v1/academy/lessons/:id`
- **Response (200 OK):** Full lesson markdown, clinical insights, and practical communication blueprints.

### 5.3 Mark Lesson Complete
- **Endpoint:** `POST /api/v1/academy/lessons/:id/complete`
- **Response (200 OK):** Updated progress state.

---

## 6. 24/7 AI Child Advisor & Modern Parenting FAQ Vault (`/api/v1/ai-advisor`, `/api/v1/faqs`)

### 6.1 Chat with 24/7 AI Child Advisor (Streaming SSE)
- **Endpoint:** `POST /api/v1/ai-advisor/chat`
- **Headers:** `Accept: text/event-stream`
- **Request Body:**
```json
{
  "childId": "f47ac10b-...",
  "conversationId": "conv-123", // optional, creates new if omitted
  "message": "My 11yo screamed at me when I told him screen time was over and slammed his door. What should I say?"
}
```
- **Streaming Response (SSE):**
```
data: {"type": "context", "matchedFaqs": ["faq-screen-transitions", "faq-dopamine-crashes"]}
data: {"type": "token", "content": "First, take a deep breath. What you just witnessed was not a character failure—it was a neurochemical dopamine crash..."}
data: {"type": "token", "content": " Wait 10 minutes before knocking. Then use this script: 'Leo, I know shutting down in the middle of a match felt awful...'"}
data: {"type": "done", "conversationId": "conv-123"}
```

### 6.2 Search Modern Parenting FAQ Vault
- **Endpoint:** `GET /api/v1/faqs?q=calculator+vault&tier=TIER_2_AGES_10_11`
- **Response (200 OK):** Matching pediatric and psychologist-reviewed answers with de-escalation conversation scripts.

---

## 7. Bilateral Family Pact & Agreement Engine (`/api/v1/agreements`)

### 7.1 Get Agreement Presets
- **Endpoint:** `GET /api/v1/agreements/presets?tier=TIER_3_AGES_12_13&roadType=ACTIVE_DEVICE`
- **Response (200 OK):** Curated clauses categorized by `SCREEN_TIME`, `DEVICE_CURFEW`, `PRIVACY_SAFETY`, `PURCHASES_CHATS`, `PARENT_COMMITMENT`.

### 7.2 Create / Save Agreement
- **Endpoint:** `POST /api/v1/agreements`
- **Request Body:**
```json
{
  "childId": "f47ac10b-...",
  "title": "Leo & Sarah's Family Tech Treaty",
  "developmentalTier": "TIER_3_AGES_12_13",
  "roadType": "ACTIVE_DEVICE",
  "clauses": [
    {
      "category": "DEVICE_CURFEW",
      "party": "CHILD",
      "title": "8:30 PM Bedtime Docking",
      "description": "Phone docks in the kitchen charging basket every night at 8:30 PM sharp."
    },
    {
      "category": "PARENT_COMMITMENT",
      "party": "PARENT",
      "title": "No Snooping Safe Harbor",
      "description": "Parents will not read private text messages unless there is a physical safety emergency."
    }
  ],
  "parentSignature": "data:image/png;base64,...",
  "childSignature": "data:image/png;base64,..."
}
```

### 7.3 Export Refrigerator-Ready PDF
- **Endpoint:** `GET /api/v1/agreements/:id/export-pdf`
- **Response (200 OK):** `application/pdf` stream.

---

## 8. "Pact-as-Code" Device Profiles & Enrollment (`/api/v1/device-profiles`, `/api/v1/devices`)

### 8.1 Compile Agreement into Signed Device Profile
- **Endpoint:** `POST /api/v1/agreements/:id/compile-profile`
- **Request Body:**
```json
{
  "platform": "APPLE_IOS",
  "bedtimeCurfewTime": "20:30"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "profile": {
      "id": "prof-554",
      "status": "PENDING_ENROLLMENT",
      "enrollmentToken": "tok_991823746",
      "enrollmentQrCodeUrl": "https://api.alongside.care/api/v1/devices/qr/tok_991823746",
      "otaEnrollmentUrl": "https://api.alongside.care/api/v1/devices/enroll/tok_991823746",
      "bedtimeCurfewTime": "20:30"
    }
  }
}
```

### 8.2 OTA Apple Profile Delivery
- **Endpoint:** `GET /api/v1/devices/enroll/:token`
- **Response (200 OK):** Delivers cryptographically signed PKCS#7 Apple `.mobileconfig` with header:
  `Content-Type: application/x-apple-aspen-config; charset=utf-8`

---

## 9. Youth Culture Digest & Exploit Alerts (`/api/v1/digest`)

### 9.1 Latest Sunday Digest
- **Endpoint:** `GET /api/v1/digest/latest`
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "digest": {
      "issueNumber": 42,
      "title": "Decoding 'Crashout' & The Calculator Vault Bypass",
      "conversationStarter": "Ask your tween what the funniest meme they saw this week was and why it made them laugh.",
      "slangTerms": [
        { "term": "Crashout", "definition": "Explosive, irrational overreaction to a minor frustration", "contextTone": "Playful or venting" }
      ],
      "exploitAlerts": [
        { "appName": "Calculator+", "exploitDescription": "Disguised photo vault behind a working calculator", "severity": "HIGH", "parentRemedy": "Check Settings > iPhone Storage for duplicate calculator apps." }
      ]
    }
  }
}
```

---

## 10. Billing & Subscriptions (`/api/v1/billing`)

### 10.1 Create Checkout Session
- **Endpoint:** `POST /api/v1/billing/checkout-session`
- **Request Body:**
```json
{
  "tier": "ANNUAL_HERO", // or "MONTHLY_FLEX"
  "successUrl": "https://alongside.care/dashboard?session_id={CHECKOUT_SESSION_ID}",
  "cancelUrl": "https://alongside.care/dashboard"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "checkoutUrl": "https://checkout.stripe.com/c/pay/cs_live_..."
  }
}
```

---

## 11. Developmental Milestones & Growth (`/api/v1/milestones`)

### 11.1 List Milestones by Tier & Category
- **Endpoint:** `GET /api/v1/milestones`
- **Query Parameters:**
  * `tier`: e.g. `TIER_0_INFANCY_TODDLER_0_3`
  * `category`: `GROSS_MOTOR` | `FINE_MOTOR` | `SPEECH_LANGUAGE` | `COGNITIVE` | `SOCIAL_EMOTIONAL`
  * `ageMonths`: optional integer filter (e.g. `14`)
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "milestones": [
      {
        "id": "ms-014-walk",
        "targetTier": "TIER_0_INFANCY_TODDLER_0_3",
        "targetAgeMonths": 14,
        "category": "GROSS_MOTOR",
        "title": "Independent Walking & Cruising",
        "description": "Pulls up to stand, cruises along furniture, and takes first independent steps.",
        "signsToWatch": "Normal walking window extends from 9 to 18 months; asymmetric limping requires review.",
        "clinicalAuthority": "CDC / AAP Bright Futures"
      },
      {
        "id": "ms-014-words",
        "targetTier": "TIER_0_INFANCY_TODDLER_0_3",
        "targetAgeMonths": 14,
        "category": "SPEECH_LANGUAGE",
        "title": "First Meaningful Words & Babble Turn-Taking",
        "description": "Uses 2 to 6 consistent words ('mama', 'dada', 'ball') with intentional pointing.",
        "signsToWatch": "Receptive understanding precedes speech; responds consistently to own name.",
        "clinicalAuthority": "CDC / AAP Bright Futures"
      }
    ]
  }
}
```

### 11.2 Track Child Milestone Progress
- **Endpoint:** `POST /api/v1/children/:childId/milestones`
- **Request Body:**
```json
{
  "milestoneId": "ms-014-walk",
  "status": "ACHIEVED", // "NOT_STARTED" | "IN_PROGRESS" | "ACHIEVED"
  "parentNotes": "Took 4 independent steps from the couch to mommy!"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "childMilestone": {
      "childId": "f47ac10b-...",
      "milestoneId": "ms-014-walk",
      "status": "ACHIEVED",
      "achievedAt": "2026-11-04T10:00:00.000Z",
      "parentNotes": "Took 4 independent steps from the couch to mommy!"
    }
  }
}
```

---

## 12. Pediatric Health & Symptom Triage (`/api/v1/health`)

### 12.1 Symptom Triage Assessment
- **Endpoint:** `POST /api/v1/health/triage`
- **Request Body:**
```json
{
  "childId": "f47ac10b-...",
  "temperatureF": 101.5,
  "temperatureMethod": "RECTAL", // "RECTAL" | "AXILLARY" | "ORAL" | "TYMPANIC"
  "symptoms": ["fever", "ear_pulling"],
  "durationHours": 18,
  "behaviorNotes": "Fussy, drinking milk well, no vomiting"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "triageResult": {
      "zone": "YELLOW",
      "requiresEmergency911": false,
      "conditionSuspected": "Suspected Acute Otitis Media / Teething",
      "clinicalRationale": "Fever 101.5°F in a 14mo child is a normal immune response. Unilateral ear pulling during swallowing suggests middle ear effusion.",
      "immediateActions": [
        "Schedule pediatrician evaluation within 24 hours for otoscopic ear exam.",
        "Administer weight-based acetaminophen if uncomfortable."
      ],
      "homeCareMeasures": [
        "Offer frequent small fluids to maintain hydration.",
        "Keep child in comfortable, breathable clothing."
      ],
      "redFlagWarnings": [
        "If child develops stridor, chest retractions, or unresponsiveness, call 911 immediately."
      ],
      "recommendedDosing": {
        "medication": "ACETAMINOPHEN",
        "dosageMg": 160,
        "frequency": "Every 4 to 6 hours as needed (max 5 doses in 24h)"
      },
      "clinicalAuthority": "Barton Schmitt Pediatric Telephone Protocols / AAP"
    }
  }
}
```

### 12.2 Symptom Protocols Library
- **Endpoint:** `GET /api/v1/health/protocols`
- **Response (200 OK):** Returns canonical protocols (Fever, Croup, RSV/Bronchiolitis, Ear Infection, HFMD, Stomach Bug, Rashes) with zone criteria and contraindications.

### 12.3 Child Health Logs
- **Endpoint:** `GET /api/v1/children/:childId/health-logs`
- **Response (200 OK):** Historical health logs with exportable Pediatrician Visit Summary.

---

## 13. Pediatric Nutrition & Allergens (`/api/v1/nutrition`)

### 13.1 Nutrition Guidance by Stage
- **Endpoint:** `GET /api/v1/nutrition/guides`
- **Query Parameter:** `stage`: `MILK_ONLY` | `SOLIDS_INTRODUCED` | `TODDLER_TABLE` | `BALANCED_SCHOOL` | `PUBERTAL_GROWTH`
- **Response (200 OK):** Returns feeding guidelines, safe finger food sizing (BLW spears), and division of responsibility rules.

### 13.2 Safe Allergen Introduction Schedule
- **Endpoint:** `GET /api/v1/nutrition/allergens`
- **Query Parameter:** `childAgeMonths`: `7`
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "schedule": [
      {
        "allergen": "Peanut",
        "recommendedFormat": "Smooth peanut butter thinned with warm water or breastmilk (2 tsp)",
        "frequency": "2-3 times per week to maintain immunological tolerance",
        "safetyWarning": "Never offer whole peanuts or thick sticky spoonfuls (choking hazard)."
      },
      {
        "allergen": "Egg",
        "recommendedFormat": "Well-cooked scrambled egg or baked egg muffin",
        "frequency": "Twice weekly"
      }
    ]
  }
}
```

---

## 14. Brain Games, Sensory Play & Early Toys (`/api/v1/brain-games`)

### 14.1 Daily Purposeful Play Recommendation
- **Endpoint:** `GET /api/v1/brain-games/daily`
- **Query Parameter:** `childId`: `f47ac10b-...`
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "activity": {
      "id": "play-puppet-01",
      "targetTier": "TIER_0_INFANCY_TODDLER_0_3",
      "category": "PUPPET",
      "title": "Animal Puppet Vocal Mirroring & Peek-a-Boo",
      "summary": "Face-to-face vocal turn-taking using a soft animal puppet to stimulate mirror neurons and reciprocal dialogue.",
      "instructions": "Place puppet on hand. Make animal sounds ('Woof! Baa!') while maintaining eye contact. Pause for 5 seconds to invite your child to respond.",
      "materialsNeeded": ["Soft animal hand puppet or sock"],
      "targetSkills": ["Vocal Turn-Taking", "Theory of Mind Bedrock", "Social Smiling"],
      "estimatedMinutes": 10,
      "isScreenFree": true
    }
  }
}
```

### 14.2 Play Catalog
- **Endpoint:** `GET /api/v1/brain-games`
- **Query Parameters:** `tier`, `category` (`PUPPET`, `SENSORY`, `CONSTRUCTION`, `LOGIC_PUZZLE`, `MAKER`, `BOREDOM_BUSTER`)
- **Response (200 OK):** Array of curated, screen-free developmental play activities.

---

## 15. Behavioral Psychology & De-escalation (`/api/v1/behavior`)

### 15.1 Behavioral Translation Guides
- **Endpoint:** `GET /api/v1/behavior/guides`
- **Query Parameter:** `tier`: e.g. `TIER_0_INFANCY_TODDLER_0_3`
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "guides": [
      {
        "id": "beh-tantrum-01",
        "targetTier": "TIER_0_INFANCY_TODDLER_0_3",
        "slug": "toddler-grocery-meltdown",
        "triggerSituation": "Toddler screaming and throwing body on floor when denied candy at checkout.",
        "underlyingNeed": "Nervous system sensory overload + immature prefrontal cortex unable to modulate disappointment.",
        "coRegulationScript": "I know you wanted those treats. It is hard to hear no. I am right here with you.",
        "authoritativeLimit": "Hold the boundary calmly without buying the candy or yelling. Stay close until the storm passes ('Time-In')."
      }
    ]
  }
}
```
