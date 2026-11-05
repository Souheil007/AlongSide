import type { DeviceProfileDTO } from '@alongside/shared';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function getEnrollmentQrCodeUrl(token: string): string {
  return `${API_BASE_URL.replace(/\/$/, '')}/api/v1/devices/qr/${token}`;
}

export function getOtaEnrollmentUrl(token: string): string {
  return `${API_BASE_URL.replace(/\/$/, '')}/api/v1/devices/enroll/${token}`;
}

export interface DeviceInfo {
  profile: DeviceProfileDTO;
  childName: string;
}
