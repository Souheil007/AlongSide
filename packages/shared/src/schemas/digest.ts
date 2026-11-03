import { z } from 'zod';
import { ExploitSeverity } from '../constants/index.js';

export const SlangSearchQuerySchema = z.object({
  term: z.string().trim().optional(),
  q: z.string().trim().optional(),
});

export type SlangSearchQuery = z.infer<typeof SlangSearchQuerySchema>;

export const ExploitAlertsQuerySchema = z.object({
  severity: z.enum([
    ExploitSeverity.LOW,
    ExploitSeverity.MEDIUM,
    ExploitSeverity.HIGH,
    ExploitSeverity.CRITICAL,
  ]).optional(),
});

export type ExploitAlertsQuery = z.infer<typeof ExploitAlertsQuerySchema>;
