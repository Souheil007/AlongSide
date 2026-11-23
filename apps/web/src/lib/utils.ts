import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Validates that a URL is safe for use in href attributes.
 * Rejects javascript:, data:, vbscript:, protocol-relative (//), and control-character obfuscations.
 * Only permits https:, http:, mailto:, tel:, or safe relative paths (/ and #).
 */
export function isSafeUrl(rawUrl: string | undefined | null): boolean {
  if (!rawUrl || typeof rawUrl !== 'string') return false;
  const trimmed = rawUrl.trim();

  // Strip control characters & internal whitespace that can bypass protocol filters
  const sanitized = trimmed.replace(/[\u0000-\u001F\u007F-\u009F\s]+/g, '').toLowerCase();

  if (
    sanitized.startsWith('javascript:') ||
    sanitized.startsWith('data:') ||
    sanitized.startsWith('vbscript:')
  ) {
    return false;
  }

  // Reject protocol-relative URLs (e.g. //attacker.com)
  if (trimmed.startsWith('//')) {
    return false;
  }

  // Must match explicit safe protocols or safe relative paths
  return (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('#')
  );
}
