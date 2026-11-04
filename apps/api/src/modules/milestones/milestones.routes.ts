import type { FastifyPluginAsync } from 'fastify';
import {
  type MilestonesRepository,
  PrismaMilestonesRepository,
} from './milestones.repository.js';
import { MilestonesService } from './milestones.service.js';
import {
  MilestoneFilterSchema,
  TrackMilestoneSchema,
} from '@alongside/shared';

export interface MilestonesRoutesOptions {
  milestonesRepository?: MilestonesRepository;
  milestonesService?: MilestonesService;
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
        details: { type: 'array' },
      },
      required: ['code', 'message'],
    },
  },
  required: ['success', 'error'],
};

const milestoneDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    targetTier: { type: 'string' },
    targetAgeMonths: { type: 'number' },
    category: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    signsToWatch: { type: 'string' },
    clinicalAuthority: { type: 'string' },
    sortOrder: { type: 'number' },
  },
  required: [
    'id',
    'targetTier',
    'targetAgeMonths',
    'category',
    'title',
    'description',
    'signsToWatch',
    'clinicalAuthority',
  ],
};

const childMilestoneDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    childId: { type: 'string' },
    milestoneId: { type: 'string' },
    status: { type: 'string', enum: ['NOT_STARTED', 'IN_PROGRESS', 'ACHIEVED'] },
    achievedAt: { type: ['string', 'null'] },
    parentNotes: { type: ['string', 'null'] },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: ['id', 'childId', 'milestoneId', 'status', 'createdAt', 'updatedAt'],
};

export const milestonesRoutes: FastifyPluginAsync<MilestonesRoutesOptions> = async (
  fastify,
  opts
) => {
  const repository =
    opts.milestonesRepository ?? new PrismaMilestonesRepository();
  const service =
    opts.milestonesService ?? new MilestonesService(repository);

  // GET /api/v1/milestones
  fastify.get(
    '/',
    {
      schema: {
        description: 'List developmental milestones filtered by tier, category, or age in months',
        tags: ['Milestones'],
        querystring: {
          type: 'object',
          properties: {
            tier: { type: 'string' },
            category: { type: 'string' },
            ageMonths: { type: 'number' },
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
                  milestones: {
                    type: 'array',
                    items: milestoneDtoSchema,
                  },
                },
                required: ['milestones'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const parsed = MilestoneFilterSchema.safeParse(request.query);
      if (!parsed.success) {
        return reply.status(400).send({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid milestone filter query parameters',
            details: parsed.error.issues,
          },
        });
      }

      const milestones = await service.listMilestones({
        tier: parsed.data.tier as any,
        category: parsed.data.category as any,
        ageMonths: parsed.data.ageMonths,
      });

      return reply.status(200).send({
        success: true,
        data: { milestones },
      });
    }
  );

  // POST /api/v1/milestones/children/:childId or POST /api/v1/children/:childId/milestones
  fastify.post(
    '/children/:childId',
    {
      schema: {
        description: 'Record or update child milestone progress',
        tags: ['Milestones'],
        params: {
          type: 'object',
          properties: {
            childId: { type: 'string' },
          },
          required: ['childId'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  childMilestone: childMilestoneDtoSchema,
                },
                required: ['childMilestone'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
          404: errorResponseSchema,
        },
      },
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

      try {
        const childMilestone = await service.recordChildMilestone(
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
};
