-- AlterTable
ALTER TABLE "academy_lessons" ADD COLUMN IF NOT EXISTS "reliefTagline" TEXT;
ALTER TABLE "academy_lessons" ADD COLUMN IF NOT EXISTS "thirtySecondGlance" JSONB;
ALTER TABLE "academy_lessons" ADD COLUMN IF NOT EXISTS "adaptiveModuleType" TEXT;
ALTER TABLE "academy_lessons" ADD COLUMN IF NOT EXISTS "dialogueCards" JSONB;
