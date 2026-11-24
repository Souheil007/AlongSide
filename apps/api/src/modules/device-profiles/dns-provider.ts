import { randomBytes } from 'node:crypto';
import {
  DnsProviderType,
  type ShieldBlockableService,
  type UpdateDeviceShieldInput,
} from '@alongside/shared';

export interface ProvisionedDnsProfile {
  providerType: DnsProviderType;
  providerProfileId: string;
  dohUrl: string;
  dotHostname: string;
  ipv4Servers: string[];
  ipv6Servers: string[];
}

export interface DnsHealthSummary {
  isActive: boolean;
  totalQueries24h: number;
  blockedQueries24h: number;
  checkedAt: string;
}

export class DnsProviderError extends Error {
  readonly statusCode: number;
  readonly code: string;

  constructor(
    message: string,
    code = 'DNS_PROVIDER_ERROR',
    statusCode = 502
  ) {
    super(message);
    this.name = 'DnsProviderError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

/**
 * Provider-agnostic seam for per-child live DNS parental control enforcement.
 * Swap NextDNS (MVP) -> Control D or self-hosted dns.alongside.care without
 * touching services, routes, DB schema, or frontend components.
 */
export interface DnsPolicyProvider {
  readonly providerType: DnsProviderType;
  createProfile(input: {
    displayName: string;
    policy: UpdateDeviceShieldInput;
  }): Promise<ProvisionedDnsProfile>;
  syncPolicy(
    providerProfileId: string,
    policy: UpdateDeviceShieldInput
  ): Promise<void>;
  getHealthSummary(providerProfileId: string): Promise<DnsHealthSummary>;
  deleteProfile(providerProfileId: string): Promise<void>;
  resolveEndpoints(providerProfileId: string): ProvisionedDnsProfile;
}

export const NEXTDNS_IPV4_SERVERS = ['45.90.28.0', '45.90.30.0'];
export const NEXTDNS_IPV6_SERVERS = ['2a07:a8c0::', '2a07:a8c1::'];

const DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

/**
 * Maps Alongside's canonical provider-neutral shield policy to NextDNS's
 * verified /parentalControl JSON payload.
 */
export function mapPolicyToNextDnsParentalControl(
  policy: UpdateDeviceShieldInput
): Record<string, unknown> {
  const blockedSet = new Set<ShieldBlockableService>(policy.blockedServices);
  const bedtimeOnlySet = new Set<ShieldBlockableService>(
    policy.bedtimeEnabled ? policy.bedtimeServices : []
  );

  const services: Array<{ id: string; active: boolean; recreation?: boolean }> = [];
  for (const id of blockedSet) {
    services.push({ id, active: true, recreation: false });
  }
  for (const id of bedtimeOnlySet) {
    if (!blockedSet.has(id)) {
      services.push({ id, active: true, recreation: true });
    }
  }

  const categories = policy.blockAdultContent
    ? [
        { id: 'porn', active: true },
        { id: 'gambling', active: true },
        { id: 'dating', active: true },
      ]
    : [];

  // NextDNS recreation times specify the ALLOWED single-day daytime window (bedtimeEnd -> bedtimeStart)
  const times: Record<string, { start: string; end: string }> = {};
  if (policy.bedtimeEnabled && bedtimeOnlySet.size > 0) {
    const dayStart = `${policy.bedtimeEnd}:00`;
    const dayEnd =
      policy.bedtimeEnd < policy.bedtimeStart
        ? `${policy.bedtimeStart}:00`
        : '23:59:59';
    for (const day of DAYS_OF_WEEK) {
      times[day] = {
        start: dayStart,
        end: dayEnd,
      };
    }
  }

  return {
    services,
    categories,
    safeSearch: policy.safeSearch,
    youtubeRestrictedMode: policy.youtubeRestrictedMode,
    blockBypass: policy.blockBypass,
    recreation: {
      times,
      timezone: policy.timezone || 'UTC',
    },
  };
}

export interface NextDnsAdapterOptions {
  apiKey: string;
  baseUrl?: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

/**
 * Production NextDNS REST API v1 Adapter.
 * Strictly avoids browsing-log endpoints (/logs); only syncs parentalControl
 * policy and reads aggregate 24-hour status counters (/analytics/status).
 */
export class NextDnsPolicyAdapter implements DnsPolicyProvider {
  readonly providerType = DnsProviderType.NEXTDNS;
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;
  private readonly timeoutMs: number;

  constructor(opts: NextDnsAdapterOptions) {
    this.apiKey = opts.apiKey;
    this.baseUrl = (opts.baseUrl || 'https://api.nextdns.io').replace(/\/$/, '');
    this.fetchImpl = opts.fetchImpl || globalThis.fetch;
    this.timeoutMs = opts.timeoutMs ?? 5000;
  }

  resolveEndpoints(providerProfileId: string): ProvisionedDnsProfile {
    const cleanId = encodeURIComponent(providerProfileId);
    return {
      providerType: this.providerType,
      providerProfileId,
      dohUrl: `https://dns.nextdns.io/${cleanId}`,
      dotHostname: `${providerProfileId}.dns.nextdns.io`,
      ipv4Servers: [...NEXTDNS_IPV4_SERVERS],
      ipv6Servers: [...NEXTDNS_IPV6_SERVERS],
    };
  }

  async createProfile(input: {
    displayName: string;
    policy: UpdateDeviceShieldInput;
  }): Promise<ProvisionedDnsProfile> {
    const res = await this.requestJson<{
      data?: { id?: string };
      errors?: Array<{ code: string }>;
    }>('/profiles', {
      method: 'POST',
      body: JSON.stringify({
        name: input.displayName,
        parentalControl: mapPolicyToNextDnsParentalControl(input.policy),
      }),
    });

    let profileId = res?.data?.id;

    // Handle duplicate profile name by looking up existing NextDNS profile
    if (!profileId && res?.errors?.some((e) => e.code === 'duplicate')) {
      const existing = await this.requestJson<{
        data?: Array<{ id: string; name: string }>;
      }>('/profiles', {
        method: 'GET',
      });
      const match = existing?.data?.find(
        (p) =>
          p.name?.trim().toLowerCase() === input.displayName.trim().toLowerCase()
      );
      if (match?.id) {
        profileId = match.id;
        await this.syncPolicy(profileId, input.policy);
      } else if (existing?.data?.[0]?.id) {
        profileId = existing.data[0].id;
        await this.syncPolicy(profileId, input.policy);
      }
    }

    if (!profileId) {
      throw new DnsProviderError(
        'NextDNS did not return a profile ID on creation.',
        'DNS_PROVIDER_INVALID_RESPONSE',
        502
      );
    }

    return this.resolveEndpoints(profileId);
  }

  async syncPolicy(
    providerProfileId: string,
    policy: UpdateDeviceShieldInput
  ): Promise<void> {
    const cleanId = encodeURIComponent(providerProfileId);
    await this.requestJson(`/profiles/${cleanId}/parentalControl`, {
      method: 'PATCH',
      body: JSON.stringify(mapPolicyToNextDnsParentalControl(policy)),
    });
  }

  async getHealthSummary(providerProfileId: string): Promise<DnsHealthSummary> {
    const cleanId = encodeURIComponent(providerProfileId);
    const res = await this.requestJson<{
      data?: Array<{ status?: string; queries?: number }>;
    }>(`/profiles/${cleanId}/analytics/status?from=-24h`, {
      method: 'GET',
    });

    const rows = Array.isArray(res?.data) ? res.data : [];
    let totalQueries24h = 0;
    let blockedQueries24h = 0;

    for (const row of rows) {
      const count = typeof row.queries === 'number' ? row.queries : 0;
      totalQueries24h += count;
      if (row.status === 'blocked') {
        blockedQueries24h += count;
      }
    }

    return {
      isActive: totalQueries24h > 0,
      totalQueries24h,
      blockedQueries24h,
      checkedAt: new Date().toISOString(),
    };
  }

  async deleteProfile(providerProfileId: string): Promise<void> {
    const cleanId = encodeURIComponent(providerProfileId);
    await this.requestJson(`/profiles/${cleanId}`, {
      method: 'DELETE',
    });
  }

  private async requestJson<T = unknown>(
    path: string,
    init: { method: string; body?: string }
  ): Promise<T> {
    let response: Response;
    try {
      response = await this.fetchImpl(`${this.baseUrl}${path}`, {
        method: init.method,
        headers: {
          'X-Api-Key': this.apiKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: init.body,
        signal: AbortSignal.timeout(this.timeoutMs),
      });
    } catch (err) {
      throw new DnsProviderError(
        `Unable to reach NextDNS API: ${err instanceof Error ? err.message : 'network error'}`,
        'DNS_PROVIDER_UNREACHABLE',
        502
      );
    }

    if (!response.ok) {
      throw new DnsProviderError(
        `NextDNS API returned HTTP ${response.status}.`,
        'DNS_PROVIDER_UPSTREAM_ERROR',
        502
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const text = await response.text();
    if (!text.trim()) {
      return undefined as T;
    }

    return JSON.parse(text) as T;
  }
}

/**
 * In-Memory Deterministic Fake for Unit, Integration, and Local Dev without API Keys.
 */
export class InMemoryDnsPolicyFake implements DnsPolicyProvider {
  readonly providerType = DnsProviderType.FAKE;
  readonly profiles = new Map<
    string,
    {
      displayName: string;
      policy: UpdateDeviceShieldInput;
      totalQueries24h: number;
      blockedQueries24h: number;
    }
  >();

  resolveEndpoints(providerProfileId: string): ProvisionedDnsProfile {
    return {
      providerType: this.providerType,
      providerProfileId,
      dohUrl: `https://dns.nextdns.io/${providerProfileId}`,
      dotHostname: `${providerProfileId}.dns.nextdns.io`,
      ipv4Servers: [...NEXTDNS_IPV4_SERVERS],
      ipv6Servers: [...NEXTDNS_IPV6_SERVERS],
    };
  }

  async createProfile(input: {
    displayName: string;
    policy: UpdateDeviceShieldInput;
  }): Promise<ProvisionedDnsProfile> {
    const id = randomBytes(3).toString('hex');
    this.profiles.set(id, {
      displayName: input.displayName,
      policy: structuredClone(input.policy),
      totalQueries24h: 0,
      blockedQueries24h: 0,
    });
    return this.resolveEndpoints(id);
  }

  async syncPolicy(
    providerProfileId: string,
    policy: UpdateDeviceShieldInput
  ): Promise<void> {
    const existing = this.profiles.get(providerProfileId);
    if (!existing) {
      this.profiles.set(providerProfileId, {
        displayName: 'Alongside Child',
        policy: structuredClone(policy),
        totalQueries24h: 0,
        blockedQueries24h: 0,
      });
      return;
    }
    existing.policy = structuredClone(policy);
  }

  async getHealthSummary(providerProfileId: string): Promise<DnsHealthSummary> {
    const existing = this.profiles.get(providerProfileId);
    const total = existing?.totalQueries24h ?? 0;
    const blocked = existing?.blockedQueries24h ?? 0;
    return {
      isActive: total > 0,
      totalQueries24h: total,
      blockedQueries24h: blocked,
      checkedAt: new Date().toISOString(),
    };
  }

  async deleteProfile(providerProfileId: string): Promise<void> {
    this.profiles.delete(providerProfileId);
  }

  simulateActivity(
    providerProfileId: string,
    totalQueries24h: number,
    blockedQueries24h: number
  ): void {
    const existing = this.profiles.get(providerProfileId);
    if (existing) {
      existing.totalQueries24h = totalQueries24h;
      existing.blockedQueries24h = blockedQueries24h;
    }
  }
}

class UnconfiguredDnsPolicyProvider implements DnsPolicyProvider {
  readonly providerType = DnsProviderType.NEXTDNS;

  resolveEndpoints(providerProfileId: string): ProvisionedDnsProfile {
    return {
      providerType: this.providerType,
      providerProfileId,
      dohUrl: `https://dns.nextdns.io/${providerProfileId}`,
      dotHostname: `${providerProfileId}.dns.nextdns.io`,
      ipv4Servers: [...NEXTDNS_IPV4_SERVERS],
      ipv6Servers: [...NEXTDNS_IPV6_SERVERS],
    };
  }

  private fail(): never {
    throw new DnsProviderError(
      'DNS parental control provider is not configured. Set NEXTDNS_API_KEY in server environment.',
      'DNS_PROVIDER_UNCONFIGURED',
      503
    );
  }

  async createProfile(): Promise<ProvisionedDnsProfile> {
    return this.fail();
  }
  async syncPolicy(): Promise<void> {
    return this.fail();
  }
  async getHealthSummary(): Promise<DnsHealthSummary> {
    return this.fail();
  }
  async deleteProfile(): Promise<void> {
    return this.fail();
  }
}

export function resolveDefaultDnsPolicyProvider(): DnsPolicyProvider {
  const providerPref = (process.env.DNS_PROVIDER || 'nextdns').toLowerCase();
  const nextDnsKey = process.env.NEXTDNS_API_KEY?.trim();

  if (providerPref !== 'fake' && nextDnsKey) {
    return new NextDnsPolicyAdapter({ apiKey: nextDnsKey });
  }

  if (process.env.NODE_ENV === 'production') {
    return new UnconfiguredDnsPolicyProvider();
  }

  return new InMemoryDnsPolicyFake();
}
