function memoize(fn) {
  const cache = {};
  return (arg) => {
    if (!(arg in cache)) {
      cache[arg] = fn(arg);
    }
    return cache[arg];
  };
}

let calls = 0;
const slowSquare = (n) => {
  calls += 1;
  return n * n;
};
const fastSquare = memoize(slowSquare);

console.log(fastSquare(9), fastSquare(9), fastSquare(4));
console.log("calls:", calls);
