const letters = ["a", "b", "c", "d", "e"];

const removed = letters.splice(1, 2);
console.log(removed, letters);

letters.splice(1, 0, "X", "Y");
console.log(letters);

letters.splice(0, 1, "Z");
console.log(letters);

letters.splice(-1);
console.log(letters);

const copy = letters.slice(1, 3);
console.log(copy, letters);
console.log(letters.slice(-2));
