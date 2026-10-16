const naturals = {
  [Symbol.iterator]() {
    let n = 1;
    return { next: () => ({ value: n++, done: false }) };
  },
};

for (const n of naturals) {
  if (n > 3) {
    break;
  }
  console.log(n);
}

const [a, b, c] = naturals;
console.log(a, b, c);
