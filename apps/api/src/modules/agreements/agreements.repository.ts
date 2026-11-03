import { randomUUID } from 'node:crypto';
import { prisma as defaultPrisma, type PrismaClient } from '@alongside/database';
import {
  AgreementStatus,
  type ClauseCategory,
  type CommitmentParty,
  type DevelopmentalTier,
  type RoadType,
} from '@alongside/shared';

export interface AgreementClauseRecord {
  id: string;
  agreementId: string;
  category: ClauseCategory;
  party: CommitmentParty;
  title: string;
  description: string;
  isStandard: boolean;
  isCustom: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgreementRecord {
  id: string;
  userId: string;
  childId: string;
  title: string;
  status: AgreementStatus;
  developmentalTier: DevelopmentalTier;
  roadType: RoadType;
  parentSignature: string | null;
  childSignature: string | null;
  signedAt: Date | null;
  pdfExportUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  clauses: AgreementClauseRecord[];
  child?: {
    id: string;
    name: string;
    roadType: RoadType;
    developmentalTier: DevelopmentalTier;
  };
}

export interface CreateAgreementClauseRecordData {
  category: ClauseCategory;
  party: CommitmentParty;
  title: string;
  description: string;
  isStandard?: boolean;
  isCustom?: boolean;
  sortOrder?: number;
}

export interface CreateAgreementRecordData {
  childId: string;
  title: string;
  developmentalTier: DevelopmentalTier;
  roadType: RoadType;
  clauses: CreateAgreementClauseRecordData[];
  parentSignature?: string | null;
  childSignature?: string | null;
  status?: AgreementStatus;
  signedAt?: Date | null;
}

export interface UpdateAgreementRecordData {
  title?: string;
  clauses?: CreateAgreementClauseRecordData[];
  parentSignature?: string | null;
  childSignature?: string | null;
  status?: AgreementStatus;
  signedAt?: Date | null;
  pdfExportUrl?: string | null;
}

export interface AgreementsRepository {
  create(userId: string, data: CreateAgreementRecordData): Promise<AgreementRecord>;
  findById(id: string, userId?: string): Promise<AgreementRecord | null>;
  findByUserId(userId: string): Promise<AgreementRecord[]>;
  findByChildId(childId: string, userId?: string): Promise<AgreementRecord[]>;
  update(id: string, userId: string, data: UpdateAgreementRecordData): Promise<AgreementRecord | null>;
  delete(id: string, userId: string): Promise<boolean>;
}

export class PrismaAgreementsRepository implements AgreementsRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async create(userId: string, data: CreateAgreementRecordData): Promise<AgreementRecord> {
    const isSigned = Boolean(data.parentSignature && data.childSignature);
    const status = data.status ?? (isSigned ? AgreementStatus.SIGNED : AgreementStatus.DRAFT);
    const signedAt = data.signedAt ?? (isSigned ? new Date() : null);

    const record = await this.prisma.agreement.create({
      data: {
        userId,
        childId: data.childId,
        title: data.title,
        developmentalTier: data.developmentalTier as any,
        roadType: data.roadType as any,
        parentSignature: data.parentSignature,
        childSignature: data.childSignature,
        status: status as any,
        signedAt,
        clauses: {
          create: data.clauses.map((clause, index) => ({
            category: clause.category as any,
            party: clause.party as any,
            title: clause.title,
            description: clause.description,
            isStandard: clause.isStandard ?? true,
            isCustom: clause.isCustom ?? false,
            sortOrder: clause.sortOrder ?? index,
          })),
        },
      },
      include: {
        clauses: {
          orderBy: { sortOrder: 'asc' },
        },
        child: {
          select: {
            id: true,
            name: true,
            roadType: true,
            developmentalTier: true,
          },
        },
      },
    });

    return record as unknown as AgreementRecord;
  }

  async findById(id: string, userId?: string): Promise<AgreementRecord | null> {
    const whereClause: any = { id };
    if (userId) {
      whereClause.userId = userId;
    }

    const record = await this.prisma.agreement.findFirst({
      where: whereClause,
      include: {
        clauses: {
          orderBy: { sortOrder: 'asc' },
        },
        child: {
          select: {
            id: true,
            name: true,
            roadType: true,
            developmentalTier: true,
          },
        },
      },
    });

    return (record as unknown as AgreementRecord) || null;
  }

