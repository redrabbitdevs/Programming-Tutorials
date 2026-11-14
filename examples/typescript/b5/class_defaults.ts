class Counter {
  count = 0;
  label?: string;

  increment(): void {
    this.count += 1;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.count, counter.label);
