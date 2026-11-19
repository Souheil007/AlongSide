-- DropForeignKey
ALTER TABLE "child_health_logs" DROP CONSTRAINT IF EXISTS "child_health_logs_childId_fkey";
ALTER TABLE "child_health_logs" DROP CONSTRAINT IF EXISTS "child_health_logs_protocolId_fkey";
ALTER TABLE "user_script_bookmarks" DROP CONSTRAINT IF EXISTS "user_script_bookmarks_userId_fkey";

-- DropTable
DROP TABLE IF EXISTS "child_health_logs";
DROP TABLE IF EXISTS "symptom_protocols";
DROP TABLE IF EXISTS "user_script_bookmarks";

-- DropEnum
DROP TYPE IF EXISTS "TriageZone";

-- AlterTable
ALTER TABLE "milestones" DROP COLUMN IF EXISTS "clinicalAuthority";
