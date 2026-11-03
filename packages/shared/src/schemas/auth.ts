import { z } from 'zod';

export const RegisterUserSchema = z.object({
  email: z.string().trim().email('Invalid email address format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(128, 'Password exceeds maximum length of 128 characters'),
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters long')
    .max(100, 'Full name exceeds maximum length'),
});

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;

export const LoginUserSchema = z.object({
  email: z.string().trim().email('Invalid email address format'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
