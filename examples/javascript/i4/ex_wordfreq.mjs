const text = "The cat and the hat. The end, and THE start.";

const counts = new Map();
for (const m of text.matchAll(/[a-z']+/gi)) {
  const word = m[0].toLowerCase();
  counts.set(word, (counts.get(word) ?? 0) + 1);
}

const top = [...counts]
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .slice(0, 3);
for (const [word, n] of top) {
  console.log(word, n);
}
