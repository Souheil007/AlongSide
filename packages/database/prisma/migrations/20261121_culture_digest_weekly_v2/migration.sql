-- Additive Migration: Culture & Trends Weekly Hub v2 (PLAN-49)
-- Adds weekly window metadata to culture_digests and introduces normalized
-- multi-tier weekly blogs, embeddable YouTube videos, Sunday dinner prompts,
-- optional 7-18 weekly phrases, and user read/saved interactions.

-- CreateEnum: DigestIssueStatus
DO $$ BEGIN
    CREATE TYPE "DigestIssueStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- CreateEnum: DigestContentStatus
DO $$ BEGIN
    CREATE TYPE "DigestContentStatus" AS ENUM ('PENDING_REVIEW', 'APPROVED', 'REJECTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- CreateEnum: DigestItemType
DO $$ BEGIN
    CREATE TYPE "DigestItemType" AS ENUM ('ARTICLE', 'VIDEO', 'DINNER_PROMPT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- AlterTable: culture_digests (strictly additive)
ALTER TABLE "culture_digests"
  ADD COLUMN IF NOT EXISTS "weekStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN IF NOT EXISTS "weekEnd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN IF NOT EXISTS "status" "DigestIssueStatus" NOT NULL DEFAULT 'PUBLISHED',
  ADD COLUMN IF NOT EXISTS "curatedAt" TIMESTAMP(3);

-- CreateTable: digest_articles
CREATE TABLE IF NOT EXISTS "digest_articles" (
    "id" TEXT NOT NULL,
    "digestId" TEXT NOT NULL,
    "canonicalHash" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "sourceName" TEXT NOT NULL,
    "sourceDomain" TEXT NOT NULL,
    "authorName" TEXT,
    "imageUrl" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "isOriginalEditorial" BOOLEAN NOT NULL DEFAULT false,
    "topicLabel" TEXT NOT NULL,
    "readMinutes" INTEGER NOT NULL DEFAULT 3,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "keyShift" TEXT NOT NULL,
    "perspectiveNote" TEXT,
    "contentMarkdown" TEXT,
    "sourcesText" TEXT,
    "targetTiers" "DevelopmentalTier"[] NOT NULL DEFAULT ARRAY[]::"DevelopmentalTier"[],
    "isLead" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "ingestionStatus" "DigestContentStatus" NOT NULL DEFAULT 'APPROVED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "digest_articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable: digest_videos
CREATE TABLE IF NOT EXISTS "digest_videos" (
    "id" TEXT NOT NULL,
    "digestId" TEXT NOT NULL,
    "youtubeVideoId" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "presenter" TEXT NOT NULL,
    "channelName" TEXT NOT NULL,
    "channelId" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "formatLabel" TEXT NOT NULL,
    "takeaway" TEXT NOT NULL,
    "jumpChips" JSONB,
    "skimBullets" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "targetTiers" "DevelopmentalTier"[] NOT NULL DEFAULT ARRAY[]::"DevelopmentalTier"[],
    "isEmbeddable" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "ingestionStatus" "DigestContentStatus" NOT NULL DEFAULT 'APPROVED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "digest_videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable: digest_dinner_prompts
CREATE TABLE IF NOT EXISTS "digest_dinner_prompts" (
    "id" TEXT NOT NULL,
    "digestId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "parentTip" TEXT NOT NULL,
    "followUp" TEXT NOT NULL,
    "targetTiers" "DevelopmentalTier"[] NOT NULL DEFAULT ARRAY[]::"DevelopmentalTier"[],
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "digest_dinner_prompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable: digest_phrases
CREATE TABLE IF NOT EXISTS "digest_phrases" (
    "id" TEXT NOT NULL,
    "digestId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "shortMeaning" TEXT NOT NULL,
    "fullMeaning" TEXT NOT NULL,
    "cringeLevel" INTEGER NOT NULL DEFAULT 2,
    "cringeLabel" TEXT NOT NULL,
    "calmScript" TEXT NOT NULL,
    "targetTiers" "DevelopmentalTier"[] NOT NULL DEFAULT ARRAY[]::"DevelopmentalTier"[],
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "digest_phrases_pkey" PRIMARY KEY ("id")
);

-- CreateTable: user_digest_interactions
CREATE TABLE IF NOT EXISTS "user_digest_interactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "childId" TEXT,
    "itemType" "DigestItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "isSaved" BOOLEAN NOT NULL DEFAULT false,
    "savedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_digest_interactions_pkey" PRIMARY KEY ("id")
);

-- Indexes & Unique Constraints
CREATE UNIQUE INDEX IF NOT EXISTS "digest_articles_digestId_canonicalHash_key"
  ON "digest_articles"("digestId", "canonicalHash");

CREATE INDEX IF NOT EXISTS "digest_articles_digestId_ingestionStatus_sortOrder_idx"
  ON "digest_articles"("digestId", "ingestionStatus", "sortOrder");

CREATE UNIQUE INDEX IF NOT EXISTS "digest_videos_digestId_youtubeVideoId_key"
  ON "digest_videos"("digestId", "youtubeVideoId");

CREATE INDEX IF NOT EXISTS "digest_videos_digestId_ingestionStatus_sortOrder_idx"
  ON "digest_videos"("digestId", "ingestionStatus", "sortOrder");

CREATE INDEX IF NOT EXISTS "digest_dinner_prompts_digestId_sortOrder_idx"
  ON "digest_dinner_prompts"("digestId", "sortOrder");

CREATE INDEX IF NOT EXISTS "digest_phrases_digestId_sortOrder_idx"
  ON "digest_phrases"("digestId", "sortOrder");

CREATE UNIQUE INDEX IF NOT EXISTS "user_digest_interactions_userId_itemType_itemId_key"
  ON "user_digest_interactions"("userId", "itemType", "itemId");

CREATE INDEX IF NOT EXISTS "user_digest_interactions_userId_isSaved_idx"
  ON "user_digest_interactions"("userId", "isSaved");

CREATE INDEX IF NOT EXISTS "user_digest_interactions_userId_itemType_isRead_idx"
  ON "user_digest_interactions"("userId", "itemType", "isRead");

-- Foreign Keys
DO $$ BEGIN
    ALTER TABLE "digest_articles"
      ADD CONSTRAINT "digest_articles_digestId_fkey"
      FOREIGN KEY ("digestId") REFERENCES "culture_digests"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "digest_videos"
      ADD CONSTRAINT "digest_videos_digestId_fkey"
      FOREIGN KEY ("digestId") REFERENCES "culture_digests"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "digest_dinner_prompts"
      ADD CONSTRAINT "digest_dinner_prompts_digestId_fkey"
      FOREIGN KEY ("digestId") REFERENCES "culture_digests"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "digest_phrases"
      ADD CONSTRAINT "digest_phrases_digestId_fkey"
      FOREIGN KEY ("digestId") REFERENCES "culture_digests"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "user_digest_interactions"
      ADD CONSTRAINT "user_digest_interactions_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "users"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
