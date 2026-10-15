const groups = new Map();

for (const word of ["apple", "avocado", "banana", "blueberry", "cherry"]) {
  groups.getOrInsert(word[0], []).push(word);
}
console.log(groups);

const counts = new Map();
for (const ch of "hello") {
  counts.set(ch, counts.getOrInsert(ch, 0) + 1);
}
console.log(counts);

const lazy = new Map();
console.log(lazy.getOrInsertComputed("k", (key) => key.toUpperCase()));
