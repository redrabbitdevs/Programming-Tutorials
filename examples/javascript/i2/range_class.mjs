class Range {
  constructor(start, end, step = 1) {
    Object.assign(this, { start, end, step });
  }

  [Symbol.iterator]() {
    let current = this.start;
    const { end, step } = this;
    return {
      next() {
        const done = current >= end;
        const value = done ? undefined : current;
        current += step;
        return { value, done };
      },
    };
  }
}

const range = new Range(0, 10, 3);
console.log([...range], [...range]);
console.log(Array.from(new Range(1, 4), (n) => n * n));
const [low, high] = new Range(5, 100);
console.log(low, high);
