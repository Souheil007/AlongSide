/**
 * Cross-browser session token store for deployments where the frontend
 * (e.g. vercel.app) and API (e.g. onrender.com) reside on separate root domains
 * and privacy-preserving mobile browsers (Safari ITP, Samsung Internet, in-app
 * browsers) block third-party HttpOnly cookies.
 */

export const SESSION_TOKEN_STORAGE_KEY = 'alongside_session_token';

let inMemoryToken: string | null = null;

function clearStorageKeys(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(SESSION_TOKEN_STORAGE_KEY);
  } catch {
    // Restricted storage contexts
  }
  try {
    window.localStorage.removeItem(SESSION_TOKEN_STORAGE_KEY);
  } catch {
    // Restricted storage contexts
  }
}

export function storeSessionToken(
  token: string | null | undefined,
  options?: { persist?: boolean }
): void {
  clearStorageKeys();
  const trimmed = token?.trim() || null;
  inMemoryToken = trimmed;

  if (!trimmed || typeof window === 'undefined') {
    return;
  }

  try {
    window.sessionStorage.setItem(SESSION_TOKEN_STORAGE_KEY, trimmed);
  } catch {
    // Private browsing or quota limits
  }

  if (options?.persist !== false) {
    try {
      window.localStorage.setItem(SESSION_TOKEN_STORAGE_KEY, trimmed);
    } catch {
      // Private browsing or quota limits
    }
  }
}

export function consumeSessionTokenFromHash(): string | null {
  if (typeof window === 'undefined' || !window.location?.hash) {
    return null;
  }

  const rawHash = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1)
    : window.location.hash;
  if (!rawHash) {
    return null;
  }

  const params = new URLSearchParams(rawHash);
  const sessionToken = params.get('session')?.trim() || null;
  if (!sessionToken) {
    return null;
  }

  storeSessionToken(sessionToken, { persist: true });

  params.delete('session');
  const remaining = params.toString();
  const cleanUrl = `${window.location.pathname}${window.location.search}${remaining ? `#${remaining}` : ''}`;
  try {
    window.history?.replaceState?.(null, '', cleanUrl);
  } catch {
    // Ignore history API restrictions
  }

  return sessionToken;
}

export function getStoredSessionToken(): string | null {
  const fromHash = consumeSessionTokenFromHash();
  if (fromHash) {
    return fromHash;
  }

  if (typeof window !== 'undefined') {
    try {
      const sessionVal = window.sessionStorage.getItem(SESSION_TOKEN_STORAGE_KEY);
      if (sessionVal?.trim()) {
        inMemoryToken = sessionVal.trim();
        return inMemoryToken;
      }
    } catch {
      // Ignore storage access errors
    }

    try {
      const localVal = window.localStorage.getItem(SESSION_TOKEN_STORAGE_KEY);
      if (localVal?.trim()) {
        inMemoryToken = localVal.trim();
        return inMemoryToken;
      }
    } catch {
      // Ignore storage access errors
    }
  }

  return inMemoryToken;
}

export function clearStoredSessionToken(): void {
  inMemoryToken = null;
  clearStorageKeys();
}
