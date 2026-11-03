import { randomUUID } from 'node:crypto';
import { prisma as defaultPrisma, type PrismaClient } from '@alongside/database';
import {
  type DevicePlatform,
  type DeviceProfileStatus,
} from '@alongside/shared';

export interface DeviceProfileRecord {
  id: string;
  childId: string;
  agreementId: string | null;
  platform: DevicePlatform;
  status: DeviceProfileStatus;
  enrollmentToken: string;
  bedtimeCurfewTime: string;
  isLockdownActive: boolean;
  tamperDetected: boolean;
  enrolledAt: Date | null;
  lastHeartbeatAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  child?: {
    id: string;
    userId: string;
    name: string;
  };
}

export interface CreateDeviceProfileRecordData {
  childId: string;
  agreementId?: string | null;
  platform: DevicePlatform;
  status?: DeviceProfileStatus;
  enrollmentToken?: string;
  bedtimeCurfewTime?: string;
  isLockdownActive?: boolean;
  tamperDetected?: boolean;
}

export interface DeviceProfilesRepository {
  create(data: CreateDeviceProfileRecordData): Promise<DeviceProfileRecord>;
  findByToken(token: string): Promise<DeviceProfileRecord | null>;
  findById(id: string): Promise<DeviceProfileRecord | null>;
  findByAgreementId(agreementId: string): Promise<DeviceProfileRecord | null>;
  findByChildId(childId: string): Promise<DeviceProfileRecord[]>;
  updateStatus(
    id: string,
    status: DeviceProfileStatus,
    enrolledAt?: Date
  ): Promise<DeviceProfileRecord | null>;
  recordHeartbeat(
    token: string,
    tamperDetected?: boolean
  ): Promise<DeviceProfileRecord | null>;
}

export class PrismaDeviceProfilesRepository implements DeviceProfilesRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async create(data: CreateDeviceProfileRecordData): Promise<DeviceProfileRecord> {
    const record = await this.prisma.deviceProfile.create({
      data: {
        childId: data.childId,
        agreementId: data.agreementId,
        platform: data.platform as any,
        status: (data.status as any) || 'PENDING_ENROLLMENT',
        enrollmentToken: data.enrollmentToken || randomUUID(),
        bedtimeCurfewTime: data.bedtimeCurfewTime || '20:30',
        isLockdownActive: data.isLockdownActive ?? false,
        tamperDetected: data.tamperDetected ?? false,
      },
      include: {
        child: {
          select: {
            id: true,
            userId: true,
            name: true,
          },
        },
      },
    });

