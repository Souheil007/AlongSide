import type { FastifyPluginAsync } from 'fastify';

export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  // System Health Check (Maintains server health/uptime monitoring)
  fastify.get(
    '/',
    {
      schema: {
        description: 'Health check endpoint returning service status and uptime',
        tags: ['Health'],
        response: {
          200: {
            type: 'object',
            properties: {
              status: { type: 'string' },
              uptime: { type: 'number' },
              timestamp: { type: 'string' },
            },
            required: ['status', 'uptime', 'timestamp'],
          },
        },
      },
    },
    async (_request, reply) => {
      return reply.status(200).send({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      });
    }
  );
};
