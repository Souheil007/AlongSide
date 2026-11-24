import {
  buildRecommendedShieldPolicy,
  type DeviceShieldDTO,
  type DeviceShieldHealthDTO,
  type UpdateDeviceShieldInput,
} from '@alongside/shared';
import type { ChildrenRepository } from '../children/children.repository.js';
import type {
  DeviceShieldRecord,
  DeviceShieldRepository,
} from './device-shield.repository.js';
import {
  type DnsPolicyProvider,
  resolveDefaultDnsPolicyProvider,
} from './dns-provider.js';
import {
  type DeviceProfileCompiler,
  StandardDeviceProfileCompiler,
} from './profile.compiler.js';

export class ChildShieldNotFoundError extends Error {
  readonly statusCode = 404;
  readonly code = 'CHILD_NOT_FOUND';

  constructor(message = 'Child profile not found or does not belong to this parent.') {
    super(message);
    this.name = 'ChildShieldNotFoundError';
  }
}

export class ShieldProfileNotFoundError extends Error {
  readonly statusCode = 404;
  readonly code = 'DEVICE_SHIELD_NOT_FOUND';

  constructor(message = 'Device shield profile not found.') {
    super(message);
    this.name = 'ShieldProfileNotFoundError';
  }
}

function computeChildAge(birthYear: number, birthMonth: number): number {
  const now = new Date();
  let age = now.getFullYear() - birthYear;
  if (now.getMonth() + 1 < birthMonth) {
    age -= 1;
  }
  return Math.max(0, age);
}

function sanitizeFilenameSegment(name: string): string {
  return name.replace(/[^a-zA-Z0-9_-]/g, '') || 'Child';
}

export class DeviceShieldService {
  constructor(
    private readonly shieldRepository: DeviceShieldRepository,
    private readonly childrenRepository: ChildrenRepository,
    private readonly dnsProvider: DnsPolicyProvider = resolveDefaultDnsPolicyProvider(),
    private readonly compiler: DeviceProfileCompiler = new StandardDeviceProfileCompiler()
  ) {}

  async getOrInitializeShield(
    userId: string,
    childId: string
  ): Promise<DeviceShieldDTO> {
    const child = await this.childrenRepository.findById(childId, userId);
    if (!child) {
      throw new ChildShieldNotFoundError();
    }

    const existing = await this.shieldRepository.findByChildId(childId);
    if (!existing) {
      const age = computeChildAge(child.birthYear, child.birthMonth);
      const recommended = buildRecommendedShieldPolicy(age);
      return {
        id: null,
        childId,
        platform: recommended.platform,
        providerType: this.dnsProvider.providerType,
        isProvisioned: false,
        dohUrl: null,
        dotHostname: null,
        ipv4Servers: [],
        enrollmentToken: null,
        appleProfileDownloadUrl: null,
        enrollmentQrUrl: null,
        blockAdultContent: recommended.blockAdultContent,
        safeSearch: recommended.safeSearch,
        youtubeRestrictedMode: recommended.youtubeRestrictedMode,
        blockBypass: recommended.blockBypass,
        blockedServices: recommended.blockedServices,
        bedtimeServices: recommended.bedtimeServices,
        bedtimeEnabled: recommended.bedtimeEnabled,
        bedtimeStart: recommended.bedtimeStart,
        bedtimeEnd: recommended.bedtimeEnd,
        timezone: recommended.timezone,
        lastSyncedAt: null,
        health: {
          isActive: false,
          totalQueries24h: 0,
          blockedQueries24h: 0,
          checkedAt: null,
        },
      };
    }

    let health: DeviceShieldHealthDTO = {
      isActive: false,
      totalQueries24h: 0,
      blockedQueries24h: 0,
      checkedAt: null,
    };

    if (existing.providerProfileId) {
      try {
        health = await this.dnsProvider.getHealthSummary(existing.providerProfileId);
      } catch {
        // Return saved config cleanly even if upstream analytics momentarily times out
      }
    }

    return this.mapToDTO(existing, health);
  }

