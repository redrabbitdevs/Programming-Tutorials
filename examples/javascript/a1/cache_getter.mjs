function cacheGetter(Class, name) {
  const { get } = Object.getOwnPropertyDescriptor(Class.prototype, name);
  const cache = new WeakMap();
  Object.defineProperty(Class.prototype, name, {
    get() {
      if (!cache.has(this)) cache.set(this, get.call(this));
      return cache.get(this);
    },
    configurable: true,
  });
}

class Report {
  constructor(rows) {
    this.rows = rows;
  }
  get total() {
    console.log("summing");
    return this.rows.reduce((sum, n) => sum + n, 0);
  }
}

cacheGetter(Report, "total");
const a = new Report([1, 2, 3]);
const b = new Report([10]);
console.log(a.total, a.total, b.total);
