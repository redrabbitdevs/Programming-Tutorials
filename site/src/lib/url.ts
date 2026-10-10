/**
 * Every internal link goes through here so the GitHub Pages base path
 * (/Programming-Tutorials) is never forgotten.
 *   url('/languages/')  ->  '/Programming-Tutorials/languages/'
 */
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function url(path = '/'): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith('#')) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
