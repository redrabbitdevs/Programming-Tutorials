const docs = new Map([
  [1, "the quick brown fox"],
  [2, "the lazy dog"],
  [3, "a quick dog and a fox"],
]);

const index = new Map();
for (const [id, text] of docs) {
  for (const word of text.split(" ")) {
    index.getOrInsertComputed(word, () => new Set()).add(id);
  }
}

console.log(index.get("quick"));
const both = index.get("fox").intersection(index.get("dog"));
console.log(both, index.get("cat")?.size ?? 0);
