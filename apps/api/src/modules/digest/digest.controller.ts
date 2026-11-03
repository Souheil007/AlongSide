import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ExploitSeverity } from '@alongside/shared';
import type { DigestService } from './digest.service.js';

export class DigestController {
  constructor(private readonly service: DigestService) {}

  async getLatest(
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const digest = await this.service.getLatestDigest();

    return reply.status(200).send({
      success: true,
      data: {
        digest,
      },
    });
  }

  async searchSlang(
    request: FastifyRequest<{
      Querystring: { term?: string; q?: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const term = request.query.term ?? request.query.q;
    const slangTerms = await this.service.searchSlang(term);

    return reply.status(200).send({
      success: true,
      data: {
        slangTerms,
      },
    });
  }

  async getExploits(
    request: FastifyRequest<{
      Querystring: { severity?: ExploitSeverity };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { severity } = request.query;
    const exploitAlerts = await this.service.getExploitAlerts(severity);

    return reply.status(200).send({
      success: true,
      data: {
        exploitAlerts,
      },
    });
  }
}
