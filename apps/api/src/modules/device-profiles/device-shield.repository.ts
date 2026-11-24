import { randomUUID } from 'node:crypto';
import { prisma as defaultPrisma, type PrismaClient } from '@alongside/database';
import {
  DevicePlatform,
  type DnsProviderType,
  type ShieldBlockableService,
  type ShieldPlatform,
} from '@alongside/shared';

export interface DeviceShieldRecord {
  id: string;
  childId: string;
  platform: ShieldPlatform;
  providerType: DnsProviderType;
  providerProfileId: string | null;
  enrollmentToken: string;
  blockAdultContent: boolean;
  safeSearch: boolean;
  youtubeRestrictedMode: boolean;
  blockBypass: boolean;
  blockedServices: ShieldBlockableService[];
  bedtimeServices: ShieldBlockableService[];
  bedtimeEnabled: boolean;
  bedtimeStart: string;
  bedtimeEnd: string;
  timezone: string;
  lastSyncedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  child?: {
    id: string;
    userId: string;
    name: string;
  };
}

export interface UpsertDeviceShieldRecordData {
  childId: string;
  platform: ShieldPlatform;
  providerType: DnsProviderType;
  providerProfileId: string | null;
  blockAdultContent: boolean;
  safeSearch: boolean;
  youtubeRestrictedMode: boolean;
  blockBypass: boolean;
  blockedServices: ShieldBlockableService[];
  bedtimeServices: ShieldBlockableService[];
  bedtimeEnabled: boolean;
  bedtimeStart: string;
  bedtimeEnd: string;
  timezone: string;
  lastSyncedAt: Date | null;
}

export interface DeviceShieldRepository {
  findByChildId(childId: string): Promise<DeviceShieldRecord | null>;
  findByEnrollmentToken(token: string): Promise<DeviceShieldRecord | null>;
  upsertByChildId(data: UpsertDeviceShieldRecordData): Promise<DeviceShieldRecord>;
  deleteByChildId(childId: string): Promise<void>;
}

function toPrismaPlatform(platform: ShieldPlatform): DevicePlatform {
  return platform === 'ANDROID'
    ? DevicePlatform.ANDROID_ENTERPRISE
    : DevicePlatform.APPLE_IOS;
}

function fromPrismaPlatform(platform: string): ShieldPlatform {
  return platform === DevicePlatform.ANDROID_ENTERPRISE ? 'ANDROID' : 'APPLE_IOS';
}

function mapPrismaRecord(raw: any): DeviceShieldRecord {
  return {
    id: raw.id,
    childId: raw.childId,
    platform: fromPrismaPlatform(raw.platform),
    providerType: raw.providerType as DnsProviderType,
    providerProfileId: raw.providerProfileId ?? null,
    enrollmentToken: raw.enrollmentToken,
    blockAdultContent: Boolean(raw.blockAdultContent),
    safeSearch: Boolean(raw.safeSearch),
    youtubeRestrictedMode: Boolean(raw.youtubeRestrictedMode),
    blockBypass: Boolean(raw.blockBypass),
    blockedServices: (raw.blockedServices || []) as ShieldBlockableService[],
    bedtimeServices: (raw.bedtimeServices || []) as ShieldBlockableService[],
    bedtimeEnabled: Boolean(raw.bedtimeEnabled),
    bedtimeStart: raw.bedtimeStart || '20:30',
    bedtimeEnd: raw.bedtimeEnd || '06:30',
    timezone: raw.timezone || 'UTC',
    lastSyncedAt: raw.lastSyncedAt ? new Date(raw.lastSyncedAt) : null,
    createdAt: new Date(raw.createdAt),
    updatedAt: new Date(raw.updatedAt),
    child: raw.child
      ? { id: raw.child.id, userId: raw.child.userId, name: raw.child.name }
      : undefined,
  };
}

