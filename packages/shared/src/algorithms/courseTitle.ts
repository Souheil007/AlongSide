/**
 * Normalizes an Academy course title to be concise and free of age or tier parentheticals.
 * E.g., "Tween Adrenarche & Emotional Volatility (Ages 10-12)" -> "Tween Adrenarche & Emotional Volatility"
 */
export function formatCourseTitle(title: string): string {
  if (!title) return '';
  return title
    .replace(/\s*\((?:Ages?|Tier)[^)]*\)/gi, '')
    .trim();
}
