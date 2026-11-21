import { isIP } from 'node:net';

export const DEFAULT_FEED_TIMEOUT_MS = 8_000;
export const DEFAULT_MAX_RESPONSE_BYTES = 2 * 1024 * 1024;
export const DEFAULT_MAX_REDIRECTS = 3;

export class SafeFetchHttpError extends Error {
  readonly status: number;
  readonly statusText: string;

  constructor(status: number, statusText: string) {
    super(`HTTP ${status} ${statusText}`.trim());
    this.name = 'SafeFetchHttpError';
    this.status = status;
    this.statusText = statusText;
  }
}

export interface FetchSafeTextOptions {
  timeoutMs?: number;
  maxBytes?: number;
  maxRedirects?: number;
  fetchImpl?: typeof fetch;
  headers?: Record<string, string>;
}

export function asArray<T>(value: T | T[] | undefined | null): T[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function isPrivateOrReservedIpv4Octets(
  a: number,
  b: number,
  c: number,
  d: number
): boolean {
  if ([a, b, c, d].some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
    return true;
  }
  if (a === 0) return true; // 0.0.0.0/8
  if (a === 10) return true; // 10.0.0.0/8 (RFC 1918)
  if (a === 100 && b >= 64 && b <= 127) return true; // 100.64.0.0/10 (CGNAT)
  if (a === 127) return true; // 127.0.0.0/8 (loopback)
  if (a === 169 && b === 254) return true; // 169.254.0.0/16 (link-local / cloud metadata)
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12 (RFC 1918)
  if (a === 192 && b === 0 && c === 0) return true; // 192.0.0.0/24
  if (a === 192 && b === 0 && c === 2) return true; // TEST-NET-1
  if (a === 192 && b === 168) return true; // 192.168.0.0/16 (RFC 1918)
  if (a === 198 && (b === 18 || b === 19)) return true; // Benchmarking
  if (a === 198 && b === 51 && c === 100) return true; // TEST-NET-2
  if (a === 203 && b === 0 && c === 113) return true; // TEST-NET-3
  if (a >= 224) return true; // Multicast & reserved
  return false;
}

function expandIpv6Groups(rawHost: string): number[] | null {
  if (rawHost.includes('%')) {
    return null;
  }

  let normalized = rawHost.toLowerCase();

  // Convert trailing embedded IPv4 dotted quad (e.g. ::ffff:127.0.0.1) to two 16-bit hex groups
  const lastColon = normalized.lastIndexOf(':');
  if (lastColon >= 0 && normalized.slice(lastColon + 1).includes('.')) {
    const ipv4Part = normalized.slice(lastColon + 1);
    const octets = ipv4Part.split('.').map((p) => Number(p));
    if (
      octets.length !== 4 ||
      octets.some((n) => !Number.isInteger(n) || n < 0 || n > 255)
    ) {
      return null;
    }
    const hi = ((octets[0]! << 8) | octets[1]!).toString(16);
    const lo = ((octets[2]! << 8) | octets[3]!).toString(16);
    normalized = `${normalized.slice(0, lastColon + 1)}${hi}:${lo}`;
  }

  const halves = normalized.split('::');
  if (halves.length > 2) {
    return null;
  }

  const parsePart = (part: string): number[] | null => {
    if (!part) return [];
    const segments = part.split(':');
    const out: number[] = [];
    for (const seg of segments) {
      if (!/^[0-9a-f]{1,4}$/.test(seg)) {
        return null;
      }
      out.push(parseInt(seg, 16));
    }
    return out;
  };

  if (halves.length === 1) {
    const groups = parsePart(halves[0]!);
    return groups && groups.length === 8 ? groups : null;
  }

  const left = parsePart(halves[0]!);
  const right = parsePart(halves[1]!);
  if (!left || !right || left.length + right.length >= 8) {
    return null;
  }

  const missing = 8 - (left.length + right.length);
  return [...left, ...new Array<number>(missing).fill(0), ...right];
}

function isPrivateOrReservedIpv6(rawHost: string): boolean {
  const groups = expandIpv6Groups(rawHost);
  if (!groups) {
    return true; // Fail closed on malformed/scoped IPv6
  }

  const [g0, g1, g2, g3, g4, g5, g6, g7] = groups as [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ];

  // Unspecified (::), loopback (::1), and deprecated IPv4-compatible prefix (::/96)
  if (g0 === 0 && g1 === 0 && g2 === 0 && g3 === 0 && g4 === 0 && g5 === 0) {
    return true;
  }

  // IPv4-translated prefix (::ffff:0:0:0/96, RFC 2765)
  if (
    g0 === 0 &&
    g1 === 0 &&
    g2 === 0 &&
    g3 === 0 &&
    g4 === 0xffff &&
    g5 === 0
  ) {
    return true;
  }

  // IPv4-mapped IPv6 prefix (::ffff:0:0/96)
  if (
    g0 === 0 &&
    g1 === 0 &&
    g2 === 0 &&
    g3 === 0 &&
    g4 === 0 &&
    g5 === 0xffff
  ) {
    return isPrivateOrReservedIpv4Octets(
      (g6 >> 8) & 0xff,
      g6 & 0xff,
      (g7 >> 8) & 0xff,
      g7 & 0xff
    );
  }

  // NAT64 IPv4-embedding prefixes (64:ff9b::/96 & 64:ff9b:1::/48)
  if (
    g0 === 0x0064 &&
    g1 === 0xff9b &&
    ((g2 === 0 && g3 === 0 && g4 === 0 && g5 === 0) || g2 === 0x0001)
  ) {
    return true;
  }

  // Unique-local (fc00::/7), link-local (fe80::/10), site-local (fec0::/10), multicast (ff00::/8)
  if (
    (g0 & 0xfe00) === 0xfc00 ||
    (g0 & 0xffc0) === 0xfe80 ||
    (g0 & 0xffc0) === 0xfec0 ||
    (g0 & 0xff00) === 0xff00
  ) {
    return true;
  }

  // Discard-only (100::/64) and documentation (2001:db8::/32)
  if (
    (g0 === 0x0100 && g1 === 0 && g2 === 0 && g3 === 0) ||
    (g0 === 0x2001 && g1 === 0x0db8)
  ) {
    return true;
  }

  // 6to4 (2002::/16) embedding private/reserved IPv4
  if (
    g0 === 0x2002 &&
    isPrivateOrReservedIpv4Octets(
      (g1 >> 8) & 0xff,
      g1 & 0xff,
      (g2 >> 8) & 0xff,
      g2 & 0xff
    )
  ) {
    return true;
  }

  return false;
}

/**
 * Enforces HTTPS-only SSRF validation, rejecting non-HTTPS schemes, embedded
 * credentials, localhost, link-local, loopback, IPv4-embedding IPv6 prefixes,
 * and private RFC 1918 hosts.
 */
export function assertSafeExternalUrl(rawUrl: string): URL {
  if (!rawUrl || typeof rawUrl !== 'string') {
    throw new Error('URL must be a non-empty string.');
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl.trim());
  } catch {
    throw new Error(`Malformed URL rejected: ${rawUrl}`);
  }

  if (parsed.protocol !== 'https:') {
    throw new Error(
      `Unsafe URL protocol rejected (HTTPS required): ${parsed.protocol}`
    );
  }

  if (parsed.username || parsed.password) {
    throw new Error('URLs with embedded credentials are rejected.');
  }

  const normalizedHost = parsed.hostname
    .toLowerCase()
    .replace(/^\[|\]$/g, '')
    .replace(/\.$/, '');

  if (!normalizedHost) {
    throw new Error('URL hostname must not be empty.');
  }

  if (
    normalizedHost === 'localhost' ||
    normalizedHost.endsWith('.localhost') ||
    normalizedHost.endsWith('.local') ||
    normalizedHost.endsWith('.internal') ||
    normalizedHost.endsWith('.home.arpa')
  ) {
    throw new Error(`Local/internal host rejected: ${normalizedHost}`);
  }

  const ipVersion = isIP(normalizedHost);
  if (ipVersion === 4) {
    const parts = normalizedHost.split('.').map((p) => Number(p));
    if (
      parts.length !== 4 ||
      isPrivateOrReservedIpv4Octets(parts[0]!, parts[1]!, parts[2]!, parts[3]!)
    ) {
      throw new Error(`Private or reserved IPv4 host rejected: ${normalizedHost}`);
    }
    return parsed;
  }

  if (ipVersion === 6) {
    if (isPrivateOrReservedIpv6(normalizedHost)) {
      throw new Error(`Private or reserved IPv6 host rejected: ${normalizedHost}`);
    }
    return parsed;
  }

  // Reject single-label hostnames or numeric/hex obfuscated IPs without public TLD
  if (
    !normalizedHost.includes('.') ||
    /^(?:0x[0-9a-f]+|\d+)$/i.test(normalizedHost)
  ) {
    throw new Error(`Non-public hostname rejected: ${normalizedHost}`);
  }

  return parsed;
}

