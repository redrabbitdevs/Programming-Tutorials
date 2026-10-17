export class TtlCache {
  #store = new Map();

  constructor(ttlMs) {
    this.ttlMs = ttlMs;
  }

  set(key, value) {
    this.#store.set(key, { value, expires: Date.now() + this.ttlMs });
  }

  get(key) {
    const entry = this.#store.get(key);
    if (!entry) return undefined;
    if (Date.now() >= entry.expires) {
      this.#store.delete(key);
      return undefined;
    }
    return entry.value;
  }
}
