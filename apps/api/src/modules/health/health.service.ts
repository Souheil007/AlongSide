import type {
  SymptomTriageInput,
  LogHealthEventInput,
  SymptomProtocolDTO,
  ChildHealthLogDTO,
  TriageAssessmentResultDTO,
  AntipyreticDosingRecommendation,
} from '@alongside/shared';
import type { HealthRepository } from './health.repository.js';
import type { PediatricTriageEngine } from './triage.engine.js';
import type { ChildrenRepository } from '../children/children.repository.js';

export class HealthService {
  constructor(
    private readonly healthRepo: HealthRepository,
    private readonly triageEngine: PediatricTriageEngine,
    private readonly childrenRepo?: ChildrenRepository
  ) {}

  async evaluateTriage(input: SymptomTriageInput): Promise<TriageAssessmentResultDTO> {
    let ageMonths = 24; // baseline fallback
    let weightLbs = input.weightLbs;

    if (input.childId && this.childrenRepo) {
      try {
        const child = await this.childrenRepo.findById(input.childId);
        if (child) {
          const now = new Date();
          const birthDate = new Date(child.birthYear, (child.birthMonth || 1) - 1, 1);
          ageMonths = Math.max(
            1,
            (now.getFullYear() - birthDate.getFullYear()) * 12 +
              (now.getMonth() - birthDate.getMonth())
          );
        }
      } catch {
        // Child resolution fallback
      }
    }

    const decision = this.triageEngine.triageSymptom({
      childAgeMonths: ageMonths,
      weightLbs,
      temperatureF: input.temperatureF,
      temperatureMethod: input.temperatureMethod,
      symptoms: input.symptoms,
      durationHours: input.durationHours,
      behaviorNotes: input.behaviorNotes,
    });

    return {
      zone: decision.zone,
      requiresEmergency911: decision.requiresEmergency911,
      conditionSuspected: decision.conditionSuspected,
      clinicalRationale: decision.clinicalRationale,
      immediateActions: decision.immediateActions,
      homeCareMeasures: decision.homeCareMeasures,
      redFlagWarnings: decision.redFlagWarnings,
      recommendedDosing: decision.recommendedDosing
        ? {
            medication: decision.recommendedDosing.medication,
            dosageMg: decision.recommendedDosing.dosageMg,
            frequency: decision.recommendedDosing.frequency,
            notes: decision.recommendedDosing.notes,
          }
        : null,
      clinicalAuthority: decision.clinicalAuthority,
    };
  }

  async getProtocols(): Promise<SymptomProtocolDTO[]> {
    return this.healthRepo.findProtocols();
  }

  async getProtocolBySlug(slug: string): Promise<SymptomProtocolDTO | null> {
    return this.healthRepo.findProtocolBySlug(slug);
  }

  async getChildHealthLogs(childId: string): Promise<ChildHealthLogDTO[]> {
    return this.healthRepo.findHealthLogsByChild(childId);
  }

  async createChildHealthLog(
    childId: string,
    input: LogHealthEventInput
  ): Promise<ChildHealthLogDTO> {
    return this.healthRepo.createHealthLog({
      childId,
      protocolId: input.protocolId,
      symptomTitle: input.symptomTitle,
      temperatureF: input.temperatureF,
      triageZone: input.triageZone,
      clinicalNotes: input.clinicalNotes,
      actionTaken: input.actionTaken,
    });
  }

  calculateDosing(
    childWeightLbs: number,
    medication: 'ACETAMINOPHEN' | 'IBUPROFEN',
    ageMonths: number
  ): AntipyreticDosingRecommendation {
    return this.triageEngine.calculateAntipyreticDosage(
      childWeightLbs,
      medication,
      ageMonths
    );
  }
}
