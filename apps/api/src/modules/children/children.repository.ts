import { randomUUID } from 'node:crypto';
import { prisma as defaultPrisma, type PrismaClient } from '@alongside/database';
import type {
  CreateChildInput,
  DevelopmentalTier,
  DeviceProfileStatus,
  RoadType,
  UpdateChildInput,
} from '@alongside/shared';

export interface ChildRecord {
  id: string;
  userId: string;
  name: string;
  birthYear: number;
  birthMonth: number;
  roadType: RoadType;
  developmentalTier: DevelopmentalTier;
  schoolGrade: string | null;
  createdAt: Date;
  updatedAt: Date;
  deviceProfileStatus?: DeviceProfileStatus | null;
  latestAssessmentScore?: number | null;
  latestAssessment?: ReadinessAttemptRecord | null;
}

export type ChildWithMetaRecord = ChildRecord;

export interface CreateChildRecordData {
  userId: string;
  name: string;
  birthYear: number;
  birthMonth: number;
  roadType: RoadType;
  developmentalTier: DevelopmentalTier;
  schoolGrade?: string | null;
}

export interface UpdateChildRecordData {
  name?: string;
  birthYear?: number;
  birthMonth?: number;
  roadType?: RoadType;
  developmentalTier?: DevelopmentalTier;
  schoolGrade?: string | null;
}

export interface SaveReadinessAttemptData {
  quizId?: string;
  userId: string;
  childId: string;
  overallScore: number;
  dimensionScores: Record<string, number>;
  recommendation?: string;
  recommendedRoadmapPreset?: string;
  responses?: Array<{
    questionId: string;
    selectedOptionId?: string;
  }>;
}

export type SaveReadinessAssessmentData = SaveReadinessAttemptData;

export interface ReadinessAttemptRecord {
  id: string;
  quizId: string;
  userId: string;
  childId: string | null;
  overallScore: number;
  dimensionScores: Record<string, number> | null;
  recommendation?: string;
  recommendedRoadmapPreset?: string;
  completedAt: Date;
}

export type QuizAttemptRecord = ReadinessAttemptRecord;

export interface ChildrenRepository {
  create(
    userId: string,
    data: CreateChildInput & { developmentalTier: DevelopmentalTier }
  ): Promise<ChildRecord>;
  create(data: CreateChildRecordData): Promise<ChildRecord>;

  findByUserId(userId: string): Promise<ChildRecord[]>;
  findAllByUserId(userId: string): Promise<ChildRecord[]>;

  findById(childId: string, userId?: string): Promise<ChildRecord | null>;
  findByUserAndId(userId: string, childId: string): Promise<ChildRecord | null>;

  update(
    childId: string,
    userId: string,
    data: UpdateChildInput & { developmentalTier?: DevelopmentalTier }
  ): Promise<ChildRecord | null>;
  update(
    userId: string,
    childId: string,
    data: UpdateChildRecordData
  ): Promise<ChildRecord | null>;

  delete(childId: string, userId: string): Promise<boolean>;

  saveReadinessAttempt(data: SaveReadinessAttemptData): Promise<ReadinessAttemptRecord>;
  saveReadinessAssessment(data: SaveReadinessAttemptData): Promise<ReadinessAttemptRecord>;

  getLatestReadinessAttempt(
    childId: string,
    userId: string
  ): Promise<ReadinessAttemptRecord | null>;
  findLatestReadinessAttempt(childId: string): Promise<ReadinessAttemptRecord | null>;
}

