/**
 * Oldest language release that still gets security fixes, per language.
 * A "Python 3.10+" badge tells a reader nothing when every supported release
 * already satisfies it, so lessons at or below this value show no badge.
 *
 * Python: 3.10 reached end of life on 1 October 2026 (PEP 619), which makes
 * 3.11 the oldest supported CPython. Bump this when 3.11 ends (October 2027,
 * PEP 664).
 * Source: https://peps.python.org/pep-0619/
 */
export const OLDEST_SUPPORTED: Record<string, string> = {
  python: '3.11',
  // Node.js 22 is the oldest supported line (Maintenance LTS until 2027-04-30), so
  // JavaScript lessons with minVersion 22 show no badge.
  // Source: research/javascript/sources/node-releases.md
  javascript: '22',
};

const parts = (v: string) => v.split('.').map((n) => parseInt(n, 10) || 0);

function cmp(a: string, b: string): number {
  const x = parts(a);
  const y = parts(b);
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (x[i] ?? 0) - (y[i] ?? 0);
    if (d) return d;
  }
  return 0;
}

/** True when the lesson needs a version newer than the oldest supported one. */
export function showVersionBadge(language: string, minVersion?: string): minVersion is string {
  if (!minVersion) return false;
  const oldest = OLDEST_SUPPORTED[language];
  return !oldest || cmp(minVersion, oldest) > 0;
}
