class LruCache {
  #limit;
  #entries = new Map();

  constructor(limit) {
    this.#limit = limit;
  }

  get(key) {
    if (!this.#entries.has(key)) {
      return undefined;
    }
    const value = this.#entries.get(key);
    this.#entries.delete(key);
    this.#entries.set(key, value);
    return value;
  }

  set(key, value) {
    this.#entries.delete(key);
    this.#entries.set(key, value);
    if (this.#entries.size > this.#limit) {
      const oldest = this.#entries.keys().next().value;
      this.#entries.delete(oldest);
    }
  }

  get keys() {
    return [...this.#entries.keys()];
  }
}

const cache = new LruCache(2);
cache.set("a", 1);
cache.set("b", 2);
cache.get("a");
cache.set("c", 3);
console.log(cache.keys, cache.get("b"), cache.get("a"));
