import type { FastifyPluginAsync } from 'fastify';
import type { ExploitSeverity } from '@alongside/shared';
import { DigestController } from './digest.controller.js';
import {
  type DigestRepository,
  PrismaDigestRepository,
} from './digest.repository.js';
import { DigestService } from './digest.service.js';

export interface DigestRoutesOptions {
  digestService?: DigestService;
  digestRepository?: DigestRepository;
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

const slangTermDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    term: { type: 'string' },
    definition: { type: 'string' },
    exampleSentence: { type: 'string' },
    contextTone: { type: 'string' },
  },
  required: ['id', 'term', 'definition', 'exampleSentence', 'contextTone'],
};

const exploitAlertDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    appName: { type: 'string' },
    exploitDescription: { type: 'string' },
    howKidsBypass: { type: 'string' },
    parentRemedy: { type: 'string' },
    severity: {
      type: 'string',
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    },
  },
  required: [
    'id',
    'appName',
    'exploitDescription',
    'howKidsBypass',
    'parentRemedy',
    'severity',
  ],
};

const cultureDigestDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    issueNumber: { type: 'number' },
    publishDate: { type: 'string' },
    title: { type: 'string' },
    summary: { type: 'string' },
    conversationStarter: { type: 'string' },
    slangTerms: {
      type: 'array',
      items: slangTermDtoSchema,
    },
    exploitAlerts: {
      type: 'array',
      items: exploitAlertDtoSchema,
    },
  },
  required: [
    'id',
    'issueNumber',
    'publishDate',
    'title',
    'summary',
    'conversationStarter',
    'slangTerms',
    'exploitAlerts',
  ],
};

export const digestRoutes: FastifyPluginAsync<DigestRoutesOptions> = async (
  fastify,
  opts
) => {
  const repository = opts.digestRepository ?? new PrismaDigestRepository();
  const service = opts.digestService ?? new DigestService(repository);
  const controller = new DigestController(service);

  // GET /api/v1/digest/latest - Get Latest Sunday Briefing Issue
  fastify.get(
    '/latest',
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
                  digest: cultureDigestDtoSchema,
                },
                required: ['digest'],
              },
            },
            required: ['success', 'data'],
          },
          404: errorResponseSchema,
        },
      },
    },
    controller.getLatest.bind(controller)
  );

  // GET /api/v1/digest/slang - Search Slang Terms
  fastify.get<{ Querystring: { term?: string; q?: string } }>(
    '/slang',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            term: { type: 'string' },
            q: { type: 'string' },
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
                  slangTerms: {
                    type: 'array',
                    items: slangTermDtoSchema,
                  },
                },
                required: ['slangTerms'],
              },
            },
            required: ['success', 'data'],
          },
        },
      },
    },
    controller.searchSlang.bind(controller)
  );

  // GET /api/v1/digest/exploits - List Exploit Early Warnings
  fastify.get<{ Querystring: { severity?: ExploitSeverity } }>(
    '/exploits',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            severity: {
              type: 'string',
              enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
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
                  exploitAlerts: {
                    type: 'array',
                    items: exploitAlertDtoSchema,
                  },
                },
                required: ['exploitAlerts'],
              },
            },
            required: ['success', 'data'],
          },
        },
      },
    },
    controller.getExploits.bind(controller)
  );
};
