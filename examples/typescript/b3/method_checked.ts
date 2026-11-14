class Counter {
  count = 0;
  increment(this: Counter) {
    this.count++;
  }
}

const counter = new Counter();
counter.increment();
const lost = counter.increment;

try {
  lost();
} catch (error) {
  console.log(String(error));
}
