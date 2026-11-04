import { z } from 'zod';
import {
  AgreementStatus,
  ClauseCategory,
  CommitmentParty,
  DevelopmentalTier,
  DevicePlatform,
  RoadType,
} from '../constants/index.js';

export const AgreementClauseInputSchema = z.object({
  category: z.enum([
    ClauseCategory.SCREEN_TIME,
    ClauseCategory.DEVICE_CURFEW,
    ClauseCategory.PRIVACY_SAFETY,
    ClauseCategory.PURCHASES_CHATS,
    ClauseCategory.CONTENT_BOUNDARIES,
    ClauseCategory.PARENT_COMMITMENT,
  ]),
  party: z.enum([CommitmentParty.CHILD, CommitmentParty.PARENT]),
  title: z.string().trim().min(1, 'Clause title is required').max(200),
  description: z.string().trim().min(1, 'Clause description is required').max(1000),
  isStandard: z.boolean().default(true),
  isCustom: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export type AgreementClauseInput = z.infer<typeof AgreementClauseInputSchema>;

export const CreateAgreementSchema = z.object({
  childId: z.string().uuid('Invalid child ID format'),
  title: z.string().trim().min(1, 'Agreement title is required').max(150),
  developmentalTier: z.nativeEnum(DevelopmentalTier),
  roadType: z.enum([RoadType.PRE_DEVICE, RoadType.ACTIVE_DEVICE]),
  clauses: z.array(AgreementClauseInputSchema).min(1, 'At least one agreement clause is required'),
  parentSignature: z.string().optional(),
  childSignature: z.string().optional(),
});

export type CreateAgreementInput = z.infer<typeof CreateAgreementSchema>;

export const UpdateAgreementSchema = z.object({
  title: z.string().trim().min(1, 'Agreement title is required').max(150).optional(),
  clauses: z.array(AgreementClauseInputSchema).min(1, 'At least one agreement clause is required').optional(),
  parentSignature: z.string().optional(),
  childSignature: z.string().optional(),
  status: z
    .enum([
      AgreementStatus.DRAFT,
      AgreementStatus.SIGNED,
      AgreementStatus.DEPLOYED_TO_DEVICE,
      AgreementStatus.ARCHIVED,
    ])
    .optional(),
});

export type UpdateAgreementInput = z.infer<typeof UpdateAgreementSchema>;

export const GetPresetsQuerySchema = z.object({
  tier: z.nativeEnum(DevelopmentalTier).optional(),
  roadType: z.enum([RoadType.PRE_DEVICE, RoadType.ACTIVE_DEVICE]).optional(),
});

export type GetPresetsQueryInput = z.infer<typeof GetPresetsQuerySchema>;

export const SignAgreementSchema = z.object({
  agreementId: z.string().uuid('Invalid agreement ID format'),
  party: z.enum([CommitmentParty.CHILD, CommitmentParty.PARENT]),
  signatureDataUrl: z.string().min(1, 'Signature payload is required'),
});

export type SignAgreementInput = z.infer<typeof SignAgreementSchema>;

export const CompileProfileSchema = z.object({
  platform: z.enum([DevicePlatform.APPLE_IOS, DevicePlatform.ANDROID_ENTERPRISE]),
  bedtimeCurfewTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Curfew time must be in HH:MM 24-hour format (e.g., 20:30)'),
});

export type CompileProfileInput = z.infer<typeof CompileProfileSchema>;
