'use client';

import * as React from 'react';
import { cn, isSafeUrl } from '@/lib/utils';

function renderInline(text: string): React.ReactNode {
  if (!text) return null;
  // Match **bold**, *italic*, _italic_, `code`, and [link](url) with nested parens support
  const tokens = text.split(
    /(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_|`[^`]+`|\[[^\]]+\]\((?:[^()]+|\([^()]*\))*\))/g
  );
  return tokens.map((token, i) => {
    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      return (
        <strong key={i} className="font-semibold text-[#131715]">
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
          className="rounded-[4px] bg-[#EFECE3] px-1.5 py-0.5 font-mono text-[12px] text-[#143D2B]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = token.match(/^\[([^\]]+)\]\(((?:[^()]+|\([^()]*\))*)\)$/);
    if (linkMatch && linkMatch[1] && linkMatch[2]) {
      const linkText = linkMatch[1];
      const linkHref = linkMatch[2];
      if (!isSafeUrl(linkHref)) {
        return linkText;
      }
      return (
        <a
          key={i}
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#143D2B] underline underline-offset-2 hover:text-[#0E2B1E]"
        >
          {linkText}
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

interface LineGroup {
  type: 'p' | 'ul' | 'ol';
  items: string[];
}

function parseBlockLines(lines: string[]): LineGroup[] {
  const groups: LineGroup[] = [];
  let currentGroup: LineGroup | null = null;

  for (const line of lines) {
    if (/^\s*[-*]\s+/.test(line)) {
      if (currentGroup?.type === 'ul') {
        currentGroup.items.push(line);
      } else {
        if (currentGroup) groups.push(currentGroup);
        currentGroup = { type: 'ul', items: [line] };
      }
    } else if (/^\s*\d+\.\s+/.test(line)) {
      if (currentGroup?.type === 'ol') {
        currentGroup.items.push(line);
      } else {
        if (currentGroup) groups.push(currentGroup);
        currentGroup = { type: 'ol', items: [line] };
      }
    } else {
      if (currentGroup?.type === 'p') {
        currentGroup.items.push(line);
      } else {
        if (currentGroup) groups.push(currentGroup);
        currentGroup = { type: 'p', items: [line] };
      }
    }
  }

  if (currentGroup) groups.push(currentGroup);
  return groups;
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
    <div className={cn('text-[14px] leading-[1.6] space-y-2.5 text-[#303633]', className)}>
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
                className="font-serif text-[16px] font-medium text-[#131715] pt-1 leading-[1.3] tracking-[-0.01em]"
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
              className="my-2 rounded-r-[8px] rounded-l-[2px] border border-[rgba(19,23,21,0.08)] border-l-[3px] border-l-[#143D2B] bg-white px-3.5 py-2.5 text-[#131715]"
            >
              <div className="text-[11.5px] font-medium text-[#143D2B] mb-1">
                Script to Say:
              </div>
              <div className="font-serif text-[15.5px] leading-[1.48] text-[#131715]">
                {renderInline(quoteLines)}
              </div>
            </div>
          );
        }

        // 3. Process lines (paragraphs, unordered lists, ordered lists)
        const lines = trimmed.split('\n');
        const groups = parseBlockLines(lines);

        return (
          <div key={blockIdx} className="space-y-2">
            {groups.map((group, groupIdx) => {
              if (group.type === 'ul') {
                return (
                  <ul key={groupIdx} className="my-1 space-y-1.5 pl-0.5">
                    {group.items.map((line, lineIdx) => {
                      const itemContent = line.replace(/^\s*[-*]\s+/, '');
                      return (
                        <li key={lineIdx} className="flex items-start gap-2.5 leading-[1.58]">
                          <span
                            className="mt-[9px] h-[4px] w-[4px] rounded-full bg-[#143D2B] shrink-0"
                            aria-hidden="true"
                          />
                          <span className="flex-1">{renderInline(itemContent)}</span>
                        </li>
                      );
                    })}
                  </ul>
                );
              }
              if (group.type === 'ol') {
                return (
                  <ol key={groupIdx} className="my-1 space-y-1.5 pl-0.5">
                    {group.items.map((line, lineIdx) => {
                      const numberMatch = line.match(/^\s*(\d+)\.\s+(.*)$/);
                      const num = numberMatch && numberMatch[1] ? numberMatch[1] : lineIdx + 1;
                      const itemContent = numberMatch && numberMatch[2] ? numberMatch[2] : line;
                      return (
                        <li key={lineIdx} className="flex items-start gap-2 leading-[1.58]">
                          <span className="text-[#143D2B] font-medium text-[12.5px] tabular-nums shrink-0 min-w-[18px] pt-[1px]">
                            {num}.
                          </span>
                          <span className="flex-1">{renderInline(itemContent)}</span>
                        </li>
                      );
                    })}
                  </ol>
                );
              }
              return (
                <p key={groupIdx} className="leading-[1.6]">
                  {group.items.map((line, lineIdx) => (
                    <React.Fragment key={lineIdx}>
                      {lineIdx > 0 && <br />}
                      {renderInline(line)}
                    </React.Fragment>
                  ))}
                </p>
              );
            })}
          </div>
        );
      })}
      {isStreaming && (
        <span
          className="inline-block h-[14px] w-[2px] ml-1 bg-[#143D2B] align-middle"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
