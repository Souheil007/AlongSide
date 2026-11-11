import type { FastifyPluginAsync, FastifyRequest } from 'fastify';
import type { AcademyCategory, DevelopmentalTier } from '@alongside/shared';
import { AcademyController } from './academy.controller.js';
import {
  type AcademyRepository,
  PrismaAcademyRepository,
} from './academy.repository.js';
import { AcademyService } from './academy.service.js';

export interface AcademyRoutesOptions {
  academyService?: AcademyService;
  academyRepository?: AcademyRepository;
}

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

const categoryEnum = [
  'BEHAVIOR_AND_EMOTIONS',
  'HEALTH_AND_WELLNESS',
  'NUTRITION_AND_FEEDING',
  'DEVELOPMENT_AND_PLAY',
  'DIGITAL_AND_DEVICES',
];

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

const academyCategoryStatsSchema = {
  type: 'object',
  properties: {
    category: { type: 'string', enum: categoryEnum },
    title: { type: 'string' },
    description: { type: 'string' },
    moduleCount: { type: 'number' },
    lessonCount: { type: 'number' },
  },
  required: ['category', 'title', 'description', 'moduleCount', 'lessonCount'],
};

const masterVideoLectureSchema = {
  type: ['object', 'null'],
  properties: {
    videoUrl: { type: 'string' },
    title: { type: 'string' },
    presenter: { type: 'string' },
    channel: { type: 'string' },
    durationMinutes: { type: 'number' },
    parentHook: { type: ['string', 'null'] },
    keyTakeaways: {
      type: ['array', 'null'],
      items: { type: 'string' },
    },
    actionPrompt: { type: ['string', 'null'] },
  },
  required: ['videoUrl', 'title', 'presenter', 'channel', 'durationMinutes'],
};

const academyLessonSummarySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    moduleId: { type: 'string' },
    chapterId: { type: ['string', 'null'] },
    slug: { type: 'string' },
    title: { type: 'string' },
    readingMinutes: { type: 'number' },
    sortOrder: { type: 'number' },
    isCompleted: { type: 'boolean' },
    audioUrl: { type: ['string', 'null'] },
    audioDurationSeconds: { type: ['number', 'null'] },
    reliefTagline: { type: ['string', 'null'] },
    whatNotToSay: { type: ['string', 'null'] },
    deliveryTip: { type: ['string', 'null'] },
    videoLecture: masterVideoLectureSchema,
  },
  required: [
    'id',
    'moduleId',
    'slug',
    'title',
    'readingMinutes',
    'sortOrder',
    'isCompleted',
  ],
};

const academyModuleDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    category: { type: 'string', enum: categoryEnum },
    slug: { type: 'string' },
    title: { type: 'string' },
    summary: { type: 'string' },
    reliefSubtitle: { type: ['string', 'null'] },
    tonightQuickWinTitle: { type: ['string', 'null'] },
    coverImageUrl: { type: ['string', 'null'] },
    developmentalTier: {
      type: 'string',
      enum: tierEnum,
    },
    sortOrder: { type: 'number' },
    chapterCount: { type: 'number' },
    lessonCount: { type: 'number' },
    completedLessonCount: { type: 'number' },
    isCompleted: { type: 'boolean' },
    hasMasterLecture: { type: 'boolean' },
    lessons: {
      type: 'array',
      items: academyLessonSummarySchema,
    },
  },
  required: [
    'id',
    'category',
    'slug',
    'title',
    'summary',
    'developmentalTier',
    'sortOrder',
    'lessonCount',
    'completedLessonCount',
    'isCompleted',
  ],
};

const academyChapterDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    moduleId: { type: 'string' },
    slug: { type: 'string' },
    title: { type: 'string' },
    summary: { type: 'string' },
    priority: { type: 'number' },
    sortOrder: { type: 'number' },
    lessonCount: { type: 'number' },
    completedLessonCount: { type: 'number' },
    isCompleted: { type: 'boolean' },
    lessons: {
      type: 'array',
      items: academyLessonSummarySchema,
    },
  },
  required: [
    'id',
    'moduleId',
    'slug',
    'title',
    'summary',
    'priority',
    'sortOrder',
    'lessonCount',
    'completedLessonCount',
    'isCompleted',
    'lessons',
  ],
};

