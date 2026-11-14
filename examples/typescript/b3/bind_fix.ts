class Counter {
  count = 0;
  increment(this: Counter) {
    this.count++;
  }
}

const counter = new Counter();
const increment = counter.increment.bind(counter);
increment();
increment();
console.log(counter.count);
