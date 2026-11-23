import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  LessonPlaybookInputSchema,
  type AcademyCategory,
  type DevelopmentalTier,
  type LessonPlaybookInputDTO,
} from '@alongside/shared';
import type { AcademyService } from './academy.service.js';

export const PUBLIC_CATALOG_CACHE_CONTROL =
  'public, max-age=60, s-maxage=300, stale-while-revalidate=600';

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

    reply.header('Cache-Control', PUBLIC_CATALOG_CACHE_CONTROL);
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

    if (!userId) {
      reply.header('Cache-Control', PUBLIC_CATALOG_CACHE_CONTROL);
    }
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

    if (!userId) {
      reply.header('Cache-Control', PUBLIC_CATALOG_CACHE_CONTROL);
    }
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

  async getLessonBySlug(
    request: FastifyRequest<{
      Params: { slug: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { slug } = request.params;
    const userId = request.user?.id;

    const lesson = await this.service.getLessonBySlug(slug, userId);

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
      Body?: LessonPlaybookInputDTO;
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { id } = request.params;
    const userId = request.user.id;
    let playbookInput: LessonPlaybookInputDTO | undefined;

    if (request.body !== undefined && request.body !== null) {
      const parsed = LessonPlaybookInputSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid playbook input payload.',
            details: parsed.error.issues.map((issue) => ({
              field: issue.path.join('.'),
              message: issue.message,
            })),
          },
        });
      }
      playbookInput = parsed.data;
    }

    const result = await this.service.markLessonComplete(
      userId,
      id,
      playbookInput
    );

    return reply.status(200).send({
      success: true,
      data: result,
    });
  }

  async saveLessonPlaybook(
    request: FastifyRequest<{
      Params: { id: string };
      Body: LessonPlaybookInputDTO;
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { id } = request.params;
    const userId = request.user.id;
    const parsed = LessonPlaybookInputSchema.safeParse(request.body ?? {});

    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid playbook input payload.',
          details: parsed.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
      });
    }

    const playbookState = await this.service.saveLessonPlaybook(
      userId,
      id,
      parsed.data
    );

    return reply.status(200).send({
      success: true,
      data: {
        playbookState,
      },
    });
  }
}
