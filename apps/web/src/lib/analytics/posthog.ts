import posthog from 'posthog-js';

export interface PostHogClientLike {
  init: (token: string, options?: Record<string, unknown>) => void;
  capture: (eventName: string, properties?: Record<string, unknown>) => void;
  identify: (distinctId: string, properties?: Record<string, unknown>) => void;
  register: (properties: Record<string, unknown>) => void;
  reset: () => void;
}

export interface AnalyticsEventMap {
  hero_age_preview_selected: { age_band: string };
  hero_script_copied: { age_band: string };
  demo_started: { source: 'hero' | 'header' | 'auth_card' | 'pricing' };
  demo_exited: { destination: 'register' | 'home' };
  auth_google_clicked: { source: 'auth_card' };
  auth_signed_up: { method: 'email' };
  auth_logged_in: { method: 'email' };
  auth_logged_out: { was_demo: boolean };
  child_profile_created: { road_type: string; developmental_tier: string };
  readiness_assessment_completed: { score: number; is_ready: boolean };
  advisor_question_sent: {
    has_child_context: boolean;
    message_length_bucket: 'short' | 'medium' | 'long';
  };
  dns_shield_updated: {
    platform: string;
    bedtime_enabled: boolean;
    blocked_service_count: number;
  };
  dns_profile_downloaded: { platform: 'apple_ios' };
  dns_hostname_copied: { platform: 'android' };
  academy_lesson_completed: { module_slug?: string; lesson_slug: string };
}

export type AnalyticsEventName = keyof AnalyticsEventMap;

export interface AnalyticsUserContext {
  id: string;
  role?: string;
  childrenCount?: number;
  subscriptionTier?: string | null;
  isDemo?: boolean;
}

const DEFAULT_POSTHOG_HOST = 'https://us.i.posthog.com';

let isInitialized = false;
let testClientOverride: PostHogClientLike | null = null;

function getClient(): PostHogClientLike {
  return testClientOverride ?? (posthog as unknown as PostHogClientLike);
}

export function buildPostHogInitOptions(host?: string): Record<string, unknown> {
  return {
    api_host: host?.trim() || DEFAULT_POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: false,
    capture_pageleave: true,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '[data-ph-mask]',
    },
  };
}

/**
 * Initialize PostHog once in browser environments when NEXT_PUBLIC_POSTHOG_KEY is configured.
 * Safely no-ops in SSR, test, or unconfigured local dev environments.
 */
export function initPostHog(options?: {
  apiKey?: string;
  apiHost?: string;
}): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  if (isInitialized) {
    return true;
  }

  const key = (options?.apiKey ?? process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '').trim();
  if (!key) {
    return false;
  }

  const host = (options?.apiHost ?? process.env.NEXT_PUBLIC_POSTHOG_HOST ?? '').trim();
  getClient().init(key, buildPostHogInitOptions(host));
  isInitialized = true;
  return true;
}

export function isPostHogReady(): boolean {
  return isInitialized;
}

export function trackEvent<K extends AnalyticsEventName>(
  event: K,
  properties?: AnalyticsEventMap[K]
): void {
  if (!isInitialized) {
    return;
  }
  getClient().capture(event, properties as Record<string, unknown> | undefined);
}

export function capturePageView(url: string): void {
  if (!isInitialized || !url) {
    return;
  }
  getClient().capture('$pageview', { $current_url: url });
}

/**
 * Sync authenticated parent identity without PII or cross-visitor demo profile merging.
 */
export function syncAnalyticsUser(user: AnalyticsUserContext | null): void {
  if (!isInitialized || !user) {
    return;
  }

  const client = getClient();
  if (user.isDemo) {
    client.register({ is_demo: true });
    return;
  }

  client.register({ is_demo: false });
  client.identify(user.id, {
    role: user.role ?? 'PARENT',
    children_count: user.childrenCount ?? 0,
    subscription_tier: user.subscriptionTier ?? 'FREE',
  });
}

export function resetAnalytics(): void {
  if (!isInitialized) {
    return;
  }
  getClient().reset();
}

export function __setPostHogClientForTests(
  client: PostHogClientLike | null,
  resetInit = true
): void {
  testClientOverride = client;
  if (resetInit) {
    isInitialized = false;
  }
}
