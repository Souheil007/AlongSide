-- AlterEnum
ALTER TYPE "DevelopmentalTier" ADD VALUE IF NOT EXISTS 'TIER_0A_INFANCY_0_1';
ALTER TYPE "DevelopmentalTier" ADD VALUE IF NOT EXISTS 'TIER_0B_TODDLER_1_2';
ALTER TYPE "DevelopmentalTier" ADD VALUE IF NOT EXISTS 'TIER_0C_OLDER_TODDLER_2_3';

-- AlterTable
ALTER TABLE "academy_modules" ADD COLUMN IF NOT EXISTS "reliefSubtitle" TEXT;
ALTER TABLE "academy_modules" ADD COLUMN IF NOT EXISTS "tonightQuickWinTitle" TEXT;

-- AlterTable
ALTER TABLE "academy_lessons" ADD COLUMN IF NOT EXISTS "audioUrl" TEXT;
ALTER TABLE "academy_lessons" ADD COLUMN IF NOT EXISTS "audioDurationSeconds" INTEGER;
ALTER TABLE "academy_lessons" ADD COLUMN IF NOT EXISTS "whatNotToSay" TEXT;
ALTER TABLE "academy_lessons" ADD COLUMN IF NOT EXISTS "deliveryTip" TEXT;

-- Data Migration: Update existing children records where developmentalTier = 'TIER_0_INFANCY_TODDLER_0_3'
UPDATE "children"
SET "developmentalTier" = CASE
  WHEN (EXTRACT(YEAR FROM CURRENT_DATE) - "birthYear" - CASE WHEN EXTRACT(MONTH FROM CURRENT_DATE) < "birthMonth" THEN 1 ELSE 0 END) <= 1 THEN 'TIER_0A_INFANCY_0_1'::"DevelopmentalTier"
  WHEN (EXTRACT(YEAR FROM CURRENT_DATE) - "birthYear" - CASE WHEN EXTRACT(MONTH FROM CURRENT_DATE) < "birthMonth" THEN 1 ELSE 0 END) = 2 THEN 'TIER_0B_TODDLER_1_2'::"DevelopmentalTier"
  ELSE 'TIER_0C_OLDER_TODDLER_2_3'::"DevelopmentalTier"
END
WHERE "developmentalTier" = 'TIER_0_INFANCY_TODDLER_0_3';
