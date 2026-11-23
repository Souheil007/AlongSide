import fastify, {
  type FastifyError,
  type FastifyInstance,
  type FastifyServerOptions,
} from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import sensible from '@fastify/sensible';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
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
import { agreementsRoutes } from './modules/agreements/agreements.routes.js';
import {
  type AgreementsRepository,
  PrismaAgreementsRepository,
} from './modules/agreements/agreements.repository.js';
import { AgreementService } from './modules/agreements/agreements.service.js';
import {
  type PdfDocumentRenderer,
  StandardVectorPdfRenderer,
} from './modules/agreements/pdf.service.js';
import { deviceProfilesRoutes } from './modules/device-profiles/device-profiles.routes.js';
import {
  type DeviceProfilesRepository,
  PrismaDeviceProfilesRepository,
} from './modules/device-profiles/device-profiles.repository.js';
import { DeviceProfilesService } from './modules/device-profiles/device-profiles.service.js';
import {
  type DeviceProfileCompiler,
  StandardDeviceProfileCompiler,
} from './modules/device-profiles/profile.compiler.js';
import { academyRoutes } from './modules/academy/academy.routes.js';
import {
  type AcademyRepository,
  PrismaAcademyRepository,
} from './modules/academy/academy.repository.js';
import { AcademyService } from './modules/academy/academy.service.js';
import { digestRoutes } from './modules/digest/digest.routes.js';
import {
  type DigestRepository,
  PrismaDigestRepository,
} from './modules/digest/digest.repository.js';
import { DigestService } from './modules/digest/digest.service.js';
import { RssBlogFeedAdapter } from './modules/digest/ingestion/adapters/blogFeedFetcher.js';
import {
  hasConfiguredLlmApiKey,
  LlmDigestCuratorAdapter,
} from './modules/digest/ingestion/adapters/digestCurator.js';
import { YouTubeWeeklyFeedAdapter } from './modules/digest/ingestion/adapters/youtubeFeedFetcher.js';
import { DigestIngestionOrchestrator } from './modules/digest/ingestion/digestIngestion.orchestrator.js';
import { faqsRoutes } from './modules/faqs/faqs.routes.js';
import {
  type FaqRepository,
  PrismaFaqRepository,
} from './modules/faqs/faqs.repository.js';
import { FaqsService } from './modules/faqs/faqs.service.js';
import { aiAdvisorRoutes } from './modules/ai-advisor/ai-advisor.routes.js';
import {
  type AiAdvisorRepository,
  PrismaAiAdvisorRepository,
} from './modules/ai-advisor/ai-advisor.repository.js';
import { AiAdvisorService } from './modules/ai-advisor/ai-advisor.service.js';
import { MultiProviderLlmOrchestrator } from './modules/ai-advisor/adapters/llm-orchestrator.js';
import { FaqRetrievalService } from './modules/ai-advisor/embedding.service.js';
import { milestonesRoutes } from './modules/milestones/milestones.routes.js';
import {
  type MilestonesRepository,
  PrismaMilestonesRepository,
} from './modules/milestones/milestones.repository.js';
import { MilestonesService } from './modules/milestones/milestones.service.js';
import { nutritionRoutes } from './modules/nutrition/nutrition.routes.js';
import {
  type NutritionRepository,
  PrismaNutritionRepository,
} from './modules/nutrition/nutrition.repository.js';
import { NutritionService } from './modules/nutrition/nutrition.service.js';
import { brainGamesRoutes } from './modules/brain-games/brain-games.routes.js';
import {
  type BrainGamesRepository,
  PrismaBrainGamesRepository,
} from './modules/brain-games/brain-games.repository.js';
import { BrainGamesService } from './modules/brain-games/brain-games.service.js';
import {
  type PlayActivityRecommender,
  DevelopmentalPlayAdapter,
} from './modules/brain-games/play.recommender.js';
import { behaviorRoutes } from './modules/behavior/behavior.routes.js';
import {
  type BehaviorRepository,
  PrismaBehaviorRepository,
} from './modules/behavior/behavior.repository.js';
import { BehaviorService } from './modules/behavior/behavior.service.js';

