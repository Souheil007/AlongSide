import {
  AgreementStatus,
  DevicePlatform,
  type CompileProfileInput,
  type DeviceProfileDTO,
} from '@alongside/shared';
import type { AgreementsRepository } from '../agreements/agreements.repository.js';
import { AgreementNotFoundError } from '../agreements/agreements.service.js';
import type {
  DeviceProfileRecord,
  DeviceProfilesRepository,
} from './device-profiles.repository.js';
import {
  type DeviceProfileCompiler,
  StandardDeviceProfileCompiler,
} from './profile.compiler.js';

class DeviceProfileNotFoundError extends Error {
  readonly statusCode = 404;
  readonly code = 'DEVICE_PROFILE_NOT_FOUND';

  constructor(message = 'Device profile not found.') {
    super(message);
    this.name = 'DeviceProfileNotFoundError';
  }
}

export interface CompileProfileResponse extends DeviceProfileDTO {
  enrollmentQrCodeUrl: string;
  otaEnrollmentUrl: string;
}

export class DeviceProfilesService {
  constructor(
    private readonly repository: DeviceProfilesRepository,
    private readonly agreementsRepository: AgreementsRepository,
    private readonly compiler: DeviceProfileCompiler = new StandardDeviceProfileCompiler()
  ) {}

  async compileProfile(
    userId: string,
    agreementId: string,
    input: CompileProfileInput
  ): Promise<CompileProfileResponse> {
    const agreement = await this.agreementsRepository.findById(agreementId, userId);
    if (!agreement) {
      throw new AgreementNotFoundError(`Agreement with ID '${agreementId}' not found.`);
    }

    const compiled = await this.compiler.compileAndSign(agreement, input.platform, {
      bedtimeCurfewTime: input.bedtimeCurfewTime,
      childName: agreement.child?.name,
    });

    // Check if profile already exists for this agreement
    let profile = await this.repository.findByAgreementId(agreementId);
    if (!profile) {
      profile = await this.repository.create({
        childId: agreement.childId,
        agreementId: agreement.id,
        platform: input.platform,
        bedtimeCurfewTime: input.bedtimeCurfewTime,
        status: 'PENDING_ENROLLMENT',
      });
    }

    // Mark agreement as DEPLOYED_TO_DEVICE if already SIGNED
    if (agreement.status === AgreementStatus.SIGNED) {
      await this.agreementsRepository.update(agreement.id, userId, {
        status: AgreementStatus.DEPLOYED_TO_DEVICE,
      });
    }

    const dto = this.mapToDTO(profile);
    const enrollmentQrCodeUrl = `/api/v1/devices/qr/${profile.enrollmentToken}`;
    const otaEnrollmentUrl = `/api/v1/devices/enroll/${profile.enrollmentToken}`;

    return {
      ...dto,
      enrollmentQrCodeUrl,
      otaEnrollmentUrl,
    };
  }

  async getEnrollmentPayload(
    token: string
  ): Promise<{ payload: Buffer; mimeType: string; filename: string }> {
    const profile = await this.repository.findByToken(token);
    if (!profile) {
      throw new DeviceProfileNotFoundError(`Device profile with token '${token}' not found.`);
    }

    let agreement = profile.agreementId
      ? await this.agreementsRepository.findById(profile.agreementId)
      : null;

    if (!agreement) {
      // Create a fallback agreement record for compilation if none linked
      agreement = {
        id: profile.id,
        userId: 'system',
        childId: profile.childId,
        title: 'Alongside Standard Device Protection',
        status: AgreementStatus.SIGNED,
        developmentalTier: 'TIER_2_AGES_10_11',
        roadType: 'ACTIVE_DEVICE',
        parentSignature: 'System',
        childSignature: 'System',
        signedAt: new Date(),
        pdfExportUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        clauses: [],
      };
    }

    const compiled = await this.compiler.compileAndSign(agreement, profile.platform, {
      bedtimeCurfewTime: profile.bedtimeCurfewTime,
      childName: profile.child?.name,
    });

    // Mark as ACTIVE upon OTA profile download
    await this.repository.updateStatus(profile.id, 'ACTIVE', new Date());

    const filename =
      profile.platform === DevicePlatform.APPLE_IOS
        ? 'AlongSide_Protection.mobileconfig'
        : 'alongside-policy.json';

    return {
      payload: compiled.payloadBuffer,
      mimeType: compiled.mimeType,
      filename,
    };
  }

  async recordHeartbeat(
    token: string,
    tamperDetected?: boolean
  ): Promise<DeviceProfileDTO> {
    const profile = await this.repository.recordHeartbeat(token, tamperDetected);
    if (!profile) {
      throw new DeviceProfileNotFoundError(`Device profile with token '${token}' not found.`);
    }
    return this.mapToDTO(profile);
  }

  async getProfileByToken(token: string): Promise<DeviceProfileDTO> {
    const profile = await this.repository.findByToken(token);
    if (!profile) {
      throw new DeviceProfileNotFoundError(`Device profile with token '${token}' not found.`);
    }
    return this.mapToDTO(profile);
  }

  private mapToDTO(record: DeviceProfileRecord): DeviceProfileDTO {
    return {
      id: record.id,
      childId: record.childId,
      agreementId: record.agreementId,
      platform: record.platform,
      status: record.status,
      enrollmentToken: record.enrollmentToken,
      bedtimeCurfewTime: record.bedtimeCurfewTime,
      isLockdownActive: record.isLockdownActive,
      tamperDetected: record.tamperDetected,
      enrolledAt: record.enrolledAt ? new Date(record.enrolledAt).toISOString() : null,
      lastHeartbeatAt: record.lastHeartbeatAt ? new Date(record.lastHeartbeatAt).toISOString() : null,
      createdAt: new Date(record.createdAt).toISOString(),
      updatedAt: new Date(record.updatedAt).toISOString(),
    };
  }
}
