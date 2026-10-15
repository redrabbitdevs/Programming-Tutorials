const a = [1, 2];
const b = [1, 2];
const c = a;

console.log(a === b, a === c);
console.log({} === {});

c.push(3);
console.log(a);

function sameItems(x, y) {
  return x.length === y.length && x.every((item, i) => item === y[i]);
}

console.log(sameItems([1, 2], [1, 2]), sameItems([1, 2], [2, 1]));