const academyModuleDetailDtoSchema = {
  type: 'object',
  properties: {
    ...academyModuleDtoSchema.properties,
    chapters: {
      type: 'array',
      items: academyChapterDtoSchema,
    },
    lessons: {
      type: 'array',
      items: academyLessonSummarySchema,
    },
  },
  required: [...academyModuleDtoSchema.required, 'chapters', 'lessons'],
};

const adaptiveModuleTypeEnum = [
  'SOMATIC_RESET',
  'CIRCADIAN_TIMELINE',
  'FEEDING_LADDER',
  'PLAY_BLUEPRINT',
  'PACT_CLAUSE',
];

const dialogueCardSchema = {
  type: 'object',
  properties: {
    instinctiveMistake: { type: 'string' },
    whyItBackfires: { type: 'string' },
    empatheticScript: { type: 'string' },
    deliveryTip: { type: 'string' },
  },
  required: [
    'instinctiveMistake',
    'whyItBackfires',
    'empatheticScript',
    'deliveryTip',
  ],
};

const thirtySecondGlanceSchema = {
  type: 'object',
  properties: {
    coreProblem: { type: 'string' },
    immediateShift: { type: 'string' },
    exactWords: { type: 'string' },
  },
  required: ['coreProblem', 'immediateShift', 'exactWords'],
};

const academyLessonDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    moduleId: { type: 'string' },
    chapterId: { type: ['string', 'null'] },
    slug: { type: 'string' },
    title: { type: 'string' },
    contentMarkdown: { type: 'string' },
    readingMinutes: { type: 'number' },
    sortOrder: { type: 'number' },
    isCompleted: { type: 'boolean' },
    audioUrl: { type: ['string', 'null'] },
    audioDurationSeconds: { type: ['number', 'null'] },
    reliefTagline: { type: ['string', 'null'] },
    thirtySecondGlance: {
      type: ['object', 'null'],
      properties: thirtySecondGlanceSchema.properties,
      required: thirtySecondGlanceSchema.required,
    },
    adaptiveModuleType: {
      type: ['string', 'null'],
      enum: adaptiveModuleTypeEnum,
    },
    dialogueCards: {
      type: ['array', 'null'],
      items: dialogueCardSchema,
    },
    whatNotToSay: { type: ['string', 'null'] },
    deliveryTip: { type: ['string', 'null'] },
    videoLecture: masterVideoLectureSchema,
    module: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        slug: { type: 'string' },
        title: { type: 'string' },
        developmentalTier: { type: 'string' },
        category: { type: 'string', enum: categoryEnum },
      },
      required: ['id', 'slug', 'title', 'developmentalTier'],
    },
    chapter: {
      type: ['object', 'null'],
      properties: {
        id: { type: 'string' },
        slug: { type: 'string' },
        title: { type: 'string' },
        priority: { type: 'number' },
      },
      required: ['id', 'slug', 'title', 'priority'],
    },
  },
  required: [
    'id',
    'moduleId',
    'slug',
    'title',
    'contentMarkdown',
    'readingMinutes',
    'sortOrder',
    'isCompleted',
  ],
};

const completionResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean', enum: [true] },
    data: {
      type: 'object',
      properties: {
        progress: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            userId: { type: 'string' },
            lessonId: { type: 'string' },
            isCompleted: { type: 'boolean' },
            completedAt: { type: 'string' },
          },
          required: ['id', 'userId', 'lessonId', 'isCompleted', 'completedAt'],
        },
        module: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            slug: { type: 'string' },
            title: { type: 'string' },
            lessonCount: { type: 'number' },
            completedLessonCount: { type: 'number' },
            percentComplete: { type: 'number' },
            isCompleted: { type: 'boolean' },
          },
          required: [
            'id',
            'slug',
            'title',
            'lessonCount',
            'completedLessonCount',
            'percentComplete',
            'isCompleted',
          ],
        },
      },
      required: ['progress', 'module'],
    },
  },
  required: ['success', 'data'],
};

