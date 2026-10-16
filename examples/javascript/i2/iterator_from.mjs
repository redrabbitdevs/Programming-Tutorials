const evens = {
  [Symbol.iterator]() {
    let n = 0;
    return { next: () => ({ value: (n += 2), done: false }) };
  },
};

console.log(typeof evens.take);
console.log(Iterator.from(evens).take(3).toArray());

const countdown = {
  n: 3,
  next() {
    return this.n > 0
      ? { value: this.n--, done: false }
      : { value: undefined, done: true };
  },
};
console.log(Iterator.from(countdown).map((n) => n * 10).toArray());
