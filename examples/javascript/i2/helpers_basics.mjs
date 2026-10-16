function* naturals() {
  let n = 1;
  while (true) {
    yield n++;
  }
}

const firstSquares = naturals()
  .filter((n) => n % 2 === 0)
  .map((n) => n * n)
  .take(4)
  .toArray();
console.log(firstSquares);

console.log([10, 20, 30].values().map((n) => n + 1).toArray());
console.log(new Set([1, 2, 3]).values().drop(1).toArray());
