import { describe, expect, it } from 'vitest';
import { cn } from '../src/lib/utils';

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
