function countWords(text: string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const word of text.split(" ")) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return counts;
}

console.log(countWords("a b a c a b"));
