import { randomUUID } from 'node:crypto';
import {
  prisma as defaultPrisma,
  type PrismaClient,
  SYMPTOM_PROTOCOLS_SEED,
} from '@alongside/database';
import type {
  DevelopmentalTier,
  SymptomProtocolDTO,
  ChildHealthLogDTO,
  TriageZone,
} from '@alongside/shared';

export interface HealthRepository {
  findProtocols(): Promise<SymptomProtocolDTO[]>;
  findProtocolBySlug(slug: string): Promise<SymptomProtocolDTO | null>;
  findHealthLogsByChild(childId: string): Promise<ChildHealthLogDTO[]>;
  createHealthLog(data: {
    childId: string;
    protocolId?: string | null;
    symptomTitle: string;
    temperatureF?: number | null;
    triageZone: TriageZone;
    clinicalNotes?: string | null;
    actionTaken?: string | null;
  }): Promise<ChildHealthLogDTO>;
}

export class PrismaHealthRepository implements HealthRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async findProtocols(): Promise<SymptomProtocolDTO[]> {
    const protocols = await this.prisma.symptomProtocol.findMany({
      orderBy: { title: 'asc' },
    });

    return protocols.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      targetTiers: p.targetTiers as DevelopmentalTier[],
      redFlags: p.redFlags,
      yellowFlags: p.yellowFlags,
      greenHomeCare: p.greenHomeCare,
      contraindications: p.contraindications,
      clinicalAuthority: p.clinicalAuthority,
    }));
  }

  async findProtocolBySlug(slug: string): Promise<SymptomProtocolDTO | null> {
    const p = await this.prisma.symptomProtocol.findUnique({
      where: { slug },
    });
    if (!p) return null;

    return {
      id: p.id,
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      targetTiers: p.targetTiers as DevelopmentalTier[],
      redFlags: p.redFlags,
      yellowFlags: p.yellowFlags,
      greenHomeCare: p.greenHomeCare,
      contraindications: p.contraindications,
      clinicalAuthority: p.clinicalAuthority,
    };
  }

  async findHealthLogsByChild(childId: string): Promise<ChildHealthLogDTO[]> {
    const logs = await this.prisma.childHealthLog.findMany({
      where: { childId },
      orderBy: { loggedAt: 'desc' },
    });

    return logs.map((l) => ({
      id: l.id,
      childId: l.childId,
      protocolId: l.protocolId,
      symptomTitle: l.symptomTitle,
      temperatureF: l.temperatureF,
      triageZone: l.triageZone as TriageZone,
      clinicalNotes: l.clinicalNotes,
      actionTaken: l.actionTaken,
      loggedAt: l.loggedAt.toISOString(),
    }));
  }

  async createHealthLog(data: {
    childId: string;
    protocolId?: string | null;
    symptomTitle: string;
    temperatureF?: number | null;
    triageZone: TriageZone;
    clinicalNotes?: string | null;
    actionTaken?: string | null;
  }): Promise<ChildHealthLogDTO> {
    const record = await this.prisma.childHealthLog.create({
      data: {
        childId: data.childId,
        protocolId: data.protocolId ?? null,
        symptomTitle: data.symptomTitle,
        temperatureF: data.temperatureF ?? null,
        triageZone: data.triageZone as any,
        clinicalNotes: data.clinicalNotes ?? null,
        actionTaken: data.actionTaken ?? null,
      },
    });

    return {
      id: record.id,
      childId: record.childId,
      protocolId: record.protocolId,
      symptomTitle: record.symptomTitle,
      temperatureF: record.temperatureF,
      triageZone: record.triageZone as TriageZone,
      clinicalNotes: record.clinicalNotes,
      actionTaken: record.actionTaken,
      loggedAt: record.loggedAt.toISOString(),
    };
  }
}

export class InMemoryHealthRepository implements HealthRepository {
  private protocols: SymptomProtocolDTO[] = [];
  private healthLogs: Map<string, ChildHealthLogDTO[]> = new Map();

  constructor(initialProtocols = SYMPTOM_PROTOCOLS_SEED) {
    this.protocols = initialProtocols.map((p, idx) => ({
      id: `proto-${idx + 1}-${p.slug}`,
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      targetTiers: p.targetTiers,
      redFlags: p.redFlags,
      yellowFlags: p.yellowFlags,
      greenHomeCare: p.greenHomeCare,
      contraindications: p.contraindications,
      clinicalAuthority: p.clinicalAuthority,
    }));
  }

  async findProtocols(): Promise<SymptomProtocolDTO[]> {
    return [...this.protocols];
  }

  async findProtocolBySlug(slug: string): Promise<SymptomProtocolDTO | null> {
    return this.protocols.find((p) => p.slug === slug) ?? null;
  }

  async findHealthLogsByChild(childId: string): Promise<ChildHealthLogDTO[]> {
    return this.healthLogs.get(childId) ?? [];
  }

  async createHealthLog(data: {
    childId: string;
    protocolId?: string | null;
    symptomTitle: string;
    temperatureF?: number | null;
    triageZone: TriageZone;
    clinicalNotes?: string | null;
    actionTaken?: string | null;
  }): Promise<ChildHealthLogDTO> {
    const list = this.healthLogs.get(data.childId) ?? [];

    const newLog: ChildHealthLogDTO = {
      id: randomUUID(),
      childId: data.childId,
      protocolId: data.protocolId ?? null,
      symptomTitle: data.symptomTitle,
      temperatureF: data.temperatureF ?? null,
      triageZone: data.triageZone,
      clinicalNotes: data.clinicalNotes ?? null,
      actionTaken: data.actionTaken ?? null,
      loggedAt: new Date().toISOString(),
    };

    list.unshift(newLog);
    this.healthLogs.set(data.childId, list);
    return newLog;
  }
}
