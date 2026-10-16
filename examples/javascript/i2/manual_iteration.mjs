const letters = new Set(["x", "y"]);
const iterator = letters[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

console.log(typeof iterator.next, iterator[Symbol.iterator]() === iterator);
