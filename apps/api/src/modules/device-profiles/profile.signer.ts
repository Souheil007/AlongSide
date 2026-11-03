import forge from 'node-forge';

export interface ProfileSignResult {
  signedBuffer: Buffer;
  isSigned: boolean;
}

export interface ProfileSigner {
  sign(content: string): Promise<ProfileSignResult>;
}

export interface AppleMobileConfigSignerOptions {
  certificatePem?: string;
  privateKeyPem?: string;
}

/**
 * Production Apple PKCS#7 / CMS Signer using node-forge.
 * Wraps Apple .mobileconfig XML plists in a cryptographically signed CMS envelope with SHA-256 digest.
 * Gracefully falls back to unsigned XML in local development environments when keys are not configured.
 */
export class AppleMobileConfigSigner implements ProfileSigner {
  private readonly certificatePem?: string;
  private readonly privateKeyPem?: string;

  constructor(options?: AppleMobileConfigSignerOptions) {
    this.certificatePem =
      options?.certificatePem || process.env.APPLE_MDM_CERT;
    this.privateKeyPem =
      options?.privateKeyPem || process.env.APPLE_MDM_KEY;
  }

  async sign(content: string): Promise<ProfileSignResult> {
    if (!this.certificatePem || !this.privateKeyPem) {
      // Local development fallback: serve unsigned XML plist
      return {
        signedBuffer: Buffer.from(content, 'utf-8'),
        isSigned: false,
      };
    }

    try {
      const cert = forge.pki.certificateFromPem(this.certificatePem);
      const privateKey = forge.pki.privateKeyFromPem(this.privateKeyPem);

      const p7: any = forge.pkcs7.createSignedData();
      p7.content = forge.util.createBuffer(content, 'utf8');
      p7.addCertificate(cert);
      p7.addSigner({
        key: privateKey,
        certificate: cert,
        digestAlgorithm: forge.pki.oids.sha256 as string,
        authenticatedAttributes: [
          {
            type: forge.pki.oids.contentType as string,
            value: forge.pki.oids.data as string,
          },
          {
            type: forge.pki.oids.signingTime as string,
            value: new Date(),
          },
        ],
      });

      p7.sign({ detached: false });
      const asn1 = p7.toAsn1();
      const derBytes = forge.asn1.toDer(asn1).getBytes();
      const signedBuffer = Buffer.from(derBytes, 'binary');

      return {
        signedBuffer,
        isSigned: true,
      };
    } catch {
      // If signing fails (e.g. invalid dev pem), fallback to unsigned content
      return {
        signedBuffer: Buffer.from(content, 'utf-8'),
        isSigned: false,
      };
    }
  }
}

/**
 * In-Memory Fake Profile Signer for deterministic unit & integration tests.
 */
export class FakeDevProfileSigner implements ProfileSigner {
  constructor(private readonly shouldSimulateSigned: boolean = true) {}

  async sign(content: string): Promise<ProfileSignResult> {
    if (!this.shouldSimulateSigned) {
      return {
        signedBuffer: Buffer.from(content, 'utf-8'),
        isSigned: false,
      };
    }

    // Deterministic test buffer retaining valid XML plist with signed prefix
    return {
      signedBuffer: Buffer.from(content, 'utf-8'),
      isSigned: true,
    };
  }
}
