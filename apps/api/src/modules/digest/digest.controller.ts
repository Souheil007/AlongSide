import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import {
  DigestArticlesQuerySchema,
  DigestInteractionMutationSchema,
  DigestVideosQuerySchema,
  type DevelopmentalTier,
  type DigestItemType,
  type DigestQueryScope,
  type DigestVideoDurationBucket,
  type ExploitSeverity,
} from '@alongside/shared';
import type { DigestService } from './digest.service.js';
import type { DigestIngestionOrchestrator } from './ingestion/digestIngestion.orchestrator.js';

const DigestSyncBodySchema = z.object({
  weekStart: z.string().trim().min(1).optional(),
  weekEnd: z.string().trim().min(1).optional(),
  issueNumber: z.number().int().positive().optional(),
  dryRun: z.boolean().optional(),
  fallbackLookbackDays: z.number().int().min(0).max(30).optional(),
});

export class DigestController {
  constructor(
    private readonly service: DigestService,
    private readonly ingestionOrchestrator?: DigestIngestionOrchestrator
  ) {}

  // ----------------------------------------------------
  // LEGACY PLAN-08 HANDLERS (PRESERVED)
  // ----------------------------------------------------

  async getLatest(
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const digest = await this.service.getLatestDigest();

    return reply.status(200).send({
      success: true,
      data: {
        digest,
      },
    });
  }

  async searchSlang(
    request: FastifyRequest<{
      Querystring: { term?: string; q?: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const term = request.query.term ?? request.query.q;
    const slangTerms = await this.service.searchSlang(term);

    return reply.status(200).send({
      success: true,
      data: {
        slangTerms,
      },
    });
  }

  async getExploits(
    request: FastifyRequest<{
      Querystring: { severity?: ExploitSeverity };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { severity } = request.query;
    const exploitAlerts = await this.service.getExploitAlerts(severity);

    return reply.status(200).send({
      success: true,
      data: {
        exploitAlerts,
      },
    });
  }

  // ----------------------------------------------------
  // WEEKLY CULTURE & TRENDS HUB HANDLERS (PLAN-49)
  // ----------------------------------------------------

  async listIssues(
    request: FastifyRequest<{
      Querystring: { tier?: DevelopmentalTier };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const issues = await this.service.listPublishedIssues(request.query.tier);

    return reply.status(200).send({
      success: true,
      data: {
        issues,
      },
    });
  }

  async getIssueEdition(
    request: FastifyRequest<{
      Params: { issueNumber: string };
      Querystring: { tier?: DevelopmentalTier; childId?: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const edition = await this.service.getWeeklyEdition(
      request.params.issueNumber,
      {
        tier: request.query.tier,
        childId: request.query.childId,
        userId: request.user?.id,
      }
    );

    return reply.status(200).send({
      success: true,
      data: {
        edition,
      },
    });
  }

  async listArticles(
    request: FastifyRequest<{
      Querystring: {
        issueNumber?: number | string;
        scope?: DigestQueryScope;
        tier?: DevelopmentalTier;
        childId?: string;
        unreadOnly?: boolean | string;
        q?: string;
      };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const parsed = DigestArticlesQuerySchema.safeParse(request.query);
    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid articles query parameters.',
          details: parsed.error.issues.map((issue) => ({
            field: issue.path.join('.') || undefined,
            message: issue.message,
          })),
        },
      });
    }

    const result = await this.service.listArticles({
      ...parsed.data,
      userId: request.user?.id,
    });

    return reply.status(200).send({
      success: true,
      data: result,
    });
  }

  async listVideos(
    request: FastifyRequest<{
      Querystring: {
        issueNumber?: number | string;
        scope?: DigestQueryScope;
        tier?: DevelopmentalTier;
        childId?: string;
        durationBucket?: DigestVideoDurationBucket;
        q?: string;
      };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const parsed = DigestVideosQuerySchema.safeParse(request.query);
    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid videos query parameters.',
          details: parsed.error.issues.map((issue) => ({
            field: issue.path.join('.') || undefined,
            message: issue.message,
          })),
        },
      });
    }

    const result = await this.service.listVideos({
      ...parsed.data,
      userId: request.user?.id,
    });

    return reply.status(200).send({
      success: true,
      data: result,
    });
  }

  async getSavedShortlist(
    request: FastifyRequest<{
      Querystring: { tier?: DevelopmentalTier; childId?: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const shortlist = await this.service.getSavedShortlist(request.user.id, {
      tier: request.query.tier,
      childId: request.query.childId,
    });

    return reply.status(200).send({
      success: true,
      data: shortlist,
    });
  }

  async upsertInteraction(
    request: FastifyRequest<{
      Body: {
        itemType: DigestItemType;
        itemId: string;
        childId?: string;
        isRead?: boolean;
        isSaved?: boolean;
      };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const parsed = DigestInteractionMutationSchema.safeParse(request.body ?? {});
    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid digest interaction payload.',
          details: parsed.error.issues.map((issue) => ({
            field: issue.path.join('.') || undefined,
            message: issue.message,
          })),
        },
      });
    }

    const interaction = await this.service.upsertInteraction(
      request.user.id,
      parsed.data
    );

    return reply.status(200).send({
      success: true,
      data: {
        interaction,
      },
    });
  }

  // ----------------------------------------------------
  // LIVE WEEKLY SOURCING & CURATION SYNC (PLAN-50)
  // ----------------------------------------------------

  async syncWeeklyEdition(
    request: FastifyRequest<{
      Body: {
        weekStart?: string;
        weekEnd?: string;
        issueNumber?: number;
        dryRun?: boolean;
        fallbackLookbackDays?: number;
      };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    if (!this.ingestionOrchestrator) {
      return reply.status(503).send({
        success: false,
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: 'Digest ingestion pipeline is not configured.',
        },
      });
    }

    const parsed = DigestSyncBodySchema.safeParse(request.body ?? {});
    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid weekly digest sync payload.',
          details: parsed.error.issues.map((issue) => ({
            field: issue.path.join('.') || undefined,
            message: issue.message,
          })),
        },
      });
    }

    const report = await this.ingestionOrchestrator.syncWeeklyEdition(
      parsed.data
    );

    return reply.status(200).send({
      success: true,
      data: {
        report,
      },
    });
  }
}
