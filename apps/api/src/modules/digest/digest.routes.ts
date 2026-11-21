import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import type {
  DevelopmentalTier,
  DigestItemType,
  DigestQueryScope,
  DigestVideoDurationBucket,
  ExploitSeverity,
} from '@alongside/shared';
import type { ChildrenRepository } from '../children/children.repository.js';
import { DigestController } from './digest.controller.js';
import {
  type DigestRepository,
  PrismaDigestRepository,
} from './digest.repository.js';
import { DigestService } from './digest.service.js';

export interface DigestRoutesOptions {
  digestService?: DigestService;
  digestRepository?: DigestRepository;
  childrenRepository?: ChildrenRepository;
}

const tierEnum = [
  'TIER_0A_INFANCY_0_1',
  'TIER_0B_TODDLER_1_2',
  'TIER_0C_OLDER_TODDLER_2_3',
  'TIER_0_INFANCY_TODDLER_0_3',
  'TIER_1_EARLY_CHILDHOOD_4_6',
  'TIER_2_MIDDLE_CHILDHOOD_7_9',
  'TIER_3_PRE_TEEN_10_12',
  'TIER_4_EARLY_ADOLESCENCE_13_15',
  'TIER_5_LATE_ADOLESCENCE_16_18',
  'TIER_1_AGES_8_9',
  'TIER_2_AGES_10_11',
  'TIER_3_AGES_12_13',
  'TIER_4_AGES_14_PLUS',
];

const issueStatusEnum = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];
const itemTypeEnum = ['ARTICLE', 'VIDEO', 'DINNER_PROMPT'];
const scopeEnum = ['issue', 'all'];
const durationBucketEnum = ['all', 'short', 'medium', 'deep'];

const errorResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean', enum: [false] },
    error: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        message: { type: 'string' },
        details: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              field: { type: 'string' },
              message: { type: 'string' },
            },
            required: ['message'],
          },
        },
      },
      required: ['code', 'message'],
    },
  },
  required: ['success', 'error'],
};

// ----------------------------------------------------
// LEGACY PLAN-08 RESPONSE SCHEMAS (PRESERVED)
// ----------------------------------------------------

const slangTermDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    term: { type: 'string' },
    definition: { type: 'string' },
    exampleSentence: { type: 'string' },
    contextTone: { type: 'string' },
  },
  required: ['id', 'term', 'definition', 'exampleSentence', 'contextTone'],
};

const exploitAlertDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    appName: { type: 'string' },
    exploitDescription: { type: 'string' },
    howKidsBypass: { type: 'string' },
    parentRemedy: { type: 'string' },
    severity: {
      type: 'string',
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    },
  },
  required: [
    'id',
    'appName',
    'exploitDescription',
    'howKidsBypass',
    'parentRemedy',
    'severity',
  ],
};

const cultureDigestDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    issueNumber: { type: 'number' },
    publishDate: { type: 'string' },
    title: { type: 'string' },
    summary: { type: 'string' },
    conversationStarter: { type: 'string' },
    slangTerms: {
      type: 'array',
      items: slangTermDtoSchema,
    },
    exploitAlerts: {
      type: 'array',
      items: exploitAlertDtoSchema,
    },
  },
  required: [
    'id',
    'issueNumber',
    'publishDate',
    'title',
    'summary',
    'conversationStarter',
    'slangTerms',
    'exploitAlerts',
  ],
};

// ----------------------------------------------------
// WEEKLY HUB PLAN-49 SERIALIZATION SCHEMAS
// ----------------------------------------------------

const videoJumpChipSchema = {
  type: 'object',
  properties: {
    seconds: { type: 'number' },
    label: { type: 'string' },
  },
  required: ['seconds', 'label'],
};

const digestIssueSummaryDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    issueNumber: { type: 'number' },
    publishDate: { type: 'string' },
    weekStart: { type: 'string' },
    weekEnd: { type: 'string' },
    title: { type: 'string' },
    summary: { type: 'string' },
    status: { type: 'string', enum: issueStatusEnum },
    articleCount: { type: 'number' },
    videoCount: { type: 'number' },
  },
  required: [
    'id',
    'issueNumber',
    'publishDate',
    'weekStart',
    'weekEnd',
    'title',
    'summary',
    'status',
    'articleCount',
    'videoCount',
  ],
};

const digestArticleDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    digestId: { type: 'string' },
    issueNumber: { type: 'number' },
    title: { type: 'string' },
    summary: { type: 'string' },
    keyShift: { type: 'string' },
    perspectiveNote: { type: ['string', 'null'] },
    topicLabel: { type: 'string' },
    readMinutes: { type: 'number' },
    sourceName: { type: 'string' },
    sourceDomain: { type: 'string' },
    sourceUrl: { type: 'string' },
    authorName: { type: ['string', 'null'] },
    imageUrl: { type: ['string', 'null'] },
    publishedAt: { type: 'string' },
    isOriginalEditorial: { type: 'boolean' },
    contentMarkdown: { type: ['string', 'null'] },
    sourcesText: { type: ['string', 'null'] },
    targetTiers: { type: 'array', items: { type: 'string', enum: tierEnum } },
    isLead: { type: 'boolean' },
    sortOrder: { type: 'number' },
    isRead: { type: 'boolean' },
    isSaved: { type: 'boolean' },
  },
  required: [
    'id',
    'digestId',
    'issueNumber',
    'title',
    'summary',
    'keyShift',
    'topicLabel',
    'readMinutes',
    'sourceName',
    'sourceDomain',
    'sourceUrl',
    'publishedAt',
    'isOriginalEditorial',
    'targetTiers',
    'isLead',
    'sortOrder',
    'isRead',
    'isSaved',
  ],
};

const digestVideoDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    digestId: { type: 'string' },
    issueNumber: { type: 'number' },
    youtubeVideoId: { type: 'string' },
    videoUrl: { type: 'string' },
    title: { type: 'string' },
    presenter: { type: 'string' },
    channelName: { type: 'string' },
    channelId: { type: ['string', 'null'] },
    publishedAt: { type: 'string' },
    durationMinutes: { type: 'number' },
    formatLabel: { type: 'string' },
    takeaway: { type: 'string' },
    jumpChips: {
      type: ['array', 'null'],
      items: videoJumpChipSchema,
    },
    skimBullets: { type: 'array', items: { type: 'string' } },
    targetTiers: { type: 'array', items: { type: 'string', enum: tierEnum } },
    isEmbeddable: { type: 'boolean' },
    sortOrder: { type: 'number' },
    isSaved: { type: 'boolean' },
  },
  required: [
    'id',
    'digestId',
    'issueNumber',
    'youtubeVideoId',
    'videoUrl',
    'title',
    'presenter',
    'channelName',
    'publishedAt',
    'durationMinutes',
    'formatLabel',
    'takeaway',
    'skimBullets',
    'targetTiers',
    'isEmbeddable',
    'sortOrder',
    'isSaved',
  ],
};

const digestDinnerPromptDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    digestId: { type: 'string' },
    issueNumber: { type: 'number' },
    question: { type: 'string' },
    parentTip: { type: 'string' },
    followUp: { type: 'string' },
    targetTiers: { type: 'array', items: { type: 'string', enum: tierEnum } },
    sortOrder: { type: 'number' },
    isSaved: { type: 'boolean' },
  },
  required: [
    'id',
    'digestId',
    'issueNumber',
    'question',
    'parentTip',
    'followUp',
    'targetTiers',
    'sortOrder',
    'isSaved',
  ],
};

const digestPhraseDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    digestId: { type: 'string' },
    issueNumber: { type: 'number' },
    word: { type: 'string' },
    shortMeaning: { type: 'string' },
    fullMeaning: { type: 'string' },
    cringeLevel: { type: 'number' },
    cringeLabel: { type: 'string' },
    calmScript: { type: 'string' },
    targetTiers: { type: 'array', items: { type: 'string', enum: tierEnum } },
    sortOrder: { type: 'number' },
  },
  required: [
    'id',
    'digestId',
    'issueNumber',
    'word',
    'shortMeaning',
    'fullMeaning',
    'cringeLevel',
    'cringeLabel',
    'calmScript',
    'targetTiers',
    'sortOrder',
  ],
};

const weeklyDigestEditionDtoSchema = {
  type: 'object',
  properties: {
    issue: digestIssueSummaryDtoSchema,
    resolvedTier: { type: 'string', enum: tierEnum },
    videos: { type: 'array', items: digestVideoDtoSchema },
    articles: { type: 'array', items: digestArticleDtoSchema },
    dinnerPrompts: { type: 'array', items: digestDinnerPromptDtoSchema },
    phrases: { type: 'array', items: digestPhraseDtoSchema },
    readArticleCount: { type: 'number' },
    totalArticleCount: { type: 'number' },
  },
  required: [
    'issue',
    'resolvedTier',
    'videos',
    'articles',
    'dinnerPrompts',
    'phrases',
    'readArticleCount',
    'totalArticleCount',
  ],
};

