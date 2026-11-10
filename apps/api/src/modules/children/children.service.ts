import {
  calculateChildAge,
  calculateChildAgeMonths,
  calculateDevelopmentalTier,
  calculateLifespanTier,
  calculateReadinessScore,
  resolveEarlyChildhoodTranche,
  DevelopmentalTier,
  type ChildDTO,
  type CreateChildInput,
  type ReadinessAnswer,
  type ReadinessAssessmentResult,
  type SubmitReadinessAssessmentInput,
  type UpdateChildInput,
} from '@alongside/shared';
import type {
  ChildrenRepository,
  ChildRecord,
  ReadinessAttemptRecord,
} from './children.repository.js';

export class ChildNotFoundError extends Error {
  readonly statusCode = 404;
  readonly code = 'NOT_FOUND';

  constructor(message = 'Child profile not found.') {
    super(message);
    this.name = 'ChildNotFoundError';
  }
}

export interface ReadinessAssessmentSubmissionResult {
  attempt: {
    id: string;
    quizId: string;
    childId: string;
    overallScore: number;
    dimensionScores: Record<string, number>;
    isReadyForPersonalPhone: boolean;
    recommendation: string;
    recommendedRoadmapPreset: string;
    dimensionBreakdown?: ReadinessAssessmentResult['dimensionBreakdown'];
    strengths: string[];
    growthAreas: string[];
    completedAt: string;
  };
}

export class ChildrenService {
  constructor(private readonly repository: ChildrenRepository) {}

  async createChild(userId: string, input: CreateChildInput): Promise<ChildDTO> {
    const age = calculateChildAge(input.birthYear, input.birthMonth);
    const developmentalTier =
      input.developmentalTier && Object.values(DevelopmentalTier).includes(input.developmentalTier as DevelopmentalTier)
        ? (input.developmentalTier as DevelopmentalTier)
        : age <= 3
          ? calculateLifespanTier(input.birthYear, input.birthMonth)
          : calculateDevelopmentalTier(input.birthYear, input.birthMonth);

    const record = await this.repository.create(userId, {
      ...input,
      developmentalTier,
    });

    return this.mapToDTO(record);
  }

  async getChildrenByUserId(userId: string): Promise<ChildDTO[]> {
    const children = await this.repository.findByUserId(userId);
    return children.map((c) => this.mapToDTO(c));
  }

  async getChildById(userId: string, childId: string): Promise<ChildDTO> {
    const child = await this.repository.findById(childId, userId);
    if (!child) {
      throw new ChildNotFoundError(`Child with id '${childId}' not found.`);
    }

    return this.mapToDTO(child);
  }

  async updateChild(
    userId: string,
    childId: string,
    input: UpdateChildInput
  ): Promise<ChildDTO> {
    const existing = await this.repository.findById(childId, userId);
    if (!existing) {
      throw new ChildNotFoundError(`Child with id '${childId}' not found.`);
    }

    const birthYear = input.birthYear ?? existing.birthYear;
    const birthMonth = input.birthMonth ?? existing.birthMonth;

    let developmentalTier = existing.developmentalTier;
    if (input.developmentalTier && Object.values(DevelopmentalTier).includes(input.developmentalTier as DevelopmentalTier)) {
      developmentalTier = input.developmentalTier as DevelopmentalTier;
    } else if (input.birthYear !== undefined || input.birthMonth !== undefined) {
      const age = calculateChildAge(birthYear, birthMonth);
      developmentalTier =
        age <= 3
          ? calculateLifespanTier(birthYear, birthMonth)
          : calculateDevelopmentalTier(birthYear, birthMonth);
    }

    const updated = await this.repository.update(childId, userId, {
      ...input,
      developmentalTier,
    });

    if (!updated) {
      throw new ChildNotFoundError(`Child with id '${childId}' not found.`);
    }

    return this.mapToDTO(updated);
  }

  async deleteChild(
    userId: string,
    childId: string
  ): Promise<{ id: string; deleted: boolean }> {
    const deleted = await this.repository.delete(childId, userId);
    if (!deleted) {
      throw new ChildNotFoundError(`Child with id '${childId}' not found.`);
    }

    return { id: childId, deleted: true };
  }

  async submitReadinessAssessment(
    userId: string,
    childId: string,
    input: SubmitReadinessAssessmentInput
  ): Promise<ReadinessAssessmentSubmissionResult> {
    const child = await this.repository.findById(childId, userId);
    if (!child) {
      throw new ChildNotFoundError(`Child with id '${childId}' not found.`);
    }

    // Extract raw responses from either input.answers or input.responses
    const rawItems = input.answers ?? input.responses ?? [];
    const normalizedAnswers: ReadinessAnswer[] = rawItems.map((item) => ({
      questionId: item.questionId,
      dimensionKey: item.dimensionKey || 'executive_function',
      score: item.score ?? 5,
      maxScore: item.maxScore ?? 10,
      selectedOptionId: item.selectedOptionId,
    }));

    const scoreResult = calculateReadinessScore(normalizedAnswers);

    const attempt = await this.repository.saveReadinessAttempt({
      quizId: input.quizId,
      userId,
      childId,
      overallScore: scoreResult.overallScore,
      dimensionScores: scoreResult.dimensionScores,
      recommendation: scoreResult.recommendation,
      recommendedRoadmapPreset: scoreResult.recommendedRoadmapPreset,
      responses: rawItems.map((r) => ({
        questionId: r.questionId,
        selectedOptionId: r.selectedOptionId,
      })),
    });

    return {
      attempt: {
        id: attempt.id,
        quizId: attempt.quizId,
        childId,
        overallScore: scoreResult.overallScore,
        dimensionScores: scoreResult.dimensionScores,
        isReadyForPersonalPhone: scoreResult.isReadyForPersonalPhone,
        recommendation: scoreResult.recommendation,
        recommendedRoadmapPreset: scoreResult.recommendedRoadmapPreset,
        dimensionBreakdown: scoreResult.dimensionBreakdown,
        strengths: scoreResult.strengths,
        growthAreas: scoreResult.growthAreas,
        completedAt: attempt.completedAt.toISOString(),
      },
    };
  }

  private mapToDTO(record: ChildRecord): ChildDTO {
    const age = calculateChildAge(record.birthYear, record.birthMonth);
    const birthDate = record.birthDate
      ? new Date(record.birthDate)
      : new Date(record.birthYear, record.birthMonth - 1, 1);
    const ageMonths = calculateChildAgeMonths(birthDate);
    const earlyChildhoodTranche =
      ageMonths <= 36 ? resolveEarlyChildhoodTranche(ageMonths) : null;

    return {
      id: record.id,
      userId: record.userId,
      name: record.name,
      birthYear: record.birthYear,
      birthMonth: record.birthMonth,
      age,
      ageMonths,
      earlyChildhoodTranche,
      roadType: record.roadType,
      developmentalTier: record.developmentalTier,
      schoolGrade: record.schoolGrade,
      deviceProfileStatus: record.deviceProfileStatus ?? null,
      latestAssessmentScore: record.latestAssessmentScore ?? record.latestAssessment?.overallScore ?? null,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    };
  }
}
