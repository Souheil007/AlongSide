-- Additive Migration: Academy Interactive Almanac v2 (PLAN-46)
-- Adds course-level featuredVideoLecture, lesson episodeRole & almanacPayload,
-- and user playbook persistence fields on academy_progress.

ALTER TABLE "academy_modules"
  ADD COLUMN IF NOT EXISTS "featuredVideoLecture" JSONB;

ALTER TABLE "academy_lessons"
  ADD COLUMN IF NOT EXISTS "episodeRole" TEXT NOT NULL DEFAULT 'FAST_WIN',
  ADD COLUMN IF NOT EXISTS "almanacPayload" JSONB;

ALTER TABLE "academy_progress"
  ADD COLUMN IF NOT EXISTS "chosenMoveId" TEXT,
  ADD COLUMN IF NOT EXISTS "bookmarkedTruth" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "savedPushbackIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
