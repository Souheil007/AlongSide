import { randomUUID } from 'node:crypto';
import {
  prisma as defaultPrisma,
  type PrismaClient,
  DIGEST_SEED_ISSUE,
  EXPLOIT_SEED_ALERTS,
  SLANG_SEED_TERMS,
} from '@alongside/database';
import type {
  CultureDigestDTO,
  ExploitAlertDTO,
  ExploitSeverity,
  SlangTermDTO,
} from '@alongside/shared';

export interface DigestRepository {
  findLatestDigest(): Promise<CultureDigestDTO | null>;
  searchSlang(term?: string): Promise<SlangTermDTO[]>;
  findExploits(severity?: ExploitSeverity): Promise<ExploitAlertDTO[]>;
}

export class PrismaDigestRepository implements DigestRepository {
  constructor(private readonly prisma: PrismaClient = defaultPrisma) {}

  async findLatestDigest(): Promise<CultureDigestDTO | null> {
    const digest = await this.prisma.cultureDigest.findFirst({
      orderBy: { issueNumber: 'desc' },
      include: {
        slangTerms: true,
        exploitAlerts: true,
      },
    });

    if (!digest) {
      return null;
    }

    return {
      id: digest.id,
      issueNumber: digest.issueNumber,
      publishDate: digest.publishDate.toISOString(),
      title: digest.title,
      summary: digest.summary,
      conversationStarter: digest.conversationStarter,
      slangTerms: digest.slangTerms.map((s) => ({
        id: s.id,
        term: s.term,
        definition: s.definition,
        exampleSentence: s.exampleSentence,
        contextTone: s.contextTone,
      })),
      exploitAlerts: digest.exploitAlerts.map((e) => ({
        id: e.id,
        appName: e.appName,
        exploitDescription: e.exploitDescription,
        howKidsBypass: e.howKidsBypass,
        parentRemedy: e.parentRemedy,
        severity: e.severity as ExploitSeverity,
      })),
    };
  }

  async searchSlang(term?: string): Promise<SlangTermDTO[]> {
    const where = term?.trim()
      ? {
          OR: [
            { term: { contains: term.trim(), mode: 'insensitive' as const } },
            { definition: { contains: term.trim(), mode: 'insensitive' as const } },
          ],
        }
      : {};

    const terms = await this.prisma.slangTerm.findMany({
      where,
      orderBy: { term: 'asc' },
    });

    return terms.map((s) => ({
      id: s.id,
      term: s.term,
      definition: s.definition,
      exampleSentence: s.exampleSentence,
      contextTone: s.contextTone,
    }));
  }

  async findExploits(severity?: ExploitSeverity): Promise<ExploitAlertDTO[]> {
    const where = severity ? { severity } : {};

    const alerts = await this.prisma.exploitAlert.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return alerts.map((e) => ({
      id: e.id,
      appName: e.appName,
      exploitDescription: e.exploitDescription,
      howKidsBypass: e.howKidsBypass,
      parentRemedy: e.parentRemedy,
      severity: e.severity as ExploitSeverity,
    }));
  }
}

export class InMemoryDigestRepository implements DigestRepository {
  private digests: Map<
    string,
    {
      id: string;
      issueNumber: number;
      publishDate: Date;
      title: string;
      summary: string;
      conversationStarter: string;
    }
  > = new Map();

  private slangTerms: Map<
    string,
    {
      id: string;
      digestId?: string;
      term: string;
      definition: string;
      exampleSentence: string;
      contextTone: string;
    }
  > = new Map();

  private exploitAlerts: Map<
    string,
    {
      id: string;
      digestId?: string;
      appName: string;
      exploitDescription: string;
      howKidsBypass: string;
      parentRemedy: string;
      severity: ExploitSeverity;
      createdAt: Date;
    }
  > = new Map();

  constructor(autoSeed = true) {
    if (autoSeed) {
      this.seedDefaultData();
    }
  }

  private seedDefaultData(): void {
    const digestId = 'digest-issue-42';
    this.digests.set(digestId, {
      id: digestId,
      issueNumber: DIGEST_SEED_ISSUE.issueNumber,
      publishDate: DIGEST_SEED_ISSUE.publishDate,
      title: DIGEST_SEED_ISSUE.title,
      summary: DIGEST_SEED_ISSUE.summary,
      conversationStarter: DIGEST_SEED_ISSUE.conversationStarter,
    });

    for (const slang of SLANG_SEED_TERMS) {
      const id = `slang-${slang.term.toLowerCase()}`;
      this.slangTerms.set(id, {
        id,
        digestId,
        term: slang.term,
        definition: slang.definition,
        exampleSentence: slang.exampleSentence,
        contextTone: slang.contextTone,
      });
    }

    for (let i = 0; i < EXPLOIT_SEED_ALERTS.length; i++) {
      const alert = EXPLOIT_SEED_ALERTS[i]!;
      const id = `exploit-${i + 1}`;
      this.exploitAlerts.set(id, {
        id,
        digestId,
        appName: alert.appName,
        exploitDescription: alert.exploitDescription,
        howKidsBypass: alert.howKidsBypass,
        parentRemedy: alert.parentRemedy,
        severity: alert.severity,
        createdAt: new Date(Date.now() - i * 1000),
      });
    }
  }

  async findLatestDigest(): Promise<CultureDigestDTO | null> {
    const sortedDigests = Array.from(this.digests.values()).sort(
      (a, b) => b.issueNumber - a.issueNumber
    );

    const latest = sortedDigests[0];
    if (!latest) {
      return null;
    }

    const slang = Array.from(this.slangTerms.values()).filter(
      (s) => s.digestId === latest.id
    );
    const exploits = Array.from(this.exploitAlerts.values()).filter(
      (e) => e.digestId === latest.id
    );

    return {
      id: latest.id,
      issueNumber: latest.issueNumber,
      publishDate: latest.publishDate.toISOString(),
      title: latest.title,
      summary: latest.summary,
      conversationStarter: latest.conversationStarter,
      slangTerms: slang.map((s) => ({
        id: s.id,
        term: s.term,
        definition: s.definition,
        exampleSentence: s.exampleSentence,
        contextTone: s.contextTone,
      })),
      exploitAlerts: exploits.map((e) => ({
        id: e.id,
        appName: e.appName,
        exploitDescription: e.exploitDescription,
        howKidsBypass: e.howKidsBypass,
        parentRemedy: e.parentRemedy,
        severity: e.severity,
      })),
    };
  }

  async searchSlang(term?: string): Promise<SlangTermDTO[]> {
    let results = Array.from(this.slangTerms.values());

    if (term?.trim()) {
      const q = term.trim().toLowerCase();
      results = results.filter(
        (s) =>
          s.term.toLowerCase().includes(q) ||
          s.definition.toLowerCase().includes(q)
      );
    }

    return results
      .sort((a, b) => a.term.localeCompare(b.term))
      .map((s) => ({
        id: s.id,
        term: s.term,
        definition: s.definition,
        exampleSentence: s.exampleSentence,
        contextTone: s.contextTone,
      }));
  }

  async findExploits(severity?: ExploitSeverity): Promise<ExploitAlertDTO[]> {
    let results = Array.from(this.exploitAlerts.values());

    if (severity) {
      results = results.filter((e) => e.severity === severity);
    }

    return results
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map((e) => ({
        id: e.id,
        appName: e.appName,
        exploitDescription: e.exploitDescription,
        howKidsBypass: e.howKidsBypass,
        parentRemedy: e.parentRemedy,
        severity: e.severity,
      }));
  }
}
