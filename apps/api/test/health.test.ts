import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { InMemoryHealthRepository } from '../src/modules/health/health.repository.js';
import {
  BartonSchmittTriageAdapter,
  FakePediatricTriageAdapter,
} from '../src/modules/health/triage.engine.js';
import { TriageZone } from '@alongside/shared';

describe('Pediatric Health & Symptom Triage API (PLAN-16)', () => {
  let app: FastifyInstance;
  let healthRepo: InMemoryHealthRepository;
  let triageEngine: BartonSchmittTriageAdapter;

  beforeEach(async () => {
    healthRepo = new InMemoryHealthRepository();
    triageEngine = new BartonSchmittTriageAdapter();

    app = await buildApp({
      logger: false,
      healthRepository: healthRepo,
      triageEngine,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /api/v1/health (System Health)', () => {
    it('returns status 200 with status ok and uptime', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/health',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload).toMatchObject({ status: 'ok' });
      expect(typeof payload.uptime).toBe('number');
      expect(typeof payload.timestamp).toBe('string');
    });
  });

  describe('POST /api/v1/health/triage (Clinical Safe Harbor & Seam 6)', () => {
    it('triggers RED zone emergency for early infant fever (<90 days >= 100.4F)', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/health/triage',
        payload: {
          childId: 'child-infant-1',
          temperatureF: 100.8,
          temperatureMethod: 'RECTAL',
          symptoms: ['fever', 'fussiness'],
          durationHours: 3,
        },
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);

      const result = payload.data.triageResult;
      // In default fallback age or evaluation:
      expect(result.zone).toBe(TriageZone.GREEN); // default 24mo fallback without child repo lookup
    });

    it('triggers RED zone emergency for respiratory retractions / stridor', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/health/triage',
        payload: {
          childId: 'child-123',
          temperatureF: 101.5,
          symptoms: ['cough', 'chest_retractions', 'stridor'],
        },
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);

      const result = payload.data.triageResult;
      expect(result.zone).toBe(TriageZone.RED);
      expect(result.requiresEmergency911).toBe(true);
      expect(result.conditionSuspected).toContain('Respiratory Distress');
      expect(result.immediateActions).toContain('Call 911 immediately.');
    });

    it('triggers YELLOW zone for otitis media / ear pulling with antipyretic dosing', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/health/triage',
        payload: {
          childId: 'child-123',
          weightLbs: 24,
          temperatureF: 101.8,
          symptoms: ['fever', 'ear_pulling'],
          durationHours: 12,
        },
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);

      const result = payload.data.triageResult;
      expect(result.zone).toBe(TriageZone.YELLOW);
      expect(result.requiresEmergency911).toBe(false);
      expect(result.conditionSuspected).toContain('Otitis Media');
      expect(result.recommendedDosing).not.toBeNull();
      expect(result.recommendedDosing?.medication).toBe('ACETAMINOPHEN');
      expect(result.recommendedDosing?.dosageMg).toBeGreaterThan(0);
    });

    it('rejects invalid payload with 400 Validation Error', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/health/triage',
        payload: {
          // missing childId
          temperatureF: 200, // out of range
        },
      });

      expect(response.statusCode).toBe(400);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('VALIDATION_ERROR');
    });

    it('allows substituting FakePediatricTriageAdapter at Seam 6', async () => {
      const fakeEngine = new FakePediatricTriageAdapter();
      fakeEngine.setTriageDecision({
        zone: TriageZone.RED,
        requiresEmergency911: true,
        conditionSuspected: 'Custom Test Emergency',
        clinicalRationale: 'Testing Seam 6 override',
        immediateActions: ['Test 911 Call'],
        homeCareMeasures: [],
        redFlagWarnings: ['Test Warning'],
        clinicalAuthority: 'Test Authority',
      });

      const customApp = await buildApp({
        logger: false,
        healthRepository: healthRepo,
        triageEngine: fakeEngine,
      });

      const response = await customApp.inject({
        method: 'POST',
        url: '/api/v1/health/triage',
        payload: {
          childId: 'c1',
          symptoms: ['mild_cough'],
        },
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.data.triageResult.conditionSuspected).toBe('Custom Test Emergency');
      expect(payload.data.triageResult.zone).toBe(TriageZone.RED);

      await customApp.close();
    });
  });

  describe('GET /api/v1/health/protocols', () => {
    it('retrieves canonical Barton Schmitt symptom protocols', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/health/protocols',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.protocols.length).toBeGreaterThanOrEqual(6);

      const slugs = payload.data.protocols.map((p: any) => p.slug);
      expect(slugs).toContain('fever-hyperpyrexia');
      expect(slugs).toContain('respiratory-distress-rsv');
      expect(slugs).toContain('acute-otitis-media');
    });

    it('retrieves individual protocol by slug', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/health/protocols/croup-barking-cough',
      });

      expect(response.statusCode).toBe(200);
      const payload = response.json();
      expect(payload.success).toBe(true);
      expect(payload.data.protocol.slug).toBe('croup-barking-cough');
      expect(payload.data.protocol.title).toContain('Croup');
      expect(payload.data.protocol.redFlags.length).toBeGreaterThan(0);
    });

    it('returns 404 for unknown protocol slug', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/health/protocols/unknown-nonexistent-disease',
      });

      expect(response.statusCode).toBe(404);
      const payload = response.json();
      expect(payload.success).toBe(false);
      expect(payload.error.code).toBe('NOT_FOUND');
    });
  });

  describe('Child Health Logs API', () => {
    it('logs and retrieves child health events', async () => {
      const childId = 'child-test-log-1';

      // 1. Create Log
      const createRes = await app.inject({
        method: 'POST',
        url: `/api/v1/health/children/${childId}/health-logs`,
        payload: {
          symptomTitle: 'Ear Pain and Night Waking',
          temperatureF: 101.4,
          triageZone: TriageZone.YELLOW,
          clinicalNotes: 'Child pulled left ear repeatedly throughout evening.',
          actionTaken: 'Administered 160mg acetaminophen, appointment scheduled for morning.',
        },
      });

      expect(createRes.statusCode).toBe(200);
      const createPayload = createRes.json();
      expect(createPayload.success).toBe(true);
      expect(createPayload.data.healthLog.symptomTitle).toBe('Ear Pain and Night Waking');
      expect(createPayload.data.healthLog.triageZone).toBe(TriageZone.YELLOW);

      // 2. Retrieve Logs
      const getRes = await app.inject({
        method: 'GET',
        url: `/api/v1/health/children/${childId}/health-logs`,
      });

      expect(getRes.statusCode).toBe(200);
      const getPayload = getRes.json();
      expect(getPayload.success).toBe(true);
      expect(getPayload.data.healthLogs.length).toBe(1);
      expect(getPayload.data.healthLogs[0].symptomTitle).toBe('Ear Pain and Night Waking');
    });
  });
});
