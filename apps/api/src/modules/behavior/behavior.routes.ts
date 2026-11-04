import type { FastifyPluginAsync } from 'fastify';
import {
  type BehaviorRepository,
  PrismaBehaviorRepository,
} from './behavior.repository.js';
import { BehaviorService } from './behavior.service.js';
import { BehaviorFilterSchema } from '@alongside/shared';

export interface BehaviorRoutesOptions {
  behaviorRepository?: BehaviorRepository;
  behaviorService?: BehaviorService;
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

const behaviorGuideDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    targetTier: { type: 'string' },
    slug: { type: 'string' },
    triggerSituation: { type: 'string' },
    underlyingNeed: { type: 'string' },
    coRegulationScript: { type: 'string' },
    authoritativeLimit: { type: 'string' },
  },
  required: [
    'id',
    'targetTier',
    'slug',
    'triggerSituation',
    'underlyingNeed',
    'coRegulationScript',
    'authoritativeLimit',
  ],
};

export const behaviorRoutes: FastifyPluginAsync<BehaviorRoutesOptions> = async (
  fastify,
  opts
) => {
  const repository =
    opts.behaviorRepository ?? new PrismaBehaviorRepository();
  const service =
    opts.behaviorService ?? new BehaviorService(repository);

  // GET /api/v1/behavior/guides
  fastify.get(
    '/guides',
    {
      schema: {
        description: 'Get behavioral translation guides, co-regulation scripts, and limits',
        tags: ['Behavior'],
        querystring: {
          type: 'object',
          properties: {
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
                  guides: {
                    type: 'array',
                    items: behaviorGuideDtoSchema,
                  },
                },
                required: ['guides'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const parsed = BehaviorFilterSchema.safeParse(request.query);
      if (!parsed.success) {
        return reply.status(400).send({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid behavior guide filter query',
            details: parsed.error.issues,
          },
        });
      }

      const guides = await service.getGuides(parsed.data.tier as any);
      return reply.status(200).send({
        success: true,
        data: { guides },
      });
    }
  );

  // GET /api/v1/behavior/guides/:slug
  fastify.get(
    '/guides/:slug',
    {
      schema: {
        description: 'Get individual behavioral guide by situation slug',
        tags: ['Behavior'],
        params: {
          type: 'object',
          properties: {
            slug: { type: 'string' },
          },
          required: ['slug'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  guide: behaviorGuideDtoSchema,
                },
                required: ['guide'],
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
      const { slug } = request.params as { slug: string };
      const guide = await service.getGuideBySlug(slug);
      if (!guide) {
        return reply.status(404).send({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: `Behavior guide with slug '${slug}' not found`,
          },
        });
      }

      return reply.status(200).send({
        success: true,
        data: { guide },
      });
    }
  );
};
