import type {
  CultureDigestDTO,
  ExploitAlertDTO,
  ExploitSeverity,
  SlangTermDTO,
} from '@alongside/shared';
import type { DigestRepository } from './digest.repository.js';

export class DigestNotFoundError extends Error {
  readonly statusCode = 404;
  readonly code = 'NOT_FOUND';

  constructor(message = 'No culture digest issues found.') {
    super(message);
    this.name = 'DigestNotFoundError';
  }
}

export class DigestService {
  constructor(private readonly repository: DigestRepository) {}

  async getLatestDigest(): Promise<CultureDigestDTO> {
    const digest = await this.repository.findLatestDigest();
    if (!digest) {
      throw new DigestNotFoundError();
    }
    return digest;
  }

  async searchSlang(term?: string): Promise<SlangTermDTO[]> {
    return this.repository.searchSlang(term);
  }

  async getExploitAlerts(
    severity?: ExploitSeverity
  ): Promise<ExploitAlertDTO[]> {
    return this.repository.findExploits(severity);
  }
}
