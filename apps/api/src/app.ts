import fastify, {
  type FastifyError,
  type FastifyInstance,
  type FastifyServerOptions,
} from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import sensible from '@fastify/sensible';
import { authPlugin } from './plugins/auth.plugin.js';
import { healthRoutes } from './modules/health/health.routes.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import {
  type AuthRepository,
  PrismaAuthRepository,
} from './modules/auth/auth.repository.js';
import { childrenRoutes } from './modules/children/children.routes.js';
import {
  type ChildrenRepository,
  PrismaChildrenRepository,
} from './modules/children/children.repository.js';
import { ChildrenService } from './modules/children/children.service.js';

export interface AppOptions extends FastifyServerOptions {
  corsOrigin?: string;
  cookieSecret?: string;
  jwtSecret?: string;
  authRepository?: AuthRepository;
  childrenRepository?: ChildrenRepository;
  childrenService?: ChildrenService;
}

export async function buildApp(opts: AppOptions = {}): Promise<FastifyInstance> {
  const {
    corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000',
    cookieSecret = process.env.COOKIE_SECRET || 'dev_secret_cookie_signing_key_32_chars_min',
    jwtSecret = process.env.JWT_SECRET || 'dev_jwt_secret_must_be_at_least_32_characters_long_for_security',
    authRepository,
    childrenRepository,
    childrenService,
    ...fastifyOpts
  } = opts;

  const app = fastify({
    logger: true,
    ...fastifyOpts,
  });

  // Cross-Origin Resource Sharing
  await app.register(cors, {
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // Cookie management with signing support
  await app.register(cookie, {
    secret: cookieSecret,
    hook: 'onRequest',
  });

  // Authentication Plugin (JWT & session cookie helpers)
  await app.register(authPlugin, {
    jwtSecret,
    cookieSecret,
  });

  // Fastify Sensible for standard HTTP errors and utility helpers
  await app.register(sensible);

  // Centralized Error Handler (Alongside RFC 7807 Standard Error Envelope)
  app.setErrorHandler((error: FastifyError, request, reply) => {
    request.log.error({ err: error }, 'Unhandled request error');

    if (error.validation) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input provided.',
          details: error.validation.map((v) => ({
            field: v.instancePath?.replace(/^\//, '') || undefined,
            message: v.message || 'Validation failed',
          })),
        },
      });
    }

    const statusCode =
      typeof error.statusCode === 'number' && error.statusCode >= 400 && error.statusCode < 600
        ? error.statusCode
        : 500;

    return reply.status(statusCode).send({
      success: false,
      error: {
        code: error.code || (statusCode === 500 ? 'INTERNAL_SERVER_ERROR' : 'REQUEST_ERROR'),
        message: statusCode === 500 ? 'An unexpected internal error occurred.' : error.message,
      },
    });
  });

  const resolvedAuthRepository = authRepository ?? new PrismaAuthRepository();
  const resolvedChildrenRepository = childrenRepository ?? new PrismaChildrenRepository();
  const resolvedChildrenService =
    childrenService ?? new ChildrenService(resolvedChildrenRepository);

  // Register domain route plugins with /api/v1 prefixes
  await app.register(healthRoutes, { prefix: '/api/v1/health' });
  await app.register(authRoutes, {
    prefix: '/api/v1/auth',
    authRepository: resolvedAuthRepository,
  });
  await app.register(childrenRoutes, {
    prefix: '/api/v1/children',
    childrenRepository: resolvedChildrenRepository,
    childrenService: resolvedChildrenService,
  });

  return app;
}
