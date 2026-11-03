import { describe, it, expect } from 'vitest';
import { buildApp } from '../src/app.js';

describe('Health Route Integration Test', () => {
  it('GET /api/v1/health returns status 200 with status ok and uptime', async () => {
    const app = await buildApp({ logger: false });

    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/health',
    });

    expect(response.statusCode).toBe(200);

    const payload = response.json();
    expect(payload).toMatchObject({
      status: 'ok',
    });
    expect(typeof payload.uptime).toBe('number');
    expect(typeof payload.timestamp).toBe('string');

    await app.close();
  });
});
