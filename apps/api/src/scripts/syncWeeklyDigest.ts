import { prisma } from '@alongside/database';
import { MultiProviderLlmOrchestrator } from '../modules/ai-advisor/adapters/llm-orchestrator.js';
import {
  InMemoryDigestRepository,
  PrismaDigestRepository,
  type DigestRepository,
} from '../modules/digest/digest.repository.js';
import { RssBlogFeedAdapter } from '../modules/digest/ingestion/adapters/blogFeedFetcher.js';
import {
  hasConfiguredLlmApiKey,
  LlmDigestCuratorAdapter,
} from '../modules/digest/ingestion/adapters/digestCurator.js';
import { YouTubeWeeklyFeedAdapter } from '../modules/digest/ingestion/adapters/youtubeFeedFetcher.js';
import {
  DigestIngestionOrchestrator,
  type DigestSyncRequestInput,
} from '../modules/digest/ingestion/digestIngestion.orchestrator.js';

function parseCliArgs(argv: readonly string[]): DigestSyncRequestInput {
  const result: DigestSyncRequestInput = {};

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]!;
    if (!token.startsWith('--')) continue;

    const eqIdx = token.indexOf('=');
    const key = (eqIdx >= 0 ? token.slice(2, eqIdx) : token.slice(2)).trim();
    const inlineVal = eqIdx >= 0 ? token.slice(eqIdx + 1).trim() : undefined;

    const readValue = (): string | undefined => {
      if (inlineVal !== undefined) return inlineVal;
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        i += 1;
        return next.trim();
      }
      return undefined;
    };

    switch (key) {
      case 'weekStart': {
        const val = readValue();
        if (val) result.weekStart = val;
        break;
      }
      case 'weekEnd': {
        const val = readValue();
        if (val) result.weekEnd = val;
        break;
      }
      case 'issueNumber': {
        const val = readValue();
        if (val) result.issueNumber = Number.parseInt(val, 10);
        break;
      }
      case 'fallbackLookbackDays': {
        const val = readValue();
        if (val) result.fallbackLookbackDays = Number.parseInt(val, 10);
        break;
      }
      case 'dryRun': {
        if (inlineVal === undefined) {
          result.dryRun = true;
        } else {
          result.dryRun = inlineVal.toLowerCase() !== 'false' && inlineVal !== '0';
        }
        break;
      }
      default:
        break;
    }
  }

  return result;
}

async function resolveCliRepository(dryRun: boolean): Promise<{
  repository: DigestRepository;
  usingPrisma: boolean;
}> {
  if (!dryRun) {
    return { repository: new PrismaDigestRepository(prisma), usingPrisma: true };
  }

  try {
    await prisma.cultureDigest.findFirst({
      select: { id: true, weekStart: true, weekEnd: true },
    });
    return { repository: new PrismaDigestRepository(prisma), usingPrisma: true };
  } catch {
    console.error(
      '[digest:sync] Database unavailable or pending PLAN-49 migration during --dryRun; using InMemoryDigestRepository for read-only preview.'
    );
    return { repository: new InMemoryDigestRepository(true), usingPrisma: false };
  }
}

async function main(): Promise<void> {
  const input = parseCliArgs(process.argv.slice(2));
  const dryRun = Boolean(input.dryRun);
  const { repository, usingPrisma } = await resolveCliRepository(dryRun);

  try {
    const llmOrchestrator = hasConfiguredLlmApiKey()
      ? new MultiProviderLlmOrchestrator({ logger: console })
      : undefined;

    const orchestrator = new DigestIngestionOrchestrator({
      blogFeedFetcher: new RssBlogFeedAdapter(),
      youtubeFeedFetcher: new YouTubeWeeklyFeedAdapter(),
      curator: new LlmDigestCuratorAdapter({
        llmOrchestrator,
        logger: console,
      }),
      repository,
      logger: console,
    });

    const report = await orchestrator.syncWeeklyEdition(input);
    console.log(JSON.stringify(report, null, 2));
  } finally {
    if (usingPrisma) {
      await prisma.$disconnect().catch(() => {});
    }
  }
}

main().catch((err) => {
  console.error('[digest:sync] Weekly digest sync failed:', err);
  process.exitCode = 1;
});
