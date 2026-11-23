import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import zlib from 'node:zlib';

describe('Fastify Performance & Optimization: Compression & ETags', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = await buildApp({
      logger: false,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });

    // Register a large payload test route for compression benchmarking
    app.get('/api/v1/test-large-payload', async () => {
      return {
        catalog: Array.from({ length: 50 }, (_, i) => ({
          id: `item-${i}`,
          title: `Comprehensive Pediatric Development Guide ${i}`,
          summary:
            'Detailed developmental neurobiology mechanisms, circadian rhythm sleep architecture, and bilateral family agreements.',
          tags: ['neurobiology', 'sleep', 'screen-peace', 'co-regulation'],
        })),
      };
    });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('ETags & 304 Not Modified Caching', () => {
    it('generates an ETag header for GET responses', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/health',
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers.etag).toBeDefined();
      expect(typeof response.headers.etag).toBe('string');
    });

    it('returns 304 Not Modified when If-None-Match matches the ETag', async () => {
      const initialResponse = await app.inject({
        method: 'GET',
        url: '/api/v1/test-large-payload',
      });

      expect(initialResponse.statusCode).toBe(200);
      const etag = initialResponse.headers.etag;
      expect(etag).toBeDefined();

      const cachedResponse = await app.inject({
        method: 'GET',
        url: '/api/v1/test-large-payload',
        headers: {
          'if-none-match': etag as string,
        },
      });

      expect(cachedResponse.statusCode).toBe(304);
      expect(cachedResponse.body).toBe('');
    });
  });

  describe('HTTP Response Compression (@fastify/compress)', () => {
    it('compresses payloads >= 1KB with gzip when client requests Accept-Encoding: gzip', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/test-large-payload',
        headers: {
          'accept-encoding': 'gzip',
        },
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-encoding']).toBe('gzip');

      // Decompress and verify content integrity
      const decompressed = zlib.gunzipSync(response.rawPayload);
      const json = JSON.parse(decompressed.toString('utf-8'));
      expect(json.catalog).toHaveLength(50);
      expect(json.catalog[0].title).toContain('Comprehensive Pediatric Development Guide');
    });

    it('compresses payloads >= 1KB with brotli when client requests Accept-Encoding: br', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/test-large-payload',
        headers: {
          'accept-encoding': 'br',
        },
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-encoding']).toBe('br');

      const decompressed = zlib.brotliDecompressSync(response.rawPayload);
      const json = JSON.parse(decompressed.toString('utf-8'));
      expect(json.catalog).toHaveLength(50);
    });

    it('does not compress small responses below the 1024-byte threshold', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/health',
        headers: {
          'accept-encoding': 'gzip',
        },
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-encoding']).toBeUndefined();
    });
  });
});
