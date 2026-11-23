-- Additive Migration: Live Network Shield / Dynamic DNS Parental Controls (PLAN-52)
-- Adds child-scoped DNS parental control configurations backed by a swappable
-- DnsPolicyProvider adapter (default: NextDNS REST API v1) with OTA Apple DoH
-- (.mobileconfig) and Android Private DNS (DoT) enrollment metadata.

-- CreateTable: device_shield_configs
CREATE TABLE IF NOT EXISTS "device_shield_configs" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "platform" "DevicePlatform" NOT NULL DEFAULT 'APPLE_IOS',
    "providerType" TEXT NOT NULL DEFAULT 'NEXTDNS',
    "providerProfileId" TEXT,
    "enrollmentToken" TEXT NOT NULL,
    "blockAdultContent" BOOLEAN NOT NULL DEFAULT true,
    "safeSearch" BOOLEAN NOT NULL DEFAULT true,
    "youtubeRestrictedMode" BOOLEAN NOT NULL DEFAULT true,
    "blockBypass" BOOLEAN NOT NULL DEFAULT true,
    "blockedServices" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "bedtimeServices" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "bedtimeEnabled" BOOLEAN NOT NULL DEFAULT true,
    "bedtimeStart" TEXT NOT NULL DEFAULT '20:30',
    "bedtimeEnd" TEXT NOT NULL DEFAULT '06:30',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "device_shield_configs_pkey" PRIMARY KEY ("id")
);

-- Indexes & Unique Constraints
CREATE UNIQUE INDEX IF NOT EXISTS "device_shield_configs_childId_key"
  ON "device_shield_configs"("childId");

CREATE UNIQUE INDEX IF NOT EXISTS "device_shield_configs_enrollmentToken_key"
  ON "device_shield_configs"("enrollmentToken");

CREATE INDEX IF NOT EXISTS "device_shield_configs_enrollmentToken_idx"
  ON "device_shield_configs"("enrollmentToken");

-- Foreign Keys
DO $$ BEGIN
    ALTER TABLE "device_shield_configs"
      ADD CONSTRAINT "device_shield_configs_childId_fkey"
      FOREIGN KEY ("childId") REFERENCES "children"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
