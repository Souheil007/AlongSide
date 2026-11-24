import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ShieldPlatform, type DeviceShieldDTO } from '@alongside/shared';
import { LiveDnsShieldCard } from '@/components/devices/LiveDnsShieldCard';

function renderWithProviders(element: React.ReactElement): string {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return renderToStaticMarkup(
    React.createElement(QueryClientProvider, { client: queryClient }, element)
  );
}

describe('LiveDnsShieldCard (PLAN-53 Live Network Shield UI)', () => {
  it('renders core switches, app chips, and Apple installation instructions for iPhone', () => {
    const html = renderWithProviders(
      React.createElement(LiveDnsShieldCard, {
        childId: 'child-leo-10',
        childName: 'Leo',
        childAge: 10,
        initialPlatform: ShieldPlatform.APPLE_IOS,
      })
    );

    // Header & badge
    expect(html).toContain('Step 2 · Live Network Shield');
    expect(html).toContain('Enforced Network Protection');
    expect(html).toContain('iPhone / iPad');
    expect(html).toContain('Android');

    // Core Switches
    expect(html).toContain('Adult &amp; Explicit Content Filter');
    expect(html).toContain('Strict SafeSearch &amp; YouTube Restricted Mode');
    expect(html).toContain('Block VPN &amp; Proxy Bypasses');
    expect(html).toContain('Bedtime Internet Pause');

    // Quick App Blocks
    expect(html).toContain('Specific Apps &amp; Games Filtering');
    expect(html).toContain('TikTok');
    expect(html).toContain('Snapchat');
    expect(html).toContain('Instagram');
    expect(html).toContain('Roblox');
    expect(html).toContain('YouTube');

    // Apple install panel
    expect(html).toContain("Install Profile on Leo&#x27;s iPhone or iPad");
    expect(html).toContain('Download Protection Profile');
    expect(html).toContain('Scan with iPhone Camera');

    // Home Wi-Fi & Consoles Action
    expect(html).toContain(
      'Also protect Nintendo Switch, PS5, Xbox &amp; Smart TVs on Home Wi-Fi'
    );

    // Privacy Guarantee (Zero history logs)
    expect(html).toContain('Alongside never tracks, logs, or stores browsing history');

    // Zero em-dashes and zero violet styling
    expect(html).not.toContain('—');
    expect(html).not.toContain('violet');
    expect(html).not.toContain('purple');
  });

  it('renders Android Private DNS hostname and settings guide when Android is active', () => {
    const html = renderWithProviders(
      React.createElement(LiveDnsShieldCard, {
        childId: 'child-leo-10',
        childName: 'Leo',
        childAge: 10,
        initialPlatform: ShieldPlatform.ANDROID,
      })
    );

    expect(html).toContain("Configure Private DNS on Leo&#x27;s Android");
    expect(html).toContain('Dedicated Private DNS Hostname:');
    expect(html).toContain('Copy Hostname');
    expect(html).toContain('Settings → Network &amp; internet → Private DNS');
    expect(html).toContain('Private DNS provider hostname');
  });
});
