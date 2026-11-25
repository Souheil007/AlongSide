import { describe, expect, it, beforeEach, afterAll, vi } from 'vitest';
import {
  __setPostHogClientForTests,
  buildPostHogInitOptions,
  capturePageView,
  initPostHog,
  isPostHogReady,
  resetAnalytics,
  syncAnalyticsUser,
  trackEvent,
  type PostHogClientLike,
} from '../src/lib/analytics/posthog';

describe('PostHog Analytics & Session Replay Wrapper', () => {
  const hadWindow = typeof window !== 'undefined';
  const originalWindow = (global as unknown as { window?: unknown }).window;

  let mockClient: PostHogClientLike;

  beforeEach(() => {
    if (typeof window === 'undefined') {
      (global as unknown as { window: unknown }).window = {
        location: { origin: 'http://localhost:3000', href: 'http://localhost:3000/' },
      };
    }

    mockClient = {
      init: vi.fn(),
      capture: vi.fn(),
      identify: vi.fn(),
      register: vi.fn(),
      reset: vi.fn(),
    };
    __setPostHogClientForTests(mockClient, true);
  });

  afterAll(() => {
    __setPostHogClientForTests(null, true);
    if (!hadWindow) {
      delete (global as unknown as { window?: unknown }).window;
    } else {
      (global as unknown as { window?: unknown }).window = originalWindow;
    }
  });

  it('no-ops safely when NEXT_PUBLIC_POSTHOG_KEY is unset', () => {
    const initialized = initPostHog({ apiKey: '' });
    expect(initialized).toBe(false);
    expect(isPostHogReady()).toBe(false);
    expect(mockClient.init).not.toHaveBeenCalled();

    trackEvent('demo_started', { source: 'hero' });
    capturePageView('http://localhost:3000/');
    syncAnalyticsUser({ id: 'user-1' });
    resetAnalytics();

    expect(mockClient.capture).not.toHaveBeenCalled();
    expect(mockClient.identify).not.toHaveBeenCalled();
    expect(mockClient.reset).not.toHaveBeenCalled();
  });

  it('initializes once with privacy-first replay input masking and manual pageview config', () => {
    const options = buildPostHogInitOptions('https://eu.i.posthog.com');
    expect(options).toMatchObject({
      api_host: 'https://eu.i.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: false,
      capture_pageleave: true,
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: '[data-ph-mask]',
      },
    });

    expect(initPostHog({ apiKey: 'phc_test_key', apiHost: 'https://eu.i.posthog.com' })).toBe(true);
    expect(initPostHog({ apiKey: 'phc_test_key' })).toBe(true);
    expect(mockClient.init).toHaveBeenCalledTimes(1);
    expect(mockClient.init).toHaveBeenCalledWith('phc_test_key', options);
  });

  it('captures typed funnel events and pageviews once initialized', () => {
    initPostHog({ apiKey: 'phc_test_key' });

    capturePageView('http://localhost:3000/devices');
    trackEvent('dns_profile_downloaded', { platform: 'apple_ios' });

    expect(mockClient.capture).toHaveBeenNthCalledWith(1, '$pageview', {
      $current_url: 'http://localhost:3000/devices',
    });
    expect(mockClient.capture).toHaveBeenNthCalledWith(2, 'dns_profile_downloaded', {
      platform: 'apple_ios',
    });
  });

  it('identifies real parents without PII and never merges demo visitors', () => {
    initPostHog({ apiKey: 'phc_test_key' });

    syncAnalyticsUser({
      id: 'demo-user-123',
      role: 'PARENT',
      childrenCount: 2,
      subscriptionTier: 'TRIAL',
      isDemo: true,
    });
    expect(mockClient.register).toHaveBeenCalledWith({ is_demo: true });
    expect(mockClient.identify).not.toHaveBeenCalled();

    syncAnalyticsUser({
      id: 'real-parent-uuid',
      role: 'PARENT',
      childrenCount: 1,
      subscriptionTier: 'ANNUAL_HERO',
      isDemo: false,
    });
    expect(mockClient.register).toHaveBeenCalledWith({ is_demo: false });
    expect(mockClient.identify).toHaveBeenCalledWith('real-parent-uuid', {
      role: 'PARENT',
      children_count: 1,
      subscription_tier: 'ANNUAL_HERO',
    });

    resetAnalytics();
    expect(mockClient.reset).toHaveBeenCalledTimes(1);
  });
});
