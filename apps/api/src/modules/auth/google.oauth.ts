import { createHash, randomBytes } from 'node:crypto';

export interface GoogleUserProfile {
  sub: string;
  email: string;
  emailVerified: boolean;
  fullName: string;
}

export interface GoogleOAuthAdapter {
  isConfigured(): boolean;
  buildAuthorizationUrl(params: {
    state: string;
    codeChallenge: string;
    redirectUri: string;
  }): string;
  exchangeCodeForProfile(params: {
    code: string;
    codeVerifier: string;
    redirectUri: string;
  }): Promise<GoogleUserProfile>;
}

/**
 * Generate a PKCE code_verifier and S256 code_challenge pair.
 */
export function generatePkcePair(): { codeVerifier: string; codeChallenge: string } {
  const codeVerifier = randomBytes(32).toString('base64url');
  const codeChallenge = createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');

  return { codeVerifier, codeChallenge };
}

/**
 * Generate an unguessable OAuth state token.
 */
export function generateOAuthState(): string {
  return randomBytes(24).toString('base64url');
}

/**
 * Standard Google OAuth 2.0 + PKCE adapter built with Node 22 native fetch.
 */
export class StandardGoogleOAuthAdapter implements GoogleOAuthAdapter {
  constructor(
    private readonly clientId: string = process.env.GOOGLE_CLIENT_ID?.trim() || '',
    private readonly clientSecret: string = process.env.GOOGLE_CLIENT_SECRET?.trim() || ''
  ) {}

  isConfigured(): boolean {
    return this.clientId.length > 0 && this.clientSecret.length > 0;
  }

  buildAuthorizationUrl(params: {
    state: string;
    codeChallenge: string;
    redirectUri: string;
  }): string {
    if (!this.isConfigured()) {
      throw new Error('Google OAuth is not configured.');
    }

    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    url.searchParams.set('client_id', this.clientId);
    url.searchParams.set('redirect_uri', params.redirectUri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', 'openid email profile');
    url.searchParams.set('state', params.state);
    url.searchParams.set('code_challenge', params.codeChallenge);
    url.searchParams.set('code_challenge_method', 'S256');
    url.searchParams.set('prompt', 'select_account');
    return url.toString();
  }

  async exchangeCodeForProfile(params: {
    code: string;
    codeVerifier: string;
    redirectUri: string;
  }): Promise<GoogleUserProfile> {
    if (!this.isConfigured()) {
      throw new Error('Google OAuth is not configured.');
    }

    const tokenBody = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: params.code,
      code_verifier: params.codeVerifier,
      grant_type: 'authorization_code',
      redirect_uri: params.redirectUri,
    });

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenBody.toString(),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Google token exchange failed with status ${tokenResponse.status}`);
    }

    const tokenJson = (await tokenResponse.json()) as { access_token?: string };
    if (!tokenJson.access_token) {
      throw new Error('Google token response did not include an access_token');
    }

    const userInfoResponse = await fetch(
      'https://openidconnect.googleapis.com/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokenJson.access_token}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      throw new Error(
        `Google userinfo request failed with status ${userInfoResponse.status}`
      );
    }

    const userInfo = (await userInfoResponse.json()) as {
      sub?: string;
      email?: string;
      email_verified?: boolean;
      name?: string;
    };

    if (!userInfo.sub || !userInfo.email) {
      throw new Error('Google userinfo response missing required sub or email');
    }

    return {
      sub: userInfo.sub,
      email: userInfo.email.toLowerCase().trim(),
      emailVerified: Boolean(userInfo.email_verified),
      fullName: userInfo.name?.trim() || userInfo.email.split('@')[0] || 'Parent',
    };
  }
}

/**
 * Deterministic in-memory fake Google OAuth adapter for automated testing.
 */
export class FakeGoogleOAuthAdapter implements GoogleOAuthAdapter {
  constructor(
    private profile: GoogleUserProfile = {
      sub: 'google-sub-demo-123',
      email: 'google.parent@example.com',
      emailVerified: true,
      fullName: 'Google Parent',
    },
    private configured = true
  ) {}

  setProfile(profile: GoogleUserProfile): void {
    this.profile = profile;
  }

  setConfigured(configured: boolean): void {
    this.configured = configured;
  }

  isConfigured(): boolean {
    return this.configured;
  }

  buildAuthorizationUrl(params: {
    state: string;
    codeChallenge: string;
    redirectUri: string;
  }): string {
    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    url.searchParams.set('state', params.state);
    url.searchParams.set('code_challenge', params.codeChallenge);
    url.searchParams.set('redirect_uri', params.redirectUri);
    return url.toString();
  }

  async exchangeCodeForProfile(): Promise<GoogleUserProfile> {
    return { ...this.profile };
  }
}
