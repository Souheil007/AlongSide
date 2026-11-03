import closeWithGrace from 'close-with-grace';
import { buildApp } from './app.js';

const port = Number(process.env.PORT) || 4000;
const host = process.env.HOST || '0.0.0.0';

async function startServer(): Promise<void> {
  const isDev = process.env.NODE_ENV !== 'production';

  const app = await buildApp({
    logger: {
      level: isDev ? 'debug' : 'info',
      transport: isDev
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
    },
  });

  // Graceful shutdown listener
  const closeListeners = closeWithGrace({ delay: 500 }, async ({ err, signal }) => {
    if (err) {
      app.log.error({ err }, 'Error during shutdown signal');
    }
    app.log.info({ signal }, 'Closing Fastify server gracefully');
    await app.close();
  });

  app.addHook('onClose', async () => {
    closeListeners.uninstall();
  });

  try {
    await app.listen({ port, host });
    app.log.info(`Alongside Fastify API server listening on http://${host}:${port}`);
  } catch (err) {
    app.log.error({ err }, 'Failed to start Fastify API server');
    process.exit(1);
  }
}

startServer();
