import type { FastifyPluginAsync } from 'fastify';
import {
  type BrainGamesRepository,
  PrismaBrainGamesRepository,
} from './brain-games.repository.js';
import {
  type PlayActivityRecommender,
  DevelopmentalPlayAdapter,
} from './play.recommender.js';
import { BrainGamesService } from './brain-games.service.js';
import {
  type ChildrenRepository,
  PrismaChildrenRepository,
} from '../children/children.repository.js';
import { BrainGameFilterSchema } from '@alongside/shared';

export interface BrainGamesRoutesOptions {
  brainGamesRepository?: BrainGamesRepository;
  playRecommender?: PlayActivityRecommender;
  brainGamesService?: BrainGamesService;
  childrenRepository?: ChildrenRepository;
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

const brainGameActivityDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    targetTier: { type: 'string' },
    category: { type: 'string' },
    title: { type: 'string' },
    summary: { type: 'string' },
    instructions: { type: 'string' },
    materialsNeeded: { type: 'array', items: { type: 'string' } },
    targetSkills: { type: 'array', items: { type: 'string' } },
    estimatedMinutes: { type: 'number' },
    isScreenFree: { type: 'boolean' },
  },
  required: [
    'id',
    'targetTier',
    'category',
    'title',
    'summary',
    'instructions',
    'materialsNeeded',
    'targetSkills',
    'estimatedMinutes',
    'isScreenFree',
  ],
};

export const brainGamesRoutes: FastifyPluginAsync<BrainGamesRoutesOptions> = async (
  fastify,
  opts
) => {
  const repository =
    opts.brainGamesRepository ?? new PrismaBrainGamesRepository();
  const recommender =
    opts.playRecommender ?? new DevelopmentalPlayAdapter(repository);
  const childrenRepo =
    opts.childrenRepository ?? new PrismaChildrenRepository();
  const service =
    opts.brainGamesService ?? new BrainGamesService(recommender, childrenRepo);

  // GET /api/v1/brain-games/daily
  fastify.get(
    '/daily',
    {
      schema: {
        description: 'Get daily purposeful play / brain game recommendation',
        tags: ['BrainGames'],
        querystring: {
          type: 'object',
          properties: {
            childId: { type: 'string' },
            tier: { type: 'string' },
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
                  activity: brainGameActivityDtoSchema,
                },
                required: ['activity'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { childId, tier } = request.query as {
        childId?: string;
        tier?: string;
      };

      const activity = await service.getDailyRecommendation(
        childId,
        tier as any
      );

      return reply.status(200).send({
        success: true,
        data: { activity },
      });
    }
  );

  // GET /api/v1/brain-games
  fastify.get(
    '/',
    {
      schema: {
        description: 'List developmental play and sensory activity catalog',
        tags: ['BrainGames'],
        querystring: {
          type: 'object',
          properties: {
            tier: { type: 'string' },
            category: { type: 'string' },
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
                  activities: {
                    type: 'array',
                    items: brainGameActivityDtoSchema,
                  },
                },
                required: ['activities'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const parsed = BrainGameFilterSchema.safeParse(request.query);
      if (!parsed.success) {
        return reply.status(400).send({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid brain games filter query',
            details: parsed.error.issues,
          },
        });
      }

      const activities = await service.getPlayCatalog(
        parsed.data.tier as any,
        parsed.data.category as any
      );

      return reply.status(200).send({
        success: true,
        data: { activities },
      });
    }
  );
};
