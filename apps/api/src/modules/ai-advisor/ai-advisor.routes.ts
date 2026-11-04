import type { FastifyPluginAsync } from 'fastify';
import type { AiChatRequestInput } from '@alongside/shared';
import { AiAdvisorController } from './ai-advisor.controller.js';
import {
  type AiAdvisorRepository,
  PrismaAiAdvisorRepository,
} from './ai-advisor.repository.js';
import { AiAdvisorService } from './ai-advisor.service.js';
import { FaqRetrievalService } from './embedding.service.js';
import {
  type FaqRepository,
  PrismaFaqRepository,
} from '../faqs/faqs.repository.js';
import { MultiProviderLlmOrchestrator } from './adapters/llm-orchestrator.js';
import {
  type ChildrenRepository,
  PrismaChildrenRepository,
} from '../children/children.repository.js';

export interface AiAdvisorRoutesOptions {
  aiAdvisorRepository?: AiAdvisorRepository;
  aiAdvisorService?: AiAdvisorService;
  faqRepository?: FaqRepository;
  childrenRepository?: ChildrenRepository;
  llmOrchestrator?: MultiProviderLlmOrchestrator;
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

const aiMessageDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    conversationId: { type: 'string' },
    role: { type: 'string', enum: ['USER', 'ASSISTANT', 'SYSTEM'] },
    content: { type: 'string' },
    matchedFaqIds: { type: 'array', items: { type: 'string' } },
    tokensUsed: { type: 'number' },
    createdAt: { type: 'string' },
  },
  required: ['id', 'conversationId', 'role', 'content'],
};

const aiConversationDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    userId: { type: 'string' },
    childId: { type: ['string', 'null'] },
    title: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    messages: {
      type: 'array',
      items: aiMessageDtoSchema,
    },
  },
  required: ['id', 'userId', 'title'],
};

export const aiAdvisorRoutes: FastifyPluginAsync<AiAdvisorRoutesOptions> = async (
  fastify,
  opts
) => {
  const repository =
    opts.aiAdvisorRepository ?? new PrismaAiAdvisorRepository();
  const faqRepo = opts.faqRepository ?? new PrismaFaqRepository();
  const childrenRepo =
    opts.childrenRepository ?? new PrismaChildrenRepository();
  const llmOrchestrator =
    opts.llmOrchestrator ??
    new MultiProviderLlmOrchestrator({ logger: fastify.log });
  const retrievalService = new FaqRetrievalService(faqRepo);

  const service =
    opts.aiAdvisorService ??
    new AiAdvisorService(
      repository,
      retrievalService,
      llmOrchestrator,
      childrenRepo
    );

  const controller = new AiAdvisorController(service);

  // POST /api/v1/ai-advisor/chat - Streaming SSE AI Advice
  fastify.post<{
    Body: AiChatRequestInput;
  }>(
    '/chat',
    {
      preHandler: [fastify.authenticate],
      schema: {
        body: {
          type: 'object',
          required: ['message'],
          properties: {
            childId: { type: 'string' },
            conversationId: { type: 'string' },
            message: { type: 'string', minLength: 1, maxLength: 4000 },
          },
        },
        response: {
          401: errorResponseSchema,
          '5xx': errorResponseSchema,
        },
      },
    },
    controller.streamChat.bind(controller)
  );

  // GET /api/v1/ai-advisor/conversations - List Parent's Conversations
  fastify.get(
    '/conversations',
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
                  conversations: {
                    type: 'array',
                    items: aiConversationDtoSchema,
                  },
                },
                required: ['conversations'],
              },
            },
            required: ['success', 'data'],
          },
          401: errorResponseSchema,
        },
      },
    },
    controller.listConversations.bind(controller)
  );

  // GET /api/v1/ai-advisor/conversations/:id - Get Conversation with History
  fastify.get<{
    Params: { id: string };
  }>(
    '/conversations/:id',
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
                  conversation: aiConversationDtoSchema,
                },
                required: ['conversation'],
              },
            },
            required: ['success', 'data'],
          },
          401: errorResponseSchema,
          404: errorResponseSchema,
        },
      },
    },
    controller.getConversation.bind(controller)
  );
};
