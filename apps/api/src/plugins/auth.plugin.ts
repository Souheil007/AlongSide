import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

export const SESSION_COOKIE_NAME = 'alongside_session';
export const SESSION_COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

// In-memory token revocation registry for revoked/logged-out JWT sessions
const revokedTokens = new Set<string>();

export function revokeToken(token: string): void {
  if (token) {
    revokedTokens.add(token.trim());
  }
}

export function isTokenRevoked(token: string): boolean {
  if (!token) return false;
  return revokedTokens.has(token.trim());
}

export function clearRevokedTokens(): void {
  revokedTokens.clear();
}

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

  // Centralized authentication preHandler hook with revocation verification
  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      // Check for token revocation before proceeding
      const cookieToken = request.cookies[SESSION_COOKIE_NAME];
      const authHeader = request.headers.authorization;
      const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
      const rawToken = cookieToken || bearerToken;

      if (rawToken && isTokenRevoked(rawToken)) {
        return reply.status(401).send({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Session has been revoked. Please log in again.',
          },
        });
      }

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
    const isProduction = process.env.NODE_ENV === 'production';
    const sameSites: ('strict' | 'lax')[] = ['strict', 'lax'];
    const domains = [undefined, 'localhost', '127.0.0.1'];

    // Emit comprehensive cookie clearance headers matching any potential domain/samesite combination
    for (const sameSite of sameSites) {
      for (const domain of domains) {
        this.clearCookie(SESSION_COOKIE_NAME, {
          httpOnly: true,
          secure: isProduction,
          sameSite,
          path: '/',
          ...(domain ? { domain } : {}),
        });
      }
    }

    this.header('Clear-Site-Data', '"cookies", "storage"');
    this.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return this;
  });
};

export const authPlugin = fp(authPluginCallback, {
  name: 'auth-plugin',
  fastify: '5.x',
});
