import { z } from 'zod';
import { TriageZone } from '../constants/index.js';

export const SymptomTriageInputSchema = z.object({
  childId: z.string().min(1, 'childId is required'),
  temperatureF: z.number().min(90).max(110).optional(),
  temperatureMethod: z.enum(['RECTAL', 'AXILLARY', 'ORAL', 'TYMPANIC']).optional(),
  symptoms: z.array(z.string()).default([]),
  durationHours: z.number().min(0).default(0),
  behaviorNotes: z.string().trim().max(1000).optional(),
  weightLbs: z.number().positive().optional(),
});

export type SymptomTriageInput = z.infer<typeof SymptomTriageInputSchema>;

export const LogHealthEventSchema = z.object({
  protocolId: z.string().optional(),
  symptomTitle: z.string().min(1, 'symptomTitle is required'),
  temperatureF: z.number().min(90).max(110).optional(),
  triageZone: z.enum([TriageZone.RED, TriageZone.YELLOW, TriageZone.GREEN]),
  clinicalNotes: z.string().trim().max(2000).optional(),
  actionTaken: z.string().trim().max(1000).optional(),
});

export type LogHealthEventInput = z.infer<typeof LogHealthEventSchema>;
