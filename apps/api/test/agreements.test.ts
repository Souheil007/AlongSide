import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { InMemoryAuthRepository } from '../src/modules/auth/auth.repository.js';
import { InMemoryChildrenRepository } from '../src/modules/children/children.repository.js';
import { InMemoryAgreementsRepository } from '../src/modules/agreements/agreements.repository.js';
import { StandardVectorPdfRenderer } from '../src/modules/agreements/pdf.service.js';

describe('Bilateral Family Pact & Agreement Engine API (PLAN-06)', () => {
  let app: FastifyInstance;
  let inMemoryAuthRepo: InMemoryAuthRepository;
  let inMemoryChildrenRepo: InMemoryChildrenRepository;
  let inMemoryAgreementsRepo: InMemoryAgreementsRepository;

  let userACookie: string;
  let userBCookie: string;
  let childAId: string;

  beforeEach(async () => {
    inMemoryAuthRepo = new InMemoryAuthRepository();
    inMemoryChildrenRepo = new InMemoryChildrenRepository();
    inMemoryAgreementsRepo = new InMemoryAgreementsRepository();

    app = await buildApp({
      logger: false,
      authRepository: inMemoryAuthRepo,
      childrenRepository: inMemoryChildrenRepo,
      agreementsRepository: inMemoryAgreementsRepo,
      pdfRenderer: new StandardVectorPdfRenderer(),
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });

    // Register User A (Parent A)
    const userARes = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: {
        email: 'parent.a@example.com',
        password: 'Password123!',
        fullName: 'Parent A',
      },
    });
    expect(userARes.statusCode).toBe(201);
    const cookiesA = userARes.headers['set-cookie'] as string | string[];
    userACookie = (Array.isArray(cookiesA) ? cookiesA[0] : cookiesA) ?? '';

    // Register User B (Parent B)
    const userBRes = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: {
        email: 'parent.b@example.com',
        password: 'Password123!',
        fullName: 'Parent B',
      },
    });
    expect(userBRes.statusCode).toBe(201);
    const cookiesB = userBRes.headers['set-cookie'] as string | string[];
    userBCookie = (Array.isArray(cookiesB) ? cookiesB[0] : cookiesB) ?? '';

    // Create a child profile for Parent A
    const childRes = await app.inject({
      method: 'POST',
      url: '/api/v1/children',
      headers: { cookie: userACookie },
      payload: {
        name: 'Leo',
        birthYear: 2015,
        birthMonth: 4,
        roadType: 'ACTIVE_DEVICE',
      },
    });
    expect(childRes.statusCode).toBe(201);
    childAId = childRes.json().data.child.id;
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /api/v1/agreements/presets', () => {
    it('returns curated agreement presets grouped by category without authentication', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/agreements/presets?tier=TIER_2_AGES_10_11&roadType=ACTIVE_DEVICE',
      });

      expect(response.statusCode).toBe(200);
      const body = response.json();
      expect(body.success).toBe(true);
      expect(body.data.presets).toBeInstanceOf(Array);
      expect(body.data.presets.length).toBeGreaterThanOrEqual(6);

      // Verify canonical 8:30 PM bedtime curfew clause
      const curfewClause = body.data.presets.find(
        (p: any) => p.category === 'DEVICE_CURFEW'
      );
      expect(curfewClause).toBeDefined();
      expect(curfewClause.title).toContain('8:30 PM');
      expect(curfewClause.party).toBe('CHILD');

      // Verify No-Snooping Safe Harbor parent commitment
      const safeHarborClause = body.data.presets.find(
        (p: any) =>
          p.category === 'PARENT_COMMITMENT' &&
          p.title.includes('No-Snooping Safe Harbor')
      );
      expect(safeHarborClause).toBeDefined();
      expect(safeHarborClause.party).toBe('PARENT');
    });

    it('rejects invalid tier with 400 validation error', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/agreements/presets?tier=INVALID_TIER',
      });

      expect(response.statusCode).toBe(400);
      const body = response.json();
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('POST /api/v1/agreements', () => {
    it('rejects unauthenticated request with 401', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/agreements',
        payload: {
          childId: childAId,
          title: "Leo's Treaty",
          developmentalTier: 'TIER_2_AGES_10_11',
          roadType: 'ACTIVE_DEVICE',
          clauses: [
            {
              category: 'DEVICE_CURFEW',
              party: 'CHILD',
              title: '8:30 PM Curfew',
              description: 'Dock phone in kitchen',
            },
          ],
        },
      });

      expect(response.statusCode).toBe(401);
    });

    it('creates a DRAFT agreement when co-signatures are pending', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/agreements',
        headers: { cookie: userACookie },
        payload: {
          childId: childAId,
          title: 'Leo & Dad Family Tech Treaty',
          developmentalTier: 'TIER_2_AGES_10_11',
          roadType: 'ACTIVE_DEVICE',
          clauses: [
            {
              category: 'DEVICE_CURFEW',
              party: 'CHILD',
              title: '8:30 PM Bedtime Docking',
              description: 'Phone docks in kitchen at 8:30 PM.',
            },
            {
              category: 'PARENT_COMMITMENT',
              party: 'PARENT',
              title: 'No-Snooping Safe Harbor',
              description: 'Parents respect private conversations.',
            },
          ],
        },
      });

      expect(response.statusCode).toBe(201);
      const body = response.json();
      expect(body.success).toBe(true);
      expect(body.data.agreement.id).toBeDefined();
      expect(body.data.agreement.title).toBe('Leo & Dad Family Tech Treaty');
      expect(body.data.agreement.status).toBe('DRAFT');
      expect(body.data.agreement.clauses).toHaveLength(2);
      expect(body.data.agreement.signedAt).toBeNull();
    });

    it('creates a SIGNED agreement when both parent and child signatures are provided', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/agreements',
        headers: { cookie: userACookie },
        payload: {
          childId: childAId,
          title: 'Leo & Sarah Bilateral Pact',
          developmentalTier: 'TIER_2_AGES_10_11',
          roadType: 'ACTIVE_DEVICE',
          parentSignature: 'data:image/png;base64,parent_sig_fake',
          childSignature: 'data:image/png;base64,child_sig_fake',
          clauses: [
            {
              category: 'DEVICE_CURFEW',
              party: 'CHILD',
              title: '8:30 PM Docking',
              description: 'Kitchen station dock.',
            },
          ],
        },
      });

      expect(response.statusCode).toBe(201);
      const body = response.json();
      expect(body.success).toBe(true);
      expect(body.data.agreement.status).toBe('SIGNED');
      expect(body.data.agreement.signedAt).toBeDefined();
      expect(body.data.agreement.parentSignature).toBe('data:image/png;base64,parent_sig_fake');
      expect(body.data.agreement.childSignature).toBe('data:image/png;base64,child_sig_fake');
    });
  });

  describe('GET /api/v1/agreements/:id & Cross-Tenant Security', () => {
    it('retrieves an existing agreement for the owning parent', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/v1/agreements',
        headers: { cookie: userACookie },
        payload: {
          childId: childAId,
          title: 'Leo Agreement',
          developmentalTier: 'TIER_2_AGES_10_11',
          roadType: 'ACTIVE_DEVICE',
          clauses: [
            {
              category: 'SCREEN_TIME',
              party: 'CHILD',
              title: '1 Hour Screen Time',
              description: 'Only after homework.',
            },
          ],
        },
      });
      const agreementId = createRes.json().data.agreement.id;

      const getRes = await app.inject({
        method: 'GET',
        url: `/api/v1/agreements/${agreementId}`,
        headers: { cookie: userACookie },
      });

      expect(getRes.statusCode).toBe(200);
      const getBody = getRes.json();
      expect(getBody.success).toBe(true);
      expect(getBody.data.agreement.id).toBe(agreementId);
    });

    it('denies access to an agreement created by another parent (Tenant Isolation)', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/v1/agreements',
        headers: { cookie: userACookie },
        payload: {
          childId: childAId,
          title: 'Secret Agreement A',
          developmentalTier: 'TIER_2_AGES_10_11',
          roadType: 'ACTIVE_DEVICE',
          clauses: [
            {
              category: 'SCREEN_TIME',
              party: 'CHILD',
              title: 'Secret Clause',
              description: 'Private.',
            },
          ],
        },
      });
      const agreementId = createRes.json().data.agreement.id;

      // User B attempts to access User A's agreement
      const accessRes = await app.inject({
        method: 'GET',
        url: `/api/v1/agreements/${agreementId}`,
        headers: { cookie: userBCookie },
      });

      expect(accessRes.statusCode).toBe(404);
    });
  });

  describe('PUT /api/v1/agreements/:id', () => {
    it('updates agreement title and transitions status to SIGNED upon adding signatures', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/v1/agreements',
        headers: { cookie: userACookie },
        payload: {
          childId: childAId,
          title: 'Draft Treaty',
          developmentalTier: 'TIER_2_AGES_10_11',
          roadType: 'ACTIVE_DEVICE',
          clauses: [
            {
              category: 'DEVICE_CURFEW',
              party: 'CHILD',
              title: '8:30 PM Docking',
              description: 'Bedtime docking.',
            },
          ],
        },
      });
      const agreementId = createRes.json().data.agreement.id;
      expect(createRes.json().data.agreement.status).toBe('DRAFT');

      const updateRes = await app.inject({
        method: 'PUT',
        url: `/api/v1/agreements/${agreementId}`,
        headers: { cookie: userACookie },
        payload: {
          title: 'Final Signed Family Tech Treaty',
          parentSignature: 'data:image/png;base64,parent_sig',
          childSignature: 'data:image/png;base64,child_sig',
        },
      });

      expect(updateRes.statusCode).toBe(200);
      const updateBody = updateRes.json();
      expect(updateBody.success).toBe(true);
      expect(updateBody.data.agreement.title).toBe('Final Signed Family Tech Treaty');
      expect(updateBody.data.agreement.status).toBe('SIGNED');
      expect(updateBody.data.agreement.signedAt).toBeDefined();
    });
  });

  describe('GET /api/v1/agreements/:id/export-pdf', () => {
    it('streams high-fidelity refrigerator-ready vector PDF with application/pdf header', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/api/v1/agreements',
        headers: { cookie: userACookie },
        payload: {
          childId: childAId,
          title: 'Leo Bilateral Media Treaty',
          developmentalTier: 'TIER_2_AGES_10_11',
          roadType: 'ACTIVE_DEVICE',
          parentSignature: 'data:image/png;base64,sig1',
          childSignature: 'data:image/png;base64,sig2',
          clauses: [
            {
              category: 'DEVICE_CURFEW',
              party: 'CHILD',
              title: '8:30 PM Bedtime Kitchen Docking',
              description:
                'All devices plug into kitchen charging basket at 8:30 PM sharp.',
            },
            {
              category: 'PARENT_COMMITMENT',
              party: 'PARENT',
              title: 'No-Snooping Safe Harbor Guarantee',
              description:
                'Parents promise never to secretively read personal text messages without safety emergency.',
            },
          ],
        },
      });
      const agreementId = createRes.json().data.agreement.id;

      const pdfRes = await app.inject({
        method: 'GET',
        url: `/api/v1/agreements/${agreementId}/export-pdf`,
        headers: { cookie: userACookie },
      });

      expect(pdfRes.statusCode).toBe(200);
      expect(pdfRes.headers['content-type']).toContain('application/pdf');
      expect(pdfRes.headers['content-disposition']).toContain('Leo_Bilateral_Media_Treaty.pdf');

      // Assert vector PDF header and contents
      const rawPdf = pdfRes.rawPayload.toString('utf-8');
      expect(rawPdf.startsWith('%PDF-1.4')).toBe(true);
      expect(rawPdf).toContain('ALONGSIDE BILATERAL FAMILY PACT');
      expect(rawPdf).toContain('SAFE HARBOR GUARANTEE');
      expect(rawPdf).toContain('%%EOF');
    });
  });
});
