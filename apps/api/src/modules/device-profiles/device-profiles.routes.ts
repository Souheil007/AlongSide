import type { FastifyPluginAsync } from 'fastify';
import { DeviceProfilesController } from './device-profiles.controller.js';
import {
  type DeviceProfilesRepository,
  PrismaDeviceProfilesRepository,
} from './device-profiles.repository.js';
import { DeviceProfilesService } from './device-profiles.service.js';
import {
  type AgreementsRepository,
  PrismaAgreementsRepository,
} from '../agreements/agreements.repository.js';
import {
  type ChildrenRepository,
  PrismaChildrenRepository,
} from '../children/children.repository.js';
import {
  type DeviceProfileCompiler,
  StandardDeviceProfileCompiler,
} from './profile.compiler.js';
import {
  type DeviceShieldRepository,
  PrismaDeviceShieldRepository,
} from './device-shield.repository.js';
import { DeviceShieldService } from './device-shield.service.js';
import { DeviceShieldController } from './device-shield.controller.js';
import {
  type DnsPolicyProvider,
  resolveDefaultDnsPolicyProvider,
} from './dns-provider.js';

export interface DeviceProfilesRoutesOptions {
  deviceProfilesRepository?: DeviceProfilesRepository;
  agreementsRepository?: AgreementsRepository;
  deviceProfilesService?: DeviceProfilesService;
  profileCompiler?: DeviceProfileCompiler;
  childrenRepository?: ChildrenRepository;
  deviceShieldRepository?: DeviceShieldRepository;
  deviceShieldService?: DeviceShieldService;
  dnsPolicyProvider?: DnsPolicyProvider;
}

export const deviceProfilesRoutes: FastifyPluginAsync<DeviceProfilesRoutesOptions> = async (
  fastify,
  opts
) => {
  const repository =
    opts.deviceProfilesRepository ?? new PrismaDeviceProfilesRepository();
  const agreementsRepo =
    opts.agreementsRepository ?? new PrismaAgreementsRepository();
  const childrenRepo =
    opts.childrenRepository ?? new PrismaChildrenRepository();
  const compiler = opts.profileCompiler ?? new StandardDeviceProfileCompiler();
  const service =
    opts.deviceProfilesService ??
    new DeviceProfilesService(repository, agreementsRepo, compiler);
  const controller = new DeviceProfilesController(service);

  const shieldRepo =
    opts.deviceShieldRepository ?? new PrismaDeviceShieldRepository();
  const dnsProvider =
    opts.dnsPolicyProvider ?? resolveDefaultDnsPolicyProvider();
  const shieldService =
    opts.deviceShieldService ??
    new DeviceShieldService(shieldRepo, childrenRepo, dnsProvider, compiler);
  const shieldController = new DeviceShieldController(shieldService);

  // =========================================================================
  // LIVE DNS PARENTAL CONTROL SHIELD ROUTES (PLAN-52)
  // =========================================================================

  // GET /api/v1/devices/shield/:childId
  fastify.get<{ Params: { childId: string } }>(
    '/shield/:childId',
    {
      preHandler: [fastify.authenticate],
      schema: {
        params: {
          type: 'object',
          properties: {
            childId: { type: 'string', minLength: 1 },
          },
          required: ['childId'],
        },
      },
    },
    shieldController.getShield.bind(shieldController)
  );

  // PUT /api/v1/devices/shield/:childId
  fastify.put<{ Params: { childId: string }; Body: unknown }>(
    '/shield/:childId',
    {
      preHandler: [fastify.authenticate],
      schema: {
        params: {
          type: 'object',
          properties: {
            childId: { type: 'string', minLength: 1 },
          },
          required: ['childId'],
        },
        body: {
          type: 'object',
          additionalProperties: true,
        },
      },
    },
    shieldController.upsertShield.bind(shieldController)
  );

  // GET /api/v1/devices/shield/:childId/status
  fastify.get<{ Params: { childId: string } }>(
    '/shield/:childId/status',
    {
      preHandler: [fastify.authenticate],
      schema: {
        params: {
          type: 'object',
          properties: {
            childId: { type: 'string', minLength: 1 },
          },
          required: ['childId'],
        },
      },
    },
    shieldController.getStatus.bind(shieldController)
  );

  // GET /api/v1/devices/shield/profile/:enrollmentToken (Token-scoped OTA .mobileconfig)
  fastify.get<{ Params: { enrollmentToken: string } }>(
    '/shield/profile/:enrollmentToken',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            enrollmentToken: { type: 'string', minLength: 8 },
          },
          required: ['enrollmentToken'],
        },
      },
    },
    shieldController.downloadAppleProfile.bind(shieldController)
  );

  // GET /api/v1/devices/shield/qr/:enrollmentToken (Token-scoped QR enrollment info)
  fastify.get<{ Params: { enrollmentToken: string } }>(
    '/shield/qr/:enrollmentToken',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            enrollmentToken: { type: 'string', minLength: 8 },
          },
          required: ['enrollmentToken'],
        },
      },
    },
    shieldController.getQrInfo.bind(shieldController)
  );

  // =========================================================================
  // LEGACY OTA PROFILE & HEARTBEAT ROUTES (BACKWARDS COMPATIBLE)
  // =========================================================================

  // GET /api/v1/devices/enroll/:token
  fastify.get(
    '/enroll/:token',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
          required: ['token'],
        },
      },
    },
    controller.enrollDevice.bind(controller)
  );

  // POST /api/v1/devices/heartbeat/:token
  fastify.post(
    '/heartbeat/:token',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
          required: ['token'],
        },
        body: {
          type: 'object',
          properties: {
            tamperDetected: { type: 'boolean' },
          },
        },
      },
    },
    controller.recordHeartbeat.bind(controller)
  );

  // GET /api/v1/devices/qr/:token
  fastify.get(
    '/qr/:token',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
          required: ['token'],
        },
      },
    },
    controller.getQrCode.bind(controller)
  );
};
