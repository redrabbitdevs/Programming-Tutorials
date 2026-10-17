function memoize(fn, keyOf = (...args) => args[0]) {
  const cache = new Map();
  return (...args) => {
    const key = keyOf(...args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
}

let calls = 0;
const slowSquare = (n) => {
  calls += 1;
  return n * n;
};

const square = memoize(slowSquare);
console.log(square(4), square(4), square(5), "calls:", calls);

const area = memoize((w, h) => w * h);
console.log(area(2, 3), area(2, 10));

const fixed = memoize((w, h) => w * h, (w, h) => `${w}x${h}`);
console.log(fixed(2, 3), fixed(2, 10));
