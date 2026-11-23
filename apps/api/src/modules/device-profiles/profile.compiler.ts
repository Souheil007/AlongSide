import { createHash, randomUUID } from 'node:crypto';
import { build as buildPlist } from 'plist';
import {
  DevelopmentalTier,
  DevicePlatform,
} from '@alongside/shared';
import type { AgreementRecord } from '../agreements/agreements.repository.js';
import {
  type ProfileSigner,
  AppleMobileConfigSigner,
} from './profile.signer.js';

export interface CompiledProfileResult {
  payloadBuffer: Buffer;
  mimeType: string;
  profileUuid: string;
  sha256Checksum: string;
  isSigned: boolean;
  rawContent: string;
}

export interface EncryptedDnsProfileInput {
  childName: string;
  dohUrl: string;
  serverAddresses: string[];
  profileIdentifierSuffix: string;
}

export interface DeviceProfileCompiler {
  compileAndSign(
    agreement: AgreementRecord,
    platform: DevicePlatform,
    options?: { bedtimeCurfewTime?: string; childName?: string }
  ): Promise<CompiledProfileResult>;
  compileEncryptedDnsProfile(
    input: EncryptedDnsProfileInput
  ): Promise<CompiledProfileResult>;
}

export class StandardDeviceProfileCompiler implements DeviceProfileCompiler {
  constructor(
    private readonly signer: ProfileSigner = new AppleMobileConfigSigner()
  ) {}

  async compileAndSign(
    agreement: AgreementRecord,
    platform: DevicePlatform,
    options?: { bedtimeCurfewTime?: string; childName?: string }
  ): Promise<CompiledProfileResult> {
    const profileUuid = randomUUID();
    const curfewTime = options?.bedtimeCurfewTime || '20:30';
    const childName = options?.childName || agreement.child?.name || 'Child';

    if (platform === DevicePlatform.APPLE_IOS) {
      return await this.compileAppleProfile(
        agreement,
        profileUuid,
        curfewTime,
        childName
      );
    } else {
      return await this.compileAndroidProfile(
        agreement,
        profileUuid,
        curfewTime,
        childName
      );
    }
  }

  private async compileAppleProfile(
    agreement: AgreementRecord,
    profileUuid: string,
    curfewTime: string,
    childName: string
  ): Promise<CompiledProfileResult> {
    // Apple MDM ratingApps scale: 100 = 4+, 300 = 9+, 600 = 12+, 700 = 14+, 1000 = 17+
    let ratingApps = 600;
    if (agreement.developmentalTier === DevelopmentalTier.TIER_1_AGES_8_9) {
      ratingApps = 300;
    } else if (agreement.developmentalTier === DevelopmentalTier.TIER_2_AGES_10_11) {
      ratingApps = 600;
    } else if (agreement.developmentalTier === DevelopmentalTier.TIER_3_AGES_12_13) {
      ratingApps = 700;
    } else {
      ratingApps = 1000;
    }

    const restrictionPayloadUuid = randomUUID();

    const mobileConfigDict = {
      PayloadType: 'Configuration',
      PayloadVersion: 1,
      PayloadIdentifier: `care.alongside.profile.${profileUuid}`,
      PayloadUUID: profileUuid,
      PayloadDisplayName: `${agreement.title} (Protection Profile)`,
      PayloadDescription: `Enforces Alongside Bilateral Family Pact: ${curfewTime} bedtime curfew, age rating limits, and 24/7 emergency hotline whitelist for ${childName}.`,
      PayloadOrganization: 'Alongside Family Systems',
      PayloadRemovalDisallowed: false,
      PayloadContent: [
        {
          PayloadType: 'com.apple.applicationaccess',
          PayloadVersion: 1,
          PayloadIdentifier: `care.alongside.restrictions.${restrictionPayloadUuid}`,
          PayloadUUID: restrictionPayloadUuid,
          PayloadDisplayName: 'Alongside Bilateral Safety Restrictions',
          allowAppInstallation: true,
          allowAppRemoval: false,
          ratingApps,
          allowExplicitContent: false,
          safariAllowAutoFill: false,
          bedtimeCurfewTime: curfewTime,
          curfewEnforcement: 'SCHEDULED_BEDTIME_DOCK',
          // 24/7 Whitelisted phone & messaging apps
          whitelistBundleIDs: [
            'com.apple.mobilephone',
            'com.apple.MobileSMS',
            'com.apple.Preferences',
            'care.alongside.companion',
          ],
          // Emergency numbers preserved 24/7
          emergencyHotlines: ['911', '988', '1-800-273-8255'],
        },
      ],
    };

    // Serialize to standard Apple XML plist
    const rawXml = buildPlist(mobileConfigDict);

    // Cryptographic PKCS#7 signing
    const signResult = await this.signer.sign(rawXml);
    const sha256Checksum = createHash('sha256')
      .update(signResult.signedBuffer)
      .digest('hex');

    return {
      payloadBuffer: signResult.signedBuffer,
      mimeType: 'application/x-apple-aspen-config; charset=utf-8',
      profileUuid,
      sha256Checksum,
      isSigned: signResult.isSigned,
      rawContent: rawXml,
    };
  }