async function readResponseTextBounded(
  response: Response,
  maxBytes: number
): Promise<string> {
  const contentLengthHeader = response.headers.get('content-length');
  if (contentLengthHeader) {
    const declaredBytes = Number(contentLengthHeader);
    if (Number.isFinite(declaredBytes) && declaredBytes > maxBytes) {
      await response.body?.cancel().catch(() => {});
      throw new Error(
        `Response body exceeds maximum allowed size of ${maxBytes} bytes.`
      );
    }
  }

  if (!response.body) {
    const text = await response.text();
    if (Buffer.byteLength(text, 'utf8') > maxBytes) {
      throw new Error(
        `Response body exceeds maximum allowed size of ${maxBytes} bytes.`
      );
    }
    return text;
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        totalBytes += value.byteLength;
        if (totalBytes > maxBytes) {
          await reader.cancel().catch(() => {});
          throw new Error(
            `Response body exceeds maximum allowed size of ${maxBytes} bytes.`
          );
        }
        chunks.push(value);
      }
    }
  } finally {
    reader.releaseLock();
  }

  const combined = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder('utf-8').decode(combined);
}

/**
 * Performs an SSRF-hardened HTTPS GET with manual redirect handling (validating
 * every redirect hop against `assertSafeExternalUrl`), request timeout, and a
 * strict streamed response size cap (default 2 MiB).
 */
