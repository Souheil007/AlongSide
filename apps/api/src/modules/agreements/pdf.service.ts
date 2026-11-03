import type { AgreementRecord } from './agreements.repository.js';

export interface PdfDocumentRenderer {
  renderAgreementPdf(agreement: AgreementRecord): Promise<Buffer>;
}

/**
 * Escapes characters for PDF literal string syntax.
 */
function escapePdfText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

/**
 * Production Vector PDF Renderer.
 * Produces crisp, beautiful vector PDF documents (PDF-1.4) without external runtime dependencies.
 */
export class StandardVectorPdfRenderer implements PdfDocumentRenderer {
  async renderAgreementPdf(agreement: AgreementRecord): Promise<Buffer> {
    const lines: string[] = [];
    const childName = agreement.child?.name || 'Child';
    const title = agreement.title || `${childName}'s Family Tech Treaty`;
    const tier = agreement.developmentalTier.replace(/_/g, ' ');
    const road = agreement.roadType.replace(/_/g, ' ');
    const dateStr = (agreement.signedAt ?? agreement.createdAt).toISOString().split('T')[0];

    // Stream commands for page content
    const streamCommands: string[] = [];

    // Background header banner (Calm Deep Teal: RGB 0.16, 0.38, 0.34)
    streamCommands.push('0.16 0.38 0.34 rg');
    streamCommands.push('36 700 540 60 re f');

    // Header Title
    streamCommands.push('1 1 1 rg'); // White text
    streamCommands.push('BT /F2 20 Tf 50 735 Td (' + escapePdfText('ALONGSIDE BILATERAL FAMILY PACT') + ') Tj ET');
    streamCommands.push('BT /F1 10 Tf 50 715 Td (' + escapePdfText('Pact-as-Code — Mutual Family Tech Treaty & Safe Harbor Guarantee') + ') Tj ET');

    // Metadata Bar
    streamCommands.push('0.95 0.96 0.96 rg');
    streamCommands.push('36 655 540 35 re f');
    streamCommands.push('0.2 0.25 0.25 rg');
    streamCommands.push(
      'BT /F2 11 Tf 46 675 Td (' +
        escapePdfText(`Treaty: ${title}`) +
        ') Tj ET'
    );
    streamCommands.push(
      'BT /F1 9 Tf 46 662 Td (' +
        escapePdfText(`Child: ${childName} | Tier: ${tier} | Road: ${road} | Effective Date: ${dateStr}`) +
        ') Tj ET'
    );

    // Section 1: Child Commitments
    streamCommands.push('0.18 0.45 0.40 rg');
    streamCommands.push('BT /F2 13 Tf 40 630 Td (' + escapePdfText(`${childName.toUpperCase()}'S COMMITMENTS`) + ') Tj ET');

    let currentY = 612;
    const childClauses = agreement.clauses.filter((c) => c.party === 'CHILD');
    const displayedChildClauses = childClauses.slice(0, 4);

    for (const clause of displayedChildClauses) {
      streamCommands.push('0.12 0.15 0.15 rg');
      streamCommands.push(`BT /F2 10 Tf 46 ${currentY} Td (${escapePdfText(`• ${clause.title}`)}) Tj ET`);
      currentY -= 12;

      // Truncate long descriptions to 85 chars for clean 1-page layout
      const desc =
        clause.description.length > 85
          ? `${clause.description.slice(0, 82)}...`
          : clause.description;
      streamCommands.push('0.3 0.35 0.35 rg');
      streamCommands.push(`BT /F1 9 Tf 56 ${currentY} Td (${escapePdfText(desc)}) Tj ET`);
      currentY -= 18;
    }

    currentY -= 6;

    // Section 2: Parent Commitments & Safe Harbor Guarantee
    streamCommands.push('0.18 0.45 0.40 rg');
    streamCommands.push(`BT /F2 13 Tf 40 ${currentY} Td (${escapePdfText('PARENT COMMITMENTS & SAFE HARBOR GUARANTEE')}) Tj ET`);
    currentY -= 18;

    const parentClauses = agreement.clauses.filter((c) => c.party === 'PARENT');
    const displayedParentClauses = parentClauses.slice(0, 3);

    for (const clause of displayedParentClauses) {
      streamCommands.push('0.12 0.15 0.15 rg');
      streamCommands.push(`BT /F2 10 Tf 46 ${currentY} Td (${escapePdfText(`• ${clause.title}`)}) Tj ET`);
      currentY -= 12;

      const desc =
        clause.description.length > 85
          ? `${clause.description.slice(0, 82)}...`
          : clause.description;
      streamCommands.push('0.3 0.35 0.35 rg');
      streamCommands.push(`BT /F1 9 Tf 56 ${currentY} Td (${escapePdfText(desc)}) Tj ET`);
      currentY -= 18;
    }

    // Safe Harbor Guarantee Badge (Gold Seal)
    currentY -= 10;
    streamCommands.push('0.98 0.95 0.88 rg'); // Light amber box
    streamCommands.push(`36 ${currentY - 48} 540 50 re f`);
    streamCommands.push('0.75 0.55 0.15 RG 1.5 w'); // Gold border
    streamCommands.push(`36 ${currentY - 48} 540 50 re S`);

    streamCommands.push('0.65 0.45 0.05 rg');
    streamCommands.push(`BT /F2 11 Tf 50 ${currentY - 18} Td (${escapePdfText('★ ALONGSIDE SAFE HARBOR GUARANTEE')}) Tj ET`);
    streamCommands.push('0.35 0.30 0.20 rg');
    streamCommands.push(
      `BT /F1 8.5 Tf 50 ${currentY - 34} Td (${escapePdfText(
        'Parents guarantee no covert surveillance or arbitrary phone seizure. Honest disclosure of tech friction is met with calm neurobiological coaching.'
      )}) Tj ET`
    );

    // Co-signatures Section
    const signY = 120;
    streamCommands.push('0.2 0.2 0.2 RG 1 w');
    // Parent line
    streamCommands.push(`60 ${signY} m 260 ${signY} l S`);
    // Child line
    streamCommands.push(`340 ${signY} m 540 ${signY} l S`);

    streamCommands.push('0.2 0.25 0.25 rg');
    const parentSigText = agreement.parentSignature ? '[Signed Digitally]' : '[Pending Parent Signature]';
    const childSigText = agreement.childSignature ? '[Signed Digitally]' : '[Pending Child Signature]';

    streamCommands.push(`BT /F2 9.5 Tf 60 ${signY + 8} Td (${escapePdfText(parentSigText)}) Tj ET`);
    streamCommands.push(`BT /F1 8.5 Tf 60 ${signY - 14} Td (${escapePdfText('Parent / Guardian Signature & Date')}) Tj ET`);

    streamCommands.push(`BT /F2 9.5 Tf 340 ${signY + 8} Td (${escapePdfText(childSigText)}) Tj ET`);
    streamCommands.push(`BT /F1 8.5 Tf 340 ${signY - 14} Td (${escapePdfText(`${childName}'s Signature & Date`)}) Tj ET`);

    // Refrigerator-Ready Footer
    streamCommands.push('0.5 0.55 0.55 rg');
    streamCommands.push(
      'BT /F1 8 Tf 160 50 Td (' +
        escapePdfText('Hang this on your refrigerator. Built with Alongside Parent Systems (alongside.care)') +
        ') Tj ET'
    );

    const streamContent = streamCommands.join('\n');
    const streamLength = Buffer.byteLength(streamContent, 'utf-8');

    // Assemble PDF-1.4 Objects
    const objects: string[] = [];
    objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
    objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj');
    objects.push(
      '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj'
    );
    objects.push(`4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj`);
    objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj');
    objects.push('6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj');

    let pdf = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
    const offsets: number[] = [0];

    for (let i = 0; i < objects.length; i++) {
      offsets.push(Buffer.byteLength(pdf, 'utf-8'));
      pdf += objects[i] + '\n';
    }

    const startXref = Buffer.byteLength(pdf, 'utf-8');
    let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i <= objects.length; i++) {
      xref += (offsets[i] ?? 0).toString().padStart(10, '0') + ' 00000 n \n';
    }

    pdf += xref;
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
    pdf += `startxref\n${startXref}\n%%EOF\n`;

    return Buffer.from(pdf, 'utf-8');
  }
}

/**
 * In-Memory PDF Fake Adapter for ultra-fast integration tests.
 */
export class InMemoryPdfFake implements PdfDocumentRenderer {
  async renderAgreementPdf(agreement: AgreementRecord): Promise<Buffer> {
    const minimalPdf =
      '%PDF-1.4\n' +
      '1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n' +
      '2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj\n' +
      `3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<</Font<</F1 4 0 R>>>>/Contents 5 0 R>>endobj\n` +
      '4 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj\n' +
      `5 0 obj<</Length 44>>stream\nBT /F1 12 Tf 50 700 Td (${agreement.title || 'Treaty'}) Tj ET\nendstream\nendobj\n` +
      'xref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000052 00000 n \n0000000109 00000 n \n0000000212 00000 n \n0000000276 00000 n \n' +
      'trailer<</Size 6/Root 1 0 R>>\nstartxref\n370\n%%EOF\n';
    return Buffer.from(minimalPdf, 'utf-8');
  }
}
