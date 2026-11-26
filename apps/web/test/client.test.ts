import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { apiClient, ApiClientError } from '../src/lib/api/client';
import {
  clearStoredSessionToken,
  consumeSessionTokenFromHash,
  getStoredSessionToken,
  SESSION_TOKEN_STORAGE_KEY,
  storeSessionToken,
} from '../src/lib/api/sessionToken';

describe('apiClient', () => {
  const originalFetch = global.fetch;
  const originalWindow = globalThis.window;

  beforeEach(() => {
    clearStoredSessionToken();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    clearStoredSessionToken();
    if (originalWindow === undefined) {
      delete (globalThis as { window?: unknown }).window;
    } else {
      Object.defineProperty(globalThis, 'window', {
        value: originalWindow,
        configurable: true,
        writable: true,
      });
    }
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('attaches stored Bearer session token and omits it once cleared', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({
        success: true,
        data: { ok: true },
      }),
    } as unknown as Response);
    global.fetch = fetchMock;

    storeSessionToken('mobile-demo-jwt', { persist: false });
    await apiClient('/api/v1/auth/me');

    const firstInit = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect((firstInit.headers as Record<string, string>).Authorization).toBe(
      'Bearer mobile-demo-jwt'
    );

    clearStoredSessionToken();
    await apiClient('/api/v1/auth/me');

    const secondInit = fetchMock.mock.calls[1]?.[1] as RequestInit;
    expect((secondInit.headers as Record<string, string>).Authorization).toBeUndefined();
  });

  it('captures #session token from OAuth redirect hash, scrubs URL bar, and clears persistent storage on demo', () => {
    const sessionMap = new Map<string, string>();
    const localMap = new Map<string, string>([
      [SESSION_TOKEN_STORAGE_KEY, 'stale-account-token'],
    ]);
    const locationObj = {
      pathname: '/dashboard',
      search: '?tab=home',
      hash: '#session=google-oauth-jwt&extra=1',
    };
    const replaceState = vi.fn((_state: unknown, _title: string, nextUrl?: string) => {
      if (typeof nextUrl === 'string') {
        const hashIdx = nextUrl.indexOf('#');
        locationObj.hash = hashIdx >= 0 ? nextUrl.slice(hashIdx) : '';
      }
    });

    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      writable: true,
      value: {
        location: locationObj,
        history: { replaceState },
        sessionStorage: {
          getItem: (k: string) => sessionMap.get(k) ?? null,
          setItem: (k: string, v: string) => sessionMap.set(k, v),
          removeItem: (k: string) => sessionMap.delete(k),
        },
        localStorage: {
          getItem: (k: string) => localMap.get(k) ?? null,
          setItem: (k: string, v: string) => localMap.set(k, v),
          removeItem: (k: string) => localMap.delete(k),
        },
      },
    });

    const extracted = consumeSessionTokenFromHash();
    expect(extracted).toBe('google-oauth-jwt');
    expect(localMap.get(SESSION_TOKEN_STORAGE_KEY)).toBe('google-oauth-jwt');
    expect(replaceState).toHaveBeenCalledWith(null, '', '/dashboard?tab=home#extra=1');

    // Entering demo mode clears persistent localStorage token and stores only in sessionStorage
    storeSessionToken('demo-only-jwt', { persist: false });
    expect(localMap.has(SESSION_TOKEN_STORAGE_KEY)).toBe(false);
    expect(sessionMap.get(SESSION_TOKEN_STORAGE_KEY)).toBe('demo-only-jwt');
    expect(getStoredSessionToken()).toBe('demo-only-jwt');
  });

  it('unwraps successful ApiResponse envelopes', async () => {
    const mockData = { user: { id: '123', email: 'test@example.com' } };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({
        success: true,
        data: mockData,
      }),
    } as unknown as Response);

    const result = await apiClient<typeof mockData>('/api/v1/auth/me');
    expect(result).toEqual(mockData);
  });

  it('throws ApiClientError with details on HTTP failure', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input provided.',
          details: [{ field: 'email', message: 'Invalid email address format' }],
        },
      }),
    } as unknown as Response);

    await expect(apiClient('/api/v1/auth/register')).rejects.toThrow(ApiClientError);

    try {
      await apiClient('/api/v1/auth/register');
    } catch (err) {
      expect(err).toBeInstanceOf(ApiClientError);
      const apiErr = err as ApiClientError;
      expect(apiErr.statusCode).toBe(400);
      expect(apiErr.code).toBe('VALIDATION_ERROR');
      expect(apiErr.details).toHaveLength(1);
      expect(apiErr.details?.[0]?.field).toBe('email');
    }
  });

  it('handles network errors by wrapping in ApiClientError', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network offline'));

    await expect(apiClient('/api/v1/health')).rejects.toThrow('Network offline');
  });
});
