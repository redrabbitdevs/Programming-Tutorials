const words = ["pear", "fig", "apple", "kiwi"];

console.log(words.values().reduce((total, w) => total + w.length, 0));
console.log(words.values().some((w) => w.length > 4));
console.log(words.values().every((w) => w.length > 2));
console.log(words.values().find((w) => w.startsWith("k")));

words.values().forEach((w, index) => {
  console.log(index, w);
});

console.log(words.values().map((w, index) => `${index}:${w}`).toArray());
