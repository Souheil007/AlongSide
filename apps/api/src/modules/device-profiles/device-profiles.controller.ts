import type { FastifyReply, FastifyRequest } from 'fastify';
import { CompileProfileSchema } from '@alongside/shared';
import type { DeviceProfilesService } from './device-profiles.service.js';

export class DeviceProfilesController {
  constructor(private readonly service: DeviceProfilesService) {}

  async compileProfile(
    request: FastifyRequest<{
      Params: { id: string };
      Body: unknown;
    }>,
    reply: FastifyReply
  ) {
    const userId = request.user?.id;
    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to compile profile.',
        },
      });
    }

    const parseResult = CompileProfileSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid profile compilation configuration.',
          details: parseResult.error.issues.map((i) => ({
            field: i.path.join('.'),
            message: i.message,
          })),
        },
      });
    }

    const profile = await this.service.compileProfile(
      userId,
      request.params.id,
      parseResult.data
    );

    return reply.status(201).send({
      success: true,
      data: { profile },
    });
  }

  async enrollDevice(
    request: FastifyRequest<{
      Params: { token: string };
    }>,
    reply: FastifyReply
  ) {
    const { token } = request.params;
    const { payload, mimeType, filename } =
      await this.service.getEnrollmentPayload(token);

    reply.header('Content-Type', mimeType);
    reply.header('Content-Disposition', `attachment; filename="${filename}"`);
    return reply.status(200).send(payload);
  }

  async recordHeartbeat(
    request: FastifyRequest<{
      Params: { token: string };
      Body?: { tamperDetected?: boolean };
    }>,
    reply: FastifyReply
  ) {
    const { token } = request.params;
    const tamperDetected = request.body?.tamperDetected;

    const profile = await this.service.recordHeartbeat(token, tamperDetected);

    return reply.status(200).send({
      success: true,
      data: { profile },
    });
  }

  async getQrCode(
    request: FastifyRequest<{
      Params: { token: string };
    }>,
    reply: FastifyReply
  ) {
    const { token } = request.params;
    const profile = await this.service.getProfileByToken(token);

    const enrollmentUrl = `/api/v1/devices/enroll/${token}`;
    return reply.status(200).send({
      success: true,
      data: {
        token,
        status: profile.status,
        enrollmentUrl,
        instructions:
          'Scan this QR code with the iOS Camera app or Safari on your child’s device to install the Alongside Protection Profile.',
      },
    });
  }
}
