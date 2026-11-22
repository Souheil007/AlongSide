'use client';

import * as React from 'react';
import { ArrowUp, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AdvisorComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onStop: () => void;
  isStreaming: boolean;
  placeholder: string;
  variant?: 'drawer' | 'studio';
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
  className?: string;
}

export function AdvisorComposer({
  value,
  onChange,
  onSubmit,
  onStop,
  isStreaming,
  placeholder,
  variant = 'studio',
  textareaRef,
  className,
}: AdvisorComposerProps) {
  const internalRef = React.useRef<HTMLTextAreaElement>(null);
  const resolvedRef = textareaRef ?? internalRef;
  const maxHeight = variant === 'drawer' ? 124 : 168;

  // Auto-resize textarea smoothly to fit multi-line drafts
  React.useEffect(() => {
    const el = resolvedRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const nextHeight = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${nextHeight}px`;
  }, [value, maxHeight, resolvedRef]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || isStreaming) return;
    onSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isStreaming) {
        onSubmit();
      }
    }
  };

  const canSend = value.trim().length > 0 && !isStreaming;

  return (
    <div className={cn('space-y-2', className)}>
      <form
        onSubmit={handleFormSubmit}
        className={cn(
          'flex items-end gap-2 rounded-[12px] border border-[rgba(19,23,21,0.14)] bg-white transition-colors duration-150',
          'focus-within:border-[#143D2B] focus-within:ring-2 focus-within:ring-[#143D2B]/12',
          variant === 'drawer' ? 'px-3 py-2' : 'px-4 py-2.5'
        )}
      >
        <textarea
          ref={resolvedRef}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isStreaming}
          placeholder={placeholder}
          aria-label="Message Parent Advisor"
          className={cn(
            'flex-1 resize-none bg-transparent text-[#131715] placeholder:text-[#7A827E] focus:outline-none disabled:opacity-60 leading-[1.5]',
            variant === 'drawer' ? 'py-1.5 text-[14px]' : 'py-2 text-[14.5px]'
          )}
          style={{ maxHeight: `${maxHeight}px` }}
        />

        <div className="flex shrink-0 items-center pb-0.5">
          {isStreaming ? (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop response"
              className={cn(
                'inline-flex items-center justify-center gap-1.5 rounded-[8px] border border-[#DC2626]/25 bg-[#FEF2F2] text-[#B91C1C] font-medium transition-colors duration-150 hover:bg-[#FEE2E2] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]',
                variant === 'drawer'
                  ? 'h-9 px-2.5 text-[12.5px]'
                  : 'h-10 px-3 text-[13px]'
              )}
            >
              <Square className="h-3 w-3 fill-current" aria-hidden="true" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canSend}
              aria-label="Send message"
              className={cn(
                'inline-flex items-center justify-center rounded-[8px] transition-[background-color,color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#143D2B] focus-visible:ring-offset-1',
                canSend
                  ? 'bg-[#143D2B] text-white hover:bg-[#0E2B1E] active:scale-[0.96] cursor-pointer'
                  : 'bg-[#F0EFEA] text-[#98A09C] cursor-not-allowed',
                variant === 'drawer' ? 'h-9 w-9' : 'h-10 w-10'
              )}
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>
      </form>

      {variant === 'studio' && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[12px] text-[#69726D]">
          <span>Enter to send · Shift + Enter for new line</span>
          <span>Grounded in pediatric neurobiology</span>
        </div>
      )}
    </div>
  );
}
