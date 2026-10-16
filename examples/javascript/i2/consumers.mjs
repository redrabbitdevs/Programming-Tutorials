const words = new Set(["pear", "fig", "apple"]);

for (const word of words) {
  console.log("for...of:", word);
}

const [first, ...others] = words;
console.log(first, others);
console.log([...words].length, Math.max(...new Set([3, 9, 4])));

console.log(Array.from(words, (word) => word.length));
console.log(Object.fromEntries(Array.from(words, (w) => [w, w.length])));
