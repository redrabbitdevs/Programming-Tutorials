class Counter {
  count = 0;
  static created = 0;

  constructor() {
    Counter.created += 1;
  }

  increment() {
    this.count += 1;
    return this;
  }

  static starting(n) {
    const counter = new Counter();
    counter.count = n;
    return counter;
  }
}

const a = new Counter().increment().increment();
const b = Counter.starting(10);
console.log(a.count, b.count, Counter.created);
console.log(Object.hasOwn(a, "created"), a.starting);