  async upsertAndSyncShield(
    userId: string,
    childId: string,
    input: UpdateDeviceShieldInput
  ): Promise<DeviceShieldDTO> {
    const child = await this.childrenRepository.findById(childId, userId);
    if (!child) {
      throw new ChildShieldNotFoundError();
    }

    const existing = await this.shieldRepository.findByChildId(childId);
    let providerProfileId = existing?.providerProfileId ?? null;

    if (!providerProfileId) {
      const shortId = childId.slice(0, 6);
      const created = await this.dnsProvider.createProfile({
        displayName: `Alongside - ${child.name} (${shortId})`,
        policy: input,
      });
      providerProfileId = created.providerProfileId;
    } else {
      await this.dnsProvider.syncPolicy(providerProfileId, input);
    }

    const saved = await this.shieldRepository.upsertByChildId({
      childId,
      platform: input.platform,
      providerType: this.dnsProvider.providerType,
      providerProfileId,
      blockAdultContent: input.blockAdultContent,
      safeSearch: input.safeSearch,
      youtubeRestrictedMode: input.youtubeRestrictedMode,
      blockBypass: input.blockBypass,
      blockedServices: input.blockedServices,
      bedtimeServices: input.bedtimeServices,
      bedtimeEnabled: input.bedtimeEnabled,
      bedtimeStart: input.bedtimeStart,
      bedtimeEnd: input.bedtimeEnd,
      timezone: input.timezone,
      lastSyncedAt: new Date(),
    });

    let health: DeviceShieldHealthDTO = {
      isActive: false,
      totalQueries24h: 0,
      blockedQueries24h: 0,
      checkedAt: null,
    };
    try {
      health = await this.dnsProvider.getHealthSummary(providerProfileId);
    } catch {
      // Non-fatal on write path
    }

    return this.mapToDTO(saved, health);
  }

  async getLiveStatus(
    userId: string,
    childId: string
  ): Promise<DeviceShieldHealthDTO> {
    const child = await this.childrenRepository.findById(childId, userId);
    if (!child) {
      throw new ChildShieldNotFoundError();
    }

    const existing = await this.shieldRepository.findByChildId(childId);
    if (!existing?.providerProfileId) {
      return {
        isActive: false,
        totalQueries24h: 0,
        blockedQueries24h: 0,
        checkedAt: null,
      };
    }

    return await this.dnsProvider.getHealthSummary(existing.providerProfileId);
  }

  async getAppleMobileConfigByToken(enrollmentToken: string): Promise<{
    payload: Buffer;
    mimeType: string;
    filename: string;
  }> {
    const record = await this.shieldRepository.findByEnrollmentToken(enrollmentToken);
    if (!record || !record.providerProfileId) {
      throw new ShieldProfileNotFoundError(
        'No provisioned Apple Shield profile matches this enrollment token.'
      );
    }

    const endpoints = this.dnsProvider.resolveEndpoints(record.providerProfileId);
    const childName =
      record.child?.name ||
      (await this.childrenRepository.findById(record.childId))?.name ||
      'Child';

    const compiled = await this.compiler.compileEncryptedDnsProfile({
      childName,
      dohUrl: endpoints.dohUrl,
      serverAddresses: [...endpoints.ipv4Servers, ...endpoints.ipv6Servers],
      profileIdentifierSuffix: record.childId.slice(0, 8),
    });

    return {
      payload: compiled.payloadBuffer,
      mimeType: compiled.mimeType,
      filename: `Alongside_${sanitizeFilenameSegment(childName)}_Shield.mobileconfig`,
    };
  }