  private async compileAndroidProfile(
    agreement: AgreementRecord,
    profileUuid: string,
    curfewTime: string,
    childName: string
  ): Promise<CompiledProfileResult> {
    const policy = {
      schemaVersion: 1,
      profileUuid,
      agreementId: agreement.id,
      childName,
      tier: agreement.developmentalTier,
      curfewSchedule: {
        bedtimeCurfewTime: curfewTime,
        enforcementMode: 'APP_LOCKOUT_EXCEPT_WHITELIST',
      },
      emergencyWhitelist: {
        dialer: true,
        sms: true,
        numbers: ['911', '988', '1-800-273-8255'],
        packageNames: [
          'com.google.android.dialer',
          'com.google.android.apps.messaging',
          'com.android.settings',
          'care.alongside.companion',
        ],
      },
      parentTamperProtection: {
        blockUninstall: true,
        reportHeartbeatTamper: true,
      },
    };

    const rawJson = JSON.stringify(policy, null, 2);
    const payloadBuffer = Buffer.from(rawJson, 'utf-8');
    const sha256Checksum = createHash('sha256')
      .update(payloadBuffer)
      .digest('hex');

    return {
      payloadBuffer,
      mimeType: 'application/json; charset=utf-8',
      profileUuid,
      sha256Checksum,
      isSigned: false,
      rawContent: rawJson,
    };
  }

  /**
   * Compiles an official Apple Encrypted DNS-over-HTTPS (.mobileconfig) payload
   * using com.apple.dnsSettings.managed. Works globally on Wi-Fi and 5G cellular
   * on normal unsupervised consumer iPhones and iPads (iOS 14+).
   */
  async compileEncryptedDnsProfile(
    input: EncryptedDnsProfileInput
  ): Promise<CompiledProfileResult> {
    const profileUuid = randomUUID();
    const dnsPayloadUuid = randomUUID();
    const safeChildName = input.childName.trim() || 'Child';
    const cleanSuffix = input.profileIdentifierSuffix.replace(/[^a-zA-Z0-9-]/g, '');

    const mobileConfigDict = {
      PayloadType: 'Configuration',
      PayloadVersion: 1,
      PayloadIdentifier: `care.alongside.shield.${cleanSuffix || profileUuid}`,
      PayloadUUID: profileUuid,
      PayloadDisplayName: `Alongside Shield (${safeChildName})`,
      PayloadDescription: `Enforces encrypted family-safe DNS filtering and scheduled protection on Wi-Fi and cellular networks for ${safeChildName}.`,
      PayloadOrganization: 'Alongside Family Systems',
      PayloadRemovalDisallowed: false,
      PayloadContent: [
        {
          PayloadType: 'com.apple.dnsSettings.managed',
          PayloadVersion: 1,
          PayloadIdentifier: `care.alongside.shield.dns.${dnsPayloadUuid}`,
          PayloadUUID: dnsPayloadUuid,
          PayloadDisplayName: `Alongside Encrypted DNS (${safeChildName})`,
          PayloadDescription: 'Routes DNS queries over HTTPS through Alongside family protection.',
          DNSSettings: {
            DNSProtocol: 'HTTPS',
            ServerURL: input.dohUrl,
            ServerAddresses: input.serverAddresses,
          },
          // Must remain false on unsupervised consumer iOS devices so installation succeeds
          ProhibitDisablement: false,
        },
      ],
    };

    const rawXml = buildPlist(mobileConfigDict);
    const signResult = await this.signer.sign(rawXml);
    const sha256Checksum = createHash('sha256')
      .update(signResult.signedBuffer)
      .digest('hex');

    return {
      payloadBuffer: signResult.signedBuffer,
      mimeType: 'application/x-apple-aspen-config; charset=utf-8',
      profileUuid,
      sha256Checksum,
      isSigned: signResult.isSigned,
      rawContent: rawXml,
    };
  }
}
