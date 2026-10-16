console.log(Symbol.iterator.description, typeof [][Symbol.iterator]);

const letters = "ab"[Symbol.iterator]();
console.log(letters.next());
console.log(letters.next());
console.log(letters.next());