    return record as unknown as DeviceProfileRecord;
  }

  async findByToken(token: string): Promise<DeviceProfileRecord | null> {
    const record = await this.prisma.deviceProfile.findUnique({
      where: { enrollmentToken: token },
      include: {
        child: {
          select: {
            id: true,
            userId: true,
            name: true,
          },
        },
      },
    });
    return (record as unknown as DeviceProfileRecord) || null;
  }

  async findById(id: string): Promise<DeviceProfileRecord | null> {
    const record = await this.prisma.deviceProfile.findUnique({
      where: { id },
      include: {
        child: {
          select: {
            id: true,
            userId: true,
            name: true,
          },
        },
      },
    });
    return (record as unknown as DeviceProfileRecord) || null;
  }

  async findByAgreementId(agreementId: string): Promise<DeviceProfileRecord | null> {
    const record = await this.prisma.deviceProfile.findUnique({
      where: { agreementId },
      include: {
        child: {
          select: {
            id: true,
            userId: true,
            name: true,
          },
        },
      },
    });
    return (record as unknown as DeviceProfileRecord) || null;
  }

  async findByChildId(childId: string): Promise<DeviceProfileRecord[]> {
    const records = await this.prisma.deviceProfile.findMany({
      where: { childId },
      include: {
        child: {
          select: {
            id: true,
            userId: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return records as unknown as DeviceProfileRecord[];
  }

  async updateStatus(
    id: string,
    status: DeviceProfileStatus,
    enrolledAt?: Date
  ): Promise<DeviceProfileRecord | null> {
    const record = await this.prisma.deviceProfile.update({
      where: { id },
      data: {
        status: status as any,
        enrolledAt: enrolledAt !== undefined ? enrolledAt : undefined,
      },
      include: {
        child: {
          select: {
            id: true,
            userId: true,
            name: true,
          },
        },
      },
    });
    return (record as unknown as DeviceProfileRecord) || null;
  }

  async recordHeartbeat(
    token: string,
    tamperDetected?: boolean
  ): Promise<DeviceProfileRecord | null> {
    const existing = await this.findByToken(token);
    if (!existing) return null;

    const record = await this.prisma.deviceProfile.update({
      where: { enrollmentToken: token },
      data: {
        lastHeartbeatAt: new Date(),
        tamperDetected:
          tamperDetected !== undefined ? tamperDetected : existing.tamperDetected,
        status: 'ACTIVE' as any,
      },
      include: {
        child: {
          select: {
            id: true,
            userId: true,
            name: true,
          },
        },
      },
    });
    return (record as unknown as DeviceProfileRecord) || null;
  }
}

export class InMemoryDeviceProfilesRepository implements DeviceProfilesRepository {
  private readonly profiles = new Map<string, DeviceProfileRecord>();

  async create(data: CreateDeviceProfileRecordData): Promise<DeviceProfileRecord> {
    const id = randomUUID();
    const now = new Date();
    const token = data.enrollmentToken || randomUUID();

    const record: DeviceProfileRecord = {
      id,
      childId: data.childId,
      agreementId: data.agreementId ?? null,
      platform: data.platform,
      status: data.status || 'PENDING_ENROLLMENT',
      enrollmentToken: token,
      bedtimeCurfewTime: data.bedtimeCurfewTime || '20:30',
      isLockdownActive: data.isLockdownActive ?? false,
      tamperDetected: data.tamperDetected ?? false,
      enrolledAt: null,
      lastHeartbeatAt: null,
      createdAt: now,
      updatedAt: now,
    };

    this.profiles.set(id, record);
    return structuredClone(record);
  }

  async findByToken(token: string): Promise<DeviceProfileRecord | null> {
    for (const record of this.profiles.values()) {
      if (record.enrollmentToken === token) {
        return structuredClone(record);
      }
    }
    return null;
  }

  async findById(id: string): Promise<DeviceProfileRecord | null> {
    const record = this.profiles.get(id);
    return record ? structuredClone(record) : null;
  }

  async findByAgreementId(agreementId: string): Promise<DeviceProfileRecord | null> {
    for (const record of this.profiles.values()) {
      if (record.agreementId === agreementId) {
        return structuredClone(record);
      }
    }
    return null;
  }

  async findByChildId(childId: string): Promise<DeviceProfileRecord[]> {
    const list = Array.from(this.profiles.values()).filter(
      (r) => r.childId === childId
    );
    return structuredClone(list);
  }

  async updateStatus(
    id: string,
    status: DeviceProfileStatus,
    enrolledAt?: Date
  ): Promise<DeviceProfileRecord | null> {
    const record = this.profiles.get(id);
    if (!record) return null;

    record.status = status;
    if (enrolledAt !== undefined) {
      record.enrolledAt = enrolledAt;
    }
    record.updatedAt = new Date();
    this.profiles.set(id, record);
    return structuredClone(record);
  }

  async recordHeartbeat(
    token: string,
    tamperDetected?: boolean
  ): Promise<DeviceProfileRecord | null> {
    const existing = await this.findByToken(token);
    if (!existing) return null;

    const record = this.profiles.get(existing.id)!;
    record.lastHeartbeatAt = new Date();
    record.status = 'ACTIVE';
    if (tamperDetected !== undefined) {
      record.tamperDetected = tamperDetected;
    }
    record.updatedAt = new Date();
    this.profiles.set(record.id, record);
    return structuredClone(record);
  }
}
