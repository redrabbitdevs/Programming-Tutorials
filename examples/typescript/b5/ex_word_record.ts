function countWords(text: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const word of text.split(" ")) {
    counts[word] = (counts[word] ?? 0) + 1;
  }
  return counts;
}

console.log(countWords("a b a c a b"));
