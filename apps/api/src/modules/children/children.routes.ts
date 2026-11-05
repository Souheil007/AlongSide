import type { FastifyPluginAsync } from 'fastify';
import { ChildrenController } from './children.controller.js';
import {
  type ChildrenRepository,
  PrismaChildrenRepository,
} from './children.repository.js';
import { ChildrenService } from './children.service.js';
import type { MilestonesService } from '../milestones/milestones.service.js';
import type { HealthService } from '../health/health.service.js';
import {
  TrackMilestoneSchema,
  LogHealthEventSchema,
} from '@alongside/shared';

export interface ChildrenRoutesOptions {
  childrenService?: ChildrenService;
  childrenRepository?: ChildrenRepository;
  milestonesService?: MilestonesService;
  healthService?: HealthService;
}

const childDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    userId: { type: 'string' },
    name: { type: 'string' },
    birthYear: { type: 'number' },
    birthMonth: { type: 'number' },
    age: { type: 'number' },
    roadType: { type: 'string', enum: ['PRE_DEVICE', 'ACTIVE_DEVICE'] },
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
    birthDate: { type: ['string', 'null'] },
    dietaryStage: { type: 'string' },
    allergies: { type: 'array', items: { type: 'string' } },
    pediatricNotes: { type: ['string', 'null'] },
    schoolGrade: { type: ['string', 'null'] },
    deviceProfileStatus: { type: ['string', 'null'] },
    latestAssessmentScore: { type: ['number', 'null'] },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: [
    'id',
    'userId',
    'name',
    'birthYear',
    'birthMonth',
    'age',
    'roadType',
    'developmentalTier',
    'createdAt',
    'updatedAt',
  ],
};

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

