import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  LoginUserSchema,
  RegisterUserSchema,
} from '@alongside/shared';
import type { AuthService } from './auth.service.js';
import {
  signOAuthStateToken,
  verifyOAuthStateToken,
} from './auth.security.js';
import {
  type GoogleOAuthAdapter,
  generateOAuthState,
  generatePkcePair,
} from './google.oauth.js';
import { revokeToken, SESSION_COOKIE_NAME } from '../../plugins/auth.plugin.js';

const GOOGLE_OAUTH_COOKIE_NAME = 'alongside_google_oauth';

export interface AuthControllerConfig {
  googleOAuthAdapter?: GoogleOAuthAdapter;
  stateSecret?: string;
  apiPublicUrl?: string;
  appPublicUrl?: string;
  isProduction?: boolean;
}

export class AuthController {
  private readonly googleOAuthAdapter?: GoogleOAuthAdapter;
  private readonly stateSecret: string;
  private readonly apiPublicUrl?: string;
  private readonly appPublicUrl?: string;
  private readonly isProduction: boolean;

  constructor(
    private readonly authService: AuthService,
    config: AuthControllerConfig = {}
  ) {
    this.googleOAuthAdapter = config.googleOAuthAdapter;
    this.stateSecret =
      config.stateSecret ||
      process.env.JWT_SECRET ||
      'dev_jwt_secret_must_be_at_least_32_characters_long_for_security';
    this.apiPublicUrl = config.apiPublicUrl;
    this.appPublicUrl = config.appPublicUrl;
    this.isProduction = config.isProduction ?? process.env.NODE_ENV === 'production';
  }

  private resolveAppPublicUrl(): string {
    const configured =
      this.appPublicUrl ||
      process.env.APP_PUBLIC_URL?.trim() ||
      process.env.NEXT_PUBLIC_APP_URL?.trim();
    if (configured) {
      return configured.replace(/\/$/, '');
    }
    const corsOrigin = process.env.CORS_ORIGIN?.split(',')[0]?.trim();
    if (corsOrigin && corsOrigin !== '*') {
      return corsOrigin.replace(/\/$/, '');
    }
    return 'http://localhost:3000';
  }

  private resolveGoogleCallbackUri(request: FastifyRequest): string {
    const base =
      this.apiPublicUrl ||
      process.env.API_PUBLIC_URL?.trim() ||
      `${request.protocol}://${request.headers.host || 'localhost:4000'}`;
    return `${base.replace(/\/$/, '')}/api/v1/auth/google/callback`;
  }

  async providers(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const googleConfigured = Boolean(this.googleOAuthAdapter?.isConfigured());
    return reply.status(200).send({
      success: true,
      data: this.authService.getProviders(googleConfigured),
    });
  }

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

  async googleStart(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    if (!this.googleOAuthAdapter?.isConfigured()) {
      return reply.status(503).send({
        success: false,
        error: {
          code: 'GOOGLE_OAUTH_UNCONFIGURED',
          message: 'Google sign-in is not configured.',
        },
      });
    }

    const state = generateOAuthState();
    const { codeVerifier, codeChallenge } = generatePkcePair();
    const redirectUri = this.resolveGoogleCallbackUri(request);

    const stateToken = signOAuthStateToken(
      { state, codeVerifier },
      this.stateSecret
    );

    reply.setCookie(GOOGLE_OAUTH_COOKIE_NAME, stateToken, {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 600,
    });

    const authUrl = this.googleOAuthAdapter.buildAuthorizationUrl({
      state,
      codeChallenge,
      redirectUri,
    });

    return reply.redirect(authUrl);
  }

  async googleCallback(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const appUrl = this.resolveAppPublicUrl();
    const query = (request.query || {}) as {
      code?: string;
      state?: string;
      error?: string;
    };

    const failRedirect = () => {
      reply.clearCookie(GOOGLE_OAUTH_COOKIE_NAME, { path: '/' });
      return reply.redirect(`${appUrl}/login?error=google_auth_failed`);
    };

    if (!this.googleOAuthAdapter?.isConfigured()) {
      return failRedirect();
    }

    if (query.error || !query.code || !query.state) {
      return failRedirect();
    }

    const stateCookie = request.cookies[GOOGLE_OAUTH_COOKIE_NAME];
    if (!stateCookie) {
      return failRedirect();
    }

    const verifiedCookie = verifyOAuthStateToken(stateCookie, this.stateSecret);
    if (!verifiedCookie || verifiedCookie.state !== query.state) {
      return failRedirect();
    }

    try {
      const profile = await this.googleOAuthAdapter.exchangeCodeForProfile({
        code: query.code,
        codeVerifier: verifiedCookie.codeVerifier,
        redirectUri: this.resolveGoogleCallbackUri(request),
      });

      const result = await this.authService.authenticateWithGoogleProfile(profile);
      const sessionToken =
        result.token ||
        request.server.jwt.sign(result.tokenPayload, {
          expiresIn: '7d',
        });

      reply.clearCookie(GOOGLE_OAUTH_COOKIE_NAME, { path: '/' });
      reply.setSessionCookie(sessionToken);

      const destination =
        !result.user.childrenCount || result.user.childrenCount === 0
          ? '/children/new'
          : '/dashboard';
      return reply.redirect(`${appUrl}${destination}`);
    } catch {
      return failRedirect();
    }
  }

  async demo(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const result = await this.authService.enterDemoSession();
    const token =
      result.token ||
      request.server.jwt.sign(result.tokenPayload, {
        expiresIn: '24h',
      });

    reply.setSessionCookie(token);
    return reply.status(200).send({
      success: true,
      data: {
        user: result.user,
      },
    });
  }

  async logout(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    // Extract token from cookie or Authorization header and add to server revocation registry
    const cookieToken = request.cookies[SESSION_COOKIE_NAME];
    const authHeader = request.headers.authorization;
    const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const token = cookieToken || bearerToken;

    if (token) {
      revokeToken(token);
    }

    reply.clearSessionCookie();
    return reply.status(200).send({
      success: true,
      data: {
        message: 'Logged out successfully',
      },
    });
  }

  async me(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    reply.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

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

    const user = await this.authService.getProfile(userId, Boolean(request.user?.isDemo));
    return reply.status(200).send({
      success: true,
      data: {
        user,
      },
    });
  }
}
