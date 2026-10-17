function histogram(words) {
  const counts = new Map();
  for (const word of words) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return counts;
}

const words = ["a", "b", "a"];
console.log(histogram(words), words);