export interface AppOptions extends FastifyServerOptions {
  corsOrigin?: string;
  cookieSecret?: string;
  jwtSecret?: string;
  authRepository?: AuthRepository;
  childrenRepository?: ChildrenRepository;
  childrenService?: ChildrenService;
  agreementsRepository?: AgreementsRepository;
  agreementsService?: AgreementService;
  pdfRenderer?: PdfDocumentRenderer;
  deviceProfilesRepository?: DeviceProfilesRepository;
  deviceProfilesService?: DeviceProfilesService;
  profileCompiler?: DeviceProfileCompiler;
  academyRepository?: AcademyRepository;
  academyService?: AcademyService;
  digestRepository?: DigestRepository;
  digestService?: DigestService;
  digestIngestionOrchestrator?: DigestIngestionOrchestrator;
  digestSyncSecret?: string;
  faqsRepository?: FaqRepository;
  faqsService?: FaqsService;
  aiAdvisorRepository?: AiAdvisorRepository;
  aiAdvisorService?: AiAdvisorService;
  llmOrchestrator?: MultiProviderLlmOrchestrator;
  milestonesRepository?: MilestonesRepository;
  milestonesService?: MilestonesService;
  nutritionRepository?: NutritionRepository;
  nutritionService?: NutritionService;
  brainGamesRepository?: BrainGamesRepository;
  brainGamesService?: BrainGamesService;
  playRecommender?: PlayActivityRecommender;
  behaviorRepository?: BehaviorRepository;
  behaviorService?: BehaviorService;
}

