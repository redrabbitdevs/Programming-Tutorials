function take(iterable, count) {
  const result = [];
  if (count <= 0) {
    return result;
  }
  for (const item of iterable) {
    result.push(item);
    if (result.length === count) {
      break;
    }
  }
  return result;
}

const evens = {
  [Symbol.iterator]() {
    let n = 0;
    return { next: () => ({ value: (n += 2), done: false }) };
  },
};

console.log(take(evens, 4));
console.log(take("hello", 3));
console.log(take(new Set([1, 2]), 5));
console.log(take([1, 2, 3], 0));
