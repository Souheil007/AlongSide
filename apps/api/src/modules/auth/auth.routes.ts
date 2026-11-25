import type { FastifyPluginAsync } from 'fastify';
import type { ChildrenRepository } from '../children/children.repository.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import {
  type AuthRepository,
  PrismaAuthRepository,
} from './auth.repository.js';
import {
  type GoogleOAuthAdapter,
  StandardGoogleOAuthAdapter,
} from './google.oauth.js';

export interface AuthRoutesOptions {
  authService?: AuthService;
  authRepository?: AuthRepository;
  googleOAuthAdapter?: GoogleOAuthAdapter;
  childrenRepository?: ChildrenRepository;
  stateSecret?: string;
  apiPublicUrl?: string;
  appPublicUrl?: string;
}

const userDtoSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    email: { type: 'string' },
    fullName: { type: 'string' },
    role: { type: 'string' },
    createdAt: { type: 'string' },
    subscription: {
      type: ['object', 'null'],
      properties: {
        tier: { type: 'string' },
        isActive: { type: 'boolean' },
        trialEndsAt: { type: ['string', 'null'] },
        currentPeriodEnd: { type: ['string', 'null'] },
      },
      required: ['tier', 'isActive'],
    },
    childrenCount: { type: 'number' },
    isDemo: { type: 'boolean' },
  },
  required: ['id', 'email', 'fullName', 'role', 'createdAt', 'childrenCount'],
};

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

export const authRoutes: FastifyPluginAsync<AuthRoutesOptions> = async (
  fastify,
  opts
) => {
  const repository = opts.authRepository ?? new PrismaAuthRepository();
  const googleOAuthAdapter =
    opts.googleOAuthAdapter ?? new StandardGoogleOAuthAdapter();

  const service =
    opts.authService ??
    new AuthService(
      repository,
      {
        sign: (payload, signOpts) =>
          fastify.jwt.sign(payload, {
            expiresIn: signOpts?.expiresIn ?? '7d',
          }),
      },
      {
        childrenRepository: opts.childrenRepository,
      }
    );

  const controller = new AuthController(service, {
    googleOAuthAdapter,
    stateSecret: opts.stateSecret,
    apiPublicUrl: opts.apiPublicUrl,
    appPublicUrl: opts.appPublicUrl,
  });

  fastify.get(
    '/providers',
    {
      schema: {
        description: 'List active authentication methods',
        tags: ['Auth'],
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  google: { type: 'boolean' },
                  demo: { type: 'boolean' },
                  emailPassword: { type: 'boolean' },
                },
                required: ['google', 'demo', 'emailPassword'],
              },
            },
            required: ['success', 'data'],
          },
        },
      },
    },
    controller.providers.bind(controller)
  );

  fastify.get(
    '/google',
    {
      schema: {
        description: 'Initiate Google OAuth 2.0 PKCE authentication flow',
        tags: ['Auth'],
      },
    },
    controller.googleStart.bind(controller)
  );

  fastify.get(
    '/google/callback',
    {
      schema: {
        description: 'Complete Google OAuth 2.0 callback and set session cookie',
        tags: ['Auth'],
      },
    },
    controller.googleCallback.bind(controller)
  );

  fastify.post(
    '/demo',
    {
      schema: {
        description: 'Start a read-only Live Demo session with a sample family',
        tags: ['Auth'],
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  user: userDtoSchema,
                },
                required: ['user'],
              },
            },
            required: ['success', 'data'],
          },
        },
      },
    },
    controller.demo.bind(controller)
  );

  fastify.post(
    '/register',
    {
      schema: {
        description: 'Register a new parent account and initialize 7-day trial',
        tags: ['Auth'],
        body: {
          type: 'object',
          required: ['email', 'password', 'fullName'],
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
            fullName: { type: 'string' },
          },
        },
        response: {
          201: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  user: userDtoSchema,
                },
                required: ['user'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
          409: errorResponseSchema,
        },
      },
    },
    controller.register.bind(controller)
  );

  fastify.post(
    '/login',
    {
      schema: {
        description: 'Log in with email and password to receive session cookie',
        tags: ['Auth'],
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
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
                  user: userDtoSchema,
                },
                required: ['user'],
              },
            },
            required: ['success', 'data'],
          },
          400: errorResponseSchema,
          401: errorResponseSchema,
        },
      },
    },
    controller.login.bind(controller)
  );

  fastify.post(
    '/logout',
    {
      schema: {
        description: 'Log out and invalidate session cookie',
        tags: ['Auth'],
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  message: { type: 'string' },
                },
              },
            },
            required: ['success'],
          },
        },
      },
    },
    controller.logout.bind(controller)
  );

  fastify.get(
    '/me',
    {
      preHandler: [fastify.authenticate],
      schema: {
        description: 'Get current authenticated parent profile and subscription details',
        tags: ['Auth'],
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean', enum: [true] },
              data: {
                type: 'object',
                properties: {
                  user: userDtoSchema,
                },
                required: ['user'],
              },
            },
            required: ['success', 'data'],
          },
          401: errorResponseSchema,
          404: errorResponseSchema,
        },
      },
    },
    controller.me.bind(controller)
  );
};
