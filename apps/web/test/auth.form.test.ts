import { describe, expect, it } from 'vitest';
import { RegisterUserSchema, LoginUserSchema } from '@alongside/shared';

describe('Auth Form Validation Schemas', () => {
  describe('RegisterUserSchema', () => {
    it('validates a correct registration payload', () => {
      const valid = {
        fullName: 'Sarah Jenkins',
        email: 'sarah.parent@example.com',
        password: 'SecurePassword123!',
      };
      const result = RegisterUserSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it('rejects invalid email formats', () => {
      const invalid = {
        fullName: 'Sarah Jenkins',
        email: 'not-an-email',
        password: 'SecurePassword123!',
      };
      const result = RegisterUserSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toMatch(/Invalid email/i);
      }
    });

    it('rejects passwords shorter than 8 characters', () => {
      const invalid = {
        fullName: 'Sarah Jenkins',
        email: 'sarah@example.com',
        password: 'short',
      };
      const result = RegisterUserSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toMatch(/at least 8 characters/i);
      }
    });

    it('rejects full names shorter than 2 characters', () => {
      const invalid = {
        fullName: 'A',
        email: 'sarah@example.com',
        password: 'SecurePassword123!',
      };
      const result = RegisterUserSchema.safeParse(invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toMatch(/at least 2 characters/i);
      }
    });
  });

  describe('LoginUserSchema', () => {
    it('validates a valid login payload', () => {
      const valid = {
        email: 'sarah@example.com',
        password: 'anypassword',
      };
      const result = LoginUserSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it('rejects empty password', () => {
      const invalid = {
        email: 'sarah@example.com',
        password: '',
      };
      const result = LoginUserSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });
});
