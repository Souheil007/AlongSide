import { describe, expect, it } from 'vitest';
import { cn, isSafeUrl } from '../src/lib/utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    const result = cn('text-sm', 'text-slate-800', false && 'hidden', undefined);
    expect(result).toBe('text-sm text-slate-800');
  });

  it('handles tailwind conflict resolution with tailwind-merge', () => {
    const result = cn('px-2 py-1', 'px-4');
    expect(result).toBe('py-1 px-4');
  });
});

describe('isSafeUrl security utility', () => {
  it('allows safe HTTPS, HTTP, mailto, tel, and local paths', () => {
    expect(isSafeUrl('https://alongside.care')).toBe(true);
    expect(isSafeUrl('http://localhost:3000')).toBe(true);
    expect(isSafeUrl('mailto:support@alongside.care')).toBe(true);
    expect(isSafeUrl('tel:+1234567890')).toBe(true);
    expect(isSafeUrl('/academy/courses/sleep')).toBe(true);
    expect(isSafeUrl('#curriculum-jump')).toBe(true);
  });

  it('blocks javascript: schemes and variants with casing or whitespace', () => {
    expect(isSafeUrl('javascript:alert(1)')).toBe(false);
    expect(isSafeUrl('JAVASCRIPT:alert(1)')).toBe(false);
    expect(isSafeUrl('  javascript:void(0)')).toBe(false);
    expect(isSafeUrl('javascript :alert(1)')).toBe(false);
    expect(isSafeUrl('java\u0000script:alert(1)')).toBe(false);
  });

  it('blocks data:, vbscript:, and protocol-relative URLs', () => {
    expect(isSafeUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
    expect(isSafeUrl('vbscript:msgbox(1)')).toBe(false);
    expect(isSafeUrl('//attacker.com/evil')).toBe(false);
    expect(isSafeUrl('ftp://files.example.com')).toBe(false);
  });

  it('safely handles empty or non-string inputs', () => {
    expect(isSafeUrl('')).toBe(false);
    expect(isSafeUrl(null as any)).toBe(false);
    expect(isSafeUrl(undefined as any)).toBe(false);
  });
});
