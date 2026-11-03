import { describe, expect, it, vi, beforeEach } from 'vitest';
import { apiClient, ApiClientError } from '../src/lib/api/client';

describe('apiClient', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
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
