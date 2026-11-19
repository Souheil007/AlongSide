import { describe, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';

describe('Swagger UI & OpenAPI Specification (PLAN-45)', () => {
  it('serves interactive Swagger UI HTML on GET /docs', async () => {
    const app = await buildApp({ logger: false });

    const response = await app.inject({
      method: 'GET',
      url: '/docs/',
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
    expect(response.body).toContain('swagger-ui');

    await app.close();
  });

  it('serves OpenAPI 3.0 specification JSON on GET /docs/json', async () => {
    const app = await buildApp({ logger: false });

    const response = await app.inject({
      method: 'GET',
      url: '/docs/json',
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');

    const spec = JSON.parse(response.body);
    expect(spec.openapi).toBeDefined();
    expect(spec.info.title).toBe('Alongside API');
    expect(spec.paths).toBeDefined();
    expect(spec.paths['/api/v1/health/']).toBeDefined();
    expect(spec.paths['/api/v1/auth/register']).toBeDefined();
    expect(spec.paths['/api/v1/auth/login']).toBeDefined();

    await app.close();
  });

  it('redirects browser requests from GET /api/v1 to /docs', async () => {
    const app = await buildApp({ logger: false });

    const response = await app.inject({
      method: 'GET',
      url: '/api/v1',
      headers: {
        accept: 'text/html,application/xhtml+xml',
      },
    });

    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/docs');

    await app.close();
  });

  it('returns JSON endpoint directory when GET /api/v1 is requested via API client', async () => {
    const app = await buildApp({ logger: false });

    const response = await app.inject({
      method: 'GET',
      url: '/api/v1',
      headers: {
        accept: 'application/json',
      },
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.name).toBe('Alongside API');
    expect(body.documentationUrl).toBe('/docs');
    expect(body.endpoints.health).toBe('/api/v1/health');
    expect(body.endpoints.auth).toBe('/api/v1/auth');
    expect(body.endpoints.children).toBe('/api/v1/children');

    await app.close();
  });

  it('redirects GET /documentation to /docs', async () => {
    const app = await buildApp({ logger: false });

    const response = await app.inject({
      method: 'GET',
      url: '/documentation',
    });

    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/docs');

    await app.close();
  });
});
