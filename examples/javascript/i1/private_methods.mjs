class Counter {
  static #instances = 0;
  #value = 0;

  constructor() {
    Counter.#instances += 1;
  }

  #clamp(n) {
    return Math.min(Math.max(n, 0), 10);
  }

  add(n) {
    this.#value = this.#clamp(this.#value + n);
    return this.#value;
  }

  static get instances() {
    return Counter.#instances;
  }
}

const counter = new Counter();
console.log(counter.add(7), counter.add(7), counter.add(-20));
new Counter();
console.log(Counter.instances);