export class PrismaChildrenRepository implements ChildrenRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async create(
    arg1: string | CreateChildRecordData,
    arg2?: CreateChildInput & { developmentalTier: DevelopmentalTier }
  ): Promise<ChildRecord> {
    let dataToCreate: CreateChildRecordData;
    if (typeof arg1 === 'string' && arg2) {
      dataToCreate = {
        userId: arg1,
        name: arg2.name.trim(),
        birthYear: arg2.birthYear,
        birthMonth: arg2.birthMonth,
        roadType: arg2.roadType,
        developmentalTier: arg2.developmentalTier,
        schoolGrade: arg2.schoolGrade ? arg2.schoolGrade.trim() : null,
      };
    } else {
      dataToCreate = arg1 as CreateChildRecordData;
    }

    const child = await this.prisma.child.create({
      data: {
        userId: dataToCreate.userId,
        name: dataToCreate.name.trim(),
        birthYear: dataToCreate.birthYear,
        birthMonth: dataToCreate.birthMonth,
        roadType: dataToCreate.roadType as any,
        developmentalTier: dataToCreate.developmentalTier as any,
        schoolGrade: dataToCreate.schoolGrade ?? null,
      },
      include: {
        deviceProfiles: {
          select: { status: true },
          orderBy: { updatedAt: 'desc' },
          take: 1,
        },
        quizAttempts: {
          orderBy: { completedAt: 'desc' },
          take: 1,
        },
      },
    });

    return this.mapChild(child);
  }

  async findById(childId: string, userId?: string): Promise<ChildRecord | null> {
    const whereClause: { id: string; userId?: string } = { id: childId };
    if (userId) {
      whereClause.userId = userId;
    }

    const child = await this.prisma.child.findFirst({
      where: whereClause,
      include: {
        deviceProfiles: {
          select: { status: true },
          orderBy: { updatedAt: 'desc' },
          take: 1,
        },
        quizAttempts: {
          orderBy: { completedAt: 'desc' },
          take: 1,
        },
      },
    });

    return child ? this.mapChild(child) : null;
  }

  async findByUserAndId(userId: string, childId: string): Promise<ChildRecord | null> {
    return this.findById(childId, userId);
  }

  async findByUserId(userId: string): Promise<ChildRecord[]> {
    const children = await this.prisma.child.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      include: {
        deviceProfiles: {
          select: { status: true },
          orderBy: { updatedAt: 'desc' },
          take: 1,
        },
        quizAttempts: {
          orderBy: { completedAt: 'desc' },
          take: 1,
        },
      },
    });

    return children.map((c) => this.mapChild(c));
  }

  async findAllByUserId(userId: string): Promise<ChildRecord[]> {
    return this.findByUserId(userId);
  }

  async update(
    arg1: string,
    arg2: string,
    arg3: (UpdateChildInput & { developmentalTier?: DevelopmentalTier }) | UpdateChildRecordData
  ): Promise<ChildRecord | null> {
    // Overload resolution: either (childId, userId, data) or (userId, childId, data)
    let childId = arg1;
    let userId = arg2;

    const existingFirst = await this.prisma.child.findFirst({
      where: { id: childId, userId },
    });

    if (!existingFirst) {
      // Check flipped argument order (userId, childId)
      const flipped = await this.prisma.child.findFirst({
        where: { id: arg2, userId: arg1 },
      });
      if (flipped) {
        childId = arg2;
        userId = arg1;
      } else {
        return null;
      }
    }

    const data = arg3;
    const updated = await this.prisma.child.update({
      where: { id: childId },
      data: {
        ...(data.name !== undefined && { name: data.name.trim() }),
        ...(data.birthYear !== undefined && { birthYear: data.birthYear }),
        ...(data.birthMonth !== undefined && { birthMonth: data.birthMonth }),
        ...(data.roadType !== undefined && { roadType: data.roadType as any }),
        ...(data.developmentalTier !== undefined && {
          developmentalTier: data.developmentalTier as any,
        }),
        ...(data.schoolGrade !== undefined && {
          schoolGrade: data.schoolGrade ? data.schoolGrade.trim() : null,
        }),
      },
      include: {
        deviceProfiles: {
          select: { status: true },
          orderBy: { updatedAt: 'desc' },
          take: 1,
        },
        quizAttempts: {
          orderBy: { completedAt: 'desc' },
          take: 1,
        },
      },
    });

    return this.mapChild(updated);
  }

  async delete(arg1: string, arg2: string): Promise<boolean> {
    let childId = arg1;
    let userId = arg2;

    let existing = await this.prisma.child.findFirst({
      where: { id: childId, userId },
    });

    if (!existing) {
      // Check flipped argument order (userId, childId)
      const flipped = await this.prisma.child.findFirst({
        where: { id: arg2, userId: arg1 },
      });
      if (flipped) {
        childId = arg2;
        userId = arg1;
        existing = flipped;
      } else {
        return false;
      }
    }

    await this.prisma.child.delete({
      where: { id: childId },
    });

    return true;
  }

  async saveReadinessAttempt(
    data: SaveReadinessAttemptData
  ): Promise<ReadinessAttemptRecord> {
    let quizId = data.quizId;
    if (!quizId) {
      const defaultQuiz = await this.prisma.quiz.upsert({
        where: { type: 'FIRST_PHONE_READINESS' },
        create: {
          type: 'FIRST_PHONE_READINESS',
          title: 'First-Phone Readiness Assessment',
          description: '10-dimension First-Phone Readiness Assessment Evaluation Engine',
          estimatedMinutes: 5,
        },
        update: {},
      });
      quizId = defaultQuiz.id;
    }

    const responses = data.responses ?? [];
    const attempt = await this.prisma.quizAttempt.create({
      data: {
        quizId,
        userId: data.userId,
        childId: data.childId,
        overallScore: data.overallScore,
        dimensionScores: data.dimensionScores as any,
        ...(responses.length > 0 && {
          responses: {
            create: responses.map((r) => ({
              questionId: r.questionId,
              selectedOptionId: r.selectedOptionId || r.questionId,
            })),
          },
        }),
      },
    });

    return {
      id: attempt.id,
      quizId: attempt.quizId,
      userId: attempt.userId,
      childId: attempt.childId,
      overallScore: attempt.overallScore,
      dimensionScores: attempt.dimensionScores as Record<string, number> | null,
      recommendation: data.recommendation,
      recommendedRoadmapPreset: data.recommendedRoadmapPreset,
      completedAt: attempt.completedAt,
    };
  }

  async saveReadinessAssessment(
    data: SaveReadinessAttemptData
  ): Promise<ReadinessAttemptRecord> {
    return this.saveReadinessAttempt(data);
  }

  async getLatestReadinessAttempt(
    childId: string,
    userId: string
  ): Promise<ReadinessAttemptRecord | null> {
    const attempt = await this.prisma.quizAttempt.findFirst({
      where: { childId, userId },
      orderBy: { completedAt: 'desc' },
    });

    if (!attempt) return null;

    return {
      id: attempt.id,
      quizId: attempt.quizId,
      userId: attempt.userId,
      childId: attempt.childId,
      overallScore: attempt.overallScore,
      dimensionScores: attempt.dimensionScores as Record<string, number> | null,
      completedAt: attempt.completedAt,
    };
  }

  async findLatestReadinessAttempt(childId: string): Promise<ReadinessAttemptRecord | null> {
    const attempt = await this.prisma.quizAttempt.findFirst({
      where: { childId },
      orderBy: { completedAt: 'desc' },
    });

    if (!attempt) return null;

    return {
      id: attempt.id,
      quizId: attempt.quizId,
      userId: attempt.userId,
      childId: attempt.childId,
      overallScore: attempt.overallScore,
      dimensionScores: attempt.dimensionScores as Record<string, number> | null,
      completedAt: attempt.completedAt,
    };
  }

  private mapChild(raw: any): ChildRecord {
    const latestProfile = raw.deviceProfiles?.[0];
    const latestAttempt = raw.quizAttempts?.[0];

    return {
      id: raw.id,
      userId: raw.userId,
      name: raw.name,
      birthYear: raw.birthYear,
      birthMonth: raw.birthMonth,
      roadType: raw.roadType as RoadType,
      developmentalTier: raw.developmentalTier as DevelopmentalTier,
      schoolGrade: raw.schoolGrade ?? null,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deviceProfileStatus: (latestProfile?.status as DeviceProfileStatus) ?? null,
      latestAssessmentScore: latestAttempt?.overallScore ?? null,
      latestAssessment: latestAttempt
        ? {
            id: latestAttempt.id,
            quizId: latestAttempt.quizId,
            userId: latestAttempt.userId,
            childId: latestAttempt.childId,
            overallScore: latestAttempt.overallScore,
            dimensionScores:
              (latestAttempt.dimensionScores as Record<string, number>) ?? null,
            completedAt: latestAttempt.completedAt,
          }
        : null,
    };
  }
}

