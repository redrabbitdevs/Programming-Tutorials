class Counter {
  count: number;

  increment(): void {
    this.count += 1;
  }
}

const counter = new Counter();
console.log(counter);
