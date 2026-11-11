'use client';

import * as React from 'react';
import { AcademyCategory, type AdaptiveModuleType } from '@alongside/shared';
import { SomaticBreathWidget } from './SomaticBreathWidget';
import { CircadianTimelineWidget } from './CircadianTimelineWidget';
import { FeedingResponsibilityWidget } from './FeedingResponsibilityWidget';
import { PurposefulPlayBlueprintWidget } from './PurposefulPlayBlueprintWidget';
import { PactClauseBridgeWidget } from './PactClauseBridgeWidget';
import { cn } from '@/lib/utils';

export interface LessonAdaptiveModuleRendererProps {
  adaptiveModuleType?: AdaptiveModuleType | string | null;
  category?: AcademyCategory | string | null;
  isNightstandMode?: boolean;
  className?: string;
}

export function LessonAdaptiveModuleRenderer({
  adaptiveModuleType,
  category,
  isNightstandMode = false,
  className,
}: LessonAdaptiveModuleRendererProps) {
  // Determine effective module type by explicit type first, then by category
  const effectiveType: AdaptiveModuleType | string = React.useMemo(() => {
    if (adaptiveModuleType) return adaptiveModuleType;

    if (category) {
      switch (category) {
        case AcademyCategory.BEHAVIOR_AND_EMOTIONS:
          return 'SOMATIC_RESET';
        case AcademyCategory.HEALTH_AND_WELLNESS:
          return 'CIRCADIAN_TIMELINE';
        case AcademyCategory.NUTRITION_AND_FEEDING:
          return 'FEEDING_LADDER';
        case AcademyCategory.DEVELOPMENT_AND_PLAY:
          return 'PLAY_BLUEPRINT';
        case AcademyCategory.DIGITAL_AND_DEVICES:
          return 'PACT_CLAUSE';
        default:
          return 'SOMATIC_RESET';
      }
    }

    return 'SOMATIC_RESET';
  }, [adaptiveModuleType, category]);

  return (
    <div
      data-testid="adaptive-module-container"
      className={cn('my-6', className)}
    >
      {effectiveType === 'SOMATIC_RESET' && (
        <SomaticBreathWidget isNightstandMode={isNightstandMode} />
      )}
      {effectiveType === 'CIRCADIAN_TIMELINE' && (
        <CircadianTimelineWidget isNightstandMode={isNightstandMode} />
      )}
      {effectiveType === 'FEEDING_LADDER' && (
        <FeedingResponsibilityWidget isNightstandMode={isNightstandMode} />
      )}
      {effectiveType === 'PLAY_BLUEPRINT' && (
        <PurposefulPlayBlueprintWidget isNightstandMode={isNightstandMode} />
      )}
      {effectiveType === 'PACT_CLAUSE' && (
        <PactClauseBridgeWidget isNightstandMode={isNightstandMode} />
      )}
    </div>
  );
}
