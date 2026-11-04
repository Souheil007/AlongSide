import type { FastifyPluginAsync } from 'fastify';
import type { DevelopmentalTier, RoadType } from '@alongside/shared';
import { FaqsController } from './faqs.controller.js';
import {
  type FaqRepository,
  PrismaFaqRepository,
} from './faqs.repository.js';
import { FaqsService } from './faqs.service.js';

export interface FaqsRoutesOptions {
  faqsService?: FaqsService;
  faqsRepository?: FaqRepository;
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

const faqCategoryDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    slug: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    sortOrder: { type: 'number' },
    faqCount: { type: 'number' },
  },
  required: ['id', 'slug', 'name', 'description', 'sortOrder'],
};

const faqItemDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    categoryId: { type: 'string' },
    categorySlug: { type: 'string' },
    categoryName: { type: 'string' },
    targetTier: {
      type: ['string', 'null'],
      enum: [
        'TIER_1_AGES_8_9',
        'TIER_2_AGES_10_11',
        'TIER_3_AGES_12_13',
        'TIER_4_AGES_14_PLUS',
        null,
      ],
    },
    targetRoad: {
      type: ['string', 'null'],
      enum: ['PRE_DEVICE', 'ACTIVE_DEVICE', null],
    },
    question: { type: 'string' },
    answerMarkdown: { type: 'string' },
    deEscalationScript: { type: ['string', 'null'] },
    isFeatured: { type: 'boolean' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: ['id', 'categoryId', 'question', 'answerMarkdown', 'isFeatured'],
};

export const faqsRoutes: FastifyPluginAsync<FaqsRoutesOptions> = async (
  fastify,
  opts
) => {
  const repository = opts.faqsRepository ?? new PrismaFaqRepository();
  const service = opts.faqsService ?? new FaqsService(repository);
  const controller = new FaqsController(service);

  // GET /api/v1/faqs/categories - List all FAQ categories
  fastify.get(
    '/categories',
    {
      schema: {
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
                    items: faqCategoryDtoSchema,
                  },
                },
                required: ['categories'],
              },
            },
            required: ['success', 'data'],
          },
          '4xx': errorResponseSchema,
          '5xx': errorResponseSchema,
        },
      },
    },
    controller.listCategories.bind(controller)
  );

  // GET /api/v1/faqs - Query FAQ items with search, filters, pagination
  fastify.get<{
    Querystring: {
      q?: string;
      category?: string;
      tier?: DevelopmentalTier;
      road?: RoadType;
      limit?: number;
      offset?: number;
    };
  }>(
    '/',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            q: { type: 'string' },
            category: { type: 'string' },
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
            road: {
              type: 'string',
              enum: ['PRE_DEVICE', 'ACTIVE_DEVICE'],
            },
            limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
            offset: { type: 'integer', minimum: 0, default: 0 },
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
                  faqs: {
                    type: 'array',
                    items: faqItemDtoSchema,
                  },
                  total: { type: 'number' },
                  limit: { type: 'number' },
                  offset: { type: 'number' },
                },
                required: ['faqs', 'total', 'limit', 'offset'],
              },
            },
            required: ['success', 'data'],
          },
          '4xx': errorResponseSchema,
          '5xx': errorResponseSchema,
        },
      },
    },
    controller.listFaqs.bind(controller)
  );

  // GET /api/v1/faqs/:id - Retrieve individual FAQ scenario
  fastify.get<{
    Params: { id: string };
  }>(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  faq: faqItemDtoSchema,
                },
                required: ['faq'],
              },
            },
            required: ['success', 'data'],
          },
          '4xx': errorResponseSchema,
          '5xx': errorResponseSchema,
        },
      },
    },
    controller.getFaqById.bind(controller)
  );
};
