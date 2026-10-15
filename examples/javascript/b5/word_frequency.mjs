const text = "the cat and the hat and the bat";

const counts = new Map();
for (const word of text.split(" ")) {
  counts.set(word, (counts.get(word) ?? 0) + 1);
}

const ranked = [...counts].sort(
  ([wordA, countA], [wordB, countB]) =>
    countB - countA || wordA.localeCompare(wordB, "en"),
);

for (const [word, count] of ranked) {
  console.log(`${word}: ${count}`);
}
