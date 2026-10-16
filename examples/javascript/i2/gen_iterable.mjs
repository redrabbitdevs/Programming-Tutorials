function* letters() {
  yield "a";
  yield "b";
  return "ignored";
}

const gen = letters();
console.log(gen[Symbol.iterator]() === gen);
console.log([...gen], [...gen]);
console.log([...letters()], Array.from(letters()));

class Countdown {
  constructor(from) {
    this.from = from;
  }

  *[Symbol.iterator]() {
    for (let n = this.from; n >= 1; n--) {
      yield n;
    }
  }
}

console.log([...new Countdown(3)]);
