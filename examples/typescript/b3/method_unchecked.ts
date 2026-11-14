class Counter {
  count = 0;
  increment() {
    this.count++;
  }
}

const counter = new Counter();
const lost = counter.increment;

try {
  lost();
} catch (error) {
  console.log(String(error));
}
