import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { parse as parsePlist } from 'plist';
import type { FastifyInstance } from 'fastify';
import {
  buildRecommendedShieldPolicy,
  ShieldBlockableService,
  ShieldPlatform,
} from '@alongside/shared';
import { buildApp } from '../src/app.js';
import { InMemoryAuthRepository } from '../src/modules/auth/auth.repository.js';
import { InMemoryChildrenRepository } from '../src/modules/children/children.repository.js';
import { InMemoryAgreementsRepository } from '../src/modules/agreements/agreements.repository.js';
import { InMemoryDeviceProfilesRepository } from '../src/modules/device-profiles/device-profiles.repository.js';
import { InMemoryDeviceShieldRepository } from '../src/modules/device-profiles/device-shield.repository.js';
import {
  InMemoryDnsPolicyFake,
  NextDnsPolicyAdapter,
  mapPolicyToNextDnsParentalControl,
  DnsProviderError,
} from '../src/modules/device-profiles/dns-provider.js';
import { StandardDeviceProfileCompiler } from '../src/modules/device-profiles/profile.compiler.js';
import { FakeDevProfileSigner } from '../src/modules/device-profiles/profile.signer.js';

describe('Live DNS Parental Control Shield & Apple DoH Mobileconfig API (PLAN-52)', () => {
  let app: FastifyInstance;
  let dnsFake: InMemoryDnsPolicyFake;
  let shieldRepo: InMemoryDeviceShieldRepository;
  let userACookie: string;
  let userBCookie: string;
  let childAId: string;

  beforeEach(async () => {
    dnsFake = new InMemoryDnsPolicyFake();
    shieldRepo = new InMemoryDeviceShieldRepository();

    app = await buildApp({
      logger: false,
      authRepository: new InMemoryAuthRepository(),
      childrenRepository: new InMemoryChildrenRepository(),
      agreementsRepository: new InMemoryAgreementsRepository(),
      deviceProfilesRepository: new InMemoryDeviceProfilesRepository(),
      deviceShieldRepository: shieldRepo,
      dnsPolicyProvider: dnsFake,
      profileCompiler: new StandardDeviceProfileCompiler(
        new FakeDevProfileSigner(true)
      ),
      jwtSecret: 'test_jwt_secret_key_at_least_32_characters_long_for_security',
      cookieSecret: 'test_cookie_secret_key_at_least_32_chars_long',
    });

    const regA = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: {
        email: 'parent.shield@example.com',
        password: 'Password123!',
        fullName: 'Parent Shield',
      },
    });
    expect(regA.statusCode).toBe(201);
    const cookiesA = regA.headers['set-cookie'] as string | string[];
    userACookie = (Array.isArray(cookiesA) ? cookiesA[0] : cookiesA) ?? '';

    const regB = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: {
        email: 'other.shield@example.com',
        password: 'Password123!',
        fullName: 'Other Parent',
      },
    });
    expect(regB.statusCode).toBe(201);
    const cookiesB = regB.headers['set-cookie'] as string | string[];
    userBCookie = (Array.isArray(cookiesB) ? cookiesB[0] : cookiesB) ?? '';

    const childRes = await app.inject({
      method: 'POST',
      url: '/api/v1/children',
      headers: { cookie: userACookie },
      payload: {
        name: 'Leo',
        gender: 'MALE',
        birthYear: new Date().getFullYear() - 10,
        birthMonth: 1,
        roadType: 'ACTIVE_DEVICE',
      },
    });
    expect(childRes.statusCode).toBe(201);
    childAId = childRes.json().data.child.id;
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Pure Age-Calibrated Policy Engine (@alongside/shared)', () => {
    it('returns strict defaults for younger kids and lighter defaults for older teens', () => {
      const age8 = buildRecommendedShieldPolicy(8);
      const age11 = buildRecommendedShieldPolicy(11);
      const age14 = buildRecommendedShieldPolicy(14);
      const age17 = buildRecommendedShieldPolicy(17);

      expect(age8.bedtimeStart).toBe('20:00');
      expect(age8.blockedServices).toContain(ShieldBlockableService.TIKTOK);
      expect(age11.bedtimeStart).toBe('20:30');
      expect(age11.youtubeRestrictedMode).toBe(true);
      expect(age14.bedtimeStart).toBe('21:30');
      expect(age14.bedtimeServices).toContain(ShieldBlockableService.TIKTOK);
      expect(age17.bedtimeEnabled).toBe(false);
      expect(age17.blockAdultContent).toBe(true);
    });
  });

  describe('Shield Lifecycle, Provisioning & OTA Apple DoH .mobileconfig', () => {
    it('returns unprovisioned age-calibrated draft before first save', async () => {
      const res = await app.inject({
        method: 'GET',
        url: `/api/v1/devices/shield/${childAId}`,
        headers: { cookie: userACookie },
      });

      expect(res.statusCode).toBe(200);
      const shield = res.json().data.shield;
      expect(shield.isProvisioned).toBe(false);
      expect(shield.dohUrl).toBeNull();
      expect(shield.blockAdultContent).toBe(true);
      expect(shield.bedtimeStart).toBe('20:30');
      expect(shield.blockedServices).toContain('tiktok');
    });

    it('provisions DNS profile once, syncs updates without duplicates, and serves valid Apple DoH .mobileconfig', async () => {
      // First save -> provisions DNS profile
      const firstPut = await app.inject({
        method: 'PUT',
        url: `/api/v1/devices/shield/${childAId}`,
        headers: { cookie: userACookie },
        payload: {
          platform: ShieldPlatform.APPLE_IOS,
          blockAdultContent: true,
          safeSearch: true,
          youtubeRestrictedMode: true,
          blockBypass: true,
          blockedServices: ['tiktok', 'snapchat', 'discord'],
          bedtimeServices: ['roblox', 'youtube'],
          bedtimeEnabled: true,
          bedtimeStart: '20:30',
          bedtimeEnd: '06:30',
          timezone: 'America/New_York',
        },
      });

      expect(firstPut.statusCode).toBe(200);
      const created = firstPut.json().data.shield;
      expect(created.isProvisioned).toBe(true);
      expect(created.dohUrl).toMatch(/^https:\/\/dns\.nextdns\.io\/[a-f0-9]+$/);
      expect(created.dotHostname).toMatch(/^[a-f0-9]+\.dns\.nextdns\.io$/);
      expect(created.ipv4Servers).toEqual(['45.90.28.0', '45.90.30.0']);
      expect(created.appleProfileDownloadUrl).toContain(created.enrollmentToken);
      expect(dnsFake.profiles.size).toBe(1);

      // Second save -> updates existing profile in-place (still 1 profile)
      const secondPut = await app.inject({
        method: 'PUT',
        url: `/api/v1/devices/shield/${childAId}`,
        headers: { cookie: userACookie },
        payload: {
          platform: ShieldPlatform.ANDROID,
          blockAdultContent: true,
          safeSearch: true,
          youtubeRestrictedMode: false,
          blockBypass: true,
          blockedServices: ['tiktok'],
          bedtimeServices: ['roblox'],
          bedtimeEnabled: true,
          bedtimeStart: '21:00',
          bedtimeEnd: '06:30',
          timezone: 'America/New_York',
        },
      });

      expect(secondPut.statusCode).toBe(200);
      expect(dnsFake.profiles.size).toBe(1);
      expect(secondPut.json().data.shield.bedtimeStart).toBe('21:00');
      expect(secondPut.json().data.shield.platform).toBe('ANDROID');

      // Download Apple .mobileconfig via enrollment token
      const dlRes = await app.inject({
        method: 'GET',
        url: created.appleProfileDownloadUrl,
      });

      expect(dlRes.statusCode).toBe(200);
      expect(dlRes.headers['content-type']).toContain('application/x-apple-aspen-config');
      expect(dlRes.headers['cache-control']).toContain('no-store');
      expect(dlRes.headers['content-disposition']).toContain('Alongside_Leo_Shield.mobileconfig');

      const parsed = parsePlist(dlRes.body) as Record<string, any>;
      expect(parsed.PayloadType).toBe('Configuration');
      expect(parsed.PayloadRemovalDisallowed).toBe(false);
      expect(Array.isArray(parsed.PayloadContent)).toBe(true);

      const dnsPayload = parsed.PayloadContent[0];
      expect(dnsPayload.PayloadType).toBe('com.apple.dnsSettings.managed');
      expect(dnsPayload.ProhibitDisablement).toBe(false);
      expect(dnsPayload.DNSSettings.DNSProtocol).toBe('HTTPS');
      expect(dnsPayload.DNSSettings.ServerURL).toBe(created.dohUrl);
      expect(dnsPayload.DNSSettings.ServerAddresses).toContain('45.90.28.0');

      // Simulate active queries & verify privacy-preserving aggregate status
      const [profileId] = Array.from(dnsFake.profiles.keys());
      dnsFake.simulateActivity(profileId!, 142, 19);

      const statusRes = await app.inject({
        method: 'GET',
        url: `/api/v1/devices/shield/${childAId}/status`,
        headers: { cookie: userACookie },
      });

      expect(statusRes.statusCode).toBe(200);
      const health = statusRes.json().data.health;
      expect(health.isActive).toBe(true);
      expect(health.totalQueries24h).toBe(142);
      expect(health.blockedQueries24h).toBe(19);

      // Verify QR info endpoint
      const qrRes = await app.inject({
        method: 'GET',
        url: created.enrollmentQrUrl,
      });
      expect(qrRes.statusCode).toBe(200);
      expect(qrRes.json().data.dotHostname).toBe(created.dotHostname);
    });
  });

  describe('Security & Multi-Tenant Authorization Isolation', () => {
    it('blocks anonymous access (401) and cross-parent access (404)', async () => {
      const anon = await app.inject({
        method: 'GET',
        url: `/api/v1/devices/shield/${childAId}`,
      });
      expect(anon.statusCode).toBe(401);

      const otherParentGet = await app.inject({
        method: 'GET',
        url: `/api/v1/devices/shield/${childAId}`,
        headers: { cookie: userBCookie },
      });
      expect(otherParentGet.statusCode).toBe(404);

      const otherParentPut = await app.inject({
        method: 'PUT',
        url: `/api/v1/devices/shield/${childAId}`,
        headers: { cookie: userBCookie },
        payload: buildRecommendedShieldPolicy(10),
      });
      expect(otherParentPut.statusCode).toBe(404);

      const badPayload = await app.inject({
        method: 'PUT',
        url: `/api/v1/devices/shield/${childAId}`,
        headers: { cookie: userACookie },
        payload: { ...buildRecommendedShieldPolicy(10), bedtimeStart: '99:99' },
      });
      expect(badPayload.statusCode).toBe(400);

      const unknownProfile = await app.inject({
        method: 'GET',
        url: '/api/v1/devices/shield/profile/nonexistent-token-1234',
      });
      expect(unknownProfile.statusCode).toBe(404);
      expect(unknownProfile.json().error.code).toBe('DEVICE_SHIELD_NOT_FOUND');

      const unknownQr = await app.inject({
        method: 'GET',
        url: '/api/v1/devices/shield/qr/nonexistent-token-1234',
      });
      expect(unknownQr.statusCode).toBe(404);
    });
  });

  describe('NextDnsPolicyAdapter Unit Tests (Mocked HTTP)', () => {
    it('maps policy cleanly to NextDNS parentalControl JSON including recreation window and midnight edge case', () => {
      const payload = mapPolicyToNextDnsParentalControl({
        platform: ShieldPlatform.APPLE_IOS,
        blockAdultContent: true,
        safeSearch: true,
        youtubeRestrictedMode: true,
        blockBypass: true,
        blockedServices: ['tiktok'],
        bedtimeServices: ['roblox', 'tiktok'], // tiktok already fully blocked -> not duplicated
        bedtimeEnabled: true,
        bedtimeStart: '20:30',
        bedtimeEnd: '06:30',
        timezone: 'Europe/Paris',
      }) as any;

      expect(payload.safeSearch).toBe(true);
      expect(payload.youtubeRestrictedMode).toBe(true);
      expect(payload.blockBypass).toBe(true);
      expect(payload.categories.map((c: any) => c.id)).toEqual([
        'porn',
        'gambling',
        'dating',
      ]);
      expect(payload.services).toEqual([
        { id: 'tiktok', active: true, recreation: false },
        { id: 'roblox', active: true, recreation: true },
      ]);
      expect(payload.recreation.timezone).toBe('Europe/Paris');
      expect(payload.recreation.times.monday).toEqual({
        start: '06:30:00',
        end: '20:30:00',
      });

      const midnightPayload = mapPolicyToNextDnsParentalControl({
        ...buildRecommendedShieldPolicy(14),
        bedtimeEnabled: true,
        bedtimeServices: ['tiktok'],
        bedtimeStart: '00:00',
        bedtimeEnd: '07:00',
      }) as any;
      expect(midnightPayload.recreation.times.monday).toEqual({
        start: '07:00:00',
        end: '23:59:59',
      });
    });

    it('sends X-Api-Key header, calls aggregate analytics only, and wraps upstream errors', async () => {
      const calls: Array<{ url: string; method: string; apiKey: string | null }> = [];
      const mockFetch: typeof fetch = async (url, init) => {
        const headers = new Headers(init?.headers);
        calls.push({
          url: String(url),
          method: init?.method || 'GET',
          apiKey: headers.get('X-Api-Key'),
        });

        if (String(url).endsWith('/profiles') && init?.method === 'POST') {
          return new Response(JSON.stringify({ data: { id: 'abc123' } }), { status: 201 });
        }
        if (String(url).includes('/analytics/status')) {
          return new Response(
            JSON.stringify({
              data: [
                { status: 'default', queries: 80 },
                { status: 'blocked', queries: 12 },
              ],
            }),
            { status: 200 }
          );
        }
        return new Response('Upstream failure', { status: 500 });
      };

      const adapter = new NextDnsPolicyAdapter({
        apiKey: 'secret_nextdns_key',
        fetchImpl: mockFetch,
      });

      const created = await adapter.createProfile({
        displayName: 'Alongside - Leo',
        policy: buildRecommendedShieldPolicy(10),
      });
      expect(created.providerProfileId).toBe('abc123');
      expect(created.dohUrl).toBe('https://dns.nextdns.io/abc123');
      expect(created.dotHostname).toBe('abc123.dns.nextdns.io');

      const health = await adapter.getHealthSummary('abc123');
      expect(health.isActive).toBe(true);
      expect(health.totalQueries24h).toBe(92);
      expect(health.blockedQueries24h).toBe(12);

      // Never hits /logs
      expect(calls.every((c) => !c.url.includes('/logs'))).toBe(true);
      expect(calls.every((c) => c.apiKey === 'secret_nextdns_key')).toBe(true);

      await expect(
        adapter.syncPolicy('abc123', buildRecommendedShieldPolicy(10))
      ).rejects.toBeInstanceOf(DnsProviderError);
    });
  });
});
