function* runningTotal() {
  let total = 0;
  while (true) {
    const amount = yield total;
    total += amount;
  }
}

const gen = runningTotal();
console.log(gen.next());
console.log(gen.next(5));
console.log(gen.next(10));
console.log(gen.next(-3).value);
