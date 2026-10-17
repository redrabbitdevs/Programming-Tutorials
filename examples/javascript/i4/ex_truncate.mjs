const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });

function truncate(text, max) {
  const parts = Array.from(segmenter.segment(text), (p) => p.segment);
  if (parts.length <= max) {
    return text;
  }
  return parts.slice(0, max - 1).join("") + "…";
}

console.log(truncate("Hello, world", 8));
console.log(truncate("👨‍👩‍👧👨‍👩‍👧👨‍👩‍👧👨‍👩‍👧", 3));
console.log(truncate("short", 8));
