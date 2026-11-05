import type { FastifyReply, FastifyRequest } from 'fastify';
import type { AcademyCategory, DevelopmentalTier } from '@alongside/shared';
import type { AcademyService } from './academy.service.js';

export class AcademyController {
  constructor(private readonly service: AcademyService) {}

  async listCategories(
    request: FastifyRequest<{
      Querystring: { tier?: DevelopmentalTier };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { tier } = request.query;
    const categories = await this.service.getCategoriesWithStats(tier);

    return reply.status(200).send({
      success: true,
      data: {
        categories,
      },
    });
  }

  async listModules(
    request: FastifyRequest<{
      Querystring: { category?: AcademyCategory; tier?: DevelopmentalTier };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { category, tier } = request.query;
    const userId = request.user?.id;

    const modules = await this.service.getModules({ category, tier }, userId);

    return reply.status(200).send({
      success: true,
      data: {
        modules,
      },
    });
  }

  async getModuleBySlug(
    request: FastifyRequest<{
      Params: { slug: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { slug } = request.params;
    const userId = request.user?.id;

    const moduleDetail = await this.service.getModuleBySlug(slug, userId);

    return reply.status(200).send({
      success: true,
      data: {
        module: moduleDetail,
      },
    });
  }

  async getLessonById(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { id } = request.params;
    const userId = request.user?.id;

    const lesson = await this.service.getLessonById(id, userId);

    return reply.status(200).send({
      success: true,
      data: {
        lesson,
      },
    });
  }

  async markLessonComplete(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { id } = request.params;
    const userId = request.user.id;

    const result = await this.service.markLessonComplete(userId, id);

    return reply.status(200).send({
      success: true,
      data: result,
    });
  }
}
