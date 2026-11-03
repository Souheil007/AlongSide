import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { InMemoryAuthRepository } from '../src/modules/auth/auth.repository.js';
import { InMemoryChildrenRepository } from '../src/modules/children/children.repository.js';
import { InMemoryAgreementsRepository } from '../src/modules/agreements/agreements.repository.js';
import { InMemoryDeviceProfilesRepository } from '../src/modules/device-profiles/device-profiles.repository.js';
import { StandardDeviceProfileCompiler } from '../src/modules/device-profiles/profile.compiler.js';
import { FakeDevProfileSigner } from '../src/modules/device-profiles/profile.signer.js';

describe('Pact-as-Code Apple/Android Device Profile Compiler & Enrollment API (PLAN-06)', () => {
  let app: FastifyInstance;
  let inMemoryAuthRepo: InMemoryAuthRepository;
  let inMemoryChildrenRepo: InMemoryChildrenRepository;
  let inMemoryAgreementsRepo: InMemoryAgreementsRepository;
  let inMemoryDeviceProfilesRepo: InMemoryDeviceProfilesRepository;

  let userACookie: string;
  let userBCookie: string;
  let childAId: string;
  let agreementAId: string;

  beforeEach(async () => {
    inMemoryAuthRepo = new InMemoryAuthRepository();
    inMemoryChildrenRepo = new InMemoryChildrenRepository();
    inMemoryAgreementsRepo = new InMemoryAgreementsRepository();
    inMemoryDeviceProfilesRepo = new InMemoryDeviceProfilesRepository();

    const fakeSigner = new FakeDevProfileSigner(true);
    const compiler = new StandardDeviceProfileCompiler(fakeSigner);

    app = await buildApp({
      logger: false,
      authRepository: inMemoryAuthRepo,
      childrenRepository: inMemoryChildrenRepo,
      agreementsRepository: inMemoryAgreementsRepo,
      deviceProfilesRepository: inMemoryDeviceProfilesRepo,
      profileCompiler: compiler,
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });

    // Register User A
    const userARes = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: {
        email: 'parent.mdm@example.com',
        password: 'Password123!',
        fullName: 'Parent MDM',
      },
    });
    expect(userARes.statusCode).toBe(201);
    const cookiesA = userARes.headers['set-cookie'] as string | string[];
    userACookie = (Array.isArray(cookiesA) ? cookiesA[0] : cookiesA) ?? '';

    // Register User B
    const userBRes = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: {
        email: 'other.parent@example.com',
        password: 'Password123!',
        fullName: 'Other Parent',
      },
    });
    expect(userBRes.statusCode).toBe(201);
    const cookiesB = userBRes.headers['set-cookie'] as string | string[];
    userBCookie = (Array.isArray(cookiesB) ? cookiesB[0] : cookiesB) ?? '';

    // Create child for User A
    const childRes = await app.inject({
      method: 'POST',
      url: '/api/v1/children',
      headers: { cookie: userACookie },
      payload: {
        name: 'Noah',
        birthYear: 2014,
        birthMonth: 8,
        roadType: 'ACTIVE_DEVICE',
      },
    });
    expect(childRes.statusCode).toBe(201);
    childAId = childRes.json().data.child.id;

    // Create signed agreement for User A
    const agreementRes = await app.inject({
      method: 'POST',
      url: '/api/v1/agreements',
      headers: { cookie: userACookie },
      payload: {
        childId: childAId,
        title: "Noah's Bilateral Pact",
        developmentalTier: 'TIER_3_AGES_12_13',
        roadType: 'ACTIVE_DEVICE',
        parentSignature: 'data:image/png;base64,parent_sig',
        childSignature: 'data:image/png;base64,child_sig',
        clauses: [
          {
            category: 'DEVICE_CURFEW',
            party: 'CHILD',
            title: '8:30 PM Bedtime Kitchen Docking',
            description: 'Phone in kitchen by 8:30 PM.',
          },
          {
            category: 'PARENT_COMMITMENT',
            party: 'PARENT',
            title: 'No-Snooping Safe Harbor',
            description: 'Parents respect private chats.',
          },
        ],
      },
    });
    expect(agreementRes.statusCode).toBe(201);
    agreementAId = agreementRes.json().data.agreement.id;
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /api/v1/agreements/:id/compile-profile', () => {
    it('compiles agreement into a signed Apple .mobileconfig profile and returns enrollmentToken and QR URL', async () => {
      const response = await app.inject({
        method: 'POST',
        url: `/api/v1/agreements/${agreementAId}/compile-profile`,
        headers: { cookie: userACookie },
        payload: {
          platform: 'APPLE_IOS',
          bedtimeCurfewTime: '20:30',
        },
      });

      expect(response.statusCode).toBe(201);
      const body = response.json();
      expect(body.success).toBe(true);
      expect(body.data.profile).toBeDefined();
      expect(body.data.profile.id).toBeDefined();
      expect(body.data.profile.status).toBe('PENDING_ENROLLMENT');
      expect(body.data.profile.enrollmentToken).toBeDefined();
      expect(body.data.profile.bedtimeCurfewTime).toBe('20:30');
      expect(body.data.profile.enrollmentQrCodeUrl).toContain('/api/v1/devices/qr/');
      expect(body.data.profile.otaEnrollmentUrl).toContain('/api/v1/devices/enroll/');
    });

    it('rejects cross-tenant profile compilation attempts', async () => {
      const response = await app.inject({
        method: 'POST',
        url: `/api/v1/agreements/${agreementAId}/compile-profile`,
        headers: { cookie: userBCookie },
        payload: {
          platform: 'APPLE_IOS',
          bedtimeCurfewTime: '20:30',
        },
      });

      expect(response.statusCode).toBe(404);
    });

    it('rejects invalid curfew format (must be 24-hr HH:MM)', async () => {
      const response = await app.inject({
        method: 'POST',
        url: `/api/v1/agreements/${agreementAId}/compile-profile`,
        headers: { cookie: userACookie },
        payload: {
          platform: 'APPLE_IOS',
          bedtimeCurfewTime: '8:30 PM', // invalid format, should be 20:30
        },
      });

      expect(response.statusCode).toBe(400);
      const body = response.json();
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('GET /api/v1/devices/enroll/:token (OTA Profile Delivery)', () => {
    it('serves Apple .mobileconfig XML plist with correct application/x-apple-aspen-config MIME header and activates profile', async () => {
      // 1. Compile profile
      const compileRes = await app.inject({
        method: 'POST',
        url: `/api/v1/agreements/${agreementAId}/compile-profile`,
        headers: { cookie: userACookie },
        payload: {
          platform: 'APPLE_IOS',
          bedtimeCurfewTime: '20:30',
        },
      });
      const enrollmentToken = compileRes.json().data.profile.enrollmentToken;

      // 2. Fetch OTA profile as child iOS device would
      const enrollRes = await app.inject({
        method: 'GET',
        url: `/api/v1/devices/enroll/${enrollmentToken}`,
      });

      expect(enrollRes.statusCode).toBe(200);
      expect(enrollRes.headers['content-type']).toBe(
        'application/x-apple-aspen-config; charset=utf-8'
      );
      expect(enrollRes.headers['content-disposition']).toContain(
        'AlongSide_Protection.mobileconfig'
      );

      const rawPayload = enrollRes.rawPayload.toString('utf-8');
      expect(rawPayload).toContain('<plist version="1.0">');
      expect(rawPayload).toContain('com.apple.applicationaccess');
      expect(rawPayload).toContain('20:30');
      expect(rawPayload).toContain('com.apple.mobilephone');
      expect(rawPayload).toContain('com.apple.MobileSMS');
      expect(rawPayload).toContain('911');
      expect(rawPayload).toContain('988');

      // 3. Verify status has transitioned to ACTIVE
      const qrRes = await app.inject({
        method: 'GET',
        url: `/api/v1/devices/qr/${enrollmentToken}`,
      });
      expect(qrRes.statusCode).toBe(200);
      expect(qrRes.json().data.status).toBe('ACTIVE');
    });

    it('returns 404 for invalid enrollment token', async () => {
      const enrollRes = await app.inject({
        method: 'GET',
        url: '/api/v1/devices/enroll/non_existent_token_123',
      });

      expect(enrollRes.statusCode).toBe(404);
    });
  });

  describe('POST /api/v1/devices/heartbeat/:token', () => {
    it('records device connection and updates tamper status', async () => {
      const compileRes = await app.inject({
        method: 'POST',
        url: `/api/v1/agreements/${agreementAId}/compile-profile`,
        headers: { cookie: userACookie },
        payload: {
          platform: 'APPLE_IOS',
          bedtimeCurfewTime: '20:30',
        },
      });
      const enrollmentToken = compileRes.json().data.profile.enrollmentToken;

      const heartbeatRes = await app.inject({
        method: 'POST',
        url: `/api/v1/devices/heartbeat/${enrollmentToken}`,
        payload: {
          tamperDetected: false,
        },
      });

      expect(heartbeatRes.statusCode).toBe(200);
      const heartbeatBody = heartbeatRes.json();
      expect(heartbeatBody.success).toBe(true);
      expect(heartbeatBody.data.profile.status).toBe('ACTIVE');
      expect(heartbeatBody.data.profile.lastHeartbeatAt).toBeDefined();
      expect(heartbeatBody.data.profile.tamperDetected).toBe(false);
    });

    it('reports tamper detected flag on MDM profile removal attempt', async () => {
      const compileRes = await app.inject({
        method: 'POST',
        url: `/api/v1/agreements/${agreementAId}/compile-profile`,
        headers: { cookie: userACookie },
        payload: {
          platform: 'APPLE_IOS',
          bedtimeCurfewTime: '20:30',
        },
      });
      const enrollmentToken = compileRes.json().data.profile.enrollmentToken;

      const tamperRes = await app.inject({
        method: 'POST',
        url: `/api/v1/devices/heartbeat/${enrollmentToken}`,
        payload: {
          tamperDetected: true,
        },
      });

      expect(tamperRes.statusCode).toBe(200);
      expect(tamperRes.json().data.profile.tamperDetected).toBe(true);
    });
  });

  describe('GET /api/v1/devices/qr/:token', () => {
    it('returns QR enrollment instructions and enrollment URL', async () => {
      const compileRes = await app.inject({
        method: 'POST',
        url: `/api/v1/agreements/${agreementAId}/compile-profile`,
        headers: { cookie: userACookie },
        payload: {
          platform: 'APPLE_IOS',
          bedtimeCurfewTime: '20:30',
        },
      });
      const enrollmentToken = compileRes.json().data.profile.enrollmentToken;

      const qrRes = await app.inject({
        method: 'GET',
        url: `/api/v1/devices/qr/${enrollmentToken}`,
      });

      expect(qrRes.statusCode).toBe(200);
      const qrBody = qrRes.json();
      expect(qrBody.success).toBe(true);
      expect(qrBody.data.token).toBe(enrollmentToken);
      expect(qrBody.data.enrollmentUrl).toBe(`/api/v1/devices/enroll/${enrollmentToken}`);
      expect(qrBody.data.instructions).toBeDefined();
    });
  });
});
