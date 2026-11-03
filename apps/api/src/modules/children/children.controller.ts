import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  CreateChildSchema,
  SubmitReadinessAssessmentSchema,
  UpdateChildSchema,
} from '@alongside/shared';
import { ChildNotFoundError, type ChildrenService } from './children.service.js';

interface ChildParams {
  id: string;
}

export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const userId = request.user?.id || request.user?.userId;
    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to access this resource.',
        },
      });
    }

    const parseResult = CreateChildSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input provided.',
          details: parseResult.error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
      });
    }

    const child = await this.childrenService.createChild(userId, parseResult.data);
    return reply.status(201).send({
      success: true,
      data: {
        child,
      },
    });
  }

  async list(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const userId = request.user?.id || request.user?.userId;
    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to access this resource.',
        },
      });
    }

    const children = await this.childrenService.getChildrenByUserId(userId);
    return reply.status(200).send({
      success: true,
      data: {
        children,
      },
    });
  }

  async getById(
    request: FastifyRequest<{ Params: ChildParams }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.user?.id || request.user?.userId;
    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to access this resource.',
        },
      });
    }

    try {
      const child = await this.childrenService.getChildById(userId, request.params.id);
      return reply.status(200).send({
        success: true,
        data: {
          child,
        },
      });
    } catch (error) {
      if (error instanceof ChildNotFoundError) {
        return reply.status(404).send({
          success: false,
          error: {
            code: error.code || 'NOT_FOUND',
            message: error.message,
          },
        });
      }
      throw error;
    }
  }

  async update(
    request: FastifyRequest<{ Params: ChildParams }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.user?.id || request.user?.userId;
    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to access this resource.',
        },
      });
    }

    const parseResult = UpdateChildSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input provided.',
          details: parseResult.error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
      });
    }

    try {
      const child = await this.childrenService.updateChild(
        userId,
        request.params.id,
        parseResult.data
      );
      return reply.status(200).send({
        success: true,
        data: {
          child,
        },
      });
    } catch (error) {
      if (error instanceof ChildNotFoundError) {
        return reply.status(404).send({
          success: false,
          error: {
            code: error.code || 'NOT_FOUND',
            message: error.message,
          },
        });
      }
      throw error;
    }
  }

  async delete(
    request: FastifyRequest<{ Params: ChildParams }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.user?.id || request.user?.userId;
    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to access this resource.',
        },
      });
    }

    try {
      const result = await this.childrenService.deleteChild(userId, request.params.id);
      return reply.status(200).send({
        success: true,
        data: {
          message: 'Child profile deleted successfully.',
          id: result.id,
        },
      });
    } catch (error) {
      if (error instanceof ChildNotFoundError) {
        return reply.status(404).send({
          success: false,
          error: {
            code: error.code || 'NOT_FOUND',
            message: error.message,
          },
        });
      }
      throw error;
    }
  }

  async submitReadinessAssessment(
    request: FastifyRequest<{ Params: ChildParams }>,
    reply: FastifyReply
  ): Promise<void> {
    const userId = request.user?.id || request.user?.userId;
    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to access this resource.',
        },
      });
    }

    const parseResult = SubmitReadinessAssessmentSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input provided.',
          details: parseResult.error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
      });
    }

    try {
      const result = await this.childrenService.submitReadinessAssessment(
        userId,
        request.params.id,
        parseResult.data
      );

      return reply.status(201).send({
        success: true,
        data: result,
      });
    } catch (error) {
      if (error instanceof ChildNotFoundError) {
        return reply.status(404).send({
          success: false,
          error: {
            code: error.code || 'NOT_FOUND',
            message: error.message,
          },
        });
      }
      throw error;
    }
  }
}
