const nested = [1, [2, 3], [4, [5, [6]]]];
console.log(nested.flat());
console.log(nested.flat(2));
console.log(nested.flat(Infinity));

const sentences = ["the cat", "sat down"];
console.log(sentences.map((s) => s.split(" ")));
console.log(sentences.flatMap((s) => s.split(" ")));

const lines = [
  { name: "tea", tags: ["hot", "drink"] },
  { name: "ice", tags: ["cold"] },
];
console.log(lines.flatMap((l) => l.tags));

const numbers = [1, 2, 3, 4];
console.log(numbers.flatMap((n) => (n % 2 === 0 ? [n, n * 10] : [])));