export const childrenRoutes: FastifyPluginAsync<ChildrenRoutesOptions> = async (
  fastify,
  opts
) => {
  const repository = opts.childrenRepository ?? new PrismaChildrenRepository();
  const service = opts.childrenService ?? new ChildrenService(repository);
  const controller = new ChildrenController(service);

  // POST /api/v1/children - Create Child Profile
  fastify.post(
    '/',
    {
      preHandler: [fastify.authenticate],
      schema: {
        body: {
          type: 'object',
          required: ['name', 'birthYear', 'birthMonth', 'roadType'],
          properties: {
            name: { type: 'string', minLength: 1, maxLength: 100 },
            birthYear: { type: 'number', minimum: 2000 },
            birthMonth: { type: 'number', minimum: 1, maximum: 12 },
            roadType: { type: 'string', enum: ['PRE_DEVICE', 'ACTIVE_DEVICE'] },
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
            schoolGrade: { type: 'string', maxLength: 50 },
          },
        },
        response: {
          201: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  child: childDtoSchema,
                },
                required: ['child'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
          401: errorResponseSchema,
        },
      },
    },
    controller.create.bind(controller)
  );

  // GET /api/v1/children - List Children for authenticated parent
  fastify.get(
    '/',
    {
      preHandler: [fastify.authenticate],
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  children: {
                    type: 'array',
                    items: childDtoSchema,
                  },
                },
                required: ['children'],
              },
            },
            required: ['success', 'data'],
          },
          401: errorResponseSchema,
        },
      },
    },
    controller.list.bind(controller)
  );

  // GET /api/v1/children/:id - Get Child by ID (Tenant isolated)
  fastify.get<{ Params: { id: string } }>(
    '/:id',
    {
      preHandler: [fastify.authenticate],
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
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
                  child: childDtoSchema,
                },
                required: ['child'],
              },
            },
            required: ['success', 'data'],
          },
          401: errorResponseSchema,
          404: errorResponseSchema,
        },
      },
    },
    controller.getById.bind(controller)
  );

  // PUT /api/v1/children/:id - Update Child Profile
  fastify.put<{ Params: { id: string } }>(
    '/:id',
    {
      preHandler: [fastify.authenticate],
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string', minLength: 1, maxLength: 100 },
            birthYear: { type: 'number', minimum: 2000 },
            birthMonth: { type: 'number', minimum: 1, maximum: 12 },
            roadType: { type: 'string', enum: ['PRE_DEVICE', 'ACTIVE_DEVICE'] },
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
            schoolGrade: { type: 'string', maxLength: 50 },
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
                  child: childDtoSchema,
                },
                required: ['child'],
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
    controller.update.bind(controller)
  );

  // DELETE /api/v1/children/:id - Delete Child Profile
  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    {
      preHandler: [fastify.authenticate],
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
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
                  message: { type: 'string' },
                  id: { type: 'string' },
                },
                required: ['message', 'id'],
              },
            },
            required: ['success', 'data'],
          },
          401: errorResponseSchema,
          404: errorResponseSchema,
        },
      },
    },
    controller.delete.bind(controller)
  );

  // POST /api/v1/children/:id/readiness-assessment - Submit Readiness Assessment
  fastify.post<{ Params: { id: string } }>(
    '/:id/readiness-assessment',
    {
      preHandler: [fastify.authenticate],
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
          },
        },
        response: {
          201: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  attempt: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      quizId: { type: 'string' },
                      childId: { type: 'string' },
                      overallScore: { type: 'number' },
                      dimensionScores: { type: 'object', additionalProperties: { type: 'number' } },
                      isReadyForPersonalPhone: { type: 'boolean' },
                      recommendation: { type: 'string' },
                      recommendedRoadmapPreset: { type: 'string' },
                      strengths: { type: 'array', items: { type: 'string' } },
                      growthAreas: { type: 'array', items: { type: 'string' } },
                      completedAt: { type: 'string' },
                    },
                    required: [
                      'id',
                      'childId',
                      'overallScore',
                      'dimensionScores',
                      'isReadyForPersonalPhone',
                      'recommendation',
                      'recommendedRoadmapPreset',
                      'completedAt',
                    ],
                  },
                },
                required: ['attempt'],
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
    controller.submitReadinessAssessment.bind(controller)
  );

  // POST /api/v1/children/:childId/milestones
  fastify.post(
    '/:childId/milestones',
    {
      preHandler: [fastify.authenticate],
    },
    async (request, reply) => {
      const { childId } = request.params as { childId: string };
      const parsed = TrackMilestoneSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid milestone track payload',
            details: parsed.error.issues,
          },
        });
      }

      if (!opts.milestonesService) {
        return reply.status(500).send({
          success: false,
          error: {
            code: 'SERVICE_UNAVAILABLE',
            message: 'Milestones service is not configured',
          },
        });
      }

      try {
        const childMilestone = await opts.milestonesService.recordChildMilestone(
          childId,
          parsed.data.milestoneId,
          parsed.data.status,
          parsed.data.parentNotes
        );
        return reply.status(200).send({
          success: true,
          data: { childMilestone },
        });
      } catch (err: any) {
        return reply.status(404).send({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: err.message,
          },
        });
      }
    }
  );

  // GET /api/v1/children/:childId/health-logs
  fastify.get(
    '/:childId/health-logs',
    {
      preHandler: [fastify.authenticate],
    },
    async (request, reply) => {
      const { childId } = request.params as { childId: string };
      if (!opts.healthService) {
        return reply.status(500).send({
          success: false,
          error: {
            code: 'SERVICE_UNAVAILABLE',
            message: 'Health service is not configured',
          },
        });
      }

      const healthLogs = await opts.healthService.getChildHealthLogs(childId);
      return reply.status(200).send({
        success: true,
        data: { healthLogs },
      });
    }
  );

  // POST /api/v1/children/:childId/health-logs
  fastify.post(
    '/:childId/health-logs',
    {
      preHandler: [fastify.authenticate],
    },
    async (request, reply) => {
      const { childId } = request.params as { childId: string };
      const parsed = LogHealthEventSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid health event log payload',
            details: parsed.error.issues,
          },
        });
      }

      if (!opts.healthService) {
        return reply.status(500).send({
          success: false,
          error: {
            code: 'SERVICE_UNAVAILABLE',
            message: 'Health service is not configured',
          },
        });
      }

      const healthLog = await opts.healthService.createChildHealthLog(
        childId,
        parsed.data
      );
      return reply.status(200).send({
        success: true,
        data: { healthLog },
      });
    }
  );
};
