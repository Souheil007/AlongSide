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
  type DeviceProfileCompiler,
  StandardDeviceProfileCompiler,
} from './profile.compiler.js';

export interface DeviceProfilesRoutesOptions {
  deviceProfilesRepository?: DeviceProfilesRepository;
  agreementsRepository?: AgreementsRepository;
  deviceProfilesService?: DeviceProfilesService;
  profileCompiler?: DeviceProfileCompiler;
}

export const deviceProfilesRoutes: FastifyPluginAsync<DeviceProfilesRoutesOptions> = async (
  fastify,
  opts
) => {
  const repository =
    opts.deviceProfilesRepository ?? new PrismaDeviceProfilesRepository();
  const agreementsRepo =
    opts.agreementsRepository ?? new PrismaAgreementsRepository();
  const compiler = opts.profileCompiler ?? new StandardDeviceProfileCompiler();
  const service =
    opts.deviceProfilesService ??
    new DeviceProfilesService(repository, agreementsRepo, compiler);
  const controller = new DeviceProfilesController(service);

  // OTA Apple Profile Delivery
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
