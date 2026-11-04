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
  faqsRepository?: FaqRepository;
  faqsService?: FaqsService;
  aiAdvisorRepository?: AiAdvisorRepository;
  aiAdvisorService?: AiAdvisorService;
  llmOrchestrator?: MultiProviderLlmOrchestrator;
}

export async function buildApp(opts: AppOptions = {}): Promise<FastifyInstance> {
  const {
    corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000',
    cookieSecret = process.env.COOKIE_SECRET || 'dev_secret_cookie_signing_key_32_chars_min',
    jwtSecret = process.env.JWT_SECRET || 'dev_jwt_secret_must_be_at_least_32_characters_long_for_security',
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
    faqsRepository,
    faqsService,
    aiAdvisorRepository,
    aiAdvisorService,
    llmOrchestrator,
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
    digestService ?? new DigestService(resolvedDigestRepository);

  const resolvedFaqsRepository =
    faqsRepository ?? new PrismaFaqRepository();
  const resolvedFaqsService =
    faqsService ?? new FaqsService(resolvedFaqsRepository);

  const resolvedAiAdvisorRepository =
    aiAdvisorRepository ?? new PrismaAiAdvisorRepository();
  const resolvedLlmOrchestrator =
    llmOrchestrator ??
    new MultiProviderLlmOrchestrator({ logger: app.log });
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
  await app.register(digestRoutes, {
    prefix: '/api/v1/digest',
    digestRepository: resolvedDigestRepository,
    digestService: resolvedDigestService,
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

  return app;
}
