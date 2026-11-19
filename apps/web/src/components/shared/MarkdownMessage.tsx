'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

function renderInline(text: string): React.ReactNode {
  if (!text) return null;
  // Match **bold**, *italic*, _italic_, `code`, and [link](url)
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return tokens.map((token, i) => {
    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      return (
        <strong key={i} className="font-semibold text-inherit">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (
      ((token.startsWith('*') && token.endsWith('*')) ||
        (token.startsWith('_') && token.endsWith('_'))) &&
      token.length >= 2
    ) {
      return (
        <em key={i} className="italic text-inherit">
          {token.slice(1, -1)}
        </em>
      );
    }
    if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      return (
        <code
          key={i}
          className="rounded bg-stone-100 px-1 py-0.5 font-mono text-[11px] text-[#143D2B]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#143D2B] underline hover:text-[#0E2B1E]"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return token;
  });
}

export interface MarkdownMessageProps {
  content: string;
  className?: string;
  isStreaming?: boolean;
}

export function MarkdownMessage({
  content,
  className,
  isStreaming = false,
}: MarkdownMessageProps) {
  if (!content) return null;

  // Split into paragraphs / blocks by double newline
  const rawBlocks = content.split(/\n\n+/);

  return (
    <div className={cn('text-xs leading-relaxed space-y-2 text-[#111413]', className)}>
      {rawBlocks.map((block, blockIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // 1. Headers (### or ## or #)
        if (trimmed.startsWith('#')) {
          const levelMatch = trimmed.match(/^(#{1,4})\s+(.+)$/m);
          if (levelMatch && levelMatch[2]) {
            const headingText = levelMatch[2];
            return (
              <h4
                key={blockIdx}
                className="font-serif font-bold text-[#111413] text-xs sm:text-[13px] pt-1 pb-0.5 leading-snug tracking-tight"
              >
                {renderInline(headingText)}
              </h4>
            );
          }
        }

        // 2. Blockquotes / Scripts (> ...)
        if (trimmed.startsWith('>')) {
          const quoteLines = trimmed
            .split('\n')
            .map((line) => line.replace(/^>\s?/, ''))
            .join(' ');
          return (
            <div
              key={blockIdx}
              className="my-2 rounded-r-lg border-l-3 border-[#143D2B] bg-[#EAF3EE]/80 px-3 py-2 text-[#143D2B] font-serif italic text-xs leading-relaxed shadow-2xs"
            >
              <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#143D2B]/80 mb-0.5 not-italic">
                Script to Say:
              </div>
              <div>{renderInline(quoteLines)}</div>
            </div>
          );
        }

        // 3. Mixed or Unordered list (- ... or * ...)
        const lines = trimmed.split('\n');
        const isBulletList = lines.every((l) => /^\s*[-*]\s+/.test(l));
        if (isBulletList) {
          return (
            <ul key={blockIdx} className="my-1.5 space-y-1 pl-1">
              {lines.map((line, lineIdx) => {
                const itemContent = line.replace(/^\s*[-*]\s+/, '');
                return (
                  <li key={lineIdx} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-[#143D2B] font-bold shrink-0 leading-tight">•</span>
                    <span className="flex-1">{renderInline(itemContent)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // 4. Ordered list (1. ... 2. ...)
        const isOrderedList = lines.every((l) => /^\s*\d+\.\s+/.test(l));
        if (isOrderedList) {
          return (
            <ol key={blockIdx} className="my-1.5 space-y-1 pl-1">
              {lines.map((line, lineIdx) => {
                const numberMatch = line.match(/^\s*(\d+)\.\s+(.*)$/);
                const num = numberMatch && numberMatch[1] ? numberMatch[1] : lineIdx + 1;
                const itemContent = numberMatch && numberMatch[2] ? numberMatch[2] : line;
                return (
                  <li key={lineIdx} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-[#143D2B] font-mono font-bold text-[10px] shrink-0 w-3.5 pt-0.5">
                      {num}.
                    </span>
                    <span className="flex-1">{renderInline(itemContent)}</span>
                  </li>
                );
              })}
            </ol>
          );
        }

        // 5. Standard paragraph with potential single newlines inside
        return (
          <p key={blockIdx} className="leading-relaxed">
            {lines.map((line, lineIdx) => (
              <React.Fragment key={lineIdx}>
                {lineIdx > 0 && <br />}
                {renderInline(line)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
      {isStreaming && (
        <span className="inline-block h-3 w-1.5 ml-1 bg-[#143D2B] animate-pulse" />
      )}
    </div>
  );
}