export async function buildApp(opts: AppOptions = {}): Promise<FastifyInstance> {
  const isProduction = process.env.NODE_ENV === 'production';
  const defaultCookieSecret = 'dev_secret_cookie_signing_key_32_chars_min';
  const defaultJwtSecret = 'dev_jwt_secret_must_be_at_least_32_characters_long_for_security';

  const {
    corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000',
    cookieSecret = process.env.COOKIE_SECRET || defaultCookieSecret,
    jwtSecret = process.env.JWT_SECRET || defaultJwtSecret,
    authRepository,
    childrenRepository,
    childrenService,
    agreementsRepository,
    agreementsService,
    pdfRenderer,
    deviceProfilesRepository,
    deviceProfilesService,
    profileCompiler,
    academyRepository,
    academyService,
    digestRepository,
    digestService,
    digestIngestionOrchestrator,
    digestSyncSecret,
    faqsRepository,
    faqsService,
    aiAdvisorRepository,
    aiAdvisorService,
    llmOrchestrator,
    ...fastifyOpts
  } = opts;

  // Enforce strict fail-fast validation in production mode:
  // Default development secrets must NEVER be used in production.
  if (isProduction) {
    if (!jwtSecret || jwtSecret === defaultJwtSecret || jwtSecret.length < 32) {
      throw new Error(
        'FATAL CONFIGURATION ERROR: JWT_SECRET must be explicitly configured with at least 32 characters in production.'
      );
    }
    if (!cookieSecret || cookieSecret === defaultCookieSecret || cookieSecret.length < 32) {
      throw new Error(
        'FATAL CONFIGURATION ERROR: COOKIE_SECRET must be explicitly configured with at least 32 characters in production.'
      );
    }
  }

  const app = fastify({
    logger: true,
    ...fastifyOpts,
  });

  // Support empty JSON bodies gracefully without throwing FST_ERR_CTP_EMPTY_JSON_BODY
  app.addContentTypeParser(
    'application/json',
    { parseAs: 'string' },
    (_req, body, done) => {
      const text = typeof body === 'string' ? body.trim() : '';
      if (!text) {
        done(null, {});
        return;
      }
      try {
        const json = JSON.parse(text);
        done(null, json);
      } catch (err: any) {
        err.statusCode = 400;
        done(err, undefined);
      }
    }
  );

  // Cross-Origin Resource Sharing
  // When credentials: true is enabled, the browser strictly forbids Access-Control-Allow-Origin: *
  // To prevent CORS reflection and credential theft vulnerabilities, origin validation requires:
  // 1. Explicit inclusion in configured CORS_ORIGIN,
  // 2. Exact match against authorized Alongside Vercel domains (preventing third-party *.vercel.app),
  // 3. Strict regex anchored to local loopback hosts (preventing attacker-localhost.com).
  const LOCALHOST_ORIGIN_REGEX = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;
  const ALONGSIDE_VERCEL_REGEX = /^https:\/\/alongside(-[a-z0-9-]+)?\.vercel\.app$/i;

  await app.register(cors, {
    origin: (origin, cb) => {
      // Allow requests with no origin (e.g. server-to-server, curl, mobile apps)
      if (!origin) {
        return cb(null, true);
      }

      const allowedOrigins = corsOrigin
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean);

      const isExplicitlyAllowed = allowedOrigins.includes(origin);
      const isLocalhost = LOCALHOST_ORIGIN_REGEX.test(origin);
      const isAlongsideVercel = ALONGSIDE_VERCEL_REGEX.test(origin);

      if (isExplicitlyAllowed || isLocalhost || isAlongsideVercel) {
        // Return origin to reflect calling origin with credentials
        return cb(null, origin);
      }

      cb(new Error(`Origin ${origin} not allowed by CORS`), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Cookie',
      'X-Digest-Sync-Secret',
    ],
    exposedHeaders: ['Set-Cookie'],
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

  // Register OpenAPI 3.0 / Swagger schema builder
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Alongside API',
        description:
          'Alongside Holistic Child Upbringing, Pediatric Health & Lifespan Family OS API',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:4000',
          description: 'Local Development Server',
        },
      ],
      tags: [
        { name: 'Health', description: 'Server health and system checks' },
        { name: 'Auth', description: 'Parent authentication and session lifecycle' },
        { name: 'Children', description: 'Child profile CRUD, developmental tiers & readiness' },
        { name: 'Academy', description: 'Parent Intelligence Academy courses & lessons' },
        { name: 'AI Advisor', description: '24/7 AI Child Advisor & FAQ vault' },
        { name: 'Agreements', description: 'Bilateral Family Pacts & PDF generation' },
        { name: 'Devices', description: 'Pact-as-Code Apple/Android device profiles & enrollment' },
        { name: 'Culture Digest', description: 'Sunday Youth Culture Digest & Slang Decoders' },
        { name: 'Milestones', description: 'CDC & Bright Futures developmental milestones' },
        { name: 'Nutrition', description: 'Pediatric nutrition guides & feeding protocols' },
        { name: 'Brain Games', description: 'Purposeful play & developmental games' },
        { name: 'Behavior', description: 'Behavioral translation & de-escalation guides' },
      ],
      components: {
        securitySchemes: {
          cookieAuth: {
            type: 'apiKey',
            in: 'cookie',
            name: 'alongside_session',
            description: 'Session cookie set upon successful login or registration',
          },
        },
      },
    },
  });

  // Register interactive Swagger UI on /docs
  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
    },
    staticCSP: true,
  });

  // Convenience endpoint for browsing endpoints & redirecting browsers to /docs
  app.get('/api/v1', async (request, reply) => {
    if (request.headers.accept?.includes('text/html')) {
      return reply.redirect('/docs');
    }
    return {
      name: 'Alongside API',
      version: '1.0.0',
      documentationUrl: '/docs',
      endpoints: {
        health: '/api/v1/health',
        auth: '/api/v1/auth',
        children: '/api/v1/children',
        academy: '/api/v1/academy',
        aiAdvisor: '/api/v1/ai-advisor',
        agreements: '/api/v1/agreements',
        devices: '/api/v1/devices',
        digest: '/api/v1/digest',
        faqs: '/api/v1/faqs',
        milestones: '/api/v1/milestones',
        nutrition: '/api/v1/nutrition',
        brainGames: '/api/v1/brain-games',
        behavior: '/api/v1/behavior',
      },
    };
  });

  app.get('/documentation', async (_request, reply) => {
    return reply.redirect('/docs');
  });

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

  const resolvedAgreementsRepository =
    agreementsRepository ?? new PrismaAgreementsRepository();
  const resolvedPdfRenderer = pdfRenderer ?? new StandardVectorPdfRenderer();
  const resolvedAgreementsService =
    agreementsService ??
    new AgreementService(resolvedAgreementsRepository, resolvedPdfRenderer);

  const resolvedDeviceProfilesRepository =
    deviceProfilesRepository ?? new PrismaDeviceProfilesRepository();
  const resolvedProfileCompiler =
    profileCompiler ?? new StandardDeviceProfileCompiler();
  const resolvedDeviceProfilesService =
    deviceProfilesService ??
    new DeviceProfilesService(
      resolvedDeviceProfilesRepository,
      resolvedAgreementsRepository,
      resolvedProfileCompiler
    );

  const resolvedAcademyRepository =
    academyRepository ?? new PrismaAcademyRepository();
  const resolvedAcademyService =
    academyService ?? new AcademyService(resolvedAcademyRepository);

  const resolvedDigestRepository =
    digestRepository ?? new PrismaDigestRepository();
  const resolvedDigestService =
    digestService ??
    new DigestService(resolvedDigestRepository, resolvedChildrenRepository);

  const resolvedFaqsRepository =
    faqsRepository ?? new PrismaFaqRepository();
  const resolvedFaqsService =
    faqsService ?? new FaqsService(resolvedFaqsRepository);

  const resolvedAiAdvisorRepository =
    aiAdvisorRepository ?? new PrismaAiAdvisorRepository();
  const resolvedLlmOrchestrator =
    llmOrchestrator ??
    new MultiProviderLlmOrchestrator({ logger: app.log });
  const resolvedDigestIngestionOrchestrator =
    digestIngestionOrchestrator ??
    new DigestIngestionOrchestrator({
      blogFeedFetcher: new RssBlogFeedAdapter(),
      youtubeFeedFetcher: new YouTubeWeeklyFeedAdapter(),
      curator: new LlmDigestCuratorAdapter({
        llmOrchestrator: hasConfiguredLlmApiKey()
          ? resolvedLlmOrchestrator
          : undefined,
        logger: app.log,
      }),
      repository: resolvedDigestRepository,
      logger: app.log,
    });
  const resolvedFaqRetrievalService = new FaqRetrievalService(
    resolvedFaqsRepository
  );
  const resolvedAiAdvisorService =
    aiAdvisorService ??
    new AiAdvisorService(
      resolvedAiAdvisorRepository,
      resolvedFaqRetrievalService,
      resolvedLlmOrchestrator,
      resolvedChildrenRepository
    );

  const resolvedMilestonesRepository =
    opts.milestonesRepository ?? new PrismaMilestonesRepository();
  const resolvedMilestonesService =
    opts.milestonesService ??
    new MilestonesService(resolvedMilestonesRepository);

  const resolvedNutritionRepository =
    opts.nutritionRepository ?? new PrismaNutritionRepository();
  const resolvedNutritionService =
    opts.nutritionService ??
    new NutritionService(resolvedNutritionRepository);

  const resolvedBrainGamesRepository =
    opts.brainGamesRepository ?? new PrismaBrainGamesRepository();
  const resolvedPlayRecommender =
    opts.playRecommender ??
    new DevelopmentalPlayAdapter(resolvedBrainGamesRepository);
  const resolvedBrainGamesService =
    opts.brainGamesService ??
    new BrainGamesService(
      resolvedPlayRecommender,
      resolvedChildrenRepository
    );

  const resolvedBehaviorRepository =
    opts.behaviorRepository ?? new PrismaBehaviorRepository();
  const resolvedBehaviorService =
    opts.behaviorService ??
    new BehaviorService(resolvedBehaviorRepository);

  // Register domain route plugins with /api/v1 prefixes
  await app.register(healthRoutes, {
    prefix: '/api/v1/health',
  });
  await app.register(authRoutes, {
    prefix: '/api/v1/auth',
    authRepository: resolvedAuthRepository,
  });
  await app.register(childrenRoutes, {
    prefix: '/api/v1/children',
    childrenRepository: resolvedChildrenRepository,
    childrenService: resolvedChildrenService,
    milestonesService: resolvedMilestonesService,
  });
  await app.register(agreementsRoutes, {
    prefix: '/api/v1/agreements',
    agreementsRepository: resolvedAgreementsRepository,
    agreementsService: resolvedAgreementsService,
    pdfRenderer: resolvedPdfRenderer,
    deviceProfilesService: resolvedDeviceProfilesService,
  });
  await app.register(deviceProfilesRoutes, {
    prefix: '/api/v1/devices',
    deviceProfilesRepository: resolvedDeviceProfilesRepository,
    agreementsRepository: resolvedAgreementsRepository,
    deviceProfilesService: resolvedDeviceProfilesService,
    profileCompiler: resolvedProfileCompiler,
  });
  await app.register(academyRoutes, {
    prefix: '/api/v1/academy',
    academyRepository: resolvedAcademyRepository,
    academyService: resolvedAcademyService,
  });
  await app.register(academyRoutes, {
    prefix: '/api/academy',
    academyRepository: resolvedAcademyRepository,
    academyService: resolvedAcademyService,
  });
  await app.register(digestRoutes, {
    prefix: '/api/v1/digest',
    digestRepository: resolvedDigestRepository,
    digestService: resolvedDigestService,
    childrenRepository: resolvedChildrenRepository,
    digestIngestionOrchestrator: resolvedDigestIngestionOrchestrator,
    digestSyncSecret,
  });
  await app.register(faqsRoutes, {
    prefix: '/api/v1/faqs',
    faqsRepository: resolvedFaqsRepository,
    faqsService: resolvedFaqsService,
  });
  await app.register(aiAdvisorRoutes, {
    prefix: '/api/v1/ai-advisor',
    aiAdvisorRepository: resolvedAiAdvisorRepository,
    aiAdvisorService: resolvedAiAdvisorService,
    faqRepository: resolvedFaqsRepository,
    childrenRepository: resolvedChildrenRepository,
    llmOrchestrator: resolvedLlmOrchestrator,
  });
  await app.register(milestonesRoutes, {
    prefix: '/api/v1/milestones',
    milestonesRepository: resolvedMilestonesRepository,
    milestonesService: resolvedMilestonesService,
  });
  await app.register(nutritionRoutes, {
    prefix: '/api/v1/nutrition',
    nutritionRepository: resolvedNutritionRepository,
    nutritionService: resolvedNutritionService,
  });
  await app.register(brainGamesRoutes, {
    prefix: '/api/v1/brain-games',
    brainGamesRepository: resolvedBrainGamesRepository,
    brainGamesService: resolvedBrainGamesService,
    playRecommender: resolvedPlayRecommender,
    childrenRepository: resolvedChildrenRepository,
  });
  await app.register(behaviorRoutes, {
    prefix: '/api/v1/behavior',
    behaviorRepository: resolvedBehaviorRepository,
    behaviorService: resolvedBehaviorService,
  });

  return app;
}
