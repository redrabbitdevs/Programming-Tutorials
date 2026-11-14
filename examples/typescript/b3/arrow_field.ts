class Counter {
  count = 0;
  increment = () => {
    this.count++;
  };
}

const counter = new Counter();
const increment = counter.increment;
increment();
increment();
console.log(counter.count);
