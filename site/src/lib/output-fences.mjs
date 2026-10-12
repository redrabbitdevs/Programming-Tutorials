// Vite plugin that marks program output in lesson sources, so ec.config.mjs can
// give it the "Output" treatment. It rewrites the info string of a fence:
//   - an untitled `text` fence that directly follows another fence (only blank
//     lines between) gets the bare word `output` added;
//   - a `text title="output"` fence (older fundamentals lessons) swaps its
//     title for the same word, because the label replaces the tab.
// Titled text fences (data files), frame="..." fences and text after prose are
// left alone. This works on the source text because Astro's Markdown pipeline
// (Sätteri) has no remark hook, and the check needs only fence boundaries.
const FENCE = /^(\s*)(`{3,}|~{3,})(.*)$/;
const TITLE = /(?:^|\s)title=(?:"([^"]*)"|'([^']*)')/;
const PLAIN = new Set(['', 'text', 'txt', 'plaintext']);

export function markOutputFences(source) {
  const lines = source.split('\n');
  let open = null; // { ch, len }
  let afterFence = false; // only blank lines since the last closing fence
  for (let i = 0; i < lines.length; i++) {
    const m = FENCE.exec(lines[i]);
    if (open) {
      if (m && m[2][0] === open.ch && m[2].length >= open.len && m[3].trim() === '') {
        open = null;
        afterFence = true;
      }
      continue;
    }
    if (m) {
      open = { ch: m[2][0], len: m[2].length };
      const info = m[3].trim();
      const lang = info.split(/\s+/)[0] ?? '';
      const rest = info.slice(lang.length);
      const t = TITLE.exec(rest);
      const title = t ? (t[1] ?? t[2]) : null;
      if (PLAIN.has(lang) && !/(?:^|\s)frame=/.test(rest)) {
        let next = null;
        if (title === null && afterFence) next = `${lang || 'text'}${rest} output`;
        else if (title !== null && /^output$/i.test(title)) next = `${lang}${rest.replace(TITLE, '')} output`;
        if (next) lines[i] = `${m[1]}${m[2]}${next.replace(/\s+/g, ' ').trim()}`;
      }
      afterFence = false;
    } else if (lines[i].trim() !== '') {
      afterFence = false;
    }
  }
  return lines.join('\n');
}

export default function outputFences() {
  return {
    name: 'output-fences',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.mdx?($|\?)/.test(id)) return null;
      const out = markOutputFences(code);
      return out === code ? null : { code: out, map: null };
    },
  };
}
