function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const first = [];
for (const value of fibonacci()) {
  if (first.length === 10) {
    break;
  }
  first.push(value);
}
console.log(first.join(" "));

const sequence = fibonacci();
sequence.next();
sequence.next();
console.log(sequence.next().value, sequence.next().value);
