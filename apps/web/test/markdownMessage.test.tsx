import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MarkdownMessage } from '../src/components/shared/MarkdownMessage';

describe('MarkdownMessage Component', () => {
  it('renders bold and italic formatting correctly', () => {
    const markdown = 'Hello! I am your **24/7 Alongside Pediatric Advisor**, grounded in *clinical neuroscience*.';
    const html = renderToStaticMarkup(<MarkdownMessage content={markdown} />);

    expect(html).toContain('<strong');
    expect(html).toContain('24/7 Alongside Pediatric Advisor</strong>');
    expect(html).toContain('<em');
    expect(html).toContain('clinical neuroscience</em>');
  });

  it('renders unordered bullet lists correctly', () => {
    const markdown = `- **Sleep & Bedtime battles** (melatonin preservation)\n- **Tantrums & Big feelings** (co-regulation)\n- **Screen boundaries** (curfews)`;
    const html = renderToStaticMarkup(<MarkdownMessage content={markdown} />);

    expect(html).toContain('<ul');
    expect(html).toContain('<li');
    expect(html).toContain('Sleep &amp; Bedtime battles');
    expect(html).toContain('Tantrums &amp; Big feelings');
  });

  it('renders ordered numbered lists correctly', () => {
    const markdown = `1. First action\n2. Second action\n3. Third action`;
    const html = renderToStaticMarkup(<MarkdownMessage content={markdown} />);

    expect(html).toContain('<ol');
    expect(html).toContain('<li');
    expect(html).toContain('1.');
    expect(html).toContain('First action');
    expect(html).toContain('2.');
  });

  it('renders section headers as h4 elements', () => {
    const markdown = `### Core Parent Calm Framework:\n\nSome advice text.`;
    const html = renderToStaticMarkup(<MarkdownMessage content={markdown} />);

    expect(html).toContain('<h4');
    expect(html).toContain('Core Parent Calm Framework:</h4>');
  });

  it('renders blockquote de-escalation scripts with callout styling', () => {
    const markdown = `> "I love you too much to argue about this while we are both tired."`;
    const html = renderToStaticMarkup(<MarkdownMessage content={markdown} />);

    expect(html).toContain('Script to Say:');
    expect(html).toContain('I love you too much to argue');
  });

  it('renders mixed intro text followed directly by bullet list items', () => {
    const markdown = `You can ask me about:\n- **Sleep battles** (melatonin preservation)\n- **Tantrums** (co-regulation)`;
    const html = renderToStaticMarkup(<MarkdownMessage content={markdown} />);

    expect(html).toContain('You can ask me about:');
    expect(html).toContain('<ul');
    expect(html).toContain('<li');
    expect(html).toContain('Sleep battles</strong>');
  });

  it('renders safe https links and neutralizes javascript: and data: xss payloads', () => {
    const safeMarkdown = 'Read the [Academy Overview](https://alongside.care/academy) or [jump](#intro).';
    const safeHtml = renderToStaticMarkup(<MarkdownMessage content={safeMarkdown} />);

    expect(safeHtml).toContain('<a');
    expect(safeHtml).toContain('href="https://alongside.care/academy"');
    expect(safeHtml).toContain('Academy Overview</a>');

    const maliciousMarkdown = 'Click [here](javascript:alert(1)) or [download](data:text/html,<script>alert(1)</script>) or [relative](//evil.com).';
    const maliciousHtml = renderToStaticMarkup(<MarkdownMessage content={maliciousMarkdown} />);

    expect(maliciousHtml).not.toContain('href="javascript:');
    expect(maliciousHtml).not.toContain('href="data:');
    expect(maliciousHtml).not.toContain('href="//evil.com');
    expect(maliciousHtml).toContain('Click here or download or relative.');
  });
});
