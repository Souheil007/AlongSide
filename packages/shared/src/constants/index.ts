/**
 * Alongside Canonical Domain Constants & Enumerations
 * Version 2.2.0
 */

export const Role = {
  PARENT: 'PARENT',
  CO_PARENT: 'CO_PARENT',
  ADMIN: 'ADMIN',
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const SubscriptionTier = {
  TRIAL: 'TRIAL',
  ANNUAL_HERO: 'ANNUAL_HERO',
  MONTHLY_FLEX: 'MONTHLY_FLEX',
  INSTITUTIONAL: 'INSTITUTIONAL',
} as const;
export type SubscriptionTier = (typeof SubscriptionTier)[keyof typeof SubscriptionTier];

export const RoadType = {
  PRE_DEVICE: 'PRE_DEVICE',
  ACTIVE_DEVICE: 'ACTIVE_DEVICE',
} as const;
export type RoadType = (typeof RoadType)[keyof typeof RoadType];

export const DevelopmentalTier = {
  TIER_1_AGES_8_9: 'TIER_1_AGES_8_9',
  TIER_2_AGES_10_11: 'TIER_2_AGES_10_11',
  TIER_3_AGES_12_13: 'TIER_3_AGES_12_13',
  TIER_4_AGES_14_PLUS: 'TIER_4_AGES_14_PLUS',
} as const;
export type DevelopmentalTier = (typeof DevelopmentalTier)[keyof typeof DevelopmentalTier];

export const AgreementStatus = {
  DRAFT: 'DRAFT',
  SIGNED: 'SIGNED',
  DEPLOYED_TO_DEVICE: 'DEPLOYED_TO_DEVICE',
  ARCHIVED: 'ARCHIVED',
} as const;
export type AgreementStatus = (typeof AgreementStatus)[keyof typeof AgreementStatus];

export const ClauseCategory = {
  SCREEN_TIME: 'SCREEN_TIME',
  DEVICE_CURFEW: 'DEVICE_CURFEW',
  PRIVACY_SAFETY: 'PRIVACY_SAFETY',
  PURCHASES_CHATS: 'PURCHASES_CHATS',
  CONTENT_BOUNDARIES: 'CONTENT_BOUNDARIES',
  PARENT_COMMITMENT: 'PARENT_COMMITMENT',
} as const;
export type ClauseCategory = (typeof ClauseCategory)[keyof typeof ClauseCategory];

export const CommitmentParty = {
  CHILD: 'CHILD',
  PARENT: 'PARENT',
} as const;
export type CommitmentParty = (typeof CommitmentParty)[keyof typeof CommitmentParty];

export const DeviceProfileStatus = {
  PENDING_ENROLLMENT: 'PENDING_ENROLLMENT',
  ACTIVE: 'ACTIVE',
  REVOKED: 'REVOKED',
  EXPIRED: 'EXPIRED',
} as const;
export type DeviceProfileStatus = (typeof DeviceProfileStatus)[keyof typeof DeviceProfileStatus];

export const DevicePlatform = {
  APPLE_IOS: 'APPLE_IOS',
  ANDROID_ENTERPRISE: 'ANDROID_ENTERPRISE',
} as const;
export type DevicePlatform = (typeof DevicePlatform)[keyof typeof DevicePlatform];

export const QuizType = {
  CULTURAL_FLUENCY_TWEEN: 'CULTURAL_FLUENCY_TWEEN',
  PARENTING_STYLE_CONFLICT: 'PARENTING_STYLE_CONFLICT',
  FIRST_PHONE_READINESS: 'FIRST_PHONE_READINESS',
  HOUSEHOLD_SCREEN_AUDIT: 'HOUSEHOLD_SCREEN_AUDIT',
  JOINT_DISCOVERY_BRIDGE: 'JOINT_DISCOVERY_BRIDGE',
} as const;
export type QuizType = (typeof QuizType)[keyof typeof QuizType];

export const MessageRole = {
  USER: 'USER',
  ASSISTANT: 'ASSISTANT',
  SYSTEM: 'SYSTEM',
} as const;
export type MessageRole = (typeof MessageRole)[keyof typeof MessageRole];

export const ExploitSeverity = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
} as const;
export type ExploitSeverity = (typeof ExploitSeverity)[keyof typeof ExploitSeverity];
