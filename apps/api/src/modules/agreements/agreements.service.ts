import {
  AgreementStatus,
  type AgreementClauseDTO,
  type AgreementDTO,
  type CreateAgreementInput,
  type DevelopmentalTier,
  type RoadType,
  type UpdateAgreementInput,
} from '@alongside/shared';
import {
  getAgreementPresets,
  getGroupedAgreementPresets,
  type PactPresetCategoryGroup,
} from './agreements.presets.js';
import type {
  AgreementRecord,
  AgreementsRepository,
} from './agreements.repository.js';
import {
  type PdfDocumentRenderer,
  StandardVectorPdfRenderer,
} from './pdf.service.js';

export class AgreementNotFoundError extends Error {
  readonly statusCode = 404;
  readonly code = 'AGREEMENT_NOT_FOUND';

  constructor(message = 'Agreement not found.') {
    super(message);
    this.name = 'AgreementNotFoundError';
  }
}

export class AgreementService {
  constructor(
    private readonly repository: AgreementsRepository,
    private readonly pdfRenderer: PdfDocumentRenderer = new StandardVectorPdfRenderer()
  ) {}

  getPresets(
    tier?: DevelopmentalTier,
    roadType?: RoadType
  ): {
    presets: ReturnType<typeof getAgreementPresets>;
    categories: PactPresetCategoryGroup[];
  } {
    const presets = getAgreementPresets(tier, roadType);
    const categories = getGroupedAgreementPresets(tier, roadType);
    return { presets, categories };
  }

  async createAgreement(
    userId: string,
    input: CreateAgreementInput
  ): Promise<AgreementDTO> {
    const isSigned = Boolean(input.parentSignature && input.childSignature);
    const status = isSigned ? AgreementStatus.SIGNED : AgreementStatus.DRAFT;
    const signedAt = isSigned ? new Date() : null;

    const record = await this.repository.create(userId, {
      childId: input.childId,
      title: input.title,
      developmentalTier: input.developmentalTier,
      roadType: input.roadType,
      clauses: input.clauses,
      parentSignature: input.parentSignature,
      childSignature: input.childSignature,
      status,
      signedAt,
    });

    return this.mapToDTO(record);
  }

  async getAgreementById(
    userId: string,
    agreementId: string
  ): Promise<AgreementDTO> {
    const record = await this.repository.findById(agreementId, userId);
    if (!record) {
      throw new AgreementNotFoundError(
        `Agreement with ID '${agreementId}' not found.`
      );
    }
    return this.mapToDTO(record);
  }

  async getAgreementsByUserId(userId: string): Promise<AgreementDTO[]> {
    const records = await this.repository.findByUserId(userId);
    return records.map((r) => this.mapToDTO(r));
  }

  async getAgreementsByChildId(
    userId: string,
    childId: string
  ): Promise<AgreementDTO[]> {
    const records = await this.repository.findByChildId(childId, userId);
    return records.map((r) => this.mapToDTO(r));
  }

  async updateAgreement(
    userId: string,
    agreementId: string,
    input: UpdateAgreementInput
  ): Promise<AgreementDTO> {
    const existing = await this.repository.findById(agreementId, userId);
    if (!existing) {
      throw new AgreementNotFoundError(
        `Agreement with ID '${agreementId}' not found.`
      );
    }

    const finalParentSig = input.parentSignature ?? existing.parentSignature;
    const finalChildSig = input.childSignature ?? existing.childSignature;
    const bothSigned = Boolean(finalParentSig && finalChildSig);

    let status = input.status ?? existing.status;
    let signedAt = existing.signedAt;

    if (bothSigned && status === AgreementStatus.DRAFT) {
      status = AgreementStatus.SIGNED;
      signedAt = new Date();
    }

    const updated = await this.repository.update(agreementId, userId, {
      title: input.title,
      clauses: input.clauses,
      parentSignature: input.parentSignature,
      childSignature: input.childSignature,
      status,
      signedAt,
    });

    if (!updated) {
      throw new AgreementNotFoundError(
        `Agreement with ID '${agreementId}' not found.`
      );
    }

    return this.mapToDTO(updated);
  }

  async exportPdf(
    userId: string,
    agreementId: string
  ): Promise<{ buffer: Buffer; filename: string }> {
    const record = await this.repository.findById(agreementId, userId);
    if (!record) {
      throw new AgreementNotFoundError(
        `Agreement with ID '${agreementId}' not found.`
      );
    }

    const buffer = await this.pdfRenderer.renderAgreementPdf(record);
    const sanitizedTitle = (record.title || 'Family-Tech-Treaty')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .replace(/_+/g, '_');
    const filename = `${sanitizedTitle}.pdf`;

    return { buffer, filename };
  }

  private mapToDTO(record: AgreementRecord): AgreementDTO {
    return {
      id: record.id,
      userId: record.userId,
      childId: record.childId,
      title: record.title,
      status: record.status,
      developmentalTier: record.developmentalTier,
      roadType: record.roadType,
      parentSignature: record.parentSignature,
      childSignature: record.childSignature,
      signedAt: record.signedAt ? new Date(record.signedAt).toISOString() : null,
      pdfExportUrl: `/api/v1/agreements/${record.id}/export-pdf`,
      clauses: record.clauses.map((c): AgreementClauseDTO => ({
        id: c.id,
        agreementId: c.agreementId,
        category: c.category,
        party: c.party,
        title: c.title,
        description: c.description,
        isStandard: c.isStandard,
        isCustom: c.isCustom,
        sortOrder: c.sortOrder,
      })),
      createdAt: new Date(record.createdAt).toISOString(),
      updatedAt: new Date(record.updatedAt).toISOString(),
    };
  }
}