const digestInteractionResultDtoSchema = {
  type: 'object',
  properties: {
    itemType: { type: 'string', enum: itemTypeEnum },
    itemId: { type: 'string' },
    isRead: { type: 'boolean' },
    isSaved: { type: 'boolean' },
  },
  required: ['itemType', 'itemId', 'isRead', 'isSaved'],
};

export const digestRoutes: FastifyPluginAsync<DigestRoutesOptions> = async (
  fastify,
  opts
) => {
  const repository = opts.digestRepository ?? new PrismaDigestRepository();
  const service =
    opts.digestService ?? new DigestService(repository, opts.childrenRepository);
  const controller = new DigestController(service);

  const optionalAuth = async (request: FastifyRequest, reply: FastifyReply) => {
    if (typeof fastify.optionalAuthenticate === 'function') {
      await fastify.optionalAuthenticate(request, reply);
      return;
    }
    try {
      await request.jwtVerify();
    } catch {
      // Anonymous request fallback when authPlugin is not registered
    }
  };

  // ====================================================
  // LEGACY PLAN-08 ROUTES (100% BACKWARD-COMPATIBLE)
  // ====================================================

  // GET /api/v1/digest/latest - Get Latest Sunday Briefing Issue
  fastify.get(
    '/latest',
    {
      schema: {
        tags: ['Culture Digest'],
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  digest: cultureDigestDtoSchema,
                },
                required: ['digest'],
              },
            },
            required: ['success', 'data'],
          },
          404: errorResponseSchema,
        },
      },
    },
    controller.getLatest.bind(controller)
  );

  // GET /api/v1/digest/slang - Search Slang Terms
  fastify.get<{ Querystring: { term?: string; q?: string } }>(
    '/slang',
    {
      schema: {
        tags: ['Culture Digest'],
        querystring: {
          type: 'object',
          properties: {
            term: { type: 'string' },
            q: { type: 'string' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  slangTerms: {
                    type: 'array',
                    items: slangTermDtoSchema,
                  },
                },
                required: ['slangTerms'],
              },
            },
            required: ['success', 'data'],
          },
        },
      },
    },
    controller.searchSlang.bind(controller)
  );

  // GET /api/v1/digest/exploits - List Exploit Early Warnings
  fastify.get<{ Querystring: { severity?: ExploitSeverity } }>(
    '/exploits',
    {
      schema: {
        tags: ['Culture Digest'],
        querystring: {
          type: 'object',
          properties: {
            severity: {
              type: 'string',
              enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
            },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  exploitAlerts: {
                    type: 'array',
                    items: exploitAlertDtoSchema,
                  },
                },
                required: ['exploitAlerts'],
              },
            },
            required: ['success', 'data'],
          },
        },
      },
    },
    controller.getExploits.bind(controller)
  );

  // ====================================================
  // WEEKLY CULTURE & TRENDS HUB ROUTES (PLAN-49)
  // ====================================================

  // GET /api/v1/digest/issues - List Published Weekly Editions
  fastify.get<{ Querystring: { tier?: DevelopmentalTier } }>(
    '/issues',
    {
      preHandler: [optionalAuth],
      schema: {
        tags: ['Culture Digest'],
        querystring: {
          type: 'object',
          properties: {
            tier: { type: 'string', enum: tierEnum },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  issues: {
                    type: 'array',
                    items: digestIssueSummaryDtoSchema,
                  },
                },
                required: ['issues'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
        },
      },
    },
    controller.listIssues.bind(controller)
  );

  // GET /api/v1/digest/issues/:issueNumber - Fetch Weekly Edition ('latest' or positive integer)
  fastify.get<{
    Params: { issueNumber: string };
    Querystring: { tier?: DevelopmentalTier; childId?: string };
  }>(
    '/issues/:issueNumber',
    {
      preHandler: [optionalAuth],
      schema: {
        tags: ['Culture Digest'],
        params: {
          type: 'object',
          required: ['issueNumber'],
          properties: {
            issueNumber: {
              type: 'string',
              pattern: '^(latest|[1-9][0-9]*)$',
            },
          },
        },
        querystring: {
          type: 'object',
          properties: {
            tier: { type: 'string', enum: tierEnum },
            childId: { type: 'string', minLength: 1 },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  edition: weeklyDigestEditionDtoSchema,
                },
                required: ['edition'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
          404: errorResponseSchema,
        },
      },
    },
    controller.getIssueEdition.bind(controller)
  );

  // GET /api/v1/digest/articles - Week-Scoped (default) or Archive-Wide Curated Blogs
  fastify.get<{
    Querystring: {
      issueNumber?: number | string;
      scope?: DigestQueryScope;
      tier?: DevelopmentalTier;
      childId?: string;
      unreadOnly?: boolean | string;
      q?: string;
    };
  }>(
    '/articles',
    {
      preHandler: [optionalAuth],
      schema: {
        tags: ['Culture Digest'],
        querystring: {
          type: 'object',
          properties: {
            issueNumber: { type: 'integer', minimum: 1 },
            scope: { type: 'string', enum: scopeEnum },
            tier: { type: 'string', enum: tierEnum },
            childId: { type: 'string', minLength: 1 },
            unreadOnly: { type: 'boolean' },
            q: { type: 'string', maxLength: 120 },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  articles: { type: 'array', items: digestArticleDtoSchema },
                  unreadCount: { type: 'number' },
                  totalInScope: { type: 'number' },
                  issueNumber: { type: 'number' },
                },
                required: ['articles', 'unreadCount', 'totalInScope'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
        },
      },
    },
    controller.listArticles.bind(controller)
  );

  // GET /api/v1/digest/videos - Week-Scoped (default) or Archive-Wide Embeddable Videos
  fastify.get<{
    Querystring: {
      issueNumber?: number | string;
      scope?: DigestQueryScope;
      tier?: DevelopmentalTier;
      childId?: string;
      durationBucket?: DigestVideoDurationBucket;
      q?: string;
    };
  }>(
    '/videos',
    {
      preHandler: [optionalAuth],
      schema: {
        tags: ['Culture Digest'],
        querystring: {
          type: 'object',
          properties: {
            issueNumber: { type: 'integer', minimum: 1 },
            scope: { type: 'string', enum: scopeEnum },
            tier: { type: 'string', enum: tierEnum },
            childId: { type: 'string', minLength: 1 },
            durationBucket: { type: 'string', enum: durationBucketEnum },
            q: { type: 'string', maxLength: 120 },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  videos: { type: 'array', items: digestVideoDtoSchema },
                  totalInScope: { type: 'number' },
                  issueNumber: { type: 'number' },
                },
                required: ['videos', 'totalInScope'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
        },
      },
    },
    controller.listVideos.bind(controller)
  );

  // GET /api/v1/digest/saved - Authenticated User Saved Shortlist
  fastify.get<{
    Querystring: { tier?: DevelopmentalTier; childId?: string };
  }>(
    '/saved',
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ['Culture Digest'],
        querystring: {
          type: 'object',
          properties: {
            tier: { type: 'string', enum: tierEnum },
            childId: { type: 'string', minLength: 1 },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  articles: { type: 'array', items: digestArticleDtoSchema },
                  videos: { type: 'array', items: digestVideoDtoSchema },
                  dinnerPrompts: {
                    type: 'array',
                    items: digestDinnerPromptDtoSchema,
                  },
                  totalCount: { type: 'number' },
                },
                required: ['articles', 'videos', 'dinnerPrompts', 'totalCount'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
          401: errorResponseSchema,
        },
      },
    },
    controller.getSavedShortlist.bind(controller)
  );

  // PUT /api/v1/digest/interactions - Persist User Read / Saved State
  fastify.put<{
    Body: {
      itemType: DigestItemType;
      itemId: string;
      childId?: string;
      isRead?: boolean;
      isSaved?: boolean;
    };
  }>(
    '/interactions',
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: ['Culture Digest'],
        body: {
          type: 'object',
          required: ['itemType', 'itemId'],
          properties: {
            itemType: { type: 'string', enum: itemTypeEnum },
            itemId: { type: 'string', minLength: 1 },
            childId: { type: 'string', minLength: 1 },
            isRead: { type: 'boolean' },
            isSaved: { type: 'boolean' },
          },
          additionalProperties: false,
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  interaction: digestInteractionResultDtoSchema,
                },
                required: ['interaction'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
        },
      },
    },
    controller.upsertInteraction.bind(controller)
  );
};
