import type { FastifyReply, FastifyRequest } from 'fastify';
import type { DevelopmentalTier, RoadType } from '@alongside/shared';
import type { FaqsService } from './faqs.service.js';

export class FaqsController {
  constructor(private readonly service: FaqsService) {}

  async listCategories(
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const categories = await this.service.getCategories();
    return reply.status(200).send({
      success: true,
      data: {
        categories,
      },
    });
  }

  async listFaqs(
    request: FastifyRequest<{
      Querystring: {
        q?: string;
        category?: string;
        tier?: DevelopmentalTier;
        road?: RoadType;
        limit?: number;
        offset?: number;
      };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { q, category, tier, road, limit, offset } = request.query;

    const result = await this.service.getFaqs({
      q,
      category,
      tier,
      road,
      limit: limit ? Number(limit) : 20,
      offset: offset ? Number(offset) : 0,
    });

    return reply.status(200).send({
      success: true,
      data: result,
    });
  }

  async getFaqById(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { id } = request.params;
    const faq = await this.service.getFaqById(id);

    if (!faq) {
      return reply.status(404).send({
        success: false,
        error: {
          code: 'FAQ_NOT_FOUND',
          message: `FAQ with ID '${id}' was not found.`,
        },
      });
    }

    return reply.status(200).send({
      success: true,
      data: {
        faq,
      },
    });
  }
}
