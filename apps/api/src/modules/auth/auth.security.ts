import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import argon2 from 'argon2';

/**
 * Hash a plain text password using argon2id.
 */
export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
  });
}

/**
 * Verify a plain text password against an argon2id hash.
 * Safely returns false if the hash is invalid or malformed.
 */
export async function verifyPassword(hash: string, plain: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, plain);
  } catch {
    return false;
  }
}

/**
 * Unusable sentinel passwordHash for Google OAuth / demo accounts.
 * Argon2id verifyPassword() safely returns false for non-argon2id strings.
 */
export function createPasswordlessPlaceholderHash(): string {
  return `!passwordless:${randomBytes(32).toString('hex')}`;
}

export interface SignedOAuthState {
  state: string;
  codeVerifier: string;
  exp: number;
}

/**
 * Sign short-lived Google OAuth PKCE state payload with HMAC-SHA256 for HttpOnly cookie storage.
 */
export function signOAuthStateToken(
  payload: { state: string; codeVerifier: string },
  secret: string,
  ttlMs = 10 * 60 * 1000
): string {
  const data: SignedOAuthState = {
    state: payload.state,
    codeVerifier: payload.codeVerifier,
    exp: Date.now() + ttlMs,
  };
  const encoded = Buffer.from(JSON.stringify(data), 'utf8').toString('base64url');
  const sig = createHmac('sha256', secret).update(encoded).digest('base64url');
  return `${encoded}.${sig}`;
}

/**
 * Verify and decode a signed Google OAuth PKCE cookie token.
 */
export function verifyOAuthStateToken(
  token: string,
  secret: string
): SignedOAuthState | null {
  const parts = token.split('.');
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return null;
  }
  const [encoded, sig] = parts;
  const expectedSig = createHmac('sha256', secret).update(encoded).digest('base64url');
  const sigBuf = Buffer.from(sig, 'utf8');
  const expectedBuf = Buffer.from(expectedSig, 'utf8');
  if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }
  try {
    const decoded = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as SignedOAuthState;
    if (!decoded.state || !decoded.codeVerifier || typeof decoded.exp !== 'number' || decoded.exp < Date.now()) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}
