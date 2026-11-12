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
  // v2.6 8 Canonical Lifespan Tiers (Tier 0 decomposed)
  TIER_0A_INFANCY_0_1: 'TIER_0A_INFANCY_0_1',
  TIER_0B_TODDLER_1_2: 'TIER_0B_TODDLER_1_2',
  TIER_0C_OLDER_TODDLER_2_3: 'TIER_0C_OLDER_TODDLER_2_3',
  TIER_0_INFANCY_TODDLER_0_3: 'TIER_0_INFANCY_TODDLER_0_3', // Preserved for backward compatibility
  TIER_1_EARLY_CHILDHOOD_4_6: 'TIER_1_EARLY_CHILDHOOD_4_6',
  TIER_2_MIDDLE_CHILDHOOD_7_9: 'TIER_2_MIDDLE_CHILDHOOD_7_9',
  TIER_3_PRE_TEEN_10_12: 'TIER_3_PRE_TEEN_10_12',
  TIER_4_EARLY_ADOLESCENCE_13_15: 'TIER_4_EARLY_ADOLESCENCE_13_15',
  TIER_5_LATE_ADOLESCENCE_16_18: 'TIER_5_LATE_ADOLESCENCE_16_18',

  // Legacy compatibility aliases (v2.3)
  TIER_1_AGES_8_9: 'TIER_1_AGES_8_9',
  TIER_2_AGES_10_11: 'TIER_2_AGES_10_11',
  TIER_3_AGES_12_13: 'TIER_3_AGES_12_13',
  TIER_4_AGES_14_PLUS: 'TIER_4_AGES_14_PLUS',
} as const;
export type DevelopmentalTier = (typeof DevelopmentalTier)[keyof typeof DevelopmentalTier];

export const EarlyChildhoodTranche = {
  INFANT_FOURTH_TRIMESTER_0_3M: 'INFANT_FOURTH_TRIMESTER_0_3M',
  INFANT_AWAKENING_4_6M: 'INFANT_AWAKENING_4_6M',
  INFANT_MOBILE_EXPLORER_7_12M: 'INFANT_MOBILE_EXPLORER_7_12M',
  TODDLER_FIRST_STEPS_12_18M: 'TODDLER_FIRST_STEPS_12_18M',
  TODDLER_LANGUAGE_BURST_18_24M: 'TODDLER_LANGUAGE_BURST_18_24M',
  OLDER_TODDLER_AUTONOMY_24_30M: 'OLDER_TODDLER_AUTONOMY_24_30M',
  OLDER_TODDLER_PRESCHOOL_PREP_30_36M: 'OLDER_TODDLER_PRESCHOOL_PREP_30_36M',
} as const;
export type EarlyChildhoodTranche = (typeof EarlyChildhoodTranche)[keyof typeof EarlyChildhoodTranche];

export const AcademyCategory = {
  BEHAVIOR_AND_EMOTIONS: 'BEHAVIOR_AND_EMOTIONS',
  HEALTH_AND_WELLNESS: 'HEALTH_AND_WELLNESS',
  NUTRITION_AND_FEEDING: 'NUTRITION_AND_FEEDING',
  DEVELOPMENT_AND_PLAY: 'DEVELOPMENT_AND_PLAY',
  DIGITAL_AND_DEVICES: 'DIGITAL_AND_DEVICES',
} as const;
export type AcademyCategory = (typeof AcademyCategory)[keyof typeof AcademyCategory];

export const LessonArchetype = {
  EVERYDAY_BEHAVIOR: 'EVERYDAY_BEHAVIOR',
  CHILD_GROWTH_CONCEPT: 'CHILD_GROWTH_CONCEPT',
  PRACTICAL_FAMILY_GUIDE: 'PRACTICAL_FAMILY_GUIDE',
} as const;
export type LessonArchetype = (typeof LessonArchetype)[keyof typeof LessonArchetype];

export const ChapterPriority = {
  PRIORITY_1_CRITICAL: 1,
  PRIORITY_2_ROUTINES: 2,
  PRIORITY_3_SCAFFOLDING: 3,
} as const;
export type ChapterPriority = (typeof ChapterPriority)[keyof typeof ChapterPriority];

export const TriageZone = {
  RED: 'RED',
  YELLOW: 'YELLOW',
  GREEN: 'GREEN',
} as const;
export type TriageZone = (typeof TriageZone)[keyof typeof TriageZone];

export const DietaryStage = {
  MILK_ONLY: 'MILK_ONLY',
  SOLIDS_INTRODUCED: 'SOLIDS_INTRODUCED',
  TODDLER_TABLE: 'TODDLER_TABLE',
  BALANCED_SCHOOL: 'BALANCED_SCHOOL',
  PUBERTAL_GROWTH: 'PUBERTAL_GROWTH',
} as const;
export type DietaryStage = (typeof DietaryStage)[keyof typeof DietaryStage];

export const MilestoneCategory = {
  GROSS_MOTOR: 'GROSS_MOTOR',
  FINE_MOTOR: 'FINE_MOTOR',
  SPEECH_LANGUAGE: 'SPEECH_LANGUAGE',
  COGNITIVE: 'COGNITIVE',
  SOCIAL_EMOTIONAL: 'SOCIAL_EMOTIONAL',
} as const;
export type MilestoneCategory = (typeof MilestoneCategory)[keyof typeof MilestoneCategory];

export const MilestoneStatus = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  ACHIEVED: 'ACHIEVED',
} as const;
export type MilestoneStatus = (typeof MilestoneStatus)[keyof typeof MilestoneStatus];

export const PlayCategory = {
  PUPPET: 'PUPPET',
  SENSORY: 'SENSORY',
  CONSTRUCTION: 'CONSTRUCTION',
  LOGIC_PUZZLE: 'LOGIC_PUZZLE',
  MAKER: 'MAKER',
  BOREDOM_BUSTER: 'BOREDOM_BUSTER',
} as const;
export type PlayCategory = (typeof PlayCategory)[keyof typeof PlayCategory];

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

export const TemperatureMethod = {
  RECTAL: 'RECTAL',
  AXILLARY: 'AXILLARY',
  ORAL: 'ORAL',
  TYMPANIC: 'TYMPANIC',
} as const;
export type TemperatureMethod = (typeof TemperatureMethod)[keyof typeof TemperatureMethod];

export const NutritionStage = {
  MILK_ONLY: 'MILK_ONLY',
  SOLIDS_INTRODUCED: 'SOLIDS_INTRODUCED',
  TODDLER_TABLE: 'TODDLER_TABLE',
  BALANCED_SCHOOL: 'BALANCED_SCHOOL',
  PUBERTAL_GROWTH: 'PUBERTAL_GROWTH',
} as const;
export type NutritionStage = (typeof NutritionStage)[keyof typeof NutritionStage];

export const AntipyreticMedication = {
  ACETAMINOPHEN: 'ACETAMINOPHEN',
  IBUPROFEN: 'IBUPROFEN',
} as const;
export type AntipyreticMedication = (typeof AntipyreticMedication)[keyof typeof AntipyreticMedication];
