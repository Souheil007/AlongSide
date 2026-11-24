import type { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateDeviceShieldSchema } from '@alongside/shared';
import type { DeviceShieldService } from './device-shield.service.js';

export class DeviceShieldController {
  constructor(private readonly service: DeviceShieldService) {}

  async getShield(
    request: FastifyRequest<{ Params: { childId: string } }>,
    reply: FastifyReply
  ) {
    const userId = request.user?.id;
    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to access device shield.',
        },
      });
    }

    const shield = await this.service.getOrInitializeShield(
      userId,
      request.params.childId
    );
    return reply.status(200).send({
      success: true,
      data: { shield },
    });
  }

  async upsertShield(
    request: FastifyRequest<{ Params: { childId: string }; Body: unknown }>,
    reply: FastifyReply
  ) {
    const userId = request.user?.id;
    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to configure device shield.',
        },
      });
    }

    const parsed = UpdateDeviceShieldSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid device shield configuration.',
          details: parsed.error.issues.map((i) => ({
            field: i.path.join('.'),
            message: i.message,
          })),
        },
      });
    }

    const shield = await this.service.upsertAndSyncShield(
      userId,
      request.params.childId,
      parsed.data
    );

    return reply.status(200).send({
      success: true,
      data: { shield },
    });
  }

  async getStatus(
    request: FastifyRequest<{ Params: { childId: string } }>,
    reply: FastifyReply
  ) {
    const userId = request.user?.id;
    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to view shield status.',
        },
      });
    }

    const health = await this.service.getLiveStatus(
      userId,
      request.params.childId
    );
    return reply.status(200).send({
      success: true,
      data: { health },
    });
  }

  async downloadAppleProfile(
    request: FastifyRequest<{ Params: { enrollmentToken: string } }>,
    reply: FastifyReply
  ) {
    const { payload, mimeType, filename } =
      await this.service.getAppleMobileConfigByToken(
        request.params.enrollmentToken
      );

    reply.header('Content-Type', mimeType);
    reply.header('Content-Disposition', `attachment; filename="${filename}"`);
    reply.header('Cache-Control', 'no-store, no-cache, must-revalidate');
    return reply.status(200).send(payload);
  }

  async getQrInfo(
    request: FastifyRequest<{ Params: { enrollmentToken: string } }>,
    reply: FastifyReply
  ) {
    const qr = await this.service.getQrInfoByToken(
      request.params.enrollmentToken
    );
    reply.header('Cache-Control', 'no-store');
    return reply.status(200).send({
      success: true,
      data: qr,
    });
  }

  async provisionGuestShield(
    request: FastifyRequest<{ Body: { childName?: string; age?: number } }>,
    reply: FastifyReply
  ) {
    const childName = request.body?.childName || 'Child';
    const age = request.body?.age || 10;
    const shield = await this.service.provisionInstantGuestProfile(childName, age);
    return reply.status(200).send({
      success: true,
      data: { shield },
    });
  }

  async syncGuestShield(
    request: FastifyRequest<{ Params: { enrollmentToken: string }; Body: unknown }>,
    reply: FastifyReply
  ) {
    const parsed = UpdateDeviceShieldSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid shield policy payload.',
        },
      });
    }

    await this.service.syncGuestPolicy(
      request.params.enrollmentToken,
      parsed.data
    );

    return reply.status(200).send({
      success: true,
      data: { synced: true },
    });
  }

  async getGuestStatus(
    request: FastifyRequest<{ Params: { enrollmentToken: string } }>,
    reply: FastifyReply
  ) {
    const health = await this.service.getGuestHealthStatus(
      request.params.enrollmentToken
    );
    reply.header('Cache-Control', 'no-store');
    return reply.status(200).send({
      success: true,
      data: { health },
    });
  }
}
