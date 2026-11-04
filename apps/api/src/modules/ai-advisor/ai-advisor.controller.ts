import type { FastifyReply, FastifyRequest } from 'fastify';
import type { AiChatRequestInput } from '@alongside/shared';
import type { AiAdvisorService } from './ai-advisor.service.js';

export class AiAdvisorController {
  constructor(private readonly service: AiAdvisorService) {}

  async streamChat(
    request: FastifyRequest<{
      Body: AiChatRequestInput;
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.user?.id;
    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to access the AI Child Advisor.',
        },
      });
    }

    const { childId, conversationId, message } = request.body;

    try {
      const session = await this.service.startOrContinueChat(userId, {
        childId,
        conversationId,
        message,
      });

      // Verify stream starts before hijacking/sending SSE headers
      const iterator = session.tokenStream[Symbol.asyncIterator]();
      const first = await iterator.next();

      // Hijack response for SSE streaming
      reply.hijack();
      const rawRes = reply.raw;

      rawRes.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      rawRes.setHeader('Cache-Control', 'no-cache, no-transform');
      rawRes.setHeader('Connection', 'keep-alive');
      rawRes.setHeader('X-Accel-Buffering', 'no');
      rawRes.flushHeaders?.();

      // 1. Emit Context Event
      const contextEvent = {
        type: 'context',
        matchedFaqs: session.matchedFaqs.map((f) => ({
          id: f.id,
          question: f.question,
          categorySlug: f.categorySlug,
          deEscalationScript: f.deEscalationScript,
        })),
        childContext: session.childContext,
      };
      rawRes.write(`data: ${JSON.stringify(contextEvent)}\n\n`);

      // 2. Stream Tokens
      let fullContent = '';
      if (!first.done && typeof first.value === 'string') {
        fullContent += first.value;
        const firstTokenEvent = {
          type: 'token',
          content: first.value,
        };
        rawRes.write(`data: ${JSON.stringify(firstTokenEvent)}\n\n`);
      }

      while (true) {
        const { done, value } = await iterator.next();
        if (done) break;
        fullContent += value;
        const tokenEvent = {
          type: 'token',
          content: value,
        };
        rawRes.write(`data: ${JSON.stringify(tokenEvent)}\n\n`);
      }

      // 3. Persist AI message and emit Done Event
      const approximateTokens = Math.ceil(fullContent.length / 4);
      const savedMessage = await session.saveAssistantResponse(
        fullContent,
        approximateTokens
      );

      const doneEvent = {
        type: 'done',
        conversationId: session.conversationId,
        messageId: savedMessage.id,
        tokensUsed: approximateTokens,
      };
      rawRes.write(`data: ${JSON.stringify(doneEvent)}\n\n`);
      rawRes.end();
    } catch (err: any) {
      request.log.error({ err }, 'Error in AI Advisor chat stream');

      if (!reply.raw.headersSent) {
        const statusCode = err.statusCode || 500;
        return reply.status(statusCode).send({
          success: false,
          error: {
            code: err.code || 'AI_ADVISOR_STREAM_ERROR',
            message:
              err.message || 'An error occurred while streaming AI guidance.',
          },
        });
      }

      // If headers already sent, write SSE error event and end
      const errorEvent = {
        type: 'error',
        code: err.code || 'AI_ADVISOR_STREAM_ERROR',
        message:
          err.message || 'An error occurred while streaming AI guidance.',
      };
      reply.raw.write(`data: ${JSON.stringify(errorEvent)}\n\n`);
      reply.raw.end();
    }
  }

  async listConversations(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.user?.id;
    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required.',
        },
      });
    }

    const conversations = await this.service.listConversations(userId);
    return reply.status(200).send({
      success: true,
      data: {
        conversations,
      },
    });
  }

  async getConversation(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.user?.id;
    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required.',
        },
      });
    }

    const { id } = request.params;
    const conversation = await this.service.getConversation(id, userId);

    if (!conversation) {
      return reply.status(404).send({
        success: false,
        error: {
          code: 'CONVERSATION_NOT_FOUND',
          message: `Conversation with ID '${id}' was not found.`,
        },
      });
    }

    return reply.status(200).send({
      success: true,
      data: {
        conversation,
      },
    });
  }
}
