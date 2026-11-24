/**
 * Pure text sanitization helpers ensuring zero LLM em-dashes appear in
 * user-facing academy lessons, culture digest blogs, videos, prompts, or AI output.
 */

const EM_DASH_TEST_REGEX = /[\u2014\u2015]/;

/**
 * Replaces every em-dash (U+2014) and horizontal bar (U+2015) with natural
 * human punctuation (a comma or space depending on surrounding syntax),
 * preserving line breaks and avoiding double punctuation or double spaces.
 */
export function stripEmDashes(text: string): string {
  if (!text || !EM_DASH_TEST_REGEX.test(text)) {
    return text;
  }

  return text
    // Leading em-dash on a line or string
    .replace(/(^|\n)[ \t]*[\u2014\u2015]+[ \t]*/g, '$1')
    // Trailing em-dash at end of a line or string
    .replace(/[ \t]*[\u2014\u2015]+[ \t]*(?=\n|$)/g, '')
    // Em-dash immediately after punctuation -> single space
    .replace(/([,.;:?!(\[“"'])[ \t]*[\u2014\u2015]+[ \t]*/g, '$1 ')
    // Em-dash immediately before closing punctuation -> drop dash
    .replace(/[ \t]*[\u2014\u2015]+[ \t]*([.,;:?!)\]”"'])/g, '$1')
    // Standard mid-sentence em-dash -> comma + space
    .replace(/[ \t]*[\u2014\u2015]+[ \t]*/g, ', ')
    // Clean any accidental double commas or spaces introduced around quotes/newlines
    .replace(/,\s*,+/g, ',')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/[ \t]+([.,;:?!])/g, '$1');
}

/**
 * Recursively strips em-dashes from all string values inside an object, array,
 * or JSON payload without mutating the original input.
 */
export function sanitizeEmDashesDeep<T>(value: T): T {
  if (typeof value === 'string') {
    return stripEmDashes(value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeEmDashesDeep(item)) as T;
  }
  if (value !== null && typeof value === 'object') {
    if (value instanceof Date) {
      return value;
    }
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = sanitizeEmDashesDeep(v);
    }
    return out as T;
  }
  return value;
}
