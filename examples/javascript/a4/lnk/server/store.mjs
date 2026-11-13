import { encodeId } from "../shared/links.mjs";

export function createStore({ firstId = 1000 } = {}) {
  const links = new Map();
  let nextId = firstId;
  return {
    add(url) {
      const link = { code: encodeId(nextId++), url, visits: 0 };
      links.set(link.code, link);
      return { ...link };
    },
    get: (code) => (links.has(code) ? { ...links.get(code) } : null),
    visit(code) {
      const link = links.get(code);
      if (link) link.visits++;
      return link?.url ?? null;
    },
  };
}