  async getQrInfoByToken(enrollmentToken: string): Promise<{
    enrollmentToken: string;
    appleProfileDownloadUrl: string;
    dotHostname: string;
    dohUrl: string;
    instructions: string;
  }> {
    const record = await this.shieldRepository.findByEnrollmentToken(enrollmentToken);
    if (!record || !record.providerProfileId) {
      throw new ShieldProfileNotFoundError();
    }
    const endpoints = this.dnsProvider.resolveEndpoints(record.providerProfileId);
    return {
      enrollmentToken,
      appleProfileDownloadUrl: `/api/v1/devices/shield/profile/${enrollmentToken}`,
      dotHostname: endpoints.dotHostname,
      dohUrl: endpoints.dohUrl,
      instructions:
        'Open Camera on your child’s iPhone or iPad, tap the link to download, then open Settings > Profile Downloaded > Install.',
    };
  }

  async provisionInstantGuestProfile(
    childName = 'Child',
    age = 10
  ): Promise<DeviceShieldDTO> {
    const recommended = buildRecommendedShieldPolicy(age);
    const created = await this.dnsProvider.createProfile({
      displayName: `Alongside - ${childName}`,
      policy: recommended,
    });

    const endpoints = this.dnsProvider.resolveEndpoints(created.providerProfileId);
    return {
      id: `guest_${created.providerProfileId}`,
      childId: 'guest',
      platform: recommended.platform,
      providerType: this.dnsProvider.providerType,
      isProvisioned: true,
      dohUrl: endpoints.dohUrl,
      dotHostname: endpoints.dotHostname,
      ipv4Servers: endpoints.ipv4Servers,
      enrollmentToken: created.providerProfileId,
      appleProfileDownloadUrl: `/api/v1/devices/shield/profile/${created.providerProfileId}`,
      enrollmentQrUrl: `/api/v1/devices/shield/qr/${created.providerProfileId}`,
      blockAdultContent: recommended.blockAdultContent,
      safeSearch: recommended.safeSearch,
      youtubeRestrictedMode: recommended.youtubeRestrictedMode,
      blockBypass: recommended.blockBypass,
      blockedServices: recommended.blockedServices,
      bedtimeServices: recommended.bedtimeServices,
      bedtimeEnabled: recommended.bedtimeEnabled,
      bedtimeStart: recommended.bedtimeStart,
      bedtimeEnd: recommended.bedtimeEnd,
      timezone: recommended.timezone,
      lastSyncedAt: new Date().toISOString(),
      health: {
        isActive: true,
        totalQueries24h: 0,
        blockedQueries24h: 0,
        checkedAt: new Date().toISOString(),
      },
    };
  }

  private mapToDTO(
    record: DeviceShieldRecord,
    health: DeviceShieldHealthDTO
  ): DeviceShieldDTO {
    const endpoints = record.providerProfileId
      ? this.dnsProvider.resolveEndpoints(record.providerProfileId)
      : null;

    return {
      id: record.id,
      childId: record.childId,
      platform: record.platform,
      providerType: record.providerType,
      isProvisioned: Boolean(record.providerProfileId),
      dohUrl: endpoints?.dohUrl ?? null,
      dotHostname: endpoints?.dotHostname ?? null,
      ipv4Servers: endpoints?.ipv4Servers ?? [],
      enrollmentToken: record.enrollmentToken,
      appleProfileDownloadUrl: record.providerProfileId
        ? `/api/v1/devices/shield/profile/${record.enrollmentToken}`
        : null,
      enrollmentQrUrl: record.providerProfileId
        ? `/api/v1/devices/shield/qr/${record.enrollmentToken}`
        : null,
      blockAdultContent: record.blockAdultContent,
      safeSearch: record.safeSearch,
      youtubeRestrictedMode: record.youtubeRestrictedMode,
      blockBypass: record.blockBypass,
      blockedServices: record.blockedServices,
      bedtimeServices: record.bedtimeServices,
      bedtimeEnabled: record.bedtimeEnabled,
      bedtimeStart: record.bedtimeStart,
      bedtimeEnd: record.bedtimeEnd,
      timezone: record.timezone,
      lastSyncedAt: record.lastSyncedAt ? record.lastSyncedAt.toISOString() : null,
      health,
    };
  }
}
