'use client';

import * as React from 'react';
import { Check, Copy, X } from 'lucide-react';

export interface PartnerShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  headline: string;
  calmScript: string;
  chosenMoveTitle?: string | null;
  savedPushbackScript?: string | null;
  childLabel?: string | null;
}

export function PartnerShareModal({
  isOpen,
  onClose,
  headline,
  calmScript,
  chosenMoveTitle,
  savedPushbackScript,
  childLabel,
}: PartnerShareModalProps) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      setCopied(false);
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shareTextLines = [
    `AlongSide 20-Second Co-Parent Note${childLabel ? ` (${childLabel})` : ''}`,
    `Topic: ${headline}`,
    `Words we’re trying: ${calmScript}`,
    chosenMoveTitle ? `Tonight’s tiny move: ${chosenMoveTitle}` : null,
    savedPushbackScript ? `If pushback happens: ${savedPushbackScript}` : null,
  ].filter(Boolean);

  const shareText = shareTextLines.join('\n');

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareText);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="partner-share-modal-title"
      data-testid="partner-share-modal"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#111413]/50 p-4 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] rounded-[18px] border border-[var(--hairline)] bg-[var(--elevated)] p-6 sm:p-7 shadow-xl almanac-rise-in"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3
            id="partner-share-modal-title"
            className="font-serif-almanac text-[22px] font-semibold text-[var(--ink)] m-0"
          >
            20-Second Co-Parent Share
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close co-parent share dialog"
            className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--canvas-subtle)] text-[var(--body)] transition-colors hover:text-[var(--ink)] cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <p className="text-[13.5px] leading-relaxed text-[var(--body)] m-0">
          Get on the same calm page in twenty seconds—ready to paste into text or WhatsApp without forwarding a whole lesson.
        </p>

        {/* Shareable Card Preview */}
        <div className="my-4 rounded-[14px] border border-[var(--spruce-border)] bg-[var(--canvas)] p-5 space-y-3">
          <div className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[var(--spruce)]">
            AlongSide Pocket Note{childLabel ? ` · ${childLabel}` : ''}
          </div>

          <p className="text-[14.5px] font-semibold text-[var(--ink)] m-0">
            {headline}
          </p>

          <div>
            <span className="block text-[11px] font-semibold text-[var(--mute)] mb-0.5">
              Words we’re trying
            </span>
            <p className="font-serif-almanac italic text-[16.5px] leading-snug text-[var(--spruce)] m-0">
              {calmScript}
            </p>
          </div>

          {chosenMoveTitle && (
            <div>
              <span className="block text-[11px] font-semibold text-[var(--mute)] mb-0.5">
                Tonight’s tiny move
              </span>
              <p className="text-[13.5px] text-[var(--ink)] m-0">
                {chosenMoveTitle}
              </p>
            </div>
          )}

          {savedPushbackScript && (
            <div>
              <span className="block text-[11px] font-semibold text-[var(--mute)] mb-0.5">
                Saved backup phrase
              </span>
              <p className="font-serif-almanac italic text-[14.5px] text-[var(--body)] m-0">
                {savedPushbackScript}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] rounded-full border border-[var(--hairline)] bg-[var(--elevated)] px-4 text-[13.5px] font-medium text-[var(--body)] hover:text-[var(--ink)] cursor-pointer"
          >
            Done
          </button>
          <button
            type="button"
            onClick={handleCopy}
            data-testid="copy-partner-note-btn"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--spruce)] bg-[var(--spruce)] px-5 text-[13.5px] font-semibold text-[var(--elevated)] transition-colors hover:bg-[var(--spruce-hover)] cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden="true" />
                <span>Copy Share Note</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
