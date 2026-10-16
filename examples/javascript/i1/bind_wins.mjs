function increment(by) {
  this.count += by;
  return this.count;
}

const first = { count: 0 };
const other = { count: 100 };

const incFirst = increment.bind(first);
console.log(incFirst(2), incFirst(3));
console.log(incFirst.call(other, 10));
console.log(first.count, other.count);
