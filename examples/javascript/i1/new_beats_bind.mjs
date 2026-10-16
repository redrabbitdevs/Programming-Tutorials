function Counter(start) {
  this.value = start;
}

const BoundCounter = Counter.bind({ ignored: true }, 10);
const made = new BoundCounter();
console.log(made.value, "ignored" in made);

const spy = { ignored: true };
const plain = Counter.bind(spy, 10);
plain.call({});
console.log(spy);
