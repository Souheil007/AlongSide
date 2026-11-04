import type { FastifyPluginAsync } from 'fastify';
import {
  type HealthRepository,
  PrismaHealthRepository,
} from './health.repository.js';
import {
  type PediatricTriageEngine,
  BartonSchmittTriageAdapter,
} from './triage.engine.js';
import { HealthService } from './health.service.js';
import {
  type ChildrenRepository,
  PrismaChildrenRepository,
} from '../children/children.repository.js';
import {
  SymptomTriageInputSchema,
  LogHealthEventSchema,
} from '@alongside/shared';

export interface HealthRoutesOptions {
  healthRepository?: HealthRepository;
  triageEngine?: PediatricTriageEngine;
  healthService?: HealthService;
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

const triageResultSchema = {
  type: 'object',
  properties: {
    zone: { type: 'string', enum: ['RED', 'YELLOW', 'GREEN'] },
    requiresEmergency911: { type: 'boolean' },
    conditionSuspected: { type: 'string' },
    clinicalRationale: { type: 'string' },
    immediateActions: { type: 'array', items: { type: 'string' } },
    homeCareMeasures: { type: 'array', items: { type: 'string' } },
    redFlagWarnings: { type: 'array', items: { type: 'string' } },
    recommendedDosing: {
      type: ['object', 'null'],
      properties: {
        medication: { type: 'string' },
        dosageMg: { type: 'number' },
        frequency: { type: 'string' },
        notes: { type: 'string' },
      },
    },
    clinicalAuthority: { type: 'string' },
  },
  required: [
    'zone',
    'requiresEmergency911',
    'conditionSuspected',
    'clinicalRationale',
    'immediateActions',
    'clinicalAuthority',
  ],
};

const protocolDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    slug: { type: 'string' },
    title: { type: 'string' },
    summary: { type: 'string' },
    targetTiers: { type: 'array', items: { type: 'string' } },
    redFlags: { type: 'array', items: { type: 'string' } },
    yellowFlags: { type: 'array', items: { type: 'string' } },
    greenHomeCare: { type: 'array', items: { type: 'string' } },
    contraindications: { type: 'array', items: { type: 'string' } },
    clinicalAuthority: { type: 'string' },
  },
  required: ['id', 'slug', 'title', 'summary', 'redFlags', 'yellowFlags', 'greenHomeCare'],
};

const healthLogDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    childId: { type: 'string' },
    protocolId: { type: ['string', 'null'] },
    symptomTitle: { type: 'string' },
    temperatureF: { type: ['number', 'null'] },
    triageZone: { type: 'string', enum: ['RED', 'YELLOW', 'GREEN'] },
    clinicalNotes: { type: ['string', 'null'] },
    actionTaken: { type: ['string', 'null'] },
    loggedAt: { type: 'string' },
  },
  required: ['id', 'childId', 'symptomTitle', 'triageZone', 'loggedAt'],
};

export const healthRoutes: FastifyPluginAsync<HealthRoutesOptions> = async (
  fastify,
  opts
) => {
  const repository =
    opts.healthRepository ?? new PrismaHealthRepository();
  const triageEngine =
    opts.triageEngine ?? new BartonSchmittTriageAdapter();
  const childrenRepo =
    opts.childrenRepository ?? new PrismaChildrenRepository();
  const service =
    opts.healthService ?? new HealthService(repository, triageEngine, childrenRepo);

  // System Health Check (Maintains backwards compatibility with PLAN-01 / health check)
  fastify.get(
    '/',
    {
      schema: {
        description: 'Health check endpoint returning service status and uptime',
        tags: ['Health'],
        response: {
          200: {
            type: 'object',
            properties: {
              status: { type: 'string' },
              uptime: { type: 'number' },
              timestamp: { type: 'string' },
            },
            required: ['status', 'uptime', 'timestamp'],
          },
        },
      },
    },
    async (_request, reply) => {
      return reply.status(200).send({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      });
    }
  );

  // POST /api/v1/health/triage
  fastify.post(
    '/triage',
    {
      schema: {
        description: 'Execute Barton Schmitt & AAP pediatric symptom triage assessment',
        tags: ['Health'],
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  triageResult: triageResultSchema,
                },
                required: ['triageResult'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const parsed = SymptomTriageInputSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid symptom triage payload',
            details: parsed.error.issues,
          },
        });
      }

      const triageResult = await service.evaluateTriage(parsed.data);

      return reply.status(200).send({
        success: true,
        data: { triageResult },
      });
    }
  );

  // GET /api/v1/health/protocols
  fastify.get(
    '/protocols',
    {
      schema: {
        description: 'List canonical pediatric symptom protocols and clinical decision trees',
        tags: ['Health'],
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  protocols: {
                    type: 'array',
                    items: protocolDtoSchema,
                  },
                },
                required: ['protocols'],
              },
            },
            required: ['success', 'data'],
          },
        },
      },
    },
    async (_request, reply) => {
      const protocols = await service.getProtocols();
      return reply.status(200).send({
        success: true,
        data: { protocols },
      });
    }
  );

  // GET /api/v1/health/protocols/:slug
  fastify.get(
    '/protocols/:slug',
    {
      schema: {
        description: 'Get individual symptom protocol by slug',
        tags: ['Health'],
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
                  protocol: protocolDtoSchema,
                },
                required: ['protocol'],
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
      const protocol = await service.getProtocolBySlug(slug);
      if (!protocol) {
        return reply.status(404).send({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: `Protocol with slug '${slug}' not found`,
          },
        });
      }

      return reply.status(200).send({
        success: true,
        data: { protocol },
      });
    }
  );

  // GET /api/v1/health/children/:childId/health-logs
  fastify.get(
    '/children/:childId/health-logs',
    {
      schema: {
        description: 'Retrieve child pediatric health logs',
        tags: ['Health'],
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
                  healthLogs: {
                    type: 'array',
                    items: healthLogDtoSchema,
                  },
                },
                required: ['healthLogs'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { childId } = request.params as { childId: string };
      const healthLogs = await service.getChildHealthLogs(childId);
      return reply.status(200).send({
        success: true,
        data: { healthLogs },
      });
    }
  );

  // POST /api/v1/health/children/:childId/health-logs
  fastify.post(
    '/children/:childId/health-logs',
    {
      schema: {
        description: 'Log a new pediatric health event or symptom triage outcome',
        tags: ['Health'],
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
                  healthLog: healthLogDtoSchema,
                },
                required: ['healthLog'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
        },
      },
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

      const healthLog = await service.createChildHealthLog(childId, parsed.data);
      return reply.status(200).send({
        success: true,
        data: { healthLog },
      });
    }
  );
};