export class InMemoryChildrenRepository implements ChildrenRepository {
  private children: Map<string, ChildRecord> = new Map();
  private deviceStatuses: Map<string, DeviceProfileStatus> = new Map();
  private quizAttempts: Map<string, ReadinessAttemptRecord[]> = new Map();

  async create(
    arg1: string | CreateChildRecordData,
    arg2?: CreateChildInput & { developmentalTier: DevelopmentalTier }
  ): Promise<ChildRecord> {
    let dataToCreate: CreateChildRecordData;
    if (typeof arg1 === 'string' && arg2) {
      dataToCreate = {
        userId: arg1,
        name: arg2.name.trim(),
        birthYear: arg2.birthYear,
        birthMonth: arg2.birthMonth,
        roadType: arg2.roadType,
        developmentalTier: arg2.developmentalTier,
        schoolGrade: arg2.schoolGrade ? arg2.schoolGrade.trim() : null,
      };
    } else {
      dataToCreate = arg1 as CreateChildRecordData;
    }

    const id = randomUUID();
    const now = new Date();
    const record: ChildRecord = {
      id,
      userId: dataToCreate.userId,
      name: dataToCreate.name.trim(),
      birthYear: dataToCreate.birthYear,
      birthMonth: dataToCreate.birthMonth,
      roadType: dataToCreate.roadType,
      developmentalTier: dataToCreate.developmentalTier,
      schoolGrade: dataToCreate.schoolGrade ?? null,
      createdAt: now,
      updatedAt: now,
      deviceProfileStatus: null,
      latestAssessmentScore: null,
      latestAssessment: null,
    };

    this.children.set(id, record);
    return record;
  }

