console.log([1, 2, 3].reduce((a, b) => a + b));
console.log([5].reduce((a, b) => a + b));
console.log([].reduce((a, b) => a + b, 0));

try {
  [].reduce((a, b) => a + b);
} catch (error) {
  console.log(error.name);
}

const words = ["apple", "bob", "cat"];
console.log(words.reduce((n, w) => n + w.length));
console.log(words.reduce((n, w) => n + w.length, 0));
