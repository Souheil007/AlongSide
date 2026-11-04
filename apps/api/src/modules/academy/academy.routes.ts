import type { FastifyPluginAsync, FastifyRequest } from 'fastify';
import type { DevelopmentalTier } from '@alongside/shared';
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

const academyModuleDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    slug: { type: 'string' },
    title: { type: 'string' },
    summary: { type: 'string' },
    coverImageUrl: { type: ['string', 'null'] },
    developmentalTier: {
      type: 'string',
      enum: [
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
      ],
    },
    sortOrder: { type: 'number' },
    lessonCount: { type: 'number' },
    completedLessonCount: { type: 'number' },
    isCompleted: { type: 'boolean' },
  },
  required: [
    'id',
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

const academyLessonSummarySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    moduleId: { type: 'string' },
    slug: { type: 'string' },
    title: { type: 'string' },
    readingMinutes: { type: 'number' },
    sortOrder: { type: 'number' },
    isCompleted: { type: 'boolean' },
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

const academyModuleDetailDtoSchema = {
  type: 'object',
  properties: {
    ...academyModuleDtoSchema.properties,
    lessons: {
      type: 'array',
      items: academyLessonSummarySchema,
    },
  },
  required: [...academyModuleDtoSchema.required, 'lessons'],
};

const academyLessonDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    moduleId: { type: 'string' },
    slug: { type: 'string' },
    title: { type: 'string' },
    contentMarkdown: { type: 'string' },
    readingMinutes: { type: 'number' },
    sortOrder: { type: 'number' },
    isCompleted: { type: 'boolean' },
    module: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        slug: { type: 'string' },
        title: { type: 'string' },
        developmentalTier: { type: 'string' },
      },
      required: ['id', 'slug', 'title', 'developmentalTier'],
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

  // GET /api/v1/academy/modules - List Modules (Optional tier filter & completion status)
  fastify.get<{ Querystring: { tier?: DevelopmentalTier } }>(
    '/modules',
    {
      preHandler: [optionalAuth],
      schema: {
        querystring: {
          type: 'object',
          properties: {
            tier: {
              type: 'string',
              enum: [
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
              ],
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

  // GET /api/v1/academy/modules/:slug - Get Module by Slug
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

  // GET /api/v1/academy/lessons/:id - Get Lesson Content by ID
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

  // POST /api/v1/academy/lessons/:id/complete - Mark Lesson Complete
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
