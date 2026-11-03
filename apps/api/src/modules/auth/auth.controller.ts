import type { FastifyReply, FastifyRequest } from 'fastify';
import { LoginUserSchema, RegisterUserSchema } from '@alongside/shared';
import type { AuthService } from './auth.service.js';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const parseResult = RegisterUserSchema.safeParse(request.body);
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

    const result = await this.authService.register(parseResult.data);
    const token =
      result.token ||
      request.server.jwt.sign(result.tokenPayload, {
        expiresIn: '7d',
      });

    reply.setSessionCookie(token);
    return reply.status(201).send({
      success: true,
      data: {
        user: result.user,
      },
    });
  }

  async login(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const parseResult = LoginUserSchema.safeParse(request.body);
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

    const result = await this.authService.login(parseResult.data);
    const token =
      result.token ||
      request.server.jwt.sign(result.tokenPayload, {
        expiresIn: '7d',
      });

    reply.setSessionCookie(token);
    return reply.status(200).send({
      success: true,
      data: {
        user: result.user,
      },
    });
  }

  async logout(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    reply.clearSessionCookie();
    return reply.status(200).send({
      success: true,
      data: {
        message: 'Logged out successfully',
      },
    });
  }

  async me(request: FastifyRequest, reply: FastifyReply): Promise<void> {
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

    const user = await this.authService.getProfile(userId);
    return reply.status(200).send({
      success: true,
      data: {
        user,
      },
    });
  }
}
