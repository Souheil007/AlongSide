# Alongside — Database Models & Prisma Schema Specification
**Author:** Chief Technology Officer (CTO)  
**Status:** Approved for Engineering Implementation  
**Version:** 2.2.0 (The Comprehensive Parent Intelligence & Family Operating System)  
**Target Audience:** Backend Engineer, Database Administrator, Frontend Engineer  

---

## 1. Relational Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    User ||--o{ Child : "has many"
    User ||--o{ Agreement : "owns"
    User ||--o{ QuizAttempt : "takes"
    User ||--o{ AcademyProgress : "completes"
    User ||--o{ AiConversation : "conducts"
    User ||--o1 Subscription : "subscribes to"
    User ||--o{ UserScriptBookmark : "bookmarks"
    
    Child ||--o{ Agreement : "subject of"
    Child ||--o{ DeviceProfile : "governed by"
    Child ||--o{ QuizAttempt : "evaluated by"
    
    Agreement ||--o{ AgreementClause : "contains"
    Agreement ||--o1 DeviceProfile : "compiles into"
    
    Quiz ||--o{ QuizQuestion : "contains"
    QuizQuestion ||--o{ QuizOption : "offers"
    QuizAttempt ||--o{ QuizResponse : "records"
    Quiz ||--o{ QuizAttempt : "attempted in"
    
    AcademyModule ||--o{ AcademyLesson : "contains"
    AcademyLesson ||--o{ AcademyProgress : "tracked by"
    
    AiConversation ||--o{ AiMessage : "contains"
    FaqCategory ||--o{ FaqItem : "categorizes"
    
    CultureDigest ||--o{ SlangTerm : "features"
    CultureDigest ||--o{ ExploitAlert : "alerts on"
```

---

## 2. Canonical Prisma Schema (`packages/database/prisma/schema.prisma`)

The Backend Engineer must implement and apply the following schema using Prisma migrations:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ----------------------------------------------------
// ENUMS
// ----------------------------------------------------

enum Role {
  PARENT
  CO_PARENT
  ADMIN
}

enum SubscriptionTier {
  TRIAL             // 7-day upfront trial
  ANNUAL_HERO       // $79/year (Hero Offer)
  MONTHLY_FLEX      // $9.99/month
  INSTITUTIONAL     // School / PTA / Pediatrician partnership license
}

enum RoadType {
  PRE_DEVICE        // Road 1: No personal smartphone yet (Ages 8–11+)
  ACTIVE_DEVICE     // Road 2: Already owns personal smartphone (Ages 9–14+)
}

enum DevelopmentalTier {
  TIER_1_AGES_8_9   // Early Curiosity & Impulse Centers
  TIER_2_AGES_10_11  // Tween Awakening & Peer Shift
  TIER_3_AGES_12_13  // Pubertal Shift & Circadian Sleep Delay
  TIER_4_AGES_14_PLUS// Teens, Autonomy & Self-Regulation
}

enum AgreementStatus {
  DRAFT
  SIGNED
  DEPLOYED_TO_DEVICE
  ARCHIVED
}

enum ClauseCategory {
  SCREEN_TIME
  DEVICE_CURFEW
  PRIVACY_SAFETY
  PURCHASES_CHATS
  CONTENT_BOUNDARIES
  PARENT_COMMITMENT
}

enum CommitmentParty {
  CHILD
  PARENT
}

enum DeviceProfileStatus {
  PENDING_ENROLLMENT
  ACTIVE
  REVOKED
  EXPIRED
}

enum DevicePlatform {
  APPLE_IOS
  ANDROID_ENTERPRISE
}

enum QuizType {
  CULTURAL_FLUENCY_TWEEN    // "Do You Speak Tween?" Slang Quiz
  PARENTING_STYLE_CONFLICT  // Parenting Style & Conflict Profiler
  FIRST_PHONE_READINESS     // 10-dimension Readiness Assessment (Score 0–100)
  HOUSEHOLD_SCREEN_AUDIT    // Tech Health & Evening Sleep Friction Audit
  JOINT_DISCOVERY_BRIDGE    // Joint Parent-Child Values Quiz
}

enum MessageRole {
  USER
  ASSISTANT
  SYSTEM
}

enum ExploitSeverity {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

// ----------------------------------------------------
// USER & SUBSCRIPTION MODELS
// ----------------------------------------------------

model User {
  id                String             @id @default(uuid())
  email             String             @unique
  passwordHash      String
  fullName          String
  role              Role               @default(PARENT)
  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt

  children          Child[]
  agreements        Agreement[]
  quizAttempts      QuizAttempt[]
  academyProgress   AcademyProgress[]
  aiConversations   AiConversation[]
  subscription      Subscription?
  scriptBookmarks   UserScriptBookmark[]

  @@map("users")
}

model Subscription {
  id                     String           @id @default(uuid())
  userId                 String           @unique
  user                   User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  tier                   SubscriptionTier @default(TRIAL)
  isActive               Boolean          @default(true)
  trialEndsAt            DateTime?
  currentPeriodEnd       DateTime?
  stripeCustomerId       String?          @unique
  stripeSubscriptionId   String?          @unique
  createdAt              DateTime         @default(now())
  updatedAt              DateTime         @updatedAt

  @@map("subscriptions")
}

// ----------------------------------------------------
// CHILD & DEVICE MODELS
// ----------------------------------------------------

model Child {
  id                String            @id @default(uuid())
  userId            String
  user              User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  name              String
  birthYear         Int
  birthMonth        Int
  roadType          RoadType          @default(PRE_DEVICE)
  developmentalTier DevelopmentalTier
  schoolGrade       String?
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt

  agreements        Agreement[]
  deviceProfiles    DeviceProfile[]
  quizAttempts      QuizAttempt[]

  @@index([userId])
  @@map("children")
}

model DeviceProfile {
  id                String              @id @default(uuid())
  childId           String
  child             Child               @relation(fields: [childId], references: [id], onDelete: Cascade)
  agreementId       String?             @unique
  agreement         Agreement?          @relation(fields: [agreementId], references: [id], onDelete: SetNull)
  platform          DevicePlatform      @default(APPLE_IOS)
  status            DeviceProfileStatus @default(PENDING_ENROLLMENT)
  enrollmentToken   String              @unique @default(uuid())
  bedtimeCurfewTime String              @default("20:30") // 8:30 PM default
  isLockdownActive  Boolean             @default(false)
  tamperDetected    Boolean             @default(false)
  enrolledAt        DateTime?
  lastHeartbeatAt   DateTime?
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt

  @@index([childId])
  @@index([enrollmentToken])
  @@map("device_profiles")
}

// ----------------------------------------------------
// BILATERAL FAMILY PACT & AGREEMENT MODELS
// ----------------------------------------------------

model Agreement {
  id                 String           @id @default(uuid())
  userId             String
  user               User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  childId            String
  child              Child            @relation(fields: [childId], references: [id], onDelete: Cascade)
  title              String
  status             AgreementStatus  @default(DRAFT)
  developmentalTier  DevelopmentalTier
  roadType           RoadType         @default(ACTIVE_DEVICE)
  parentSignature    String?
  childSignature     String?
  signedAt           DateTime?
  pdfExportUrl       String?
  createdAt          DateTime         @default(now())
  updatedAt          DateTime         @updatedAt

  clauses            AgreementClause[]
  deviceProfile      DeviceProfile?

  @@index([userId])
  @@index([childId])
  @@map("agreements")
}

model AgreementClause {
  id                 String          @id @default(uuid())
  agreementId        String
  agreement          Agreement       @relation(fields: [agreementId], references: [id], onDelete: Cascade)
  category           ClauseCategory
  party              CommitmentParty
  title              String
  description        String
  isStandard         Boolean         @default(true)
  isCustom           Boolean         @default(false)
  sortOrder          Int             @default(0)
  createdAt          DateTime        @default(now())
  updatedAt          DateTime        @updatedAt

  @@index([agreementId])
  @@map("agreement_clauses")
}

// ----------------------------------------------------
// INTERACTIVE QUIZZES & ASSESSMENTS
// ----------------------------------------------------

model Quiz {
  id                 String         @id @default(uuid())
  type               QuizType       @unique
  title              String
  description        String
  estimatedMinutes   Int            @default(3)
  createdAt          DateTime       @default(now())
  updatedAt          DateTime       @updatedAt

  questions          QuizQuestion[]
  attempts           QuizAttempt[]

  @@map("quizzes")
}

model QuizQuestion {
  id                 String         @id @default(uuid())
  quizId             String
  quiz               Quiz           @relation(fields: [quizId], references: [id], onDelete: Cascade)
  questionText       String
  explanation        String?
  dimensionKey       String?        // e.g. "executive_function", "social_awareness"
  sortOrder          Int            @default(0)
  createdAt          DateTime       @default(now())
  updatedAt          DateTime       @updatedAt

  options            QuizOption[]
  responses          QuizResponse[]

  @@index([quizId])
  @@map("quiz_questions")
}

model QuizOption {
  id                 String         @id @default(uuid())
  questionId         String
  question           QuizQuestion   @relation(fields: [questionId], references: [id], onDelete: Cascade)
  optionText         String
  scoreWeight        Int            @default(0)
  isCorrect          Boolean        @default(false)
  feedbackText       String?
  sortOrder          Int            @default(0)

  responses          QuizResponse[]

  @@index([questionId])
  @@map("quiz_options")
}

model QuizAttempt {
  id                 String         @id @default(uuid())
  quizId             String
  quiz               Quiz           @relation(fields: [quizId], references: [id], onDelete: Cascade)
  userId             String
  user               User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  childId            String?
  child              Child?         @relation(fields: [childId], references: [id], onDelete: SetNull)
  overallScore       Int            @default(0) // 0-100 score
  dimensionScores    Json?          // { "executive_function": 85, "online_safety": 70 }
  completedAt        DateTime       @default(now())

  responses          QuizResponse[]

  @@index([userId])
  @@index([childId])
  @@map("quiz_attempts")
}

model QuizResponse {
  id                 String         @id @default(uuid())
  attemptId          String
  attempt            QuizAttempt    @relation(fields: [attemptId], references: [id], onDelete: Cascade)
  questionId         String
  question           QuizQuestion   @relation(fields: [questionId], references: [id], onDelete: Cascade)
  selectedOptionId   String
  selectedOption     QuizOption     @relation(fields: [selectedOptionId], references: [id], onDelete: Cascade)

  @@index([attemptId])
  @@map("quiz_responses")
}

// ----------------------------------------------------
// PARENT INTELLIGENCE ACADEMY
// ----------------------------------------------------

model AcademyModule {
  id                 String             @id @default(uuid())
  developmentalTier  DevelopmentalTier
  slug               String             @unique
  title              String
  summary            String
  coverImageUrl      String?
  sortOrder          Int                @default(0)
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt

  lessons            AcademyLesson[]

  @@map("academy_modules")
}

model AcademyLesson {
  id                 String             @id @default(uuid())
  moduleId           String
  module             AcademyModule      @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  slug               String
  title              String
  contentMarkdown    String
  readingMinutes     Int                @default(4)
  sortOrder          Int                @default(0)
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt

  progressRecords    AcademyProgress[]

  @@unique([moduleId, slug])
  @@map("academy_lessons")
}

model AcademyProgress {
  id                 String             @id @default(uuid())
  userId             String
  user               User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  lessonId           String
  lesson             AcademyLesson      @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  isCompleted        Boolean            @default(true)
  completedAt        DateTime           @default(now())

  @@unique([userId, lessonId])
  @@map("academy_progress")
}

// ----------------------------------------------------
// 24/7 AI ADVISOR & FAQ VAULT
// ----------------------------------------------------

model AiConversation {
  id                 String             @id @default(uuid())
  userId             String
  user               User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  childId            String?
  title              String             @default("Parenting Discussion")
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt

  messages           AiMessage[]

  @@index([userId])
  @@map("ai_conversations")
}

model AiMessage {
  id                 String             @id @default(uuid())
  conversationId     String
  conversation       AiConversation     @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  role               MessageRole
  content            String
  matchedFaqIds      String[]           @default([])
  tokensUsed         Int                @default(0)
  createdAt          DateTime           @default(now())

  @@index([conversationId])
  @@map("ai_messages")
}

model FaqCategory {
  id                 String             @id @default(uuid())
  slug               String             @unique
  name               String
  description        String
  sortOrder          Int                @default(0)

  faqs               FaqItem[]

  @@map("faq_categories")
}

model FaqItem {
  id                 String             @id @default(uuid())
  categoryId         String
  category           FaqCategory        @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  targetTier         DevelopmentalTier?
  targetRoad         RoadType?
  question           String
  answerMarkdown     String
  deEscalationScript String?
  isFeatured         Boolean            @default(false)
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt

  @@index([categoryId])
  @@map("faq_items")
}

// ----------------------------------------------------
// YOUTH CULTURE DIGEST & PLATFORM DECODERS
// ----------------------------------------------------

model CultureDigest {
  id                 String             @id @default(uuid())
  issueNumber        Int                @unique
  publishDate        DateTime           @default(now())
  title              String
  summary            String
  conversationStarter String            // Sunday dinner question
  createdAt          DateTime           @default(now())

  slangTerms         SlangTerm[]
  exploitAlerts      ExploitAlert[]

  @@map("culture_digests")
}

model SlangTerm {
  id                 String             @id @default(uuid())
  digestId           String?
  digest             CultureDigest?     @relation(fields: [digestId], references: [id], onDelete: SetNull)
  term               String             @unique
  definition         String
  exampleSentence    String
  contextTone        String             // e.g. "Harmless play", "Sarcastic", "Toxic flag"
  createdAt          DateTime           @default(now())

  @@map("slang_terms")
}

model ExploitAlert {
  id                 String             @id @default(uuid())
  digestId           String?
  digest             CultureDigest?     @relation(fields: [digestId], references: [id], onDelete: SetNull)
  appName            String
  exploitDescription String
  howKidsBypass      String
  parentRemedy       String
  severity           ExploitSeverity    @default(MEDIUM)
  createdAt          DateTime           @default(now())

  @@map("exploit_alerts")
}

model UserScriptBookmark {
  id                 String             @id @default(uuid())
  userId             String
  user               User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  scriptId           String
  createdAt          DateTime           @default(now())

  @@unique([userId, scriptId])
  @@map("user_script_bookmarks")
}
```
