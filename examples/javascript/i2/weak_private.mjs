const counts = new WeakMap();

function createCounter() {
  const counter = {};
  counts.set(counter, 0);
  return counter;
}

function increment(counter) {
  counts.set(counter, counts.get(counter) + 1);
  return counts.get(counter);
}

const a = createCounter();
const b = createCounter();
increment(a);
increment(a);
console.log(increment(a), increment(b));
console.log(Object.keys(a), JSON.stringify(a));
