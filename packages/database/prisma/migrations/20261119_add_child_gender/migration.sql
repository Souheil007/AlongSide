-- CreateEnum
DO $$ BEGIN
    CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- AlterTable
ALTER TABLE "children" ADD COLUMN IF NOT EXISTS "gender" "Gender";
