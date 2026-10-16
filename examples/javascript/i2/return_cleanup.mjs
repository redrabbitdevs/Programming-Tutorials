const source = {
  [Symbol.iterator]() {
    let n = 0;
    return {
      next() {
        n += 1;
        return { value: n, done: n > 5 };
      },
      return() {
        console.log("cleanup after", n);
        return { done: true };
      },
    };
  },
};

for (const n of source) {
  if (n === 2) {
    break;
  }
}

const [first] = source;
console.log("first:", first);
console.log([...source].length);
