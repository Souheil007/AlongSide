# Alongside — REST API Specification
**Author:** Chief Technology Officer (CTO)  
**Status:** Approved for Engineering Implementation  
**Version:** 2.2.0 (The Comprehensive Parent Intelligence & Family Operating System)  
**Target Audience:** Frontend Engineer, Backend Engineer, QA  

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

## 3. Children & Contextual Road Fork (`/api/v1/children`)

### 3.1 Create Child Profile
- **Endpoint:** `POST /api/v1/children`
- **Request Body:**
```json
{
  "name": "Leo",
  "birthYear": 2014,
  "birthMonth": 6,
  "roadType": "ACTIVE_DEVICE",
  "schoolGrade": "5th Grade"
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
      "birthYear": 2014,
      "birthMonth": 6,
      "age": 12,
      "roadType": "ACTIVE_DEVICE",
      "developmentalTier": "TIER_3_AGES_12_13",
      "schoolGrade": "5th Grade"
    }
  }
}
```

### 3.2 List Children
- **Endpoint:** `GET /api/v1/children`
- **Response (200 OK):** Array of `ChildDTO` objects with their active device profile status and latest assessment scores.

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
