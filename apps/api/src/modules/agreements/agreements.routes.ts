import type { FastifyPluginAsync } from 'fastify';
import { CompileProfileSchema } from '@alongside/shared';
import { AgreementsController } from './agreements.controller.js';
import {
  type AgreementsRepository,
  PrismaAgreementsRepository,
} from './agreements.repository.js';
import { AgreementService } from './agreements.service.js';
import {
  type PdfDocumentRenderer,
  StandardVectorPdfRenderer,
} from './pdf.service.js';
import type { DeviceProfilesService } from '../device-profiles/device-profiles.service.js';

export interface AgreementsRoutesOptions {
  agreementsRepository?: AgreementsRepository;
  agreementsService?: AgreementService;
  pdfRenderer?: PdfDocumentRenderer;
  deviceProfilesService?: DeviceProfilesService;
}

const agreementDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    userId: { type: 'string' },
    childId: { type: 'string' },
    title: { type: 'string' },
    status: {
      type: 'string',
      enum: ['DRAFT', 'SIGNED', 'DEPLOYED_TO_DEVICE', 'ARCHIVED'],
    },
    developmentalTier: {
      type: 'string',
      enum: [
        'TIER_1_AGES_8_9',
        'TIER_2_AGES_10_11',
        'TIER_3_AGES_12_13',
        'TIER_4_AGES_14_PLUS',
      ],
    },
    roadType: {
      type: 'string',
      enum: ['PRE_DEVICE', 'ACTIVE_DEVICE'],
    },
    parentSignature: { type: ['string', 'null'] },
    childSignature: { type: ['string', 'null'] },
    signedAt: { type: ['string', 'null'] },
    pdfExportUrl: { type: ['string', 'null'] },
    clauses: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          agreementId: { type: 'string' },
          category: { type: 'string' },
          party: { type: 'string', enum: ['CHILD', 'PARENT'] },
          title: { type: 'string' },
          description: { type: 'string' },
          isStandard: { type: 'boolean' },
          isCustom: { type: 'boolean' },
          sortOrder: { type: 'number' },
        },
      },
    },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: [
    'id',
    'userId',
    'childId',
    'title',
    'status',
    'developmentalTier',
    'roadType',
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

export const agreementsRoutes: FastifyPluginAsync<AgreementsRoutesOptions> = async (
  fastify,
  opts
) => {
  const repository = opts.agreementsRepository ?? new PrismaAgreementsRepository();
  const pdfRenderer = opts.pdfRenderer ?? new StandardVectorPdfRenderer();
  const service = opts.agreementsService ?? new AgreementService(repository, pdfRenderer);
  const controller = new AgreementsController(service);

  // GET /api/v1/agreements/presets
  fastify.get(
    '/presets',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            tier: {
              type: 'string',
              enum: [
                'TIER_1_AGES_8_9',
                'TIER_2_AGES_10_11',
                'TIER_3_AGES_12_13',
                'TIER_4_AGES_14_PLUS',
              ],
            },
            roadType: {
              type: 'string',
              enum: ['PRE_DEVICE', 'ACTIVE_DEVICE'],
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
                  presets: { type: 'array' },
                  categories: { type: 'array' },
                },
                required: ['presets', 'categories'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
        },
      },
    },
    controller.getPresets.bind(controller)
  );

  // POST /api/v1/agreements
  fastify.post<{ Body: unknown }>(
    '/',
    {
      preHandler: [fastify.authenticate],
      schema: {
        response: {
          201: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  agreement: agreementDtoSchema,
                },
                required: ['agreement'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
          401: errorResponseSchema,
        },
      },
    },
    controller.createAgreement.bind(controller)
  );

  // GET /api/v1/agreements/:id
  fastify.get<{ Params: { id: string } }>(
    '/:id',
    {
      preHandler: [fastify.authenticate],
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
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
                  agreement: agreementDtoSchema,
                },
                required: ['agreement'],
              },
            },
            required: ['success', 'data'],
          },
          401: errorResponseSchema,
          404: errorResponseSchema,
        },
      },
    },
    controller.getAgreementById.bind(controller)
  );

  // PUT /api/v1/agreements/:id
  fastify.put<{ Params: { id: string }; Body: unknown }>(
    '/:id',
    {
      preHandler: [fastify.authenticate],
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
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
                  agreement: agreementDtoSchema,
                },
                required: ['agreement'],
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
    controller.updateAgreement.bind(controller)
  );

  // GET /api/v1/agreements/:id/export-pdf
  fastify.get<{ Params: { id: string } }>(
    '/:id/export-pdf',
    {
      preHandler: [fastify.authenticate],
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
          },
          required: ['id'],
        },
      },
    },
    controller.exportPdf.bind(controller)
  );

  // POST /api/v1/agreements/:id/compile-profile
  if (opts.deviceProfilesService) {
    const deviceProfilesService = opts.deviceProfilesService;
    fastify.post<{ Params: { id: string }; Body: unknown }>(
      '/:id/compile-profile',
      {
        preHandler: [fastify.authenticate],
      },
      async (request, reply) => {
        const userId = request.user?.id;
        if (!userId) {
          return reply.status(401).send({
            success: false,
            error: {
              code: 'UNAUTHORIZED',
              message: 'Authentication required to compile profile.',
            },
          });
        }

        const parseResult = CompileProfileSchema.safeParse(request.body);
        if (!parseResult.success) {
          return reply.status(400).send({
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Invalid profile compilation configuration.',
              details: parseResult.error.issues.map((i) => ({
                field: i.path.join('.'),
                message: i.message,
              })),
            },
          });
        }

        const result = await deviceProfilesService.compileProfile(
          userId,
          request.params.id,
          parseResult.data
        );
        return reply.status(201).send({
          success: true,
          data: { profile: result },
        });
      }
    );
  }
};
