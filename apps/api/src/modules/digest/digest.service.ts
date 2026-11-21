import {
  DEFAULT_DIGEST_TIER,
  isSlangEligibleTier,
  resolveDigestTierBucket,
  type CultureDigestDTO,
  type DevelopmentalTier,
  type DigestArticlesResponseDTO,
  type DigestInteractionResultDTO,
  type DigestIssueSummaryDTO,
  type DigestQueryScope,
  type DigestVideoDurationBucket,
  type DigestVideosResponseDTO,
  type ExploitAlertDTO,
  type ExploitSeverity,
  type SavedDigestShortlistDTO,
  type SlangTermDTO,
  type WeeklyDigestEditionDTO,
} from '@alongside/shared';
import type { ChildrenRepository } from '../children/children.repository.js';
import type {
  DigestRepository,
  UpsertDigestInteractionInput,
} from './digest.repository.js';

export class DigestNotFoundError extends Error {
  readonly statusCode = 404;
  readonly code = 'NOT_FOUND';

  constructor(message = 'No culture digest issues found.') {
    super(message);
    this.name = 'DigestNotFoundError';
  }
}

export class DigestValidationError extends Error {
  readonly statusCode = 400;
  readonly code = 'VALIDATION_ERROR';

  constructor(message: string) {
    super(message);
    this.name = 'DigestValidationError';
  }
}

export class DigestService {
  constructor(
    private readonly repository: DigestRepository,
    private readonly childrenRepository?: ChildrenRepository
  ) {}

  // ----------------------------------------------------
  // LEGACY PLAN-08 METHODS (PRESERVED)
  // ----------------------------------------------------

  async getLatestDigest(): Promise<CultureDigestDTO> {
    const digest = await this.repository.findLatestDigest();
    if (!digest) {
      throw new DigestNotFoundError();
    }
    return digest;
  }

  async searchSlang(term?: string): Promise<SlangTermDTO[]> {
    return this.repository.searchSlang(term);
  }

  async getExploitAlerts(
    severity?: ExploitSeverity
  ): Promise<ExploitAlertDTO[]> {
    return this.repository.findExploits(severity);
  }

  // ----------------------------------------------------
  // WEEKLY CULTURE & TRENDS HUB METHODS (PLAN-49)
  // ----------------------------------------------------

  async listPublishedIssues(
    tier?: DevelopmentalTier
  ): Promise<DigestIssueSummaryDTO[]> {
    const resolvedTier = tier ? resolveDigestTierBucket(tier) : undefined;
    return this.repository.listPublishedIssues(resolvedTier);
  }

  async getWeeklyEdition(
    issueNumberParam: number | string,
    options: {
      tier?: DevelopmentalTier;
      childId?: string;
      userId?: string;
    } = {}
  ): Promise<WeeklyDigestEditionDTO> {
    const parsedIssue = this.parseIssueIdentifier(issueNumberParam);
    const resolvedTier = await this.resolveTier(options);

    const edition = await this.repository.findEditionByIssueNumber(
      parsedIssue,
      resolvedTier,
      options.userId
    );

    if (!edition) {
      throw new DigestNotFoundError(
        parsedIssue === 'latest'
          ? 'No published culture digest issues found.'
          : `Culture digest issue #${parsedIssue} was not found.`
      );
    }

    // Domain invariants: strictly zero phrases for ages 0–6 and drop non-embeddable videos.
    const phrases = isSlangEligibleTier(resolvedTier) ? edition.phrases : [];
    const videos = edition.videos.filter((v) => v.isEmbeddable);

    return {
      ...edition,
      resolvedTier,
      videos,
      phrases,
    };
  }

  async listArticles(options: {
    issueNumber?: number;
    scope?: DigestQueryScope;
    tier?: DevelopmentalTier;
    childId?: string;
    unreadOnly?: boolean;
    q?: string;
    userId?: string;
  }): Promise<DigestArticlesResponseDTO> {
    const resolvedTier = await this.resolveTier(options);
    return this.repository.findArticles({
      issueNumber: options.issueNumber,
      scope: options.scope ?? 'issue',
      tier: resolvedTier,
      unreadOnly: options.unreadOnly,
      q: options.q,
      userId: options.userId,
    });
  }

  async listVideos(options: {
    issueNumber?: number;
    scope?: DigestQueryScope;
    tier?: DevelopmentalTier;
    childId?: string;
    durationBucket?: DigestVideoDurationBucket;
    q?: string;
    userId?: string;
  }): Promise<DigestVideosResponseDTO> {
    const resolvedTier = await this.resolveTier(options);
    const result = await this.repository.findVideos({
      issueNumber: options.issueNumber,
      scope: options.scope ?? 'issue',
      tier: resolvedTier,
      durationBucket: options.durationBucket ?? 'all',
      q: options.q,
      userId: options.userId,
    });

    return {
      ...result,
      videos: result.videos.filter((v) => v.isEmbeddable),
    };
  }

  async getSavedShortlist(
    userId: string,
    options: { tier?: DevelopmentalTier; childId?: string } = {}
  ): Promise<SavedDigestShortlistDTO> {
    const resolvedTier =
      options.tier || options.childId
        ? await this.resolveTier({ ...options, userId })
        : undefined;
    return this.repository.findSavedShortlist(userId, resolvedTier);
  }

  async upsertInteraction(
    userId: string,
    input: UpsertDigestInteractionInput
  ): Promise<DigestInteractionResultDTO> {
    const exists = await this.repository.itemExists(
      input.itemType,
      input.itemId
    );
    if (!exists) {
      throw new DigestNotFoundError(
        `Digest ${input.itemType.toLowerCase()} item '${input.itemId}' was not found.`
      );
    }

    return this.repository.upsertInteraction(userId, input);
  }

  private parseIssueIdentifier(value: number | string): number | 'latest' {
    if (value === 'latest') {
      return 'latest';
    }
    const parsed = typeof value === 'number' ? value : Number(value);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      throw new DigestValidationError(
        "issueNumber must be a positive integer or 'latest'."
      );
    }
    return parsed;
  }

  private async resolveTier(options: {
    tier?: DevelopmentalTier;
    childId?: string;
    userId?: string;
  }): Promise<DevelopmentalTier> {
    if (options.tier) {
      return resolveDigestTierBucket(options.tier);
    }

    if (options.childId && options.userId && this.childrenRepository) {
      const child = await this.childrenRepository.findById(
        options.childId,
        options.userId
      );
      if (child) {
        return resolveDigestTierBucket(child.developmentalTier);
      }
    }

    return DEFAULT_DIGEST_TIER;
  }
}
