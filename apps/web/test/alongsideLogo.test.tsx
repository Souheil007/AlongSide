import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AlongsideLogo } from '../src/components/shared/AlongsideLogo';

describe('AlongsideLogo Component', () => {
  it('renders the emblem image and editorial wordmark by default', () => {
    const html = renderToStaticMarkup(<AlongsideLogo />);

    expect(html).toContain('alongside-logo-full-256.png');
    expect(html).toContain('alt="AlongSide Fluid AS Monogram"');
    expect(html).toContain('AlongSide');
  });

  it('hides the wordmark when showWordmark is false', () => {
    const html = renderToStaticMarkup(<AlongsideLogo showWordmark={false} />);

    expect(html).toContain('alongside-logo-full-256.png');
    expect(html).not.toContain('>AlongSide<');
  });

  it('renders optional subtitle when provided', () => {
    const html = renderToStaticMarkup(<AlongsideLogo subtitle="Family Sanctuary" />);

    expect(html).toContain('AlongSide');
    expect(html).toContain('Family Sanctuary');
  });

  it('applies different size presets without errors', () => {
    const xsHtml = renderToStaticMarkup(<AlongsideLogo size="xs" />);
    expect(xsHtml).toContain('h-7 w-7');

    const lgHtml = renderToStaticMarkup(<AlongsideLogo size="lg" />);
    expect(lgHtml).toContain('h-14 w-14');
  });
});