export async function fetchSafeText(
  rawUrl: string,
  opts: FetchSafeTextOptions = {}
): Promise<string> {
  const timeoutMs = opts.timeoutMs ?? DEFAULT_FEED_TIMEOUT_MS;
  const maxBytes = opts.maxBytes ?? DEFAULT_MAX_RESPONSE_BYTES;
  const maxRedirects = opts.maxRedirects ?? DEFAULT_MAX_REDIRECTS;
  const fetchImpl = opts.fetchImpl ?? globalThis.fetch;

  let currentUrl = assertSafeExternalUrl(rawUrl).toString();
  const signal = AbortSignal.timeout(timeoutMs);

  for (let hop = 0; hop <= maxRedirects; hop += 1) {
    const response = await fetchImpl(currentUrl, {
      method: 'GET',
      headers: opts.headers,
      redirect: 'manual',
      signal,
    });

    if (response.status >= 300 && response.status < 400) {
      await response.body?.cancel().catch(() => {});
      const location = response.headers.get('location');
      if (!location) {
        throw new Error(
          `HTTP ${response.status} redirect missing Location header.`
        );
      }
      if (hop >= maxRedirects) {
        throw new Error(`Too many redirects (max ${maxRedirects}).`);
      }
      const nextUrl = new URL(location, currentUrl).toString();
      currentUrl = assertSafeExternalUrl(nextUrl).toString();
      continue;
    }

    if (!response.ok) {
      await response.body?.cancel().catch(() => {});
      throw new SafeFetchHttpError(response.status, response.statusText);
    }

    return readResponseTextBounded(response, maxBytes);
  }

  throw new Error(`Too many redirects (max ${maxRedirects}).`);
}
