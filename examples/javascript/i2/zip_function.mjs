function zip(first, second) {
  const a = first[Symbol.iterator]();
  const b = second[Symbol.iterator]();
  const pairs = [];

  while (true) {
    const left = a.next();
    const right = b.next();
    if (left.done || right.done) {
      return pairs;
    }
    pairs.push([left.value, right.value]);
  }
}

console.log(zip([1, 2, 3], "ab"));
console.log(zip(new Set(["x"]), new Set(["y", "z"])));
console.log(zip([], [1]));
