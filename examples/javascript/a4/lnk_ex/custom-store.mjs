import { createStore } from "../lnk/server/store.mjs";

export function createCustomStore() {
  const store = createStore();
  const custom = new Map();
  return {
    ...store,
    addWithCode(code, url) {
      if (custom.has(code) || store.get(code)) return null;
      custom.set(code, { code, url, visits: 0 });
      return { ...custom.get(code) };
    },
    get: (code) => (custom.has(code) ? { ...custom.get(code) } : store.get(code)),
  };
}
