import type {
  AgreementDTO,
  AgreementClauseInput,
  CreateAgreementInput,
  UpdateAgreementInput,
  GetPresetsQueryInput,
  CompileProfileInput,
  DeviceProfileDTO,
} from '@alongside/shared';
import { apiClient } from './client';

export interface AgreementPresetsResponse {
  success: boolean;
  data: {
    presets: AgreementClauseInput[];
    categories: Array<{
      category: string;
      categoryLabel: string;
      clauses: AgreementClauseInput[];
    }>;
  };
}

export interface AgreementResponse {
  success: boolean;
  data: {
    agreement: AgreementDTO;
  };
}

export interface CompileProfileResponse {
  success: boolean;
  data: {
    profile: DeviceProfileDTO;
  };
}

export async function getAgreementPresets(
  query?: GetPresetsQueryInput
): Promise<AgreementPresetsResponse> {
  return await apiClient<AgreementPresetsResponse>('/api/v1/agreements/presets', {
    method: 'GET',
    params: query as Record<string, string | number | boolean | undefined>,
  });
}

export async function createAgreement(
  input: CreateAgreementInput
): Promise<AgreementResponse> {
  return await apiClient<AgreementResponse>('/api/v1/agreements', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function getAgreement(id: string): Promise<AgreementResponse> {
  return await apiClient<AgreementResponse>(`/api/v1/agreements/${id}`, {
    method: 'GET',
  });
}

export async function updateAgreement(
  id: string,
  input: UpdateAgreementInput
): Promise<AgreementResponse> {
  return await apiClient<AgreementResponse>(`/api/v1/agreements/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export async function compileAgreementProfile(
  agreementId: string,
  input: CompileProfileInput
): Promise<CompileProfileResponse> {
  return await apiClient<CompileProfileResponse>(
    `/api/v1/agreements/${agreementId}/compile-profile`,
    {
      method: 'POST',
      body: JSON.stringify(input),
    }
  );
}

export function getAgreementPdfUrl(id: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  return `${baseUrl.replace(/\/$/, '')}/api/v1/agreements/${id}/export-pdf`;
}

export const agreementsApi = {
  getPresets: getAgreementPresets,
  create: createAgreement,
  getById: getAgreement,
  update: updateAgreement,
  compileProfile: compileAgreementProfile,
  getPdfUrl: getAgreementPdfUrl,
};
