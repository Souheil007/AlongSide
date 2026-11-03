import type {
  ExploitSeverity,
  CultureDigestDTO,
  SlangTermDTO,
  ExploitAlertDTO,
} from '@alongside/shared';
import { apiClient } from './client';

export interface LatestDigestResponse {
  digest: CultureDigestDTO;
}

export interface SlangSearchResponse {
  slangTerms: SlangTermDTO[];
}

export interface ExploitAlertsResponse {
  exploitAlerts: ExploitAlertDTO[];
}

/**
 * Fetch the latest Sunday Youth Culture Digest issue.
 */
export async function getLatestDigest(): Promise<LatestDigestResponse> {
  return await apiClient<LatestDigestResponse>('/api/v1/digest/latest', {
    method: 'GET',
  });
}

/**
 * Search or list tween slang terms.
 */
export async function searchSlang(
  q?: string,
  term?: string
): Promise<SlangSearchResponse> {
  const queryParam = q || term;
  const params: Record<string, string | undefined> = {};
  if (queryParam) {
    params.q = queryParam;
    params.term = queryParam;
  }
  return await apiClient<SlangSearchResponse>('/api/v1/digest/slang', {
    method: 'GET',
    params,
  });
}

/**
 * Fetch digital exploit early warnings, optionally filtered by severity.
 */
export async function getExploitAlerts(
  severity?: ExploitSeverity
): Promise<ExploitAlertsResponse> {
  const params: Record<string, string | undefined> = {};
  if (severity) {
    params.severity = severity;
  }
  return await apiClient<ExploitAlertsResponse>('/api/v1/digest/exploits', {
    method: 'GET',
    params,
  });
}

export const digestApi = {
  getLatestDigest,
  searchSlang,
  getExploitAlerts,
};
