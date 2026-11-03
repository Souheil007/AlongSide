import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

export const SESSION_COOKIE_NAME = 'alongside_session';
export const SESSION_COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export interface AuthPluginOptions {
  jwtSecret: string;
  cookieSecret?: string;
}

export interface AuthUserPayload {
  id: string;
  userId: string;
  email: string;
  role: string;
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: AuthUserPayload;
    user: AuthUserPayload;
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
  interface FastifyReply {
    setSessionCookie: (token: string) => this;
    clearSessionCookie: () => this;
  }
}

const authPluginCallback: FastifyPluginAsync<AuthPluginOptions> = async (
  fastify,
  opts
) => {
  // Ensure @fastify/cookie is registered
  if (!fastify.hasPlugin('@fastify/cookie')) {
    await fastify.register(fastifyCookie, {
      secret: opts.cookieSecret || process.env.COOKIE_SECRET || 'dev_secret_cookie_signing_key_32_chars_min',
      hook: 'onRequest',
    });
  }

  // Register @fastify/jwt with cookie extraction support
  await fastify.register(fastifyJwt, {
    secret: opts.jwtSecret || process.env.JWT_SECRET || 'dev_jwt_secret_must_be_at_least_32_characters_long_for_security',
    cookie: {
      cookieName: SESSION_COOKIE_NAME,
      signed: false,
    },
    formatUser: (payload: any): AuthUserPayload => ({
      id: payload.id || payload.userId,
      userId: payload.userId || payload.id,
      email: payload.email,
      role: payload.role,
    }),
  });

  // Centralized authentication preHandler hook
  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      try {
        await request.jwtVerify();
      } catch {
        return reply.status(401).send({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Authentication required to access this resource.',
          },
        });
      }
    }
  );

  // Decorate Reply with helper methods for session cookie handling
  fastify.decorateReply('setSessionCookie', function (this: FastifyReply, token: string) {
    this.setCookie(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: SESSION_COOKIE_MAX_AGE,
    });
    return this;
  });

  fastify.decorateReply('clearSessionCookie', function (this: FastifyReply) {
    this.clearCookie(SESSION_COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
    return this;
  });
};

export const authPlugin = fp(authPluginCallback, {
  name: 'auth-plugin',
  fastify: '5.x',
});