export class PrismaDeviceShieldRepository implements DeviceShieldRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async findByChildId(childId: string): Promise<DeviceShieldRecord | null> {
    const record = await this.prisma.deviceShieldConfig.findUnique({
      where: { childId },
      include: {
        child: { select: { id: true, userId: true, name: true } },
      },
    });
    return record ? mapPrismaRecord(record) : null;
  }

  async findByEnrollmentToken(token: string): Promise<DeviceShieldRecord | null> {
    const record = await this.prisma.deviceShieldConfig.findUnique({
      where: { enrollmentToken: token },
      include: {
        child: { select: { id: true, userId: true, name: true } },
      },
    });
    return record ? mapPrismaRecord(record) : null;
  }

  async upsertByChildId(
    data: UpsertDeviceShieldRecordData
  ): Promise<DeviceShieldRecord> {
    const prismaPlatform = toPrismaPlatform(data.platform);
    const record = await this.prisma.deviceShieldConfig.upsert({
      where: { childId: data.childId },
      create: {
        childId: data.childId,
        platform: prismaPlatform as any,
        providerType: data.providerType,
        providerProfileId: data.providerProfileId,
        enrollmentToken: randomUUID(),
        blockAdultContent: data.blockAdultContent,
        safeSearch: data.safeSearch,
        youtubeRestrictedMode: data.youtubeRestrictedMode,
        blockBypass: data.blockBypass,
        blockedServices: data.blockedServices,
        bedtimeServices: data.bedtimeServices,
        bedtimeEnabled: data.bedtimeEnabled,
        bedtimeStart: data.bedtimeStart,
        bedtimeEnd: data.bedtimeEnd,
        timezone: data.timezone,
        lastSyncedAt: data.lastSyncedAt,
      },
      update: {
        platform: prismaPlatform as any,
        providerType: data.providerType,
        providerProfileId: data.providerProfileId,
        blockAdultContent: data.blockAdultContent,
        safeSearch: data.safeSearch,
        youtubeRestrictedMode: data.youtubeRestrictedMode,
        blockBypass: data.blockBypass,
        blockedServices: data.blockedServices,
        bedtimeServices: data.bedtimeServices,
        bedtimeEnabled: data.bedtimeEnabled,
        bedtimeStart: data.bedtimeStart,
        bedtimeEnd: data.bedtimeEnd,
        timezone: data.timezone,
        lastSyncedAt: data.lastSyncedAt,
      },
      include: {
        child: { select: { id: true, userId: true, name: true } },
      },
    });
    return mapPrismaRecord(record);
  }

  async deleteByChildId(childId: string): Promise<void> {
    await this.prisma.deviceShieldConfig.deleteMany({ where: { childId } });
  }
}

export class InMemoryDeviceShieldRepository implements DeviceShieldRepository {
  private readonly configs = new Map<string, DeviceShieldRecord>();

  async findByChildId(childId: string): Promise<DeviceShieldRecord | null> {
    const record = this.configs.get(childId);
    return record ? structuredClone(record) : null;
  }

  async findByEnrollmentToken(token: string): Promise<DeviceShieldRecord | null> {
    for (const record of this.configs.values()) {
      if (record.enrollmentToken === token) {
        return structuredClone(record);
      }
    }
    return null;
  }

  async upsertByChildId(
    data: UpsertDeviceShieldRecordData
  ): Promise<DeviceShieldRecord> {
    const existing = this.configs.get(data.childId);
    const now = new Date();
    const record: DeviceShieldRecord = {
      id: existing?.id ?? randomUUID(),
      childId: data.childId,
      platform: data.platform,
      providerType: data.providerType,
      providerProfileId: data.providerProfileId,
      enrollmentToken: existing?.enrollmentToken ?? randomUUID(),
      blockAdultContent: data.blockAdultContent,
      safeSearch: data.safeSearch,
      youtubeRestrictedMode: data.youtubeRestrictedMode,
      blockBypass: data.blockBypass,
      blockedServices: [...data.blockedServices],
      bedtimeServices: [...data.bedtimeServices],
      bedtimeEnabled: data.bedtimeEnabled,
      bedtimeStart: data.bedtimeStart,
      bedtimeEnd: data.bedtimeEnd,
      timezone: data.timezone,
      lastSyncedAt: data.lastSyncedAt,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      child: existing?.child,
    };
    this.configs.set(data.childId, record);
    return structuredClone(record);
  }

  async deleteByChildId(childId: string): Promise<void> {
    this.configs.delete(childId);
  }
}