  async findByUserId(userId: string): Promise<AgreementRecord[]> {
    const records = await this.prisma.agreement.findMany({
      where: { userId },
      include: {
        clauses: {
          orderBy: { sortOrder: 'asc' },
        },
        child: {
          select: {
            id: true,
            name: true,
            roadType: true,
            developmentalTier: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return records as unknown as AgreementRecord[];
  }

  async findByChildId(childId: string, userId?: string): Promise<AgreementRecord[]> {
    const whereClause: any = { childId };
    if (userId) {
      whereClause.userId = userId;
    }

    const records = await this.prisma.agreement.findMany({
      where: whereClause,
      include: {
        clauses: {
          orderBy: { sortOrder: 'asc' },
        },
        child: {
          select: {
            id: true,
            name: true,
            roadType: true,
            developmentalTier: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return records as unknown as AgreementRecord[];
  }

  async update(
    id: string,
    userId: string,
    data: UpdateAgreementRecordData
  ): Promise<AgreementRecord | null> {
    const existing = await this.prisma.agreement.findFirst({
      where: { id, userId },
      include: { clauses: true },
    });

    if (!existing) {
      return null;
    }

    return await this.prisma.$transaction(async (tx) => {
      if (data.clauses) {
        await tx.agreementClause.deleteMany({
          where: { agreementId: id },
        });

        await tx.agreementClause.createMany({
          data: data.clauses.map((clause, index) => ({
            agreementId: id,
            category: clause.category as any,
            party: clause.party as any,
            title: clause.title,
            description: clause.description,
            isStandard: clause.isStandard ?? true,
            isCustom: clause.isCustom ?? false,
            sortOrder: clause.sortOrder ?? index,
          })),
        });
      }

      const updateData: any = {};
      if (data.title !== undefined) updateData.title = data.title;
      if (data.parentSignature !== undefined) updateData.parentSignature = data.parentSignature;
      if (data.childSignature !== undefined) updateData.childSignature = data.childSignature;
      if (data.status !== undefined) updateData.status = data.status;
      if (data.signedAt !== undefined) updateData.signedAt = data.signedAt;
      if (data.pdfExportUrl !== undefined) updateData.pdfExportUrl = data.pdfExportUrl;

      const updated = await tx.agreement.update({
        where: { id },
        data: updateData,
        include: {
          clauses: {
            orderBy: { sortOrder: 'asc' },
          },
          child: {
            select: {
              id: true,
              name: true,
              roadType: true,
              developmentalTier: true,
            },
          },
        },
      });

      return updated as unknown as AgreementRecord;
    });
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await this.prisma.agreement.deleteMany({
      where: { id, userId },
    });
    return result.count > 0;
  }
}

export class InMemoryAgreementsRepository implements AgreementsRepository {
  private readonly agreements = new Map<string, AgreementRecord>();

  async create(userId: string, data: CreateAgreementRecordData): Promise<AgreementRecord> {
    const id = randomUUID();
    const now = new Date();
    const isSigned = Boolean(data.parentSignature && data.childSignature);
    const status = data.status ?? (isSigned ? AgreementStatus.SIGNED : AgreementStatus.DRAFT);
    const signedAt = data.signedAt ?? (isSigned ? now : null);

    const clauses: AgreementClauseRecord[] = data.clauses.map((clause, index) => ({
      id: randomUUID(),
      agreementId: id,
      category: clause.category,
      party: clause.party,
      title: clause.title,
      description: clause.description,
      isStandard: clause.isStandard ?? true,
      isCustom: clause.isCustom ?? false,
      sortOrder: clause.sortOrder ?? index,
      createdAt: now,
      updatedAt: now,
    }));

    const record: AgreementRecord = {
      id,
      userId,
      childId: data.childId,
      title: data.title,
      status,
      developmentalTier: data.developmentalTier,
      roadType: data.roadType,
      parentSignature: data.parentSignature ?? null,
      childSignature: data.childSignature ?? null,
      signedAt,
      pdfExportUrl: null,
      createdAt: now,
      updatedAt: now,
      clauses,
    };

    this.agreements.set(id, record);
    return structuredClone(record);
  }

  async findById(id: string, userId?: string): Promise<AgreementRecord | null> {
    const record = this.agreements.get(id);
    if (!record) return null;
    if (userId && record.userId !== userId) return null;
    return structuredClone(record);
  }

  async findByUserId(userId: string): Promise<AgreementRecord[]> {
    const records = Array.from(this.agreements.values())
      .filter((r) => r.userId === userId)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    return structuredClone(records);
  }

  async findByChildId(childId: string, userId?: string): Promise<AgreementRecord[]> {
    const records = Array.from(this.agreements.values())
      .filter((r) => r.childId === childId && (!userId || r.userId === userId))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return structuredClone(records);
  }

  async update(
    id: string,
    userId: string,
    data: UpdateAgreementRecordData
  ): Promise<AgreementRecord | null> {
    const record = this.agreements.get(id);
    if (!record || record.userId !== userId) return null;

    const now = new Date();
    if (data.title !== undefined) record.title = data.title;
    if (data.parentSignature !== undefined) record.parentSignature = data.parentSignature;
    if (data.childSignature !== undefined) record.childSignature = data.childSignature;
    if (data.status !== undefined) record.status = data.status;
    if (data.signedAt !== undefined) record.signedAt = data.signedAt;
    if (data.pdfExportUrl !== undefined) record.pdfExportUrl = data.pdfExportUrl;

    if (data.clauses) {
      record.clauses = data.clauses.map((clause, index) => ({
        id: randomUUID(),
        agreementId: id,
        category: clause.category,
        party: clause.party,
        title: clause.title,
        description: clause.description,
        isStandard: clause.isStandard ?? true,
        isCustom: clause.isCustom ?? false,
        sortOrder: clause.sortOrder ?? index,
        createdAt: now,
        updatedAt: now,
      }));
    }

    record.updatedAt = now;
    this.agreements.set(id, record);
    return structuredClone(record);
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const record = this.agreements.get(id);
    if (!record || record.userId !== userId) return false;
    this.agreements.delete(id);
    return true;
  }
}