  async findById(childId: string, userId?: string): Promise<ChildRecord | null> {
    const child = this.children.get(childId);
    if (!child) return null;
    if (userId && child.userId !== userId) return null;

    const attempts = this.quizAttempts.get(childId) ?? [];
    const latestAttempt = attempts.length > 0 && attempts[0] ? attempts[0] : null;

    return {
      ...child,
      deviceProfileStatus: this.deviceStatuses.get(childId) ?? null,
      latestAssessmentScore: latestAttempt ? latestAttempt.overallScore : null,
      latestAssessment: latestAttempt,
    };
  }

  async findByUserAndId(userId: string, childId: string): Promise<ChildRecord | null> {
    return this.findById(childId, userId);
  }

  async findByUserId(userId: string): Promise<ChildRecord[]> {
    const result: ChildRecord[] = [];
    for (const child of this.children.values()) {
      if (child.userId === userId) {
        const attempts = this.quizAttempts.get(child.id) ?? [];
        const latestAttempt = attempts.length > 0 && attempts[0] ? attempts[0] : null;

        result.push({
          ...child,
          deviceProfileStatus: this.deviceStatuses.get(child.id) ?? null,
          latestAssessmentScore: latestAttempt ? latestAttempt.overallScore : null,
          latestAssessment: latestAttempt,
        });
      }
    }

    return result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async findAllByUserId(userId: string): Promise<ChildRecord[]> {
    return this.findByUserId(userId);
  }

  async update(
    arg1: string,
    arg2: string,
    arg3: (UpdateChildInput & { developmentalTier?: DevelopmentalTier }) | UpdateChildRecordData
  ): Promise<ChildRecord | null> {
    let childId = arg1;
    let userId = arg2;

    let child = this.children.get(childId);
    if (!child || child.userId !== userId) {
      // Check flipped arguments
      const flipped = this.children.get(arg2);
      if (flipped && flipped.userId === arg1) {
        childId = arg2;
        userId = arg1;
        child = flipped;
      } else {
        return null;
      }
    }

    const data = arg3;
    const updated: ChildRecord = {
      ...child,
      ...(data.name !== undefined && { name: data.name.trim() }),
      ...(data.birthYear !== undefined && { birthYear: data.birthYear }),
      ...(data.birthMonth !== undefined && { birthMonth: data.birthMonth }),
      ...(data.roadType !== undefined && { roadType: data.roadType }),
      ...(data.developmentalTier !== undefined && {
        developmentalTier: data.developmentalTier,
      }),
      ...(data.schoolGrade !== undefined && {
        schoolGrade: data.schoolGrade ? data.schoolGrade.trim() : null,
      }),
      updatedAt: new Date(),
    };

    this.children.set(childId, updated);
    return this.findById(childId, userId);
  }

  async delete(arg1: string, arg2: string): Promise<boolean> {
    let childId = arg1;
    let userId = arg2;

    let child = this.children.get(childId);
    if (!child || child.userId !== userId) {
      const flipped = this.children.get(arg2);
      if (flipped && flipped.userId === arg1) {
        childId = arg2;
        userId = arg1;
        child = flipped;
      } else {
        return false;
      }
    }

    this.children.delete(childId);
    this.deviceStatuses.delete(childId);
    this.quizAttempts.delete(childId);
    return true;
  }

  async saveReadinessAttempt(
    data: SaveReadinessAttemptData
  ): Promise<ReadinessAttemptRecord> {
    const id = randomUUID();
    const record: ReadinessAttemptRecord = {
      id,
      quizId: data.quizId ?? 'q-first-phone-readiness',
      userId: data.userId,
      childId: data.childId,
      overallScore: data.overallScore,
      dimensionScores: data.dimensionScores,
      recommendation: data.recommendation,
      recommendedRoadmapPreset: data.recommendedRoadmapPreset,
      completedAt: new Date(),
    };

    const existing = this.quizAttempts.get(data.childId) ?? [];
    existing.unshift(record);
    this.quizAttempts.set(data.childId, existing);

    const child = this.children.get(data.childId);
    if (child) {
      child.latestAssessment = record;
      child.latestAssessmentScore = record.overallScore;
    }

    return record;
  }

  async saveReadinessAssessment(
    data: SaveReadinessAttemptData
  ): Promise<ReadinessAttemptRecord> {
    return this.saveReadinessAttempt(data);
  }

  async getLatestReadinessAttempt(
    childId: string,
    userId: string
  ): Promise<ReadinessAttemptRecord | null> {
    const child = this.children.get(childId);
    if (!child || child.userId !== userId) return null;

    const attempts = this.quizAttempts.get(childId) ?? [];
    return attempts.length > 0 && attempts[0] ? attempts[0] : null;
  }

  async findLatestReadinessAttempt(childId: string): Promise<ReadinessAttemptRecord | null> {
    const attempts = this.quizAttempts.get(childId) ?? [];
    return attempts.length > 0 && attempts[0] ? attempts[0] : null;
  }

  setDeviceStatus(childId: string, status: DeviceProfileStatus): void {
    this.deviceStatuses.set(childId, status);
    const child = this.children.get(childId);
    if (child) {
      child.deviceProfileStatus = status;
    }
  }

  clear(): void {
    this.children.clear();
    this.deviceStatuses.clear();
    this.quizAttempts.clear();
  }
}