export const academyRoutes: FastifyPluginAsync<AcademyRoutesOptions> = async (
  fastify,
  opts
) => {
  const repository = opts.academyRepository ?? new PrismaAcademyRepository();
  const service = opts.academyService ?? new AcademyService(repository);
  const controller = new AcademyController(service);

  const optionalAuth = async (request: FastifyRequest) => {
    try {
      await request.jwtVerify();
    } catch {
      // Continue unauthenticated
    }
  };

  // GET /categories - List Canonical Categories with Stats & Course Counts
  fastify.get<{
    Querystring: { tier?: DevelopmentalTier };
  }>(
    '/categories',
    {
      preHandler: [optionalAuth],
      schema: {
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
                  categories: {
                    type: 'array',
                    items: academyCategoryStatsSchema,
                  },
                },
                required: ['categories'],
              },
            },
            required: ['success', 'data'],
          },
        },
      },
    },
    controller.listCategories.bind(controller)
  );

  // GET /modules - List Modules (Filter by Category and/or Tier)
  fastify.get<{
    Querystring: { category?: AcademyCategory; tier?: DevelopmentalTier };
  }>(
    '/modules',
    {
      preHandler: [optionalAuth],
      schema: {
        querystring: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              enum: categoryEnum,
            },
            tier: {
              type: 'string',
              enum: tierEnum,
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
                  modules: {
                    type: 'array',
                    items: academyModuleDtoSchema,
                  },
                },
                required: ['modules'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
        },
      },
    },
    controller.listModules.bind(controller)
  );

  // GET /modules/:slug - Get Module with Prioritized Chapters Hierarchy
  fastify.get<{ Params: { slug: string } }>(
    '/modules/:slug',
    {
      preHandler: [optionalAuth],
      schema: {
        params: {
          type: 'object',
          required: ['slug'],
          properties: {
            slug: { type: 'string', minLength: 1 },
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
                  module: academyModuleDetailDtoSchema,
                },
                required: ['module'],
              },
            },
            required: ['success', 'data'],
          },
          404: errorResponseSchema,
        },
      },
    },
    controller.getModuleBySlug.bind(controller)
  );

  // GET /lessons/by-slug/:slug - Get Lesson Content by Slug
  fastify.get<{ Params: { slug: string } }>(
    '/lessons/by-slug/:slug',
    {
      preHandler: [optionalAuth],
      schema: {
        params: {
          type: 'object',
          required: ['slug'],
          properties: {
            slug: { type: 'string', minLength: 1 },
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
                  lesson: academyLessonDtoSchema,
                },
                required: ['lesson'],
              },
            },
            required: ['success', 'data'],
          },
          404: errorResponseSchema,
        },
      },
    },
    controller.getLessonBySlug.bind(controller)
  );

  // GET /lessons/:id - Get Lesson Content by ID
  fastify.get<{ Params: { id: string } }>(
    '/lessons/:id',
    {
      preHandler: [optionalAuth],
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', minLength: 1 },
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
                  lesson: academyLessonDtoSchema,
                },
                required: ['lesson'],
              },
            },
            required: ['success', 'data'],
          },
          404: errorResponseSchema,
        },
      },
    },
    controller.getLessonById.bind(controller)
  );

  // POST /lessons/:id/complete - Mark Lesson Complete
  fastify.post<{ Params: { id: string } }>(
    '/lessons/:id/complete',
    {
      preHandler: [fastify.authenticate],
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', minLength: 1 },
          },
        },
        response: {
          200: completionResponseSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
        },
      },
    },
    controller.markLessonComplete.bind(controller)
  );
};
