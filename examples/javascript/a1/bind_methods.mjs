function bindMethods(instance, ...names) {
  for (const name of names) {
    instance[name] = instance[name].bind(instance);
  }
  return instance;
}

class Counter {
  count = 0;
  constructor() {
    bindMethods(this, "increment");
  }
  increment() {
    this.count += 1;
    return this.count;
  }
}

const counter = new Counter();
const inc = counter.increment;
inc();
inc();
console.log(counter.count);
console.log(Object.hasOwn(counter, "increment"),
  Object.hasOwn(Counter.prototype, "increment"));
