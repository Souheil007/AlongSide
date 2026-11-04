import type { FastifyPluginAsync } from 'fastify';
import {
  type NutritionRepository,
  PrismaNutritionRepository,
} from './nutrition.repository.js';
import { NutritionService } from './nutrition.service.js';
import { NutritionFilterSchema } from '@alongside/shared';

export interface NutritionRoutesOptions {
  nutritionRepository?: NutritionRepository;
  nutritionService?: NutritionService;
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

const nutritionGuideDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    stage: { type: 'string' },
    title: { type: 'string' },
    ageBracket: { type: 'string' },
    guidelinesMarkdown: { type: 'string' },
    safeFoods: { type: 'array', items: { type: 'string' } },
    chokingHazards: { type: 'array', items: { type: 'string' } },
    allergenProtocol: { type: ['string', 'null'] },
    pickyEatingTips: { type: ['string', 'null'] },
  },
  required: [
    'id',
    'stage',
    'title',
    'ageBracket',
    'guidelinesMarkdown',
    'safeFoods',
    'chokingHazards',
  ],
};

const allergenScheduleItemSchema = {
  type: 'object',
  properties: {
    allergen: { type: 'string' },
    recommendedFormat: { type: 'string' },
    frequency: { type: 'string' },
    safetyWarning: { type: 'string' },
  },
  required: ['allergen', 'recommendedFormat', 'frequency'],
};

export const nutritionRoutes: FastifyPluginAsync<NutritionRoutesOptions> = async (
  fastify,
  opts
) => {
  const repository =
    opts.nutritionRepository ?? new PrismaNutritionRepository();
  const service =
    opts.nutritionService ?? new NutritionService(repository);

  // GET /api/v1/nutrition/guides
  fastify.get(
    '/guides',
    {
      schema: {
        description: 'Get pediatric nutrition and complementary feeding guides by developmental stage',
        tags: ['Nutrition'],
        querystring: {
          type: 'object',
          properties: {
            stage: { type: 'string' },
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
                    items: nutritionGuideDtoSchema,
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
      const parsed = NutritionFilterSchema.safeParse(request.query);
      if (!parsed.success) {
        return reply.status(400).send({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid nutrition guide filter query',
            details: parsed.error.issues,
          },
        });
      }

      const guides = await service.getGuides(parsed.data.stage as any);
      return reply.status(200).send({
        success: true,
        data: { guides },
      });
    }
  );

  // GET /api/v1/nutrition/allergens
  fastify.get(
    '/allergens',
    {
      schema: {
        description: 'Generate evidence-based early allergen introduction schedule',
        tags: ['Nutrition'],
        querystring: {
          type: 'object',
          properties: {
            childAgeMonths: { type: 'number' },
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
                  schedule: {
                    type: 'array',
                    items: allergenScheduleItemSchema,
                  },
                },
                required: ['schedule'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { childAgeMonths = 6 } = request.query as { childAgeMonths?: number };
      const schedule = service.getAllergenSchedule(Number(childAgeMonths));

      return reply.status(200).send({
        success: true,
        data: { schedule },
      });
    }
  );
};
