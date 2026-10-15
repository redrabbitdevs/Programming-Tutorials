function makeCounter({ start = 0, step = 1 } = {}) {
  let value = start;
  return {
    next() {
      value += step;
      return value;
    },
    reset() {
      value = start;
    },
  };
}

const evens = makeCounter({ step: 2 });
console.log(evens.next(), evens.next(), evens.next());
evens.reset();
console.log(evens.next());

const fromTen = makeCounter({ start: 10 });
console.log(fromTen.next(), evens.next());
