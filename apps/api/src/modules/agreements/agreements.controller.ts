import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  CreateAgreementSchema,
  GetPresetsQuerySchema,
  UpdateAgreementSchema,
} from '@alongside/shared';
import type { AgreementService } from './agreements.service.js';

export class AgreementsController {
  constructor(private readonly agreementService: AgreementService) {}

  async getPresets(
    request: FastifyRequest<{
      Querystring: {
        tier?: string;
        roadType?: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const parseResult = GetPresetsQuerySchema.safeParse(request.query);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid query parameters for agreement presets.',
          details: parseResult.error.issues.map((i) => ({
            field: i.path.join('.'),
            message: i.message,
          })),
        },
      });
    }

    const { tier, roadType } = parseResult.data;
    const presets = this.agreementService.getPresets(tier as any, roadType as any);

    return reply.status(200).send({
      success: true,
      data: presets,
    });
  }

  async createAgreement(
    request: FastifyRequest<{
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
          message: 'Authentication required to create an agreement.',
        },
      });
    }

    const parseResult = CreateAgreementSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid agreement data provided.',
          details: parseResult.error.issues.map((i) => ({
            field: i.path.join('.'),
            message: i.message,
          })),
        },
      });
    }

    const agreement = await this.agreementService.createAgreement(
      userId,
      parseResult.data
    );

    return reply.status(201).send({
      success: true,
      data: { agreement },
    });
  }

  async getAgreementById(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply
  ) {
    const userId = request.user?.id;
    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to view agreement.',
        },
      });
    }

    const agreement = await this.agreementService.getAgreementById(
      userId,
      request.params.id
    );

    return reply.status(200).send({
      success: true,
      data: { agreement },
    });
  }

  async updateAgreement(
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
          message: 'Authentication required to update agreement.',
        },
      });
    }

    const parseResult = UpdateAgreementSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid agreement update data provided.',
          details: parseResult.error.issues.map((i) => ({
            field: i.path.join('.'),
            message: i.message,
          })),
        },
      });
    }

    const agreement = await this.agreementService.updateAgreement(
      userId,
      request.params.id,
      parseResult.data
    );

    return reply.status(200).send({
      success: true,
      data: { agreement },
    });
  }

  async exportPdf(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply
  ) {
    const userId = request.user?.id;
    if (!userId) {
      return reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required to export agreement PDF.',
        },
      });
    }

    const { buffer, filename } = await this.agreementService.exportPdf(
      userId,
      request.params.id
    );

    reply.header('Content-Type', 'application/pdf');
    reply.header('Content-Disposition', `inline; filename="${filename}"`);
    return reply.status(200).send(buffer);
  }
}
