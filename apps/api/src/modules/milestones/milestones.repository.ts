import { randomUUID } from 'node:crypto';
import {
  prisma as defaultPrisma,
  type PrismaClient,
  MILESTONES_SEED_DATA,
} from '@alongside/database';
import type {
  DevelopmentalTier,
  MilestoneCategory,
  MilestoneDTO,
  ChildMilestoneDTO,
  MilestoneStatus,
} from '@alongside/shared';

export interface MilestoneFilterOptions {
  tier?: DevelopmentalTier;
  category?: MilestoneCategory;
  ageMonths?: number;
}

export interface MilestonesRepository {
  findMilestones(filter?: MilestoneFilterOptions): Promise<MilestoneDTO[]>;
  findMilestoneById(id: string): Promise<MilestoneDTO | null>;
  findChildMilestones(childId: string): Promise<ChildMilestoneDTO[]>;
  upsertChildMilestone(data: {
    childId: string;
    milestoneId: string;
    status: MilestoneStatus;
    parentNotes?: string;
    achievedAt?: Date;
  }): Promise<ChildMilestoneDTO>;
}

export class PrismaMilestonesRepository implements MilestonesRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async findMilestones(filter?: MilestoneFilterOptions): Promise<MilestoneDTO[]> {
    const where: any = {};
    if (filter?.tier) where.targetTier = filter.tier;
    if (filter?.category) where.category = filter.category;
    if (filter?.ageMonths !== undefined) where.targetAgeMonths = { lte: filter.ageMonths };

    const records = await this.prisma.milestone.findMany({
      where,
      orderBy: [{ targetAgeMonths: 'asc' }, { sortOrder: 'asc' }],
    });

    return records.map((m) => ({
      id: m.id,
      targetTier: m.targetTier as DevelopmentalTier,
      targetAgeMonths: m.targetAgeMonths,
      category: m.category as MilestoneCategory,
      title: m.title,
      description: m.description,
      signsToWatch: m.signsToWatch,
      clinicalAuthority: m.clinicalAuthority,
      sortOrder: m.sortOrder,
    }));
  }

  async findMilestoneById(id: string): Promise<MilestoneDTO | null> {
    const m = await this.prisma.milestone.findUnique({
      where: { id },
    });
    if (!m) return null;

    return {
      id: m.id,
      targetTier: m.targetTier as DevelopmentalTier,
      targetAgeMonths: m.targetAgeMonths,
      category: m.category as MilestoneCategory,
      title: m.title,
      description: m.description,
      signsToWatch: m.signsToWatch,
      clinicalAuthority: m.clinicalAuthority,
      sortOrder: m.sortOrder,
    };
  }

  async findChildMilestones(childId: string): Promise<ChildMilestoneDTO[]> {
    const records = await this.prisma.childMilestone.findMany({
      where: { childId },
      orderBy: { createdAt: 'desc' },
    });

    return records.map((cm) => ({
      id: cm.id,
      childId: cm.childId,
      milestoneId: cm.milestoneId,
      status: cm.status as MilestoneStatus,
      achievedAt: cm.achievedAt ? cm.achievedAt.toISOString() : null,
      parentNotes: cm.parentNotes,
      createdAt: cm.createdAt.toISOString(),
      updatedAt: cm.updatedAt.toISOString(),
    }));
  }

  async upsertChildMilestone(data: {
    childId: string;
    milestoneId: string;
    status: MilestoneStatus;
    parentNotes?: string;
    achievedAt?: Date;
  }): Promise<ChildMilestoneDTO> {
    const achievedAtDate =
      data.achievedAt ?? (data.status === 'ACHIEVED' ? new Date() : null);

    const record = await this.prisma.childMilestone.upsert({
      where: {
        childId_milestoneId: {
          childId: data.childId,
          milestoneId: data.milestoneId,
        },
      },
      update: {
        status: data.status as any,
        parentNotes: data.parentNotes,
        achievedAt: achievedAtDate,
      },
      create: {
        childId: data.childId,
        milestoneId: data.milestoneId,
        status: data.status as any,
        parentNotes: data.parentNotes,
        achievedAt: achievedAtDate,
      },
    });

    return {
      id: record.id,
      childId: record.childId,
      milestoneId: record.milestoneId,
      status: record.status as MilestoneStatus,
      achievedAt: record.achievedAt ? record.achievedAt.toISOString() : null,
      parentNotes: record.parentNotes,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    };
  }
}

export class InMemoryMilestonesRepository implements MilestonesRepository {
  private milestones: MilestoneDTO[] = [];
  private childMilestones: Map<string, ChildMilestoneDTO[]> = new Map();

  constructor(initialData = MILESTONES_SEED_DATA) {
    this.milestones = initialData.map((item, index) => ({
      id: `ms-${item.targetAgeMonths}-${index + 1}`,
      targetTier: item.targetTier,
      targetAgeMonths: item.targetAgeMonths,
      category: item.category,
      title: item.title,
      description: item.description,
      signsToWatch: item.signsToWatch,
      clinicalAuthority: item.clinicalAuthority,
      sortOrder: item.sortOrder,
    }));
  }

  async findMilestones(filter?: MilestoneFilterOptions): Promise<MilestoneDTO[]> {
    let result = [...this.milestones];

    if (filter?.tier) {
      result = result.filter((m) => m.targetTier === filter.tier);
    }
    if (filter?.category) {
      result = result.filter((m) => m.category === filter.category);
    }
    if (filter?.ageMonths !== undefined) {
      result = result.filter((m) => m.targetAgeMonths <= filter.ageMonths!);
    }

    return result.sort((a, b) => a.targetAgeMonths - b.targetAgeMonths || a.sortOrder - b.sortOrder);
  }

  async findMilestoneById(id: string): Promise<MilestoneDTO | null> {
    return this.milestones.find((m) => m.id === id) ?? null;
  }

  async findChildMilestones(childId: string): Promise<ChildMilestoneDTO[]> {
    return this.childMilestones.get(childId) ?? [];
  }

  async upsertChildMilestone(data: {
    childId: string;
    milestoneId: string;
    status: MilestoneStatus;
    parentNotes?: string;
    achievedAt?: Date;
  }): Promise<ChildMilestoneDTO> {
    const list = this.childMilestones.get(data.childId) ?? [];
    const existingIndex = list.findIndex((cm) => cm.milestoneId === data.milestoneId);

    const achievedAtStr =
      data.achievedAt ? data.achievedAt.toISOString() : data.status === 'ACHIEVED' ? new Date().toISOString() : null;

    const updatedRecord: ChildMilestoneDTO = {
      id: existingIndex >= 0 ? list[existingIndex]!.id : randomUUID(),
      childId: data.childId,
      milestoneId: data.milestoneId,
      status: data.status,
      achievedAt: achievedAtStr,
      parentNotes: data.parentNotes ?? null,
      createdAt: existingIndex >= 0 ? list[existingIndex]!.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      list[existingIndex] = updatedRecord;
    } else {
      list.push(updatedRecord);
    }

    this.childMilestones.set(data.childId, list);
    return updatedRecord;
  }
}
