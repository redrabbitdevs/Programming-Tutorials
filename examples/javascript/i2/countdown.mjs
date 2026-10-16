class Countdown {
  constructor(from) {
    this.from = from;
  }

  [Symbol.iterator]() {
    let current = this.from;
    return {
      next() {
        if (current < 1) {
          return { value: undefined, done: true };
        }
        return { value: current--, done: false };
      },
    };
  }
}

const launch = new Countdown(3);
console.log([...launch]);
console.log(Array.from(launch, (n) => `T-${n}`));

for (const n of launch) {
  console.log(n);
}
